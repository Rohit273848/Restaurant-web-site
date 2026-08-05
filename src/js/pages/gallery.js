/**
 * Gallery Page Controller
 * Category filter tabs & Accessible Interactive Lightbox Viewer
 */

import { $, $$, delegate } from '../core/domHelpers.js';
import { getGalleryData } from '../core/dataLoader.js';

document.addEventListener('DOMContentLoaded', async () => {
  if (!$('#gallery-page-identifier')) return;

  try {
    const galleryData = await getGalleryData();
    if (!galleryData) return;

    const gridContainer = $('#gallery-grid-container');
    const filterTabsContainer = $('#gallery-filter-tabs');
    const lightboxModal = $('#lightbox-modal');
    const lightboxImg = $('#lightbox-img');
    const lightboxTitle = $('#lightbox-title');
    const lightboxCaption = $('#lightbox-caption');
    const lightboxClose = $('#lightbox-close');
    const lightboxPrev = $('#lightbox-prev');
    const lightboxNext = $('#lightbox-next');

    let currentCategory = 'all';
    let filteredItems = [];
    let currentImageIndex = 0;

    const renderGrid = () => {
      filteredItems = currentCategory === 'all' 
        ? galleryData 
        : galleryData.filter(item => item.category === currentCategory);

      if (filteredItems.length === 0) {
        gridContainer.innerHTML = `
          <div class="col-span-full text-center py-16 px-4 bg-brand-dark-card rounded-2xl border border-brand-dark-border">
            <svg class="w-12 h-12 text-brand-gold mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            <h3 class="font-serif text-2xl font-bold text-slate-200 mb-2">No photos found</h3>
            <p class="text-slate-400 text-sm max-w-md mx-auto">Try selecting another category to view our restaurant gallery.</p>
          </div>
        `;
        return;
      }

      gridContainer.innerHTML = filteredItems.map((item, index) => `
        <article 
          class="gallery-item group relative overflow-hidden rounded-xl bg-slate-900 border border-brand-dark-border hover:border-brand-gold/60 transition-all duration-300 cursor-pointer aspect-[4/3] shadow-dark-card" 
          data-index="${index}" 
          data-id="${item.id}"
          tabindex="0"
          role="button"
          aria-label="View ${item.title} image in full size"
        >
          <img 
            src="${item.image}" 
            alt="${item.alt || item.title}" 
            loading="lazy"
            width="600"
            height="450"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 backdrop-blur-[2px]">
            <div class="flex items-center justify-between mb-1">
              <span class="text-[10px] uppercase font-bold tracking-widest text-brand-gold bg-brand-gold/10 px-2.5 py-0.5 rounded border border-brand-gold/30">${item.category}</span>
              <div class="w-8 h-8 rounded-full bg-slate-950/80 border border-brand-gold/40 flex items-center justify-center text-brand-gold">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"/></svg>
              </div>
            </div>
            <h3 class="font-serif text-xl font-bold text-slate-100">${item.title}</h3>
            <p class="text-xs text-slate-300 mt-1 line-clamp-1 font-light">${item.caption}</p>
          </div>
        </article>
      `).join('');
    };

    renderGrid();

    // Category Tabs Listener
    if (filterTabsContainer) {
      delegate(filterTabsContainer, 'click', '.gallery-tab-btn', (e, target) => {
        $$('.gallery-tab-btn', filterTabsContainer).forEach(btn => {
          btn.classList.remove('bg-amber-500', 'dark:bg-brand-gold', 'text-black', 'dark:text-slate-950', 'shadow-gold-glow');
          btn.classList.add('bg-white', 'dark:bg-brand-dark-card', 'text-neutral-800', 'dark:text-slate-300', 'border', 'border-neutral-200', 'dark:border-brand-dark-border');
          btn.setAttribute('aria-selected', 'false');
        });

        target.classList.remove('bg-white', 'dark:bg-brand-dark-card', 'text-neutral-800', 'dark:text-slate-300', 'border', 'border-neutral-200', 'dark:border-brand-dark-border');
        target.classList.add('bg-amber-500', 'dark:bg-brand-gold', 'text-black', 'dark:text-slate-950', 'shadow-gold-glow');
        target.setAttribute('aria-selected', 'true');

        currentCategory = target.dataset.category || 'all';
        renderGrid();
      });
    }

    // Lightbox Update Helper
    const updateLightboxItem = (index) => {
      if (index < 0) index = filteredItems.length - 1;
      if (index >= filteredItems.length) index = 0;

      currentImageIndex = index;
      const item = filteredItems[currentImageIndex];
      if (item) {
        lightboxImg.src = item.image;
        lightboxImg.alt = item.alt || item.title;
        if (lightboxTitle) lightboxTitle.textContent = item.title;
        if (lightboxCaption) lightboxCaption.textContent = item.caption;
      }
    };

    const openLightbox = (index) => {
      updateLightboxItem(index);
      lightboxModal.classList.remove('hidden');
      lightboxModal.classList.add('flex');
      document.body.classList.add('overflow-hidden');
    };

    const closeLightbox = () => {
      lightboxModal.classList.add('hidden');
      lightboxModal.classList.remove('flex');
      document.body.classList.remove('overflow-hidden');
    };

    // Grid Click -> Open Lightbox
    if (gridContainer && lightboxModal) {
      delegate(gridContainer, 'click', '.gallery-item', (e, target) => {
        const index = parseInt(target.dataset.index, 10);
        if (!isNaN(index)) openLightbox(index);
      });

      // Keyboard enter on focused grid items
      delegate(gridContainer, 'keydown', '.gallery-item', (e, target) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const index = parseInt(target.dataset.index, 10);
          if (!isNaN(index)) openLightbox(index);
        }
      });

      // Controls
      if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
      if (lightboxPrev) lightboxPrev.addEventListener('click', () => updateLightboxItem(currentImageIndex - 1));
      if (lightboxNext) lightboxNext.addEventListener('click', () => updateLightboxItem(currentImageIndex + 1));

      lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) closeLightbox();
      });

      // Global Keyboard Event Listener for Lightbox
      document.addEventListener('keydown', (e) => {
        if (lightboxModal.classList.contains('hidden')) return;

        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowLeft') {
          updateLightboxItem(currentImageIndex - 1);
        } else if (e.key === 'ArrowRight') {
          updateLightboxItem(currentImageIndex + 1);
        }
      });
    }

  } catch (err) {
    console.error('[GalleryPage] Controller initialization error:', err);
  }
});

