/**
 * FoodCard Component Renderer
 */

import { formatCurrency } from '../utils/formatters.js';
import { sanitize } from '../core/domHelpers.js';

/**
 * Render HTML string for a food card item
 * @param {Object} dish - Dish item object from menu.json
 * @param {string} currencySymbol
 * @returns {string} HTML markup string
 */
export function renderFoodCard(dish, currencySymbol = '$') {
  const { id, title, description, price, image, tags = [], dietary = {} } = dish;

  // Build Badges HTML
  let badgesHtml = '';
  if (tags.includes('chef-special')) {
    badgesHtml += `<span class="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-brand-gold/90 text-slate-950 rounded-full shadow-sm">Chef's Special</span>`;
  } else if (tags.includes('popular')) {
    badgesHtml += `<span class="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-amber-500/90 text-slate-950 rounded-full shadow-sm">Popular</span>`;
  }

  // Build Dietary Tags
  let dietaryHtml = '';
  if (dietary.isVegan) {
    dietaryHtml += `<span class="text-xs px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-medium">Vegan</span>`;
  } else if (dietary.isVegetarian) {
    dietaryHtml += `<span class="text-xs px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-medium">Vegetarian</span>`;
  }

  if (dietary.isGlutenFree) {
    dietaryHtml += `<span class="text-xs px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/30 text-amber-300 font-medium">GF</span>`;
  }

  return `
    <article class="food-card cursor-pointer group" data-dish-id="${sanitize(id)}">
      <div class="relative overflow-hidden aspect-[4/3] bg-slate-900">
        <img 
          src="${sanitize(image)}" 
          alt="${sanitize(title)}" 
          loading="lazy" 
          width="400"
          height="300"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60"></div>
        <div class="absolute top-3 left-3 flex flex-wrap gap-1 z-10">
          ${badgesHtml}
        </div>
        <div class="absolute bottom-3 right-3 z-10">
          <span class="px-3 py-1 bg-slate-950/90 border border-brand-gold/40 backdrop-blur-md rounded-full text-sm font-bold text-brand-gold">
            ${formatCurrency(price, currencySymbol)}
          </span>
        </div>
      </div>

      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-start justify-between gap-2 mb-2">
            <h3 class="font-serif text-xl font-bold text-slate-100 group-hover:text-brand-gold transition-colors duration-200">
              ${sanitize(title)}
            </h3>
          </div>
          <p class="text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">
            ${sanitize(description)}
          </p>
        </div>

        <div class="pt-3 border-t border-brand-dark-border/60 flex items-center justify-between">
          <div class="flex items-center gap-1.5 flex-wrap">
            ${dietaryHtml}
          </div>
          <span class="inline-flex items-center gap-1 text-xs font-semibold text-brand-gold group-hover:translate-x-1 transition-transform duration-200">
            Details
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </span>
        </div>
      </div>
    </article>
  `;
}
