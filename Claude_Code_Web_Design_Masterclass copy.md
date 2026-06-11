# Claude Code Web Design Masterclass
## From AI Slop to Professional, Branded Websites

> **Complete Operating System for AI-Powered Web Design**
> Synthesized from 5 Expert Sources — Agency Owners · Solo Builders · Advanced Practitioners

---

# Executive Summary

These five source transcripts collectively form a complete operating system for building, selling, and maintaining professional websites using Claude Code and AI tools. The speakers range from agency owners to solo builders, and together they cover the full stack: aesthetics, architecture, client acquisition, deployment, and long-term maintenance.

> **Central Thesis:** The quality of your Claude Code output is not determined by how well you prompt — it's determined by how well you set up your environment *before* you prompt.

Claude Code defaults to generic purple gradients, overused fonts, and cookie-cutter layouts. This is not a bug — it reflects what dominates the internet. The AI learned from the average, not the exceptional. Most people fail because they show up to a visual medium with text instructions and expect miracles. The ones who win learn to give Claude concrete visual references, specialized skills, real component code, and structured workflows.

A secondary thesis, equally important: **web design is not dead** — it has been commoditized at the bottom and elevated at the top. AI handles execution. Your job is taste, strategy, and client relationships.

---

# Part 1: Core Principles

## Principle 1: Claude Has No Taste — But You Can Lend It Yours

Claude Code defaults to generic purple gradients, overused font families, and cookie-cutter grid layouts. This is not a bug — it's a reflection of what dominates the internet. The AI learned from the average, not the exceptional.

**Why it matters:** If you don't actively intervene with visual direction, you will always get average output. Average output cannot be sold for premium prices.

**How to intervene:**
- Install design skills (frontend-design, UIUX Pro Max)
- Provide screenshot references from real professional websites
- Provide actual component code from curated libraries like 21st.dev
- Give it your brand assets upfront (logo, color palette, fonts)

---

## Principle 2: The Translation Problem Is Your Primary Enemy

There is an inherent lossy translation when you try to describe a visual medium in text. Screenshots help, but even they require Claude to translate image → code, which introduces degradation. The closer you get to giving Claude actual code from a site you like, the better the output.

**The progression of fidelity:**

| Input | Fidelity |
|-------|---------|
| Text prompt only | Worst — AI defaults |
| Text + design skill | Better — less slop |
| Text + skill + screenshots | Significantly better |
| Text + skill + screenshots + source HTML/CSS/JS | Near-professional |
| Text + skill + real component code (21st.dev) + brand assets | Professional output |

---

## Principle 3: Iteration Is the Business Model

No one builds a perfect site in one shot. The workflow is: build a solid foundation → screenshot loop → component upgrades → visual direction → polish. Every hour you spend iterating on a foundation is faster than rebuilding from scratch.

> **The Claude Code loop:** Prompt → Build → Preview locally → Identify gap → Screenshot or describe gap → Prompt fix → Repeat

---

## Principle 4: Separate Development from Deployment

Build locally. Preview locally. Only push to GitHub when satisfied. GitHub auto-deploys to Vercel/Cloudflare Pages. This separation means client-facing sites are never broken by your experiments.

---

## Principle 5: The Economics Favor You Massively

| Revenue Source | Amount | Time | Effective Rate |
|---------------|--------|------|---------------|
| Website build | $8,000 | 18 hrs total | ~$443/hr |
| Monthly maintenance | $300/mo | 3 hrs/mo | ~$100/hr |
| AI token cost | ~$20 | — | — |

A real case study: $8,000 website sale with ~$20 in AI tokens and ~18 hours total work (including sales). This math only works if you deliver quality — which brings everything back to Principles 1 and 2.

---

# Part 2: Mental Models

## The Taste Gap Model

Most people fail not because they lack taste, but because they can't articulate it. They don't know the web design vocabulary needed to communicate visual intent to Claude.

| Layer | What It Means | Fix |
|-------|--------------|-----|
| Your Taste Level | What you find beautiful vs generic | Consume Awwwards/Godly daily |
| Ability to Articulate | Web design vocabulary & nomenclature | Clone sites, ask Claude to explain effects |
| Ability to Show Claude | References, screenshots, component code | Use 21st.dev, HTML teardowns |
| Output Quality | The final result | Compounds from all layers above |

---

## The Foundation-Polish Ratio

Spend **60%** of your time getting the foundation right (structure, component selection, brand integration). Spend **40%** on polish (animations, micro-interactions, typography, spacing). Most people invert this — they try to polish a broken foundation.

---

## The Clone-to-Create Pipeline

```
Find site you like
    → Inspect HTML/CSS/JS
        → Give to Claude
            → Clone it
                → Understand how effects work
                    → Modify for your brand
                        → Add original elements
                            → Create something new
```

This is how every skilled designer works. You don't create from nothing. You study what works, deconstruct it, and remix it. AI compresses the execution phase.

---

## The Skill Stack Model

Each level you add multiplies output quality. This is not linear — it compounds.

| Level | What You Add | Result |
|-------|-------------|--------|
| 0 | Nothing | AI slop — purple gradients, generic grids |
| 1 | Design skill | Less slop, still clearly AI |
| 2 | Visual references (screenshots) | Directional, ~50% closer to target |
| 3 | Source code teardown (HTML/CSS/JS) | Near-clone quality, 80–90% fidelity |
| 4 | Real components from 21st.dev | Coherent, designed feel |
| 5 | Brand assets + custom imagery | Original, professional output |
| 6 | Visual tools (Stitch/Figma) | Refined, intentional, character-filled |

---

# Part 3: Frameworks & Systems

## Framework 1: The CLAUDE.md System

A markdown file in your project root that Claude Code reads before every action. It functions as a **persistent system prompt** for the entire project.

**What to include:**
- Always invoke frontend-design skill before writing any frontend code
- Screenshot workflow instructions (Puppeteer setup)
- Brand asset locations and naming conventions
- GitHub push rules (only push when explicitly told)
- Local preview instructions and tech stack preferences

**Key rules:**
- Keep it concise — don't bloat it with unnecessary context
- Update it as the project evolves
- Tell Claude NOT to push to GitHub until explicitly instructed
- Tell Claude to delete temp screenshots when done

> **This is the single highest-leverage setup item. Without CLAUDE.md, every session starts from zero.**

---

## Framework 2: The ANF Framework (Assemble, Normalize, Fill)

Designed for builders who want professional results without deep design knowledge. Uses human-designed components instead of relying on AI's aesthetic defaults.

### Phase 1 — Assemble
1. Go to 21st.dev
2. Pick components you like: hero, features, testimonials, pricing, FAQ, CTA
3. Copy each component's Claude Code prompt
4. Save each to a numbered `.txt` file in a `/components` folder
5. Tell Claude: *"Create a website using all components in the /components folder in order"*

### Phase 2 — Normalize
1. Assembled components come from different sources and look visually inconsistent
2. Run the normalization prompt to unify fonts, colors, spacing, and visual language
3. Goal: make it look like one designer built the whole thing

### Phase 3 — Fill
1. Run a research prompt telling Claude to analyze the site and identify content gaps
2. Claude searches the web for industry-specific information
3. Run a fill prompt to replace all placeholder text with real, contextual content

> **Why ANF works:** You're bypassing the taste problem entirely. Components were built by real human designers. AI handles unification and content. The output doesn't look AI-generated because the visual decisions weren't made by AI.

---

## Framework 3: The 7 Levels of Claude Code Front-End Design

| Level | Name | What You Add | Output Quality |
|-------|------|-------------|---------------|
| 1 | The Beginner | Text prompts only | AI slop. Purple gradients. Generic grids. |
| 2 | The Skill User | Frontend-design or UIUX Pro Max skill | Better-looking AI template. Still clearly AI. |
| 3 | The Visual Director | Screenshot references from pro sites | ~50% closer to reference. Still has ceiling. |
| 4 | The Cloner | HTML source + CSS/JS files from reference site | 80–90% fidelity clone. Learn how effects are built. |
| 5 | The Creator | Custom imagery, video backgrounds, original tagline | Genuinely original output. Yours. |
| 6 | The Architect | Stitch/Figma/Pencil.dev for visual iteration | Polished, intentional, character-filled. |
| 7 | The Frontier | Custom WebGL, shaders, 3D (team of designers) | Video game-level sites. Not solo-achievable today. |

---

## Framework 4: The Deployment Pipeline

```
Local Claude Code
    → Git commit
        → GitHub (private repo)
            → Cloudflare Pages (auto-deploy on push)
                → Custom domain (CNAME at registrar)
            → V0/Vercel (visual editor for client maintenance)
```

| Stage | Tool | Purpose |
|-------|------|---------|
| Development | Claude Code (local) | Build and iterate safely |
| Version Control | GitHub (private repo) | Version history, team access, backup |
| Hosting | Cloudflare Pages | Free auto-deploy on push, global CDN |
| Custom Domain | Porkbun/Namecheap + CNAME | Professional client-facing URL |
| Maintenance | V0 (Vercel) | Visual editor for client edits, no Git ops needed |

---

## Framework 5: The Website Agency Customer Journey

### Customer Acquisition Phase
1. Outreach (cold calling/email — low conversion but works)
2. Referrals (disproportionately where B2B business comes from)
3. Content/inbound (YouTube, social — compounds over time)
4. Response + deliberation cycle (sales conversations)
5. Purchase

### Operations Phase
1. Discovery/research (client meetings, Firecrawl for existing site data)
2. Fulfillment/build (Claude Code)
3. Delivery + review
4. Edits + maintenance (V0 for efficient management)
5. Retention (lower cost than new client acquisition)

> **Key insight:** Relationships and referrals drive disproportionate revenue in B2B web design. People buy from people they know and like. Cold outreach is supplementary, not the engine.

---

# Part 4: Step-by-Step Processes & SOPs

## SOP 1: Complete Website Build from Zero

### Pre-Build Setup
- [ ] Download VS Code from code.visualstudio.com
- [ ] Install Claude Code extension (Extensions → search "Claude Code" → Install)
- [ ] Ensure Claude Pro or Max subscription (Pro is sufficient to start)
- [ ] Install frontend-design skill globally: `/plugins → Manage Plugins → frontend → Install globally`
- [ ] Optionally install UIUX Pro Max skill from GitHub (52k stars)
- [ ] Create project folder and open in VS Code
- [ ] Download CLAUDE.md template and add to project root
- [ ] Create `/brand_assets` folder
- [ ] Add logo file to `/brand_assets`
- [ ] Add brand guidelines (colors, fonts, icons) to `/brand_assets`

### Research Phase (For Client Builds)
- [ ] Spend 2+ hours in discovery meetings with client
- [ ] Use Firecrawl agent to scrape and summarize client's existing web presence
- [ ] Gather: color palette, fonts, logo, copy for each page, social links, business hours
- [ ] Collect images in WebP format and organize in `/public/media`
- [ ] Find 2–3 reference websites you want to emulate

### Component Selection
- [ ] Visit 21st.dev
- [ ] Select hero component → copy Claude Code prompt → save as `components/1.txt`
- [ ] Select features component → save as `components/2.txt`
- [ ] Continue for all sections: testimonials, pricing, FAQ, CTA
- [ ] Alternatively: identify a full reference site for cloning via HTML teardown

### Build Phase
- [ ] Enable bypass permissions in VS Code (Settings → Claude Code → Allow dangerously skip permissions)
- [ ] Start Claude Code session
- [ ] Paste initial build prompt with tech stack, colors, fonts, copy
- [ ] Let Claude build → review in localhost (`npm run dev`)
- [ ] Run ANF Normalize prompt if using assembled components
- [ ] Run Research + Fill prompts for real content
- [ ] Provide brand assets explicitly via `@` tagging in prompt

### Visual Refinement Phase
- [ ] Take full-page screenshots of reference sites (F12 → Ctrl+Shift+P → "Screenshot" → Capture full size)
- [ ] Copy page HTML source (Ctrl+U → Select all → Copy)
- [ ] Copy CSS/JS file links from bottom of HTML source
- [ ] Provide screenshots + HTML + CSS/JS to Claude with site teardown skill
- [ ] Iterate section by section (never try to fix everything at once)
- [ ] For individual components: source from 21st.dev, copy prompt, integrate
- [ ] For custom imagery: generate in MidJourney, clean artifacts in Photopea
- [ ] For video backgrounds: generate in Kling/VO3, keep motion subtle, ~15 seconds
- [ ] Use Stitch or Pencil.dev for visual ideation on redesigns

### Polish Phase
- [ ] Add loading animation sequence (adds perceived weight and quality)
- [ ] Add micro-interactions (hover states, button glows, card animations)
- [ ] Review typography — check Google Fonts for better alternatives
- [ ] Add scroll animations (counters, progress bars, text reveals)
- [ ] Check mobile responsiveness (toggle in builder or prompt explicitly)
- [ ] Add SEO meta tags and open graph tags
- [ ] Replace default favicon with client's icon
- [ ] Generate `sitemap.xml`
- [ ] Final screenshot loop review

### Deployment
- [ ] Tell Claude: *"Push to GitHub, repository name: [name]"*
- [ ] Authenticate: `gh auth login` → follow browser flow
- [ ] Verify `.env` files and `.claude` folder are in `.gitignore`
- [ ] Set GitHub repository visibility to **Private**
- [ ] Go to Cloudflare → Workers & Pages → Import Git repository
- [ ] Select framework: **Next.js with Static HTML Export**
- [ ] Deploy and wait for confirmation
- [ ] Set up custom domain via CNAME at your domain registrar
- [ ] Connect repo to V0/Vercel for maintenance management
- [ ] Add `vercel.json` with `"deployment": {"enabled": false}` to prevent double-deploy

---

## SOP 2: Cloning a Professional Website

1. Find the website you want to use as reference
2. Press `F12` → Console → `Ctrl+Shift+P` → "Screenshot" → Capture full size → Download
3. Right-click → View Page Source (`Ctrl+U`) → Select all → Copy
4. Scroll to bottom of HTML source → identify CSS and JS file URLs
5. In Claude Code: *"Here is the HTML for [site]. Take a look at the CSS and JS files as well. Use the site teardown skill. Clone this site."*
6. Paste HTML source into Claude Code
7. Let Claude build first pass
8. Compare side-by-side with reference site
9. Iterate section by section
10. Ask Claude to explain specific effects you want to understand (education phase)

---

## SOP 3: Managing the Screenshot Loop

**Setup (one-time per project):**
1. In CLAUDE.md, add screenshot workflow section
2. Tell Claude to set up Puppeteer for screenshot capture
3. Specify naming convention: `[section]-[version]-[timestamp]`

**During builds:**
- Claude automatically takes screenshots after building each section
- Claude compares screenshots to reference and fixes mismatches
- Typically 2+ passes before moving to next section

**Override rule:**
> For animated or dynamic backgrounds: explicitly tell Claude *"do not use screenshot tool to compare, just work in the code and I will review."* Reason: Claude gets stuck in an infinite loop trying to screenshot animations that don't render properly in a headless browser.

**Cleanup:**
- After each major build phase: *"Delete all temporary screenshots"*
- Or add to CLAUDE.md: auto-delete temp screenshots at session end

---

# Part 5: Templates

## Template 1: Initial Build Prompt

```
Act as a senior web architect. Build a professional [industry] website
called [Business Name].

Tech stack: Next.js configured for static export
Color palette: Primary [hex] | Secondary [hex] | Background [hex] | Accent [hex]
Font family: [Font name]

Structure: [Homepage / Services / About / Contact]

Design direction: [dark mode / light mode], [modern/classic/playful],
[premium/approachable/technical]

Hero section: [Headline] | [Sub-headline] | CTA: [Button text]

Content for homepage:
[Paste full copy here]

Header navigation: [Nav links]
Footer: [Links, social, copyright]

Reference the brand assets in /brand_assets for logo and guidelines.
Start with the homepage only.
```

---

## Template 2: ANF Normalize Prompt

```
Normalize the entire webpage to have a consistent design system:
- Unify all font families to [chosen font]
- Replace all color variations with this exact palette: [hex codes]
- Standardize spacing to use consistent units throughout
- Ensure border radius is consistent across all components
- Unify button styles to one primary and one secondary variant
- Remove any design inconsistencies between sections
- Ensure the page flows as if designed by one person
Do not change layout structure or content.
```

---

## Template 3: Research + Fill Prompts

**Research:**
```
Review the entire website structure. Identify every section that contains
placeholder, generic, or lorem ipsum content. Create a comprehensive list
of what real information is needed. Then research [industry/company name]
to find accurate, specific information to fill each gap.
Compile all research before proceeding.
```

**Fill:**
```
Using the research you just completed, fill the entire website with real,
specific, accurate content. Replace all placeholders, generic statistics,
fake testimonials, and lorem ipsum with researched, contextual information.
Keep all design and layout intact. Only change text content and alt-text.
```

---

## Template 4: CLAUDE.md Starting Template

```markdown
# Project: [Website Name]

## Core Rules
- ALWAYS invoke the frontend-design skill before writing any frontend code
- NEVER push to GitHub until explicitly told "push to GitHub"
- ALWAYS preview changes locally first
- Delete temporary screenshots after each build phase

## Brand Assets
- Logo: /brand_assets/logo.[ext]
- Brand guidelines: /brand_assets/brand-guidelines.[ext]
- Media: /public/media/

## Tech Stack
- Framework: Next.js with static export
- Styling: Tailwind CSS
- Deployment target: Cloudflare Pages

## Screenshot Workflow
- Use Puppeteer for screenshots
- Save to /temp-screenshots/
- Naming: [section]-[version]-[timestamp]
- Do NOT use screenshot tool for animated elements

## Design Standards
- Primary color: [hex]
- Secondary color: [hex]
- Font: [Font name]
- Border radius: [value]

## Current State
[Update this as project evolves]
```

---

## Template 5: Site Teardown Prompt

```
Here is the full HTML source for [website URL]:
[PASTE HTML HERE]

Please also fetch and analyze the CSS and JS files linked in this HTML
(use the site teardown skill).

Using this complete picture of how [site] is built:
1. Identify the key visual techniques and effects used
2. Note the specific CSS classes, libraries, and animations
3. Use this technical understanding to clone the site for [project name]
4. Explain briefly how the most impressive effects were achieved
```

---

# Part 6: Common Mistakes & Pitfalls

## Mistake 1: Prompting Without Visual References
**What happens:** Claude fills gaps with training data defaults (purple, generic grids, overused fonts).
**Fix:** Always provide visual references — screenshots, HTML source, or component code from 21st.dev.

## Mistake 2: Skipping the CLAUDE.md File
**What happens:** No persistent context. Claude forgets rules every session. Pushes to GitHub prematurely.
**Fix:** CLAUDE.md before anything else. Update it throughout the project.

## Mistake 3: Screenshot Loop with Animated Elements
**What happens:** Claude takes screenshot of animation, can't see the motion, decides it's broken, loops infinitely.
**Fix:** Explicitly tell Claude: *"do not use screenshot tool for this section, just implement the code and I will review."*

## Mistake 4: One-Shotting Complex Multi-Page Builds
**What happens:** Claude generates 5 pages at once, each slightly inconsistent, hard to debug.
**Fix:** Build one page at a time. Get the homepage perfect first. Use it as the style template for remaining pages.

## Mistake 5: Pushing API Keys to GitHub
**What happens:** API keys in `.env` files or `.claude` folders get pushed to repo, scraped, and abused.
**Fix:** Always add `.env` and `.claude` to `.gitignore`. Set repository to private. Use Cloudflare Workers for server-side API calls.

## Mistake 6: Skipping Mobile Responsiveness
**What happens:** Desktop looks great, mobile is broken. Client shows potential customer on phone. Embarrassing.
**Fix:** Explicit mobile responsiveness prompt after every major design change. Video on desktop, still image on mobile.

## Mistake 7: Trying to Polish a Weak Foundation
**What happens:** Hours spent tweaking colors and animations on a structurally poor layout. Diminishing returns.
**Fix:** Get component selection and layout structure right first before any polishing.

## Mistake 8: No Maintenance Contract
**What happens:** You build a site, deliver it, never hear back. No recurring revenue.
**Fix:** Price the site slightly lower but include a 6-month mandatory maintenance contract at $300–500/month.

## Mistake 9: Installing Skills Without Developing Taste
**What happens:** You install frontend-design skill, get "better AI templates," still clearly AI. Can't identify why.
**Fix:** 15 minutes daily on Awwwards, Godly, Dribbble. After 30 days your vocabulary transforms your prompts.

## Mistake 10: Skipping the Development/Deployment Separation
**What happens:** One bad prompt breaks a live client site. Relationship damaged.
**Fix:** Always develop locally. Only push to GitHub when satisfied. Let Cloudflare auto-deploy.

---

# Part 7: Tools Reference

## Required Tools

| Tool | Purpose | Cost |
|------|---------|------|
| VS Code | IDE for Claude Code | Free |
| Claude Code extension | Interface within VS Code | Included w/ Claude subscription |
| Claude Pro or Max | AI subscription | ~$20–100/month |
| GitHub | Version control + code hosting | Free for private repos |
| Cloudflare Pages | Static hosting with auto-deploy | Free (500 builds/month) |

## Design Inspiration Resources

| Tool | Purpose |
|------|---------|
| Awwwards (awards) | Top-tier curated design inspiration — sites of the day/month |
| Godly.website | Infinite scroll design gallery |
| Dribbble | Designer portfolio inspiration, search by category |
| Pinterest | Mood boarding — search "SaaS landing page" |
| 21st.dev | Premium component library with direct Claude Code prompts |
| Google Fonts | Free typography selection with pairing suggestions |
| CodePen | Interactive component examples and experiments |

## Visual Editing Tools

| Tool | Purpose | Cost |
|------|---------|------|
| Stitch (Google) | AI visual canvas for design iteration | Free |
| Pencil.dev | Real-time visual editing integrated with VS Code/Cursor | Free/Paid |
| Figma | Professional design tool for wireframes | Free tier available |

## Asset Creation

| Tool | Purpose |
|------|---------|
| MidJourney v7 | Hero images and concept art — best for stylized pieces |
| Kling / VO3 | Convert still images to video for animated backgrounds |
| Photopea | Free web-based Photoshop — essential for cleaning AI image artifacts |
| Google AI Studio | Gemini-based image generation with API access |

## Deployment & Maintenance

| Tool | Purpose | Cost |
|------|---------|------|
| V0 (Vercel) | Visual web editor connected to GitHub for maintenance | Free tier + paid |
| Basin (usebasin.com) | Headless contact form backend for static sites | ~$15/month |
| Firecrawl | AI-powered web scraping for client research | Paid |
| Porkbun | Domain registrar — cheap and reliable | Domain cost only |
| WhisperFlow | Voice-to-text for faster prompting | Paid |

---

# Part 8: Case Studies

## Case Study 1: AI Automation Society Landing Page

**Setup:** CLAUDE.md + frontend-design skill + logo + brand guidelines in `/brand_assets`

**Prompt used:** *"Build me a modern and professional landing page for AI Automation Society"* — one sentence.

**Output:**
- Full one-page landing page with correct brand colors, fonts, and logo
- Animated hero section with floating logo
- Scrolling tech company marquee
- Stats, testimonials, and CTA sections
- 10 automatic screenshots taken during build
- Zero additional prompting needed

> **Lesson:** With proper setup, a single sentence prompt produces near-professional output. The work is in the setup, not the prompt.

---

## Case Study 2: Qovo Robotics — Three Levels Compared

| Level | Setup | Result |
|-------|-------|--------|
| Level 1 (no skill) | Text prompt only | Purple everywhere, boring grid, clearly AI |
| Level 2 (skill) | Frontend-design skill added | Better typography and colors, still recognizably AI |
| Level 3 (ANF) | 21st.dev components + normalize + fill | Coherent, professional, feels designed by a human |

> **Lesson:** Same model, same prompt length — 3× output quality difference from workflow structure alone.

---

## Case Study 3: Real Client Trucking Website — $8,000 Build

| Item | Detail |
|------|--------|
| Acquisition | Referral — friend of the family |
| Discovery | 2 hours in meetings |
| Build time | ~10 hours (fulfillment only) |
| Sales time | ~6 hours |
| AI token cost | ~$20 (OpenRouter + Gemini Pro) |
| Revenue | $8,000 upfront |
| Recurring | $300/month maintenance (~3 hrs/mo) |
| Effective rate | ~$443/hr on build; ~$100/hr on maintenance |

**Stack:** Next.js static export · Cloudflare Pages · V0 for maintenance · Basin for contact forms · AI-generated truck image cleaned in Photopea

> **Lesson:** The economics are extraordinary. This is documented execution from a 7-figure agency owner, not theory.

---

## Case Study 4: Argus — Full 7-Level Journey

*"Argus" is a social media intelligence SaaS app used as a teaching case through all seven levels.*

| Level | What Was Done | Result |
|-------|--------------|--------|
| 1 | Text prompt only | Purple gradient nightmare |
| 2 | UIUX Pro Max skill | Better but still AI template |
| 3 | Screenshots from OpenHands.ai | ~50% fidelity to reference |
| 4 | Full HTML/CSS/JS teardown of OpenHands | ~80–90% fidelity, proper effects |
| 5 | MidJourney hero image + Kling video + tagline *"See What's Next"* | Genuinely original, character-filled |
| 6 | Stitch ideation + glassmorphism cards + tinkering | Polished, intentional, premium feel |

**Polish details added at Level 6:**
- Loading sequence before text renders (adds perceived weight)
- Font changed to something more distinctive (via Google Fonts)
- Scroll section ticker that doubles as visual border between hero and content
- Glassmorphism cards that pop off the page
- Animated counters (0 to 10M on scroll into view)
- Scroll progress bar at top of page
- Lighting shimmer effect on key text

> **Lesson:** Visual storytelling + custom imagery is the unlock from clone to original. Every element of the Argus hero (mythological multi-eyed figure, birds, tagline "See What's Next") reinforces one narrative about seeing social media trends before others.

---

# Part 9: Knowledge Compression

## 20 Most Important Lessons

1. The quality ceiling of your output is determined by your setup, not your prompting skill
2. Claude has no taste — you must externalize taste through visual references, components, and brand assets
3. A CLAUDE.md file is non-negotiable; it's your project's persistent memory and rulebook
4. The frontend-design skill alone gets you from AI slop to designed AI template — still not enough, but necessary
5. Real component code from 21st.dev produces output that doesn't look AI-generated because it wasn't designed by AI
6. Screenshots have a ceiling — source HTML/CSS/JS breaks through it by giving Claude the actual technical implementation
7. The ANF framework (Assemble, Normalize, Fill) is the most reliable path to quality for beginners
8. Visual storytelling in the hero section carries 80% of a site's perceived quality
9. Custom imagery (MidJourney + Kling for video) is what separates Level 4 clones from Level 5 originals
10. Build locally, push to GitHub only when satisfied, let Cloudflare auto-deploy — never experiment on live sites
11. Maintenance contracts at $300–500/month are the real business model; builds are the acquisition cost
12. The effective hourly rate on a well-executed website build exceeds $400/hr with AI
13. Referrals and relationships drive disproportionate B2B revenue; cold outreach is supplementary
14. The animation/screenshot conflict is a known failure mode — always override for dynamic elements
15. Typography is the fastest upgrade with the highest perceived quality return
16. "Weight" (loading sequences, whitespace, dark palettes) makes sites feel premium; "polish" (micro-interactions) makes them feel finished — you need both
17. AI image artifacts (blurry text) must always be cleaned in Photopea before use in client work
18. Cloning sites is education; you learn more from deconstructing one professional site than from prompting 100 generic ones
19. The static site architecture (Next.js + Cloudflare Pages) is superior to WordPress for 90% of marketing websites
20. API keys in static site files are a critical security risk — never hardcode them; use Cloudflare Workers for server-side calls

---

## 10 Highest-Leverage Actions

1. **Install frontend-design skill globally** — one-time setup, permanent improvement to every project
2. **Create a reusable CLAUDE.md template** — copy-paste at project start, customize in 5 minutes, saves hours
3. **Build a personal reference library** — 15 min/day on Awwwards/Godly for 30 days transforms your vocabulary
4. **Learn the site teardown workflow** — clone one site you love completely; more educational than 10 tutorials
5. **Set up GitHub → Cloudflare Pages pipeline** — one-time config, then deployments are automatic forever
6. **Create 3 reusable component collections on 21st.dev** — hero, features, testimonials — customize per client
7. **Offer maintenance contracts on every build** — present as client protection, not an upsell
8. **Build one demo site in a target niche** — use it as proof of work for outreach and referral conversations
9. **Master Photopea for AI image cleanup** — 15 minutes learning the blur tool eliminates the most obvious AI tell
10. **Set up V0 for client management** — dramatically reduces time per edit, makes serving 10+ clients feasible

---

## 5 Biggest Mistakes to Avoid

| Mistake | Consequence | Prevention |
|---------|------------|------------|
| Prompting without visual references | Always get average, generic output | Always provide screenshots, HTML source, or component code |
| Pushing to GitHub before local review | One bad prompt breaks live client site | Develop locally always; explicit push command only when satisfied |
| Building without CLAUDE.md | No project memory; Claude repeats mistakes every session | CLAUDE.md is the first file you create, always |
| Skipping maintenance contracts | Turns a business into a series of transactions with no recurring base | Include mandatory 6-month maintenance in every proposal |
| One-shotting multi-page builds | Inconsistent output, hard to debug | Homepage first, perfect it, use it as style template for all pages |

---

## One-Page Cheat Sheet

### Setup (Do Once)
- [ ] Install VS Code + Claude Code extension
- [ ] Get Claude Pro/Max subscription
- [ ] Install frontend-design skill globally (`/plugins`)
- [ ] Create CLAUDE.md template (save to reuse)
- [ ] Set up GitHub, Cloudflare Pages, and V0 accounts

### Every New Project
- [ ] Create project folder → open in VS Code
- [ ] Drop in CLAUDE.md → customize brand colors/fonts
- [ ] Create `/brand_assets` → add logo + guidelines
- [ ] Find 3 reference sites → screenshot them
- [ ] Collect component prompts from 21st.dev (or clone reference site HTML/CSS/JS)
- [ ] Build homepage first, **only** homepage
- [ ] Preview locally (`npm run dev`)
- [ ] Normalize if using multiple components
- [ ] Fill with real content via research prompt
- [ ] Polish: typography, animations, mobile
- [ ] Push to GitHub → auto-deploy to Cloudflare Pages
- [ ] Set up custom domain
- [ ] Connect to V0 for maintenance

### Troubleshooting

| Problem | Solution |
|---------|---------|
| Output looks generic/AI | Add screenshots from Awwwards/Godly; source HTML/CSS/JS from reference site |
| Output looks inconsistent | Run Normalize prompt; specify all hex codes and fonts explicitly |
| Screenshot loop is stuck | Tell Claude: "do not use screenshot tool, just write the code" |
| Looks bad on mobile | Prompt: "ensure full mobile responsiveness, check on phone viewport" |
| Too much purple/blue | Specify exact hex codes; say "avoid Tailwind default colors" |

### Business Math

| Item | Numbers |
|------|---------|
| Build price range | $5,000 – $10,000 |
| Build time (with AI) | 10–12 hours fulfillment |
| AI token cost | ~$20 per site |
| Effective hourly rate | $400–800/hr |
| Maintenance contract | $300–500/month |
| Maintenance time | 2–3 hours/month |
| Target: 10 clients | $3,000–5,000 MRR |

---

## If I Only Remembered One Thing

> The quality of your Claude Code output is not determined by how well you prompt — it's determined by how well you set up your environment before you prompt.
>
> A single sentence prompt ("Build me a landing page for [business]") with proper setup — CLAUDE.md, frontend-design skill, brand assets, a reference site's HTML/CSS/JS, and a 21st.dev component collection — will produce professional, branded, non-AI-looking output every time.
>
> That same prompt with no setup will produce purple gradient AI slop every time.
>
> **The work is in the setup. The setup is the skill.**

---

*Synthesized from 5 expert source transcripts covering Claude Code web design from beginner to advanced. All concepts, frameworks, and tools are drawn directly from practitioners building and selling real websites using these workflows.*
