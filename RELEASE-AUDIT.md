# Release audit

## Release identity

- Export: `website-source-export.zip`
- Date: 2026-10-05
- Source: `sunset-immersive-portfolio`, revision `b505cae`
- Project: Syful Hoque Evidence System portfolio; portable editable static-site package.
- Previous ZIP diagnosis: the file dated 2026-09-17 was stale and began archive paths with `./`. PowerShell could extract it, but Windows Explorer rejected it. This release uses normalized relative paths and is tested with both .NET ZIP APIs and Windows `Expand-Archive`.

## Release checks

| Gate | Result | Evidence |
|---|---|---|
| Current source | PASS | Packaged from the pushed current branch, not the older ZIP. Includes build generator, content, styles/scripts, local assets/licenses, config, docs, and generated site. |
| Archive compatibility | PASS | ZIP central directory opens; archive listing and extraction pass; no leading `./` components in entry paths. |
| Secrets and exclusions | PASS | `.env.example` included; `.env`, keys, `.git`, `.vercel`, `node_modules`, prior exports and temporary QA/staging files excluded. |
| Dependency lock | PASS | `package.json` and lockfile v3 included; there are no third-party npm dependencies. |
| Clean extraction and install | PASS | Extracted to a new folder; `npm ci` completed with 0 vulnerabilities. |
| Build and project checks | PASS | `npm run build` generated 52 routes and 53 HTML files including 404. `npm run check` passed with 1,937 internal links and 169 local asset references. |
| Local runtime | PASS | Preview server served the homepage and sampled routes/assets successfully from the clean extraction. |
| Path and asset closure | PASS | Local HTML links/anchors, CSS asset paths, page metadata, image/font/script references and six capability routes resolve. |
| Personal-machine paths | PASS | Scanned included text files for the source workstation, user profile and temporary paths; none are runtime references. |
| ChatGPT-only dependency | PASS | No ChatGPT-only runtime is required. `.openai/hosting.json` is optional inert metadata and the optional model-context hook is guarded. |
| Cinematic motion/accessibility structure | PASS | Checks confirm 48 fragments, six arrangements, pinned scrub timeline, crossfading captions/evidence exhibits, independent hero drift and reduced-motion/static fallback. |
| Production deployment | PASS | Vercel deployment `dpl_CDHmaUfapDQnWuwgwR2B9QNUBhtY` is `READY`; all 52 sitemap routes returned HTTP 200. |

## Known limits

- Browser screenshot and keyboard/assistive-technology interaction audit were unavailable in the last pass; passing static checks do not certify WCAG 2.2 AA.
- No production Core Web Vitals, representative-device GPU frame rate or conversion lift is claimed.
- No GA4, Search Console, CRM, lead storage, nurture email, backend submission or payment service is connected.
- Procurement registrations, insurance and compliance documents must be verified for each opportunity. Toolkit licensing rights and pilot commercial terms need confirmation.

## Disposition

Portable source ZIP validated after clean extraction and ready for GitHub, local development or static hosting. Production site: [https://syful-hoque-evidence-systems.vercel.app/](https://syful-hoque-evidence-systems.vercel.app/).
