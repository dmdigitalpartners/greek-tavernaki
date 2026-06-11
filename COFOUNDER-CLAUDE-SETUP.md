# Setup Instructions for Claude Code — Co-Founder Onboarding

You are Claude Code running on the co-founder's machine for the first time.
Your job is to get this developer fully set up and ready to contribute to the Greek Tavernaki project.
Work through every phase below in order. Do not skip steps. Confirm each phase before moving to the next.

---

## Phase 1: Check Prerequisites

Run the following checks and report the results clearly:

```bash
git --version
node --version
npm --version
```

- If `git` is not found: tell the user to download Git from https://git-scm.com and restart VS Code after installing.
- If `node` is not found: tell the user to download Node.js LTS from https://nodejs.org and restart VS Code after installing.
- If both are present: confirm versions and continue.

---

## Phase 2: Configure Git Identity

Check if git identity is already set:

```bash
git config --global user.name
git config --global user.email
```

If either is blank, set them:

```bash
git config --global user.name "Co-Founder Name"
git config --global user.email "cofounder@email.com"
```

Ask the user for their name and email before running. Use their actual values.

---

## Phase 3: Authenticate with GitHub

Check if GitHub authentication works:

```bash
gh auth status
```

If `gh` is not installed or not authenticated:
- Tell the user to install GitHub CLI from https://cli.github.com
- Then run: `gh auth login` and follow the interactive prompts (browser-based login)
- After authentication, confirm with: `gh auth status`

Alternatively, if they prefer HTTPS with a personal access token:
- Go to github.com → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
- Generate a token with `repo` scope
- When git asks for a password during clone/push, use this token instead

---

## Phase 4: Clone the Repository

Navigate to the folder where the user wants to store the project, then clone:

```bash
git clone https://github.com/dani-aisystems/greek-tavernaki.git
cd greek-tavernaki
```

Ask the user which folder they want to work in before running (e.g. Desktop, Documents).

After cloning, confirm these files exist:
- `index.html`
- `serve.mjs`
- `package.json`
- `README.md`
- `brand_assets/` folder
- `Visual Assets/` folder

---

## Phase 5: Install Dependencies

```bash
npm install
```

This installs Puppeteer (the screenshot tool). It will take 1–2 minutes.
Confirm it completes without errors.

---

## Phase 6: Verify the Site Runs Locally

```bash
node serve.mjs
```

Tell the user to open http://localhost:3000 in their browser.
Ask them to confirm the website loads and looks correct (matches https://greek-tavernaki.vercel.app).

Once confirmed, stop the server (Ctrl+C) before proceeding.

---

## Phase 7: Verify Asset Loading

Tell the user to open http://localhost:3000, then open browser DevTools (F12 or Cmd+Option+I) → Network tab → reload the page.

Check that no images show as red/404 errors.

If any images fail to load, check the filename in `index.html` against the actual file on disk. File names are case-sensitive — `Logo.png` and `logo.png` are different files.

---

## Phase 8: Test the Git Workflow

Run a test to confirm push access works:

```bash
git checkout -b test/setup-verification
git push -u origin test/setup-verification
```

If the push succeeds, confirm access is working, then clean up:

```bash
git checkout main
git branch -d test/setup-verification
git push origin --delete test/setup-verification
```

If the push fails with a permissions error, the co-founder needs to be added as a collaborator:
- Tell the main developer (Daniel) to go to github.com/dani-aisystems/greek-tavernaki → Settings → Collaborators → Add people → enter the co-founder's GitHub username.

---

## Phase 9: Open the Project in VS Code

If VS Code is already open, confirm the correct folder is open (greek-tavernaki root).
If not open yet:

```bash
code .
```

Recommend installing these VS Code extensions if not already installed:
- **GitLens** — shows who changed what, line by line
- **Prettier** — consistent code formatting

---

## Phase 10: Final Confirmation

Run this summary check:

```bash
git remote -v
git log --oneline -3
git status
```

Expected output:
- Remote should show `origin https://github.com/dani-aisystems/greek-tavernaki.git`
- Log should show the initial commit
- Status should say `nothing to commit, working tree clean`

Tell the user: **Setup is complete. You are ready to contribute.**

Remind them to read `COFOUNDER-START-HERE.md` for the day-to-day workflow.

---

## Daily Workflow Reference (for Claude Code to follow each session)

When the co-founder asks you to work on a feature:

1. `git checkout main && git pull origin main` — get latest
2. `git checkout -b feat/description-of-work` — create branch
3. `node serve.mjs` — preview locally at http://localhost:3000
4. Make changes to `index.html`
5. `git add index.html` — stage the file
6. `git commit -m "feat: describe what changed"` — commit
7. `git push -u origin feat/description-of-work` — push
8. Tell the user to open a Pull Request on GitHub and share the Vercel preview URL with Daniel for review

Never push directly to `main`. Always work on a named branch.
