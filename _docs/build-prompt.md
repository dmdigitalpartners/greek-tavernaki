# Greek Tavernaki — Master Build Prompt File
## Sequential prompts to fire into Claude Code, phase by phase

> **How to use this file:**
> 1. Work top to bottom — each phase builds on the last
> 2. Before moving to the next phase, screenshot and review the current state
> 3. Fill in every `[FILL IN]` block before pasting the prompt
> 4. The file is Greek Tavernaki-specific — update as brand assets arrive

---

## PRE-BUILD CHECKLIST
Run through this before starting any session:

- [ ] `serve.mjs` is ready (`node serve.mjs` → http://localhost:3000)
- [ ] `screenshot.mjs` is ready (`node screenshot.mjs http://localhost:3000`)
- [ ] Business info MD file is in the project root → `business-info.md`
- [ ] Example reference sites are screenshotted → saved in `brand_assets/reference/`
- [ ] Logo file is in `brand_assets/` (when available)
- [ ] Color palette is decided → hex codes ready
- [ ] `frontend-design` skill is installed globally

---

## HOMEPAGE SITE MAP
**Scope:** Single scrollable homepage. No sub-pages. All essential info in one flow.

| # | Section | What it does |
|---|---------|-------------|
| 1 | Hero | Full-bleed image, restaurant name, tagline, two CTAs |
| 2 | Menu Preview | 4–6 signature dishes with names, descriptions, prices |
| 3 | About / Story | Origin, family, philosophy — 2–3 sentences max |
| 4 | Experience / Gallery | 3–4 mood photos of food or interior |
| 5 | Hours & Location | Address, hours table, embedded Google Map |
| 6 | Reservations CTA | Full-width warm CTA strip — "Book a Table" |
| 7 | Footer | Address, phone, social links, copyright |

---

---

# LEVEL 2 — PHASE 1: Initial Build

> **When to use:** First prompt of the project. Sets up the full homepage skeleton.
> **Prerequisite:** frontend-design skill must be installed globally.
> **What you get:** A structured, styled baseline — better than AI slop, not yet polished.

---

```
Invoke the frontend-design skill.

Build a single-page homepage for a Greek restaurant called Greek Tavernaki.

Tech: Single index.html, all CSS inline via Tailwind CDN.

Color palette:
[FILL IN — paste hex codes once decided, e.g.:]
Primary (terracotta): #C1440E
Secondary (olive): #6B7A3E
Background (stone cream): #F5EFE0
Accent (aegean deep): #1A3A5C
Surface (warm white): #FDFAF4

Typography:
Headings: Cormorant Garamond (Google Fonts) — tight tracking -0.03em, slightly italic on hero
Body: DM Sans (Google Fonts) — line-height 1.7

Mood: Warm, authentic, family-run Mediterranean taverna. Not tourist-trap. Not fine dining.
Think: rough stone walls, terracotta pots, linen tablecloths, sea breeze, candles at dusk.

Homepage sections (in this exact order):
1. HERO — Full-bleed photo (placehold.co/1920x1080), restaurant name large, tagline beneath, two CTAs side by side: "Reserve a Table" (primary) and "View Menu" (ghost)
2. MENU PREVIEW — Grid of 4 signature dishes. Each card: dish image (placehold.co/600x400), dish name, 1-line description, price. Section heading: "A Taste of Greece"
3. ABOUT — Two-column: left is a portrait-orientation photo (placehold.co/600x800), right is a short paragraph of story text + a small decorative olive branch divider. Heading: "Our Story"
4. EXPERIENCE / GALLERY — Masonry or asymmetric 4-photo grid. No headings, just images (placehold.co/800x600 × 4). Subtle hover zoom (transform only).
5. HOURS & LOCATION — Two columns: left is hours table (Mon–Sun), right is a placeholder for an embedded Google Map (gray box placehold.co/600x400). Address below the map.
6. RESERVATIONS CTA — Full-width warm terracotta strip. Big serif heading: "Come As You Are, Leave As Family." One centered button: "Book Your Table"
7. FOOTER — Three columns: logo/tagline left, nav links center, contact info right. Bottom bar with social icons + copyright.

Anti-slop rules to follow:
- Use layered color-tinted shadows (not flat shadow-md)
- Every button must have hover + focus-visible + active states
- Use radial gradients layered on section backgrounds for depth
- Add subtle grain texture via SVG filter on the hero
- Images get gradient overlay (bg-gradient-to-t from-black/60) where text overlaps
- No transition-all anywhere — only transition opacity and transform with spring easing

Logo: [FILL IN once available — e.g., <img src="brand_assets/logo.svg" alt="Greek Tavernaki">]
For now, use a text logotype in Cormorant Garamond: "Greek Tavernaki" in terracotta.

Output: One complete index.html file.
```

---

> **After Phase 1:**
> 1. `node serve.mjs` (if not running)
> 2. `node screenshot.mjs http://localhost:3000 phase1`
> 3. Review screenshot — note what's wrong
> 4. Fix obvious issues, re-screenshot
> 5. When satisfactory, move to Phase 2

---

---

# ANF — PHASE 2: Normalize

> **When to use:** After the initial build, if anything looks visually inconsistent.
> **What you get:** Unified design language — one font, one color system, one spacing rhythm.

---

```
Normalize the entire homepage to have a consistent design system:

- Unify ALL font families: headings → Cormorant Garamond, body/UI → DM Sans. Nothing else.
- Replace ALL color values with this exact palette:
    Primary: #C1440E
    Secondary: #6B7A3E
    Background: #F5EFE0
    Accent: #1A3A5C
    Surface: #FDFAF4
- Standardize spacing: use a base-8 scale (8px, 16px, 24px, 32px, 48px, 64px, 96px)
- Border radius: cards → 8px, buttons → 6px, images → 4px. Consistent everywhere.
- Unify button styles:
    Primary button: terracotta bg (#C1440E), cream text (#F5EFE0), subtle shadow
    Secondary/ghost button: transparent, terracotta border, terracotta text
- Ensure all section backgrounds alternate between #F5EFE0 and #FDFAF4 for visual rhythm
- Remove any design inconsistencies between sections — it should look like one designer built it
- Do NOT change layout structure, content, or copy.
```

---

---

# ANF — PHASE 3: Research + Fill

> **When to use:** After normalize. Uses the business-info.md file to replace placeholders.
> **Prerequisite:** `business-info.md` must exist in the project root with real content.

## Step 3a: Research Prompt

```
I have attached the file business-info.md which contains all real information about Greek Tavernaki.

Read the entire file. Then review the homepage in index.html and:
1. List every section that has placeholder text, generic copy, or lorem ipsum
2. Identify exactly what real information from business-info.md can replace each placeholder
3. Note any gaps — things the site needs that aren't in business-info.md
4. Compile your full analysis before making any changes.
```

## Step 3b: Fill Prompt

```
Using the business-info.md content and your research from the previous step:

Replace ALL placeholder content in index.html with real Greek Tavernaki information:
- Real dish names, descriptions, and prices from the menu section
- Real restaurant story and history for the About section
- Real address, phone number, and opening hours
- Real tagline and hero copy
- Real footer information (social links, contact details)

Rules:
- Keep all design, layout, spacing, and visual styles EXACTLY as they are
- Only change text content and alt-text attributes
- Do not remove any sections
- Do not add new sections
- For any gap where real info was missing from business-info.md, leave a clearly marked [PLACEHOLDER - NEEDS: description] comment in the HTML
```

---

---

# LEVEL 3 — PHASE 4: Visual Director

> **When to use:** After fill. You have reference site screenshots ready.
> **Prerequisite:** Screenshots from 2–3 reference restaurant sites saved in brand_assets/reference/
> **What you get:** Layout, spacing, and visual hierarchy much closer to professional output.

---

```
I'm going to provide you with screenshots of [FILL IN: reference site names] as visual references.

[ATTACH screenshots from brand_assets/reference/ here]

Study these references carefully. For each one, identify:
1. The key layout techniques (grid system, proportions, whitespace)
2. Typography decisions (size scale, weight contrast, spacing)
3. Color application (how the palette is used — which surfaces, which text, which accents)
4. Image treatment (overlays, aspect ratios, borders)
5. Section transitions and spacing rhythm

Then update index.html to match the overall visual quality level of these references.
Apply to Greek Tavernaki without copying their content — only adopt the craft.

Focus areas (in priority order):
1. Hero section — scale, typography hierarchy, image treatment
2. Menu preview cards — layout, shadow, hover state
3. Section spacing and breathing room
4. Typography size scale — is it punchy enough?
5. Button design — do they feel premium?

Take a screenshot after each major fix. Compare. Stop when the gap is closed.
```

---

---

# LEVEL 4 — PHASE 5: Site Teardown

> **When to use:** After Phase 4. You've found a reference site whose effects you want to replicate.
> **How to get the HTML:**
>   F12 → Console → Ctrl+Shift+P → "Screenshot" → "Capture full size" → Download
>   Right-click → View Page Source → Select all → Copy
> **What you get:** 80–90% fidelity to a professional reference — real CSS techniques, not AI guesses.

---

```
Here is the full HTML source for [FILL IN: reference site URL]:

[PASTE HTML SOURCE HERE]

Use the site teardown skill to also fetch and analyze the CSS and JS files linked in this HTML.

Using this complete technical picture:
1. Identify the key visual techniques and effects used (animations, gradients, shadows, text treatments)
2. Note the specific CSS libraries, custom properties, and animation approaches
3. Identify the 3 most impressive effects and explain how they were built

Then apply these techniques to Greek Tavernaki's index.html:
- Adopt the same quality of shadow system
- Adopt the same image treatment approach
- Adopt the same animation/transition style (only transform and opacity)
- Keep all Greek Tavernaki content and color palette
- Do NOT clone their layout structure — adapt the techniques to our existing structure

After applying, screenshot and compare. Fix mismatches. Do at least 2 rounds.
```

---

---

# LEVEL 5 — PHASE 6: Custom Assets

> **When to use:** After Phase 5. You have custom imagery ready.
> **Assets to generate before this phase:**
>   - Hero image: Generate in MidJourney — "authentic Greek taverna interior, warm candlelight, stone walls, terracotta, Mediterranean evening, cinematic, --ar 16:9 --v 7"
>   - Dish photos: Generate in MidJourney — "[dish name], Greek food photography, white plate, warm light, overhead, --ar 3:2 --v 7"
>   - Clean artifacts: Use Photopea to remove any AI text artifacts from generated images
>   - Video (optional): Run hero image through Kling → subtle ambient motion (flickering candle, steam from food)
>   Save all to: public/media/

---

```
I have added custom imagery to public/media/:
[LIST THE FILES — e.g.:]
- public/media/hero.jpg — hero background (full-bleed interior shot)
- public/media/dish-souvlaki.jpg
- public/media/dish-moussaka.jpg
- public/media/dish-tzatziki.jpg
- public/media/dish-baklava.jpg
- public/media/gallery-1.jpg through gallery-4.jpg

[If video:] - public/media/hero-loop.mp4 — ambient background video for hero

Update index.html:
1. Replace all placehold.co images with the real images from public/media/
2. [If video:] Replace the hero static image with a <video> tag:
   - autoplay, muted, loop, playsinline
   - poster = hero.jpg (fallback)
   - On mobile, show hero.jpg static instead of video (performance)
3. Keep all gradient overlays and image treatments
4. Ensure every image has a descriptive alt attribute
5. Lazy-load all images below the fold (loading="lazy")

After updating, screenshot and verify all images load correctly.
```

---

---

# LEVEL 6 — PHASE 7: Polish

> **When to use:** Last phase. Foundation is solid. Now add the craft details that make it feel finished.
> **Do not do this phase on a broken foundation — fix layout and content first.**

---

```
Polish pass for Greek Tavernaki homepage. Apply all of the following:

LOADING SEQUENCE:
Add a loading overlay that fades out when the page is ready:
- Black or deep aegean (#1A3A5C) background
- Centered text logotype "Greek Tavernaki" in Cormorant Garamond
- Fades to transparent over 0.6s after window load
- Only animate opacity and transform

MICRO-INTERACTIONS:
- Menu dish cards: on hover, image scales to 1.04, card lifts with a color-tinted shadow
- Navigation links: underline expands from left on hover (transform scaleX, not border)
- "Book Your Table" button: subtle warm glow pulse on hover
- Gallery images: slight scale on hover with smooth ease-out (350ms)

TYPOGRAPHY UPGRADES:
- Hero heading: increase size, apply letter-spacing -0.04em, make it feel monumental
- Section headings: add a small decorative element (thin terracotta line or leaf icon) beneath
- Menu dish names: slightly italic in Cormorant Garamond for elegance

SCROLL ANIMATIONS (Intersection Observer, no libraries):
- Section headings: fade up from 20px below on scroll into view
- Menu cards: staggered fade-in (100ms delay between each card)
- About section: left column slides in from left, right column from right
- Stats or a subtle divider ticker between sections (if fitting)

DEPTH & TEXTURE:
- Add SVG noise grain filter overlay to hero section for texture
- Ensure the hero has 3+ layered radial gradients for warmth
- Add a very subtle warm vignette to all full-bleed images

MOBILE:
- Check every section at 375px width
- Hero: headline font size must still feel large but readable
- Menu cards: single column on mobile, 2-column on tablet
- Navigation: hamburger menu if not already done
- Gallery: 2-column grid on mobile

FINAL CHECKS:
- Every <a> tag has focus-visible outline (keyboard nav accessible)
- No transition-all anywhere in the file — grep for it and remove
- All images have alt text
- Meta title and description are filled with real Greek Tavernaki content
- Favicon: use a small terracotta Greek key pattern SVG as favicon (generate inline)

Take a screenshot after each group above. Fix mismatches. Minimum 2 rounds on the final result.
```

---

---

# FINAL REVIEW PROMPT

> **When to use:** After Phase 7. Before declaring the site done.

---

```
Final review of Greek Tavernaki homepage.

Perform a complete audit:

VISUAL QUALITY:
[ ] Does it look like it was designed by a human, not generated by AI?
[ ] Is the typography hierarchy clear — hero > section heading > body?
[ ] Do colors feel warm and Mediterranean, not corporate?
[ ] Is every section's spacing intentional and consistent?
[ ] Do images have proper overlays and treatments?

INTERACTION:
[ ] Every clickable element has hover, focus-visible, and active states?
[ ] Animations feel smooth and purposeful (not gimmicky)?
[ ] Loading sequence works?

CONTENT:
[ ] All placeholder text replaced with real Greek Tavernaki content?
[ ] Dish names, prices, descriptions are accurate?
[ ] Address, phone, hours are correct?

MOBILE:
[ ] Looks good at 375px (iPhone SE)?
[ ] Looks good at 768px (tablet)?
[ ] Navigation works on mobile?

TECHNICAL:
[ ] No transition-all anywhere?
[ ] All images have alt text?
[ ] Meta title and description filled in?
[ ] No console errors?

For each item marked NO — fix it now. Then re-screenshot and re-check.
Do not stop until every item is YES.
```

---

---

## WHAT TO PROVIDE BEFORE BUILDING

Before pasting Phase 1, you need:

| Item | Where to get it | Where to save it |
|------|----------------|-----------------|
| Business info | From the client/owner — hours, story, menu, address | `business-info.md` in project root |
| Logo file | From client | `brand_assets/logo.svg` (or .png) |
| Color palette | Derived from business-info.md mood + reference sites | Fill into each prompt |
| Reference site screenshots | F12 → Capture full size on 2–3 sites you like | `brand_assets/reference/` |
| Reference site HTML | View Source → Select All → Copy | Paste directly into Phase 5 prompt |
| Hero image | Generate in MidJourney | `public/media/hero.jpg` |
| Dish images | Generate in MidJourney, clean in Photopea | `public/media/dish-[name].jpg` |

---

## QUICK TROUBLESHOOTING

| Problem | Fix |
|---------|-----|
| Output looks generic / AI | Jump to Phase 4 — provide HTML source teardown |
| Design looks inconsistent | Re-run Phase 2 normalize prompt |
| Screenshot loop stuck on animation | Tell Claude: "do not screenshot this section, just write the code" |
| Colors still look like default Tailwind | Grep for `indigo` `blue` `purple` and replace manually |
| Looks bad on mobile | Append: "Audit and fix every section at 375px. Dish cards single column. Hero text readable." |
| transition-all in the code | Grep for `transition-all` and replace with specific property transitions |
