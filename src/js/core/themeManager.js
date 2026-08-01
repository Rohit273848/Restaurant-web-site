/**
 * Theme Manager Utility
 * Dynamically applies branding colors from JSON config to CSS Custom Properties
 */

import { getRestaurantData } from './dataLoader.js';

export async function initTheme() {
  try {
    const data = await getRestaurantData();
    if (!data || !data.brand || !data.brand.theme) return;

    const { theme } = data.brand;
    const root = document.documentElement;

    if (theme.primaryColor) root.style.setProperty('--color-primary', theme.primaryColor);
    if (theme.primaryDark) root.style.setProperty('--color-primary-dark', theme.primaryDark);
    if (theme.darkBg) root.style.setProperty('--color-bg-dark', theme.darkBg);
    if (theme.accentColor) root.style.setProperty('--color-accent', theme.accentColor);

  } catch (err) {
    console.warn('[ThemeManager] Could not load custom theme tokens, using default CSS variables.', err);
  }
}
