import{$ as r,e as w,d as f,b as L}from"./main-DfgMMrCK.js";/* empty css                 */document.addEventListener("DOMContentLoaded",async()=>{if(r("#gallery-page-identifier"))try{const s=await w();if(!s)return;const d=r("#gallery-grid-container"),c=r("#gallery-filter-tabs"),o=r("#lightbox-modal"),x=r("#lightbox-img"),h=r("#lightbox-title"),u=r("#lightbox-caption"),p=r("#lightbox-close"),v=r("#lightbox-prev"),m=r("#lightbox-next");let b="all",l=[],i=0;const y=()=>{if(l=b==="all"?s:s.filter(t=>t.category===b),l.length===0){d.innerHTML=`
          <div class="col-span-full text-center py-16 px-4 bg-brand-dark-card rounded-2xl border border-brand-dark-border">
            <svg class="w-12 h-12 text-brand-gold mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            <h3 class="font-serif text-2xl font-bold text-slate-200 mb-2">No photos found</h3>
            <p class="text-slate-400 text-sm max-w-md mx-auto">Try selecting another category to view our restaurant gallery.</p>
          </div>
        `;return}d.innerHTML=l.map((t,e)=>`
        <article 
          class="gallery-item group relative overflow-hidden rounded-xl bg-slate-900 border border-brand-dark-border hover:border-brand-gold/60 transition-all duration-300 cursor-pointer aspect-[4/3] shadow-dark-card" 
          data-index="${e}" 
          data-id="${t.id}"
          tabindex="0"
          role="button"
          aria-label="View ${t.title} image in full size"
        >
          <img 
            src="${t.image}" 
            alt="${t.alt||t.title}" 
            loading="lazy"
            width="600"
            height="450"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 backdrop-blur-[2px]">
            <div class="flex items-center justify-between mb-1">
              <span class="text-[10px] uppercase font-bold tracking-widest text-brand-gold bg-brand-gold/10 px-2.5 py-0.5 rounded border border-brand-gold/30">${t.category}</span>
              <div class="w-8 h-8 rounded-full bg-slate-950/80 border border-brand-gold/40 flex items-center justify-center text-brand-gold">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"/></svg>
              </div>
            </div>
            <h3 class="font-serif text-xl font-bold text-slate-100">${t.title}</h3>
            <p class="text-xs text-slate-300 mt-1 line-clamp-1 font-light">${t.caption}</p>
          </div>
        </article>
      `).join("")};y(),c&&f(c,"click",".gallery-tab-btn",(t,e)=>{L(".gallery-tab-btn",c).forEach(a=>{a.classList.remove("bg-brand-gold","text-slate-950","shadow-gold-glow"),a.classList.add("bg-brand-dark-card","text-slate-300","border","border-brand-dark-border"),a.setAttribute("aria-selected","false")}),e.classList.remove("bg-brand-dark-card","text-slate-300","border","border-brand-dark-border"),e.classList.add("bg-brand-gold","text-slate-950","shadow-gold-glow"),e.setAttribute("aria-selected","true"),b=e.dataset.category||"all",y()});const n=t=>{t<0&&(t=l.length-1),t>=l.length&&(t=0),i=t;const e=l[i];e&&(x.src=e.image,x.alt=e.alt||e.title,h&&(h.textContent=e.title),u&&(u.textContent=e.caption))},k=t=>{n(t),o.classList.remove("hidden"),o.classList.add("flex"),document.body.classList.add("overflow-hidden")},g=()=>{o.classList.add("hidden"),o.classList.remove("flex"),document.body.classList.remove("overflow-hidden")};d&&o&&(f(d,"click",".gallery-item",(t,e)=>{const a=parseInt(e.dataset.index,10);isNaN(a)||k(a)}),f(d,"keydown",".gallery-item",(t,e)=>{if(t.key==="Enter"||t.key===" "){t.preventDefault();const a=parseInt(e.dataset.index,10);isNaN(a)||k(a)}}),p&&p.addEventListener("click",g),v&&v.addEventListener("click",()=>n(i-1)),m&&m.addEventListener("click",()=>n(i+1)),o.addEventListener("click",t=>{t.target===o&&g()}),document.addEventListener("keydown",t=>{o.classList.contains("hidden")||(t.key==="Escape"?g():t.key==="ArrowLeft"?n(i-1):t.key==="ArrowRight"&&n(i+1))}))}catch(s){console.error("[GalleryPage] Controller initialization error:",s)}});
