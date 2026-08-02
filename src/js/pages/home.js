import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
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
    const currency = restaurantData?.brand?.currencySymbol || '₹';

    // 0. Initialize Hero Swiper
    const heroSwiperContainer = $('#hero-swiper');
    if (heroSwiperContainer) {
      const heroSwiper = new Swiper('#hero-swiper', {
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        parallax: true,
        loop: true,
        speed: 1000,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        },
        pagination: {
          el: '#hero-swiper .swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '#hero-swiper .swiper-button-next',
          prevEl: '#hero-swiper .swiper-button-prev',
        },
        keyboard: {
          enabled: true,
          onlyInViewport: false,
        },
        grabCursor: true,
      });

      // Ensure autoplay starts automatically
      if (heroSwiper.autoplay && !heroSwiper.autoplay.running) {
        heroSwiper.autoplay.start();
      }
    }

    // 1. Hydration: Customer Favorites Showcase Section
    const menuData = await getMenuData();
    const menuContainer = $('#featured-menu-grid');

    if (menuData && menuContainer) {
      const favoriteDishIds = [
        'momo-kk-01', // Kurkure Momos
        'momo-pz-01', // Pizza Momos
        'momo-af-01', // Afghani Malai Momos
        'momo-sp-02', // Special Cheese Momos
        'momo-td-01', // Tandoori Momos
        'momo-sp-01'  // Cheese Chilli Momos
      ];

      const customerFavorites = favoriteDishIds
        .map(id => menuData.items.find(item => item.id === id))
        .filter(Boolean);

      // Render 6 Customer Favorites cards with Best Seller badges
      menuContainer.innerHTML = customerFavorites
        .map(dish => renderFoodCard(dish, { currencySymbol: currency, ctaText: 'Order Now' }))
        .join('');

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

      // Initialize Testimonials Swiper Carousel
      new Swiper('#testimonials-swiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        autoplay: { delay: 4000, disableOnInteraction: false },
        pagination: { el: '#testimonials-swiper .swiper-pagination', clickable: true },
        breakpoints: {
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }
      });
    }

  } catch (err) {
    console.error('[HomePage] Controller initialization error:', err);
  }
});
