// Resizes + recompresses Visual Assets images to match their actual on-page
// display size (they were all served at native capture resolution — up to
// 4x larger than needed — which Lighthouse flagged as ~1.3MB of avoidable
// weight and a contributor to slow LCP/Speed Index).
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.join(__dirname, '..', 'Visual Assets');

// tier -> [maxWidth, webp quality]
const TIERS = {
  hero:  { maxWidth: 1920, quality: 78, files: ['HERO-PAGE.webp', 'about us pic.webp', 'parties-hero.webp', 'greek food.webp'] },
  half:  { maxWidth: 1000, quality: 78, files: ['welcome-table.webp', 'History-Image.webp', 'parties-advantages.webp'] },
  card:  { maxWidth: 800,  quality: 75, files: ['barbun.webp', 'plato-morski-darove.webp', 'kinoa-skaridi.webp', 'svinski-kascheta-chushki.webp',
                    'atmosphere-interior.webp', 'atmosphere-table.webp', 'atmosphere-terrace.webp', 'atmosphere-exterior.webp',
                    'about-veranda.webp', 'about-detail.webp'] },
};

async function run() {
  let totalBefore = 0, totalAfter = 0;
  for (const [tier, { maxWidth, quality, files }] of Object.entries(TIERS)) {
    for (const file of files) {
      const p = path.join(DIR, file);
      if (!fs.existsSync(p)) { console.log('SKIP (not found):', file); continue; }
      const before = fs.statSync(p).size;
      const meta = await sharp(p).metadata();
      const targetWidth = Math.min(meta.width, maxWidth);
      const buf = await sharp(p).resize({ width: targetWidth, withoutEnlargement: true }).webp({ quality }).toBuffer();
      fs.writeFileSync(p, buf);
      const after = buf.length;
      totalBefore += before; totalAfter += after;
      console.log(`[${tier}] ${file}: ${meta.width}px ${(before/1024).toFixed(0)}KB -> ${targetWidth}px ${(after/1024).toFixed(0)}KB`);
    }
  }
  console.log(`\nTOTAL: ${(totalBefore/1024).toFixed(0)}KB -> ${(totalAfter/1024).toFixed(0)}KB  (saved ${((totalBefore-totalAfter)/1024).toFixed(0)}KB)`);
}
run();
