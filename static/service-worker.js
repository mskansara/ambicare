const cacheName = 'v1';

const cacheAssets = [
    'sample.html'
];

//Call install event
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Workers: Caching Files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});


//Call activate event
self.addEventListener('activate', (e) => {
    console.log('Service Worker activated');

    //Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName) {
                        console.log('Service Worker: Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

//Call Fetch Event
self.addEventListener('fetch', (e) => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    )
});