const CACHE_NAME = 'liliths-blog-cache-v1';
const urlsToCache = [
  '/bundle.js',
  '/'
];
const URLRegex = /:\/\/(?:www\.)?(.[^/]+)(.*)/;

self.addEventListener('install', event => {
  // Perform install steps
  event.waitUntil(caches.open(CACHE_NAME).then(cache => {
    cache.addAll(urlsToCache);
  }));
});

self.addEventListener('fetch', event => {
  event.respondWith(new Promise((resolve, reject) => {
    if (event.isTrusted !== true) return;
    if (event.request.mode === 'navigate') {
      caches.match('/').then(response => {
        if (response) {
          resolve(response);
        } else {
          resolve(fetch('/'));
        }
      });
    } else if (urlsToCache.includes(parsePath(event.request.url))) {
      resolve(fetchDefault(event.request));
    } else {
      resolve(fetchDefault(event.request, false));
    }
  }));
});

function fetchDefault(request, useCache = true) {
  return new Promise((resolve, reject) => {
    if (useCache === true) {
      caches.match(request).then(result => {
        if (result) {
          resolve(result);
        } else {
          resolve(fetch(request));
        }
      });
    } else {
      resolve(fetch(request));
    }
  });
}

function parseUrl(url) {
  return url.match(URLRegex);
}

function parsePath(url) {
  return parseUrl(url)[2];
}
