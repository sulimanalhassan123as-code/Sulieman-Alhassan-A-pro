const CACHE_VERSION = 'v2';
const CACHE_NAME = `never-hide-ai-cache-${CACHE_VERSION}`;

const assetsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log(`[Service Worker] Caching app shell for version ${CACHE_VERSION}`);
      return cache.addAll(assetsToCache);
    })
  );
  self.skipWaiting(); // Force the new service worker to become active immediately
});
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // If a cache's name is not our current cache, delete it.
          if (cacheName !== CACHE_NAME) {
            console.log(`[Service Worker] Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: fires for every network request.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // If we have a cached response, return it.
      // Otherwise, fetch it from the network.
      return response || fetch(event.request);
    })
  );
});
