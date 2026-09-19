
document.addEventListener('DOMContentLoaded',()=>{
 const slug=document.body.dataset.product; const p=PRODUCTS.find(x=>x.slug===slug); if(!p)return;
 document.title=`${p.name} — ${SHOP_CONFIG.name}`;
 const thumbs=document.getElementById('thumbs'), main=document.getElementById('main-img'); let active=0;
 const rel=path=>'../'+path;
 main.src=rel(p.images[0]); main.alt=p.name;
 thumbs.innerHTML=p.images.map((im,i)=>`<button class="thumb ${i===0?'active':''}" data-i="${i}" aria-label="View image ${i+1}"><img src="${rel(im)}" alt="${p.name}, view ${i+1}"></button>`).join('');
 thumbs.addEventListener('click',e=>{const b=e.target.closest('.thumb');if(!b)return;active=+b.dataset.i;main.src=rel(p.images[active]);document.querySelectorAll('.thumb').forEach(x=>x.classList.toggle('active',x===b));});
 document.querySelector('[data-title]').textContent=p.name;document.querySelector('[data-subtitle]').textContent=p.subtitle;document.querySelector('[data-price]').textContent=money(p.price);document.querySelector('[data-category]').textContent=p.category;
 document.querySelector('[data-description]').innerHTML=p.description.map(x=>`<p>${x}</p>`).join('');document.querySelector('[data-details]').innerHTML=p.details.map(x=>`<li>${x}</li>`).join('');document.querySelector('[data-pricing]').textContent=p.pricing;
 document.querySelector('[data-add]').addEventListener('click',()=>addToCart(p.slug));
 const lb=document.querySelector('.lightbox'), lbImg=document.querySelector('.lightbox img');function showLb(){lbImg.src=rel(p.images[active]);lb.classList.add('open');document.body.style.overflow='hidden'}function hideLb(){lb.classList.remove('open');document.body.style.overflow=''}function step(d){active=(active+d+p.images.length)%p.images.length;lbImg.src=rel(p.images[active]);main.src=rel(p.images[active]);document.querySelectorAll('.thumb').forEach((x,i)=>x.classList.toggle('active',i===active));}
 document.querySelector('.main-photo').addEventListener('click',showLb);document.querySelector('.close-lightbox').addEventListener('click',hideLb);document.querySelector('.lb-prev').addEventListener('click',()=>step(-1));document.querySelector('.lb-next').addEventListener('click',()=>step(1));lb.addEventListener('click',e=>{if(e.target===lb)hideLb()});document.addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')hideLb();if(e.key==='ArrowLeft')step(-1);if(e.key==='ArrowRight')step(1)});
 const related=PRODUCTS.filter(x=>x.slug!==p.slug).sort((a,b)=>(a.category===p.category?-1:0)-(b.category===p.category?-1:0)).slice(0,3);document.getElementById('related-grid').innerHTML=related.map(x=>`<article class="product-card"><a class="product-image-wrap" href="${x.slug}.html"><img class="product-image" src="${rel(x.images[0])}" alt="${x.name}" loading="lazy"></a><div class="product-meta"><div><a class="product-title" href="${x.slug}.html">${x.name}</a><div class="product-cat">${x.category}</div></div><div class="product-price">${money(x.price)}</div></div></article>`).join('');
});
