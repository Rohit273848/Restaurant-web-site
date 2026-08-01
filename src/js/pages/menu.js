/**
 * Culinary Menu Page Controller
 * Handles Live Search, Category Tabs Filtering, Dietary Flags Filter, & Dish Detail Modals
 */

import { $, $$, delegate } from '../core/domHelpers.js';
import { getMenuData, getRestaurantData } from '../core/dataLoader.js';
import { renderFoodCard } from '../components/FoodCard.js';
import { openFoodModal } from '../components/FoodModal.js';

document.addEventListener('DOMContentLoaded', async () => {
  if (!$('#menu-page-identifier')) return;

  try {
    const restaurantData = await getRestaurantData();
    const currency = restaurantData?.brand?.currencySymbol || '$';

    const menuData = await getMenuData();
    if (!menuData) return;

    const catalogContainer = $('#menu-catalog-container');
    const searchInput = $('#menu-search-input');
    const categoryTabsContainer = $('#menu-category-tabs');
    const dietaryFilterCheckboxes = $$('.dietary-filter-checkbox');
    const resultCountText = $('#menu-result-count');

    let currentCategoryId = 'all';
    let searchQuery = '';
    let activeDietaryFilters = {
      vegan: false,
      vegetarian: false,
      glutenFree: false
    };

    // Main Filter & Render Logic
    const renderCatalog = () => {
      let items = menuData.items;

      // 1. Category Filter
      if (currentCategoryId !== 'all') {
        items = items.filter(item => item.categoryId === currentCategoryId);
      }

      // 2. Search Query Filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        items = items.filter(item => 
          item.title.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query)
        );
      }

      // 3. Dietary Filter
      if (activeDietaryFilters.vegan) {
        items = items.filter(item => item.dietary && item.dietary.isVegan);
      }
      if (activeDietaryFilters.vegetarian) {
        items = items.filter(item => item.dietary && (item.dietary.isVegetarian || item.dietary.isVegan));
      }
      if (activeDietaryFilters.glutenFree) {
        items = items.filter(item => item.dietary && item.dietary.isGlutenFree);
      }

      // Update Counter
      if (resultCountText) {
        resultCountText.textContent = `Showing ${items.length} of ${menuData.items.length} items`;
      }

      // Render Items
      if (items.length === 0) {
        catalogContainer.innerHTML = `
          <div class="col-span-full text-center py-16 px-4 bg-brand-dark-card rounded-2xl border border-brand-dark-border">
            <svg class="w-12 h-12 text-brand-gold mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <h3 class="font-serif text-2xl font-bold text-slate-200 mb-2">No culinary items found</h3>
            <p class="text-slate-400 text-sm max-w-md mx-auto">Try adjusting your search query or removing dietary filters to view our full menu options.</p>
          </div>
        `;
      } else {
        catalogContainer.innerHTML = items.map(dish => renderFoodCard(dish, currency)).join('');
      }
    };

    // Initial Catalog Render
    renderCatalog();

    // Category Tabs Listener
    if (categoryTabsContainer) {
      delegate(categoryTabsContainer, 'click', '.category-tab-btn', (e, target) => {
        $$('.category-tab-btn', categoryTabsContainer).forEach(btn => {
          btn.classList.remove('bg-brand-gold', 'text-slate-950');
          btn.classList.add('bg-brand-dark-card', 'text-slate-300', 'border', 'border-brand-dark-border');
        });

        target.classList.remove('bg-brand-dark-card', 'text-slate-300', 'border', 'border-brand-dark-border');
        target.classList.add('bg-brand-gold', 'text-slate-950');

        currentCategoryId = target.dataset.category || 'all';
        renderCatalog();
      });
    }

    // Live Search Input Listener
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderCatalog();
      });
    }

    // Dietary Checkbox Listeners
    dietaryFilterCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const filterType = checkbox.dataset.filter;
        if (filterType && activeDietaryFilters.hasOwnProperty(filterType)) {
          activeDietaryFilters[filterType] = checkbox.checked;
          renderCatalog();
        }
      });
    });

    // Delegate Dish Card Click -> Open Modal Dialog
    if (catalogContainer) {
      delegate(catalogContainer, 'click', '.food-card', (e, target) => {
        const dishId = target.dataset.dishId;
        const dish = menuData.items.find(item => item.id === dishId);
        if (dish) openFoodModal(dish, currency);
      });
    }

  } catch (err) {
    console.error('[MenuPage] Controller initialization error:', err);
  }
});
