/* ==========================================================================
   Naturopata Digitale · service worker
   Cache-first per l'app shell, network-first per le navigazioni.
   Licenza del codice: MIT · Danilo D'Auria
   ========================================================================== */

const VERSION = "nd-v1.0.1";
const SHELL = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "assets/css/styles.css",
  "assets/img/icon.svg",
  "assets/img/icon-192.png",
  "assets/img/icon-512.png",
  "assets/js/data-plants.js",
  "assets/js/data-plants-2.js",
  "assets/js/data-manual.js",
  "assets/js/data-manual-2.js",
  "assets/js/data-manual-3.js",
  "assets/js/data-manual-4.js",
  "assets/js/data-manual-5.js",
  "assets/js/data-extra.js",
  "assets/js/data-extra-2.js",
  "assets/js/data-extra-3.js",
  "assets/js/data-quiz.js",
  "assets/js/data-quiz-2.js",
  "assets/js/data-quiz-3.js",
  "assets/js/neura.js",
  "assets/js/app.js",
  "assets/js/app-views.js",
  "assets/js/app-quiz.js",
  "assets/js/app-neura.js",
  "assets/js/app-init.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(VERSION)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(VERSION).then((cache) => cache.put("index.html", copy)).catch(() => {});
          }
          return response;
        })
        .catch(() => caches.match("index.html").then((cached) => cached || caches.match("./")))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response && response.status === 200 && response.type === "basic") {
          const copy = response.clone();
          caches.open(VERSION).then((cache) => cache.put(request, copy)).catch(() => {});
        }
        return response;
      });
    })
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "skipWaiting") self.skipWaiting();
});
