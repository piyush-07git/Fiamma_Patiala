const $=s=>document.querySelector(s);const $$=s=>document.querySelectorAll(s);
const menuToggle=$('.menu-toggle'),navLinks=$('.nav-links');menuToggle?.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuToggle.setAttribute('aria-expanded',open)});$$('.nav-links a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));

const chat=$('#chat'),launch=$('#chatLaunch'),close=$('#chatClose'),body=$('#chatBody'),form=$('#chatForm'),input=$('#chatInput');
function openChat(prefill){chat.classList.add('open');chat.setAttribute('aria-hidden','false');if(prefill){input.value=prefill;setTimeout(()=>sendMessage(prefill),120)}else input.focus()}
function closeChat(){chat.classList.remove('open');chat.setAttribute('aria-hidden','true')}
launch.onclick=()=>openChat();close.onclick=closeChat;
function addBubble(text,who='bot'){const d=document.createElement('div');d.className='bubble '+who;d.textContent=text;body.appendChild(d);body.scrollTop=body.scrollHeight}
function answer(q){const s=q.toLowerCase().trim();
 if(/^(hi|hello|hey|namaste|hii)/.test(s))return'Hello! 👋 Welcome to Fiamma. I can help with food, location, contact, Instagram, hours and visit planning.';
 if(/menu|food|eat|serve|dish|pizza|coffee|mexican|alimento|veg|vegetarian/.test(s))return'Fiamma’s supplied promotional material highlights three food categories: wood-fired pizza, artisan coffee and Mexican alimento. I don’t show unverified dishes or prices here—please ask the team for the current menu.';
 if(/location|where|address|situat|reach|map|direction/.test(s))return'Fiamma’s supplied poster lists: SCO-1, City Centre Complex, Patiala. Tap “Open in Google Maps” on the Visit section for a live map search. Please confirm the exact pin with the restaurant before travelling.';
 if(/phone|call|contact|number|whatsapp/.test(s))return'The supplied poster shows +91 98143 98221. You can tap the Call button on the site. For WhatsApp, please use the number only if the restaurant confirms WhatsApp ordering is active.';
 if(/instagram|insta|social|follow/.test(s))return'Fiamma’s Instagram handle is @fiamma_patiala. Tap the Instagram button to open the profile.';
 if(/hour|open|close|timing|time|today|tomorrow/.test(s))return'I don’t have a reliably confirmed opening-hours schedule. The demo deliberately avoids guessing. Please call +91 98143 98221 or check Fiamma’s latest Instagram update before visiting.';
 if(/order|delivery|takeaway|take away|reserve|reservation|book|table/.test(s))return'The public information I found does not give a confirmed ordering/reservation system. The safest option is to call Fiamma directly and ask about current dine-in, takeaway, delivery or table availability.';
 if(/price|cost|rate|₹|rupee|budget/.test(s))return'Current prices are not displayed because I don’t have a verified Fiamma menu/pricing source. The owner can add an official menu later without changing the rest of the website.';
 if(/review|rating|feedback|google/.test(s))return'For the most current customer feedback, use Fiamma’s Google business profile or Instagram. The demo avoids displaying unverified ratings as facts.';
 if(/offer|discount|deal|coupon|promo/.test(s))return'I won’t invent offers. For current deals, check @fiamma_patiala or call the restaurant.';
 if(/kid|child|family|date|couple|friend|group|birthday/.test(s))return'Fiamma can be presented as a casual food-and-coffee stop for groups and everyday visits. For birthday setups, seating, large groups or special requests, please contact the restaurant first.';
 if(/install|app|home screen|pwa/.test(s))return'Yes! This demo is built as an installable web app (PWA). On a supported mobile browser, use the browser menu and choose “Add to Home screen” or “Install app”.';
 if(/owner|website|demo|update|change/.test(s))return'This is a demo website concept. Before launch, the owner should confirm the address, hours, menu, prices, ordering links, offers and any claims. No sensitive visitor information is requested by this demo.';
 return'I can help with Fiamma’s food categories, location, contact number, Instagram, hours, ordering, offers, visit planning and this installable website. Try asking “Where are you?”, “What food do you have?” or “How do I contact you?”';
}
function sendMessage(q){if(!q)return;addBubble(q,'user');setTimeout(()=>addBubble(answer(q)),180)}
form.addEventListener('submit',e=>{e.preventDefault();const q=input.value.trim();input.value='';sendMessage(q)});
$$('.quick button').forEach(b=>b.onclick=()=>sendMessage(b.dataset.q));$$('[data-chat]').forEach(b=>b.onclick=()=>{const q={pizza:'Tell me about the pizza',coffee:'Tell me about the coffee',mexican:'Tell me about the Mexican food'}[b.dataset.chat];openChat(q)});

let deferredPrompt;const install=$('#installPrompt');window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;install.classList.add('show')});$('#installBtn').onclick=async()=>{if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null}install.classList.remove('show')};$('#installClose').onclick=()=>install.classList.remove('show');
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
