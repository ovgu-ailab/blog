const VERSION = "v1"
const CACHE_NAME = "AISTEPCOUNTER"

const APP_STATIC_RESOURCES = [
    "https://ovgu-ailab.github.io/blog/step_ai/index.html",
    "https://ovgu-ailab.github.io/blog/step_ai/manifest.json",
    "https://ovgu-ailab.github.io/blog/step_ai/icon.svg",
    "https://ovgu-ailab.github.io/blog/step_ai/index.html",
    "https://ovgu-ailab.github.io/blog/step_ai/pages/application.html",
    "https://ovgu-ailab.github.io/blog/step_ai/pages/style.css",
    "https://ovgu-ailab.github.io/blog/step_ai/pages/data_collection.html",
    "https://ovgu-ailab.github.io/blog/step_ai/pages/code.js",
    "https://ovgu-ailab.github.io/blog/step_ai/files/Step_AI_Notebook.ipynb",
    "https://ovgu-ailab.github.io/blog/step_ai/presentation.html",
    "https://ovgu-ailab.github.io/blog/step_ai/figures/error.svg",
    "https://ovgu-ailab.github.io/blog/step_ai/figures/error2.svg",
    "https://ovgu-ailab.github.io/blog/step_ai/figures/gradient.svg",
    "https://ovgu-ailab.github.io/blog/step_ai/figures/gradient_descent.svg",
    "https://ovgu-ailab.github.io/blog/step_ai/figures/linear.svg",
    "https://ovgu-ailab.github.io/blog/step_ai/figures/mil.svg",
    "https://ovgu-ailab.github.io/blog/step_ai/figures/phone.svg",
    "https://ovgu-ailab.github.io/blog/step_ai/figures/phone_alpha.svg",
    "https://ovgu-ailab.github.io/blog/step_ai/figures/phone_beta.svg",
    "https://ovgu-ailab.github.io/blog/step_ai/figures/phone_gamma.svg",
    "https://ovgu-ailab.github.io/blog/step_ai/figures/phone_t.svg",
    "https://ovgu-ailab.github.io/blog/step_ai/figures/phone_xyz.svg",
    //"https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js",
    //"https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide-lock.json",
    //"https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.asm.wasm",
    //"https://cdn.jsdelivr.net/pyodide/v0.25.0/full/python_stdlib.zip",
    //"https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.asm.js",
    //"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.css",
    //"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js",
    //"https://unpkg.com/reveal.js@^4//dist/reset.css",
    //"https://unpkg.com/reveal.js@^4//dist/reveal.css",
    //"https://unpkg.com/reveal.js@^4//dist/theme/serif.css",
    //"https://unpkg.com/reveal.js@^4//dist/reveal.js",
    //"https://unpkg.com/reveal.js@^4//plugin/notes/notes.js",
    //"https://unpkg.com/reveal.js@^4//plugin/search/search.js",
    //"https://unpkg.com/reveal.js@^4//plugin/zoom/zoom.js",
    //"https://unpkg.com/reveal.js@^4//plugin/math/math.js",
    //"https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml-full.js?config=TeX-AMS_HTML-full",
]
const addResourcesToCache = async (resources) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(resources);
};

const putInCache = async (request, response) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response);
};

const cacheFirst = async ({ request}) => {
  // First try to get the resource from the cache
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }

  // Next try to get the resource from the network
  try {
    const responseFromNetwork = await fetch(request.clone());
    // response may be used only once
    // we need to save clone to put one copy in cache
    // and serve second one
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    return new Response('Could load neither cache nor Network Response', {
      status: 404,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
};

self.addEventListener('activate', (event) => {
  event.waitUntil(enableNavigationPreload());
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    addResourcesToCache(APP_STATIC_RESOURCES)
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    cacheFirst({
      request: event.request
    })
  );
});
