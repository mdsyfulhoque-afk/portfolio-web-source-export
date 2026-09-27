const list = (items, className) => `<ul class="${className}">${items.map(item => `<li>${item}</li>`).join("")}</ul>`;

export function renderAboutPage({person, profile, e, link, kicker, cta, indexIntro}) {
  const metrics = profile.metrics.map((item, index) => `
    <article class="about-metric sh-selectable" tabindex="0" data-evidence-ref="A${index + 1}" data-evidence-formula="${e(item.source)}">
      <span class="mono">A${index + 1} / PROFILE</span>
      <strong class="figure-xl">${e(item.value)}<small>${e(item.unit)}</small></strong>
      <h3>${e(item.label)}</h3><p>${e(item.detail)}</p>
    </article>`).join("");
  const phases = profile.worldBank.phases.map((item, index) => `<li><span class="mono">0${index + 1}</span><span>${e(item)}</span></li>`).join("");
  const capabilities = profile.capabilityFamilies.map((item, index) => `
    <article class="about-capability sh-selectable">
      <span class="mono">F${index + 1} / COMMISSIONABLE CAPABILITY</span>
      <h3>${e(item.title)}</h3><p>${e(item.summary)}</p>
      ${list(item.points.map(e), "about-detail-list")}
      ${link(item.href, e(item.action || "Explore this capability"), "text-link")}
    </article>`).join("");
  const sectors = profile.sectors.map((item, index) => `
    <article class="about-sector">
      <span class="mono">S${index + 1} / SECTOR CONTEXT</span>
      <h3>${e(item.title)}</h3><p>${e(item.summary)}</p>
    </article>`).join("");
  const methods = profile.researchMethods.map(item => `<li>${e(item)}</li>`).join("");
  const organisations = profile.organisationGroups.map((group, index) => `
    <article class="about-organisation-group">
      <span class="mono">O${index + 1} / SELECTED RELATIONSHIPS</span>
      <h3>${e(group.title)}</h3>${list(group.names.map(e), "about-organisation-list")}
    </article>`).join("");
  const education = person.education.map((item, index) => `
    <article class="education-entry">
      <span class="mono">EDU 0${index + 1}</span><div><h3>${e(item.degree)}</h3><p>${e(item.institution)} · ${e(item.year)}</p></div>
    </article>`).join("");
  const credentials = list(person.certifications.map(e), "credential-list");

  return [
    indexIntro("ABOUT MOHAMMAD SYFUL HOQUE", "Development economist.<br><em>Evidence to delivery.</em>", "Costing, feasibility, research and programme leadership for multilateral teams, public institutions, donors and consulting partners."),
    `<section class="about-opening wrap">
      <div class="about-opening-copy">
        ${kicker("THE ECONOMICS BEHIND THE YES / DHAKA, BANGLADESH")}
        <h2>Work that carries<br><em>from evidence to action.</em></h2>
        <p class="lead">${e(profile.intro)}</p><p>${e(profile.scope)}</p>
        <div class="about-opening-actions">${link("/work/", "Inspect selected assignments", "text-link")}${link("/work-with-me/", "Discuss an engagement", "button")}</div>
      </div>
      <figure class="about-portrait film-print">
        <img src="/assets/portrait-cutout.webp" width="2822" height="2400" alt="Portrait of Mohammad Syful Hoque in a checked blazer" loading="lazy" decoding="async">
        <figcaption><span class="mono">PORTRAIT / DHAKA, BANGLADESH</span><span>Mohammad Syful Hoque</span></figcaption>
        <div class="nameplate"><span class="nameplate-name">MOHAMMAD SYFUL HOQUE<span class="decision-dot" aria-hidden="true"></span></span><span class="mono">DEVELOPMENT ECONOMIST · COSTING & FINANCING</span></div>
      </figure>
      <div class="about-metrics">${metrics}</div>
      <p class="about-claims-note">${e(profile.claimsNote)}</p>
    </section>`,
    `<section class="about-worldbank section" aria-labelledby="about-worldbank-title">
      <div class="wrap"><div class="section-head"><p class="eyebrow">WORLD BANK SOUTH ASIA / RESEARCH DELIVERY</p><div><h2 id="about-worldbank-title">From study design<br><em>to dissemination.</em></h2><p class="section-intro">${e(profile.worldBank.summary)}</p></div></div>
        <div class="about-worldbank-detail"><div><p>${e(profile.worldBank.delivery)}</p><p>${e(profile.worldBank.leadership)}</p></div><ol class="about-delivery-steps">${phases}</ol></div>
      </div>
    </section>`,
    `<section class="section wrap about-capabilities" id="about-capabilities" aria-labelledby="about-capabilities-title">
      <div class="section-top"><div>${kicker("CAPABILITY MAP / COMMISSIONABLE WORK")}<h2 id="about-capabilities-title">Six ways to move<br><em>from question to action.</em></h2></div><p class="section-aside">Capabilities describe work that can be commissioned. Sector coverage below shows where the work has been applied.</p></div>
      <div class="about-capability-grid">${capabilities}</div>
    </section>`,
    `<section class="section wrap about-sector-section" id="sector-coverage" aria-labelledby="about-sector-title">
      <div class="section-top"><div>${kicker("SECTOR COVERAGE / WHERE I HAVE WORKED")}<h2 id="about-sector-title">Different contexts.<br><em>A connected method.</em></h2></div><p class="section-aside">Sector coverage is kept separate from the capability map: these are the markets, institutions and public-policy settings encountered across assignments.</p></div>
      <div class="about-sector-grid">${sectors}</div>
    </section>`,
    `<section class="about-methods" aria-labelledby="about-methods-title"><div class="wrap about-methods-grid"><div>${kicker("RESEARCH METHODS & TOOLS")}<h2 id="about-methods-title">Field systems.<br><em>Analytical depth.</em></h2><p>Survey operations, mixed-methods research and quantitative analysis support the wider economic and policy work.</p></div><ul class="about-method-list">${methods}</ul></div></section>`,
    `<section class="section wrap about-organisations" id="selected-organisations" aria-labelledby="about-organisations-title">
      <div class="section-top"><div>${kicker("SELECTED CLIENTS, PARTNERS & COLLABORATORS")}<h2 id="about-organisations-title">Work across<br><em>institutions and markets.</em></h2></div><p class="section-aside">${e(profile.organisationNote)}</p></div>
      <div class="about-organisation-grid">${organisations}</div>
    </section>`,
    `<section class="section wrap about-credentials" aria-labelledby="about-credentials-title">
      <div class="about-credentials-head">${kicker("EDUCATION & CONTINUING LEARNING")}<h2 id="about-credentials-title">Economics as a<br><em>working discipline.</em></h2></div>
      <div class="about-credentials-body"><div class="education-list">${education}</div><div><h3>Continuing professional learning.</h3><details class="credentials-details"><summary>View certificates and specialist learning</summary>${credentials}</details>
        <div class="profile-download"><h3>A concise professional profile.</h3><p>Education, selected assignments and engagement details.</p><a class="text-link" href="/assets/syful-hoque-profile.txt" download>Download the profile <span class="mono">TXT / ↓</span></a></div>
      </div></div>
    </section>`,
    cta("Bring the difficult question.", "An investment to assess. A programme to cost. A system to make work.")
  ].join("");
}
