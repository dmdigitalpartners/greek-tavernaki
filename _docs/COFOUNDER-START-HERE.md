# Welcome to the Greek Tavernaki Project

Hi! This document will walk you through everything you need to get set up and start contributing to the website. No technical experience required — just follow the steps.

---

## What You'll End Up With

By the end of this guide you will have:
- A copy of the website project on your computer
- The ability to run the website locally (on your own machine before anything goes live)
- The ability to make changes and send them to Daniel for review
- A safety net so nothing you do can break the live website

---

## Step 1 — Get Claude Code Set Up

Claude Code is the AI assistant that will do most of the heavy technical lifting for you. Before anything else, make sure you have it installed and open in VS Code.

Once it's open, type this message exactly into the chat:

> **Read the file COFOUNDER-CLAUDE-SETUP.md and follow every step to set me up for the Greek Tavernaki project.**

Claude Code will then walk through the entire setup automatically — installing what's needed, downloading the project, and confirming everything works. Just answer any questions it asks (like your name and email).

That's it for setup. Claude Code handles the rest.

---

## Step 2 — How the Project is Organised

Here's what the project looks like and what each part does:

| Folder / File | What it is |
|---------------|-----------|
| `index.html` | The entire website. One file — all the pages, styling, and content live here |
| `brand_assets/` | The restaurant's food photos used on the website |
| `Visual Assets/` | Extra photos and reference images |
| `serve.mjs` | A small tool that lets you preview the website on your computer |
| `screenshot.mjs` | A tool that takes automatic screenshots of the site |
| `README.md` | Quick reference guide for developers |

---

## Step 3 — How to Preview the Website on Your Computer

Before any of your changes go live, you can see them privately on your own computer first. Think of it like a rehearsal stage — nothing here is public.

Tell Claude Code:

> **Start the local server so I can preview the website.**

Then open your browser and go to: **http://localhost:3000**

You'll see the full website running privately on your machine. Only you can see it at this address.

---

## Step 4 — How Changes Get Made (The Safe Way)

The project is set up so that changes can never accidentally break the live website. Here's how it works:

**The live website** lives at https://greek-tavernaki.vercel.app and is connected to the `main` branch on GitHub. Only approved, reviewed changes reach it.

**Your workspace** is a separate "branch" — think of it like your own personal copy of the project where you can experiment freely without affecting anything live.

**The review step** is a Pull Request — before your changes go live, Daniel reviews them. You can also see a preview link of exactly what the live site would look like with your changes, before approving anything.

---

## Step 5 — Your Daily Workflow

Every time you sit down to work on the project, follow these steps. You can just tell Claude Code what you want to do and it will handle the commands — but here's what's happening behind the scenes:

### Starting Work
Tell Claude Code:
> **I want to work on [describe what you're doing]. Get me set up on a new branch.**

Claude Code will:
1. Download the latest version of the project (so you're always working on the most up-to-date copy)
2. Create your own personal workspace branch with a name like `feat/menu-update`

### Making Changes
Just tell Claude Code what you want to change on the website. It will edit `index.html` and you can preview the result at http://localhost:3000.

### Saving Your Work
When you're happy with the changes, tell Claude Code:
> **Save my changes and push them to GitHub.**

Claude Code will save everything and upload it.

### Sending for Review
Once pushed, go to **github.com/dani-aisystems/greek-tavernaki** and you'll see a yellow bar at the top saying your branch has recent changes. Click **"Compare & pull request"**.

Write a short description of what you changed, then click **"Create pull request"**.

GitHub will automatically generate a **preview link** (from Vercel) — this is a temporary version of the live site with your changes applied. Share that link with Daniel so he can review it before approving.

---

## Step 6 — What Happens After Review

Once Daniel approves and merges your Pull Request:
- Your changes automatically go live on the real website
- The temporary preview link disappears
- You go back to Step 5 to start the next piece of work

---

## The Golden Rules

These three rules keep everything safe. Claude Code knows them, but it's good for you to know them too:

1. **Never work directly on `main`** — always work on your own branch. Claude Code will always set this up for you automatically.

2. **Always pull the latest version before starting work** — this makes sure you're building on top of the most recent changes, not an old version. Claude Code does this automatically.

3. **When in doubt, ask** — if something looks wrong or you're unsure, message Daniel before pushing anything. A 30-second message prevents hours of fixing.

---

## If Something Goes Wrong

**"The website won't load at localhost:3000"**
Tell Claude Code: *The local server isn't working, can you fix it?*

**"I accidentally made a mess of the file"**
Tell Claude Code: *I've made a mistake, can you undo my recent changes?* (As long as you haven't pushed yet, this is easy to fix.)

**"I got an error when trying to push"**
Tell Claude Code the exact error message and ask it to fix it.

**"Something looks broken on the live site"**
Message Daniel immediately. The `v1.0-initial` tag on GitHub means we can always roll back to the original working version.

---

## Quick Reference

| What you want to do | What to tell Claude Code |
|---------------------|--------------------------|
| Start working on something new | "Get me set up to work on [description]" |
| Preview the site | "Start the local server" |
| Save and upload my work | "Save my changes and push to GitHub" |
| See what I've changed | "Show me what files I've modified" |
| Start fresh (undo everything) | "Discard my changes and go back to main" |

---

You're all set. If you ever feel lost, just describe what you're trying to do to Claude Code in plain English — it will figure out the right steps.
