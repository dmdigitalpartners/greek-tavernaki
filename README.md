# Greek Tavernaki

The website for **Tavernaki**, a Greek restaurant in Plovdiv, Bulgaria (бул. Пещерско шосе 28а, кв. Младежки хълм). It's a marketing/menu site — hero, story, a full bilingual menu, party/event booking info, and contact details — built as static HTML with Tailwind CSS, tuned for SEO and Core Web Vitals. Built and maintained for the client by D&M Digital Partners.

## What it offers

- **Home** (`index.html`) — hero video, specialty dishes, trust signals (free parking, home-cooked food), reservation and menu CTAs.
- **Menu** (`pages/menu.html`) — a full bilingual (Bulgarian/English) catalogue of roughly 85 dishes across salads, grill, fish, seafood, pasta, mezze and a lunch menu, each with a photo and allergen icons (`brand_assets/allergen-icons/`). The menu is pre-rendered at build time for SEO (see below).
- **About** (`pages/about.html`) — restaurant story and mission.
- **Parties** (`pages/parties.html`) — private events / celebrations page.
- **Contact** (`pages/contact.html`) — address, phone, hours.
- **Bilingual UI** — a BG/EN toggle backed by `js/translations.js` (~600 lines), persisted in `localStorage`, with an inline pre-render script in `<head>` that sets the language before first paint to avoid a BG→EN flash.
- **SEO/schema** — canonical URLs, Open Graph/Twitter meta, `sitemap.xml`, `robots.txt`, Google Search Console verification file, and a dedicated SEO audit trail in `_docs/SEO-AUDIT.md`.
- **Performance work** — Tailwind is compiled ahead of time and inlined into each page's `<head>` (no runtime JIT compiler), images are served as responsive WebP, the hero video is deferred, and Core Web Vitals are measured with a custom script.

## How it works

- **Stack:** plain HTML/CSS/JS, no framework and no client-side router. Tailwind CSS is compiled via the Tailwind CLI (not the CDN build) and its output is inlined directly into each page's `<head>` between `TAILWIND-INLINE` markers — this is generated output, don't hand-edit it.
- **Content:**
  - Menu data lives in `js/menu-data.js` (~1,100 lines) — edit dish names, prices, descriptions, and allergens there. Source spreadsheets (`_tools/Master_Menu_Database.xlsx`, `_tools/Restaurant_Menu.xlsx`) exist for offline editing.
  - All UI copy and translations live in `js/translations.js`, keyed by `bg`/`en`.
  - Contact details (phone, WhatsApp, email, address) live in `js/site-config.js`.
- **Menu pre-rendering:** because the menu is built dynamically from `menu-data.js`, `_tools/prerender-menu.mjs` renders the static HTML for `pages/menu.html` at build time so search engines see full content without executing JS.
- **Build pipeline** (`_tools/`): a set of Node scripts handle image optimization/conversion to WebP (`convert-images.mjs`, `optimize-images.mjs`, `optimize-menu-images.mjs`), responsive hero generation (`build-responsive-heroes.mjs`), favicon packing (`gen-favicons.mjs`, `pack-ico.mjs`), CSS inlining (`inline-css.mjs`), SEO validation (`seo-check.mjs`), and Core Web Vitals measurement (`measure-cwv.mjs`).
- **Planning docs** (`_docs/`): onboarding notes for a co-founder/collaborator (`COFOUNDER-START-HERE.md`, `COFOUNDER-CLAUDE-SETUP.md`), the SEO audit and measurement plan (`SEO-AUDIT.md`), the original phased build prompt (`build-prompt.md`), and a business-intelligence brief on the restaurant (`tavernaki-business-intelligence-report.md`).

## Project structure

```text
index.html              Home page
pages/                  menu.html, about.html, contact.html, parties.html
js/
  menu-data.js          Menu content (dishes, prices, allergens)
  translations.js       BG/EN copy for every page
  site-config.js         Phone, WhatsApp, email, address
css/tavernaki.css       Compiled Tailwind output (generated, also inlined into HTML)
brand_assets/           Logo, allergen icons
Visual Assets/          Photography and hero video (webp, mp4)
menu-images-webp/       Per-dish photos
_tools/                 Build/optimization/SEO scripts + menu spreadsheets
_docs/                  Planning, SEO audit, and onboarding docs
serve.mjs               Local static server with clean-URL routing
screenshot.mjs           Puppeteer screenshot helper for design review
vercel.json             Redirects, rewrites, security & caching headers
```

## Getting started

```bash
npm install         # installs Puppeteer, Sharp, Tailwind CLI
npm run build       # pre-renders the menu + compiles/inlines Tailwind CSS
npm run serve        # node serve.mjs — serves the project at http://localhost:3000
```

Other scripts from `package.json`:

| Script | Purpose |
|---|---|
| `npm run build:css` | Compile Tailwind (`_tools/tailwind-input.css` → `css/tavernaki.css`) and inline it into every HTML page |
| `npm run prerender:menu` | Regenerate the static menu HTML from `js/menu-data.js` |
| `npm run seo:check` | Run the SEO validation script |
| `npm run seo:cwv` | Measure Core Web Vitals locally |

No environment variables are required — the site has no server-side code or secrets.

## Deployment

Hosted on Vercel (`vercel.json` defines routing and headers). Clean URLs (`/menu`, `/about`, `/contact`, `/parties`) are served via rewrites to the matching file in `pages/`, and the old `.html` paths permanently redirect to those clean URLs. Security headers (CSP, HSTS, X-Frame-Options, etc.) and long-lived caching for images/fonts/CSS/JS are set globally. Vercel preview deployments (`*.vercel.app`) are marked `noindex, nofollow`.

Live production domain: `https://www.tavernaki-plovdiv.com` (canonical URL in `index.html`); the project is also reachable at `https://greek-tavernaki.vercel.app`. Recent history (`git log`) shows work merged into `main` via pull requests, and merges into `main` trigger an automatic Vercel production deploy — no manual deploy step is needed.

## Maintenance notes

- Never hand-edit the compiled CSS block inside `<head>` (between the `TAILWIND-INLINE` markers) or `css/tavernaki.css` — change `_tools/tailwind-input.css` or Tailwind classes in the HTML, then re-run `npm run build:css`.
- After any menu change in `js/menu-data.js`, re-run `npm run prerender:menu` so the static, crawlable menu HTML stays in sync with the data.
- Raw image originals (PNGs, `menu-images/`, `Visual Assets/*.png`) are intentionally gitignored — only optimized WebP output is committed and deployed.
- `.claude/` and `temporary screenshots/` are local-only (gitignored); screenshots from `screenshot.mjs` are not meant to be committed.
- The current `CLAUDE.md` still contains generic "Current State" checkboxes and TBD design-direction placeholders left over from an early build phase — the site itself is fully built and launched; treat those checkboxes as stale, not as an indicator of project status.

---
Built and maintained by D&M Digital Partners.
