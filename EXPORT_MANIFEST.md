# Source manifest

This manifest describes the **current editable repository branch**, not an archive already present in the folder. The existing `website-source-export.zip` files are earlier releases and do not contain all current Evidence System, portrait, content, and capability-route updates.

## Project

- Branch: `sunset-immersive-portfolio`
- Build: Node.js static-site generator; npm lockfile v3, no third-party npm packages.
- Routes: 52 public routes plus `dist/404.html` (53 generated HTML files total).
- Motion: locally bundled GSAP/ScrollTrigger, 48 persistent 3D fragments, six scene arrangements, static/reduced-motion alternative.
- Environment: optional `SITE_ORIGIN`; no secrets or runtime environment variables.

## Key editable files

```text
build.mjs
content/portfolio.json
content/about.json
src/site.css
src/design-tokens.css
src/evidence-system.css
src/site.js
src/about.js
assets/                         # local portraits, supplied documentary photos, fonts, licenses, GSAP
pod/                            # evidence, provenance, decisions, dependencies, deployment notes
README.md
PORTABILITY.md
RELEASE-AUDIT.md
package.json
package-lock.json
server.mjs
verify.mjs
vercel.json
dist/                           # generated route pages, local assets and metadata
```

## Runtime assets and services

- Fonts: Anēk Latin, Anēk Bangla, Newsreader normal/italic, and Martian Mono variable WOFF2 files; local license texts are included.
- Visual assets: local portrait and work photographs, generated diagrams/charts, and the unused legacy abstract sculpture.
- Animation: local GSAP and ScrollTrigger scripts; no CDN request is needed.
- External services required to display or build: none. Optional Vercel hosting metadata/configuration is not needed for local use.
- Analytics events: local `CustomEvent`s only; no analytics endpoint receives them.

## Packaging exclusions

For a future ZIP release, exclude `node_modules`, `.git`, `.env`, credentials, temporary staging folders, previous archives and intermediate `.7z`/`.tar.gz` files. `.env.example` is safe to include. Do not describe an archive as current until it is recreated from this branch and tested after clean extraction.
