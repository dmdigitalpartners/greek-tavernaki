/**
 * Cache-bust local JS/CSS references in every HTML page.
 *
 * Why: vercel.json caches *.js / *.css for a day (+7 days stale-while-revalidate),
 * and the pages loaded them at fixed URLs. After a menu change, returning
 * visitors kept the old js/menu-data.js, and applyLang() then rewrote the
 * freshly pre-rendered dish names/descriptions from that stale copy.
 *
 * This appends ?v=<first 8 hex of the file's SHA-256> to every local
 * <script src="…js"> and <link href="…css">, so the URL changes exactly when the
 * file does. Idempotent; run as the last step of `npm run build`.
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PAGES = ['index.html', '404.html', ...fs.readdirSync(path.join(ROOT, 'pages')).filter((f) => f.endsWith('.html')).map((f) => `pages/${f}`)];

const hashCache = new Map();
function hashOf(absPath) {
  if (!hashCache.has(absPath)) {
    hashCache.set(absPath, crypto.createHash('sha256').update(fs.readFileSync(absPath)).digest('hex').slice(0, 8));
  }
  return hashCache.get(absPath);
}

// src="js/x.js" | src="/js/x.js" | href="css/x.css" (optionally with an existing ?v=…)
const RE = /\b(src|href)="((?!https?:|\/\/|data:)[^"?#]+\.(?:js|css))(?:\?v=[0-9a-f]+)?"/g;

let changed = 0;
for (const rel of PAGES) {
  const file = path.join(ROOT, rel);
  const html = fs.readFileSync(file, 'utf8');
  const out = html.replace(RE, (m, attr, url) => {
    // The site is served from the project root (pages/ are rewritten to clean
    // URLs), so both "js/x.js" and "/js/x.js" resolve against ROOT.
    const abs = path.join(ROOT, url.replace(/^\//, ''));
    if (!fs.existsSync(abs)) return m; // leave unknown references alone
    return `${attr}="${url}?v=${hashOf(abs)}"`;
  });
  if (out !== html) {
    fs.writeFileSync(file, out);
    changed++;
  }
}
console.log(`Versioned JS/CSS references in ${changed}/${PAGES.length} pages`);
