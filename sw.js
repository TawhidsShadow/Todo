if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./sw.js')
        .then(registration => {
            console.log(
                'Service Worker registered with scope:',
                registration.scope
            )
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error)
        })
}

// Define the cache name
const CACHE_NAME = 'my-cache'

// List of files to cache
const urlsToCache = ['/', '/index.html', '/style.css', '/script.js']

// Install event: Cache resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache)
        })
    )
})

// Fetch event: Serve cached resources or fetch from network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request)
        })
    )
})
