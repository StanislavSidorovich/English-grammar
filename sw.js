// Service worker: English Grammar A1–B2
// Cache-first app shell so the course opens instantly offline after the first visit.
// Bump CACHE_NAME whenever index.html or cached assets change, to push updates to users.
const CACHE_NAME = 'grammar-a1-b2-v3';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './assets/fonts/manrope-cyrillic-500.woff2',
  './assets/fonts/manrope-latin-500.woff2',
  './assets/fonts/manrope-cyrillic-700.woff2',
  './assets/fonts/manrope-latin-700.woff2',
  './assets/fonts/manrope-cyrillic-800.woff2',
  './assets/fonts/manrope-latin-800.woff2',
  './assets/fonts/golos-text-cyrillic-400.woff2',
  './assets/fonts/golos-text-latin-400.woff2',
  './assets/fonts/golos-text-cyrillic-500.woff2',
  './assets/fonts/golos-text-latin-500.woff2',
  './assets/fonts/golos-text-cyrillic-600.woff2',
  './assets/fonts/golos-text-latin-600.woff2',
  './assets/fonts/golos-text-cyrillic-700.woff2',
  './assets/fonts/golos-text-latin-700.woff2',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon-192-maskable.png',
  './assets/icons/icon-512-maskable.png',
  './assets/icons/apple-touch-icon.png',
  './assets/icons/favicon-32.png',
  './assets/icons/favicon-16.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          if (response && response.ok && event.request.url.startsWith(self.location.origin)) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached);
    })
  );
});
