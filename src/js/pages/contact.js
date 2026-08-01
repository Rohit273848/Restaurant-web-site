/**
 * Contact Page Controller
 * Form Validation & FAQ Accordion Controller
 */

import { $, $$, delegate } from '../core/domHelpers.js';
import { getFaqData, getRestaurantData } from '../core/dataLoader.js';
import { isValidEmail, isNotEmpty } from '../utils/validators.js';
import { showToast } from '../components/Toast.js';

document.addEventListener('DOMContentLoaded', async () => {
  if (!$('#contact-page-identifier')) return;

  try {
    // Hydrate Contact Details & Map Embed from JSON
    const restaurantData = await getRestaurantData();
    if (restaurantData) {
      const mapIframe = $('#contact-map-iframe');
      if (mapIframe && restaurantData.contact?.mapEmbedUrl) {
        mapIframe.src = restaurantData.contact.mapEmbedUrl;
      }
    }

    // Hydrate FAQ Accordion
    const faqData = await getFaqData();
    const faqContainer = $('#faq-accordion-container');

    if (faqData && faqContainer) {
      faqContainer.innerHTML = faqData.map((item, idx) => `
        <div class="faq-item border border-brand-dark-border bg-brand-dark-card rounded-xl overflow-hidden">
          <button type="button" class="faq-toggle-btn w-full px-6 py-5 flex items-center justify-between text-left font-serif font-bold text-lg text-slate-100 hover:text-brand-gold transition-colors">
            <span>${item.question}</span>
            <svg class="w-5 h-5 text-brand-gold transform transition-transform duration-300 icon-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div class="faq-answer-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out px-6">
            <p class="pb-5 text-slate-300 text-sm leading-relaxed">${item.answer}</p>
          </div>
        </div>
      `).join('');

      // Accordion Event Delegation
      delegate(faqContainer, 'click', '.faq-toggle-btn', (e, btn) => {
        const item = btn.closest('.faq-item');
        const answer = $('.faq-answer-content', item);
        const icon = $('.icon-chevron', btn);

        const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';

        // Close all other accordions
        $$('.faq-answer-content', faqContainer).forEach(el => el.style.maxHeight = '0px');
        $$('.icon-chevron', faqContainer).forEach(el => el.classList.remove('rotate-180'));

        if (!isOpen) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
          icon.classList.add('rotate-180');
        }
      });
    }

    // Direct Inquiry Form Submission
    const contactForm = $('#direct-contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = $('#contact-name')?.value;
        const email = $('#contact-email')?.value;
        const subject = $('#contact-subject')?.value;
        const message = $('#contact-message')?.value;

        if (!isNotEmpty(name)) {
          showToast('Please enter your name', 'error');
          return;
        }
        if (!isValidEmail(email)) {
          showToast('Please enter a valid email address', 'error');
          return;
        }
        if (!isNotEmpty(message)) {
          showToast('Please enter your message', 'error');
          return;
        }

        showToast('Thank you for your message! Our concierge will respond shortly.', 'success', 5000);
        contactForm.reset();
      });
    }

  } catch (err) {
    console.error('[ContactPage] Controller initialization error:', err);
  }
});
