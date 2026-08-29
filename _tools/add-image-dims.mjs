/**
 * Add intrinsic width/height to <img> tags that lack them.
 *
 * Browsers use the width/height attributes to reserve the right box before the
 * image arrives, which is what keeps images from shifting the layout. CSS still
 * controls the rendered size — these attributes only supply the aspect ratio.
 *
 * Skips tags whose src is a JS template expression rather than a real path.
 *
 *   node _tools/add-image-dims.mjs          # report only
 *   node _tools/add-image-dims.mjs --write  # apply
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WRITE = process.argv.includes('--write');
const FILES = ['index.html', '404.html', 'pages/menu.html', 'pages/about.html', 'pages/contact.html', 'pages/parties.html'];

let added = 0, skipped = 0;

for (const file of FILES) {
  const full = path.join(ROOT, file);
  let html = fs.readFileSync(full, 'utf8');
  const tags = html.match(/<img\b[^>]*>/g) || [];

  for (const tag of tags) {
    if (/\bwidth\s*=/.test(tag) && /\bheight\s*=/.test(tag)) continue;

    const src = (tag.match(/\bsrc\s*=\s*"([^"]*)"/) || [])[1];
    if (!src || src.includes("' +") || src.startsWith('data:') || src.startsWith('http')) { skipped++; continue; }

    const abs = path.join(ROOT, decodeURIComponent(src));
    if (!fs.existsSync(abs)) { console.log(`  ? ${file}: missing file ${src}`); skipped++; continue; }

    const { width, height } = await sharp(abs).metadata();
    // Insert right after <img so attribute order stays readable
    const updated = tag.replace(/^<img/, `<img width="${width}" height="${height}"`);
    html = html.replace(tag, updated);
    added++;
    console.log(`  + ${file}: ${src} → ${width}x${height}`);
  }

  if (WRITE) fs.writeFileSync(full, html);
}

console.log(`\n${WRITE ? 'Applied' : 'Would apply'}: ${added} image(s) sized, ${skipped} skipped.`);
if (!WRITE) console.log('Re-run with --write to apply.');
