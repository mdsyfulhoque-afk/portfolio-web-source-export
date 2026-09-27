# Deployment and recovery

## Branch boundary

The portfolio redesign is on `sunset-immersive-portfolio`, an independent branch of `portfolio-web-source-export`. The Claude-built site remains on its existing branch. Review and deploy this branch without merging into or replacing that original branch.

## Vercel

The repository is linked locally to the Vercel project `syful-hoque-evidence-systems`; `vercel.json` builds the static `dist/` output. Before production promotion, run `npm ci`, `npm run build` and `npm run check`. Use the authenticated Vercel CLI or the connected Git deployment for this repository and verify the final production URL and deployment status afterward. `.vercel/` project state is local/ignored; no Vercel credential belongs in the repository.

For a static host, build and publish `dist/`, support directory index files and configure `404.html` as the not-found document. Apply the security and caching headers in `dist/_headers` where the host supports that format. Set `SITE_ORIGIN` at build time if canonical URLs should use another production origin.

## Rollback

Use the Vercel deployment history to restore a known-good deployment. To rebuild source, check out the desired branch or commit, run `npm ci`, `npm run build`, and `npm run check`. Local images, fonts and animation scripts make the site independent of remote asset providers.

## Before a public campaign

Confirm public audience, domain, business contact ownership, current service commitments and product terms. Reconcile any source dates requiring exact precision. Complete keyboard, zoom/reflow and screen-reader checks plus representative-device performance review before major paid acquisition. Analytics, consent, CRM, nurture and payment infrastructure are not included in this codebase.
