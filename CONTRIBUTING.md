# Contributing to Feature.fm Alternative

Thank you for your interest in contributing to the Feature.fm Alternative! This project aims to provide musicians with a free, open-source smart link service for their music promotion.

## 🎯 Project Overview

Smart Link is a smart link service that allows musicians to create universal links for their music across all major streaming platforms. It offers two deployment options:

- **GitHub Pages Edition**: 100% client-side, no server required
- **Server Edition**: Full backend with Express.js and JSON storage

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm
- Git
- A text editor or IDE

### Local Development Setup

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/yourusername/Smart-Link.git
   cd Smart-Link
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the server version**
   ```bash
   npm start
   # Visit http://localhost:3000
   ```

4. **Test the GitHub Pages version**
   ```bash
   cd docs
   python3 -m http.server 8000
   # Visit http://localhost:8000
   ```

## 🛠️ Development Workflow

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style
   - Test both GitHub Pages and server versions
   - Ensure XSS protection is maintained
   - Update documentation if needed

3. **Test your changes**
   ```bash
   # Test server version
   npm start
   
   # Test GitHub Pages version
   cd docs && python3 -m http.server 8000
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Style Guidelines

- **JavaScript**: Use modern ES6+ features
- **HTML**: Clean, semantic markup
- **CSS**: Mobile-first responsive design
- **Security**: Always escape user input to prevent XSS
- **Comments**: Add comments for complex logic

### File Structure

```
Smart-Link/
├── docs/                 # GitHub Pages Edition (Static)
│   ├── index.html        # Main interface
│   ├── link.html         # Smart link landing page
│   ├── style.css         # Styling
│   └── script.js         # Client-side JavaScript
├── public/               # Server Edition Frontend
│   ├── index.html        # Main interface
│   ├── style.css         # Styling
│   └── script.js         # Frontend JavaScript
├── data/                 # Server Edition Data
│   └── links.json        # Smart links database
├── server.js             # Express server
└── package.json          # Dependencies
```

## 🎨 Design Principles

- **User-Friendly**: Simple, intuitive interface
- **Mobile-First**: Responsive design for all devices
- **Fast Loading**: Minimal dependencies, optimized performance
- **Accessible**: WCAG compliant where possible
- **Secure**: XSS protection and input validation

## 🔐 Security

- Always escape user input before rendering
- Use `textContent` and `createElement` instead of `innerHTML`
- Validate URLs and form inputs
- Report security issues privately (see SECURITY.md)

## 🐛 Bug Reports

When reporting bugs, please include:

- **Description**: Clear description of the issue
- **Steps to Reproduce**: Detailed steps to recreate the bug
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: Browser, OS, version (GitHub Pages vs Server)
- **Screenshots**: If applicable

Use the bug report template:

```markdown
**Bug Description**
A clear description of the bug.

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- Version: GitHub Pages or Server
- Browser: Chrome/Firefox/Safari
- OS: Windows/Mac/Linux
```

## ✨ Feature Requests

We welcome feature suggestions! Please:

- Check existing issues first
- Describe the problem you're solving
- Explain your proposed solution
- Consider both GitHub Pages and server versions

## 🧪 Testing

### Manual Testing Checklist

- [ ] Create a new smart link
- [ ] Test smart link landing page
- [ ] Verify click tracking works
- [ ] Test on mobile devices
- [ ] Test Feature.fm import functionality
- [ ] Verify XSS protection
- [ ] Test copy-to-clipboard functionality

### Cross-Browser Testing

Test on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📝 Documentation

When contributing:

- Update README.md if adding new features
- Comment complex code
- Update setup instructions if needed
- Include screenshots for UI changes

## 🤝 Community Guidelines

- Be respectful and inclusive
- Help others learn and grow
- Focus on constructive feedback
- Follow the code of conduct

## 💡 Ideas for Contributions

### Easy (Good for Beginners)
- Fix typos in documentation
- Improve CSS styling
- Add new streaming platform support
- Enhance mobile responsiveness

### Medium
- Add bulk link creation
- Implement link expiration
- Add custom short domains
- Enhance analytics dashboard

### Advanced
- Database integration (PostgreSQL/MongoDB)
- User authentication system
- API for third-party integrations
- Advanced analytics and reporting

## 🏷️ Pull Request Guidelines

### Title Format
- `feat: add new feature`
- `fix: resolve bug`
- `docs: update documentation`
- `style: improve CSS/UI`
- `refactor: code improvement`
- `test: add tests`

### Description Template
```markdown
## What changes does this PR make?
Brief description of changes.

## Why are these changes needed?
Explain the problem being solved.

## How has this been tested?
- [ ] Tested locally
- [ ] Tested on GitHub Pages
- [ ] Tested on mobile
- [ ] Cross-browser tested

## Screenshots (if applicable)
Add screenshots of UI changes.

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review of code completed
- [ ] Documentation updated
- [ ] No breaking changes
```

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙋‍♀️ Questions?

- Open an issue for general questions
- Check existing documentation
- Review closed issues and PRs

Thank you for contributing to making music promotion more accessible for all musicians! 🎵

---

**Happy Contributing!** 🎉