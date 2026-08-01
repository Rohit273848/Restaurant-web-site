import{s,$ as b,c as g}from"./main-Dt1WkY31.js";function f(t,a="$"){return typeof t!="number"?`${a}0.00`:`${a}${t.toFixed(2)}`}function y(t,a="$"){const{id:n,title:c,description:m,price:x,image:p,tags:d=[],dietary:o={}}=t;let l="";d.includes("chef-special")?l+=`<span class="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-brand-gold/90 text-slate-950 rounded-full shadow-sm">Chef's Special</span>`:d.includes("popular")&&(l+='<span class="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-amber-500/90 text-slate-950 rounded-full shadow-sm">Popular</span>');let r="";return o.isVegan?r+='<span class="text-xs px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-medium">Vegan</span>':o.isVegetarian&&(r+='<span class="text-xs px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-medium">Vegetarian</span>'),o.isGlutenFree&&(r+='<span class="text-xs px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/30 text-amber-300 font-medium">GF</span>'),`
    <article class="food-card cursor-pointer group" data-dish-id="${s(n)}">
      <div class="relative overflow-hidden aspect-[4/3] bg-slate-900">
        <img 
          src="${s(p)}" 
          alt="${s(c)}" 
          loading="lazy" 
          width="400"
          height="300"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60"></div>
        <div class="absolute top-3 left-3 flex flex-wrap gap-1 z-10">
          ${l}
        </div>
        <div class="absolute bottom-3 right-3 z-10">
          <span class="px-3 py-1 bg-slate-950/90 border border-brand-gold/40 backdrop-blur-md rounded-full text-sm font-bold text-brand-gold">
            ${f(x,a)}
          </span>
        </div>
      </div>

      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-start justify-between gap-2 mb-2">
            <h3 class="font-serif text-xl font-bold text-slate-100 group-hover:text-brand-gold transition-colors duration-200">
              ${s(c)}
            </h3>
          </div>
          <p class="text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">
            ${s(m)}
          </p>
        </div>

        <div class="pt-3 border-t border-brand-dark-border/60 flex items-center justify-between">
          <div class="flex items-center gap-1.5 flex-wrap">
            ${r}
          </div>
          <span class="inline-flex items-center gap-1 text-xs font-semibold text-brand-gold group-hover:translate-x-1 transition-transform duration-200">
            Details
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </span>
        </div>
      </div>
    </article>
  `}let e=null;function v(){e||(e=g(`
      <div id="dish-modal" class="modal-backdrop" aria-hidden="true" role="dialog">
        <div class="relative w-full max-w-2xl bg-brand-dark-card border border-brand-dark-border rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 scale-95 opacity-0 modal-content">
          <button id="modal-close-btn" class="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/70 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-900 transition-colors" aria-label="Close modal">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          <div id="modal-body"></div>
        </div>
      </div>
    `),document.body.appendChild(e),b("#modal-close-btn",e).addEventListener("click",u),e.addEventListener("click",a=>{a.target===e&&u()}),window.addEventListener("keydown",a=>{a.key==="Escape"&&e.classList.contains("active")&&u()}))}function w(t,a="$"){v();const{title:n,description:c,price:m,image:x,tags:p=[],dietary:d={}}=t,o=b("#modal-body",e),l=b(".modal-content",e);let r="";p.includes("chef-special")&&(r+=`<span class="px-3 py-1 text-xs font-bold bg-brand-gold text-slate-950 rounded-full">Chef's Signature</span>`),p.includes("popular")&&(r+='<span class="px-3 py-1 text-xs font-bold bg-amber-500 text-slate-950 rounded-full">Popular Favorite</span>');let i="";d.isVegan&&(i+='<span class="px-2.5 py-1 text-xs font-medium rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300">100% Vegan</span>'),d.isVegetarian&&(i+='<span class="px-2.5 py-1 text-xs font-medium rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300">Vegetarian</span>'),d.isGlutenFree&&(i+='<span class="px-2.5 py-1 text-xs font-medium rounded bg-amber-950 border border-amber-500/40 text-amber-300">Gluten Free</span>'),d.containsNuts&&(i+='<span class="px-2.5 py-1 text-xs font-medium rounded bg-rose-950 border border-rose-500/40 text-rose-300">Contains Nuts</span>'),o.innerHTML=`
    <div class="grid grid-cols-1 md:grid-cols-2">
      <div class="relative h-64 md:h-full bg-slate-900">
        <img src="${s(x)}" alt="${s(n)}" class="w-full h-full object-cover"/>
      </div>
      <div class="p-6 md:p-8 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 mb-3">
            ${r}
          </div>
          <h2 class="font-serif text-2xl md:text-3xl font-bold text-slate-100 mb-2">${s(n)}</h2>
          <p class="text-2xl font-bold text-brand-gold mb-4">${f(m,a)}</p>
          <p class="text-sm text-slate-300 leading-relaxed mb-6">${s(c)}</p>
          
          <div class="mb-6">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Dietary Notes</h4>
            <div class="flex flex-wrap gap-2">
              ${i||'<span class="text-xs text-slate-500">Standard prep</span>'}
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
  `,e.classList.add("active"),e.setAttribute("aria-hidden","false"),document.body.classList.add("overflow-hidden"),requestAnimationFrame(()=>{l.classList.remove("scale-95","opacity-0"),l.classList.add("scale-100","opacity-100")})}function u(){if(!e)return;const t=b(".modal-content",e);t.classList.remove("scale-100","opacity-100"),t.classList.add("scale-95","opacity-0"),setTimeout(()=>{e.classList.remove("active"),e.setAttribute("aria-hidden","true"),document.body.classList.remove("overflow-hidden")},250)}export{w as o,y as r};
