# Syful Hoque — Evidence to Systems

Updated 28 September 2026 on the isolated `sunset-immersive-portfolio` branch of the editable source repository. The Claude-built site remains on its original branch.

This revision uses the supplied portfolio archive as its design foundation and carries the Evidence System art direction through the complete site: cool-paper surfaces, a strong 12-column editorial grid, evidence-blue and red-markup accents, appraisal-table details, a reference bar, and self-hosted Latin/Bangla type. A large local portrait opens the homepage; verified field and meeting photographs, sourced figures, and data exhibits anchor the case for the work. The six-scene GSAP/ScrollTrigger film remains a true pinned 3D scroll sequence with 48 fragments, changing camera angles, evidence plates, and scene captions. The existing assignment record and offer wording remain governed by the project evidence audit. Existing ZIPs are earlier baselines; they do not include this revision.

## Requirements and commands

- Node.js 22.9 or newer (the current release audit used Node.js 24.16.0)
- npm 11.16.0 (current audit; no third-party npm packages are required)

```sh
npm ci
npm run build
npm run check
npm run start
```

Open `http://127.0.0.1:4173/`. `npm run dev` rebuilds and starts the local server. The generated `dist/` directory can also be deployed to a static host.

## Project map

- `build.mjs`: generates the site from the content record, templates and local resources.
- `content/portfolio.json`: editable structured portfolio source.
- `src/site.css`, `src/design-tokens.css`, and `src/evidence-system.css`: base layout, design tokens, and Evidence System visual layer.
- `src/site.js`: navigation, evidence-reference interactions, theme choice, local enquiry events, and cinematic motion.
- `content/about.json` and `src/about.js`: owner-approved profile, capabilities, sectors, methods, and institutions for the expanded About page.
- `assets/`: self-hosted photographs, portrait, variable fonts and licenses, GSAP, ScrollTrigger, and legacy artwork.
- `dist/`: generated site output, included for immediate review and deployment.
- `server.mjs` and `verify.mjs`: local preview server and route, asset, accessibility and cinematic-motion checks.
- `pod/`: evidence, asset, dependency, deployment and handoff notes.
- `vercel.json`: Vercel static deployment settings.

## Cinematic motion and accessibility

The homepage film pins during the scroll sequence. One persistent set of 48 fragments moves through six 3D arrangements; scene captions and supporting documentary/data exhibits crossfade, a scene rail navigates the sequence, and the hero portrait has its own independent camera drift. GSAP and ScrollTrigger are bundled locally. Motion preference and viewport changes tear down or rebuild the animated tier. Reduced-motion, small-screen and script-unavailable users receive all six captions, local evidence exhibits, and diagrams in a static reading layout with ordinary page scrolling. Only the current animated caption is exposed to assistive technology.

The visual system uses local variable WOFF2 fonts: Anēk Latin and Anēk Bangla for display/UI, Newsreader for editorial reading, and Martian Mono for figures and evidence references. It supports day-table and night-desk palettes and keeps visible focus states and non-colour evidence labels.

## Institutional buyer readiness

The site now includes a procurement and vendor-information route with four buyer personas, a checklist for procurement enquiries and explicit disclosure that roster status must be confirmed per opportunity. A separate quality and risk route describes engagement-level review steps, confidentiality boundaries, conflict handling and scope limits without claiming accreditation or independent audit. The homepage links buyers directly to both routes.

## Measurement boundary

The browser emits local `site:measurement` events for enquiry calls to action, prepared briefs and email/WhatsApp handoffs. These events do not include form content and are not transmitted or stored. No GA4, Search Console integration, CRM, cookie banner or nurture service is active. See `MEASUREMENT-PLAN.md` before connecting any analytics or follow-up provider.

## Editing content

Edit `content/portfolio.json` for assignment records and `content/about.json` for the public profile, capabilities, sectors, methods, and institutional experience. Update the relevant templates, styles or scripts, then run `npm run build` and `npm run check`. `prepare-fonts.mjs` is optional maintenance tooling; it is not needed to install, build, run or deploy the site.

## Environment

No environment variable is required. Optional build-time `SITE_ORIGIN` sets canonical, sitemap and structured-data URLs for a deployment domain. `.env.example` documents the value; there is no dotenv dependency and `.env` is not loaded automatically.

## Deploy

For Vercel, import the repository and use the included configuration: build command `npm run build`, output directory `dist`. For another static host, build and publish `dist/`. Set `SITE_ORIGIN` before the build when the deployed canonical domain differs from the default site URL.

The optional `.openai/hosting.json` is preserved as original hosting metadata; the standalone website does not read or require it. The guarded `document.modelContext` helper is an optional host integration; the visitor-operated enquiry flow works without it.

## Services and limitations

The project has no backend, database, active analytics, CRM, email automation, payment or upload service. The enquiry form prepares a message for the visitor to review and hand off; it does not send or store a lead. The original hosted edition may have account-level access restrictions; this export runs independently on local Node or a conventional static host.

See `PORTABILITY.md`, `EXPORT_MANIFEST.md` and `RELEASE-AUDIT.md` for portability details, archive inventory and clean-extraction results.
