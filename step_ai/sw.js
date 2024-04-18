const VERSION = "v1"
const CACHE_NAME = "AISTEPCOUNTER"

const APP_STATIC_RESOURCES = [
    "/blog/step_ai/",
    "/blog/step_ai/manifest.json",
    "/blog/step_ai/icon.svg",
    "/blog/step_ai/index.html",
    "/blog/step_ai/pages/application.html",
    "/blog/step_ai/pages/train_ai.html",
    "/blog/step_ai/pages/style.css",
    "/blog/step_ai/pages/programming.html",
    "/blog/step_ai/pages/step_count.html",
    "/blog/step_ai/pages/data_collection.html",
    "/blog/step_ai/pages/code.js",
    "/blog/step_ai/presentation.html",
    "/blog/step_ai/figures/error.svg",
    "/blog/step_ai/figures/error2.svg",
    "/blog/step_ai/figures/gradient.svg",
    "/blog/step_ai/figures/gradient_descent.svg",
    "/blog/step_ai/figures/linear.svg",
    "/blog/step_ai/figures/mil.svg",
    "/blog/step_ai/figures/phone.svg",
    "/blog/step_ai/figures/phone_alpha.svg",
    "/blog/step_ai/figures/phone_beta.svg",
    "/blog/step_ai/figures/phone_gamma.svg",
    "/blog/step_ai/figures/phone_t.svg",
    "/blog/step_ai/figures/phone_xyz.svg",
    "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js",
    "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide-lock.json",
    "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.asm.wasm",
    "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/python_stdlib.zip",
    "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.asm.js",
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.css",
    "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js",
    "https://unpkg.com/reveal.js@^4//dist/reset.css",
    "https://unpkg.com/reveal.js@^4//dist/reveal.css",
    "https://unpkg.com/reveal.js@^4//dist/theme/serif.css",
    "https://unpkg.com/reveal.js@^4//dist/reveal.js",
    "https://unpkg.com/reveal.js@^4//plugin/notes/notes.js",
    "https://unpkg.com/reveal.js@^4//plugin/search/search.js",
    "https://unpkg.com/reveal.js@^4//plugin/zoom/zoom.js",
    "https://unpkg.com/reveal.js@^4//plugin/math/math.js",
    "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml-full.js?config=TeX-AMS_HTML-full",
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
