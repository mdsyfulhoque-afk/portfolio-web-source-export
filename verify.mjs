import {readFile,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist'),errors=[];
async function walk(dir){let all=[];for(const entry of await readdir(dir,{withFileTypes:true})){const full=path.join(dir,entry.name);if(entry.isDirectory())all.push(...await walk(full));else all.push(full);}return all;}
const files=await walk(root),htmlFiles=files.filter(f=>f.endsWith('.html'));
const textByFile=new Map(await Promise.all(htmlFiles.map(async f=>[f,await readFile(f,'utf8')])));
let links=0,assets=0;
for(const [file,html] of textByFile){const label=path.relative(root,file);if((html.match(/<h1(?:\s|>)/g)||[]).length!==1)errors.push(label+': must have one h1');if(!html.includes('<main id="main">'))errors.push(label+': main landmark missing');if(!/<title>[^<]+<\/title>/.test(html))errors.push(label+': title missing');if(!/name="description" content="[^\"]+"/.test(html))errors.push(label+': description missing');if(/\[(CONTENT|ASSET|EVIDENCE|PRICING) REQUIRED/.test(html))errors.push(label+': unresolved placeholder');if(/first-of-its-kind|Single-handedly|Most chosen/.test(html))errors.push(label+': unsupported claim');
 const ids=Array.from(html.matchAll(/\bid="([^\"]+)"/g),m=>m[1]);if(new Set(ids).size!==ids.length)errors.push(label+': duplicate ids');
 for(const m of html.matchAll(/\b(href|src)="([^\"]+)"/g)){const url=m[2].replaceAll('&amp;','&');if(!url.startsWith('/')&&!url.startsWith('#'))continue;const u=new URL(url,'https://local.test/'+path.relative(root,file).replaceAll('\\','/'));let dest=path.join(root,decodeURIComponent(u.pathname));try{if((await stat(dest)).isDirectory())dest=path.join(dest,'index.html');await stat(dest);if(m[1]==='href')links++;else assets++;if(u.hash){const body=textByFile.get(dest)||await readFile(dest,'utf8');if(!body.includes('id="'+u.hash.slice(1)+'"'))errors.push(label+': missing anchor '+url);}}catch{errors.push(label+': unresolved '+url);}}
}
const css=(await Promise.all(['site.css','design-tokens.css','evidence-system.css'].map(name=>readFile(path.join(root,'assets',name),'utf8')))).join('\n');
const js=await readFile('dist/assets/site.js','utf8');
for(const m of css.matchAll(/url\(['"]?(\/[^)'" ]+)/g)){try{await stat(path.join(root,m[1]));}catch{errors.push('CSS: missing '+m[1]);}}
const home=textByFile.get(path.join(root,'index.html'));
if((home.match(/data-fragment=/g)||[]).length!==48)errors.push('Film must have 48 persistent fragments');
if(!home.includes('src="/assets/portrait-cutout.webp"')||!home.includes('alt="Portrait of Mohammad Syful Hoque"'))errors.push('Owner portrait must be bundled and described in the hero');
const primaryPortrait=await stat('dist/assets/portrait-cutout.webp');if(primaryPortrait.size>2000000)errors.push('Primary hero portrait exceeds 2 MB budget');
if(!home.includes('I help multilateral teams, public institutions, donors and consulting partners')||!home.includes('<strong>Commissionable work:</strong>'))errors.push('Homepage must identify the practitioner, buyer audience and commissioned outputs before the philosophy line');
for(const name of ['anek-latin-wdth.woff2','anek-bangla-bengali-wdth.woff2','newsreader-opsz.woff2','newsreader-opsz-italic.woff2','martian-mono-wdth.woff2'])try{await stat(path.join(root,'assets',name));}catch{errors.push('Missing self-hosted font: '+name);}
if((home.match(/data-scene="/g)||[]).length!==6)errors.push('Film must have six DOM captions');
if(!css.includes('.film:not(.is-enhanced) .film-caption{position:relative')||!css.includes('.film:not(.is-enhanced) .film-visual,.film:not(.is-enhanced) .film-rail{display:none!important}')||!css.includes('prefers-reduced-motion:reduce'))errors.push('Static/reduced-motion fallback missing');
if(!js.includes("pin:$('.film-sticky',film),pinSpacing:false")||!js.includes("trigger:film")||!js.includes('scrub:1.15'))errors.push('GSAP film pin/scrub choreography missing');
if((home.match(/data-scene-for=/g)||[]).length!==6||!js.includes('outgoing=media')||!js.includes('incoming=media'))errors.push('Six local exhibits must crossfade with the pinned film scenes');
if(!js.includes("film.classList.add('is-enhanced','gsap-enhanced')"))errors.push('GSAP film must bypass static presentation styles');
if(!js.includes('Math.min(1,(index+.08)/tl.duration())'))errors.push('GSAP scene rail must navigate across the complete timeline');
if(js.includes('gsap.set(node,pose(0,i))')||!js.includes('rotateX:p.rX')||!js.includes('rotateY:p.rY'))errors.push('Fragment rotations must be applied as valid 3D transform properties');
if(!js.includes('!reduced.matches')||!js.includes("'(max-width: 599px)'"))errors.push('Reduced-motion and small-screen preferences must bypass GSAP motion');
if(!js.includes("query.addEventListener('change',resync)")||!js.includes('teardownMode()')||!js.includes('context?.revert()'))errors.push('Motion preference changes must tear down and rebuild animations');
if(!js.includes('rotateY:-6')||!js.includes('trigger:hero')||!js.includes('scrub:1.1'))errors.push('Bounded independent hero camera drift missing');
if(!js.includes("caption.setAttribute('aria-hidden',String(!active))")||!js.includes('live.textContent=`Scene ${index+1} of ${captions.length}: ${label}.`'))errors.push('Animated captions need a single accessible active state and scene announcement');
if(!js.includes("window.dispatchEvent(new CustomEvent('site:measurement'")||!js.includes("measureSiteEvent('enquiry_prepared'")||js.includes("fetch('https://"))errors.push('Privacy-safe local conversion event hook missing or external transmission added');
const procurement=textByFile.get(path.join(root,'procurement','index.html'));
const qa=textByFile.get(path.join(root,'quality-assurance','index.html'));
if(!procurement||!procurement.includes('does not imply active registration')||!procurement.toLowerCase().includes('procurement / vendor management'))errors.push('Procurement page and buyer-persona matrix missing');
if(!procurement?.includes('href="/work-with-me/?service=Procurement%20%26%20Vendor%20Information"'))errors.push('Procurement persona CTA must open the preselected vendor-information enquiry');
if(!qa||!qa.includes('not a claim of independent audit, certification or donor approval')||!qa.includes('CONFLICTS & ROLE CLARITY'))errors.push('Quality and risk boundaries missing');
if((home.match(/href="\/procurement\/"/g)||[]).length<1||(home.match(/href="\/quality-assurance\/"/g)||[]).length<1)errors.push('Homepage institutional-buyer pathways missing');
if((home.match(/aria-hidden="false"/g)||[]).length<6||!home.includes('aria-live="polite"'))errors.push('Static captions and film status must remain accessible');
if(htmlFiles.length!==53)errors.push('Expected 53 HTML documents, including 52 routes and the 404 page');
const sitemap=await readFile('dist/sitemap.xml','utf8');if((sitemap.match(/<loc>/g)||[]).length!==htmlFiles.length-1)errors.push('Sitemap must contain every generated route and exclude the 404 document');
const capabilityIndex=textByFile.get(path.join(root,'expertise','index.html'));if(!capabilityIndex||!capabilityIndex.includes('Stakeholder convening and technical dialogue'))errors.push('Six commissionable capability families missing from the index');
for(const route of ['economic-appraisal','investment-financing','policy-advocacy','programme-delivery','research-evaluation','convening-dialogue'])if(!textByFile.has(path.join(root,'expertise',route,'index.html')))errors.push('Missing commissionable capability route: '+route);
if((home.match(/data-evidence-ref=/g)||[]).length<9||!home.includes('not claims of money managed or outcomes caused'))errors.push('Homepage evidence references or due-diligence scope note missing');
const contact=textByFile.get(path.join(root,'work-with-me','index.html'));
if(!contact.includes('id="prepare-brief" disabled')||!contact.includes('class="brief-form" inert'))errors.push('Form must fail closed before JS initializes');
if(!contact.includes('<noscript>'))errors.push('No-JS contact route missing');
const manifest=JSON.parse(await readFile('.openai/hosting.json','utf8'));if(!manifest.project_id||manifest.static.directory!=='dist')errors.push('Invalid Sites manifest');
const legacyArtwork=await stat('dist/assets/evidence-sculpture.webp');if(legacyArtwork.size>350000)errors.push('Retained legacy artwork exceeds budget');
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(JSON.stringify({passed:true,pages:htmlFiles.length,internal_links:links,asset_references:assets,hero_bytes:primaryPortrait.size,total_public_bytes:(await Promise.all(files.map(async f=>(await stat(f)).size))).reduce((a,b)=>a+b,0),checks:['routes and anchors','asset closure','metadata and landmarks','buyer-first homepage message order','self-hosted font set','six capability detail routes','48-node/6-caption GSAP pin/scrub film','3D fragment transforms','crossfading captions and evidence exhibits','accessible caption state','live reduced-motion/viewport preference teardown','independent hero camera drift','procurement persona and disclosure routes','quality and risk boundary page','local privacy-safe conversion events','static and reduced-motion fallback','fail-closed enquiry form','unsupported claims and placeholders','hosting manifest']},null,2));
