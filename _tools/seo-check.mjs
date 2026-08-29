/**
 * SEO regression checker for the Tavernaki site.
 *
 * Crawls the local site (node serve.mjs) and asserts the SEO invariants that
 * are easy to break by accident. No dependencies — plain Node + built-in fetch.
 *
 *   node _tools/seo-check.mjs                     # against http://localhost:3000
 *   node _tools/seo-check.mjs https://example.com # against any origin
 *
 * Exits 1 if any ERROR is found, so it can gate a commit or CI step.
 */

const ORIGIN = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '');
const CANONICAL_ORIGIN = 'https://www.tavernaki-plovdiv.com';

const ROUTES = ['/', '/menu', '/about', '/contact', '/parties'];

const errors = [];
const warnings = [];
const err = (page, msg) => errors.push(`${page} — ${msg}`);
const warn = (page, msg) => warnings.push(`${page} — ${msg}`);

// --- tiny HTML helpers (regex is fine for our own hand-written markup) -------

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i'));
  return m ? (m[2] ?? m[3]) : null;
};
const tags = (html, name) =>
  html.match(new RegExp(`<${name}\\b[^>]*>`, 'gi')) || [];
const textOf = (html, name) => {
  const m = html.match(new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)</${name}>`, 'i'));
  return m ? m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : null;
};
const metaContent = (html, key, kind = 'name') => {
  const re = new RegExp(`<meta\\b[^>]*${kind}\\s*=\\s*["']${key}["'][^>]*>`, 'i');
  const m = html.match(re);
  return m ? attr(m[0], 'content') : null;
};

// --- fetch every route once -------------------------------------------------

const pages = new Map();

for (const route of ROUTES) {
  const res = await fetch(ORIGIN + route, { redirect: 'manual' });
  if (res.status !== 200) {
    err(route, `expected HTTP 200, got ${res.status}`);
    continue;
  }
  pages.set(route, await res.text());
}

// --- per-page checks --------------------------------------------------------

for (const [route, html] of pages) {
  // Title
  const title = textOf(html, 'title');
  if (!title) err(route, 'missing <title>');
  else if (title.length > 65) warn(route, `title is ${title.length} chars, likely truncated in SERP: "${title}"`);

  // Meta description
  const desc = metaContent(html, 'description');
  if (!desc) err(route, 'missing meta description');
  else if (desc.length > 165) warn(route, `meta description is ${desc.length} chars, likely truncated`);

  // Canonical
  const canonicalTag = (html.match(/<link\b[^>]*rel\s*=\s*["']canonical["'][^>]*>/i) || [])[0];
  if (!canonicalTag) {
    err(route, 'missing rel=canonical');
  } else {
    const href = attr(canonicalTag, 'href');
    const expected = CANONICAL_ORIGIN + (route === '/' ? '/' : route);
    if (href !== expected) err(route, `canonical is "${href}", expected "${expected}"`);
  }

  // Robots — nothing indexable should be noindex
  const robots = metaContent(html, 'robots');
  if (robots && /noindex/i.test(robots)) err(route, `has meta robots "${robots}" but is in the sitemap`);

  // Headings
  const h1s = html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi) || [];
  if (h1s.length === 0) err(route, 'no <h1>');
  else if (h1s.length > 1) err(route, `${h1s.length} <h1> elements, expected exactly 1`);

  const h1Text = h1s[0]?.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  const h2Texts = (html.match(/<h2\b[^>]*>[\s\S]*?<\/h2>/gi) || [])
    .map(h => h.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
  if (h1Text && h2Texts.includes(h1Text)) {
    err(route, `an <h2> duplicates the <h1> verbatim ("${h1Text}") — wasted heading`);
  }

  // Open Graph / social
  for (const key of ['og:title', 'og:description', 'og:url', 'og:image', 'og:site_name', 'og:locale']) {
    if (!metaContent(html, key, 'property')) err(route, `missing ${key}`);
  }

  // Images
  for (const img of tags(html, 'img')) {
    const src = attr(img, 'src') || '(no src)';
    // Skip <img> written inside a JS string template rather than real markup
    if (src.includes("' +") || src.includes('" +')) continue;
    if (attr(img, 'alt') === null) err(route, `<img> without alt attribute: ${src}`);
    if (!attr(img, 'width') || !attr(img, 'height')) {
      warn(route, `<img> without width/height (CLS risk): ${src}`);
    }
  }

  // JSON-LD must parse
  const ldBlocks = html.match(
    /<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  ) || [];
  if (ldBlocks.length === 0) err(route, 'no JSON-LD structured data');
  for (const block of ldBlocks) {
    const body = block.replace(/^[\s\S]*?>/, '').replace(/<\/script>$/i, '');
    try {
      const parsed = JSON.parse(body);
      // A block is either a single node or an @graph of nodes
      const nodes = Array.isArray(parsed['@graph']) ? parsed['@graph'] : [parsed];
      for (const node of nodes) {
        if (!node['@type']) err(route, `JSON-LD node has no @type: ${JSON.stringify(node).slice(0, 80)}`);
      }
      // Self-serving ratings are ineligible under Google's review-snippet policy
      if (JSON.stringify(parsed).includes('aggregateRating')) {
        err(route, 'JSON-LD contains aggregateRating — self-serving ratings violate Google policy');
      }
    } catch (e) {
      err(route, `invalid JSON-LD: ${e.message}`);
    }
  }
}

// --- cross-page checks ------------------------------------------------------

const seenTitles = new Map();
const seenDescs = new Map();
for (const [route, html] of pages) {
  const t = textOf(html, 'title');
  const d = metaContent(html, 'description');
  if (t) seenTitles.set(t, [...(seenTitles.get(t) || []), route]);
  if (d) seenDescs.set(d, [...(seenDescs.get(d) || []), route]);
}
for (const [t, routes] of seenTitles) if (routes.length > 1) err(routes.join(' + '), `duplicate <title>: "${t}"`);
for (const [d, routes] of seenDescs) if (routes.length > 1) err(routes.join(' + '), `duplicate meta description`);

// --- internal links resolve -------------------------------------------------

const checked = new Map();
for (const [route, html] of pages) {
  const hrefs = new Set(
    (html.match(/<a\b[^>]*href\s*=\s*["'][^"']+["'][^>]*>/gi) || [])
      .map(a => attr(a, 'href'))
      .filter(h => h && h.startsWith('/'))
      .map(h => h.split('#')[0])
      .filter(Boolean)
  );
  for (const href of hrefs) {
    if (!checked.has(href)) {
      const r = await fetch(ORIGIN + href, { redirect: 'manual' });
      checked.set(href, r.status);
    }
    const status = checked.get(href);
    if (status >= 400) err(route, `broken internal link → ${href} (HTTP ${status})`);
  }
}

// --- sitemap + robots -------------------------------------------------------

const sitemapRes = await fetch(ORIGIN + '/sitemap.xml');
if (!sitemapRes.ok) {
  err('/sitemap.xml', `HTTP ${sitemapRes.status}`);
} else {
  const xml = await sitemapRes.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  if (locs.length === 0) err('/sitemap.xml', 'contains no <loc> entries');

  for (const loc of locs) {
    if (!loc.startsWith(CANONICAL_ORIGIN)) {
      err('/sitemap.xml', `non-canonical hostname in sitemap: ${loc}`);
    }
    // Resolve the path against the origin under test
    const path = loc.replace(CANONICAL_ORIGIN, '') || '/';
    const r = await fetch(ORIGIN + path, { redirect: 'manual' });
    if (r.status !== 200) err('/sitemap.xml', `${loc} → HTTP ${r.status} (sitemaps must list 200-status canonical URLs)`);
  }

  // Every indexable route should be listed, and vice versa
  const sitemapPaths = new Set(locs.map(l => l.replace(CANONICAL_ORIGIN, '') || '/'));
  for (const route of ROUTES) {
    if (!sitemapPaths.has(route)) err('/sitemap.xml', `indexable route ${route} is missing from the sitemap`);
  }
  if (!/<lastmod>/.test(xml)) warn('/sitemap.xml', 'no <lastmod> — Google uses it, unlike changefreq/priority');
}

const robotsRes = await fetch(ORIGIN + '/robots.txt');
if (!robotsRes.ok) {
  err('/robots.txt', `HTTP ${robotsRes.status}`);
} else {
  const txt = await robotsRes.text();
  if (!/^\s*Sitemap:\s*\S+/im.test(txt)) err('/robots.txt', 'no Sitemap: directive');
  if (/^\s*Disallow:\s*\/\s*$/im.test(txt)) err('/robots.txt', 'Disallow: / blocks the whole site');
}

// --- 404 behaviour ----------------------------------------------------------

const notFound = await fetch(ORIGIN + '/definitely-not-a-real-page-xyz', { redirect: 'manual' });
if (notFound.status !== 404) err('/404', `unknown URL returned HTTP ${notFound.status}, expected 404 (soft 404s waste crawl budget)`);
else {
  const body = await notFound.text();
  if (!/noindex/i.test(body)) warn('/404', '404 page has no meta robots noindex');
}

// --- report -----------------------------------------------------------------

console.log(`\nSEO check — ${ORIGIN}\n${'='.repeat(60)}`);
console.log(`Pages crawled: ${pages.size}`);

if (warnings.length) {
  console.log(`\nWARNINGS (${warnings.length})`);
  // Collapse the noisy repeated image warnings
  const imgWarn = warnings.filter(w => w.includes('<img> without width/height'));
  const other = warnings.filter(w => !w.includes('<img> without width/height'));
  for (const w of other) console.log(`  ! ${w}`);
  if (imgWarn.length) {
    const byPage = {};
    for (const w of imgWarn) { const p = w.split(' — ')[0]; byPage[p] = (byPage[p] || 0) + 1; }
    for (const [p, n] of Object.entries(byPage)) console.log(`  ! ${p} — ${n} <img> without width/height (CLS risk)`);
  }
}

if (errors.length) {
  console.log(`\nERRORS (${errors.length})`);
  for (const e of errors) console.log(`  x ${e}`);
  console.log(`\nFAILED — ${errors.length} error(s)\n`);
  process.exit(1);
}

console.log(`\nPASSED — no errors${warnings.length ? `, ${warnings.length} warning(s)` : ''}\n`);
