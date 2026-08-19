// Same rationale as optimize-images.mjs: the 89 dish photos in
// menu-images-webp/ are rendered as small lazy-loaded card thumbnails but
// were stored at up to 1672px wide (21MB total). Downsizes to card size.
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.join(__dirname, '..', 'menu-images-webp');

const MAX_WIDTH = 800;
const QUALITY = 75;

async function run() {
  const files = fs.readdirSync(DIR).filter(f => f.endsWith('.webp'));
  let totalBefore = 0, totalAfter = 0;
  for (const file of files) {
    const p = path.join(DIR, file);
    const before = fs.statSync(p).size;
    const meta = await sharp(p).metadata();
    const targetWidth = Math.min(meta.width, MAX_WIDTH);
    const buf = await sharp(p).resize({ width: targetWidth, withoutEnlargement: true }).webp({ quality: QUALITY }).toBuffer();
    fs.writeFileSync(p, buf);
    totalBefore += before; totalAfter += buf.length;
  }
  console.log(`${files.length} files: ${(totalBefore/1024/1024).toFixed(1)}MB -> ${(totalAfter/1024/1024).toFixed(1)}MB (saved ${((totalBefore-totalAfter)/1024/1024).toFixed(1)}MB)`);
}
run();
