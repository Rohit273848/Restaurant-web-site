/**
 * Home Page Controller
 */

import { $, $$, delegate } from '../core/domHelpers.js';
import { getMenuData, getTestimonialsData, getRestaurantData } from '../core/dataLoader.js';
import { renderFoodCard } from '../components/FoodCard.js';
import { openFoodModal } from '../components/FoodModal.js';
import { renderRatingStars } from '../components/RatingStars.js';

document.addEventListener('DOMContentLoaded', async () => {
  // Only execute on home page
  if (!$('#home-page-identifier')) return;

  try {
    const restaurantData = await getRestaurantData();
    const currency = restaurantData?.brand?.currencySymbol || '$';

    // 1. Hydration: Featured Menu Section
    const menuData = await getMenuData();
    const menuContainer = $('#featured-menu-grid');
    const categoryTabsContainer = $('#home-menu-tabs');

    if (menuData && menuContainer) {
      const renderCategoryDishes = (catId = 'starters') => {
        const filtered = menuData.items.filter(item => item.categoryId === catId || catId === 'all').slice(0, 6);
        menuContainer.innerHTML = filtered.map(dish => renderFoodCard(dish, currency)).join('');
      };

      // Initial Render
      renderCategoryDishes('starters');

      // Category Tabs Switching
      if (categoryTabsContainer) {
        delegate(categoryTabsContainer, 'click', '.tab-btn', (e, target) => {
          $$('.tab-btn', categoryTabsContainer).forEach(btn => {
            btn.classList.remove('bg-brand-gold', 'text-slate-950');
            btn.classList.add('bg-brand-dark-card', 'text-slate-300', 'border', 'border-brand-dark-border');
          });

          target.classList.remove('bg-brand-dark-card', 'text-slate-300', 'border', 'border-brand-dark-border');
          target.classList.add('bg-brand-gold', 'text-slate-950');

          const catId = target.dataset.category;
          renderCategoryDishes(catId);
        });
      }

      // Delegate Dish Click -> Open Modal
      delegate(menuContainer, 'click', '.food-card', (e, target) => {
        const dishId = target.dataset.dishId;
        const dish = menuData.items.find(item => item.id === dishId);
        if (dish) openFoodModal(dish, currency);
      });
    }

    // 2. Hydration: Testimonials Carousel
    const testimonialsData = await getTestimonialsData();
    const testimonialsWrapper = $('#testimonials-wrapper');

    if (testimonialsData && testimonialsWrapper) {
      testimonialsWrapper.innerHTML = testimonialsData.map(item => `
        <div class="swiper-slide h-auto">
          <div class="h-full p-8 bg-brand-dark-card border border-brand-dark-border/80 rounded-2xl flex flex-col justify-between shadow-dark-card">
            <div>
              <div class="mb-4">
                ${renderRatingStars(item.rating)}
              </div>
              <p class="text-slate-300 text-lg italic leading-relaxed mb-6 font-serif">
                "${item.comment}"
              </p>
            </div>
            <div class="flex items-center gap-4 pt-4 border-t border-brand-dark-border/60">
              <img src="${item.avatar}" alt="${item.name}" class="w-12 h-12 rounded-full object-cover border border-brand-gold/40" />
              <div>
                <h4 class="font-bold text-slate-100">${item.name}</h4>
                <p class="text-xs text-brand-gold">${item.designation}</p>
              </div>
            </div>
          </div>
        </div>
      `).join('');

      // Initialize Swiper Carousel if loaded
      if (window.Swiper) {
        new window.Swiper('#testimonials-swiper', {
          slidesPerView: 1,
          spaceBetween: 24,
          loop: true,
          autoplay: { delay: 5000, disableOnInteraction: false },
          pagination: { el: '.swiper-pagination', clickable: true },
          breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }
        });
      }
    }

  } catch (err) {
    console.error('[HomePage] Controller initialization error:', err);
  }
});
