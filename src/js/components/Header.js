/**
 * Header & Navigation System Component Architect
 * Modern, Accessible (WCAG 2.2 AA compliant), Sticky, Mobile Drawer Navigation Controller
 */

import { $, $$ } from '../core/domHelpers.js';
import { getRestaurantData } from '../core/dataLoader.js';

export async function initHeader() {
  const header = $('#site-header');
  const mobileToggle = $('#mobile-menu-toggle');
  const mobileDrawer = $('#mobile-menu-drawer');
  const drawerCloseBtn = $('#mobile-drawer-close');
  const drawerOverlay = $('#mobile-drawer-overlay');

  let lastFocusedElement = null;

  // 1. Hydrate Brand Details in Header & Navigation
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
    console.error('[Header] Error hydrating brand navigation details:', err);
  }

  // 2. Hardware-Accelerated Passive Sticky Elevation Listener
  if (header) {
    let ticking = false;

    const onScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('bg-brand-dark/95', 'backdrop-blur-md', 'border-b', 'border-brand-dark-border', 'py-3', 'shadow-lg');
        header.classList.remove('py-5', 'bg-transparent');
      } else {
        header.classList.remove('bg-brand-dark/95', 'backdrop-blur-md', 'border-b', 'border-brand-dark-border', 'py-3', 'shadow-lg');
        header.classList.add('py-5', 'bg-transparent');
      }
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });
  }

  // 3. Accessibility Focus Trap Helper for Mobile Drawer
  const getFocusableElements = (container) => {
    if (!container) return [];
    return Array.from(
      container.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')
    );
  };

  const handleKeydownTrap = (e) => {
    if (!mobileDrawer || mobileDrawer.classList.contains('pointer-events-none')) return;

    if (e.key === 'Escape') {
      closeDrawer();
      return;
    }

    if (e.key === 'Tab') {
      const focusables = getFocusableElements(mobileDrawer);
      if (focusables.length === 0) return;

      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
  };

  // 4. Mobile Drawer Open / Close Logic
  const openDrawer = () => {
    if (!mobileDrawer) return;
    lastFocusedElement = document.activeElement;

    mobileDrawer.classList.remove('translate-x-full', 'pointer-events-none');
    mobileDrawer.classList.add('translate-x-0');
    mobileDrawer.setAttribute('aria-hidden', 'false');

    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('overflow-hidden');

    document.addEventListener('keydown', handleKeydownTrap);

    // Focus close button or first link
    requestAnimationFrame(() => {
      if (drawerCloseBtn) drawerCloseBtn.focus();
    });
  };

  const closeDrawer = () => {
    if (!mobileDrawer || mobileDrawer.classList.contains('pointer-events-none')) return;

    mobileDrawer.classList.add('translate-x-full', 'pointer-events-none');
    mobileDrawer.classList.remove('translate-x-0');
    mobileDrawer.setAttribute('aria-hidden', 'true');

    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('overflow-hidden');

    document.removeEventListener('keydown', handleKeydownTrap);

    // Restore Focus
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  };

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  // Close drawer on link click
  const drawerLinks = $$('a', mobileDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // 5. Active Link Detection & ARIA Attribute Assignment
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = $$('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('text-brand-gold', 'font-semibold');
      link.classList.remove('text-slate-300');
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}
