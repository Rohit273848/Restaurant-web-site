import restaurantData from '../../data/restaurant.json';
import menuData from '../../data/menu.json';
import testimonialsData from '../../data/testimonials.json';
import galleryData from '../../data/gallery.json';
import faqData from '../../data/faq.json';

/**
 * Data Loader Utility
 * Centralized fetch manager with in-memory caching for JSON data resources
 */

const cache = new Map();

/**
 * Fetch and parse JSON resource with caching
 * @param {string} url - Relative or absolute URL to JSON file
 * @returns {Promise<any>} Parsed JSON payload
 */
export async function fetchJson(url) {
  if (cache.has(url)) {
    return cache.get(url);
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status} while fetching ${url}`);
    }
    const data = await response.json();
    cache.set(url, data);
    return data;
  } catch (error) {
    console.error(`[DataLoader] Failed to load resource from ${url}:`, error);
    throw error;
  }
}

/**
 * Load global restaurant information
 */
export async function getRestaurantData() {
  return restaurantData;
}

/**
 * Load culinary menu items and categories
 */
export async function getMenuData() {
  return menuData;
}

/**
 * Load customer testimonials
 */
export async function getTestimonialsData() {
  return testimonialsData;
}

/**
 * Load gallery items
 */
export async function getGalleryData() {
  return galleryData;
}

/**
 * Load FAQ items
 */
export async function getFaqData() {
  return faqData;
}
