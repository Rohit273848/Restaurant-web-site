/**
 * Food Dish Modal Viewer Component
 */

import { $, sanitize, createElementFromHTML } from '../core/domHelpers.js';
import { formatCurrency } from '../utils/formatters.js';

let modalElement = null;

function ensureModal() {
  if (!modalElement) {
    modalElement = createElementFromHTML(`
      <div id="dish-modal" class="modal-backdrop" aria-hidden="true" role="dialog">
        <div class="relative w-full max-w-2xl bg-brand-dark-card border border-brand-dark-border rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 scale-95 opacity-0 modal-content">
          <button id="modal-close-btn" class="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/70 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-900 transition-colors" aria-label="Close modal">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          <div id="modal-body"></div>
        </div>
      </div>
    `);
    document.body.appendChild(modalElement);

    const closeBtn = $('#modal-close-btn', modalElement);
    closeBtn.addEventListener('click', closeModal);
    modalElement.addEventListener('click', (e) => {
      if (e.target === modalElement) closeModal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalElement.classList.contains('active')) {
        closeModal();
      }
    });
  }
}

export function openFoodModal(dish, currencySymbol = '$') {
  ensureModal();

  const { title, description, price, image, tags = [], dietary = {} } = dish;
  const modalBody = $('#modal-body', modalElement);
  const modalContent = $('.modal-content', modalElement);

  let badges = '';
  if (tags.includes('chef-special')) badges += `<span class="px-3 py-1 text-xs font-bold bg-brand-gold text-slate-950 rounded-full">Chef's Signature</span>`;
  if (tags.includes('popular')) badges += `<span class="px-3 py-1 text-xs font-bold bg-amber-500 text-slate-950 rounded-full">Popular Favorite</span>`;

  let dietaryInfo = '';
  if (dietary.isVegan) dietaryInfo += `<span class="px-2.5 py-1 text-xs font-medium rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300">100% Vegan</span>`;
  if (dietary.isVegetarian) dietaryInfo += `<span class="px-2.5 py-1 text-xs font-medium rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300">Vegetarian</span>`;
  if (dietary.isGlutenFree) dietaryInfo += `<span class="px-2.5 py-1 text-xs font-medium rounded bg-amber-950 border border-amber-500/40 text-amber-300">Gluten Free</span>`;
  if (dietary.containsNuts) dietaryInfo += `<span class="px-2.5 py-1 text-xs font-medium rounded bg-rose-950 border border-rose-500/40 text-rose-300">Contains Nuts</span>`;

  modalBody.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2">
      <div class="relative h-64 md:h-full bg-slate-900">
        <img src="${sanitize(image)}" alt="${sanitize(title)}" class="w-full h-full object-cover"/>
      </div>
      <div class="p-6 md:p-8 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 mb-3">
            ${badges}
          </div>
          <h2 class="font-serif text-2xl md:text-3xl font-bold text-slate-100 mb-2">${sanitize(title)}</h2>
          <p class="text-2xl font-bold text-brand-gold mb-4">${formatCurrency(price, currencySymbol)}</p>
          <p class="text-sm text-slate-300 leading-relaxed mb-6">${sanitize(description)}</p>
          
          <div class="mb-6">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Dietary Notes</h4>
            <div class="flex flex-wrap gap-2">
              ${dietaryInfo || '<span class="text-xs text-slate-500">Standard prep</span>'}
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-brand-dark-border flex items-center justify-between gap-4">
          <a href="contact.html" class="btn-primary w-full text-center text-sm py-3">
            Contact & Location Details
          </a>
        </div>
      </div>
    </div>
  `;

  modalElement.classList.add('active');
  modalElement.setAttribute('aria-hidden', 'false');
  document.body.classList.add('overflow-hidden');

  requestAnimationFrame(() => {
    modalContent.classList.remove('scale-95', 'opacity-0');
    modalContent.classList.add('scale-100', 'opacity-100');
  });
}

export function closeModal() {
  if (!modalElement) return;
  const modalContent = $('.modal-content', modalElement);
  modalContent.classList.remove('scale-100', 'opacity-100');
  modalContent.classList.add('scale-95', 'opacity-0');

  setTimeout(() => {
    modalElement.classList.remove('active');
    modalElement.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('overflow-hidden');
  }, 250);
}
