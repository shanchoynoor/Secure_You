# Frequently Asked Questions (FAQ)

## Installation & Setup

### Q: How do I install this extension?
**A:** Follow these steps:
1. Download the extension files
2. Open Chrome and go to `chrome://extensions`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension folder
5. See INSTALL.md for detailed instructions

### Q: Do I need to create icons?
**A:** Icons are optional for testing. Chrome will use a default icon if you don't provide them. See ICONS_GUIDE.md for how to create icons.

### Q: What browsers are supported?
**A:** All Chromium-based browsers:
- ✅ Google Chrome
- ✅ Microsoft Edge
- ✅ Brave Browser
- ✅ Opera
- ✅ Vivaldi
- ❌ Firefox (not compatible)
- ❌ Safari (not compatible)

## Usage

### Q: How do I lock my browser?
**A:** Click the extension icon and click "Lock Browser". All tabs will be locked immediately.

### Q: How do I unlock my browser?
**A:** Click the extension icon, enter your password, and click "Unlock Browser".

### Q: Can I set a PIN instead of a password?
**A:** Yes! You can use a 6-digit PIN or any alphanumeric password (minimum 4 characters).

### Q: What happens when the browser is locked?
**A:** When locked:
- All webpages show a lock overlay
- Navigation is blocked
- New tabs are blocked
- Access to chrome://extensions is blocked
- You must enter your password to unlock

### Q: Does the lock persist after closing Chrome?
**A:** Yes! If you close Chrome while locked, it will remain locked when you reopen it.

## Security

### Q: Is this extension secure?
**A:** Yes, for its intended purpose. It uses SHA-256 password hashing and stores data locally. However, it's designed for casual protection, not enterprise security. See SECURITY.md for details.

### Q: Can someone uninstall the extension without the password?
**A:** When locked, the extension blocks access to chrome://extensions. However, someone with system access or developer knowledge could potentially disable it. This is a limitation of browser extensions.

### Q: Where is my password stored?
**A:** Your password is hashed using SHA-256 and stored locally in Chrome's encrypted storage. It never leaves your computer.

### Q: Can I recover my password if I forget it?
**A:** No, there is no password recovery. If you forget your password, you'll need to:
1. Close Chrome completely
2. Reopen and quickly go to chrome://extensions
3. Remove the extension
4. Reinstall and set a new password

### Q: Is my browsing data collected?
**A:** No! This extension:
- Does NOT collect any data
- Does NOT send data to any servers
- Works completely offline
- Is open source - you can review the code

## Features

### Q: What is auto-lock?
**A:** Auto-lock automatically locks your browser after a period of inactivity (5, 15, 30, or 60 minutes). Enable it in the extension settings.

### Q: Can I change my password?
**A:** Yes! When unlocked, click the extension icon, then click "Change Password". You'll need to enter your current password first.

### Q: Does it work on all websites?
**A:** Yes, it works on all regular websites. However, it cannot lock Chrome's internal pages (chrome://, chrome-extension://) due to browser security restrictions.

### Q: Can I use this on multiple computers?
**A:** Yes, but you'll need to install it separately on each computer. Passwords don't sync between installations.

## Troubleshooting

### Q: The extension icon doesn't appear
**A:** 
1. Make sure the extension is enabled in chrome://extensions
2. Click the puzzle piece icon in Chrome's toolbar
3. Pin "Browser Lock Pro" to make it always visible

### Q: The lock overlay doesn't show
**A:**
1. Make sure you're on a regular webpage (not chrome:// pages)
2. Refresh the page after locking
3. Check that the extension has permissions

### Q: I can't access chrome://extensions when locked
**A:** This is intentional! The extension blocks access to prevent unauthorized changes. Unlock the browser first.

### Q: The extension shows an error
**A:**
1. Check that all files are present
2. Reload the extension in chrome://extensions
3. Check the browser console for error messages

### Q: Auto-lock isn't working
**A:**
1. Make sure you selected a time in the dropdown
2. The timer starts when you unlock the browser
3. Any activity doesn't reset the timer (by design)

## Advanced

### Q: Can I customize the lock screen?
**A:** Yes! Edit `content.js` (for the overlay) or `lock.html` (for the full-page lock screen). The code is well-commented.

### Q: Can I add more features?
**A:** Absolutely! The extension is open source. You can:
- Add password hints
- Implement security questions
- Add activity logging
- Customize the UI
- Add more auto-lock options

### Q: How do I update the extension?
**A:**
1. Download the new version
2. Go to chrome://extensions
3. Click "Update" or remove and reinstall
4. Your password and settings are preserved

### Q: Can I use this in a corporate environment?
**A:** This extension is designed for personal use. For corporate security, use:
- Chrome Enterprise policies
- MDM (Mobile Device Management) solutions
- Enterprise security software

### Q: Does it work in Incognito mode?
**A:** By default, extensions are disabled in Incognito. To enable:
1. Go to chrome://extensions
2. Find Browser Lock Pro
3. Click "Details"
4. Enable "Allow in Incognito"

### Q: Can I export my settings?
**A:** Settings are stored in Chrome's local storage. You can't export them directly, but you can:
1. Note your password
2. Note your auto-lock setting
3. Reinstall and reconfigure

## Comparison

### Q: How is this different from Chrome's built-in lock?
**A:** Chrome doesn't have a built-in browser lock. This extension adds that functionality with password protection.

### Q: How is this different from Windows/Mac lock screen?
**A:** OS lock screens protect your entire computer. This extension only locks your browser, useful for shared computers or quick protection.

### Q: Should I use this instead of OS security?
**A:** No! Use this IN ADDITION to OS security. It's an extra layer of protection, not a replacement.

## Contributing

### Q: Can I contribute to this project?
**A:** Yes! If this is an open-source project:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

### Q: Can I sell or distribute this extension?
**A:** Check the LICENSE file. If it's MIT licensed, you can use, modify, and distribute it freely with attribution.

### Q: Can I publish this to the Chrome Web Store?
**A:** If you're the original creator, yes! Follow Chrome's Web Store publishing guidelines.

## Still Have Questions?

- Check the README.md for detailed documentation
- Review the SECURITY.md for security information
- Read the INSTALL.md for installation help
- Check the code - it's well-commented!
- Create an issue in the repository

---

**Can't find your answer? The code is open source - dive in and explore!** 🔍
