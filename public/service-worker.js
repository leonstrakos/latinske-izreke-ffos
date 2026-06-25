const CACHE_NAME = "latinffos-v1";
const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./bookmarks.html",
  "./phrase.html",
  "./manifest.json",
  "/css/style.css",
  "/img/silver_bookmark.png",
  "/css/RomanesqueSerif.ttf",
  "/img/gold_bookmark.png",
 
  // "/json/latindictionary.json"
  //"./phrase_analysis",

];

const DATA_ASSETS = [
  "./fraze_prevedene.json",
  "/json/fraze_prevedene.json"
];





// ===============================
// INSTALL: Cache static & data assets
// ===============================
self.addEventListener("install", event => {
  console.log("[SW] Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("[SW] Caching static assets");
      return cache.addAll(STATIC_ASSETS.concat(DATA_ASSETS));
    })
  );
  self.skipWaiting(); // activate immediately
});

// ===============================
// ACTIVATE: Clean old caches
// ===============================
self.addEventListener("activate", event => {
  console.log("[SW] Activating...");
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// ===============================
// FETCH: Serve from cache first, fallback to network
// ===============================
self.addEventListener("fetch", event => {
  const requestUrl = new URL(event.request.url);

  // Only handle GET requests
  if (event.request.method !== "GET") return;

  // Strategy: cache-first for static assets
  if (STATIC_ASSETS.includes(requestUrl.pathname) || STATIC_ASSETS.includes(requestUrl.href)) {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true })
        .then(response => response || fetch(event.request))
    );
    return;
  }

  // Strategy: network-first for JSON data (always try to get latest)
  if (DATA_ASSETS.includes(requestUrl.pathname)) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Update cache with latest data
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch(() => caches.match(event.request)) // fallback to cache if offline
    );
    return;
  }

  // For all other requests (images, icons, etc)
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});




self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {

      for (const file of [...STATIC_ASSETS, ...DATA_ASSETS]) {
        try {
          const response = await fetch(file);

          if (!response.ok) {
            console.error("FAILED:", file);
            continue;
          }

          await cache.put(file, response);
          console.log("CACHED:", file);

        } catch (err) {
          console.error("ERROR:", file, err);
        }
      }
    })
  );
});