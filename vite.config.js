import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        menu: resolve(__dirname, 'menu.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        contact: resolve(__dirname, 'contact.html'),
        notFound: resolve(__dirname, '404.html'),
        privacyPolicy: resolve(__dirname, 'privacy-policy.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
