# Measurement plan — implementation boundary

## Current state

The website has no GA4 tag, Search Console verification, cookie banner, CRM, newsletter or analytics endpoint. The code dispatches browser-only `site:measurement` events. They exist as an integration seam for a future, privacy-reviewed collector; no listener sends them, and the browser does not persist them.

Events currently emitted:

| Event | When | Allowed fields |
|---|---|---|
| `enquiry_cta_click` | A link opens the enquiry route | Current page path, selected service label or `general` |
| `enquiry_prepared` | A valid brief is prepared for review | Current page path, selected service label |
| `enquiry_handoff` | The visitor opens the prepared email or WhatsApp draft | Current page path, `email` or `whatsapp` channel |

Do not add visitor-entered names, email addresses, organisation names, budget, brief text, tender references or the generated `mailto:` / WhatsApp URL to analytics events. Those handoff URLs contain the draft content.

## KPI set and review cadence

| KPI | Source after setup | Review |
|---|---|---|
| Search impressions, clicks and positions by commercial-intent cluster | Search Console | Monthly |
| Buyer-route visits and enquiry CTA progression | Consent-appropriate GA4 or a privacy-reviewed equivalent | Monthly |
| Prepared briefs and handoff clicks, reported only in aggregate | Approved analytics collector; never record draft contents | Monthly |
| Qualified inbound enquiries, EOIs and roster invitations | Private manual opportunity log | Monthly |
| Core Web Vitals and route performance | Search Console field data plus documented lab runs | Monthly; after material releases |
| Message clarity and buyer objections | 3–5 friendly-client conversations | Quarterly |

Keep the Search Console clusters aligned to the existing commercial-intent keyword plan. Record baseline date, query group, page, device and market. Do not invent search-volume estimates or equate impressions with demand.

## Activation gate

Before connecting GA4 or another external collector, decide the lawful basis and consent behavior for the target jurisdictions, update the privacy notice, provide any required cookie controls, document retention and access, and configure a real property ID outside source control. Search Console needs its own domain verification. No tracking IDs, account credentials or third-party script are included in this package.

The current local event dispatch is not a measurement system by itself. It will not produce reports until an approved collector is explicitly connected and tested.

## Attribution and nurture

Use lowercase UTMs with a consistent pattern, for example `utm_source=linkedin`, `utm_medium=organic`, `utm_campaign=capability_brief`, and optional `utm_content=founder_post`. Never place a person's name, email, organisation, bid title or confidential tender identifier in a URL.

There is no mailing list or follow-up automation. Add nurture only with explicit opt-in, a documented purpose, a working unsubscribe path, an owner, and a service that meets the privacy and retention requirements. The present enquiry form creates a visitor-reviewed handoff; it does not enroll anyone.

## Editorial cadence

A useful target is one sourced flagship brief and two shorter commentaries per month, but publish only when an identified author and reviewer can support it. Track author, review date, evidence sources, related service, target query cluster and next review date. Mark practical guides as methods content; do not imply they are independent client results.
