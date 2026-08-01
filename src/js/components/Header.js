/**
 * Header Component Logic & Mobile Drawer Controller
 */

import { $, $$ } from '../core/domHelpers.js';
import { getRestaurantData } from '../core/dataLoader.js';

export async function initHeader() {
  const header = $('#site-header');
  const mobileToggle = $('#mobile-menu-toggle');
  const mobileDrawer = $('#mobile-menu-drawer');
  const drawerCloseBtn = $('#mobile-drawer-close');
  const drawerOverlay = $('#mobile-drawer-overlay');

  // Hydrate Brand Details in Header
  try {
    const data = await getRestaurantData();
    if (data && data.brand) {
      const logoTexts = $$('.brand-name-text');
      logoTexts.forEach(el => el.textContent = data.brand.name);

      const phoneElements = $$('.brand-phone-text');
      phoneElements.forEach(el => {
        el.textContent = data.contact.phone;
        if (el.tagName === 'A') el.href = `tel:${data.contact.phone.replace(/[^0-9+]/g, '')}`;
      });
    }
  } catch (err) {
    console.error('[Header] Error hydrating brand header details:', err);
  }

  // Header Scroll Elevation Listener
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('bg-brand-dark/95', 'backdrop-blur-md', 'border-b', 'border-brand-dark-border', 'py-3', 'shadow-lg');
        header.classList.remove('py-5', 'bg-transparent');
      } else {
        header.classList.remove('bg-brand-dark/95', 'backdrop-blur-md', 'border-b', 'border-brand-dark-border', 'py-3', 'shadow-lg');
        header.classList.add('py-5', 'bg-transparent');
      }
    });
  }

  // Mobile Drawer Toggle Actions
  const openDrawer = () => {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('translate-x-full', 'pointer-events-none');
    mobileDrawer.classList.add('translate-x-0');
    document.body.classList.add('overflow-hidden');
  };

  const closeDrawer = () => {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('translate-x-full', 'pointer-events-none');
    mobileDrawer.classList.remove('translate-x-0');
    document.body.classList.remove('overflow-hidden');
  };

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  // Close drawer on link click
  const drawerLinks = $$('a', mobileDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // Highlight Active Page Link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = $$('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('text-brand-gold', 'font-semibold');
      link.classList.remove('text-slate-300');
    }
  });
}
