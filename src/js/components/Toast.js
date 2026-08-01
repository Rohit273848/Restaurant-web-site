/**
 * Toast Notification Component
 */

import { $, createElementFromHTML } from '../core/domHelpers.js';

let toastContainer = null;

function ensureContainer() {
  if (!toastContainer) {
    toastContainer = createElementFromHTML(`
      <div id="toast-container" class="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm pointer-events-none"></div>
    `);
    document.body.appendChild(toastContainer);
  }
}

/**
 * Show Toast Alert Message
 * @param {string} message 
 * @param {'success'|'error'|'info'} type 
 * @param {number} duration 
 */
export function showToast(message, type = 'success', duration = 4000) {
  ensureContainer();

  const badgeColors = {
    success: 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200',
    error: 'bg-rose-950/90 border-rose-500/50 text-rose-200',
    info: 'bg-slate-900/90 border-brand-gold/50 text-brand-gold-light'
  };

  const icons = {
    success: `<svg class="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`,
    error: `<svg class="w-5 h-5 text-rose-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`,
    info: `<svg class="w-5 h-5 text-brand-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
  };

  const toastEl = createElementFromHTML(`
    <div class="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-md shadow-2xl transform transition-all duration-300 translate-y-4 opacity-0 ${badgeColors[type] || badgeColors.info}">
      ${icons[type] || icons.info}
      <p class="text-sm font-medium leading-snug">${message}</p>
    </div>
  `);

  toastContainer.appendChild(toastEl);

  // Trigger entering transition
  requestAnimationFrame(() => {
    toastEl.classList.remove('translate-y-4', 'opacity-0');
  });

  // Auto remove after duration
  setTimeout(() => {
    toastEl.classList.add('translate-y-4', 'opacity-0');
    setTimeout(() => toastEl.remove(), 300);
  }, duration);
}
