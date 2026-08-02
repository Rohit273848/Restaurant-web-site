import{s as e,$,c as B}from"./main-DfgMMrCK.js";function g(t,a="$"){return typeof t!="number"?`${a}0.00`:`${a}${t.toFixed(2)}`}function j(t=5){const a=Math.floor(t),r=t%1>=.5;let o="";for(let s=0;s<5;s++)s<a?o+='<svg class="w-3.5 h-3.5 text-brand-gold fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>':s===a&&r?o+='<svg class="w-3.5 h-3.5 text-brand-gold fill-current opacity-70" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>':o+='<svg class="w-3.5 h-3.5 text-slate-600 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';return`<div class="flex items-center gap-1">${o} <span class="text-xs font-bold text-slate-300 ml-1">${t.toFixed(1)}</span></div>`}function y(t=0){if(!t||t<=0)return"";let a="";for(let r=0;r<t;r++)a+=`<span title="Spice Level ${t}">🌶️</span>`;return`<span class="text-xs flex items-center gap-0.5 ml-2" aria-label="Spice level ${t} of 3">${a}</span>`}function V(t,a="$"){if(!t)return"";const r=typeof a=="string"?{currencySymbol:a,variant:"default"}:{currencySymbol:"$",variant:"default",showBadges:!0,ctaText:"Details",...a},{id:o,title:s="Untitled Dish",description:b="",price:i=0,image:f="",tags:v=[],dietary:x={},rating:u=4.9,spiceLevel:d=0,isAvailable:L=!0,availability:z="in-stock",categoryName:S=""}=t,n=!L||z==="sold-out",m=r.currencySymbol||"$",h=f||"https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80";let c="";r.showBadges!==!1&&(v.includes("best-seller")?c+='<span class="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 rounded-full shadow-sm font-sans">Best Seller</span>':v.includes("chef-special")?c+=`<span class="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-brand-gold/90 text-slate-950 rounded-full shadow-sm font-sans">Chef's Special</span>`:v.includes("popular")&&(c+='<span class="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-amber-500/90 text-slate-950 rounded-full shadow-sm font-sans">Popular</span>'));let p="";x.isVegan?p+='<span class="text-xs px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-medium">Vegan</span>':x.isVegetarian&&(p+='<span class="text-xs px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-medium">Vegetarian</span>'),x.isGlutenFree&&(p+='<span class="text-xs px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/30 text-amber-300 font-medium">GF</span>');const w=n?'<div class="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-20"><span class="px-3 py-1.5 bg-red-950 border border-red-500/50 text-red-300 font-bold text-xs uppercase tracking-widest rounded-md">Sold Out</span></div>':"";return r.variant==="compact"?`
      <article class="food-card food-card-compact flex items-center gap-4 p-3 bg-brand-dark-card border border-brand-dark-border rounded-xl shadow-dark-card hover:border-brand-gold/50 transition-all cursor-pointer group relative ${n?"opacity-60":""}" data-dish-id="${e(o)}">
        <div class="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-900">
          <img src="${e(h)}" alt="${e(s)}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          ${n?w:""}
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="font-serif text-base font-bold text-slate-100 group-hover:text-brand-gold transition-colors truncate mb-0.5">${e(s)}</h4>
          <span class="text-xs font-serif font-bold text-brand-gold">${g(i,m)}</span>
        </div>
        <span class="text-brand-gold group-hover:translate-x-1 transition-transform">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </span>
      </article>
    `:r.variant==="horizontal"?`
      <article class="food-card food-card-horizontal flex flex-col sm:flex-row bg-brand-dark-card border border-brand-dark-border rounded-xl overflow-hidden shadow-dark-card hover:border-brand-gold/60 transition-all cursor-pointer group relative ${n?"opacity-60":""}" data-dish-id="${e(o)}">
        <div class="relative sm:w-56 shrink-0 aspect-[4/3] sm:aspect-auto bg-slate-900">
          <img src="${e(h)}" alt="${e(s)}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute top-3 left-3 flex flex-wrap gap-1 z-10">${c}</div>
          ${w}
        </div>
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-start justify-between gap-3 mb-2">
              <h3 class="font-serif text-xl font-bold text-slate-100 group-hover:text-brand-gold transition-colors">${e(s)}</h3>
              <span class="px-3 py-1 bg-slate-950/90 border border-brand-gold/40 rounded-full text-sm font-bold text-brand-gold font-serif shrink-0">${g(i,m)}</span>
            </div>
            <p class="text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">${e(b)}</p>
          </div>
          <div class="pt-3 border-t border-brand-dark-border/60 flex items-center justify-between">
            <div class="flex items-center gap-2">${p} ${y(d)}</div>
            <span class="inline-flex items-center gap-1 text-xs font-semibold text-brand-gold group-hover:translate-x-1 transition-transform">${r.ctaText||"Details"} &rarr;</span>
          </div>
        </div>
      </article>
    `:r.variant==="featured"?`
      <article class="food-card food-card-featured grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 bg-brand-dark-card border border-brand-gold/40 rounded-2xl shadow-2xl shadow-gold-glow/10 group cursor-pointer relative ${n?"opacity-60":""}" data-dish-id="${e(o)}">
        <div class="lg:col-span-7 relative rounded-xl overflow-hidden aspect-[16/10] bg-slate-900">
          <img src="${e(h)}" alt="${e(s)}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div class="absolute top-4 left-4 z-10 flex gap-2">${c}</div>
          <div class="absolute bottom-4 right-4 z-10 px-4 py-1.5 bg-slate-950/90 border border-brand-gold/50 backdrop-blur-md rounded-full text-base font-bold text-brand-gold font-serif">${g(i,m)}</div>
          ${w}
        </div>
        <div class="lg:col-span-5 flex flex-col justify-between py-2">
          <div>
            <div class="mb-3">${j(u)}</div>
            <h3 class="font-serif text-2xl font-bold text-slate-100 mb-3 group-hover:text-brand-gold transition-colors">${e(s)}</h3>
            <p class="text-sm text-slate-300 leading-relaxed font-light mb-6">${e(b)}</p>
          </div>
          <div class="pt-4 border-t border-brand-dark-border/80 flex items-center justify-between">
            <div class="flex items-center gap-2">${p} ${y(d)}</div>
            <span class="btn-primary text-xs py-2.5 px-5">${r.ctaText||"View Creation"}</span>
          </div>
        </div>
      </article>
    `:r.variant==="premium"?`
      <article class="food-card food-card-premium relative bg-gradient-to-b from-brand-gold/20 via-brand-dark-card to-brand-dark-card border border-brand-gold/50 rounded-2xl overflow-hidden shadow-gold-glow/20 group cursor-pointer flex flex-col ${n?"opacity-60":""}" data-dish-id="${e(o)}">
        <div class="relative overflow-hidden aspect-[4/3] bg-slate-900">
          <img src="${e(h)}" alt="${e(s)}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-80"></div>
          <div class="absolute top-3 left-3 z-10 flex gap-1">${c}</div>
          <div class="absolute bottom-3 right-3 z-10 px-3.5 py-1 bg-brand-gold text-slate-950 font-serif font-bold text-base rounded-full shadow-gold-glow">${g(i,m)}</div>
          ${w}
        </div>
        <div class="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-[10px] uppercase font-bold tracking-widest text-brand-gold font-sans">${e(S||"Signature")}</span>
              ${j(u)}
            </div>
            <h3 class="font-serif text-xl font-bold text-slate-100 group-hover:text-brand-gold transition-colors mb-2">${e(s)}</h3>
            <p class="text-sm text-slate-300 line-clamp-2 leading-relaxed mb-4 font-light">${e(b)}</p>
          </div>
          <div class="pt-3 border-t border-brand-dark-border/60 flex items-center justify-between">
            <div class="flex items-center gap-1.5">${p}</div>
            <span class="inline-flex items-center gap-1 text-xs font-semibold text-brand-gold group-hover:translate-x-1 transition-transform">${r.ctaText||"Pairing Details"} &rarr;</span>
          </div>
        </div>
      </article>
    `:`
    <article class="food-card cursor-pointer group flex flex-col bg-brand-dark-card border border-brand-dark-border rounded-xl overflow-hidden shadow-dark-card hover:border-brand-gold/60 transition-all duration-300 ${n?"opacity-60":""}" data-dish-id="${e(o)}">
      <div class="relative overflow-hidden aspect-[4/3] bg-slate-900">
        <img 
          src="${e(h)}" 
          alt="${e(s)}" 
          loading="lazy" 
          width="400"
          height="300"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60"></div>
        <div class="absolute top-3 left-3 flex flex-wrap gap-1 z-10">
          ${c}
        </div>
        <div class="absolute bottom-3 right-3 z-10">
          <span class="px-3 py-1 bg-slate-950/90 border border-brand-gold/40 backdrop-blur-md rounded-full text-sm font-bold text-brand-gold font-serif">
            ${g(i,m)}
          </span>
        </div>
        ${w}
      </div>

      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-start justify-between gap-2 mb-2">
            <h3 class="font-serif text-xl font-bold text-slate-100 group-hover:text-brand-gold transition-colors duration-200">
              ${e(s)}
            </h3>
          </div>
          <p class="text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">
            ${e(b)}
          </p>
        </div>

        <div class="pt-3 border-t border-brand-dark-border/60 flex items-center justify-between">
          <div class="flex items-center gap-1.5 flex-wrap">
            ${p}
            ${y(d)}
          </div>
          <span class="inline-flex items-center gap-1 text-xs font-semibold text-brand-gold group-hover:translate-x-1 transition-transform duration-200">
            ${r.ctaText||"Details"}
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </span>
        </div>
      </div>
    </article>
  `}let l=null;function M(){l||(l=B(`
      <div id="dish-modal" class="modal-backdrop" aria-hidden="true" role="dialog">
        <div class="relative w-full max-w-2xl bg-brand-dark-card border border-brand-dark-border rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 scale-95 opacity-0 modal-content">
          <button id="modal-close-btn" class="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/70 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-900 transition-colors" aria-label="Close modal">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          <div id="modal-body"></div>
        </div>
      </div>
    `),document.body.appendChild(l),$("#modal-close-btn",l).addEventListener("click",k),l.addEventListener("click",a=>{a.target===l&&k()}),window.addEventListener("keydown",a=>{a.key==="Escape"&&l.classList.contains("active")&&k()}))}function T(t,a="$"){M();const{title:r,description:o,price:s,image:b,tags:i=[],dietary:f={}}=t,v=$("#modal-body",l),x=$(".modal-content",l);let u="";i.includes("chef-special")&&(u+=`<span class="px-3 py-1 text-xs font-bold bg-brand-gold text-slate-950 rounded-full">Chef's Signature</span>`),i.includes("popular")&&(u+='<span class="px-3 py-1 text-xs font-bold bg-amber-500 text-slate-950 rounded-full">Popular Favorite</span>');let d="";f.isVegan&&(d+='<span class="px-2.5 py-1 text-xs font-medium rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300">100% Vegan</span>'),f.isVegetarian&&(d+='<span class="px-2.5 py-1 text-xs font-medium rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300">Vegetarian</span>'),f.isGlutenFree&&(d+='<span class="px-2.5 py-1 text-xs font-medium rounded bg-amber-950 border border-amber-500/40 text-amber-300">Gluten Free</span>'),f.containsNuts&&(d+='<span class="px-2.5 py-1 text-xs font-medium rounded bg-rose-950 border border-rose-500/40 text-rose-300">Contains Nuts</span>'),v.innerHTML=`
    <div class="grid grid-cols-1 md:grid-cols-2">
      <div class="relative h-64 md:h-full bg-slate-900">
        <img src="${e(b)}" alt="${e(r)}" class="w-full h-full object-cover"/>
      </div>
      <div class="p-6 md:p-8 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 mb-3">
            ${u}
          </div>
          <h2 class="font-serif text-2xl md:text-3xl font-bold text-slate-100 mb-2">${e(r)}</h2>
          <p class="text-2xl font-bold text-brand-gold mb-4">${g(s,a)}</p>
          <p class="text-sm text-slate-300 leading-relaxed mb-6">${e(o)}</p>
          
          <div class="mb-6">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Dietary Notes</h4>
            <div class="flex flex-wrap gap-2">
              ${d||'<span class="text-xs text-slate-500">Standard prep</span>'}
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-brand-dark-border flex items-center justify-between gap-4">
          <a href="contact.html" class="btn-primary w-full text-center text-sm py-3">
            Contact & Location Details
          </a>
        </div>
      </div>
    </div>
  `,l.classList.add("active"),l.setAttribute("aria-hidden","false"),document.body.classList.add("overflow-hidden"),requestAnimationFrame(()=>{x.classList.remove("scale-95","opacity-0"),x.classList.add("scale-100","opacity-100")})}function k(){if(!l)return;const t=$(".modal-content",l);t.classList.remove("scale-100","opacity-100"),t.classList.add("scale-95","opacity-0"),setTimeout(()=>{l.classList.remove("active"),l.setAttribute("aria-hidden","true"),document.body.classList.remove("overflow-hidden")},250)}export{T as o,V as r};
