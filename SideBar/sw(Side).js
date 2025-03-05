self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('firebase-storage')) {
      event.respondWith(
        caches.open('file-upload-cache').then((cache) => {
          return cache.match(event.request).then((response) => {
            if (response) {
              return response;
            } else {
              return fetch(event.request).then((response) => {
                if (response.ok) {
                  cache.put(event.request, response.clone());
                }
                return response;
              });
            }
          });
        }),
      );
    }
  });
  
  self.addEventListener('sync', (event) => {
    if (event.tag === 'file-upload') {
      event.waitUntil(
        caches.open('file-upload-cache').then((cache) => {
          return cache.keys().then((keys) => {
            keys.forEach((key) => {
              cache.match(key).then((response) => {
                if (response) {
                  return fetch(key.url).then((response) => {
                    if (response.ok) {
                      cache.delete(key);
                    }
                  });
                }
              });
            });
          });
        }),
      );
    }
  });
  
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
      clients.matchAll().then((clients) => {
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      }),
    );
  });