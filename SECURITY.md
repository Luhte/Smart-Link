# Security Policy

## 🔐 Security Overview

Smart Link takes security seriously. This document outlines our security practices, how to report vulnerabilities, and what measures are in place to protect users.

## 🛡️ Current Security Measures

### XSS Protection
- **HTML Escaping**: All user input is properly escaped before rendering
- **Safe DOM Manipulation**: Uses `textContent` and `createElement` instead of `innerHTML`
- **Server-Side Sanitization**: Template literals properly escaped in Express routes
- **Client-Side Protection**: localStorage data sanitized before display

### Input Validation
- **URL Validation**: Platform URLs are validated before storage
- **Form Validation**: All form inputs are validated client and server-side
- **Length Limits**: Reasonable limits on input field lengths
- **Type Checking**: Proper data type validation

### Data Protection
- **No Sensitive Data**: No personal information or authentication required
- **Local Storage**: GitHub Pages version stores data locally in browser
- **File-Based Storage**: Server version uses JSON files (easily upgradeable)
- **No External Dependencies**: Minimal external API usage

## 🚨 Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| Latest (main branch) | ✅ |
| Previous releases | ❌ |

We only provide security updates for the latest version in the main branch.

## 📢 Reporting a Vulnerability

### How to Report

**⚠️ Please do NOT report security vulnerabilities publicly in GitHub issues.**

Instead, please report security vulnerabilities privately by:

1. **Email**: Send details to [luhte@luhte.com]
2. **GitHub Security**: Use GitHub's private vulnerability reporting feature
3. **Direct Message**: Contact maintainers directly

### What to Include

When reporting a security vulnerability, please include:

- **Description**: Clear description of the vulnerability
- **Impact**: What could an attacker achieve?
- **Steps to Reproduce**: Detailed reproduction steps
- **Proof of Concept**: Code or screenshots if applicable
- **Suggested Fix**: If you have ideas for fixing it
- **Environment**: Browser, version, deployment type

### Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 1 week
- **Fix Development**: Depends on severity
- **Public Disclosure**: After fix is deployed

## 🔍 Security Considerations by Component

### GitHub Pages Edition

**Strengths:**
- No server-side attack vectors
- All processing happens client-side
- No database to compromise
- HTTPS enforced by GitHub Pages

**Considerations:**
- Data stored in browser localStorage
- XSS protection crucial for client-side code
- No server-side validation backup

### Server Edition

**Strengths:**
- Server-side validation and sanitization
- Centralized data storage
- Better control over security policies

**Considerations:**
- Server must be properly secured
- File-based storage requires proper permissions
- Express.js security best practices needed

## 🛠️ Security Best Practices for Contributors

### Code Security

```javascript
// ✅ Good - Use textContent for user data
element.textContent = userInput;

// ❌ Bad - Direct innerHTML injection
element.innerHTML = userInput;

// ✅ Good - Escape HTML before rendering
element.innerHTML = escapeHtml(userInput);

// ✅ Good - Create elements safely
const link = document.createElement('a');
link.href = escapeHtml(url);
link.textContent = escapeHtml(platformName);
```

### Input Validation

```javascript
// ✅ Good - Validate and sanitize
function validateUrl(url) {
    try {
        const parsed = new URL(url);
        return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
        return false;
    }
}

// ✅ Good - Escape HTML entities
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
```

### localStorage Security

```javascript
// ✅ Good - Validate data from localStorage
function loadLinks() {
    try {
        const data = localStorage.getItem('smartLinks');
        const links = JSON.parse(data || '{}');
        
        // Validate structure before use
        if (typeof links !== 'object') return {};
        
        return links;
    } catch (error) {
        console.error('Invalid localStorage data');
        return {};
    }
}
```

## 🚫 Common Vulnerabilities to Avoid

### Cross-Site Scripting (XSS)
- Never use `innerHTML` with user data
- Always escape HTML entities
- Validate URLs before using as `href`

### Injection Attacks
- Sanitize all form inputs
- Use parameterized queries (when using databases)
- Validate data types and ranges

### Client-Side Security
- Don't trust localStorage data
- Validate data on every use
- Implement proper error handling

## 🔧 Security Testing

### Manual Testing
- Test with malicious input strings
- Verify XSS protection works
- Check URL validation
- Test error handling

### Automated Testing
Contributors should test for:
- XSS injection attempts
- HTML/JavaScript injection
- URL manipulation
- Form validation bypass

### Test Cases
```javascript
// XSS test cases
const maliciousInputs = [
    '<script>alert("XSS")</script>',
    '<img src=x onerror=alert("XSS")>',
    'javascript:alert("XSS")',
    '"><script>alert("XSS")</script>',
];

// Test each input is properly escaped
maliciousInputs.forEach(input => {
    // Should render as plain text, not execute
    testInputEscaping(input);
});
```

## 📋 Security Checklist for PRs

Before submitting a pull request, ensure:

- [ ] All user input is properly escaped
- [ ] No `innerHTML` usage with user data
- [ ] URL validation implemented
- [ ] Error handling doesn't leak information
- [ ] No sensitive data in logs
- [ ] XSS protection tested
- [ ] Input validation on both client and server
- [ ] localStorage data is validated before use

## 🏆 Security Headers (Server Edition)

When deploying the server version, consider these headers:

```javascript
// Express.js security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});
```

## 🔍 Known Security Limitations

### GitHub Pages Version
- Relies on client-side validation only
- localStorage data not encrypted
- No server-side security controls

### Server Version
- File-based storage has no built-in encryption
- No user authentication system
- Basic Express.js setup without advanced security middleware

## 📚 Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Express.js Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)

## 🙏 Acknowledgments

We appreciate security researchers and contributors who help keep this project secure. Responsible disclosure helps protect all users.

## 📞 Contact

For security-related questions or concerns:
- Check this document first
- Review existing security measures
- Contact maintainers privately for sensitive issues

---

**Security is everyone's responsibility. Thank you for helping keep Smart Link secure!** 🔒