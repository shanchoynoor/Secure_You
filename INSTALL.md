# Installation Guide - Browser Lock Pro

## Quick Installation (5 minutes)

### Step 1: Prepare the Extension
1. Download all extension files to a folder on your computer
2. Create an `icons` folder inside the extension folder
3. Add icon images (or use the instructions below to create them)

### Step 2: Create Icons (Optional)
If you don't have icons, you can:
- Use any PNG images (16x16, 48x48, 128x128 pixels)
- Create simple colored squares as placeholders
- Download free lock icons from icon websites
- Or skip this - Chrome will use a default icon

To create quick placeholder icons:
1. Open any image editor (Paint, Photoshop, GIMP, etc.)
2. Create 3 images: 16x16, 48x48, 128x128 pixels
3. Fill with a solid color (e.g., purple/blue)
4. Save as: `icon16.png`, `icon48.png`, `icon128.png`
5. Place in the extension folder (not in icons subfolder)

### Step 3: Load Extension in Chrome
1. Open Google Chrome
2. Type `chrome://extensions` in the address bar
3. Enable **Developer mode** (toggle in top-right corner)
4. Click **"Load unpacked"** button
5. Select your extension folder
6. Click **"Select Folder"**

### Step 4: Pin the Extension
1. Click the puzzle piece icon in Chrome toolbar
2. Find "Browser Lock Pro"
3. Click the pin icon to keep it visible

### Step 5: Set Your Password
1. Click the Browser Lock Pro icon
2. Enter a password (minimum 4 characters)
3. Confirm your password
4. Click "Set Password & Activate"

## Troubleshooting

### "Manifest file is missing or unreadable"
- Make sure `manifest.json` is in the root folder
- Check that the file is not corrupted
- Verify JSON syntax is correct

### "Could not load icon"
- Create placeholder icon files (see Step 2)
- Or remove the "icons" section from manifest.json temporarily

### Extension doesn't appear
- Refresh the extensions page
- Make sure Developer mode is enabled
- Check for error messages in red

### Lock overlay doesn't show
- Refresh the webpage after locking
- Check that the extension has permissions
- Try locking from a regular webpage (not chrome:// pages)

## Uninstallation

⚠️ **Important**: Unlock the browser before uninstalling!

1. Unlock the browser using your password
2. Go to `chrome://extensions`
3. Find "Browser Lock Pro"
4. Click "Remove"
5. Confirm removal

If you forgot your password:
1. Close Chrome completely
2. Reopen Chrome
3. Quickly go to `chrome://extensions` before auto-lock triggers
4. Remove the extension

## Security Tips

✅ **Use a strong password**: Mix letters, numbers, and symbols
✅ **Remember your password**: There's no recovery option
✅ **Test the lock**: Lock and unlock once to verify it works
✅ **Set auto-lock**: Enable auto-lock for automatic protection
✅ **Keep it pinned**: Pin the extension for quick access

## Advanced Configuration

### Change Auto-Lock Time
1. Click extension icon (when unlocked)
2. Select time from "Auto-lock after" dropdown
3. Options: 5, 15, 30, or 60 minutes

### Change Password
1. Click extension icon (when unlocked)
2. Click "Change Password"
3. Enter current password
4. Enter and confirm new password
5. Click "Save Password"

## Browser Compatibility

✅ **Google Chrome** - Fully supported
✅ **Microsoft Edge** - Fully supported (Chromium-based)
✅ **Brave Browser** - Fully supported
✅ **Opera** - Should work (Chromium-based)
✅ **Vivaldi** - Should work (Chromium-based)

❌ **Firefox** - Not compatible (different extension system)
❌ **Safari** - Not compatible (different extension system)

## Need Help?

- Check the README.md for detailed documentation
- Review the code - it's open source!
- Create an issue in the repository
- Test in a new browser profile first

---

**Ready to secure your browser? Follow the steps above!** 🔒
