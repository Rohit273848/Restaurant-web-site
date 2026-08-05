/**
 * Main Application Global Entry Point
 */

import { initTheme } from './core/themeManager.js';
import { initHeader } from './components/Header.js';
import { initContactModal } from './core/contactModalManager.jsx';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Initialize Dynamic Branding CSS Tokens
  await initTheme();

  // 2. Initialize Header & Mobile Drawer
  await initHeader();

  // 3. Initialize Global Contact Modal System
  initContactModal();

  // 4. Dynamic Lucide Icon SVG Hydration (if Lucide library is present)
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 5. Initialize AOS (Animate On Scroll) if loaded
  if (window.AOS) {
    window.AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  }
});
