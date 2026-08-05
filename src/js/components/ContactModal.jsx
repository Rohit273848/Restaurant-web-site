import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import emailjs from '@emailjs/browser';
import {
  X,
  User,
  Phone,
  Mail,
  FileText,
  MessageSquare,
  Send,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles,
  AlertCircle,
  Loader2
} from 'lucide-react';
import {
  validateName,
  validatePhone,
  validateEmail,
  validateMessage,
  validateContactForm
} from '../utils/contactValidation.js';

const InstagramIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z" />
  </svg>
);

const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.205 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.301-.15-1.785-.881-2.062-.982-.276-.101-.477-.15-.677.15-.199.299-.775.982-.95 1.183-.175.201-.349.226-.65.075-1.228-.616-2.285-1.129-3.2-2.715-.244-.421.244-.391.698-1.3.075-.15.038-.276-.019-.376-.057-.101-.477-1.152-.654-1.579-.172-.416-.348-.36-.477-.367h-.402c-.15 0-.399.055-.609.284-.209.229-.798.78-.798 1.901 0 1.122.817 2.206.931 2.357.114.15 1.609 2.457 3.899 3.447 1.48.64 2.065.704 2.809.593.818-.122 1.785-.729 2.036-1.432.251-.703.251-1.304.175-1.431-.075-.127-.275-.202-.576-.352z" />
  </svg>
);

const DEFAULT_CONTACT = {
  phone: "+91 99600 50806",
  email: "contact@sapnamomos.com",
  address: "Shop No 6, near Dashmish Mandir, Jyoti Nagar, New Usmanpura, Chhatrapati Sambhajinagar, Maharashtra 431005",
  hours: "12:00 PM – 10:30 PM (Daily)",
  whatsapp: "https://wa.me/919960050806",
  instagram: "#",
  facebook: "#"
};

export default function ContactModal({
  isOpen = false,
  onClose,
  contactInfo = DEFAULT_CONTACT
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: null,
    phone: null,
    email: null,
    subject: null,
    message: null
  });

  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    email: false,
    subject: false,
    message: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  const backdropRef = useRef(null);

  // Mount/Unmount & Animation logic
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      // Lock background scrolling
      document.body.classList.add('overflow-hidden');
      const timer = setTimeout(() => setAnimateIn(true), 10);
      return () => clearTimeout(timer);
    } else {
      setAnimateIn(false);
      const timer = setTimeout(() => {
        setIsMounted(false);
        // Restore background scrolling
        document.body.classList.remove('overflow-hidden');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Clean up overflow on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  // Handle ESC Key press
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && isOpen && onClose) {
      onClose();
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'phone') {
      // Numbers only filtering
      newValue = value.replace(/\D/g, '').slice(0, 10);
    }

    setFormData(prev => ({ ...prev, [name]: newValue }));

    if (touched[name]) {
      let fieldError = null;
      if (name === 'name') fieldError = validateName(newValue);
      if (name === 'phone') fieldError = validatePhone(newValue);
      if (name === 'email') fieldError = validateEmail(newValue);
      if (name === 'message') fieldError = validateMessage(newValue);

      setErrors(prev => ({ ...prev, [name]: fieldError }));
    }
  };

  // Handle blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    let fieldError = null;
    if (name === 'name') fieldError = validateName(value);
    if (name === 'phone') fieldError = validatePhone(value);
    if (name === 'email') fieldError = validateEmail(value);
    if (name === 'message') fieldError = validateMessage(value);

    setErrors(prev => ({ ...prev, [name]: fieldError }));
  };

  // Reset form state helper
  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: ''
    });
    setTouched({
      name: false,
      phone: false,
      email: false,
      subject: false,
      message: false
    });
    setErrors({
      name: null,
      phone: null,
      email: null,
      subject: null,
      message: null
    });
    setSubmitError(null);
  };

  // Handle Close & Reset
  const handleCloseModal = () => {
    setIsSubmitted(false);
    resetForm();
    if (onClose) onClose();
  };

  // Handle Form Submit via EmailJS
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    setTouched({
      name: true,
      phone: true,
      email: true,
      subject: true,
      message: true
    });

    const { isValid, errors: validationErrors } = validateContactForm(formData);
    setErrors(validationErrors);

    if (!isValid) return;

    setIsSubmitting(true);

    try {
      // EmailJS credentials from environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      const submissionTime = new Date().toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'short'
      });

      // Prepare EmailJS template parameters matching required fields
      const templateParams = {
        customer_name: formData.name.trim(),
        customer_phone: formData.phone.trim(),
        customer_email: formData.email.trim() || 'Not provided',
        customer_subject: formData.subject.trim() || 'General Inquiry',
        customer_message: formData.message.trim(),
        submission_time: submissionTime
      };

      // Send email via official @emailjs/browser package
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      // On Success
      resetForm();
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error('[EmailJS Error]:', error);
      setIsSubmitting(false);
      setSubmitError('Unable to send your message. Please try again in a few moments.');
    }
  };

  // Overlay click handler
  const handleBackdropClick = (e) => {
    if (backdropRef.current && e.target === backdropRef.current && onClose) {
      onClose();
    }
  };

  if (!isMounted) return null;

  return ReactDOM.createPortal(
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby="popup-heading"
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/60 dark:bg-black/80 backdrop-blur-lg transition-opacity duration-300 ${
        animateIn ? 'opacity-100' : 'opacity-0'
      } overflow-y-auto`}
    >
      {/* Modal Container */}
      <div
        className={`relative w-full max-w-4xl bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 my-auto ${
          animateIn ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Close Button (X) */}
        <button
          type="button"
          onClick={handleCloseModal}
          aria-label="Close Contact Modal"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Layout: 2 Columns on Desktop, Single Column on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">

          {/* LEFT SIDE: Information Panel */}
          <div className="lg:col-span-5 bg-neutral-50/80 dark:bg-neutral-900/90 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-neutral-200 dark:border-neutral-800 flex flex-col justify-between space-y-6">
            <div>
              {/* Header Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Get In Touch</span>
              </div>

              {/* Title & Description */}
              <h2 id="popup-heading" className="font-serif text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mb-2">
                Let's Connect
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
                Share your details and we'll contact you shortly regarding your order, event, catering request, or any questions.
              </p>

              {/* Restaurant Info Cards */}
              <div className="space-y-3.5">
                {/* Phone */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/60 shadow-sm">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-400">Phone</h4>
                    <a href={`tel:${contactInfo.phone.replace(/\D/g, '')}`} className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/60 shadow-sm">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-400">Working Hours</h4>
                    <p className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white">
                      {contactInfo.hours}
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/60 shadow-sm">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-400">Location</h4>
                    <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-snug">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section: Logo & Social Links */}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              {/* Restaurant Logo */}
              <div className="flex items-center gap-2.5">
                <img
                  src="https://ik.imagekit.io/cvlhdu1b2/images/logo.png"
                  alt="Sapna Momos Logo"
                  className="w-8 h-8 rounded-full object-cover border border-amber-500/40"
                />
                <span className="font-serif text-xs font-black tracking-wider text-neutral-900 dark:text-white">
                  SAPNA <span className="text-red-500">MOMOS</span>
                </span>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-2">
                <a
                  href={contactInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Contact"
                  className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-all shadow-sm"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
                <a
                  href={contactInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-white flex items-center justify-center transition-all shadow-sm"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={contactInfo.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Page"
                  className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all shadow-sm"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Contact Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center relative bg-white dark:bg-neutral-900">
            {isSubmitted ? (
              /* SUCCESS STATE */
              <div className="py-12 px-4 text-center flex flex-col items-center justify-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-neutral-900 dark:text-white">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-sm">
                  Thank you for contacting Sapna Momos. We've received your inquiry and our team will contact you shortly.
                </p>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm tracking-wide shadow-md transition-all duration-200"
                >
                  Close
                </button>
              </div>
            ) : (
              /* FORM */
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Field 1: Full Name (Required) */}
                <div className="space-y-1">
                  <label htmlFor="modal-name" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 text-neutral-400 dark:text-neutral-500 pointer-events-none">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="modal-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter your full name"
                      aria-invalid={touched.name && Boolean(errors.name)}
                      className={`w-full pl-10 pr-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border ${
                        touched.name && errors.name
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-neutral-200 dark:border-neutral-700 focus:ring-amber-500'
                      } rounded-xl text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 transition-all shadow-sm`}
                    />
                  </div>
                  {touched.name && errors.name && (
                    <p className="flex items-center gap-1 text-xs text-red-500 font-medium pt-0.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Field 2: Phone Number (Required) */}
                <div className="space-y-1">
                  <label htmlFor="modal-phone" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 text-neutral-400 dark:text-neutral-500 pointer-events-none">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      id="modal-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="10-digit mobile number"
                      aria-invalid={touched.phone && Boolean(errors.phone)}
                      className={`w-full pl-10 pr-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border ${
                        touched.phone && errors.phone
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-neutral-200 dark:border-neutral-700 focus:ring-amber-500'
                      } rounded-xl text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 transition-all shadow-sm`}
                    />
                  </div>
                  {touched.phone && errors.phone && (
                    <p className="flex items-center gap-1 text-xs text-red-500 font-medium pt-0.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Grid row for Email & Subject (Optional) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Field 3: Email Address (Optional) */}
                  <div className="space-y-1">
                    <label htmlFor="modal-email" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                      Email Address <span className="text-neutral-400 font-normal lowercase">(optional)</span>
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3.5 text-neutral-400 dark:text-neutral-500 pointer-events-none">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        id="modal-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="name@example.com"
                        aria-invalid={touched.email && Boolean(errors.email)}
                        className={`w-full pl-10 pr-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border ${
                          touched.email && errors.email
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-neutral-200 dark:border-neutral-700 focus:ring-amber-500'
                        } rounded-xl text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 transition-all shadow-sm`}
                      />
                    </div>
                    {touched.email && errors.email && (
                      <p className="flex items-center gap-1 text-xs text-red-500 font-medium pt-0.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Field 4: Subject (Optional) */}
                  <div className="space-y-1">
                    <label htmlFor="modal-subject" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                      Subject <span className="text-neutral-400 font-normal lowercase">(optional)</span>
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3.5 text-neutral-400 dark:text-neutral-500 pointer-events-none">
                        <FileText className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="modal-subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Reservation / Order"
                        className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:ring-amber-500 rounded-xl text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 transition-all shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Field 5: Message (Required) */}
                <div className="space-y-1">
                  <label htmlFor="modal-message" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-3 text-neutral-400 dark:text-neutral-500 pointer-events-none">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <textarea
                      id="modal-message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Tell us how we can serve you better..."
                      aria-invalid={touched.message && Boolean(errors.message)}
                      className={`w-full pl-10 pr-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 border ${
                        touched.message && errors.message
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-neutral-200 dark:border-neutral-700 focus:ring-amber-500'
                      } rounded-xl text-sm text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 transition-all shadow-sm resize-none`}
                    />
                  </div>
                  {touched.message && errors.message && (
                    <p className="flex items-center gap-1 text-xs text-red-500 font-medium pt-0.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Error Banner */}
                {submitError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600 dark:text-red-400 text-xs font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm tracking-wide shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
