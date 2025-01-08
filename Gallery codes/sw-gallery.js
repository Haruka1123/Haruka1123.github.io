const CACHE_NAME = 'gallery-cache-v1';
const urlsToCache = [
    '/Gallery codes/index3.html', // Gallery page
    '/Gallery codes/styles.css',  // CSS file
    '/Gallery codes/script.js',   // JavaScript file
    '/Gallery codes/Lesson Files/Lesson 1.pptx.pdf', // PDF files
    '/Gallery codes/Lesson Files/PR2 Lesson 2.pptx.pdf',
    '/Gallery codes/Lesson Files/PR2 Lesson 3 (Variables).pptx.pdf',
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
                if (response) {
                    return response;
                } else {
                    return fetch(event.request)
                        .then((response) => {
                            if (event.request.url.endsWith('.pdf')) {
                                return response.blob();
                            } else {
                                return response;
                            }
                        })
                        .catch((error) => {
                            return new Response('Offline', {
                                status: 200,
                                headers: {
                                    'Content-Type': 'text/plain'
                                }
                            });
                        });
                }
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