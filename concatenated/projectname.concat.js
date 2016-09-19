/*! loadCSS: load a CSS file asynchronously. [c]2016 @scottjehl, Filament Group, Inc. Licensed MIT */
(function(w){
  "use strict";
  /* exported loadCSS */
  var loadCSS = function( href, before, media ){
    // Arguments explained:
    // `href` [REQUIRED] is the URL for your CSS file.
    // `before` [OPTIONAL] is the element the script should use as a reference for injecting our stylesheet <link> before
      // By default, loadCSS attempts to inject the link after the last stylesheet or script in the DOM. However, you might desire a more specific location in your document.
    // `media` [OPTIONAL] is the media type or query of the stylesheet. By default it will be 'all'
    var doc = w.document;
    var ss = doc.createElement( "link" );
    var ref;
    if( before ){
      ref = before;
    }
    else {
      var refs = ( doc.body || doc.getElementsByTagName( "head" )[ 0 ] ).childNodes;
      ref = refs[ refs.length - 1];
    }

    var sheets = doc.styleSheets;
    ss.rel = "stylesheet";
    ss.href = href;
    // temporarily set media to something inapplicable to ensure it'll fetch without blocking render
    ss.media = "only x";

    // wait until body is defined before injecting link. This ensures a non-blocking load in IE11.
    function ready( cb ){
      if( doc.body ){
        return cb();
      }
      setTimeout(function(){
        ready( cb );
      });
    }
    // Inject link
      // Note: the ternary preserves the existing behavior of "before" argument, but we could choose to change the argument to "after" in a later release and standardize on ref.nextSibling for all refs
      // Note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
    ready( function(){
      ref.parentNode.insertBefore( ss, ( before ? ref : ref.nextSibling ) );
    });
    // A method (exposed on return object for external use) that mimics onload by polling until document.styleSheets until it includes the new sheet.
    var onloadcssdefined = function( cb ){
      var resolvedHref = ss.href;
      var i = sheets.length;
      while( i-- ){
        if( sheets[ i ].href === resolvedHref ){
          return cb();
        }
      }
      setTimeout(function() {
        onloadcssdefined( cb );
      });
    };

    function loadCB(){
      if( ss.addEventListener ){
        ss.removeEventListener( "load", loadCB );
      }
      ss.media = media || "all";
    }

    // once loaded, set link's media back to `all` so that the stylesheet applies once it loads
    if( ss.addEventListener ){
      ss.addEventListener( "load", loadCB);
    }
    ss.onloadcssdefined = onloadcssdefined;
    onloadcssdefined( loadCB );
    return ss;
  };
  // commonjs
  if( typeof exports !== "undefined" ){
    exports.loadCSS = loadCSS;
  }
  else {
    w.loadCSS = loadCSS;
  }
}( typeof global !== "undefined" ? global : this ));
;/*! loadJS: load a JS file asynchronously. [c]2014 @scottjehl, Filament Group, Inc. (Based on http://goo.gl/REQGQ by Paul Irish). Licensed MIT */
(function( w ){
  var loadJS = function( src, cb ){
    "use strict";
    var ref = w.document.getElementsByTagName( "script" )[ 0 ];
    var script = w.document.createElement( "script" );
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore( script, ref );
    if (cb && typeof(cb) === "function") {
      script.onload = cb;
    }
    return script;
  };
  // commonjs
  if( typeof module !== "undefined" ){
    module.exports = loadJS;
  }
  else {
    w.loadJS = loadJS;
  }
}( typeof global !== "undefined" ? global : this ));
;/*! onloadCSS: adds onload support for asynchronous stylesheets loaded with loadCSS. [c]2016 @zachleat, Filament Group, Inc. Licensed MIT */
/* global navigator */
/* exported onloadCSS */
function onloadCSS( ss, callback ) {
  var called;
  function newcb(){
      if( !called && callback ){
        called = true;
        callback.call( ss );
      }
  }
  if( ss.addEventListener ){
    ss.addEventListener( "load", newcb );
  }
  if( ss.attachEvent ){
    ss.attachEvent( "onload", newcb );
  }

  // This code is for browsers that don’t support onload
  // No support for onload (it'll bind but never fire):
  //  * Android 4.3 (Samsung Galaxy S4, Browserstack)
  //  * Android 4.2 Browser (Samsung Galaxy SIII Mini GT-I8200L)
  //  * Android 2.3 (Pantech Burst P9070)

  // Weak inference targets Android < 4.4
  if( "isApplicationInstalled" in navigator && "onloadcssdefined" in ss ) {
    ss.onloadcssdefined( newcb );
  }
}
;/**
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
;/**
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
;/*! CSS rel=preload polyfill. Depends on loadCSS function. [c]2016 @scottjehl, Filament Group, Inc. Licensed MIT  */
(function( w ){
  // rel=preload support test
  if( !w.loadCSS ){
    return;
  }
  var rp = loadCSS.relpreload = {};
  rp.support = function(){
    try {
      return w.document.createElement( "link" ).relList.supports( "preload" );
    } catch (e) {
      return false;
    }
  };

  // loop preload links and fetch using loadCSS
  rp.poly = function(){
    var links = w.document.getElementsByTagName( "link" );
    for( var i = 0; i < links.length; i++ ){
      var link = links[ i ];
      if( link.rel === "preload" && link.getAttribute( "as" ) === "style" ){
        w.loadCSS( link.href, link );
        link.rel = null;
      }
    }
  };

  // if link[rel=preload] is not supported, we must fetch the CSS manually using loadCSS
  if( !rp.support() ){
    rp.poly();
    var run = w.setInterval( rp.poly, 300 );
    if( w.addEventListener ){
      w.addEventListener( "load", function(){
        w.clearInterval( run );
      } );
    }
    if( w.attachEvent ){
      w.attachEvent( "onload", function(){
        w.clearInterval( run );
      } )
    }
  }
}( this ));
