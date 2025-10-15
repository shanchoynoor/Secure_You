# Security Documentation

## Security Features

### 1. Password Protection
- **SHA-256 Hashing**: Passwords are hashed using SHA-256 before storage
- **No Plain Text**: Passwords are never stored in plain text
- **Local Storage**: All data stored locally in Chrome's encrypted storage
- **No Network Calls**: Extension works completely offline

### 2. Browser Locking
- **Full Page Overlay**: Blocks all page interactions when locked
- **Event Blocking**: Prevents clicks, keyboard input, and context menus
- **Navigation Blocking**: Stops page navigation and new tab creation
- **Persistent Lock**: Lock state survives page refreshes and browser restarts

### 3. Extension Protection
- **Extension Management Blocking**: Prevents access to chrome://extensions when locked
- **Settings Protection**: Blocks chrome://settings access when locked
- **Uninstall Protection**: Requires unlock before extension can be removed (when locked)
- **Developer Mode**: Blocks developer mode access when locked

## Security Limitations

### What This Extension CAN Do:
✅ Lock all webpage content with full-screen overlay
✅ Block navigation and new tabs when locked
✅ Prevent casual access to browser settings
✅ Require password for unlocking
✅ Auto-lock after inactivity
✅ Persist lock state across browser restarts

### What This Extension CANNOT Do:
❌ **Prevent forced uninstallation**: Users with system access can force-remove extensions
❌ **Block Chrome's Task Manager**: Ctrl+Shift+Esc can still kill processes
❌ **Prevent Chrome profile deletion**: Users can delete the entire profile
❌ **Block OS-level access**: System administrators can access files directly
❌ **Prevent Safe Mode**: Chrome's safe mode can disable extensions
❌ **True enterprise-level security**: This is a browser extension, not system-level security

## Threat Model

### Protected Against:
✅ Casual browsing by others using your computer
✅ Accidental access by family members or roommates
✅ Quick unauthorized access when you step away
✅ Shoulder surfing and casual snooping

### NOT Protected Against:
❌ Determined attackers with system access
❌ Malware or keyloggers
❌ Physical access to the computer by tech-savvy users
❌ Chrome profile copying or export
❌ Browser developer tools (when extension is disabled)

## Best Practices

### For Maximum Security:

1. **Use a Strong Password**
   - Minimum 8 characters
   - Mix uppercase, lowercase, numbers, symbols
   - Don't use common words or personal information

2. **Enable Auto-Lock**
   - Set auto-lock to 5-15 minutes
   - Shorter time = better security

3. **Lock When Away**
   - Always lock before leaving your computer
   - Make it a habit like locking your phone

4. **Combine with OS Security**
   - Use Windows/Mac user account passwords
   - Enable screen lock on your OS
   - Use full disk encryption

5. **Regular Password Changes**
   - Change password every 3-6 months
   - Change immediately if compromised

6. **Private Browsing Profile**
   - Use a separate Chrome profile for sensitive browsing
   - Install extension on that profile only

### For Shared Computers:

1. **Use Chrome Profiles**
   - Create separate Chrome profiles for each user
   - Each profile can have its own Browser Lock Pro instance

2. **Don't Save Passwords in Chrome**
   - Use a password manager instead
   - Clear browsing data when done

3. **Consider Guest Mode**
   - Use Chrome's Guest mode for temporary access
   - Guest sessions don't save any data

## Technical Security Details

### Password Hashing
```javascript
// SHA-256 hashing implementation
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
```

### Storage Security
- Uses Chrome's `chrome.storage.local` API
- Data is stored in Chrome's encrypted profile directory
- Only the extension can access its storage
- Storage is isolated per Chrome profile

### Content Security Policy
```json
"content_security_policy": {
  "extension_pages": "script-src 'self'; object-src 'self'"
}
```
- Prevents inline scripts
- Blocks external script loading
- Protects against XSS attacks

## Known Vulnerabilities

### 1. Developer Mode Bypass
**Issue**: Users with developer mode can disable the extension
**Mitigation**: Block access to chrome://extensions when locked
**Limitation**: Cannot prevent access when unlocked

### 2. Profile Export
**Issue**: Users can export Chrome profile and access data
**Mitigation**: None - this is a Chrome limitation
**Recommendation**: Use OS-level encryption

### 3. Force Quit
**Issue**: Users can force-quit Chrome and restart
**Mitigation**: Lock state persists across restarts
**Limitation**: Cannot prevent Chrome from being closed

### 4. Safe Mode
**Issue**: Chrome's safe mode disables all extensions
**Mitigation**: None - this is by design for recovery
**Recommendation**: Use OS-level security for critical protection

## Compliance & Privacy

### Data Collection
- **NO** data is collected
- **NO** analytics or tracking
- **NO** network requests
- **NO** external servers

### Data Storage
- Password hash stored locally only
- Lock state stored locally only
- Settings stored locally only
- All data deleted when extension is removed

### Permissions Explanation
- `storage`: Store password hash and settings
- `tabs`: Detect and lock browser tabs
- `webNavigation`: Block navigation when locked
- `management`: Detect extension management access
- `alarms`: Auto-lock timer functionality
- `scripting`: Inject lock overlay into pages

## Reporting Security Issues

If you discover a security vulnerability:

1. **DO NOT** create a public issue
2. Email security details privately (if repository has contact)
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

## Disclaimer

⚠️ **Important**: This extension provides convenience security, not enterprise-level protection. It's designed to prevent casual unauthorized access, not to protect against determined attackers or malware.

For sensitive data or high-security needs:
- Use full disk encryption
- Use OS-level security features
- Use enterprise security solutions
- Don't rely solely on browser extensions

---

**Use responsibly and understand the limitations!** 🔒
