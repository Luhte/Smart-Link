# 🎵 Smart Link

A modern, open-source smart link service for musicians that allows you to create universal links for your music across all streaming platforms. Similar to Feature.fm, but with full control over your data and complete customization.

🌟 **NEW: GitHub Pages Edition Available!** - Now includes a fully static version that runs entirely client-side with zero server requirements.

![GitHub Pages Version](https://github.com/user-attachments/assets/895b013d-31a7-4be9-86b4-73e89611d79d)

## ✨ Features

### 🌟 Two Deployment Options

**🚀 GitHub Pages Edition (NEW)** - Located in `/docs/`
- **100% Client-Side**: No server required, runs entirely in browser
- **GitHub Pages Compatible**: One-click deployment
- **localStorage**: Data stored locally in user's browser
- **Zero Cost**: Free hosting on GitHub Pages
- **Same UI**: Identical interface and functionality

**⚡ Server Edition** - Traditional Node.js application
- **Server-Side**: Full backend with Express.js
- **JSON Storage**: File-based data storage (upgradeable to database)
- **Custom Hosting**: Deploy on any Node.js hosting platform
- **Full Control**: Complete server-side customization

### Core Features (Both Versions)
- **🔗 Smart Links**: Create universal links that work across all major music platforms
- **📊 Analytics**: Track clicks and see which platforms your fans prefer
- **🎨 Beautiful UI**: Clean, responsive interface that works on all devices
- **⚡ Fast & Lightweight**: Minimal dependencies and optimized performance
- **🎯 Platform Support**: Supports Spotify, Apple Music, YouTube Music, Amazon Music, Deezer, Tidal, SoundCloud, Bandcamp, and iTunes
- **📱 Mobile Responsive**: Perfect experience on mobile, tablet, and desktop
- **🔒 Privacy Focused**: Your data stays under your control
- **🆓 Open Source**: Free to use and modify

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended for Zero-Cost Hosting)

1. **Fork this repository**
2. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Set source to "Deploy from a branch"
   - Select `main` branch and `/docs` folder
3. **Your site will be live** at `https://yourusername.github.io/Smart-Link/`

### Option 2: Traditional Server Hosting

#### Prerequisites
- Node.js (v14 or higher)
- npm

#### Installation

1. Clone the repository:
```bash
git clone https://github.com/Luhte/Smart-Link.git
cd Smart-Link
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and visit: `http://localhost:3000`

## 📖 How It Works

### Creating Smart Links

1. **Enter Song Details**: Add the song/album title and artist name
2. **Add Platform Links**: Add URLs from different streaming platforms
3. **Generate Smart Link**: Get a universal link that works everywhere
4. **Share**: Use the generated link to promote your music

![Smart Link Landing Page](https://github.com/user-attachments/assets/d6c7c4d1-eb11-4245-be54-2b69e54b4630)

### Smart Link Experience

When someone clicks your smart link, they see a beautiful landing page with all available streaming platforms. They can choose their preferred platform and get redirected instantly.

## 🛠️ Technology Stack

### GitHub Pages Edition (`/docs/`)
- **Frontend**: Vanilla HTML, CSS, and JavaScript
- **Data Storage**: Browser localStorage
- **Hosting**: GitHub Pages (free)
- **Analytics**: Client-side click tracking

### Server Edition (Root directory)
- **Backend**: Node.js with Express.js
- **Frontend**: Vanilla HTML, CSS, and JavaScript
- **Data Storage**: JSON file (easily upgradeable to database)
- **Styling**: CSS Grid and Flexbox with modern design
- **Analytics**: Built-in click tracking

## 📊 Analytics

Track important metrics for your music:
- Total link clicks
- Platform-specific click counts
- Link creation dates
- Real-time updates

## 🎨 Customization

The application is designed to be easily customizable:

- **Styling**: Modify `public/style.css` for custom branding
- **Platforms**: Add new streaming platforms by updating the platform list
- **Analytics**: Extend tracking with additional metrics
- **UI**: Customize the interface to match your brand

## 🔧 Configuration

### GitHub Pages Deployment

The `/docs` folder contains a complete static version that works on GitHub Pages:

1. **Enable GitHub Pages** in your repository settings
2. **Set source** to "Deploy from a branch" 
3. **Choose** `main` branch and `/docs` folder
4. **Custom Domain** (optional): Add a `CNAME` file in `/docs`

### Server Deployment

The server version can be deployed to any platform that supports Node.js:

- **Heroku**: Add a `Procfile` with `web: node server.js`
- **Vercel**: Works out of the box
- **Railway**: Simple deployment with git integration
- **DigitalOcean**: Deploy on App Platform or Droplets
- **AWS**: Use Elastic Beanstalk or EC2

### Adding New Platforms

To add support for additional streaming platforms, update the platform options in:
- **GitHub Pages**: `docs/index.html` and `docs/script.js`
- **Server**: `public/index.html`, `public/script.js`, and `server.js`

### Environment Variables (Server Edition)

- `PORT`: Server port (default: 3000)

## 📁 Project Structure

```
Smart-Link/
├── docs/                 # 🌟 GitHub Pages Edition (Static)
│   ├── index.html        # Main interface (client-side)
│   ├── link.html         # Smart link landing page
│   ├── style.css         # Styling and responsive design
│   ├── script.js         # Client-side JavaScript (localStorage)
│   └── README.md         # GitHub Pages documentation
├── public/               # Server Edition Frontend
│   ├── index.html        # Main admin interface
│   ├── style.css         # Styling and responsive design
│   └── script.js         # Frontend JavaScript
├── data/                 # Server Edition Data
│   └── links.json        # Smart links database
├── package.json          # Server dependencies and scripts
├── server.js             # Express server and API routes
├── index.html            # Root redirect page
└── README.md             # This file
```

## 🔄 API Endpoints

### GitHub Pages Edition
- **Client-Side Only**: No API endpoints, uses localStorage
- **Smart Links**: `link.html?id=linkId`

### Server Edition
- `GET /` - Admin interface
- `POST /api/create-link` - Create new smart link
- `GET /api/links` - Get all links
- `GET /l/:linkId` - Smart link landing page
- `POST /api/track-click` - Track platform clicks

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] User authentication and multi-user support
- [ ] Custom domains for smart links
- [ ] Advanced analytics dashboard
- [ ] Bulk link creation
- [ ] API for third-party integrations
- [ ] White-label customization
- [ ] Mobile app

## 🆚 Feature.fm vs This Alternative

| Feature | Feature.fm | GitHub Pages Edition | Server Edition |
|---------|------------|---------------------|----------------|
| Cost | Paid service | Free (GitHub Pages) | Hosting costs apply |
| Data Control | Their servers | Your browser | Your server |
| Customization | Limited | Full control | Full control |
| Analytics | Basic | Client-side tracking | Server-side tracking |
| Platform Support | All major | All major | All major |
| Branding | Feature.fm branding | Your branding | Your branding |
| Server Required | No | No | Yes |
| Database | Their database | localStorage | JSON file/Database |

## 💡 Why Choose This Alternative?

### GitHub Pages Edition
1. **Zero Cost**: Free hosting on GitHub Pages forever
2. **No Server Maintenance**: Runs entirely client-side
3. **Instant Deploy**: One-click deployment from GitHub
4. **Global CDN**: Fast loading worldwide via GitHub's infrastructure
5. **Privacy**: Data stays in user's browser
6. **Learning**: Perfect example of modern client-side development

### Server Edition  
1. **Full Control**: Complete server-side customization
2. **Database Integration**: Easy to upgrade to PostgreSQL/MongoDB
3. **Custom Analytics**: Advanced tracking and reporting
4. **Multi-User Support**: Can be extended for multiple users
5. **API Integration**: Can integrate with third-party services

### Both Versions
1. **Data Ownership**: Complete control over your data and analytics
2. **Customization**: Modify the interface and functionality to your needs
3. **Independence**: Not dependent on external paid services
4. **Open Source**: Learn how smart links work under the hood

---

Made with ❤️ for the music community. Start promoting your music with smart links today!