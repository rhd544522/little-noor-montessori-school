// Little Noor Montessori School - Production Service Worker
// Version: 1.0.1 (Synchronized PWA & Web Cache)
const CACHE_VERSION = 'little-noor-pwa-v1.0.1';
const CACHE_NAME = `little-noor-cache-${CACHE_VERSION}`;

// Core static assets to precache for offline support
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/little-noor-logo.svg',
  '/favicon.svg',
  '/favicon-32x32.png',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/pwa-maskable-512x512.png',
  '/apple-touch-icon.png',
];

// Install Event: cache core app shell and immediately activate
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[PWA SW] Precache partial error (ignored):', err);
      });
    }).then(() => {
      // Force the waiting service worker to become active immediately
      return self.skipWaiting();
    })
  );
});

// Activate Event: purge all previous caches to prevent stale versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[PWA SW] Removing obsolete cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => {
      // Immediately take control of all open client tabs
      return self.clients.claim();
    })
  );
});

// Fetch Event: Network-First for HTML/Navigations, Cache-Falling-Back-to-Network for assets
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Only handle standard GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Bypass API requests and chrome-extension
  if (url.pathname.startsWith('/api/') || url.protocol === 'chrome-extension:') {
    return;
  }

  // 1. Navigation Requests (HTML / App Shell): Network-First
  // This guarantees that when online, the user always receives the latest website version!
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(async () => {
          // Offline fallback: serve cached index.html or cached match
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;
          const fallback = await caches.match('/index.html');
          if (fallback) return fallback;
          return caches.match('/');
        })
    );
    return;
  }

  // 2. Static Assets (JS, CSS, Fonts, Images, Audio): Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            (url.origin === self.location.origin || url.hostname.includes('googleapis') || url.hostname.includes('gstatic'))
          ) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});

// Message Event: allow manual update trigger
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
