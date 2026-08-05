import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import ContactModal from '../components/ContactModal.jsx';
import { getRestaurantData } from './dataLoader.js';

let modalRootInstance = null;
let setModalStateFn = null;

function ContactModalController() {
  const [isOpen, setIsOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState(undefined);

  useEffect(() => {
    // Load restaurant contact data dynamically
    getRestaurantData().then(data => {
      if (data && data.contact) {
        setContactInfo({
          phone: data.contact.phone || "+91 99600 50806",
          email: data.contact.email || "contact@sapnamomos.com",
          address: data.contact.address?.full || "Shop No 6, near Dashmish Mandir, Jyoti Nagar, New Usmanpura, Chhatrapati Sambhajinagar, Maharashtra 431005",
          hours: data.contact.hours || "12:00 PM – 10:30 PM (Daily)",
          whatsapp: data.contact.whatsapp || "https://wa.me/919960050806",
          instagram: data.contact.social?.instagram || "#",
          facebook: data.contact.social?.facebook || "#"
        });
      }
    }).catch(err => console.warn('[ContactModalManager] Error loading restaurant data:', err));

    // Register controller state setter globally
    setModalStateFn = (open) => setIsOpen(open);

    return () => {
      setModalStateFn = null;
    };
  }, []);

  return (
    <ContactModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      contactInfo={contactInfo}
    />
  );
}

/**
 * Open Contact Modal globally
 */
export function openContactModal() {
  if (setModalStateFn) {
    setModalStateFn(true);
  }
}

/**
 * Close Contact Modal globally
 */
export function closeContactModal() {
  if (setModalStateFn) {
    setModalStateFn(false);
  }
}

/**
 * Initialize Contact Modal System & Event Delegation across the DOM
 */
export function initContactModal() {
  if (!modalRootInstance) {
    let container = document.getElementById('contact-modal-root');
    if (!container) {
      container = document.createElement('div');
      container.id = 'contact-modal-root';
      document.body.appendChild(container);
    }

    const root = createRoot(container);
    root.render(<ContactModalController />);
    modalRootInstance = root;
  }

  // Event Delegation to intercept clicks on CTA buttons across the entire website
  document.body.addEventListener('click', (e) => {
    const target = e.target.closest('a, button, [data-open-contact-modal]');
    if (!target) return;

    // 1. Explicit data attribute
    if (target.hasAttribute('data-open-contact-modal')) {
      e.preventDefault();
      openContactModal();
      return;
    }

    const text = target.innerText ? target.innerText.trim().toLowerCase() : '';
    const href = target.getAttribute('href') || '';

    // 2. Click on "Call Now", "Contact Us", "Reserve Now", "Book A Table", "Get In Touch"
    const matchedTextPatterns = ['call now', 'contact us', 'reserve now', 'book a table', 'get in touch', 'reserve a table'];
    const matchesText = matchedTextPatterns.some(pattern => text.includes(pattern));

    if (matchesText) {
      e.preventDefault();
      openContactModal();
      return;
    }

    // 3. Click on contact.html links except inside navigation footer or direct anchors when specified
    if (href === 'contact.html' || href === '/contact.html' || href.endsWith('/contact.html')) {
      // Don't intercept main nav menu link if on contact page already, but do trigger modal on CTA buttons
      if (target.classList.contains('nav-link')) {
        return; // Allow page navigation for standard nav link
      }
      e.preventDefault();
      openContactModal();
    }
  });
}
