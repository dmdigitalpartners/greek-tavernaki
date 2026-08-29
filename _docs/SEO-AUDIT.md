# Greek Tavernaki — SEO Audit & Implementation

**Date:** 2026-08-29
**Branch:** `feat/deep-seo-optimization`
**Canonical host:** `https://www.tavernaki-plovdiv.com/`
**Search Console data:** export dated 2026-08-29 (`Performance on Search`), property `https://www.tavernaki-plovdiv.com/`

---

## 1. Executive summary

The site is not struggling to be found — it is struggling to be *understood* and *clicked*.

In the nine days of data the property has, it earned **7 clicks from 233 impressions (3.0% CTR, average
position 6.7)**. Five findings explain most of the gap:

1. **The site ranks 6.4th for its own brand name.** "тавернаки" produced 91 impressions and 3 clicks. A
   restaurant should own position 1 for its own name; Google Maps, Wolt, Glovo, Takeaway, Facebook and
   RestaurantGuru are all ranking above it. This is the single largest addressable pool of existing demand.
2. **Every page except the homepage had a 0% CTR** — 92 impressions, zero clicks across /contact, /menu,
   /about and /parties.
3. **The entire 85-dish menu was invisible to search engines.** The served HTML contained zero dish names;
   all 85 cards were built client-side. This is the site's most commercially valuable content.
4. **Zero rich results.** GSC's Search-appearance report is empty. The Restaurant schema carried an
   `aggregateRating` copied from Google Maps — self-serving rating markup that is ineligible under Google's
   review-snippet policy and risks a spammy-structured-markup manual action.
5. **The homepage transferred 11.4 MB, 10.99 MB of it an autoplaying hero video**, on a site where 85% of
   impressions are mobile.

All five are addressed. The site's design is unchanged: every page was pixel-diffed before and after, and
the only differences were the hero video's playback frame and lazy-image load timing.

---

## 2. Search Console — the last 7 days

The export's filter reads "Last 3 months", but the property has **no data before 2026-08-18**. The available
data therefore *is* the requested window. Last 7 full days (2026-08-20 → 2026-08-26):

| Metric | Value |
|---|---|
| Clicks | 7 |
| Impressions | 232 |
| CTR | 3.0% |
| Average position | 6.6 |

Full available window (08-18 → 08-26): 7 clicks, 233 impressions, 3.0% CTR, position 6.7.

> **Caveat worth keeping in mind:** 7 clicks is far too small a sample to read CTR trends from. Treat the
> query and page splits below as directional, and the technical findings — which do not depend on sample
> size — as the actionable part.

### Queries

| Query | Clicks | Impr | CTR | Pos | Read |
|---|---:|---:|---:|---:|---|
| тавернаки | 3 | 91 | 3.3% | 6.4 | **Brand — ranked 6th on its own name** |
| tavernaki | 0 | 28 | 0% | 6.43 | Brand, Latin spelling, zero clicks |
| тавернаки пловдив | 1 | 17 | 5.9% | 6.94 | Brand + local |
| тавернаки меню | 0 | 6 | 0% | 5.67 | **Menu intent — menu was not in the HTML** |
| гръцки ресторант пловдив | 0 | 5 | 0% | 21.2 | **The money keyword — stuck on page 3** |
| tavernaki plovdiv | 0 | 4 | 0% | 7.25 | Brand, EN |
| тавернаки пловдив меню | 0 | 3 | 0% | 7.0 | Menu intent |
| гръцка таверна tavernaki | 0 | 2 | 0% | 10 | Official registered name |
| гръцки ресторант | 0 | 2 | 0% | 1 | Position 1, but 2 impressions — almost certainly hyper-local personalisation, not a real ranking |
| пещерска | 0 | 1 | 0% | 4 | Street-name / near-me intent |
| ресторант тавернаки | 0 | 1 | 0% | 8 | Brand |
| меню на гръцка таверна tavernaki | 0 | 1 | 0% | 10 | Menu intent |

**Branded ≈ 153 of 233 impressions (66%).** The site is almost entirely living on people who already know
the name. Non-branded commercial demand exists but is barely reached: "гръцки ресторант пловдив" sits at
position 21.2.

**Striking distance:** the highest-leverage opportunity is not a position-11–20 keyword — it is the branded
cluster already at position 6–7. Moving "тавернаки" (91 impressions) from 6.4 to the top 3 is worth more
than anything else available, and it is an entity/authority problem, not a content problem.

### Pages

| Page | Clicks | Impr | CTR | Pos |
|---|---:|---:|---:|---:|
| `/` | 7 | 195 | 3.59% | 6.62 |
| `/contact` | 0 | 45 | 0% | 7.49 |
| `/menu` | 0 | 26 | 0% | 8.08 |
| `/about` | 0 | 16 | 0% | 10.88 |
| `/parties` | 0 | 5 | 0% | 7.60 |

`/contact` is the second-most-surfaced page and converted nothing. It had no LocalBusiness structured data at
all — the page that answers "where is it / when is it open" was the page least equipped to answer it in the
SERP. Now fixed.

### Devices

| Device | Clicks | Impr | CTR | Pos |
|---|---:|---:|---:|---:|
| Mobile | 6 | 199 | 3.02% | 6.66 |
| Desktop | 1 | 34 | 2.94% | 7.35 |

**85% of impressions are mobile.** This is why the 11 MB hero video was the most damaging technical defect
on the site.

### Countries

| Country | Clicks | Impr |
|---|---:|---:|
| Bulgaria | 7 | 225 |
| Greece | 0 | 6 |
| UAE | 0 | 1 |
| USA | 0 | 1 |

96.6% Bulgaria. This is what makes English-language SEO a medium-term project rather than an urgent one.

### Search appearance

**Empty.** No rich result of any kind was being granted, despite Restaurant schema being present. See §6.

---

## 3. Technical SEO

### Verified correct before this work (no change needed)

- Apex and `http://` both 308-redirect to `https://www.tavernaki-plovdiv.com/`.
- Unknown URLs return a genuine **HTTP 404** (not a soft 404) with `meta robots noindex`.
- `rel=canonical` present and correct on all five indexable pages.
- `robots.txt` allows crawling and points at the sitemap.
- Google Search Console verification file present.
- `BreadcrumbList` structured data was already static on all four subpages.

### Fixed

| Issue | Evidence | Fix |
|---|---|---|
| `/pages/*.html` returned **200 and were broken** — their relative `js/site-config.js` resolves to `/pages/js/site-config.js`, which 404s. `/pages/menu.html` was a crawlable, indexable, dish-less page | Verified: `/pages/js/menu-data.js` → 404 | 308 redirects `/pages/:page.html` → `/:page` |
| `/index.html` served a 200 duplicate of `/` | Verified | 308 redirect → `/` |
| `greek-tavernaki.vercel.app` and `greek-tavernaki-iota.vercel.app` served full 200 duplicates | Verified | `X-Robots-Tag: noindex, nofollow` on any `*.vercel.app` host. Deliberately **not** a redirect — that would break the PR preview deployments the repo's workflow depends on |
| `/menu/` (trailing slash) returned 404 | Verified | `"trailingSlash": false` |
| **No caching at all** — every asset served `Cache-Control: public, must-revalidate, max-age=0` | Verified via HEAD on 6 assets | 30-day cache for images/video/fonts, 1-day for CSS/JS, 1-hour for sitemap/robots |
| CSP blocked Microsoft Clarity (`scripts.clarity.ms` not allowlisted) — analytics dead sitewide | Console error | Allowlisted `https://*.clarity.ms` |
| Sitemap used `changefreq`/`priority` (Google ignores both) and had no `lastmod` (Google uses it) | — | Rewritten with `lastmod` only |

---

## 4. On-page SEO

| Page | Target intent | Key change |
|---|---|---|
| `/` | Brand + "гръцки ресторант Пловдив" | Entity graph (Restaurant + WebSite + Organization); `aggregateRating` removed; video deferred; contextual link to `/menu#fish` |
| `/menu` | "тавернаки меню", dish-level long tail | **All 85 dishes pre-rendered into the HTML**; Menu schema made static; responsive hero; link to `/parties` |
| `/contact` | "тавернаки пловдив", address/hours/near-me | Full `Restaurant` entity with NAP, geo and corrected hours; duplicate H2 replaced with "Как да ни намерите в Пловдив" |
| `/about` | Brand trust, "гръцка кухня Пловдив" | Duplicate H2 replaced with "Пет години автентична гръцка кухня в Пловдив"; first in-content link (to `/menu`) |
| `/parties` | "ресторант за тържества Пловдив" | Restaurant entity reference; contextual link to `/contact` |

### Titles and meta descriptions

Audited all five. They were already unique, location-bearing, and free of keyword stuffing — **no changes
were needed or made**. Rewriting them would have been churn, not optimisation.

### Headings

Two pages carried an `<h2>` that duplicated their `<h1>` word-for-word, wasting a heading and offering
Google no additional topical signal:

- `/about`: "Добре дошли в Тавернаки" (h1) and again as h2 → h2 now "Пет години автентична гръцка кухня в Пловдив"
- `/contact`: "Работно Време & Адрес" (h1) and again as h2 → h2 now "Как да ни намерите в Пловдив"

Both replacements are grounded in existing on-page copy (the about page already states "повече от пет
години") and are styled identically — no visual change.

### A factual inconsistency found and corrected

The site claimed **"Открито всеки ден 10:00 — 00:00"** in its CTA and meta descriptions, while its own hours
table correctly showed **Sunday 10:00 – 23:30**. The structured data repeated the incorrect "every day until
00:00". Corrected to "Открито всеки ден от 10:00" in copy, and split into Mon–Sat / Sun in the schema.

Also fixed: the English contact meta description contained `Peshtерsko` — Cyrillic "ер" inside a Latin word.

---

## 5. Local SEO

NAP is consistent across `js/site-config.js`, the contact page, the footer and the structured data:

```
Тавернаки (Гръцка таверна Tavernaki)
бул. Пещерско шосе 28а, кв. Младежки хълм, 4002 Пловдив
+359 87 764 6206  ·  tavernaki@abv.bg
Mon–Sat 10:00–00:00, Sun 10:00–23:30
```

Improvements made:

- **Geo coordinates added** (42.1399077, 24.7265002), taken from the Google Maps embed already on the site.
- **`sameAs` expanded** from 2 to 6 profiles — Facebook, Instagram, plus the Google Maps profile, Wolt,
  Glovo and Takeaway. All four additions were already linked in the site's own footer, so they are verified,
  not invented. These are exactly the properties currently outranking the site for its own brand name;
  declaring them as the same entity is the correct signal.
- **`areaServed`, `currenciesAccepted`, `acceptsReservations`, `hasMenu`** added.
- **`Restaurant` entity now present on `/contact`**, the page that actually answers local queries.

### Open item for the business owner

The business intelligence report records the address as "бул. Пещерско шосе **28**" in Bulgarian but
"Peshtersko Shose **28a**" in English. The site consistently uses **28а**. Worth confirming against the
Google Business Profile so the two match exactly — NAP consistency across the web is a genuine local
ranking factor and this is the one field where the site's sources disagree.

---

## 6. Structured data

### Removed

`aggregateRating: 4.1 / 637 reviews`.

This figure is the **Google Maps rating**, republished by the business about itself. Google's review-snippet
guidance is explicit that ratings must be sourced from the site's own users and that self-serving reviews —
a business publishing ratings about itself — are ineligible. Carrying it earned nothing (Search appearance
was empty) while exposing the site to a spammy-structured-markup manual action.

The 4.1★ / 637 figures **remain as visible on-page content**, which is entirely legitimate. Only the
machine-readable claim was removed.

### Added

| Type | Where | Purpose |
|---|---|---|
| `Restaurant` (`#restaurant`) | `/` full, `/contact` full, others by `@id` reference | The business entity, with geo, corrected hours, 6 `sameAs` profiles |
| `WebSite` (`#website`) | `/` | Drives Google's site-name feature — relevant given 66% of impressions are branded |
| `Organization` (`#organization`) | `/` | Publisher entity with logo |
| `Menu` + 8 × `MenuSection` + 85 × `MenuItem` | `/menu` | **Now static.** Was injected client-side by `renderMenuSchema()` |
| `BreadcrumbList` | all subpages | Already existed; now carries an `@id` and sits in the same `@graph` |

All blocks validated as parseable JSON with a `@type` on every node, by `_tools/seo-check.mjs`.

> Rich Results Test against the deployed preview URL is still outstanding — see §10.

---

## 7. Performance

### Measured improvements (reliable — independent of compression)

| Metric | Page | Before | After |
|---|---|---:|---:|
| **CLS** (mobile) | `/menu` | **0.1386** | **0** |
| **CLS** (desktop) | `/menu` | **0.1899** | **0.0042** |
| **TBT** (mobile) | `/` | 496 ms | **51 ms** |
| **TBT** (mobile) | `/menu` | 323 ms | **57 ms** |
| **TBT** (mobile) | `/about` | 295 ms | **23 ms** |
| **TBT** (mobile) | `/contact` | 288 ms | **32 ms** |
| **TBT** (mobile) | `/parties` | 326 ms | **37 ms** |
| **FCP** (mobile) | `/` | 3052 ms | **552 ms** |
| Images without `width`/`height` | all pages | 104 | **0** |

CLS on `/menu` was caused by the dish grid inflating from empty to 85 cards after JS ran. Pre-rendering
removed the shift entirely. The TBT collapse (~80–90% on every page) is the Tailwind CDN removal.

### Homepage payload

| | Before | After |
|---|---:|---:|
| Initial transfer (production, real browser) | **11,416 KB** | ~430 KB |
| Of which hero video | 10,986 KB | 0 KB until after load |

The video now attaches only after `load`, and is skipped entirely on Data Saver, 2G/slow-2G, and
`prefers-reduced-motion`. The poster is a complete hero on its own, so those viewers lose nothing but the
motion.

### LCP — an honest accounting

Local LCP numbers after the change are **mixed and partly worse**, and it would be misleading to present
them as a win:

| Page (mobile) | Before | After (local) |
|---|---:|---:|
| `/` | 3332 ms | 3860 ms |
| `/menu` | 4416 ms | 5100 ms |
| `/about` | 4256 ms | 4004 ms |
| `/contact` | 848 ms | 1340 ms |
| `/parties` | 2388 ms | 2604 ms |

**These local figures are pessimistic and not comparable to production.** `serve.mjs` sends HTML
uncompressed; Vercel serves it Brotli-compressed (verified: `Content-Encoding: br`). Pre-rendering the menu
grew `pages/menu.html` from 55 KB to 175 KB raw — but only **25.7 KB gzipped**, because 85 near-identical
cards compress extremely well. The local test pays the full 175 KB; production pays ~26 KB.

Run-to-run variance was also high (up to ±1300 ms on the same URL), so these numbers carry real error bars.

What was done for LCP regardless:
- Responsive `srcset` on all four subpage heroes (768w / 1280w / original). The heroes were the measured LCP
  element on every page and were shipping at up to 1672px / 277 KB to 390px phones. The 768w variants are
  47–71 KB.
- Homepage video poster re-encoded 1536w → 1280w (155 KB → 109 KB). `poster` has no `srcset` equivalent.
- `fetchpriority="high"` on the hero preload.

**LCP must be confirmed on the deployed preview, not locally.** See §10.

### One thing tried and reverted

Eager-loading the first four dish images looked like an obvious LCP win, but measurement showed the opposite:
the dish cards sit *below* the full-viewport page hero, so eager-loading them stole bandwidth from the actual
LCP element and cost ~450 ms. Reverted to lazy, and the reasoning is recorded in `_tools/prerender-menu.mjs`.

---

## 8. Changes implemented

### New tooling (all follow the repo's existing "generate, commit the output, no deploy-time build" pattern)

| File | Purpose |
|---|---|
| `_tools/prerender-menu.mjs` | Renders all 85 dish cards + Menu JSON-LD into `pages/menu.html`. Idempotent. |
| `_tools/seo-check.mjs` | Crawls the local site and fails on missing/duplicate titles, bad canonicals, multiple H1s, an H2 duplicating the H1, missing OG tags, images without alt, broken internal links, non-200 sitemap URLs, accidental noindex, invalid JSON-LD, and any `aggregateRating`. Zero dependencies. |
| `_tools/measure-cwv.mjs` | LCP/CLS/TBT/FCP + payload at mobile and desktop, via the already-installed Puppeteer. |
| `_tools/build-responsive-heroes.mjs` | Generates 768w/1280w hero variants and wires up `srcset`. |
| `_tools/add-image-dims.mjs` | Adds intrinsic `width`/`height` to any `<img>` missing them. |
| `_tools/inline-css.mjs` | Inlines the compiled Tailwind CSS into each page. |
| `tailwind.config.js` + `_tools/tailwind-input.css` | Reproduces the theme that was declared inline beside the CDN script. |

`npm run build` = pre-render menu + compile CSS + inline it.

### Modified

| File | Changes |
|---|---|
| `vercel.json` | 5 redirects, `trailingSlash:false`, cache headers, `noindex` for `*.vercel.app`, Clarity allowlisted, Tailwind CDN removed from CSP |
| `index.html` | Entity graph; `aggregateRating` removed; video deferred; `og:site_name`/`og:locale`; hero preload priority; seafood link; hours copy |
| `pages/menu.html` | 85 pre-rendered cards; static Menu schema; `renderMenu()`/`renderMenuSchema()` skip when pre-rendered; responsive hero; `/parties` link |
| `pages/contact.html` | Full Restaurant entity; H2 de-duplicated; hours copy corrected; responsive hero |
| `pages/about.html` | Restaurant reference; H2 de-duplicated; first in-content link; responsive hero |
| `pages/parties.html` | Restaurant reference; `/contact` link; responsive hero |
| `404.html` | Tailwind CDN → inlined CSS |
| `js/translations.js` | New heading + link keys (BG/EN); hours copy; `Peshtерsko` typo |
| `sitemap.xml` | `lastmod` added; `changefreq`/`priority` removed |
| `package.json` | Build and check scripts; `tailwindcss@^3` devDependency |
| `.vercelignore` | Excludes `tailwind.config.js`, `package.json`, `package-lock.json` |

### Design preservation

Every page was full-page screenshot-diffed at 390×844 and 1440×900, before and after. Results: **0.000% to
0.020% pixel difference on every page**, with all page heights identical. The only larger difference
(home-mobile, 3.1%) was isolated to the hero band and confirmed to be the video at a different playback
frame. Height changes in the final pass trace entirely to the four intentional contextual links.

---

## 9. Remaining opportunities

| Priority | Opportunity | Why not done | Estimated effort |
|---|---|---|---|
| **High** | **Google Business Profile.** The site is outranked for its own name by Maps, Wolt, Glovo and Takeaway. That is won on the GBP, not on the website — categories, hours, photos, posts, review responses. | Outside the repository | Ongoing, owner-led |
| **High** | **Re-encode the hero video.** It is still 11 MB; it is merely deferred. ffmpeg is not installed on this machine, so it could not be re-encoded. A 1–2 MB re-encode would remove the remaining mobile data cost. | `ffmpeg` unavailable | ~15 min once ffmpeg is installed |
| Medium | **English URLs + hreflang.** The EN toggle swaps text client-side on the same URL, so Google only ever indexes Bulgarian. Needs real `/en/` routes, hreflang pairs, per-language canonicals and sitemap entries. Deferred by decision — Bulgaria is 96.6% of impressions. | Scope | ~1 day |
| Medium | **Content depth for "гръцки ресторант пловдив"** (position 21.2). Reaching page 1 needs more than metadata — genuinely useful content about the cuisine, the seafood, the summer garden. | Needs business input, not invention | ~half a day + owner input |
| Low | **Dish-level pages.** 85 dishes are now indexable on one page; individual pages for the strongest sellers could capture dish-level searches. Only worth it if GSC shows dish queries emerging. | Speculative until data exists | — |
| Low | Cyrillic/space image filenames. Work fine URL-encoded; renaming risks breaking 85 references for negligible gain. | Not worth the risk | — |

### Flagged for the owner, not changed

The homepage shows five ★★★★★ testimonials while the actual Google rating is **4.1**. That is a
presentation choice, not an SEO defect, and not mine to change — but it is worth being deliberate about.

---

## 10. Measurement plan

### Immediately after merge and deploy

1. Confirm the redirects on production (these could not be tested locally — `serve.mjs` does not read
   `vercel.json`):
   - `/index.html` → 308 → `/`
   - `/pages/menu.html` → 308 → `/menu` (and the other three)
   - `/menu/` → 308 → `/menu`
   - `*.vercel.app` returns `X-Robots-Tag: noindex`
   - Confirm **no redirect loop** on `/menu` (redirect and rewrite interact here)
2. Run `node _tools/seo-check.mjs https://www.tavernaki-plovdiv.com` against production.
3. Run **PageSpeed Insights** on `/` and `/menu`, mobile — this is the real LCP number, against
   Brotli-compressed HTML. Local figures in §7 are pessimistic.
4. Run **Google's Rich Results Test** on `/` and `/menu`.
5. Resubmit `sitemap.xml` in Search Console (justified — its contents changed).
6. URL-inspect and request indexing for `/menu` **once**. It is justified here because its content changed
   fundamentally, from zero indexable dishes to 85. Do not make repeat indexing requests a habit.
7. Confirm Microsoft Clarity is now recording (the CSP was blocking it).

### After 7 days — compare against this baseline

| Metric | Baseline (08-20 → 08-26) | What good looks like |
|---|---|---|
| Total impressions | 232 | Up; the menu is newly indexable |
| Total clicks | 7 | Up — this is the number that matters |
| Average CTR | 3.0% | Up, especially on branded queries |
| Average position | 6.6 | Down (better) |
| **"тавернаки"** | 91 impr, 3 clicks, pos 6.4 | Position improving toward top 3 |
| **"тавернаки меню"** | 6 impr, 0 clicks, pos 5.67 | Clicks > 0 |
| **"гръцки ресторант пловдив"** | 5 impr, pos 21.2 | Position improving; page 2 would be real progress |
| `/menu` | 26 impr, 0 clicks, pos 8.08 | Impressions up sharply, first clicks |
| `/contact` | 45 impr, 0 clicks, pos 7.49 | First clicks |
| **Search appearance** | *empty* | Any entry appearing at all |
| New dish-level queries | none | Watch for dish names — these can only appear now the menu is in the HTML |

### After 28 days

- **Page indexing report**: all 5 canonical URLs indexed; `/pages/*.html` and `/index.html` should disappear
  or show as "Page with redirect"; `*.vercel.app` should not appear.
- **Core Web Vitals report**: `/menu` should leave the CLS "needs improvement" bucket once field data
  accumulates.
- **Rich results / Search appearance**: watch for Breadcrumb and Menu enhancements.
- Confirm **no manual actions** — the `aggregateRating` removal was partly to prevent one.

---

## Appendix — how to reproduce

```bash
node serve.mjs                                    # or PORT=3777 node serve.mjs
node _tools/seo-check.mjs   http://localhost:3777 # SEO invariants — exits 1 on failure
node _tools/measure-cwv.mjs http://localhost:3777 # LCP/CLS/TBT, mobile + desktop
npm run build                                     # re-render menu + rebuild/inline CSS
```

Regenerate after content changes:

```bash
node _tools/prerender-menu.mjs           # after editing js/menu-data.js
node _tools/build-responsive-heroes.mjs  # after replacing a hero image
node _tools/add-image-dims.mjs --write   # after adding new <img> tags
```
