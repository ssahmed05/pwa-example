const CACHE_NAME = 'guarder-cache-v1';

const urlsToCache = [
    '/',
    '/index.html',
    '/offline.html',
    '/css/bootstrap.css',
    '/css/style.css',
    '/js/jquery-3.4.1.min.js',
    '/js/bootstrap.js',
    '/js/custom.js',
    '/images/favicon.png',
    '/images/hero-bg.jpg',
];


// Install the service worker and cache the files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            }).catch(() => {
                return caches.match('offline.html')
            })
    );
});