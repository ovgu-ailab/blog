const VERSION = "v1"
const CACHE_NAME = "AISTEPCOUNTER"

const APP_STATIC_RESOURCES = [
    "/step_ai/",
    "/step_ai/manifest.json",
    "/step_ai/icon.svg",
    "/step_ai/index.html",
    "/step_ai/pages/application.html",
    "/step_ai/pages/train_ai.html",
    "/step_ai/pages/style.css",
    "/step_ai/pages/programming.html",
    "/step_ai/pages/step_count.html",
    "/step_ai/pages/data_collection.html",
    "/step_ai/pages/code.js",
    "/step_ai/presentation.html",
    "/step_ai/figures/error.svg",
    "/step_ai/figures/error2.svg",
    "/step_ai/figures/gradient.svg",
    "/step_ai/figures/gradient_descent.svg",
    "/step_ai/figures/linear.svg",
    "/step_ai/figures/mil.svg",
    "/step_ai/figures/phone.svg",
    "/step_ai/figures/phone_alpha.svg",
    "/step_ai/figures/phone_beta.svg",
    "/step_ai/figures/phone_gamma.svg",
    "/step_ai/figures/phone_t.svg",
    "/step_ai/figures/phone_xyz.svg"
]

if ('serviceWorker' in navigator) {
    caches.keys().then(function(cacheNames) {
        cacheNames.forEach(function(cacheName) {
            caches.delete(cacheName);
        });
    });
}
// On install, cache the static resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      cache.addAll(APP_STATIC_RESOURCES);
    })()
  );
});

// delete old caches on activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
      await clients.claim();
    })()
  );
});

// On fetch, intercept server requests
// and respond with cached responses instead of going to network
self.addEventListener("fetch", (event) => {
  // As a single page app, direct app to always go to cached home page.
  //if (event.request.mode === "navigate") {
   // event.respondWith(caches.match("/"));
   // return;
  //}

  // For all other requests, go to the cache first, and then the network.
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) {
        // Return the cached response if it's available.
        return cachedResponse;
      }
      // If resource isn't in the cache, return a 404.
      return new Response(null, { status: 404 });
    })()
  );
});
