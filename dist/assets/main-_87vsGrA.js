import{$ as c,g as w,f as u,d as m,b as v,h as x}from"./main-DfgMMrCK.js";/* empty css                 */import{r as h,o as k}from"./FoodModal-DZBcM7JP.js";function y(o=5){let d='<div class="flex items-center gap-1 text-brand-gold aria-label="'+o+' out of 5 stars">';for(let a=1;a<=5;a++){const i=a<=o;d+=`
      <svg class="w-4 h-4 ${i?"fill-brand-gold text-brand-gold":"fill-transparent text-slate-600"}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    `}return d+="</div>",d}document.addEventListener("DOMContentLoaded",async()=>{var o;if(c("#home-page-identifier"))try{const s=await w(),d=((o=s==null?void 0:s.brand)==null?void 0:o.currencySymbol)||"$",a=await u(),i=c("#featured-menu-grid"),b=c("#home-menu-tabs");if(a&&i){const e=(l="starters")=>{const r=a.items.filter(t=>t.categoryId===l||l==="all").slice(0,6);i.innerHTML=r.map(t=>h(t,d)).join("")};e("starters"),b&&m(b,"click",".tab-btn",(l,r)=>{v(".tab-btn",b).forEach(n=>{n.classList.remove("bg-brand-gold","text-slate-950"),n.classList.add("bg-brand-dark-card","text-slate-300","border","border-brand-dark-border")}),r.classList.remove("bg-brand-dark-card","text-slate-300","border","border-brand-dark-border"),r.classList.add("bg-brand-gold","text-slate-950");const t=r.dataset.category;e(t)}),m(i,"click",".food-card",(l,r)=>{const t=r.dataset.dishId,n=a.items.find(f=>f.id===t);n&&k(n,d)})}const g=await x(),p=c("#testimonials-wrapper");g&&p&&(p.innerHTML=g.map(e=>`
        <div class="swiper-slide h-auto">
          <div class="h-full p-8 bg-brand-dark-card border border-brand-dark-border/80 rounded-2xl flex flex-col justify-between shadow-dark-card">
            <div>
              <div class="mb-4">
                ${y(e.rating)}
              </div>
              <p class="text-slate-300 text-lg italic leading-relaxed mb-6 font-serif">
                "${e.comment}"
              </p>
            </div>
            <div class="flex items-center gap-4 pt-4 border-t border-brand-dark-border/60">
              <img src="${e.avatar}" alt="${e.name}" class="w-12 h-12 rounded-full object-cover border border-brand-gold/40" />
              <div>
                <h4 class="font-bold text-slate-100">${e.name}</h4>
                <p class="text-xs text-brand-gold">${e.designation}</p>
              </div>
            </div>
          </div>
        </div>
      `).join(""),window.Swiper&&new window.Swiper("#testimonials-swiper",{slidesPerView:1,spaceBetween:24,loop:!0,autoplay:{delay:5e3,disableOnInteraction:!1},pagination:{el:".swiper-pagination",clickable:!0},breakpoints:{768:{slidesPerView:2},1024:{slidesPerView:3}}}))}catch(s){console.error("[HomePage] Controller initialization error:",s)}});
