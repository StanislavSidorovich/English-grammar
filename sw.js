// Service worker: English Grammar A1–B2
//
// Strategy (changed from v1):
//  - The whole course lives inside index.html (HTML+CSS+JS in one file), so
//    that document is now served NETWORK-FIRST: online users always get the
//    latest lessons/quizzes immediately, no more waiting on a manual
//    CACHE_NAME bump. Offline users still fall back to the last cached copy.
//  - Static, effectively-immutable assets (fonts, icons, manifest) stay
//    CACHE-FIRST for instant offline loads and fewer network requests.
//
// You still don't need to remember to bump CACHE_NAME for content changes.
// Only bump it if you change *which files* are precached (e.g. add/rename
// a font or icon in STATIC_ASSETS) — that's what forces old cached static
// files to be dropped on activate.
const CACHE_NAME = 'grammar-a1-b2-v2';

// Anything matched here is served network-first.
const HTML_URLS = ['./', './index.html'];

const STATIC_ASSETS = [
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

const ASSETS_TO_CACHE = HTML_URLS.concat(STATIC_ASSETS);

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

function isHtmlRequest(request) {
  if (request.mode === 'navigate') return true;
  const path = new URL(request.url).pathname;
  return path.endsWith('/') || path.endsWith('/index.html');
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const request = event.request;

  if (isHtmlRequest(request)) {
    // Network-first: try to get the freshest lesson content. Cache a copy
    // as we go, so offline visitors still get the most recent successful
    // load rather than whatever was cached at install time.
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('./index.html')))
    );
    return;
  }

  // Static assets: cache-first for instant offline loads.
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request)
        .then((response) => {
          if (response && response.ok && request.url.startsWith(self.location.origin)) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => cached);
    })
  );
});
