# Project: Greek Tavernaki Website

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Core Rules
- NEVER push to GitHub until explicitly told "push to GitHub"
- ALWAYS preview changes on localhost before reporting done
- Delete temporary screenshots after each major build phase

## Vercel
- Project: `greek-tavernaki` → https://greek-tavernaki.vercel.app
- Deploy is automatic via GitHub — merging to `main` triggers production deploy
- PRs automatically get a Vercel preview URL

## Local Server
- Start: `node serve.mjs` (serves project root at http://localhost:3000)
- If already running, do not start a second instance
- Always screenshot from localhost, never from file:///

## Screenshot Workflow
- `node screenshot.mjs http://localhost:3000` — saves to `./temporary screenshots/screenshot-N.png`
- Optional label: `node screenshot.mjs http://localhost:3000 label`
- After screenshotting, read the PNG with the Read tool and analyze it
- Do at least 2 comparison rounds. Stop only when no visible differences remain.
- Do NOT use screenshot tool for animated/dynamic sections — just write the code and note it

## Output Defaults
- Single `index.html` file, all styles inline
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Brand Assets
- Check `brand_assets/` before designing — use any assets found there
- If logo present, use it. If color palette defined, use those exact values.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette. Use the brand colors defined below.
- **Shadows:** Never flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Different font for headings vs body. Tight tracking on large headings (`-0.03em`), generous line-height on body (`1.7`).
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states.
- **Images:** Gradient overlay (`bg-gradient-to-t from-black/60`) and color treatment with `mix-blend-multiply`.
- **Spacing:** Intentional, consistent spacing tokens.
- **Depth:** Layered z-plane system (base → elevated → floating).

## Hard Rules
- Do not add content not in the reference or brief
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
- Do not stop after one screenshot pass

## Design Direction
<!-- To be filled in once brand assets and content are provided -->
- Primary color: TBD
- Secondary color: TBD
- Font (headings): TBD
- Font (body): TBD
- Mood: Warm, Mediterranean, authentic Greek taverna feel

## Current State
- [ ] Brand assets gathered
- [ ] Content/copy provided
- [ ] Reference sites identified
- [ ] Homepage built
- [ ] Mobile responsive checked
- [ ] Polish phase complete
