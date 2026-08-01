/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx,html,json}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          gold: 'var(--color-primary, #C5A880)',
          'gold-dark': 'var(--color-primary-dark, #A88B63)',
          'gold-light': 'var(--color-primary-light, #E2D1B9)',
          dark: 'var(--color-bg-dark, #0B0F17)',
          'dark-card': 'var(--color-card-dark, #131924)',
          'dark-border': 'var(--color-border-dark, #1F293D)',
          cream: 'var(--color-bg-cream, #FAF7F2)',
          accent: 'var(--color-accent, #D4AF37)',
          muted: '#8E9BAE',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        accent: ['"Cormorant Garamond"', 'serif']
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      boxShadow: {
        'gold-glow': '0 4px 20px -2px rgba(197, 168, 128, 0.25)',
        'dark-card': '0 10px 30px -5px rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C5A880 0%, #D4AF37 50%, #A88B63 100%)',
        'dark-overlay': 'linear-gradient(to bottom, rgba(11, 15, 23, 0.4), rgba(11, 15, 23, 0.95))',
      }
    },
  },
  plugins: [],
}
