/**
  * ServiceWorker
  * Author         | Marco Hengstenberg
  * Version        | 0.0.1
  * Purpose        | This is meant to be a skeleton for a ServiceWorker
  * License        | There is no license, no copyright, no warranty, no guarantee and no support for the code provided!
  **/

'use strict';

/**
 * This is a simple test to ensure that all of the ES2015 features used here are
 * present in the browser before executing. If it fails, the worker will not be
 * installed. As of March 2016, all browsers that support service worker APIs
 * also support these features.
 **/
try {
  [
    'var {$$test} = {$$test: null}',
    '[$$test] = [null]',
    '$$test = Object.assign({}, {})',
    '$$test = (...args) => args',
    '$$test = new Map()',
    '$$test = new Set()',
    'delete $$test'
  ].forEach(eval);
} catch (err) {
  console.warn(err);
  throw 'Service worker unmet feature dependencies';
}

/**
 * Prefix for all cache keys.
 *
 * It should be updated to a new unique value (e.g. timestamp) to force the
 * service worker to update its registrations (causing reinstallation). Changing
 * this value will result in all caches being deleted.
 **/
const CACHE_Name = 'projectname-0.0.1';

// Create the scope under which the worker will run (mostly root)
const scope = '/'

// Function, which looks for matches inside the cache storage and returns all the things
function fetchFromCache (request) {
  return caches.match(request).then(response => {
    if (!response) {
      throw Error(`${request.url} not found in cache`);
    }
    return response;
  });
}

// Create a somehow helpful offline image as a fallback (could be anything but SVG is great for this)
function offlineImage () {
  var offlineSVG = '<svg role="img" aria-labelledby="offline-title"'
  + ' viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">'
  + '<title id="offline-title">Offline</title>'
  + '<g fill="none" fill-rule="evenodd">'
  + '<path fill="#fff" d="M0 0h400v300H0z"/>'
  + '<text fill="#e53b2c" font-family="Times New Roman,Times,serif"'
  + ' font-size="72" font-weight="bold">'
  + '<tspan x="93" y="172">offline</tspan></text></g></svg>';
  return new Response(offlineSVG,
    { headers: { 'Content-Type': 'image/svg+xml' } }
  );
}

/**
  * create a cache merely for an offline fallback page
  *
  * This is entirely optional but makes a lot of sense when the connection is not only
  * gone but worse: Lie-Fi™ (Jake Archibald coined the term and it is well on point).
  **/
function offlinePage () {
  return caches.open(`${cachePrefix}-offline`).then(cache => {
    return cache.match('offline.html');
  });
}

// In case you move from one page to another, I want to know about it
function isNavigateRequest (request) {
  return (request.mode === 'navigate' ||
     (request.method === 'GET' &&
       request.headers.get('accept').includes('text/html')));
}

// You request an image, I want to know that as well
function isImageRequest (request) {
  return (request.headers.get('Accept').indexOf('image') !== -1);
}

/**
  * Look for files to cache inside the cachefiles.json
  *
  * In order to not having the list of all assets in this script,
  * cleanliness and easier maintenance later on, I'm using the
  * JSON file to list all the things I want to be in the cache
  * instantly.
  *
  * Note: no slash between ${scope} & ${path}. Otherwise we end
  * up with a second slash, which will result in requests being made.
  **/
function readCacheFileList () {
  return fetch('cachefiles.json').then(response => {
    return response.json().then(paths => {
      return paths.map(path => `${scope}${path}`);
    });
  });
}

// Now, let's wait for the install-event
self.addEventListener('install', event => {

  // we wait with the installation of the worker
  event.waitUntil(
    // because we're opening a cache first
    caches.open(CACHE_NAME)
      // then use this cache
      .then(cache => {
        // in order to take all files from the array in the JSON file
        return readCacheFileList().then(files => {
          // and put those into the cache
          return cache.addAll(files);
        });
      // if that happened, we skip the waiting phase of the worker and use it right away
      }).then(() => self.skipWaiting())
  );
});

// Activation
self.addEventListener('activate', function(event) {

  // var for whitelisting the current cache storage
  var cacheWhitelist = CACHE_NAME;

  // wait for activation until
  event.waitUntil(
    // look for current cache version
    caches.keys().then(cacheKeys => {
      var oldCacheKeys = cacheKeys.filter(key => {
        // return the current cache version number/prefix/name
        return (key.indexOf(cacheWhitelist) !== 0);
      });
      // get rid of all the old stuff if there's a new cache
      var deletePromises = oldCacheKeys.map(oldKey => {
        // delete the old key
        return caches.delete(oldKey);
      });
      // delete all old caches and keys
      return Promise.all(deletePromises);
    // instantly claim the new cache version and replace the old
    }).then(() => self.clients.claim())
  );
});

// Then we can start fetching stuff
self.addEventListener('fetch', event => {
  var request = event.request;

  // you navigate, you get a response
  if (isNavigateRequest(request)) {
    event.respondWith(
      // looking for the page over the network
      fetch(request)
        // nothing changed or network gone, return from cache
        .catch(() => fetchFromCache(request))
        // nothing inside the cache, return offline page
        .catch(() => caches.match(`${scope}/offline`))
    );
  // you request images, you get a response
  } else if (isImageRequest(request)) {
    event.respondWith(
      // check the cache for the image
      fetchFromCache(request)
        // image not in the cache, fetch from network
        .catch(() => fetch(request))
        // nothing in the cache, network gone, offline image it is then
        .catch(() => offlineImage())
    );
  // anything else you're doing – weirdo
  } else {
    // response you get
    event.respondWith(
      // look inside the cache we do
      fetchFromCache(request)
        // nothing happened, nothing found, let's look over the network
        .catch(() => fetch(request))
    );
  }
});
