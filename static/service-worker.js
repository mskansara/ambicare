const cacheName = 'v1';

const cacheAssets = [
    './sample.html' 
  ];

//Install Service Worker
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');
});

// Call Activate Event
self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');
    // Remove unwanted caches
    e.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if (cache !== cacheName) {
              console.log('Service Worker: Clearing Old Cache');
              return caches.delete(cache);
            }
          })
        );
      })
    );
  });

// Call Fetch Event
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

console.log("Service Worker Loaded...");
self.addEventListener("push", e => {
  console.log("Push Recieved...");
  self.registration.showNotification("Notification from Ambicare", {
    body: "You have received a request",
    icon: "./images/homescreen_icon.png"
  });
});