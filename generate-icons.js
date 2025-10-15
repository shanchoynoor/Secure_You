// Save as generate-icons.js
import fs from 'fs';
import { createCanvas } from 'canvas';

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