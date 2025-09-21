const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Data file path
const LINKS_FILE = path.join(__dirname, 'data', 'links.json');

// Initialize data file if it doesn't exist
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}

if (!fs.existsSync(LINKS_FILE)) {
  fs.writeFileSync(LINKS_FILE, JSON.stringify({}));
}

// Helper functions
function readLinks() {
  try {
    const data = fs.readFileSync(LINKS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

function writeLinks(links) {
  fs.writeFileSync(LINKS_FILE, JSON.stringify(links, null, 2));
}

// HTML escaping function to prevent XSS
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Routes

// Home page - admin interface
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API to create a new smart link
app.post('/api/create-link', (req, res) => {
  const { title, artist, platforms } = req.body;
  
  if (!title || !artist || !platforms || Object.keys(platforms).length === 0) {
    return res.status(400).json({ error: 'Title, artist, and at least one platform are required' });
  }
  
  const linkId = uuidv4().split('-')[0]; // Short ID
  const links = readLinks();
  
  links[linkId] = {
    id: linkId,
    title,
    artist,
    platforms,
    clicks: 0,
    created: new Date().toISOString()
  };
  
  writeLinks(links);
  res.json({ success: true, linkId, url: `${req.protocol}://${req.get('host')}/l/${linkId}` });
});

// API to get all links (for admin)
app.get('/api/links', (req, res) => {
  const links = readLinks();
  res.json(links);
});

// Smart link landing page
app.get('/l/:linkId', (req, res) => {
  const { linkId } = req.params;
  
  // Validate linkId parameter
  if (!linkId || typeof linkId !== 'string') {
    return res.status(400).send('Invalid link ID');
  }
  
  // Sanitize linkId - only allow alphanumeric and hyphens
  const sanitizedLinkId = linkId.replace(/[^a-zA-Z0-9-]/g, '');
  if (sanitizedLinkId !== linkId || sanitizedLinkId.length === 0) {
    return res.status(400).send('Invalid link ID format');
  }
  
  const links = readLinks();
  
  if (!links[sanitizedLinkId]) {
    return res.status(404).send('Link not found');
  }
  
  const link = links[sanitizedLinkId];
  
  // Increment click count
  link.clicks++;
  writeLinks(links);
  
  // Generate HTML for the landing page with secure event handlers
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(link.title)} by ${escapeHtml(link.artist)}</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <div class="container">
    <div class="music-card">
      <h1>${escapeHtml(link.title)}</h1>
      <h2>by ${escapeHtml(link.artist)}</h2>
      <p>Choose your preferred music platform:</p>
      <div class="platforms">
        ${Object.entries(link.platforms).map(([platform, url]) => {
          // Additional validation for platform name
          const validPlatform = platform.replace(/[^a-zA-Z0-9\s\-_\.]/g, '');
          return `
          <a href="${escapeHtml(url)}" class="platform-btn" target="_blank" data-linkid="${escapeHtml(sanitizedLinkId)}" data-platform="${escapeHtml(validPlatform)}">
            <span class="platform-icon">${getPlatformIcon(validPlatform)}</span>
            ${escapeHtml(validPlatform)}
          </a>
        `;
        }).join('')}
      </div>
    </div>
  </div>
  <script>
    // Validate inputs before tracking
    function validateInput(input, maxLength = 50) {
      if (!input || typeof input !== 'string') return null;
      const sanitized = input.replace(/[^a-zA-Z0-9\s\-_\.]/g, '');
      return sanitized.length > 0 && sanitized.length <= maxLength ? sanitized : null;
    }
    
    function trackClick(linkId, platform) {
      const validLinkId = validateInput(linkId);
      const validPlatform = validateInput(platform);
      
      if (!validLinkId || !validPlatform) {
        console.error('Invalid tracking parameters');
        return;
      }
      
      fetch('/api/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkId: validLinkId, platform: validPlatform })
      }).catch(err => console.error('Tracking error:', err));
    }
    
    // Use event delegation to safely handle clicks
    document.addEventListener('DOMContentLoaded', function() {
      document.querySelector('.platforms').addEventListener('click', function(e) {
        if (e.target.closest('.platform-btn')) {
          const btn = e.target.closest('.platform-btn');
          const linkId = btn.getAttribute('data-linkid');
          const platform = btn.getAttribute('data-platform');
          trackClick(linkId, platform);
        }
      });
    });
  </script>
</body>
</html>`;
  
  res.send(html);
});

// API to track platform clicks
app.post('/api/track-click', (req, res) => {
  const { linkId, platform } = req.body;
  
  // Validate inputs
  if (!linkId || !platform || typeof linkId !== 'string' || typeof platform !== 'string') {
    return res.status(400).json({ error: 'Invalid linkId or platform' });
  }
  
  // Sanitize inputs
  const sanitizedLinkId = linkId.replace(/[^a-zA-Z0-9-]/g, '');
  const sanitizedPlatform = platform.replace(/[^a-zA-Z0-9\s\-_\.]/g, '');
  
  if (sanitizedLinkId.length === 0 || sanitizedPlatform.length === 0) {
    return res.status(400).json({ error: 'Invalid input format' });
  }
  
  const links = readLinks();
  
  if (links[sanitizedLinkId]) {
    if (!links[sanitizedLinkId].platformClicks) {
      links[sanitizedLinkId].platformClicks = {};
    }
    links[sanitizedLinkId].platformClicks[sanitizedPlatform] = (links[sanitizedLinkId].platformClicks[sanitizedPlatform] || 0) + 1;
    writeLinks(links);
  }
  
  res.json({ success: true });
});

// Helper function to get platform icons
function getPlatformIcon(platform) {
  const icons = {
    'Spotify': '🎵',
    'Apple Music': '🍎',
    'YouTube Music': '▶️',
    'Amazon Music': '📦',
    'Deezer': '🎶',
    'Tidal': '🌊',
    'SoundCloud': '☁️',
    'Bandcamp': '🎸',
    'iTunes': '🍎'
  };
  return icons[platform] || '🎵';
}

app.listen(PORT, () => {
  console.log(`Feature.fm Alternative running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to create smart links`);
});