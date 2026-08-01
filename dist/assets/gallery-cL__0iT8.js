import{$ as a,e as y,d as b,b as h}from"./main-Dt1WkY31.js";/* empty css                 */document.addEventListener("DOMContentLoaded",async()=>{if(a("#gallery-page-identifier"))try{const r=await y();if(!r)return;const s=a("#gallery-grid-container"),d=a("#gallery-filter-tabs"),e=a("#lightbox-modal"),f=a("#lightbox-img"),x=a("#lightbox-caption"),c=a("#lightbox-close");let n="all";const g=()=>{const o=n==="all"?r:r.filter(t=>t.category===n);s.innerHTML=o.map(t=>`
        <div class="gallery-item group relative overflow-hidden rounded-xl bg-slate-900 border border-brand-dark-border cursor-pointer aspect-[4/3]" data-id="${t.id}">
          <img 
            src="${t.image}" 
            alt="${t.title}" 
            loading="lazy"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <span class="text-xs uppercase font-bold tracking-widest text-brand-gold mb-1">${t.category}</span>
            <h3 class="font-serif text-xl font-bold text-slate-100">${t.title}</h3>
            <p class="text-xs text-slate-300 mt-1 line-clamp-1">${t.caption}</p>
          </div>
        </div>
      `).join("")};if(g(),d&&b(d,"click",".gallery-tab-btn",(o,t)=>{h(".gallery-tab-btn",d).forEach(l=>{l.classList.remove("bg-brand-gold","text-slate-950"),l.classList.add("bg-brand-dark-card","text-slate-300","border","border-brand-dark-border")}),t.classList.remove("bg-brand-dark-card","text-slate-300","border","border-brand-dark-border"),t.classList.add("bg-brand-gold","text-slate-950"),n=t.dataset.category||"all",g()}),s&&e){b(s,"click",".gallery-item",(t,l)=>{const p=l.dataset.id,i=r.find(m=>m.id===p);i&&(f.src=i.image,x.textContent=`${i.title} — ${i.caption}`,e.classList.remove("hidden"),e.classList.add("flex"),document.body.classList.add("overflow-hidden"))});const o=()=>{e.classList.add("hidden"),e.classList.remove("flex"),document.body.classList.remove("overflow-hidden")};c&&c.addEventListener("click",o),e.addEventListener("click",t=>{t.target===e&&o()})}}catch(r){console.error("[GalleryPage] Controller initialization error:",r)}});
