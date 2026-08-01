/**
 * Utility Formatters
 */

/**
 * Format numeric value to currency string
 * @param {number} amount 
 * @param {string} symbol 
 * @returns {string}
 */
export function formatCurrency(amount, symbol = '$') {
  if (typeof amount !== 'number') return `${symbol}0.00`;
  return `${symbol}${amount.toFixed(2)}`;
}

/**
 * Format date object into readable string e.g. "Friday, October 24, 2026"
 * @param {Date|string} dateInput 
 * @returns {string}
 */
export function formatDate(dateInput) {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}
