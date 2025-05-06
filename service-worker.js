const CACHE_NAME = "guinea-pig-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/topics.json",
  "/manifest.json",
  "/assets/images/wheeking.png",
  "/assets/images/chutting.png",
  "/assets/images/purring.png",
  "/assets/audio/teeth.mp3",
  "/assets/audio/chirping.mp3",
  "/assets/audio/whining.mp3",
  "/assets/audio/cooing.mp3",
  "/assets/audio/hissing.mp3",
  "/assets/audio/squeaking.mp3",
  "/assets/audio/rumbling.mp3",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
