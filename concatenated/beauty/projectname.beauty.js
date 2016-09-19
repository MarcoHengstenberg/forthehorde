function onloadCSS(ss, callback) {
    function newcb() {
        !called && callback && (called = !0, callback.call(ss));
    }
    var called;
    ss.addEventListener && ss.addEventListener("load", newcb), ss.attachEvent && ss.attachEvent("onload", newcb), 
    "isApplicationInstalled" in navigator && "onloadcssdefined" in ss && ss.onloadcssdefined(newcb);
}

!function(w) {
    "use strict";
    var loadCSS = function(href, before, media) {
        function ready(cb) {
            return doc.body ? cb() : void setTimeout(function() {
                ready(cb);
            });
        }
        function loadCB() {
            ss.addEventListener && ss.removeEventListener("load", loadCB), ss.media = media || "all";
        }
        var ref, doc = w.document, ss = doc.createElement("link");
        if (before) ref = before; else {
            var refs = (doc.body || doc.getElementsByTagName("head")[0]).childNodes;
            ref = refs[refs.length - 1];
        }
        var sheets = doc.styleSheets;
        ss.rel = "stylesheet", ss.href = href, ss.media = "only x", ready(function() {
            ref.parentNode.insertBefore(ss, before ? ref : ref.nextSibling);
        });
        var onloadcssdefined = function(cb) {
            for (var resolvedHref = ss.href, i = sheets.length; i--; ) if (sheets[i].href === resolvedHref) return cb();
            setTimeout(function() {
                onloadcssdefined(cb);
            });
        };
        return ss.addEventListener && ss.addEventListener("load", loadCB), ss.onloadcssdefined = onloadcssdefined, 
        onloadcssdefined(loadCB), ss;
    };
    "undefined" != typeof exports ? exports.loadCSS = loadCSS : w.loadCSS = loadCSS;
}("undefined" != typeof global ? global : this), function(w) {
    var loadJS = function(src, cb) {
        "use strict";
        var ref = w.document.getElementsByTagName("script")[0], script = w.document.createElement("script");
        return script.src = src, script.async = !0, ref.parentNode.insertBefore(script, ref), 
        cb && "function" == typeof cb && (script.onload = cb), script;
    };
    "undefined" != typeof module ? module.exports = loadJS : w.loadJS = loadJS;
}("undefined" != typeof global ? global : this), "serviceWorker" in navigator && navigator.serviceWorker.register("peon.js", {
    scope: "/"
}), "serviceWorker" in navigator && navigator.serviceWorker.getRegistrations().then(function(registrations) {
    registrations.forEach(function(registration) {
        registration.unregister().then(function(success) {
            success && console.log("ServiceWorker unregistered");
        });
    });
}), function(w) {
    if (w.loadCSS) {
        var rp = loadCSS.relpreload = {};
        if (rp.support = function() {
            try {
                return w.document.createElement("link").relList.supports("preload");
            } catch (e) {
                return !1;
            }
        }, rp.poly = function() {
            for (var links = w.document.getElementsByTagName("link"), i = 0; i < links.length; i++) {
                var link = links[i];
                "preload" === link.rel && "style" === link.getAttribute("as") && (w.loadCSS(link.href, link), 
                link.rel = null);
            }
        }, !rp.support()) {
            rp.poly();
            var run = w.setInterval(rp.poly, 300);
            w.addEventListener && w.addEventListener("load", function() {
                w.clearInterval(run);
            }), w.attachEvent && w.attachEvent("onload", function() {
                w.clearInterval(run);
            });
        }
    }
}(this);