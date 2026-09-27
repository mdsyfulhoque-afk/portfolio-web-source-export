const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
function measureSiteEvent(name,fields={}){window.dispatchEvent(new CustomEvent('site:measurement',{detail:{event:name,path:location.pathname,...fields}}));}

const themeToggle=$('[data-theme-toggle]');
const themePreference=matchMedia('(prefers-color-scheme: dark)');
function getTheme(){return document.documentElement.dataset.theme||(themePreference.matches?'dark':'light');}
function syncThemeControl(){if(!themeToggle)return;const dark=getTheme()==='dark';themeToggle.textContent=dark?'Day table':'Night desk';themeToggle.setAttribute('aria-label',`Switch to ${dark?'day table':'night desk'}`);themeToggle.setAttribute('aria-pressed',String(dark));}
try{const savedTheme=localStorage.getItem('syful-theme');if(savedTheme==='dark'||savedTheme==='light')document.documentElement.dataset.theme=savedTheme;}catch{/* Theme still works for this visit if storage is unavailable. */}
syncThemeControl();
themePreference.addEventListener('change',()=>{if(!document.documentElement.dataset.theme)syncThemeControl();});
themeToggle?.addEventListener('click',()=>{const next=getTheme()==='dark'?'light':'dark';document.documentElement.dataset.theme=next;try{localStorage.setItem('syful-theme',next);}catch{/* The selected theme remains applied for this visit. */}syncThemeControl();});
const formulaRef=$('[data-formula-ref]'),formulaValue=$('[data-formula-value]');
const defaultFormula={ref:formulaRef?.textContent||'A1',value:formulaValue?.textContent||'=Economics × Data stories × Technology × Research'};
let lastEvidenceRef='';
function showEvidenceFormula(element){const record=element?.closest('[data-evidence-ref][data-evidence-formula]');if(!record){if(document.activeElement?.closest?.('[data-evidence-ref][data-evidence-formula]'))return;lastEvidenceRef='';if(formulaRef)formulaRef.textContent=defaultFormula.ref;if(formulaValue)formulaValue.textContent=defaultFormula.value;return;}if(record.dataset.evidenceRef===lastEvidenceRef)return;lastEvidenceRef=record.dataset.evidenceRef;if(formulaRef)formulaRef.textContent=record.dataset.evidenceRef;if(formulaValue)formulaValue.textContent='='+record.dataset.evidenceFormula;}
document.addEventListener('pointerover',event=>{if(event.target.closest?.('[data-evidence-ref][data-evidence-formula]'))showEvidenceFormula(event.target);});
document.addEventListener('pointerout',event=>{const record=event.target.closest?.('[data-evidence-ref][data-evidence-formula]');if(record&&!record.contains(event.relatedTarget))showEvidenceFormula(null);});
document.addEventListener('focusin',event=>showEvidenceFormula(event.target));
document.addEventListener('focusout',event=>{if(!event.relatedTarget?.closest?.('[data-evidence-ref][data-evidence-formula]'))showEvidenceFormula(null);});
document.addEventListener('click',event=>{const anchor=event.target.closest('a');if(!anchor)return;if(anchor.matches('a[href^="/work-with-me/"]')){const service=new URL(anchor.href).searchParams.get('service')||'general';measureSiteEvent('enquiry_cta_click',{service});}if(anchor.id==='brief-email')measureSiteEvent('enquiry_handoff',{channel:'email'});if(anchor.id==='brief-whatsapp')measureSiteEvent('enquiry_handoff',{channel:'whatsapp'});});
const heroImage=$('.hero-image');
heroImage?.addEventListener('error',()=>{heroImage.hidden=true;heroImage.nextElementSibling.hidden=false;});
const menu=$('.menu-toggle'),mobileNav=$('#mobile-nav');
function closeMenu(){if(!menu)return;menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');mobileNav.hidden=true;document.body.classList.remove('menu-open');}
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');mobileNav.hidden=!open;document.body.classList.toggle('menu-open',open);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
document.addEventListener('focusin',event=>{if(menu?.getAttribute('aria-expanded')==='true'&&!$('.header').contains(event.target))closeMenu();});
window.addEventListener('resize',()=>{if(innerWidth>900)closeMenu();},{passive:true});
$$('.mobile-nav a').forEach(a=>a.addEventListener('click',closeMenu));

const filters=$$('.filter');
filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(b=>{const current=b===button;b.classList.toggle('active',current);b.setAttribute('aria-pressed',String(current));});const key=button.dataset.filter;let visible=0;$$('.filter-item').forEach(item=>{const show=key==='all'||item.dataset.practices.split(' ').includes(key);item.hidden=!show;if(show)visible++;});$('.results-count').textContent=`${visible} assignment${visible===1?'':'s'}`;const url=new URL(location.href);if(key==='all')url.searchParams.delete('practice');else url.searchParams.set('practice',key);history.replaceState({},'',url); }));
if(filters.length){const key=new URLSearchParams(location.search).get('practice');filters.find(b=>b.dataset.filter===key)?.click();}

const form=$('#brief-form');
if(form){const requested=new URLSearchParams(location.search).get('service');const service=$('select[name=service]',form);if(requested&&Array.from(service.options).some(o=>o.value===requested))service.value=requested;
 form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const values=new FormData(form);measureSiteEvent('enquiry_prepared',{service:String(values.get('service')||'')});const text=`PROJECT ENQUIRY — ${values.get('service')}\n\nName: ${values.get('name')}\nOrganisation: ${values.get('organisation')}\nEmail: ${values.get('email')}\nReaching out as: ${values.get('audience')}\nSupport: ${values.get('service')}\nTiming: ${values.get('timing')}\nBudget / procurement context: ${values.get('budget')||'To discuss'}\n\nTHE BRIEF\n${values.get('brief')}`;
  $('#brief-preview').textContent=text;$('#brief-email').href=`mailto:israhat@gmail.com?subject=${encodeURIComponent('Project enquiry: '+values.get('service'))}&body=${encodeURIComponent(text)}`;$('#brief-whatsapp').href=`https://wa.me/8801914011329?text=${encodeURIComponent(text)}`;$('#brief-result').hidden=false;$('#brief-feedback').textContent='';$('#brief-result').focus({preventScroll:true});$('#brief-result').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
 });
 $('#copy-brief').addEventListener('click',async()=>{const text=$('#brief-preview').textContent;try{await navigator.clipboard.writeText(text);$('#brief-feedback').textContent='Brief copied. Paste it into your preferred email or messaging app.';}catch{const range=document.createRange();range.selectNodeContents($('#brief-preview'));const selection=getSelection();selection.removeAllRanges();selection.addRange(range);$('#brief-feedback').textContent='Brief selected. Use Copy in your browser or press Ctrl+C / Command+C.';}});
 form.inert=false;$('#prepare-brief').disabled=false;
 // Optional agent entry point. It prepares the same visible draft and never sends it.
 if(document.modelContext?.registerTool){const lifecycle=new AbortController();const fields=['name','organisation','email','brief'];const serviceValues=Array.from(service.options,o=>o.value);const audienceValues=$$('input[name=audience]',form).map(i=>i.value);const timingValues=Array.from($('select[name=timing]',form).options,o=>o.value);
  try{Promise.resolve(document.modelContext.registerTool({name:'prepare_project_brief',title:'Prepare a project enquiry draft',description:'Fill and prepare a visible project enquiry for the visitor to review. Does not send email, send WhatsApp, store a lead or book an engagement.',inputSchema:{type:'object',properties:{name:{type:'string',minLength:1,maxLength:100},organisation:{type:'string',minLength:1,maxLength:160},email:{type:'string',format:'email',maxLength:200},brief:{type:'string',minLength:20,maxLength:5000},service:{type:'string',enum:serviceValues},audience:{type:'string',enum:audienceValues},timing:{type:'string',enum:timingValues},budget:{type:'string',maxLength:150}},required:fields,additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:true},execute(input){if(!input||typeof input!=='object'||Array.isArray(input))throw Error('Provide a project enquiry object.');const limits={name:100,organisation:160,email:200,brief:5000,budget:150};const allowed=[...fields,'service','audience','timing','budget'];if(Object.keys(input).some(k=>!allowed.includes(k)))throw Error('Unrecognised enquiry field.');for(const k of fields)if(typeof input[k]!=='string'||!input[k].trim()||input[k].length>limits[k])throw Error('Invalid '+k);if(input.brief.length<20||!/^\S+@\S+\.\S+$/.test(input.email))throw Error('Provide a valid email and a brief of at least 20 characters.');for(const [key,values]of [['service',serviceValues],['audience',audienceValues],['timing',timingValues]])if(input[key]!==undefined&&!values.includes(input[key]))throw Error('Invalid '+key);if(input.budget!==undefined&&(typeof input.budget!=='string'||input.budget.length>150))throw Error('Invalid budget context.');for(const key of [...fields,'budget'])$(`[name="${key}"]`,form).value=input[key]||'';service.value=input.service||serviceValues[0];$('select[name=timing]',form).value=input.timing||timingValues[0];$$('input[name=audience]',form).forEach(r=>r.checked=r.value===(input.audience||audienceValues[0]));form.requestSubmit();if($('#brief-result').hidden)throw Error('Please review invalid fields in the form.');return{status:'prepared_for_review',sent:false,brief:$('#brief-preview').textContent};}},{signal:lifecycle.signal})).catch(()=>{});}catch{/* Normal form stays available when WebMCP is unsupported. */}window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
 }
}

// Motion is a progressive enhancement: the initial HTML stays useful without it.
function initCinematicMotion(){
 const hero=$('.hero'),heroCopy=$('.hero-copy'),heroArt=$('.hero-art'),heroImage=$('.hero-image');
 const film=$('.film');
 if(!hero&&!film)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const compact=matchMedia('(max-width: 599px)');
 const shortViewport=matchMedia('(max-height: 699px)');
 const captions=film?$$('.film-caption',film):[];
 const nodes=film?$$('.fragment',film):[];
 const media=film?$$('.film-media',film):[];
 const rail=film?$$('[data-scene-jump]',film):[];
 const world=film?$('.film-world',film):null;
 const connections=film?$('.system-connections',film):null;
 const labels=film?$$('.system-label',film):[];
 const live=film?$('.film [data-film-status]',film):null;
 let mode='';
 let context=null;
 let modeController=null;
 let observer=null;
 let frame=0;
 let visible=true;
 let activeScene=-1;
 let fallbackActive=false;

 function setActiveScene(index,announce=false){
  if(!captions.length)return;
  const changed=index!==activeScene;
  activeScene=index;
  captions.forEach((caption,i)=>{
   const active=i===index;
   caption.classList.toggle('is-active',active);
   caption.setAttribute('aria-hidden',String(!active));
  });
  rail.forEach((button,i)=>{
   if(i===index)button.setAttribute('aria-current','step');
   else button.removeAttribute('aria-current');
  });
  media.forEach(item=>{const active=Number(item.dataset.sceneFor)===index;item.classList.toggle('is-active',active);});
  if(changed&&announce&&live){const label=captions[index]?.dataset.sceneLabel||`Scene ${index+1}`;live.textContent=`Scene ${index+1} of ${captions.length}: ${label}.`;}
 }
 function showStaticFilm(){
  if(!film)return;
  film.classList.remove('is-enhanced','gsap-enhanced');
  captions.forEach(c=>{c.setAttribute('aria-hidden','false');c.classList.remove('is-active');});
  media.forEach(item=>item.classList.remove('is-active'));
  rail.forEach(b=>b.removeAttribute('aria-current'));
  if(live)live.textContent='';
  nodes.forEach(node=>{node.hidden=false;node.style.removeProperty('transform');node.style.removeProperty('opacity');node.style.removeProperty('filter');node.style.removeProperty('background');node.style.removeProperty('will-change');});
  [world,connections,$('.causal-connections',film),$('.decision-connections',film),...labels].filter(Boolean).forEach(node=>{node.style.removeProperty('transform');node.style.removeProperty('opacity');node.style.removeProperty('will-change');});
 }
 function teardownMode(){
  modeController?.abort();modeController=null;
  observer?.disconnect();observer=null;
  if(frame){cancelAnimationFrame(frame);frame=0;}
  context?.revert();context=null;
  fallbackActive=false;
  showStaticFilm();
 }
 function buildGsapMode(){
  gsap.registerPlugin(ScrollTrigger);
  modeController=new AbortController();
  if(film){
   film.classList.add('is-enhanced','gsap-enhanced');
   setActiveScene(0,false);
  }
  context=gsap.context(()=>{
   if(hero){
    if(scrollY<hero.offsetTop+hero.offsetHeight){
     gsap.from([heroCopy,heroArt].filter(Boolean),{autoAlpha:0,y:22,duration:.9,stagger:.1,ease:'power3.out'});
     if(heroImage)gsap.to(heroImage,{rotateY:-6,rotateX:2,x:14,scale:1.035,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:1.1,invalidateOnRefresh:true}});
     if(heroCopy)gsap.to(heroCopy,{y:-30,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:1.1,invalidateOnRefresh:true}});
    }
   }
   if(!film)return;
   const seed=(i,s)=>{const x=Math.sin((i+1)*s)*43758.5453;return x-Math.floor(x);};
   const pose=(s,i)=>{const col=i%8,row=Math.floor(i/8);if(s===0)return{x:(seed(i,12.19)-.5)*500,y:(seed(i,32.4)-.5)*330,z:(seed(i,76.3)-.5)*420,rX:seed(i,15)*180,rY:seed(i,18)*180,scale:.65+seed(i,8)*1.4,opacity:.22+seed(i,4.8)*.78};if(s===1)return{x:((i%3)-1)*150+(seed(i,5)-.5)*46,y:(Math.floor(i/3)-7.5)*17,z:((i%3)-1)*75,rX:0,rY:(i%3-1)*28,scale:.8,opacity:i>41?.12:.92};if(s===2)return{x:(col-3.5)*56,y:67-Math.exp(-(((col-3.5)/2.3)**2))*155+row*11,z:(row-2.5)*38,rX:0,rY:0,scale:1,opacity:.95};if(s===3){const branch=Math.floor(row/2)-1;return{x:(col-3.5)*59,y:branch*(col+1)*15,z:branch===0?88:-96-Math.abs(branch)*70,rX:0,rY:branch===0?0:45,scale:branch===0?1.1:.74,opacity:branch===0?1:.16};}if(s===4){const a=(i%6)*Math.PI/3,r=138+(Math.floor(i/6)-3.5)*3;return{x:Math.cos(a)*r,y:Math.sin(a)*r*.82,z:Math.sin(a)*22,rX:0,rY:(i%6)*60,scale:1,opacity:.94};}return{x:(col-3.5)*53,y:(row-2.5)*42,z:0,rX:0,rY:0,scale:.82,opacity:.78};};
   const camera=[[-5,-12,0],[8,7,-40],[12,-16,35],[0,0,45],[-7,12,0],[0,0,0]];
   const tl=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:film,start:'top top',end:'bottom bottom',pin:$('.film-sticky',film),pinSpacing:false,scrub:1.15,anticipatePin:1,invalidateOnRefresh:true}});
   gsap.set(nodes,{transformPerspective:900,transformOrigin:'center center'});
   gsap.set(media,{autoAlpha:0,transformPerspective:900,transformOrigin:'center center'});
   const firstMedia=media.find(item=>item.dataset.sceneFor==='0');if(firstMedia)gsap.set(firstMedia,{autoAlpha:1,x:-18,y:10,rotateZ:-3,scale:.94});
   nodes.forEach((node,i)=>{const p=pose(0,i);gsap.set(node,{x:p.x,y:p.y,z:p.z,rotateX:p.rX,rotateY:p.rY,scale:p.scale,autoAlpha:p.opacity});});
   gsap.set(world,{rotateX:camera[0][0],rotateY:camera[0][1],translateZ:camera[0][2]});
   gsap.set(captions,{autoAlpha:0,y:34});gsap.set(captions[0],{autoAlpha:1,y:0});
   for(let s=0;s<5;s++){
    const next=s+1;
    nodes.forEach((node,i)=>{const p=pose(next,i);tl.to(node,{x:p.x,y:p.y,z:p.z,rotateX:p.rX,rotateY:p.rY,scale:p.scale,autoAlpha:p.opacity,duration:1},s);});
    const cam=camera[next];tl.to(world,{rotateX:cam[0],rotateY:cam[1],translateZ:cam[2],duration:1},s);
    tl.to(captions[s],{autoAlpha:0,y:-34,duration:.18},s+.76).to(captions[next],{autoAlpha:1,y:0,duration:.24},s+.78);
    const outgoing=media.find(item=>Number(item.dataset.sceneFor)===s),incoming=media.find(item=>Number(item.dataset.sceneFor)===next);
    if(outgoing)tl.to(outgoing,{autoAlpha:0,x:(s%2?14:-14),y:-12,rotateZ:s%2?2:-2,scale:.9,duration:.28,ease:'power2.in'},s+.68);
    if(incoming)tl.fromTo(incoming,{autoAlpha:0,x:next%2?18:-18,y:16,rotateZ:next%2?3:-3,scale:.92},{autoAlpha:.96,x:0,y:0,rotateZ:next%2?1:-1,scale:1,duration:.42,ease:'power2.out'},s+.72);
    tl.to(connections,{autoAlpha:next===3?1:0,duration:.28},s+.2);
    tl.to($('.causal-connections',film),{autoAlpha:next===1?1:0,duration:.28},s+.2);
    tl.to($('.decision-connections',film),{autoAlpha:next===2?1:0,duration:.28},s+.2);
    labels.forEach(label=>tl.to(label,{autoAlpha:next===3?1:0,duration:.2},s+.3));
   }
   tl.eventCallback('onUpdate',()=>{const current=Math.min(5,Math.floor(tl.time()+.001));if(current!==activeScene)setActiveScene(current,true);});
   rail.forEach(button=>button.addEventListener('click',()=>{const index=Number(button.dataset.sceneJump),st=tl.scrollTrigger;if(!st)return;const progress=Math.min(1,(index+.08)/tl.duration());window.scrollTo({top:st.start+(st.end-st.start)*progress,behavior:'smooth'});},{signal:modeController.signal}));
   window.addEventListener('resize',()=>ScrollTrigger.refresh(),{passive:true,signal:modeController.signal});
  },film||document.body);
 }
 function buildFallbackMode(){
  if(!film)return;
  fallbackActive=true;modeController=new AbortController();film.classList.add('is-enhanced');setActiveScene(0,false);
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),lerp=(a,b,t)=>a+(b-a)*t,smooth=t=>t*t*(3-2*t);
  const rand=(i,seed)=>{const x=Math.sin((i+1)*seed)*43758.5453;return x-Math.floor(x);};
  function target(s,i){const col=i%8,row=Math.floor(i/8);if(s===0)return{x:(rand(i,12.19)-.5)*500,y:(rand(i,32.4)-.5)*330,z:(rand(i,76.3)-.5)*400,opacity:.35+rand(i,4.8)*.65,blur:rand(i,16.4)>.78?1.5:0};if(s===1)return{x:((i%3)-1)*145+(rand(i,5)-.5)*52,y:(Math.floor(i/3)-7.5)*16,z:((i%3)-1)*65,opacity:i>41?.14:.88,blur:i>41?2:0};if(s===2)return{x:(col-3.5)*55,y:65-Math.exp(-(((col-3.5)/2.3)**2))*150+row*11,z:(row-2.5)*35,opacity:.9,blur:0};if(s===3){const branch=Math.floor(row/2)-1;return{x:(col-3.5)*57,y:branch*(col+1)*14,z:branch===0?85:-90-Math.abs(branch)*70,opacity:branch===0?1:.16,blur:branch===0?0:1.2};}if(s===4){const a=(i%6)*Math.PI/3,r=135+(Math.floor(i/6)-3.5)*3;return{x:Math.cos(a)*r,y:Math.sin(a)*r*.8,z:Math.sin(a)*18,opacity:.93,blur:0};}return{x:(col-3.5)*53,y:(row-2.5)*42,z:0,opacity:.75,blur:0};}
  function schedule(){if(!frame&&fallbackActive&&visible)frame=requestAnimationFrame(draw);}
  function draw(){frame=0;if(!fallbackActive||!visible)return;const top=film.getBoundingClientRect().top,header=$('.header').offsetHeight;const distance=Math.max(1,film.offsetHeight-innerHeight+header);const progress=clamp((header-top)/distance,0,1)*6;const current=Math.min(5,Math.floor(progress));const local=progress-current;const t=smooth(clamp((local-.16)/.72,0,1));const next=Math.min(5,current+1);const count=innerWidth<900?24:48;
   nodes.forEach((node,i)=>{node.hidden=i>=count;if(i>=count)return;const a=target(current,i),b=target(next,i),x=lerp(a.x,b.x,t),y=lerp(a.y,b.y,t),z=lerp(a.z,b.z,t);node.style.transform=`translate3d(${x}px,${y}px,${z}px) rotateY(${lerp(current===0?i*7:0,0,t)}deg)`;node.style.opacity=lerp(a.opacity,b.opacity,t);node.style.filter=`blur(${lerp(a.blur,b.blur,t)}px)`;node.style.background=i%9===0?'var(--markup)':current>=4?'var(--system)':'var(--evidence)';node.style.willChange='transform, opacity';});
   const camera=[[-5,-12,0],[8,7,-40],[12,-16,35],[0,0,45],[-7,12,0],[0,0,0]],ca=camera[current],cb=camera[next];world.style.transform=`translateZ(${lerp(ca[2],cb[2],t)}px) rotateX(${lerp(ca[0],cb[0],t)}deg) rotateY(${lerp(ca[1],cb[1],t)}deg)`;const systemVisibility=current===3?t:current===4?1-t:0;connections.style.opacity=systemVisibility;labels.forEach(label=>label.style.opacity=systemVisibility);$('.causal-connections',film).style.opacity=current===1?t:current===2?1-t:0;$('.decision-connections',film).style.opacity=current===2?t:current===3?1-t:0;$('.alternative-path',film).style.opacity=current===3?1-t:1;if(current!==activeScene)setActiveScene(current,true);
  }
  observer=typeof IntersectionObserver==='undefined'?null:new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)schedule();},{rootMargin:'250px'});
  observer?.observe(film);visible=observer?film.getBoundingClientRect().bottom>0&&film.getBoundingClientRect().top<innerHeight+250:true;
  window.addEventListener('scroll',schedule,{passive:true,signal:modeController.signal});
  window.addEventListener('resize',schedule,{passive:true,signal:modeController.signal});
  rail.forEach(button=>button.addEventListener('click',()=>{const index=Number(button.dataset.sceneJump),header=$('.header').offsetHeight;const distance=film.offsetHeight-innerHeight+header;const y=scrollY+film.getBoundingClientRect().top-header+distance*((index+.08)/6);window.scrollTo({top:y,behavior:'smooth'});},{signal:modeController.signal}));
  schedule();
 }
 function syncMode(refresh=false){
  const canAnimate=!reduced.matches&&!compact.matches&&!shortViewport.matches;
  const next=canAnimate?(window.gsap&&window.ScrollTrigger?'gsap':'fallback'):'static';
  if(next===mode){if(refresh&&mode==='gsap')ScrollTrigger.refresh();else if(refresh&&mode==='fallback')schedule();return;}
  teardownMode();mode=next;
  if(mode==='gsap')buildGsapMode();
  else if(mode==='fallback')buildFallbackMode();
  else showStaticFilm();
 }
 const resync=()=>syncMode(true);
 [reduced,compact,shortViewport].forEach(query=>query.addEventListener('change',resync));
 window.addEventListener('resize',resync,{passive:true});
 window.addEventListener('pagehide',()=>{teardownMode();[reduced,compact,shortViewport].forEach(query=>query.removeEventListener('change',resync));},{once:true});
 syncMode();
}
initCinematicMotion();
