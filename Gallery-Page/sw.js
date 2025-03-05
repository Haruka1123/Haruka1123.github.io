self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('file-cache-v1')
            .then(cache => cache.addAll([
                /
            ]))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => Promise.all(
                cacheNames.filter(cacheName => cacheName !== 'file-cache-v1').map(cacheName => caches.delete(cacheName))
            ))
    );
});

self.addEventListener('message', event => {
    if (event.data.type === 'CACHE_FILE') {
        event.waitUntil(
            caches.open('file-cache-v1')
                .then(cache => cache.add(event.data.url))
                .then(() => console.log(`File cached: ${event.data.url}`))
                .catch(error => console.error(`Error caching file: ${error}`))
        );
    }
});
