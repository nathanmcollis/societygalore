
document.addEventListener('DOMContentLoaded',()=>{
 const grid=document.getElementById('product-grid');
 grid.innerHTML=PRODUCTS.map(p=>`<article class="product-card" data-cat="${p.category}"><a class="product-image-wrap" href="products/${p.slug}.html"><img class="product-image" src="${p.images[0]}" alt="${p.name}" loading="lazy"></a><div class="product-meta"><div><a class="product-title" href="products/${p.slug}.html">${p.name}</a><div class="product-cat">${p.category}</div></div><div class="product-price">${money(p.price)}</div></div></article>`).join('');
 const filters=document.querySelectorAll('.filter');
 filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(x=>x.classList.remove('active'));btn.classList.add('active');const cat=btn.dataset.filter;let shown=0;document.querySelectorAll('.product-card').forEach(card=>{const ok=cat==='All'||card.dataset.cat===cat;card.classList.toggle('hidden',!ok);if(ok)shown++});document.querySelector('[data-product-count]').textContent=shown+' items';}));
});
