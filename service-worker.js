const CACHE_NAME = "guinea-pig-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/manifest.json",
  "/topics.json",


  "/assets/pictures/1.jpg",
  "/assets/pictures/2.jpg",
  "/assets/pictures/3.jpg",
  "/assets/pictures/4.jpg",
  "/assets/pictures/5.jpg",
  "/assets/pictures/6.jpg",
  "/assets/pictures/7.jpg",
  "/assets/pictures/8.jpg",


  "/assets/audio/wheeking.mp3",
  "/assets/audio/chutting.mp3",
  "/assets/audio/purring.mp3",
  "/assets/audio/teeth.mp3",
  "/assets/audio/chirping.mp3",
  "/assets/audio/whining.mp3",
  "/assets/audio/cooing.mp3",
  "/assets/audio/rumbling.mp3",


  "/assets/audio/correct.mp3",
  "/assets/audio/incorrect.mp3",
  "/assets/pictures/confetti.gif",
  "/assets/pictures/tomato.gif",


  "/assets/pictures/mascot.gif",
  "/assets/pictures/background.png", 


  "/assets/pictures/icon-192.png",
  "/assets/pictures/icon-512.png"
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
