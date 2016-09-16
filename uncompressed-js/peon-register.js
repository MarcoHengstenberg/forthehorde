/**
 *  peon-register.js
 *
 *  Author    | Marco Hengstenberg
 *  Version   | 0.0.1
 *
 *  Purpose   | This script registers the serviceworker after a little feature detection
 *  License   | There is no license, no copyright, no warranty, no guarantee and no support for the code provided. Handle with care though!
 *
 *  Usage     | Please use this as an inline script just before the closing </body> tag.
 *
 *  Hint      | The serviceworker.js must sit in the root of your site, thus `scope: '/'`.
 **/

// First we want to see whether the browser supports ServiceWorker
if ('serviceWorker' in navigator) {
  // Yes? Cool, let's register the worker
  navigator.serviceWorker.register('peon.js', {
    // and we instantly define its scope, which ideally is the root of the website
    scope: '/'
  });
}
