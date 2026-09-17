# Export manifest

Export name: `website-source-export.zip`  
Export date: 2026-09-17  
Project: Syful Hoque — Evidence to Systems  
Classification: portable standalone source export

## Runtime

- Architecture: generated static HTML, CSS and browser JavaScript
- Build runtime: Node.js 22+
- Package manager: npm-compatible; no third-party dependencies
- Source of truth: `build.mjs`, `content/portfolio.json`, `src/`, `assets/`
- Public output: `dist/`

## Tree

```text
.
├── .env.example
├── .gitignore
├── .nvmrc
├── .openai/hosting.json              # optional historical hosting metadata
├── EXPORT_MANIFEST.md
├── PORTABILITY.md
├── README.md
├── RELEASE-AUDIT.md
├── STRATEGY-LOCK.md
├── build.mjs
├── content/portfolio.json
├── package.json
├── pod/                               # source audit, decisions and handoff records
├── prepare-fonts.mjs
├── server.mjs
├── src/site.css
├── src/site.js
├── vercel.json
├── verify.mjs
├── assets/                            # source image, fonts and licenses
└── dist/                              # validated 45-page public build
```

## Included assets

The export contains the original editorial WebP artwork, its PNG source, Fraunces regular and italic variable WOFF2 subsets, Inter variable WOFF2, IBM Plex Mono WOFF2, the three corresponding license files, favicon, profile text, sitemap, security headers and all generated HTML/CSS/JS assets.

## Dependencies

There are no runtime or development package dependencies. `package-lock.json` is included and records the empty npm dependency graph; Node's built-in `fs`, `path` and `http` modules are sufficient.

## Environment variables

`SITE_ORIGIN` is optional and build-time only. It controls canonical URLs, sitemap URLs and structured data. No secret, API key, database URL or credential is used.

## External services

None are required to run the export. The retained `.openai/hosting.json` is metadata for the original Sites deployment only.

## Replaced, mocked or unavailable

Nothing in the page UI was mocked. The original hosting platform itself is not portable and is documented rather than required. There is no backend to export. The local enquiry flow intentionally remains a review-and-handoff flow; it does not pretend to have a server-side submission system.
