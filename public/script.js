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

        // Create select element
        const select = document.createElement('select');
        select.name = 'platform';
        const platforms = [
            'Spotify',
            'Apple Music',
            'YouTube Music',
            'Amazon Music',
            'Deezer',
            'Tidal',
            'SoundCloud',
            'Bandcamp',
            'iTunes'
        ];
        platforms.forEach(function(name) {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            if (platformName === name) {
                option.selected = true;
            }
            select.appendChild(option);
        });

        // Create input element
        const input = document.createElement('input');
        input.type = 'url';
        input.name = 'url';
        input.placeholder = 'Platform URL';
        input.required = true;
        input.value = platformUrl;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'remove-platform';
        removeBtn.textContent = 'Remove';

        // Append elements
        platformInput.appendChild(select);
        platformInput.appendChild(input);
        platformInput.appendChild(removeBtn);
        platformsContainer.appendChild(platformInput);

        // Add remove functionality
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
    if (importBtn) {
        importBtn.addEventListener('click', function() {
            const url = importUrlInput.value.trim();
            if (!url) {
                showImportResult('Please enter a Feature.fm or ffm.to link', 'error');
                return;
            }
            importFromFeatureFm(url);
        });
    }
    
    // Enter key support for import
    if (importUrlInput) {
        importUrlInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                importBtn.click();
            }
        });
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

    // Form submission
    linkForm.addEventListener('submit', async function(e) {
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
            const response = await fetch('/api/create-link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    artist,
                    platforms
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                showResult(`
                    <h3>Smart Link Created Successfully!</h3>
                    <p><strong>Link ID:</strong> ${result.linkId}</p>
                    <p><strong>Smart Link URL:</strong></p>
                    <div class="link-url" data-url="${escapeHtml(result.url)}">
                        ${escapeHtml(result.url)}
                    </div>
                    <p><small>Click the URL above to copy it to clipboard</small></p>
                `, 'success');

                // Attach click handler to the link-url div
                const linkUrlDiv = resultDiv.querySelector('.link-url');
                if (linkUrlDiv) {
                    linkUrlDiv.addEventListener('click', function() {
                        copyToClipboard(result.url);
                    });
                }
                
                linkForm.reset();
                loadLinks(); // Refresh the links list
            } else {
                showResult(result.error || 'Failed to create link', 'error');
            }
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

    // Load existing links
    async function loadLinks() {
        try {
            const response = await fetch('/api/links');
            const links = await response.json();
            
            if (Object.keys(links).length === 0) {
                linksListDiv.innerHTML = '<p>No smart links created yet.</p>';
                return;
            }
            
            const linksArray = Object.values(links).sort((a, b) => 
                new Date(b.created) - new Date(a.created)
            );
            
            linksListDiv.innerHTML = linksArray.map(link => `
                <div class="link-item">
                    <h3>${escapeHtml(link.title)}</h3>
                    <p>by ${escapeHtml(link.artist)}</p>
                    <div class="link-url" data-url="${escapeHtml(window.location.origin)}/l/${escapeHtml(link.id)}">
                        ${escapeHtml(window.location.origin)}/l/${escapeHtml(link.id)}
                    </div>
                    <div class="link-stats">
                        <span>Platforms: ${Object.keys(link.platforms).map(p => escapeHtml(p)).join(', ')}</span>
                        <span class="click-count">${escapeHtml(link.clicks)} clicks</span>
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

    // Load links on page load
    loadLinks();

    // Refresh links every 30 seconds
    setInterval(loadLinks, 30000);
});