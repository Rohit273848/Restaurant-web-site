/**
 * Contact Form Validation Module
 * Standardized validation logic for Sapna Momos Contact Form & Popup Modal
 */

/**
 * Validate Full Name (Minimum 2 characters)
 * @param {string} name 
 * @returns {string|null} Error message or null if valid
 */
export function validateName(name) {
  if (!name || typeof name !== 'string') {
    return 'Full name is required';
  }
  const trimmed = name.trim();
  if (trimmed.length === 0) {
    return 'Full name is required';
  }
  if (trimmed.length < 2) {
    return 'Name must be at least 2 characters';
  }
  return null;
}

/**
 * Validate Phone Number (10-digit numeric validation)
 * @param {string} phone 
 * @returns {string|null} Error message or null if valid
 */
export function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') {
    return 'Phone number is required';
  }
  // Strip non-digit characters for pure 10-digit validation
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length === 0) {
    return 'Phone number is required';
  }
  if (digitsOnly.length !== 10) {
    return 'Please enter a valid 10-digit phone number';
  }
  return null;
}

/**
 * Validate Email Address (Optional, but if provided must be valid email)
 * @param {string} email 
 * @returns {string|null} Error message or null if valid
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string' || email.trim() === '') {
    return null; // Optional field
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address';
  }
  return null;
}

/**
 * Validate Message (Minimum 10 characters)
 * @param {string} message 
 * @returns {string|null} Error message or null if valid
 */
export function validateMessage(message) {
  if (!message || typeof message !== 'string') {
    return 'Message is required';
  }
  const trimmed = message.trim();
  if (trimmed.length === 0) {
    return 'Message is required';
  }
  if (trimmed.length < 10) {
    return 'Message must be at least 10 characters long';
  }
  return null;
}

/**
 * Full Contact Form Validator
 * @param {Object} formData 
 * @returns {{ isValid: boolean, errors: Object }}
 */
export function validateContactForm(formData) {
  const nameError = validateName(formData.name);
  const phoneError = validatePhone(formData.phone);
  const emailError = validateEmail(formData.email);
  const messageError = validateMessage(formData.message);

  const errors = {
    name: nameError,
    phone: phoneError,
    email: emailError,
    subject: null, // Optional
    message: messageError
  };

  const isValid = !nameError && !phoneError && !emailError && !messageError;

  return { isValid, errors };
}
