/**
 * FoodCard Component Renderer & Architecture
 * Supports 5 variants: 'default', 'horizontal', 'compact', 'featured', 'premium'
 */

import { formatCurrency } from '../utils/formatters.js';
import { sanitize } from '../core/domHelpers.js';

/**
 * Render Rating Stars HTML
 * @param {number} rating - Rating score out of 5
 * @returns {string} HTML markup for rating stars
 */
function renderRating(rating = 5.0) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  let starsHtml = '';

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      starsHtml += `<svg class="w-3.5 h-3.5 text-brand-gold fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
    } else if (i === fullStars && hasHalf) {
      starsHtml += `<svg class="w-3.5 h-3.5 text-brand-gold fill-current opacity-70" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
    } else {
      starsHtml += `<svg class="w-3.5 h-3.5 text-slate-600 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;
    }
  }

  return `<div class="flex items-center gap-1">${starsHtml} <span class="text-xs font-bold text-slate-300 ml-1">${rating.toFixed(1)}</span></div>`;
}

/**
 * Render Spice Level Chili Indicators
 * @param {number} level - Spice level (1 to 3)
 * @returns {string} HTML markup for spice level
 */
function renderSpiceLevel(level = 0) {
  if (!level || level <= 0) return '';
  let chilis = '';
  for (let i = 0; i < level; i++) {
    chilis += `<span title="Spice Level ${level}">🌶️</span>`;
  }
  return `<span class="text-xs flex items-center gap-0.5 ml-2" aria-label="Spice level ${level} of 3">${chilis}</span>`;
}

/**
 * Render Primary FoodCard Component
 * @param {Object} dish - Dish item data
 * @param {Object|string} optionsOrCurrency - Configuration options or currency symbol string for backward compatibility
 * @returns {string} HTML markup string
 */
export function renderFoodCard(dish, optionsOrCurrency = '$') {
  if (!dish) return '';

  // Options normalization & backward compatibility
  const opts = typeof optionsOrCurrency === 'string'
    ? { currencySymbol: optionsOrCurrency, variant: 'default' }
    : { currencySymbol: '$', variant: 'default', showRating: true, showBadges: true, ctaText: 'Details', ...optionsOrCurrency };

  const {
    id,
    title = 'Untitled Dish',
    description = '',
    price = 0,
    image = '',
    tags = [],
    dietary = {},
    rating = 4.9,
    spiceLevel = 0,
    isAvailable = true,
    availability = 'in-stock',
    categoryName = ''
  } = dish;

  const isSoldOut = !isAvailable || availability === 'sold-out';
  const currencySymbol = opts.currencySymbol || '$';
  const fallbackImage = 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80';
  const dishImage = image || fallbackImage;

  // Build Badges
  let badgesHtml = '';
  if (opts.showBadges !== false) {
    if (tags.includes('best-seller')) {
      badgesHtml += `<span class="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 rounded-full shadow-sm font-sans">Best Seller</span>`;
    } else if (tags.includes('chef-special')) {
      badgesHtml += `<span class="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-brand-gold/90 text-slate-950 rounded-full shadow-sm font-sans">Chef's Special</span>`;
    } else if (tags.includes('popular')) {
      badgesHtml += `<span class="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-amber-500/90 text-slate-950 rounded-full shadow-sm font-sans">Popular</span>`;
    }
  }

  // Build Dietary Tags
  let dietaryHtml = '';
  if (dietary.isVegan) {
    dietaryHtml += `<span class="text-xs px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 dark:bg-emerald-950/80 dark:border-emerald-500/30 dark:text-emerald-400 font-medium">Vegan</span>`;
  } else if (dietary.isVegetarian) {
    dietaryHtml += `<span class="text-xs px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-600 dark:bg-emerald-950/80 dark:border-emerald-500/30 dark:text-emerald-300 font-medium">Vegetarian</span>`;
  }
  if (dietary.isGlutenFree) {
    dietaryHtml += `<span class="text-xs px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-700 dark:bg-amber-950/80 dark:border-amber-500/30 dark:text-amber-300 font-medium">GF</span>`;
  }

  // Sold out overlay markup
  const soldOutBadge = isSoldOut 
    ? `<div class="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center z-20"><span class="px-3 py-1.5 bg-red-950 border border-red-500/50 text-red-300 font-bold text-xs uppercase tracking-widest rounded-md">Sold Out</span></div>` 
    : '';

  // -------------------------------------------------------------
  // VARIANT 1: COMPACT CARD
  // -------------------------------------------------------------
  if (opts.variant === 'compact') {
    return `
      <article class="food-card food-card-compact flex items-center gap-4 p-3 bg-white border border-neutral-200 dark:bg-brand-dark-card dark:border-brand-dark-border rounded-xl shadow-md dark:shadow-dark-card hover:border-amber-500/50 dark:hover:border-brand-gold/50 transition-all cursor-pointer group relative ${isSoldOut ? 'opacity-60' : ''}" data-dish-id="${sanitize(id)}">
        <div class="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-900">
          <img src="${sanitize(dishImage)}" alt="${sanitize(title)}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          ${isSoldOut ? soldOutBadge : ''}
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="font-serif text-base font-bold text-neutral-900 dark:text-slate-100 group-hover:text-amber-500 dark:group-hover:text-brand-gold transition-colors truncate mb-0.5">${sanitize(title)}</h4>
          <span class="text-xs font-serif font-bold text-amber-600 dark:text-brand-gold">${formatCurrency(price, currencySymbol)}</span>
        </div>
        <span class="text-amber-600 dark:text-brand-gold group-hover:translate-x-1 transition-transform">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </span>
      </article>
    `;
  }

  // -------------------------------------------------------------
  // VARIANT 2: HORIZONTAL CARD
  // -------------------------------------------------------------
  if (opts.variant === 'horizontal') {
    return `
      <article class="food-card food-card-horizontal flex flex-col sm:flex-row bg-white border border-neutral-200 dark:bg-brand-dark-card dark:border-brand-dark-border rounded-3xl dark:rounded-xl overflow-hidden shadow-lg dark:shadow-dark-card hover:shadow-xl dark:hover:border-brand-gold/60 transition-all cursor-pointer group relative ${isSoldOut ? 'opacity-60' : ''}" data-dish-id="${sanitize(id)}">
        <div class="relative sm:w-56 shrink-0 aspect-[4/3] sm:aspect-auto bg-slate-100 dark:bg-slate-900">
          <img src="${sanitize(dishImage)}" alt="${sanitize(title)}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute top-3 left-3 flex flex-wrap gap-1 z-10">${badgesHtml}</div>
          ${soldOutBadge}
        </div>
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-start justify-between gap-3 mb-2">
              <h3 class="font-serif text-xl font-bold text-neutral-900 dark:text-slate-100 group-hover:text-amber-500 dark:group-hover:text-brand-gold transition-colors">${sanitize(title)}</h3>
              <span class="px-3 py-1 bg-white border border-neutral-200 rounded-full text-sm font-bold text-amber-600 font-serif shrink-0 dark:bg-slate-950/90 dark:border-brand-gold/40 dark:text-brand-gold">${formatCurrency(price, currencySymbol)}</span>
            </div>
            <p class="text-sm text-neutral-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">${sanitize(description)}</p>
          </div>
          <div class="pt-3 border-t border-neutral-200 dark:border-brand-dark-border/60 flex items-center justify-between">
            <div class="flex items-center gap-2">${dietaryHtml} ${renderSpiceLevel(spiceLevel)}</div>
            <span class="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-brand-gold group-hover:translate-x-1 transition-transform">${opts.ctaText || 'Details'} &rarr;</span>
          </div>
        </div>
      </article>
    `;
  }

  // -------------------------------------------------------------
  // VARIANT 3: FEATURED SHOWCASE CARD
  // -------------------------------------------------------------
  if (opts.variant === 'featured') {
    return `
      <article class="food-card food-card-featured grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 bg-white border border-neutral-200 dark:bg-brand-dark-card dark:border-brand-gold/40 rounded-3xl dark:rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-gold-glow/10 group cursor-pointer relative ${isSoldOut ? 'opacity-60' : ''}" data-dish-id="${sanitize(id)}">
        <div class="lg:col-span-7 relative rounded-xl overflow-hidden aspect-[16/10] bg-slate-100 dark:bg-slate-900">
          <img src="${sanitize(dishImage)}" alt="${sanitize(title)}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div class="absolute top-4 left-4 z-10 flex gap-2">${badgesHtml}</div>
          <div class="absolute bottom-4 right-4 z-10 px-4 py-1.5 bg-white border border-neutral-200 backdrop-blur-md rounded-full text-base font-bold text-amber-600 font-serif dark:bg-slate-950/90 dark:border-brand-gold/50 dark:text-brand-gold">${formatCurrency(price, currencySymbol)}</div>
          ${soldOutBadge}
        </div>
        <div class="lg:col-span-5 flex flex-col justify-between py-2">
          <div>
            <div class="mb-3">${renderRating(rating)}</div>
            <h3 class="font-serif text-2xl font-bold text-neutral-900 dark:text-slate-100 mb-3 group-hover:text-amber-500 dark:group-hover:text-brand-gold transition-colors">${sanitize(title)}</h3>
            <p class="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed font-light mb-6">${sanitize(description)}</p>
          </div>
          <div class="pt-4 border-t border-neutral-200 dark:border-brand-dark-border/80 flex items-center justify-between">
            <div class="flex items-center gap-2">${dietaryHtml} ${renderSpiceLevel(spiceLevel)}</div>
            <span class="btn-primary text-xs py-2.5 px-5">${opts.ctaText || 'View Creation'}</span>
          </div>
        </div>
      </article>
    `;
  }

  // -------------------------------------------------------------
  // VARIANT 4: PREMIUM LUXURY CARD
  // -------------------------------------------------------------
  if (opts.variant === 'premium') {
    return `
      <article class="food-card food-card-premium relative bg-gradient-to-b from-amber-500/10 via-white to-white border border-neutral-200 dark:from-brand-gold/20 dark:via-brand-dark-card dark:to-brand-dark-card dark:border-brand-gold/50 rounded-3xl dark:rounded-2xl overflow-hidden shadow-lg dark:shadow-gold-glow/20 group cursor-pointer flex flex-col ${isSoldOut ? 'opacity-60' : ''}" data-dish-id="${sanitize(id)}">
        <div class="relative overflow-hidden aspect-[4/3] bg-slate-100 dark:bg-slate-900">
          <img src="${sanitize(dishImage)}" alt="${sanitize(title)}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent dark:from-brand-dark opacity-80"></div>
          <div class="absolute top-3 left-3 z-10 flex gap-1">${badgesHtml}</div>
          <div class="absolute bottom-3 right-3 z-10 px-3.5 py-1 bg-amber-500 dark:bg-brand-gold text-black dark:text-slate-950 font-serif font-bold text-base rounded-full shadow-md dark:shadow-gold-glow">${formatCurrency(price, currencySymbol)}</div>
          ${soldOutBadge}
        </div>
        <div class="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-[10px] uppercase font-bold tracking-widest text-amber-600 dark:text-brand-gold font-sans">${sanitize(categoryName || 'Signature')}</span>
              ${renderRating(rating)}
            </div>
            <h3 class="font-serif text-xl font-bold text-neutral-900 dark:text-slate-100 group-hover:text-amber-500 dark:group-hover:text-brand-gold transition-colors mb-2">${sanitize(title)}</h3>
            <p class="text-sm text-neutral-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4 font-light">${sanitize(description)}</p>
          </div>
          <div class="pt-3 border-t border-neutral-200 dark:border-brand-dark-border/60 flex items-center justify-between">
            <div class="flex items-center gap-1.5">${dietaryHtml}</div>
            <span class="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-brand-gold group-hover:translate-x-1 transition-transform">${opts.ctaText || 'Pairing Details'} &rarr;</span>
          </div>
        </div>
      </article>
    `;
  }

  // -------------------------------------------------------------
  // VARIANT 5: DEFAULT VERTICAL CARD
  // -------------------------------------------------------------
  return `
    <article class="food-card cursor-pointer group flex flex-col bg-white border border-neutral-200 dark:bg-brand-dark-card dark:border-brand-dark-border rounded-3xl dark:rounded-xl overflow-hidden shadow-lg dark:shadow-dark-card hover:shadow-xl dark:hover:border-brand-gold/60 transition-all duration-300 ${isSoldOut ? 'opacity-60' : ''}" data-dish-id="${sanitize(id)}">
      <div class="relative overflow-hidden aspect-[4/3] bg-slate-100 dark:bg-slate-900">
        <img 
          src="${sanitize(dishImage)}" 
          alt="${sanitize(title)}" 
          loading="lazy" 
          width="400"
          height="300"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent dark:from-slate-950/80 opacity-60"></div>
        <div class="absolute top-3 left-3 flex flex-wrap gap-1 z-10">
          ${badgesHtml}
        </div>
        <div class="absolute bottom-3 right-3 z-10">
          <span class="px-3 py-1 bg-white border border-neutral-200 dark:bg-slate-950/90 dark:border-brand-gold/40 backdrop-blur-md rounded-full text-sm font-bold text-amber-600 dark:text-brand-gold font-serif">
            ${formatCurrency(price, currencySymbol)}
          </span>
        </div>
        ${soldOutBadge}
      </div>

      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-start justify-between gap-2 mb-2">
            <h3 class="font-serif text-xl font-bold text-neutral-900 dark:text-slate-100 group-hover:text-amber-500 dark:group-hover:text-brand-gold transition-colors duration-200">
              ${sanitize(title)}
            </h3>
          </div>
          <p class="text-sm text-neutral-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
            ${sanitize(description)}
          </p>
        </div>

        <div class="pt-3 border-t border-neutral-200 dark:border-brand-dark-border/60 flex items-center justify-between">
          <div class="flex items-center gap-1.5 flex-wrap">
            ${dietaryHtml}
            ${renderSpiceLevel(spiceLevel)}
          </div>
          <span class="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-brand-gold group-hover:translate-x-1 transition-transform duration-200">
            ${opts.ctaText || 'Details'}
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </span>
        </div>
      </div>
    </article>
  `;
}

/**
 * Render FoodCard Animated Loading Skeleton
 * @param {'default' | 'horizontal' | 'compact' | 'featured'} variant
 * @returns {string} HTML markup string for skeleton loader
 */
export function renderFoodCardSkeleton(variant = 'default') {
  if (variant === 'compact') {
    return `
      <div class="flex items-center gap-4 p-3 bg-brand-dark-card border border-brand-dark-border rounded-xl animate-pulse">
        <div class="w-16 h-16 rounded-lg bg-slate-800 shrink-0"></div>
        <div class="flex-1 space-y-2">
          <div class="h-4 bg-slate-800 rounded w-3/4"></div>
          <div class="h-3 bg-slate-800 rounded w-1/4"></div>
        </div>
      </div>
    `;
  }

  return `
    <div class="bg-brand-dark-card border border-brand-dark-border rounded-xl overflow-hidden animate-pulse flex flex-col">
      <div class="aspect-[4/3] bg-slate-800"></div>
      <div class="p-5 flex-1 space-y-3">
        <div class="h-5 bg-slate-800 rounded w-2/3"></div>
        <div class="h-4 bg-slate-800 rounded w-full"></div>
        <div class="h-4 bg-slate-800 rounded w-4/5"></div>
        <div class="pt-4 border-t border-brand-dark-border/60 flex items-center justify-between">
          <div class="h-4 bg-slate-800 rounded w-1/3"></div>
          <div class="h-4 bg-slate-800 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  `;
}
