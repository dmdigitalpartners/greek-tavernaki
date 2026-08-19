import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// Icon derived from the Tavernaki brand: forest-green (#2D6A3F, the site's
// established primary brand color) with a serif "T" — since the client logo
// is a wide wordmark with no square icon lockup to crop from, this mirrors
// the treatment already used site-wide (Cinzel/Georgia serif display type).
const svg = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="18" fill="#2D6A3F"/>
  <text x="50" y="54" dominant-baseline="middle" text-anchor="middle" font-size="62"
        font-family="Georgia, 'Times New Roman', serif" font-weight="700" fill="#FAF8F3">T</text>
</svg>`;

const sizes = [16, 32, 48, 96, 180, 192, 512];

async function run() {
  for (const size of sizes) {
    const buf = Buffer.from(svg(size));
    const outPng = path.join(ROOT, `favicon-${size}x${size}.png`);
    await sharp(buf).resize(size, size).png().toFile(outPng);
    console.log('wrote', outPng);
  }
  fs.copyFileSync(path.join(ROOT, 'favicon-180x180.png'), path.join(ROOT, 'apple-touch-icon.png'));
  console.log('wrote apple-touch-icon.png');
}
run();
