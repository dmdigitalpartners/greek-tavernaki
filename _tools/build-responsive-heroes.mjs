/**
 * Generate responsive variants for the hero images and wire up srcset.
 *
 * Each page's LCP element is its hero image, and every one was served at full
 * desktop resolution (up to 1672px, 155-277KB) to phones — where ~85% of this
 * site's search traffic is. A 768px-wide variant is 3-4x smaller and is what a
 * 390px viewport actually needs.
 *
 * Generates <name>-768w.webp and <name>-1280w.webp beside each original, then
 * adds srcset/sizes to the matching <img> tags. The original stays as the src
 * fallback so nothing breaks if a variant is missing.
 *
 * Run once after changing a hero image, then commit the output:
 *   node _tools/build-responsive-heroes.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const encoded = (p) => p.split('/').map(encodeURIComponent).join('/');

// Hero images that are the LCP element on their page
const HEROES = [
  { file: 'Visual Assets/greek food.webp', pages: ['pages/menu.html'] },
  { file: 'Visual Assets/about us pic.webp', pages: ['pages/about.html'] },
  { file: 'Visual Assets/parties-hero.webp', pages: ['pages/parties.html'] },
  { file: 'Visual Assets/atmosphere-exterior.webp', pages: ['pages/contact.html'] },
];

const WIDTHS = [768, 1280];

for (const hero of HEROES) {
  const src = path.join(ROOT, hero.file);
  const meta = await sharp(src).metadata();
  const base = hero.file.replace(/\.webp$/, '');

  const variants = [];
  for (const w of WIDTHS) {
    if (w >= meta.width) continue; // never upscale
    const rel = `${base}-${w}w.webp`;
    const buf = await sharp(src).resize({ width: w }).webp({ quality: w <= 768 ? 76 : 78 }).toBuffer();
    fs.writeFileSync(path.join(ROOT, rel), buf);
    variants.push({ rel, w, kb: (buf.length / 1024).toFixed(0) });
  }
  if (!variants.length) {
    console.log(`  = ${hero.file}: already small enough`);
    continue;
  }

  const srcset = [
    ...variants.map((v) => `${encoded(v.rel)} ${v.w}w`),
    `${encoded(hero.file)} ${meta.width}w`,
  ].join(', ');
  // Hero images are full-bleed, so the rendered width is the viewport width
  const sizes = '100vw';

  for (const page of hero.pages) {
    const full = path.join(ROOT, page);
    let html = fs.readFileSync(full, 'utf8');
    const re = new RegExp(
      `<img\\b[^>]*src="(?:${escapeRe(encoded(hero.file))}|${escapeRe(hero.file)})"[^>]*>`
    );
    const m = html.match(re);
    if (!m) {
      console.log(`  ! ${page}: no <img> found for ${hero.file}`);
      continue;
    }
    if (m[0].includes('srcset')) {
      console.log(`  = ${page}: already has srcset`);
      continue;
    }
    const updated = m[0].replace(/^<img/, `<img srcset="${srcset}" sizes="${sizes}"`);
    html = html.replace(m[0], updated);
    fs.writeFileSync(full, html);
    console.log(
      `  + ${page}: srcset → ${variants.map((v) => `${v.w}w=${v.kb}KB`).join(', ')}, orig=${meta.width}w`
    );
  }
}

// The homepage hero is a <video> poster, and poster= has no srcset equivalent.
// Re-encode it at 1280w instead — it sits behind a dark overlay, so the
// resolution drop is not visible, and it is the preloaded LCP resource.
const POSTER = 'Visual Assets/HERO-PAGE.webp';
const posterPath = path.join(ROOT, POSTER);
// Read into memory first — sharp streams from disk lazily, and writing back to
// the same path while it still holds the handle fails on Windows.
const posterInput = fs.readFileSync(posterPath);
const pMeta = await sharp(posterInput).metadata();
if (pMeta.width > 1280) {
  const before = posterInput.length;
  const buf = await sharp(posterInput).resize({ width: 1280 }).webp({ quality: 80 }).toBuffer();
  fs.writeFileSync(posterPath, buf);
  console.log(
    `  + ${POSTER}: ${pMeta.width}w ${(before / 1024).toFixed(0)}KB → 1280w ${(buf.length / 1024).toFixed(0)}KB (video poster, no srcset possible)`
  );
} else {
  console.log(`  = ${POSTER}: already <= 1280w`);
}
