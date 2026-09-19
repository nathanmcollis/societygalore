
const config = window.SHOP_CONFIG; const products = window.PRODUCTS;
const money = n => new Intl.NumberFormat('en-AU',{style:'currency',currency:config.currency,maximumFractionDigits:0}).format(n);
function productUrl(slug, fromProduct=false){ return (fromProduct?'':'') + (location.pathname.includes('/products/') ? slug+'.html' : 'products/'+slug+'.html'); }
function getCart(){ try{return JSON.parse(localStorage.getItem('archiveShopCart')||'[]')}catch(e){return []} }
function saveCart(c){ localStorage.setItem('archiveShopCart',JSON.stringify(c)); renderBag(); }
function addToCart(slug){ const c=getCart(); if(!c.includes(slug))c.push(slug); saveCart(c); openBag(); }
function removeFromCart(slug){ saveCart(getCart().filter(x=>x!==slug)); }
function openBag(){ document.querySelector('.bag-drawer')?.classList.add('open');document.querySelector('.drawer-scrim')?.classList.add('open');document.body.style.overflow='hidden'; }
function closeBag(){ document.querySelector('.bag-drawer')?.classList.remove('open');document.querySelector('.drawer-scrim')?.classList.remove('open');document.body.style.overflow=''; }
function imgSrc(p, path){ return location.pathname.includes('/products/') ? '../'+path : path; }
function renderBag(){
 const c=getCart(); const count=document.querySelector('[data-bag-count]'); if(count)count.textContent=c.length;
 const list=document.querySelector('.bag-items'); if(!list)return;
 if(!c.length){list.innerHTML='<div class="bag-empty">Your bag is empty.</div>';}
 else{list.innerHTML=c.map(slug=>{const p=products.find(x=>x.slug===slug);return `<div class="bag-item"><img src="${imgSrc(p,p.images[0])}" alt=""><div><div class="bag-name">${p.name}</div><div>${money(p.price)}</div><button class="bag-remove" onclick="removeFromCart('${p.slug}')">Remove</button></div></div>`}).join('');}
 const total=c.reduce((s,slug)=>s+(products.find(p=>p.slug===slug)?.price||0),0); const totalEl=document.querySelector('[data-bag-total]'); if(totalEl)totalEl.textContent=money(total);
}
function checkoutEmail(){
 const c=getCart(); if(!c.length)return;
 const items=c.map(slug=>products.find(p=>p.slug===slug)).filter(Boolean); const body=['Hi, I’d like to enquire about these items:','',...items.map(p=>`• ${p.name} — ${money(p.price)}`),'',`Suggested total: ${money(items.reduce((s,p)=>s+p.price,0))}`,'','Please confirm availability, measurements and postage.'].join('\n');
 location.href=`mailto:${config.email}?subject=${encodeURIComponent('Order enquiry — '+config.name)}&body=${encodeURIComponent(body)}`;
}
function bagMarkup(){return `<div class="drawer-scrim" onclick="closeBag()"></div><aside class="bag-drawer"><div class="bag-head"><strong>Bag</strong><button class="bag-close" aria-label="Close bag" onclick="closeBag()">×</button></div><div class="bag-items"></div><div class="bag-total"><div class="total-row"><span>Suggested total</span><strong data-bag-total>$0</strong></div><button class="checkout" onclick="checkoutEmail()">Email order enquiry</button><div class="checkout-note">Static-site checkout: replace the placeholder email in catalog.js with your selling email.</div></div></aside>`}
document.addEventListener('DOMContentLoaded',()=>{document.body.insertAdjacentHTML('beforeend',bagMarkup());document.querySelectorAll('[data-open-bag]').forEach(b=>b.addEventListener('click',openBag));renderBag();});
