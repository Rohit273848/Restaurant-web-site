import React, { useState } from 'react';
import {
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


export default function ContactSection({
  contactInfo = {
    phone: "+91 99600 50806",
    alternatePhones: ["+91 95032 84534", "+91 97664 26035"],
    email: "contact@sapnamomos.com",
    address: "Shop No 6, near Dashmish Mandir, Jyoti Nagar, New Usmanpura, Chhatrapati Sambhajinagar, Maharashtra 431005",
    hours: "12:00 PM – 10:30 PM (Daily)",
    whatsapp: "https://wa.me/919960050806",
    instagram: "#",
    facebook: "#"
  }
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

  // Input change handler with numeric filtering for phone
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'phone') {
      // Allow only digits and spaces/dashes if pasting, but strictly strip letters
      newValue = value.replace(/[^\d\s\+\-\(\)]/g, '');
    }

    setFormData(prev => ({ ...prev, [name]: newValue }));

    // Validate on the fly if the field has been touched
    if (touched[name]) {
      let fieldError = null;
      if (name === 'name') fieldError = validateName(newValue);
      if (name === 'phone') fieldError = validatePhone(newValue);
      if (name === 'email') fieldError = validateEmail(newValue);
      if (name === 'message') fieldError = validateMessage(newValue);

      setErrors(prev => ({ ...prev, [name]: fieldError }));
    }
  };

  // Blur handler to mark field as touched
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

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all required fields as touched
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

    // Simulate API network call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Automatically clear the form
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
    }, 1200);
  };

  const resetForm = () => {
    setIsSubmitted(false);
  };

  return (
    <section id="contact-reservation-section" class="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-amber-500/10 dark:bg-amber-400/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-red-500/10 dark:bg-red-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">

          {/* LEFT SIDE: Header, Description & Contact Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              {/* Small Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 dark:bg-brand-gold/10 border border-amber-500/30 dark:border-brand-gold/30 text-amber-600 dark:text-brand-gold text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-brand-gold animate-pulse" />
                <span>GET IN TOUCH</span>
              </div>

              {/* Main Heading */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 dark:text-slate-100 tracking-tight leading-tight mb-4">
                Let's Serve You <span className="text-amber-500 dark:text-amber-400">Better</span>
              </h2>

              {/* Subtitle */}
              <p className="text-neutral-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-light mb-8">
                Have a question, want to place a bulk order, organize an event, or simply contact us? Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            {/* Restaurant Info Cards Container */}
            <div className="space-y-4">

              {/* Phone Info Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-brand-dark-card border border-neutral-200 dark:border-brand-dark-border shadow-md hover:shadow-lg dark:shadow-none transition-all duration-300 flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 dark:bg-brand-gold/10 border border-amber-500/20 dark:border-brand-gold/20 flex items-center justify-center text-amber-600 dark:text-brand-gold shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-neutral-500 dark:text-slate-400 font-semibold mb-0.5">Direct Phone</span>
                  <a href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`} className="font-sans text-sm sm:text-base font-bold text-neutral-900 dark:text-slate-100 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                    {contactInfo.phone}
                  </a>
                  {contactInfo.alternatePhones && (
                    <span className="text-xs text-neutral-500 dark:text-slate-400 mt-0.5 font-light">
                      {contactInfo.alternatePhones.join(' • ')}
                    </span>
                  )}
                </div>
              </div>

              {/* Email Info Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-brand-dark-card border border-neutral-200 dark:border-brand-dark-border shadow-md hover:shadow-lg dark:shadow-none transition-all duration-300 flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 dark:bg-brand-gold/10 border border-amber-500/20 dark:border-brand-gold/20 flex items-center justify-center text-amber-600 dark:text-brand-gold shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-neutral-500 dark:text-slate-400 font-semibold mb-0.5">Email Address</span>
                  <a href={`mailto:${contactInfo.email.split(' ')[0]}`} className="font-sans text-sm sm:text-base font-bold text-neutral-900 dark:text-slate-100 hover:text-amber-500 dark:hover:text-amber-400 transition-colors break-all">
                    {contactInfo.email.split(' ')[0]}
                  </a>
                </div>
              </div>

              {/* Address Info Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-brand-dark-card border border-neutral-200 dark:border-brand-dark-border shadow-md hover:shadow-lg dark:shadow-none transition-all duration-300 flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 dark:bg-brand-gold/10 border border-amber-500/20 dark:border-brand-gold/20 flex items-center justify-center text-amber-600 dark:text-brand-gold shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-neutral-500 dark:text-slate-400 font-semibold mb-0.5">Outlet Location</span>
                  <p className="font-sans text-xs sm:text-sm text-neutral-700 dark:text-slate-300 leading-relaxed font-light">
                    {contactInfo.address}
                  </p>
                </div>
              </div>

              {/* Working Hours Info Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-brand-dark-card border border-neutral-200 dark:border-brand-dark-border shadow-md hover:shadow-lg dark:shadow-none transition-all duration-300 flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 dark:bg-brand-gold/10 border border-amber-500/20 dark:border-brand-gold/20 flex items-center justify-center text-amber-600 dark:text-brand-gold shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-neutral-500 dark:text-slate-400 font-semibold mb-0.5">Opening Hours</span>
                  <p className="font-sans text-sm font-semibold text-neutral-900 dark:text-slate-100">
                    {contactInfo.hours}
                  </p>
                </div>
              </div>

            </div>

            {/* Social Links */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider text-neutral-500 dark:text-slate-400 font-semibold block mb-3">Connect With Us</span>
              <div className="flex items-center gap-3">
                <a
                  href={contactInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Contact"
                  className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-sm"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                </a>
                <a
                  href={contactInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 dark:hover:text-slate-950 flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-sm"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a
                  href={contactInfo.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Page"
                  className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-sm"
                >
                  <FacebookIcon className="w-5 h-5" />
                </a>

              </div>
            </div>
          </div>


          {/* RIGHT SIDE: Contact Form Card */}
          <div className="lg:col-span-7 w-full">
            <div className="bg-white dark:bg-brand-dark-card border border-neutral-200 dark:border-brand-dark-border rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl dark:shadow-2xl backdrop-blur-xl transition-all duration-300 relative">

              {isSubmitted ? (
                /* SUCCESS STATE CARD */
                <div className="py-12 px-4 text-center flex flex-col items-center justify-center space-y-5 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-lg animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-slate-100">
                    Thank You!
                  </h3>

                  <p className="text-neutral-600 dark:text-slate-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed font-light">
                    Your message has been received successfully. Our team will contact you shortly.
                  </p>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-4 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-400 text-slate-950 font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                /* FORM INTERFACE */
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="mb-2">
                    <h3 className="font-serif text-2xl font-bold text-neutral-900 dark:text-slate-100 mb-1">
                      Send Us a Message
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500 dark:text-slate-400 font-light">
                      Fill out your details below and we will reach back to you.
                    </p>
                  </div>

                  {/* Field 1: Full Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-full-name" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-slate-300">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-4 text-neutral-400 dark:text-slate-500 pointer-events-none">
                        <User className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        id="contact-full-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your full name"
                        aria-invalid={touched.name && Boolean(errors.name)}
                        className={`w-full pl-12 pr-4 py-3.5 bg-neutral-50 dark:bg-slate-900/60 border ${touched.name && errors.name
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-neutral-200 dark:border-slate-800 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-amber-500 dark:focus:border-amber-400'
                          } rounded-2xl text-sm text-neutral-900 dark:text-slate-100 placeholder-neutral-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-300 shadow-inner`}
                      />
                    </div>
                    {touched.name && errors.name && (
                      <p className="flex items-center gap-1.5 text-xs text-red-500 font-medium pt-1 animate-shake">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Field 2: Phone Number */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-phone-number" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-slate-300">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-4 text-neutral-400 dark:text-slate-500 pointer-events-none">
                        <Phone className="w-5 h-5" />
                      </div>
                      <input
                        type="tel"
                        id="contact-phone-number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="e.g. +91 99600 50806"
                        aria-invalid={touched.phone && Boolean(errors.phone)}
                        className={`w-full pl-12 pr-4 py-3.5 bg-neutral-50 dark:bg-slate-900/60 border ${touched.phone && errors.phone
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-neutral-200 dark:border-slate-800 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-amber-500 dark:focus:border-amber-400'
                          } rounded-2xl text-sm text-neutral-900 dark:text-slate-100 placeholder-neutral-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-300 shadow-inner`}
                      />
                    </div>
                    {touched.phone && errors.phone && (
                      <p className="flex items-center gap-1.5 text-xs text-red-500 font-medium pt-1 animate-shake">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  {/* Field 3: Email Address (Optional) */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email-address" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-slate-300">
                      Email Address <span className="text-neutral-400 dark:text-slate-500 font-normal lowercase">(optional)</span>
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-4 text-neutral-400 dark:text-slate-500 pointer-events-none">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input
                        type="email"
                        id="contact-email-address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="yourname@example.com"
                        aria-invalid={touched.email && Boolean(errors.email)}
                        className={`w-full pl-12 pr-4 py-3.5 bg-neutral-50 dark:bg-slate-900/60 border ${touched.email && errors.email
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-neutral-200 dark:border-slate-800 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-amber-500 dark:focus:border-amber-400'
                          } rounded-2xl text-sm text-neutral-900 dark:text-slate-100 placeholder-neutral-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-300 shadow-inner`}
                      />
                    </div>
                    {touched.email && errors.email && (
                      <p className="flex items-center gap-1.5 text-xs text-red-500 font-medium pt-1 animate-shake">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Field 4: Subject (Optional) */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-subject-line" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-slate-300">
                      Subject <span className="text-neutral-400 dark:text-slate-500 font-normal lowercase">(optional)</span>
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-4 text-neutral-400 dark:text-slate-500 pointer-events-none">
                        <FileText className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        id="contact-subject-line"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="e.g. Bulk Order / Catering / Party Booking"
                        className="w-full pl-12 pr-4 py-3.5 bg-neutral-50 dark:bg-slate-900/60 border border-neutral-200 dark:border-slate-800 rounded-2xl text-sm text-neutral-900 dark:text-slate-100 placeholder-neutral-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-amber-500 dark:focus:border-amber-400 transition-all duration-300 shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Field 5: Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message-body" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-slate-300">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-start">
                      <div className="absolute left-4 top-4 text-neutral-400 dark:text-slate-500 pointer-events-none">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <textarea
                        id="contact-message-body"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Tell us how we can serve you better..."
                        aria-invalid={touched.message && Boolean(errors.message)}
                        className={`w-full pl-12 pr-4 py-3.5 bg-neutral-50 dark:bg-slate-900/60 border ${touched.message && errors.message
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-neutral-200 dark:border-slate-800 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-amber-500 dark:focus:border-amber-400'
                          } rounded-2xl text-sm text-neutral-900 dark:text-slate-100 placeholder-neutral-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-300 shadow-inner resize-none`}
                      />
                    </div>
                    {touched.message && errors.message && (
                      <p className="flex items-center gap-1.5 text-xs text-red-500 font-medium pt-1 animate-shake">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* CTA Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-8 rounded-2xl bg-amber-500 hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-400 text-slate-950 font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-3 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 group cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
