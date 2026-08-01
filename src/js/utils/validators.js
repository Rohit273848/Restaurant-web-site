/**
 * Form Input Validators
 */

/**
 * Validate email string
 * @param {string} email 
 * @returns {boolean}
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(String(email).toLowerCase());
}

/**
 * Validate phone number format
 * @param {string} phone 
 * @returns {boolean}
 */
export function isValidPhone(phone) {
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return phoneRegex.test(String(phone).trim());
}

/**
 * Validate required text string non-empty
 * @param {string} text 
 * @returns {boolean}
 */
export function isNotEmpty(text) {
  return typeof text === 'string' && text.trim().length > 0;
}
