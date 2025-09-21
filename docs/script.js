document.addEventListener('DOMContentLoaded', function() {
    const linkForm = document.getElementById('linkForm');
    const addPlatformBtn = document.getElementById('addPlatform');
    const platformsContainer = document.getElementById('platforms');
    const resultDiv = document.getElementById('result');
    const linksListDiv = document.getElementById('linksList');
    const importBtn = document.getElementById('importBtn');
    const importUrlInput = document.getElementById('importUrl');
    const importResultDiv = document.getElementById('importResult');

    // HTML escaping function to prevent XSS
    function escapeHtml(unsafe) {
        if (typeof unsafe !== 'string') return unsafe;
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Feature.fm import functionality
    async function importFromFeatureFm(url) {
        try {
            showImportResult('🔄 Analyzing Feature.fm link...', 'loading');
            
            // Validate URL
            if (!url.includes('ffm.to') && !url.includes('feature.fm')) {
                throw new Error('Please enter a valid Feature.fm or ffm.to link');
            }
            
            // For now, provide instructions since CORS is complex
            showImportResult(`
                <strong>📝 Import Instructions:</strong><br>
                1. Visit your Feature.fm link: <a href="${url}" target="_blank">${url}</a><br>
                2. Copy the song title and artist name<br>
                3. Copy the URLs from each streaming platform button<br>
                4. Fill in the form below with this information<br><br>
                <em>💡 Tip: Right-click on platform buttons and "Copy link address" to get URLs quickly</em>
            `, 'success');
            
            // Try to extract basic info from URL if it's a short link
            if (url.includes('ffm.to/')) {
                const linkId = url.split('ffm.to/')[1];
                if (linkId) {
                    document.getElementById('title').placeholder = 'Imported from ffm.to/' + linkId;
                    document.getElementById('artist').placeholder = 'Enter artist name';
                }
            }
            
        } catch (error) {
            console.error('Import error:', error);
            showImportResult(`❌ Import failed: ${error.message}`, 'error');
        }
    }
    
    function addPlatformInput(platformName = 'Spotify', platformUrl = '') {
        const platformInput = document.createElement('div');
        platformInput.className = 'platform-input';
        platformInput.innerHTML = `
            <select name="platform">
                <option value="Spotify" ${platformName === 'Spotify' ? 'selected' : ''}>Spotify</option>
                <option value="Apple Music" ${platformName === 'Apple Music' ? 'selected' : ''}>Apple Music</option>
                <option value="YouTube Music" ${platformName === 'YouTube Music' ? 'selected' : ''}>YouTube Music</option>
                <option value="Amazon Music" ${platformName === 'Amazon Music' ? 'selected' : ''}>Amazon Music</option>
                <option value="Deezer" ${platformName === 'Deezer' ? 'selected' : ''}>Deezer</option>
                <option value="Tidal" ${platformName === 'Tidal' ? 'selected' : ''}>Tidal</option>
                <option value="SoundCloud" ${platformName === 'SoundCloud' ? 'selected' : ''}>SoundCloud</option>
                <option value="Bandcamp" ${platformName === 'Bandcamp' ? 'selected' : ''}>Bandcamp</option>
                <option value="iTunes" ${platformName === 'iTunes' ? 'selected' : ''}>iTunes</option>
            </select>
            <input type="url" name="url" placeholder="Platform URL" required value="${escapeHtml(platformUrl)}">
            <button type="button" class="remove-platform">Remove</button>
        `;
        platformsContainer.appendChild(platformInput);
        
        // Add remove functionality
        const removeBtn = platformInput.querySelector('.remove-platform');
        removeBtn.addEventListener('click', function() {
            platformInput.remove();
        });
    }
    
    function showImportResult(message, type) {
        importResultDiv.innerHTML = message;
        importResultDiv.className = `import-result ${type}`;
        importResultDiv.classList.remove('hidden');
        
        if (type === 'success') {
            setTimeout(() => {
                importResultDiv.classList.add('hidden');
            }, 10000);
        }
    }
    
    // Import button event listener
    importBtn.addEventListener('click', function() {
        const url = importUrlInput.value.trim();
        if (!url) {
            showImportResult('Please enter a Feature.fm or ffm.to link', 'error');
            return;
        }
        importFromFeatureFm(url);
    });
    
    // Enter key support for import
    importUrlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            importBtn.click();
        }
    });

    // Generate unique ID for static links
    function generateLinkId() {
        return Math.random().toString(36).substring(2, 10);
    }

    // Get current domain for link generation
    function getCurrentDomain() {
        return window.location.origin;
    }

    // Add platform functionality - use the new function
    addPlatformBtn.addEventListener('click', function() {
        addPlatformInput();
    });

    // Remove platform functionality for existing platform inputs
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-platform')) {
            const platformInputs = document.querySelectorAll('.platform-input');
            if (platformInputs.length > 1) {
                e.target.closest('.platform-input').remove();
            } else {
                alert('You need at least one platform!');
            }
        }
    });

    // Form submission - now saves to localStorage
    linkForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('title').value;
        const artist = document.getElementById('artist').value;
        
        // Collect platforms
        const platformInputs = document.querySelectorAll('.platform-input');
        const platforms = {};
        
        platformInputs.forEach(input => {
            const platformSelect = input.querySelector('select[name="platform"]');
            const urlInput = input.querySelector('input[name="url"]');
            
            if (platformSelect.value && urlInput.value) {
                platforms[platformSelect.value] = urlInput.value;
            }
        });
        
        if (Object.keys(platforms).length === 0) {
            showResult('Please add at least one platform with a URL.', 'error');
            return;
        }
        
        try {
            // Generate link ID
            const linkId = generateLinkId();
            
            // Get existing links from localStorage
            const links = JSON.parse(localStorage.getItem('smartLinks') || '{}');
            
            // Create new link
            const newLink = {
                id: linkId,
                title,
                artist,
                platforms,
                clicks: 0,
                created: new Date().toISOString(),
                platformClicks: {}
            };
            
            // Save to localStorage
            links[linkId] = newLink;
            localStorage.setItem('smartLinks', JSON.stringify(links));
            
            // Generate smart link URL
            const smartLinkUrl = `${getCurrentDomain()}/link.html?id=${linkId}`;
            
            showResult(`
                <h3>Smart Link Created Successfully!</h3>
                <p><strong>Link ID:</strong> ${linkId}</p>
                <p><strong>Smart Link URL:</strong></p>
                <div class="link-url" data-url="${escapeHtml(smartLinkUrl)}">
                    ${escapeHtml(smartLinkUrl)}
                </div>
                <p><small>Click the URL above to copy it to clipboard</small></p>
                <div class="static-note">
                    <strong>GitHub Pages Compatible:</strong> This link works entirely with client-side code and localStorage. No server required!
                </div>
            `, 'success');
            
            // Add event listener for copy functionality
            const linkUrlDiv = resultDiv.querySelector('.link-url');
            if (linkUrlDiv) {
                linkUrlDiv.addEventListener('click', function() {
                    const url = this.dataset.url;
                    if (url) {
                        copyToClipboard(url);
                    }
                });
            }
            
            linkForm.reset();
            loadLinks(); // Refresh the links list
            
        } catch (error) {
            showResult('Error creating link: ' + error.message, 'error');
        }
    });

    // Show result function
    function showResult(message, type) {
        resultDiv.innerHTML = message;
        resultDiv.className = type === 'error' ? 'result error' : 'result';
        resultDiv.classList.remove('hidden');
        
        // Hide after 10 seconds for success messages
        if (type !== 'error') {
            setTimeout(() => {
                resultDiv.classList.add('hidden');
            }, 10000);
        }
    }

    // Copy to clipboard function
    window.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(function() {
            alert('Link copied to clipboard!');
        }).catch(function(err) {
            console.error('Could not copy text: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Link copied to clipboard!');
        });
    };

    // Load existing links from localStorage
    function loadLinks() {
        try {
            const links = JSON.parse(localStorage.getItem('smartLinks') || '{}');
            
            if (Object.keys(links).length === 0) {
                linksListDiv.innerHTML = `
                    <p>No smart links created yet.</p>
                    <div class="static-note">
                        <strong>📱 GitHub Pages Compatible:</strong> Your links are stored locally in your browser using localStorage. They work entirely client-side!
                    </div>
                `;
                return;
            }
            
            const linksArray = Object.values(links).sort((a, b) => 
                new Date(b.created) - new Date(a.created)
            );
            
            linksListDiv.innerHTML = linksArray.map(link => `
                <div class="link-item">
                    <h3>${escapeHtml(link.title)}</h3>
                    <p>by ${escapeHtml(link.artist)}</p>
                    <div class="link-url" data-url="${escapeHtml(getCurrentDomain())}/link.html?id=${escapeHtml(link.id)}">
                        ${escapeHtml(getCurrentDomain())}/link.html?id=${escapeHtml(link.id)}
                    </div>
                    <div class="link-stats">
                        <span>Platforms: ${Object.keys(link.platforms).map(p => escapeHtml(p)).join(', ')}</span>
                        <span class="click-count">${escapeHtml(link.clicks || 0)} clicks</span>
                    </div>
                    <p><small>Created: ${escapeHtml(new Date(link.created).toLocaleDateString())}</small></p>
                </div>
            `).join('');
            
            // Add event listeners for copy functionality
            const linkUrls = linksListDiv.querySelectorAll('.link-url');
            linkUrls.forEach(linkUrl => {
                linkUrl.addEventListener('click', function() {
                    const url = this.dataset.url;
                    if (url) {
                        copyToClipboard(url);
                    }
                });
            });
            
        } catch (error) {
            linksListDiv.innerHTML = '<p>Error loading links.</p>';
            console.error('Error loading links:', error);
        }
    }

    // Delete link function (for future enhancement)
    window.deleteLink = function(linkId) {
        if (confirm('Are you sure you want to delete this link?')) {
            const links = JSON.parse(localStorage.getItem('smartLinks') || '{}');
            delete links[linkId];
            localStorage.setItem('smartLinks', JSON.stringify(links));
            loadLinks();
        }
    };

    // Export links function (for backup)
    window.exportLinks = function() {
        const links = localStorage.getItem('smartLinks');
        const blob = new Blob([links], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'smart-links-backup.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    // Import links function (for restore)
    window.importLinks = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const importedLinks = JSON.parse(e.target.result);
                    localStorage.setItem('smartLinks', JSON.stringify(importedLinks));
                    loadLinks();
                    alert('Links imported successfully!');
                } catch (error) {
                    alert('Error importing links: Invalid file format.');
                }
            };
            reader.readAsText(file);
        }
    };

    // Load links on page load
    loadLinks();

    // Show GitHub Pages compatibility info
    setTimeout(() => {
        if (window.location.hostname.includes('github.io')) {
            showResult(`
                <h3>🎉 Running on GitHub Pages!</h3>
                <p>This Feature.fm alternative is now fully static and GitHub Pages compatible. All data is stored locally in your browser.</p>
                <p><strong>Benefits:</strong></p>
                <ul style="text-align: left; margin: 10px 0;">
                    <li>✅ No server costs</li>
                    <li>✅ Works entirely client-side</li>
                    <li>✅ Fast loading from GitHub's CDN</li>
                    <li>✅ Your data stays in your browser</li>
                </ul>
            `, 'success');
        }
    }, 2000);
});