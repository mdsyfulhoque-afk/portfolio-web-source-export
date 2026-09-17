# Portability

This repository runs independently of ChatGPT Sites. It is a static Node.js website with no runtime database, API, CMS, analytics, authentication, upload service or secret requirement.

## Run locally

Requirements: Node.js 22 or newer. The project has no third-party npm dependencies, so `npm install` is optional.

```sh
npm run build
npm run check
npm run start
```

Open `http://127.0.0.1:4173/`.

To change canonical URLs for another deployment, set `SITE_ORIGIN` before building. The value is used only for canonical links, sitemap URLs and structured data.

## Deploy to Vercel

Import the repository, keep the detected Node project settings, and deploy. `vercel.json` sets `npm run build` and `dist` as the output directory. No environment variable is required for the page to render; set `SITE_ORIGIN` to the deployed domain before a production build when canonical metadata should use that domain.

## What is platform-specific

`.openai/hosting.json` is retained as historical Sites metadata. It is not read by the website runtime and is not required by Vercel, Netlify or the local server. The original private Sites URL is retained as the default canonical origin until `SITE_ORIGIN` is overridden.

The project-brief form prepares text for the visitor to review and hand off through email or WhatsApp. It does not send data to a hidden ChatGPT service.

## What is not present

There is no exported backend, database, private API, payment flow, CRM, email automation or analytics account because none was configured in the original site. Those services can be added later without changing the static page build.
