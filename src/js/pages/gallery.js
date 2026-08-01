/**
 * Gallery Page Controller
 * Category filter tabs & Lightbox Viewer
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
    const lightboxCaption = $('#lightbox-caption');
    const lightboxClose = $('#lightbox-close');

    let currentCategory = 'all';

    const renderGrid = () => {
      const items = currentCategory === 'all' 
        ? galleryData 
        : galleryData.filter(item => item.category === currentCategory);

      gridContainer.innerHTML = items.map(item => `
        <div class="gallery-item group relative overflow-hidden rounded-xl bg-slate-900 border border-brand-dark-border cursor-pointer aspect-[4/3]" data-id="${item.id}">
          <img 
            src="${item.image}" 
            alt="${item.title}" 
            loading="lazy"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <span class="text-xs uppercase font-bold tracking-widest text-brand-gold mb-1">${item.category}</span>
            <h3 class="font-serif text-xl font-bold text-slate-100">${item.title}</h3>
            <p class="text-xs text-slate-300 mt-1 line-clamp-1">${item.caption}</p>
          </div>
        </div>
      `).join('');
    };

    renderGrid();

    // Filter Listeners
    if (filterTabsContainer) {
      delegate(filterTabsContainer, 'click', '.gallery-tab-btn', (e, target) => {
        $$('.gallery-tab-btn', filterTabsContainer).forEach(btn => {
          btn.classList.remove('bg-brand-gold', 'text-slate-950');
          btn.classList.add('bg-brand-dark-card', 'text-slate-300', 'border', 'border-brand-dark-border');
        });

        target.classList.remove('bg-brand-dark-card', 'text-slate-300', 'border', 'border-brand-dark-border');
        target.classList.add('bg-brand-gold', 'text-slate-950');

        currentCategory = target.dataset.category || 'all';
        renderGrid();
      });
    }

    // Lightbox Modal Logic
    if (gridContainer && lightboxModal) {
      delegate(gridContainer, 'click', '.gallery-item', (e, target) => {
        const itemId = target.dataset.id;
        const item = galleryData.find(g => g.id === itemId);
        if (item) {
          lightboxImg.src = item.image;
          lightboxCaption.textContent = `${item.title} — ${item.caption}`;
          lightboxModal.classList.remove('hidden');
          lightboxModal.classList.add('flex');
          document.body.classList.add('overflow-hidden');
        }
      });

      const closeLightbox = () => {
        lightboxModal.classList.add('hidden');
        lightboxModal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
      };

      if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
      lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) closeLightbox();
      });
    }

  } catch (err) {
    console.error('[GalleryPage] Controller initialization error:', err);
  }
});
