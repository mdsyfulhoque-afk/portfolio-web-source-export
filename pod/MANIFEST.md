# Project manifest

Version 1.1.0 · 28 September 2026

This repository is the editable source of the current portfolio website on branch `sunset-immersive-portfolio`. The supplied portfolio archive informed the visual system and supplied media, while assignment copy continues to follow the source and evidence audit.

| Area | Purpose |
|---|---|
| `build.mjs` | Static page generator, shell, evidence plates, route and sitemap generation |
| `content/portfolio.json` | Assignment evidence record |
| `content/about.json` | Profile, commissioned service families, sectors, methods and institutions |
| `src/site.css` | Base responsive layout and legacy structural components |
| `src/design-tokens.css` | Evidence System color, typography, grid and motion tokens |
| `src/evidence-system.css` | Site-wide visual redesign and static/animated film styles |
| `src/site.js` | Navigation, theme, evidence reference, enquiry behavior and GSAP/ScrollTrigger motion |
| `src/about.js` | Data-driven About page renderer |
| `assets/` | Local portrait, documentary photos, fonts and licenses, GSAP/ScrollTrigger, diagrams |
| `dist/` | Generated 52-route static site plus 404 page |
| `verify.mjs` | Route, asset, metadata, content, accessibility-structure and motion checks |
| `pod/` | Evidence, provenance, dependency, release and handoff documentation |
| `package.json` / lockfile | Node version and reproducible build/preview/check scripts; zero third-party npm packages |

Run with `npm ci`, `npm run build`, `npm run check`, then `npm run start`. No database migration, API key or runtime network asset is required.
