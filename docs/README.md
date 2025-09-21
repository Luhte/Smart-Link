# 🎵 Smart Link - GitHub Pages Edition

A fully static, client-side smart link service for musicians that runs entirely on GitHub Pages! No server required, no monthly fees, complete data ownership.

![GitHub Pages Compatible](https://img.shields.io/badge/GitHub%20Pages-Compatible-brightgreen)
![No Server Required](https://img.shields.io/badge/Server-Not%20Required-blue)
![Client Side](https://img.shields.io/badge/100%25-Client%20Side-orange)

## 🌟 What's New in the GitHub Pages Edition

This version has been completely rewritten to work as a **static website** that's fully compatible with GitHub Pages:

- ✅ **100% Client-Side**: Uses localStorage instead of server database
- ✅ **GitHub Pages Ready**: Deploy instantly with zero configuration
- ✅ **No Server Costs**: Runs entirely in the browser
- ✅ **Same Great UI**: Identical user experience to the server version
- ✅ **Fast Loading**: Served from GitHub's global CDN

## 🚀 GitHub Pages Deployment

### Quick Deploy (Recommended)

1. **Fork this repository**
2. **Go to Settings → Pages**
3. **Set source to "Deploy from a branch"**
4. **Select `main` branch and `/docs` folder**
5. **Your site will be live at `https://yourusername.github.io/Smart-Link/`**

### Manual Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/Luhte/Smart-Link.git
   cd Feature.fm-alternative
   ```

2. Enable GitHub Pages:
   - Go to your repository settings
   - Scroll to "Pages" section
   - Set source to "Deploy from a branch"
   - Choose `main` branch and `/docs` folder
   - Save

3. Your site will be available at:
   ```
   https://yourusername.github.io/Smart-Link/
   ```

## 📱 How It Works (GitHub Pages Edition)

### Data Storage
- **localStorage**: All smart links are saved in your browser's localStorage
- **No Database**: No server-side database required
- **Client-Side Only**: Everything runs in the user's browser

### Smart Links
- **URL Format**: `yoursite.com/link.html?id=linkid`
- **Client-Side Routing**: JavaScript handles link resolution
- **Analytics**: Click tracking stored in localStorage

### Compatibility
- ✅ **All Modern Browsers**: Chrome, Firefox, Safari, Edge
- ✅ **Mobile Responsive**: Works on all devices
- ✅ **Offline Capable**: Can work offline after first load

## 🎯 Perfect For

- **Independent Musicians**: Zero-cost music promotion
- **GitHub Users**: Deploy instantly with your existing account
- **Privacy-Conscious Users**: All data stays in your browser
- **Developers**: Learn how client-side apps work

## 📊 Features

### 🔗 Smart Link Creation
- Create universal links for songs/albums
- Support for 9 major streaming platforms
- Beautiful landing pages for each link

### 📈 Analytics
- Track total clicks per link
- Platform-specific click tracking
- View creation dates and statistics

### 💾 Data Management
- Export your links as JSON backup
- Import links from backup files
- All data stored locally in browser

### 🎨 User Interface
- Clean, modern design
- Mobile-responsive layout
- Copy-to-clipboard functionality

## 🔄 Migration from Server Version

If you were using the Node.js server version, you can migrate your data:

1. Export your links from the server version
2. Import them using the import function in the GitHub Pages version
3. Your links will work the same way!

## 🆚 GitHub Pages vs Server Version

| Feature | Server Version | GitHub Pages Version |
|---------|---------------|---------------------|
| **Hosting Cost** | Requires paid hosting | Free on GitHub Pages |
| **Setup Complexity** | Requires server setup | One-click deployment |
| **Data Storage** | Server database | Browser localStorage |
| **Scalability** | Server-dependent | Unlimited (client-side) |
| **Custom Domain** | Full control | GitHub Pages domain |
| **Offline Access** | No | Yes (after first load) |

## 🔧 Customization

### Branding
- Edit `docs/style.css` to change colors and styling
- Modify `docs/index.html` for layout changes
- Update platform icons in `docs/script.js`

### Domain
- Use GitHub Pages custom domain feature
- Point your domain to `yourusername.github.io`
- Add a `CNAME` file in the `/docs` directory

## 📱 Local Development

To test locally before deploying:

```bash
cd docs
python -m http.server 8000
# or
npx http-server
```

Visit `http://localhost:8000` to test your changes.

## 🔒 Privacy & Security

- **No Data Collection**: No analytics or tracking beyond your own links
- **Local Storage**: All data stays in the user's browser
- **HTTPS**: GitHub Pages provides SSL/TLS encryption
- **No Server**: No server-side vulnerabilities

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🌟 Why Choose the GitHub Pages Version?

1. **Zero Cost**: No hosting fees, no server maintenance
2. **Instant Deploy**: One-click deployment on GitHub Pages
3. **Global CDN**: Fast loading worldwide via GitHub's infrastructure
4. **No Vendor Lock-in**: Your code, your repository, your control
5. **Privacy First**: All data stays in the user's browser
6. **Learning Opportunity**: Perfect example of modern client-side development

---

🎵 **Start creating smart links for your music today!** No server setup, no monthly fees, just pure client-side magic.

[🚀 **Try the Live Demo**](https://luhte.github.io/Smart-Link/)