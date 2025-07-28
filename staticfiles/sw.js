// Simple Service Worker for Parbat Furniture
const CACHE_NAME = 'parbat-furniture-v1';
const urlsToCache = [
  '/',
  '/static/core/css/style.css',
  '/static/core/js/main.js',
  '/static/images/hero-furniture.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});
