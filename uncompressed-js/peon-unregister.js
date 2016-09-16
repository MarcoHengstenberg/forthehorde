/**
 *  peon-unregister.js
 *
 *  Author    | Marco Hengstenberg
 *  Version   | 0.0.1
 *
 *  Purpose   | This will unregister a working ServiceWorker.
 *  License   | There is no license, no copyright, no warranty, no guarantee and no support for the code provided. Handle with care though!
 *
 *  Usage     | Please use this as an inline script just before the closing </body> tag.
 **/

// First checking if the browser is able to use ServiceWorkers
if ('serviceWorker' in navigator) {
  // Yes it does and so we check current registered workers
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    // for each registered service worker
    registrations.forEach(function (registration) {
      // and then unregister it
      registration.unregister().then(function (success) {
        // on success we tell the good developer of the success
        if (success) console.log('ServiceWorker unregistered');
      });
    })
  });
}
