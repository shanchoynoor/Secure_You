# Icon Setup Guide

The Browser Lock Pro extension requires three icon files. Here's how to add them:

## Required Icons

You need 3 PNG files:
- `icon16.png` - 16x16 pixels (toolbar icon)
- `icon48.png` - 48x48 pixels (extension management)
- `icon128.png` - 128x128 pixels (Chrome Web Store)

## Option 1: Quick Placeholder Icons

Create simple colored squares:

1. Open any image editor (Paint, GIMP, Photoshop, etc.)
2. Create a new image with these dimensions:
   - 16x16 pixels
   - 48x48 pixels  
   - 128x128 pixels
3. Fill each with a solid color (e.g., #667eea - purple/blue)
4. Save as PNG files with the correct names
5. Place them in the extension root folder (same folder as manifest.json)

## Option 2: Download Free Icons

Visit these sites for free lock icons:
- https://www.flaticon.com (search "lock icon")
- https://icons8.com (search "lock")
- https://www.iconfinder.com (search "padlock")

Download in PNG format at the required sizes.

## Option 3: Use Emoji as Icon

You can convert lock emojis to PNG:
1. Go to https://emojipng.com
2. Search for "lock" 🔒
3. Download at different sizes
4. Resize to 16x16, 48x48, and 128x128 pixels

## Option 4: Skip Icons (Temporary)

If you want to test without icons:

1. Open `manifest.json`
2. Remove or comment out the "icons" section:
```json
"icons": {
  "16": "icon16.png",
  "48": "icon48.png",
  "128": "icon128.png"
}
```

Chrome will use a default puzzle piece icon.

## Recommended Icon Design

For a professional look:
- **Style**: Flat design or subtle 3D
- **Colors**: Blue/purple gradient (#667eea to #764ba2)
- **Symbol**: Padlock, lock, or shield
- **Background**: Transparent or solid color
- **Clarity**: Simple, recognizable at small sizes

## File Placement

```
browser-lock-extension/
├── icon16.png          ← Place here
├── icon48.png          ← Place here
├── icon128.png         ← Place here
├── manifest.json
├── popup.html
└── ...other files
```

## Testing Your Icons

1. Load the extension in Chrome
2. Check the toolbar - you should see icon16.png
3. Go to chrome://extensions - you should see icon48.png
4. If icons don't appear, check:
   - File names are exactly correct (case-sensitive)
   - Files are in the root folder
   - Files are valid PNG format
   - File sizes match requirements

## Creating Icons with Code

If you have Node.js, you can use this script to generate simple icons:

```javascript
// Save as generate-icons.js
const fs = require('fs');
const { createCanvas } = require('canvas');

const sizes = [16, 48, 128];
const color = '#667eea';

sizes.forEach(size => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Draw background
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, size, size);
  
  // Draw lock symbol (simplified)
  ctx.fillStyle = 'white';
  const lockSize = size * 0.6;
  const x = (size - lockSize) / 2;
  const y = (size - lockSize) / 2;
  ctx.fillRect(x, y, lockSize, lockSize);
  
  // Save
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(`icon${size}.png`, buffer);
});

console.log('Icons generated!');
```

Run with: `npm install canvas && node generate-icons.js`

---

**Once you have your icons, place them in the extension folder and reload the extension!**
