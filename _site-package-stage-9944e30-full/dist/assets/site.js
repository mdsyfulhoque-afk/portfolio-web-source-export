const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
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
 form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const values=new FormData(form);const text=`PROJECT ENQUIRY — ${values.get('service')}\n\nName: ${values.get('name')}\nOrganisation: ${values.get('organisation')}\nEmail: ${values.get('email')}\nReaching out as: ${values.get('audience')}\nSupport: ${values.get('service')}\nTiming: ${values.get('timing')}\nBudget / procurement context: ${values.get('budget')||'To discuss'}\n\nTHE BRIEF\n${values.get('brief')}`;
  $('#brief-preview').textContent=text;$('#brief-email').href=`mailto:israhat@gmail.com?subject=${encodeURIComponent('Project enquiry: '+values.get('service'))}&body=${encodeURIComponent(text)}`;$('#brief-whatsapp').href=`https://wa.me/8801914011329?text=${encodeURIComponent(text)}`;$('#brief-result').hidden=false;$('#brief-feedback').textContent='';$('#brief-result').focus({preventScroll:true});$('#brief-result').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
 });
 $('#copy-brief').addEventListener('click',async()=>{const text=$('#brief-preview').textContent;try{await navigator.clipboard.writeText(text);$('#brief-feedback').textContent='Brief copied. Paste it into your preferred email or messaging app.';}catch{const range=document.createRange();range.selectNodeContents($('#brief-preview'));const selection=getSelection();selection.removeAllRanges();selection.addRange(range);$('#brief-feedback').textContent='Brief selected. Use Copy in your browser or press Ctrl+C / Command+C.';}});
 form.inert=false;$('#prepare-brief').disabled=false;
 // Optional agent entry point. It prepares the same visible draft and never sends it.
 if(document.modelContext?.registerTool){const lifecycle=new AbortController();const fields=['name','organisation','email','brief'];const serviceValues=Array.from(service.options,o=>o.value);const audienceValues=$$('input[name=audience]',form).map(i=>i.value);const timingValues=Array.from($('select[name=timing]',form).options,o=>o.value);
  try{Promise.resolve(document.modelContext.registerTool({name:'prepare_project_brief',title:'Prepare a project enquiry draft',description:'Fill and prepare a visible project enquiry for the visitor to review. Does not send email, send WhatsApp, store a lead or book an engagement.',inputSchema:{type:'object',properties:{name:{type:'string',minLength:1,maxLength:100},organisation:{type:'string',minLength:1,maxLength:160},email:{type:'string',format:'email',maxLength:200},brief:{type:'string',minLength:20,maxLength:5000},service:{type:'string',enum:serviceValues},audience:{type:'string',enum:audienceValues},timing:{type:'string',enum:timingValues},budget:{type:'string',maxLength:150}},required:fields,additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:true},execute(input){if(!input||typeof input!=='object'||Array.isArray(input))throw Error('Provide a project enquiry object.');const limits={name:100,organisation:160,email:200,brief:5000,budget:150};const allowed=[...fields,'service','audience','timing','budget'];if(Object.keys(input).some(k=>!allowed.includes(k)))throw Error('Unrecognised enquiry field.');for(const k of fields)if(typeof input[k]!=='string'||!input[k].trim()||input[k].length>limits[k])throw Error('Invalid '+k);if(input.brief.length<20||!/^\S+@\S+\.\S+$/.test(input.email))throw Error('Provide a valid email and a brief of at least 20 characters.');for(const [key,values]of [['service',serviceValues],['audience',audienceValues],['timing',timingValues]])if(input[key]!==undefined&&!values.includes(input[key]))throw Error('Invalid '+key);if(input.budget!==undefined&&(typeof input.budget!=='string'||input.budget.length>150))throw Error('Invalid budget context.');for(const key of [...fields,'budget'])$(`[name="${key}"]`,form).value=input[key]||'';service.value=input.service||serviceValues[0];$('select[name=timing]',form).value=input.timing||timingValues[0];$$('input[name=audience]',form).forEach(r=>r.checked=r.value===(input.audience||audienceValues[0]));form.requestSubmit();if($('#brief-result').hidden)throw Error('Please review invalid fields in the form.');return{status:'prepared_for_review',sent:false,brief:$('#brief-preview').textContent};}},{signal:lifecycle.signal})).catch(()=>{});}catch{/* Normal form stays available when WebMCP is unsupported. */}window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
 }
}

// One persistent set of 48 fragments. Coordinates are six semantic arrangements,
// interpolated by scroll position; no perpetual animation or wheel interception.
const film=$('.film');
if(film){const motion=matchMedia('(prefers-reduced-motion: reduce)'),compact=matchMedia('(max-width: 599px)');const world=$('.film-world'),nodes=$$('.fragment'),captions=$$('.film-caption'),rail=$$('[data-scene-jump]'),connections=$('.system-connections'),labels=$$('.system-label');let active=false,queued=false,visible=false,scene=-1;
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),lerp=(a,b,t)=>a+(b-a)*t,smooth=t=>t*t*(3-2*t);
 const rand=(i,seed)=>{const x=Math.sin((i+1)*seed)*43758.5453;return x-Math.floor(x);};
 function target(s,i){const col=i%8,row=Math.floor(i/8);if(s===0)return{x:(rand(i,12.19)-.5)*500,y:(rand(i,32.4)-.5)*330,z:(rand(i,76.3)-.5)*400,opacity:.35+rand(i,4.8)*.65,blur:rand(i,16.4)>0.78?1.5:0};
  if(s===1)return{x:((i%3)-1)*145+(rand(i,5)-.5)*52,y:(Math.floor(i/3)-7.5)*16,z:((i%3)-1)*65,opacity:i>41?.14:.88,blur:i>41?2:0};
  if(s===2)return{x:(col-3.5)*55,y:65-Math.exp(-(((col-3.5)/2.3)**2))*150+row*11,z:(row-2.5)*35,opacity:.9,blur:0};
  if(s===3){const branch=Math.floor(row/2)-1;return{x:(col-3.5)*57,y:branch*(col+1)*14,z:branch===0?85:-90-Math.abs(branch)*70,opacity:branch===0?1:.16,blur:branch===0?0:1.2};}
  if(s===4){const a=(i%6)*Math.PI/3,r=135+(Math.floor(i/6)-3.5)*3;return{x:Math.cos(a)*r,y:Math.sin(a)*r*.8,z:Math.sin(a)*18,opacity:.93,blur:0};}
  return{x:(col-3.5)*53,y:(row-2.5)*42,z:0,opacity:.75,blur:0};
 }
 function draw(){queued=false;if(!active||!visible)return;const top=film.getBoundingClientRect().top,header=$('.header').offsetHeight;const distance=Math.max(1,film.offsetHeight-innerHeight+header);const progress=clamp((header-top)/distance,0,1)*6;const nextScene=Math.min(5,Math.floor(progress));const local=progress-nextScene;const t=smooth(clamp((local-.16)/.72,0,1));const next=Math.min(5,nextScene+1);const count=innerWidth<900?24:48;
  nodes.forEach((node,i)=>{node.hidden=i>=count;if(i>=count)return;const a=target(nextScene,i),b=target(next,i);const x=lerp(a.x,b.x,t),y=lerp(a.y,b.y,t),z=lerp(a.z,b.z,t);node.style.transform=`translate3d(${x}px,${y}px,${z}px) rotateY(${lerp(nextScene===0?i*7:0,0,t)}deg)`;node.style.opacity=lerp(a.opacity,b.opacity,t);node.style.filter=`blur(${lerp(a.blur,b.blur,t)}px)`;node.style.background=i%9===0?'#c59037':nextScene>=4?'#9bad9d':'#9cafd9';});
  const camera=[[-5,-12,0],[8,7,-40],[12,-16,35],[0,0,45],[-7,12,0],[0,0,0]];const ca=camera[nextScene],cb=camera[next];world.style.transform=`translateZ(${lerp(ca[2],cb[2],t)}px) rotateX(${lerp(ca[0],cb[0],t)}deg) rotateY(${lerp(ca[1],cb[1],t)}deg)`;
  const systemVisibility=nextScene===3?t:nextScene===4?1-t:0;connections.style.opacity=systemVisibility;labels.forEach(l=>l.style.opacity=systemVisibility);
  $('.causal-connections').style.opacity=nextScene===1?t:nextScene===2?1-t:0;
  $('.decision-connections').style.opacity=nextScene===2?t:nextScene===3?1-t:0;
  $('.alternative-path').style.opacity=nextScene===3?1-t:1;
  if(scene!==nextScene){scene=nextScene;captions.forEach((c,i)=>c.classList.toggle('is-active',i===scene));rail.forEach((r,i)=>{if(i===scene)r.setAttribute('aria-current','step');else r.removeAttribute('aria-current');});}
 }
 function schedule(){if(!queued&&active&&visible){queued=true;requestAnimationFrame(draw);}}
 function configure(){active=!motion.matches&&!compact.matches&&innerHeight>=700;film.classList.toggle('is-enhanced',active);if(active){scene=-1;nodes.forEach(n=>n.style.willChange='transform, opacity');schedule();}else{nodes.forEach(n=>n.style.willChange='auto');}}
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)schedule();},{rootMargin:'250px'}).observe(film);
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',()=>{configure();schedule();},{passive:true});motion.addEventListener('change',configure);compact.addEventListener('change',configure);
 rail.forEach(button=>button.addEventListener('click',()=>{const index=Number(button.dataset.sceneJump),header=$('.header').offsetHeight;const distance=film.offsetHeight-innerHeight+header;const y=scrollY+film.getBoundingClientRect().top-header+distance*((index+.08)/6);window.scrollTo({top:y,behavior:'smooth'});}));
 configure();
}
