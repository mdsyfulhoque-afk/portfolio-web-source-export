# Syful Hoque — Evidence to Systems

Version 1.0.0 · 16 September 2026

A complete, portable editorial and commercial website. The production source is this directory. The supplied Claude design export remains preserved separately in the parent workspace.

## Run

Requires Node.js 22 or newer; verified with Node 24.16.0. There are no application package dependencies and no installation step.

```sh
node build.mjs
node verify.mjs
node server.mjs
```

Open the printed local URL. `dist/` is the complete public website and can be hosted by a static web server. `build.mjs` compiles real HTML pages from the source record; every route works directly without client-side routing.

## Contents

- 45 HTML pages, including 28 detailed assignments, four practices, products, ProposalDesk, three original method guides, about, enquiry, privacy and 404.
- A shared-node, six-scene CSS 3D Decision Flow; static diagrams on mobile, short screens, reduced motion or script failure.
- A native project-brief form with a review step and explicit email/WhatsApp handoff. No database or silent submission.
- Self-hosted typography, a 66 KB original WebP hero, accessible landmarks and progressive enhancement.
- Private Sites hosting metadata in `.openai/hosting.json`.

## Editing

Content: `content/portfolio.json` retains the imported reference. `build.mjs` contains publication-specific qualification, date treatment, page content and metadata. Styles: `src/site.css`. Behaviour: `src/site.js`. Assets: `assets/`. Build output: `dist/`.

After edits, build and verify. The checked-in public assets let the site reconstruct without downloading fonts or using an image generator. `prepare-fonts.mjs` is optional maintenance tooling, not a build dependency.

## Limits

The hosting edition is private. This is a functioning professional website, not proof of commercial revenue or a guarantee of proposal awards. No checkout, analytics, CRM, newsletter subscription, file upload or backend lead storage is configured. The site states these behaviours honestly.

See `pod/HANDOFF.md`, `pod/SOURCE-AUDIT.md` and `pod/DECISIONS.md` for unresolved source dates, offer status, validation and deployment details.
