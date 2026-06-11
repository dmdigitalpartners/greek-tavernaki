# Greek Tavernaki

Restaurant website for Greek Tavernaki. Built with vanilla HTML/CSS/JS and Tailwind CSS CDN.

## Local Development

```bash
npm install       # install Puppeteer (screenshot tool)
node serve.mjs    # start local server at http://localhost:3000
```

Open http://localhost:3000 in your browser.

## Screenshot Tool

```bash
node screenshot.mjs http://localhost:3000
node screenshot.mjs http://localhost:3000 label   # optional label
```

Screenshots save to `temporary screenshots/` (gitignored — not committed).

## Branch Workflow

```
feat/[name] → PR → main → Vercel production
```

- Never push directly to `main`
- All work goes through a Pull Request with 1 approval required
- Vercel auto-deploys to production on merge to `main`
- Vercel generates a preview URL for every open PR automatically

## Deployment

Live site: https://greek-tavernaki.vercel.app

Merging a PR into `main` triggers an automatic Vercel production deployment. No manual deploy steps needed.
