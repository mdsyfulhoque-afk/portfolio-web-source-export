# Release audit

Historical archive target: website-source-export.zip, assembled on 2026-09-28 from the editable website baseline. The release-gate table below records that archive only; current-branch checks are recorded separately.

## Release gates

| Gate | Result | Evidence |
|---|---|---|
| Current project is the source of truth | PASS | Archive was built from the current project source, content, styles, scripts, assets, configuration, documentation and generated site. No files were taken from the prior export. |
| Editable source and generated site included | PASS | The package contains 104 project files before dependency installation, including the build generator, editable content, CSS/JS, local assets, site output and handoff documentation. Packaging excludes archives, staging folders, `.git`, `.env` and `node_modules`. |
| Dependency manifest and lockfile | PASS | `package.json` and npm lockfile v3 match. The application has no third-party npm dependencies; GSAP and ScrollTrigger are included as local browser assets. |
| Clean dependency installation | PASS | `npm ci` completed in the clean archive extraction with Node.js 24.16.0 and npm 11.16.0. npm reported 0 vulnerabilities; the application dependency tree is empty. |
| Build and project checks | PASS | `npm run build` generated 46 sitemap routes plus the 404 document. `npm run check` passed, reporting 47 HTML documents, 1,433 resolved internal links and 142 resolved local asset references. JavaScript syntax checks also passed for the build, site, server and verification scripts. |
| Cinematic motion and fallback | PASS | Checks confirm 48 persistent fragments, six 3D arrangements, GSAP/ScrollTrigger pin-and-scrub, crossfading captions, a navigable scene rail and independent hero drift. Motion preference and viewport changes tear down or rebuild animation; reduced-motion, compact-viewport and no-JavaScript presentations remain available. |
| Buyer and risk routes | PASS | Procurement/vendor information includes four buyer personas, an opportunity-specific registration disclosure and a preselected enquiry path. The quality-and-risk page defines five review stages and states confidentiality, conflict, safeguards and evidence-claim boundaries. |
| Route, asset and content integrity | PASS | The project checker validates route and anchor closure, local assets, metadata, landmarks, placeholders, selected unsupported-claim phrases, enquiry form fail-closed behavior and hosting configuration. The hero image is 65,752 bytes; generated public output is 838,518 bytes. |
| Clean-extraction local runtime | PASS | The preview server returned HTTP 200 for the homepage, procurement, quality-and-risk, preselected enquiry, sitemap, site CSS/JS and local GSAP/ScrollTrigger files. Content checks confirmed the buyer disclosures and enquiry route. |
| Personal-machine paths | PASS | Scanned 88 source and generated text files (excluding installed dependencies); no user-home, workspace, temporary or machine-specific path references were found. |
| External runtime assets and host-only requirements | PASS | No external runtime scripts, stylesheets, images, CSS URLs or imported modules are required. The canonical production URL remains metadata. `.openai/hosting.json` is inert source-host metadata; the guarded `document.modelContext` helper is optional, and standalone rendering and enquiry preparation do not require it. |
| Secrets and packaging exclusions | PASS | `.env.example` is included; `.env`, credentials, `node_modules`, `.git`, previous exports and temporary packaging folders are excluded. No secret is required to build or run the site. |

## Known limitations

- Procurement roster IDs, registrations, prequalification, insurance and compliance-document status are not asserted. Confirm each item against the specific opportunity before sharing it.
- There is no backend, upload or lead-storage service, CRM, nurture email, analytics collector, GA4 tag or Search Console verification. The enquiry form prepares a visitor-reviewed handoff; browser measurement events are local, contain no enquiry text and are not transmitted or stored.
- This package does not establish WCAG 2.2 AA conformance. Project checks and browser spot checks are not an independent accessibility audit; full keyboard, zoom/reflow and assistive-technology testing remains to be completed.
- No production Core Web Vitals, GPU frame-rate or conversion-lift measurements are claimed. Test on representative devices and establish analytics only after the privacy and consent requirements are decided.
- Terms of service, legal review of the privacy notice and final procurement contact details remain to be confirmed before public institutional rollout.
- Product pilot labels remain explicit. Toolkit licensing rights, offer availability, scope and fees require confirmation before a commercial commitment.

## Disposition

Portable editable static-site export. The fresh archive extraction passed dependency installation, build, project checks, local route and asset serving, and portability scans. The generated `dist/` directory is ready for a static host; the repository remains editable and rebuildable with Node.js.

## Current branch verification

- Branch: sunset-immersive-portfolio; built from the editable source repository.
- Updated source and documentation: build.mjs, server.mjs, src/site.css, verify.mjs, README, portability and audit notes, and assets/syful-hoque-portrait.jpg.
- The branch build and project checker pass after generating all 46 routes; 47 HTML documents, 1,433 internal links and local asset references are checked.
- The check explicitly validates the local portrait and the no-motion layout that exposes every film caption and diagram.
- A fresh archive-extraction audit is pending; this document does not claim that the prior ZIP contains the branch revision.
