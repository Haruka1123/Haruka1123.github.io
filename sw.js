const CACHE_NAME = 'login-page-cache-v1';
const urlsToCache = [
    '/index.html', // Login Page
    '/style.css',   // CSS file
    '/script.js',      // JavaScript file for service worker registration
    'Images/logo.png', // School logo
    'Images/address.png', // Address image
    'Images/lead_logo.png', // Landing logo
    'Images/achievers.png', // Achievers image
    'Images/core_values.png' // Core values image
];

// Install the service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch from cache or network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});

// Activate the service worker
self.addEventListener('activate', (event) => {
 const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
