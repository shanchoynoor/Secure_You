# Browser Lock Pro - Chrome Extension

A secure browser locking extension that protects your Chrome browser with password/PIN authentication.

## Features

✅ **Password Protection**: Set a secure password or 6-digit PIN
✅ **Browser Locking**: Lock all tabs and prevent navigation
✅ **Auto-Lock Timer**: Automatically lock after 5, 15, 30, or 60 minutes
✅ **Full-Page Lock Screen**: Beautiful overlay blocks all interactions
✅ **Password Strength Indicator**: Visual feedback on password security
✅ **Change Password**: Update your password anytime
✅ **SHA-256 Encryption**: Secure password hashing
✅ **Extension Protection**: Blocks access to chrome://extensions when locked
✅ **Modern UI**: Glassmorphic design with smooth animations

## Installation

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked"
5. Select the extension folder
6. The Browser Lock Pro icon will appear in your toolbar

## Usage

### First Time Setup
1. Click the extension icon
2. Enter a password or PIN (minimum 4 characters)
3. Confirm your password
4. Click "Set Password & Activate"

### Locking Your Browser
1. Click the extension icon
2. Click "Lock Browser"
3. All tabs will be locked with a full-screen overlay

### Unlocking Your Browser
1. Click the extension icon
2. Enter your password
3. Click "Unlock Browser"

### Auto-Lock
1. Click the extension icon (when unlocked)
2. Select auto-lock time from the dropdown
3. Browser will automatically lock after the selected time

### Change Password
1. Click the extension icon (when unlocked)
2. Click "Change Password"
3. Enter current password and new password
4. Click "Save Password"

## Security Features

- **SHA-256 Password Hashing**: Passwords are never stored in plain text
- **Extension Management Blocking**: Prevents access to chrome://extensions when locked
- **Full Page Overlay**: Blocks all clicks, keyboard input, and navigation
- **Persistent Lock State**: Lock status survives browser restarts
- **Auto-Lock Timer**: Automatically secures browser after inactivity

## Important Notes

⚠️ **Password Recovery**: There is NO password recovery option. If you forget your password, you'll need to:
   1. Close Chrome completely
   2. Go to chrome://extensions
   3. Remove the extension
   4. Reinstall and set a new password

⚠️ **Developer Mode**: While this extension provides strong protection, users with developer mode access can technically disable it. For maximum security, use Chrome's enterprise policies or managed mode.

⚠️ **Browser Restart**: The lock state persists across browser restarts. If locked, you'll need to unlock after restarting Chrome.

## Technical Details

- **Manifest Version**: 3
- **Permissions**: storage, tabs, webNavigation, management, alarms, scripting
- **Password Hashing**: SHA-256
- **Storage**: Chrome's local storage API
- **Content Security Policy**: Strict CSP for enhanced security

## Files Structure

```
browser-lock-extension/
├── manifest.json       # Extension configuration
├── popup.html         # Extension popup UI
├── popup.js           # Popup logic and password handling
├── styles.css         # Modern glassmorphic styling
├── background.js      # Service worker for lock/unlock logic
├── content.js         # Content script for page locking
├── README.md          # Documentation
└── icons/             # Extension icons (add your own)
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## Browser Compatibility

- ✅ Google Chrome (Manifest V3)
- ✅ Microsoft Edge (Chromium-based)
- ✅ Brave Browser
- ✅ Other Chromium-based browsers

## Privacy

This extension:
- ✅ Does NOT collect any data
- ✅ Does NOT send data to external servers
- ✅ Stores passwords locally using SHA-256 hashing
- ✅ Works completely offline
- ✅ Open source - review the code yourself

## License

MIT License - Feel free to modify and distribute

## Support

For issues or questions, please create an issue in the repository.

---

**Made with 🔒 for your security**
