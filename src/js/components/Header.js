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
        header.classList.add('top-2', 'py-2', 'bg-white/95', 'dark:bg-slate-950/95', 'shadow-md', 'dark:shadow-gold-glow/10');
        header.classList.remove('top-4', 'py-3.5', 'bg-white/90', 'dark:bg-slate-950/80', 'shadow-lg');
      } else {
        header.classList.remove('top-2', 'py-2', 'bg-white/95', 'dark:bg-slate-950/95', 'shadow-md', 'dark:shadow-gold-glow/10');
        header.classList.add('top-4', 'py-3.5', 'bg-white/90', 'dark:bg-slate-950/80', 'shadow-lg');
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
      link.classList.add('text-amber-500', 'dark:text-brand-gold', 'font-semibold');
      link.classList.remove('text-neutral-800', 'dark:text-slate-300');
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
      link.classList.add('text-neutral-800', 'dark:text-slate-300');
      link.classList.remove('text-amber-500', 'dark:text-brand-gold', 'font-semibold');
    }
  });

  // 6. Theme Toggle Handler
  const themeToggle = $('#theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.documentElement.classList.contains('light');
      const root = document.documentElement;
      if (isLight) {
        root.classList.remove('light');
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        getRestaurantData().then(data => {
          if (data && data.brand && data.brand.theme && data.brand.theme.darkBg) {
            root.style.setProperty('--color-bg-dark', data.brand.theme.darkBg);
          }
        }).catch(err => console.warn(err));
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
        localStorage.setItem('theme', 'light');
        root.style.removeProperty('--color-bg-dark');
      }
      
      // Update link styles immediately on theme toggle
      const currentPathVal = window.location.pathname.split('/').pop() || 'index.html';
      $$('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPathVal || (currentPathVal === '' && href === 'index.html')) {
          link.classList.add('text-amber-500', 'dark:text-brand-gold', 'font-semibold');
          link.classList.remove('text-neutral-800', 'dark:text-slate-300');
        } else {
          link.classList.add('text-neutral-800', 'dark:text-slate-300');
          link.classList.remove('text-amber-500', 'dark:text-brand-gold', 'font-semibold');
        }
      });
    });
  }
}
