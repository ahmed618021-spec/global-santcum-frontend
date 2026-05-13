# TGS HTML Demo - Deployment Guide

## What this project contains

- Public website entry page: `tgs_home_v7.html`
- Internal portal entry page: `TGS Internal Portal Home Page V2.html`
- Static image assets: `images/`
- Shareable landing page: `index.html`
- Deployment config: `vercel.json`

## Industry-standard handoff notes

- This is a static HTML/CSS/JS project (no build step required).
- All core navigation is wired to local HTML files.
- Image references are local and deployment-safe.
- A root landing page is provided for clean sharing and demo access.

## Local run

If you want to run locally with Node:

1. Open terminal in this project folder.
2. Run:

```powershell
npx --yes serve -l 5500 .
```

3. Open:

- `http://localhost:5500/` (landing page)
- `http://localhost:5500/tgs_home_v7.html` (public website)
- `http://localhost:5500/TGS%20Internal%20Portal%20Home%20Page%20V2.html` (portal)

If you want `/website` and `/portal` shortcuts locally as well, run:

```powershell
vercel dev
```

## Deploy to Vercel (recommended)

### Option A: Vercel Dashboard (easiest)

1. Push this folder to a GitHub repository.
2. Go to Vercel dashboard.
3. Click Add New -> Project.
4. Import your repository.
5. Framework preset: Other.
6. Build command: leave empty.
7. Output directory: leave empty.
8. Click Deploy.

After deploy, share:

- `https://your-project.vercel.app/`
- `https://your-project.vercel.app/website`
- `https://your-project.vercel.app/portal`

### Option B: Vercel CLI

1. Install CLI once:

```powershell
npm i -g vercel
```

2. In project folder, deploy:

```powershell
vercel
```

3. For production deploy:

```powershell
vercel --prod
```

## Pre-share checklist

- Open `/` and verify both cards work.
- Open `/website` and test top nav links.
- Open `/portal` and test sidebar links.
- Verify key images render on home/about/venues/experiences/list-your-venue pages.

## Optional next improvement

For cleaner URLs, you can later rename files with spaces to kebab-case names (for example `portal-home.html`) and update links once.
