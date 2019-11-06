const CACHE_NAME = "firstpwa-v2";
var urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/pages/home.html",
    "/pages/biodata.html",
    "/pages/gaya.html",
    "/pages/contact.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/logoWPA.png",
    "pages/gambar/soeharto2.jpg",
    "pages/gambar/soekarno3.jpg",
    "pages/gambar/habibie2.jpg",
    "pages/gambar/gusdur.jpg",
    "pages/gambar/magawati.jpg",
    "pages/gambar/sby1.jpg",
    "pages/gambar/jokowi.jpg"
];

self.addEventListener("install", function (event) {
    event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
        return cache.addAll(urlsToCache);
    }));
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request, {cacName: CACHE_NAME}).then(function (response) {
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache", response.url);
                return response;
            }

            console.log("ServiceWorker:Memuat aset dari server : ", event.request.url);
            return fetch(event.request);
        })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(caches.keys().then(function (cacheNames) {
        return Promise.all(cacheNames.map(function (cacheName) {
            if (cacheName != CACHE_NAME) {
                console.log("ServiceWorker: cache" + cacheName + "dihapus");
                return caches.delete(cacheName);
            }
        }));
    }));
});