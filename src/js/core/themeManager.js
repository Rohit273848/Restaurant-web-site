/**
 * Theme Manager Utility
 * Dynamically applies branding colors from JSON config to CSS Custom Properties
 */

import { getRestaurantData } from './dataLoader.js';

export async function initTheme() {
  // 1. Read and apply saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  } else {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
  }

  try {
    const data = await getRestaurantData();
    if (!data || !data.brand || !data.brand.theme) return;

    const { theme } = data.brand;
    const root = document.documentElement;

    if (theme.primaryColor) root.style.setProperty('--color-primary', theme.primaryColor);
    if (theme.primaryDark) root.style.setProperty('--color-primary-dark', theme.primaryDark);
    // Only set background from config if we are in dark mode
    if (savedTheme === 'dark' && theme.darkBg) {
      root.style.setProperty('--color-bg-dark', theme.darkBg);
    }
    if (theme.accentColor) root.style.setProperty('--color-accent', theme.accentColor);

  } catch (err) {
    console.warn('[ThemeManager] Could not load custom theme tokens, using default CSS variables.', err);
  }
}
