# Release audit

## Revision under review

- Branch: `sunset-immersive-portfolio` (isolated from the Claude-built site).
- Source of truth: this editable repository at the current branch revision.
- Scope: the supplied portfolio archive's Evidence System visual direction, expanded profile/capabilities, local portrait and documentary assets, six-scene pinned GSAP film, and current buyer-readiness pages.
- Existing `website-source-export.zip` files are earlier baselines. This audit does not claim they contain the current branch revision.

## Checks

| Gate | Result | Evidence |
|---|---|---|
| Editable source | PASS | `build.mjs`, `src/`, `content/`, local assets, configuration and generated `dist/` included in the repository. |
| Dependency lock | PASS | `package.json` and npm lockfile v3; no third-party npm dependencies. |
| Build | PASS | `npm run build` generated 52 routes and a 404 page. |
| Project verification | PASS | `npm run check`: 53 HTML documents, 1,937 internal links and 169 local asset references. Checks include route/anchor closure, accessibility structure, six capability routes, buyer-first homepage message, local fonts, evidence assets and due-diligence claim boundaries. |
| GSAP/ScrollTrigger film | PASS | 48 fragments, six 3D arrangements, pinned scrub timeline, changing camera, caption and exhibit crossfades, and independent portrait drift are present in the generated page and local script. |
| Motion fallback | PASS | Reduced-motion, narrow viewport and no-script layouts retain every scene caption and static local exhibit. Runtime preference changes tear down/rebuild the animated mode. |
| Local assets | PASS | Fonts, font licenses, photographs, portrait, GSAP and ScrollTrigger are local. The primary hero image is within the 2 MB check budget. |
| Data integrity | PASS | Public pages retain source qualifications; capability/sector taxonomy is separate; pilot offers remain labelled; procurement and risk routes avoid unverified registration/accreditation claims. |
| External runtime dependency | PASS | No required external runtime assets or API connections; optional host-specific metadata/helper is guarded and documented. |
| Secrets | PASS | No secret is required. `.env.example` contains only an optional site-origin placeholder. |
| Production deployment | PASS | Vercel deployment `dpl_CDHmaUfapDQnWuwgwR2B9QNUBhtY` is `READY` and aliased to `https://syful-hoque-evidence-systems.vercel.app/`. All 52 sitemap routes returned HTTP 200; homepage, About, capability page, site script and hero image also returned HTTP 200. A nonexistent path returned HTTP 404. |

## Not represented as verified

- Browser screenshot, interactive keyboard/assistive-technology audit, representative-device frame-rate test, and production Core Web Vitals were not completed in this check. A browser-control connection was unavailable during this pass.
- This project check is not WCAG 2.2 AA certification.
- No GA4, Search Console, CRM, nurture, lead storage, or server-side enquiry service is connected. Local browser measurement events are not sent or stored.
- Procurement IDs, roster status, insurance and compliance records must be confirmed for each actual opportunity.
- Toolkit licensing rights and pilot commercial terms require confirmation before an offer is made.
- Clean ZIP extraction and `npm ci` are separate release gates if a fresh archive is requested; the earlier ZIP is not treated as the current revision.

## Current disposition

The current source branch builds and passes its project checks, is pushed to GitHub, and is deployed to the requested Vercel production project. The Claude-built site remains on its original branch. The previous source ZIP remains unchanged and is not this revision's handoff artifact.
