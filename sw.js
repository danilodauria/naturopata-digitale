/* ==========================================================================
   Naturopata Digitale · service worker
   Cache-first per l'app shell, network-first per le navigazioni.
   Licenza del codice: MIT · Danilo D'Auria
   ========================================================================== */

const VERSION = "nd-v1.2.0";
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
  "assets/js/data-plants-3.js",
  "assets/js/data-plants-4.js",
  "assets/js/data-plants-5.js",
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
  "assets/js/data-library.js",
  "assets/js/neura.js",
  "assets/js/app.js",
  "assets/js/app-views.js",
  "assets/js/app-library.js",
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

  // I PDF si scaricano su richiesta e non entrano nella cache: sono un allegato,
  // non una parte dell'app, e non devono occupare spazio senza un gesto esplicito.
  if (/\.pdf$/i.test(url.pathname)) return;

  if (request.mode === "navigate") {
    // Solo la pagina dell'app aggiorna la copia di "index.html": le altre pagine
    // del sito (per esempio /scarica/) si salvano con il proprio indirizzo, così
    // una visita alla pagina di download non sostituisce l'app nella cache.
    const root = new URL(self.registration.scope).pathname;
    const isAppShell = url.pathname === root || url.pathname === root + "index.html";
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            const key = isAppShell ? "index.html" : request;
            caches.open(VERSION).then((cache) => cache.put(key, copy)).catch(() => {});
          }
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match("index.html")))
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
