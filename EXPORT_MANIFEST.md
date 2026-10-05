# Export manifest

- Archive: `website-source-export.zip`
- Export date: 2026-10-05
- Source branch: `sunset-immersive-portfolio`
- Source revision: `b505cae` (Evidence System redesign and verified release record)
- Package type: complete editable Node.js static website, local assets/configuration, documentation and generated `dist/`
- Node: 22.9+; verified with Node.js 24.16.0
- Package manager: npm 11.16.0; lockfile v3
- npm dependencies: none
- Required environment variables: none; optional build-time `SITE_ORIGIN` is shown in `.env.example`

The project root is the ZIP root, with conventional relative file paths. The archive includes `.env.example`, `.gitignore`, `.nvmrc`, `.openai/hosting.json` as optional inert metadata, the full content and source directories, local media/fonts/licenses/GSAP assets, configuration, documentation, and generated static output. It excludes `.git`, `.vercel`, `node_modules`, actual `.env` files/secrets, previous archives, `.7z` bundles, and temporary staging/QA folders.

## Verification summary

The current release archive is tested after clean extraction. See `RELEASE-AUDIT.md` for the precise clean-install/build/check results, resolved route and asset counts, runtime checks, and known limits.

## Runtime inventory

- 52 site routes and one `404.html` document.
- Six-scene GSAP/ScrollTrigger film with 48 fragments and reduced-motion/static fallback.
- Local fonts: Anēk Latin, Anēk Bangla, Newsreader normal/italic, and Martian Mono; license files are included.
- Local portrait, documentary photos, graphics, CSS, JavaScript and animation libraries.
- No required CDN, backend, database, analytics account, API key, or ChatGPT runtime.
- Optional `document.modelContext` integration is feature-detected and not required for standalone use.
