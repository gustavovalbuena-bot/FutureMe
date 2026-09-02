# Kindred Tomorrow MVP

Kindred Tomorrow is a parent-led, child-owned future-letter ritual for families with children ages 8–14. This repository contains the interactive market-test landing page and its GitHub Pages deployment.

## What the prototype does

- Explains the future-letter → obstacle plan → weekly check-in → open-later loop.
- Runs a four-step family-capsule experience in the browser.
- Saves one capsule and waitlist entries to local browser storage for testing.
- Displays the physical kit and dashboard concepts, evidence boundaries, pricing tests, privacy model, and 20-scene campaign gallery.
- Avoids remote image optimization so local and Sites builds do not depend on an unavailable asset-fetch binding.

This is an MVP demonstration, not a production child-data service. It does not send email, charge cards, authenticate families, or store data on a server. Production use requires verified consent, lifecycle controls, delivery recovery, safety operations, security review, and specialist legal counsel.

## Run and verify

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
npm test
```

The local site is served at the URL printed by the development command. Use the “Start a family capsule” button to exercise the full prototype and the dashboard check-in state.

## Main files

- `app/page.tsx` — page structure and MVP interactions
- `app/globals.css` — responsive visual system
- `app/layout.tsx` — metadata and social card
- `next.config.ts` — image-optimizer-independent configuration
- `public/kindred/`, `public/scenes/`, `public/brand/` — approved visual assets
- `.github/workflows/deploy-pages.yml` — automatic GitHub Pages deployment

## Live prototype

https://gustavovalbuena-bot.github.io/FutureMe/

Working name and identity are provisional pending trademark and domain review.
