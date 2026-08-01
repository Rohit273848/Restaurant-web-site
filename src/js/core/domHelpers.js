/**
 * DOM Helper Utilities
 * Lightweight helper functions for clean DOM manipulation and sanitization
 */

/**
 * Select single DOM element
 * @param {string} selector 
 * @param {HTMLElement|Document} context 
 * @returns {HTMLElement|null}
 */
export function $(selector, context = document) {
  return context.querySelector(selector);
}

/**
 * Select all matching DOM elements
 * @param {string} selector 
 * @param {HTMLElement|Document} context 
 * @returns {HTMLElement[]}
 */
export function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

/**
 * Sanitize string to prevent XSS vulnerability when rendering dynamic user/data content
 * @param {string} str 
 * @returns {string}
 */
export function sanitize(str) {
  if (typeof str !== 'string') return '';
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
}

/**
 * Create element from HTML string template
 * @param {string} html 
 * @returns {HTMLElement}
 */
export function createElementFromHTML(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

/**
 * Add event listener with delegation support
 * @param {HTMLElement|Document} parent 
 * @param {string} eventType 
 * @param {string} selector 
 * @param {Function} handler 
 */
export function delegate(parent, eventType, selector, handler) {
  parent.addEventListener(eventType, (event) => {
    const targetElement = event.target.closest(selector);
    if (targetElement && parent.contains(targetElement)) {
      handler(event, targetElement);
    }
  });
}
