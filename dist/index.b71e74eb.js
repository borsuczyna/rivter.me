// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"iJYvl":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "5c1b77e3b71e74eb";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"h7u1C":[function(require,module,exports) {
// Definitions
var _mtaServer = require("./libs/MTA-server");
var _main = require("./editor/main");
var _main1 = require("./editor/blocks/main");
var _interaction = require("./editor/blocks/interaction");
var _main2 = require("./editor/board/main");
var _cursor = require("./window/cursor");
var _keyboard = require("./window/keyboard");
// Unit tests
var _blocks = require("./tests/blocks");
// Debug
var _main3 = require("./debug/main");

},{"./libs/MTA-server":"fv6v7","./editor/main":"i8xue","./window/cursor":"8IR6J","./window/keyboard":"24Wyb","./tests/blocks":"1pXVf","./debug/main":"4gzLn","./editor/blocks/main":"gvfQM","./editor/board/main":"25mxR","./editor/blocks/interaction":"8Udq5"}],"fv6v7":[function(require,module,exports) {
var _color = require("../utils/color");
var _lib = require("./lib");
const definitions = {
    "Player joined": {
        name: "Player joined",
        hoverTip: "Event is triggered when player joins server",
        motionStart: false,
        motionNext: true,
        inputs: [],
        outputs: [
            {
                name: "Player",
                hoverTip: "Player that joined server",
                type: "player"
            }
        ],
        isEvent: true
    }
};
const nodes = {
    "player": {
        color: new (0, _color.Color)(255, 50, 50),
        validConnections: [
            "player"
        ]
    }
};
(0, _lib.loadDefinitions)(definitions);
(0, _lib.loadNodes)(nodes);

},{"../utils/color":"jC8cD","./lib":"4fQhG"}],"jC8cD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Color", ()=>Color);
class Color {
    constructor(r, g, b, a = 255){
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    toDOM() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a / 255})`;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"4fQhG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "definitions", ()=>definitions);
parcelHelpers.export(exports, "nodes", ()=>nodes);
parcelHelpers.export(exports, "loadDefinitions", ()=>loadDefinitions);
parcelHelpers.export(exports, "loadNodes", ()=>loadNodes);
parcelHelpers.export(exports, "findDefinition", ()=>findDefinition);
parcelHelpers.export(exports, "findNode", ()=>findNode);
var definitions = {};
var nodes = {};
function loadDefinitions(defs) {
    definitions = {
        ...definitions,
        ...defs
    };
}
function loadNodes(nodes_) {
    nodes = {
        ...nodes,
        ...nodes_
    };
}
function findDefinition(key) {
    return definitions[key];
}
function findNode(key) {
    return nodes[key];
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"i8xue":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "editorCanvas", ()=>editorCanvas);
parcelHelpers.export(exports, "editorWindow", ()=>editorWindow);
parcelHelpers.export(exports, "editorCursor", ()=>editorCursor);
parcelHelpers.export(exports, "editorRoot", ()=>editorRoot);
parcelHelpers.export(exports, "editorDimensions", ()=>editorDimensions);
parcelHelpers.export(exports, "editorPosition", ()=>editorPosition);
parcelHelpers.export(exports, "editorZoom", ()=>editorZoom);
parcelHelpers.export(exports, "updateEditorPosition", ()=>updateEditorPosition);
parcelHelpers.export(exports, "setEditorZoom", ()=>setEditorZoom);
parcelHelpers.export(exports, "isRectOnScreen", ()=>isRectOnScreen);
var _zoom = require("./zoom");
var _events = require("../utils/events");
var editorCanvas = null;
var editorWindow = null;
var editorCursor = null;
var editorRoot = null;
var editorDimensions = {
    width: 1280,
    height: 720
};
var editorPosition = {
    x: 0,
    y: 0
};
var editorZoom = 1;
function updateEditorPosition() {
    if (!editorRoot) return;
    editorRoot.style.setProperty("--board-x", `${editorPosition.x}px`);
    editorRoot.style.setProperty("--board-y", `${editorPosition.y}px`);
}
function setEditorZoom(zoom) {
    if (!editorRoot) return;
    editorZoom = zoom;
    editorRoot.style.setProperty("--board-zoom", `${editorZoom}`);
}
function isRectOnScreen(rect) {
    return rect.x + rect.width >= 0 && rect.y + rect.height >= 0 && rect.x <= editorDimensions.width && rect.y <= editorDimensions.height;
}
function updateEditorDimensions() {
    if (!editorCanvas) return;
    let width = window.innerWidth;
    let height = window.innerHeight;
    editorDimensions.width = width;
    editorDimensions.height = height;
    editorCanvas.canvas.width = width;
    editorCanvas.canvas.height = height;
}
function initEditor() {
    if (editorCanvas && editorWindow && editorCursor && editorRoot) return;
    let window1 = document.getElementById("editor-canvas");
    editorCanvas = window1?.getContext("2d");
    editorWindow = document.getElementById("editor-window");
    editorCursor = document.getElementById("editor-canvas");
    editorRoot = document.querySelector(":root");
    updateEditorDimensions();
    addEventListener("resize", updateEditorDimensions);
}
initEditor();
function updateEditorEvent() {
    requestAnimationFrame(updateEditorEvent);
    (0, _events.triggerEvent)("editorUpdate");
}
requestAnimationFrame(updateEditorEvent);

},{"../utils/events":"5W5Qt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./zoom":"5ga2k"}],"5W5Qt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "addEventHandler", ()=>addEventHandler);
parcelHelpers.export(exports, "triggerEvent", ()=>triggerEvent);
const events = {};
function addEventHandler(name, callback, priority = 0) {
    events[name] = events[name] || [];
    events[name].push({
        callback: callback,
        priority: priority
    });
}
function triggerEvent(name, ...args) {
    if (!events[name]) return;
    events[name].sort((a, b)=>b.priority - a.priority).forEach((event)=>{
        event.callback(...args);
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5ga2k":[function(require,module,exports) {
var _clamp = require("../utils/clamp");
var _main = require("./main");
addEventListener("wheel", (event)=>{
    (0, _main.setEditorZoom)((0, _clamp.clamp)((0, _main.editorZoom) - event.deltaY / 400, 0.2, 4));
});

},{"../utils/clamp":"7Y4oV","./main":"i8xue"}],"7Y4oV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "clamp", ()=>clamp);
function clamp(current, min, max) {
    return Math.min(Math.max(current, min), max);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8IR6J":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "cursorPosition", ()=>cursorPosition);
parcelHelpers.export(exports, "setCurrentCursor", ()=>setCurrentCursor);
parcelHelpers.export(exports, "isCursorOnRect", ()=>isCursorOnRect);
var _main = require("../editor/main");
var _events = require("../utils/events");
var lastCursorUpdate = new Date();
const cursorPosition = {
    x: 0,
    y: 0
};
function mouseMoved(e) {
    cursorPosition.x = e.clientX;
    cursorPosition.y = e.clientY;
}
addEventListener("mousemove", mouseMoved);
addEventListener("mousedown", (e)=>{
    let event = new CustomEvent("mousePressed", {
        detail: {
            button: e.button
        }
    });
    window.dispatchEvent(event);
});
addEventListener("mouseup", (e)=>{
    let event = new CustomEvent("mouseReleased", {
        detail: {
            button: e.button
        }
    });
    window.dispatchEvent(event);
});
function setCurrentCursor(cursor) {
    (0, _main.editorCursor).style.cursor = cursor;
    lastCursorUpdate = new Date();
}
function isCursorOnRect(rect) {
    return cursorPosition.x >= rect.x && cursorPosition.y >= rect.y && cursorPosition.x <= rect.x + rect.width && cursorPosition.y <= rect.y + rect.height;
}
function resetCursorToDefault() {
    setCurrentCursor("default");
}
(0, _events.addEventHandler)("editorUpdate", resetCursorToDefault, 1000);

},{"../editor/main":"i8xue","../utils/events":"5W5Qt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"24Wyb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isKeyDown", ()=>isKeyDown);
const keysDown = {};
function isKeyDown(key) {
    return keysDown[key];
}
addEventListener("keydown", (e)=>{
    keysDown[e.key] = true;
    let event = new CustomEvent("keyPressed", {
        detail: {
            key: e.key
        }
    });
    window.dispatchEvent(event);
});
addEventListener("keyup", (e)=>{
    keysDown[e.key] = false;
    let event = new CustomEvent("keyReleased", {
        detail: {
            key: e.key
        }
    });
    window.dispatchEvent(event);
});

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1pXVf":[function(require,module,exports) {
var _main = require("../editor/blocks/main");
var _main1 = require("../editor/board/main");
var _cursor = require("../window/cursor");
var _test = require("./test");
var block;
(0, _test.expect)("create block", ()=>{
    block = (0, _main.createBlock)("Player joined");
    return block.type == "Player joined";
});
(0, _test.expect)("destroy block", ()=>{
    return (0, _main.destroyBlock)(block);
});
(0, _test.expect)("destroy block via token", ()=>{
    return (0, _main.destroyBlock)(block.token);
});
(0, _test.expect)("destroy invalid block", ()=>{
    // @ts-ignore
    return !(0, _main.destroyBlock)(undefined);
});
(0, _test.expect)("create block at 50x50 position", ()=>{
    block = (0, _main.createBlock)("Player joined", 50, 50);
    let success = block.x == 50 && block.y == 50;
    (0, _main.destroyBlock)(block);
    return success;
});
(0, _test.expect)("created block should create DOM element", ()=>{
    block = (0, _main.createBlock)("Player joined", 50, 50);
    let DOM = document.getElementById(`block-${block.token}`);
    (0, _main.destroyBlock)(block);
    return !!DOM;
});
(0, _test.expect)("destroying block should delete DOM element", ()=>{
    block = (0, _main.createBlock)("Player joined", 50, 50);
    let preDOM = document.getElementById(`block-${block.token}`);
    (0, _main.destroyBlock)(block);
    let postDOM = document.getElementById(`block-${block.token}`);
    return preDOM && !postDOM || false;
});
(0, _test.expect)("create block for testing frontend purposes", ()=>{
    block = (0, _main.createBlock)("Player joined", 50, 50);
    return !!block;
});
(0, _test.expect)("clicking should create block on cursor position", async ()=>{
    let promise = new Promise((resolve, reject)=>{
        let createBlockOnClick = ()=>{
            let block = (0, _main.createBlock)("Player joined");
            resolve(block.x == (0, _main1.getBoardFromEditorPosition)((0, _cursor.cursorPosition).x, (0, _cursor.cursorPosition).y).x && block.y == (0, _main1.getBoardFromEditorPosition)((0, _cursor.cursorPosition).x, (0, _cursor.cursorPosition).y).y);
            removeEventListener("mousePressed", createBlockOnClick);
        };
        addEventListener("mousePressed", createBlockOnClick);
    });
    return await promise;
});

},{"./test":"6j4B9","../editor/blocks/main":"gvfQM","../editor/board/main":"25mxR","../window/cursor":"8IR6J"}],"6j4B9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "expect", ()=>expect);
var testID = 1;
async function expect(message, callback) {
    if (callback.constructor.name === "AsyncFunction") {
        try {
            let success = await callback();
            success ? console.log(`✔️ Test ${testID} "${message}" passed`) : console.log(`❌ Test ${testID} "${message}" failed`);
        } catch (error) {
            console.log(`❌ Test ${testID} "${message}" failed: ${error}`);
        }
        testID++;
    } else {
        try {
            callback() ? console.log(`✔️ Test ${testID} "${message}" passed`) : console.log(`❌ Test ${testID} "${message}" failed`);
        } catch (error1) {
            console.log(`❌ Test ${testID} "${message}" failed: ${error1}`);
        }
        testID++;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gvfQM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "blocks", ()=>blocks);
// Get block DOM element
parcelHelpers.export(exports, "getBlockDOM", ()=>getBlockDOM);
// Updating single block DOM
parcelHelpers.export(exports, "updateBlockDOM", ()=>updateBlockDOM);
// Updating all blocks DOM's
parcelHelpers.export(exports, "updateBlocksDOM", ()=>updateBlocksDOM);
// Creating blocks
parcelHelpers.export(exports, "createBlock", ()=>createBlock);
// Get block by Block or token
parcelHelpers.export(exports, "getBlock", ()=>getBlock);
// Destroying blocks
parcelHelpers.export(exports, "destroyBlock", ()=>destroyBlock);
var _lib = require("../../libs/lib");
var _token = require("../../utils/token");
var _cursor = require("../../window/cursor");
var _main = require("../board/main");
var _main1 = require("../main");
var blocks = [];
// Creating node DOM element
function createNodeDOM(node, type) {
    let htmlElement = document.createElement("div");
    let nodeName = document.createElement("div");
    let nodeBall = document.createElement("div");
    let blockNode = (0, _lib.findNode)(node.type);
    nodeName.innerText = node.name;
    htmlElement.appendChild(type == "input" ? nodeBall : nodeName);
    htmlElement.appendChild(type == "input" ? nodeName : nodeBall);
    nodeBall.style.setProperty("--color", blockNode?.color.toDOM() || "red");
    nodeBall.classList.add("block-ball");
    htmlElement.classList.add(`block-row`);
    htmlElement.classList.add(`block-${type}`);
    return htmlElement;
}
// Creating block DOM element
function createBlockDOM(block) {
    let definition = (0, _lib.findDefinition)(block.type);
    if (!(0, _main1.editorWindow) || !definition) return;
    let htmlElement = document.createElement("div");
    // Block element
    htmlElement.classList.add("block-element");
    htmlElement.id = `block-${block.token}`;
    (0, _main1.editorWindow).appendChild(htmlElement);
    // Block title
    let title = document.createElement("div");
    title.innerText = definition.name;
    title.classList.add("block-title");
    // Block content
    let blockContent = document.createElement("div");
    blockContent.classList.add("block-content");
    // Block inputs
    let blockInputs = document.createElement("div");
    blockInputs.classList.add("block-inputs");
    definition.inputs.forEach((value)=>{
        let htmlElement = createNodeDOM(value, "input");
        blockInputs.appendChild(htmlElement);
    });
    // Block outputs
    let blockOutputs = document.createElement("div");
    blockOutputs.classList.add("block-outputs");
    definition.outputs.forEach((value)=>{
        let htmlElement = createNodeDOM(value, "output");
        blockOutputs.appendChild(htmlElement);
    });
    // Append childs
    blockContent.appendChild(blockInputs);
    blockContent.appendChild(blockOutputs);
    htmlElement.appendChild(title);
    htmlElement.appendChild(blockContent);
    return htmlElement;
}
function getBlockDOM(block) {
    let blockElement = getBlock(block);
    if (!blockElement) return;
    let htmlElement = document.getElementById(`block-${blockElement.token}`);
    if (!htmlElement) htmlElement = createBlockDOM(blockElement);
    return htmlElement;
}
// Destroying block DOM element
function destroyBlockDOM(block) {
    let htmlElement = getBlockDOM(block);
    if (!htmlElement) return;
    htmlElement.remove();
}
function updateBlockDOM(block) {
    let htmlElement = getBlockDOM(block);
    let blockElement = getBlock(block);
    if (!htmlElement || !blockElement) return;
    htmlElement.style.setProperty("--position-x", `${blockElement.x}px`);
    htmlElement.style.setProperty("--position-y", `${blockElement.y}px`);
}
function updateBlocksDOM() {
    for (let block of blocks)updateBlockDOM(block);
}
function createBlock(type, x, y) {
    x = x || (0, _main.getBoardFromEditorPosition)((0, _cursor.cursorPosition).x, (0, _cursor.cursorPosition).y).x;
    y = y || (0, _main.getBoardFromEditorPosition)((0, _cursor.cursorPosition).x, (0, _cursor.cursorPosition).y).y;
    let block = {
        token: (0, _token.generateToken)(),
        type: type,
        inputNodes: [],
        outputNodes: [],
        x: x,
        y: y
    };
    blocks.push(block);
    // Update block DOM
    updateBlockDOM(block);
    return block;
}
function getBlock(block) {
    if (typeof block != "string") return block;
    else return blocks.find((value)=>value.token == block);
}
function destroyBlock(block) {
    if (!block) return false;
    destroyBlockDOM(block);
    if (typeof block == "string") {
        blocks = blocks.filter((value, index)=>value.token != block);
        return true;
    } else {
        const blockIndex = blocks.indexOf(block);
        if (blockIndex !== -1) {
            blocks.splice(blockIndex, 1);
            return true;
        }
    }
    return false;
}

},{"../../libs/lib":"4fQhG","../../utils/token":"9cRK6","../../window/cursor":"8IR6J","../board/main":"25mxR","../main":"i8xue","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9cRK6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "generateToken", ()=>generateToken);
const characters = "qwsertyuiopasdfghjklzxcvbnbmQWERETYUIOPASDFDGHJKJLZXCXVBNBM123454567890";
function generateToken(length = 16) {
    let final = "";
    while(final.length < length)final += characters.charAt(Math.random() * characters.length);
    return final;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"25mxR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "grabBoard", ()=>grabBoard);
parcelHelpers.export(exports, "getEditorFromBoardPosition", ()=>getEditorFromBoardPosition);
parcelHelpers.export(exports, "getBoardFromEditorPosition", ()=>getBoardFromEditorPosition);
var _main = require("../main");
var grabBoard = {
    active: false,
    holding: false,
    x: 0,
    y: 0
};
function getEditorFromBoardPosition(x, y) {
    return {
        x: (0, _main.editorDimensions).width / 2 + (0, _main.editorPosition).x * (0, _main.editorZoom) + x * (0, _main.editorZoom),
        y: (0, _main.editorDimensions).height / 2 + (0, _main.editorPosition).y * (0, _main.editorZoom) + y * (0, _main.editorZoom)
    };
}
function getBoardFromEditorPosition(x, y) {
    return {
        x: (x - (0, _main.editorDimensions).width / 2 - (0, _main.editorPosition).x * (0, _main.editorZoom)) / (0, _main.editorZoom),
        y: (y - (0, _main.editorDimensions).height / 2 - (0, _main.editorPosition).y * (0, _main.editorZoom)) / (0, _main.editorZoom)
    };
}

},{"../main":"i8xue","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4gzLn":[function(require,module,exports) {
var _events = require("../utils/events");
var _main = require("../editor/main");
var _graph = require("./graph");
const debugData = {
    lastFrame: new Date(),
    frameTime: [],
    fps: []
};
(0, _events.addEventHandler)("editorUpdate", ()=>{
    if (!(0, _main.editorCanvas)) return;
    (0, _main.editorCanvas).clearRect(0, 0, (0, _main.editorDimensions).width, (0, _main.editorDimensions).height);
    let frameTime = new Date().getTime() - debugData.lastFrame.getTime();
    debugData.frameTime.push(frameTime);
    debugData.fps.push(Math.floor(1000 / frameTime));
    (0, _main.editorCanvas).font = "10px 'Open Sans', sans-serif";
    (0, _main.editorCanvas).fillStyle = "#FFffffCC";
    (0, _main.editorCanvas).textBaseline = "middle";
    (0, _main.editorCanvas).fillText("frame time", 20, 15);
    (0, _graph.drawGraph)((0, _main.editorCanvas), 20, 25, 250, 130, debugData.frameTime, 100, 50);
    (0, _main.editorCanvas).fillText("fps", 20, 175);
    (0, _graph.drawGraph)((0, _main.editorCanvas), 20, 185, 250, 130, debugData.fps, 100, 80);
    debugData.lastFrame = new Date();
}, 999);

},{"../utils/events":"5W5Qt","../editor/main":"i8xue","./graph":"bCvH6"}],"bCvH6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "drawGraph", ()=>drawGraph);
function drawGraph(ctx, x, y, width, height, graph, amount = 10, minimalMax = null) {
    graph = graph.slice(-amount);
    amount = graph.length;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, width, height);
    let min = 0; // Math.min(...graph);
    let max = Math.max(...graph, minimalMax || 0);
    ctx.font = "8px 'Open Sans', sans-serif";
    for(let i = 0; i < 5; i++){
        let progress = i / 4;
        ctx.fillText(Math.floor(max + (min - max) * progress).toString(), x - 13, y + 3 + (height - 6) * progress);
    }
    ctx.beginPath();
    let moved = false;
    for(let point = 0; point < amount; point++){
        let progress1 = point / (amount - 1);
        let targetX = x + progress1 * width;
        let targetY = y + height - height * (graph[point] / max);
        if (!moved) {
            ctx.moveTo(targetX, targetY);
            moved = true;
        }
        ctx.lineTo(targetX, targetY);
    }
    ctx.stroke();
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8Udq5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Get block under mouse
parcelHelpers.export(exports, "getBlockUnderMouse", ()=>getBlockUnderMouse);
var _events = require("../../utils/events");
var _cursor = require("../../window/cursor");
var _main = require("../blocks/main");
var _main1 = require("../board/main");
var _main2 = require("../main");
function getBlockUnderMouse() {
    for (let block of (0, _main.blocks)){
        let rect = (0, _main.getBlockDOM)(block)?.getBoundingClientRect();
        if (rect && (0, _cursor.isCursorOnRect)(rect)) return block;
    }
    return null;
}
function isBlockOnScreen(block) {
    let htmlElement = (0, _main.getBlockDOM)(block);
    if (!htmlElement) return false;
    return (0, _main2.isRectOnScreen)(htmlElement.getBoundingClientRect());
}
function updateBlockInteractions() {
    let resetToDefault = true;
    for (let block of (0, _main.blocks)){
        let onScreen = isBlockOnScreen(block);
        if (!onScreen) continue;
        // Grabbing block by title name
        let htmlElement = (0, _main.getBlockDOM)(block);
        let title = htmlElement?.querySelector(".block-title");
        let titleRect = title?.getBoundingClientRect();
        if (titleRect && (0, _main2.isRectOnScreen)(titleRect) && (0, _cursor.isCursorOnRect)(titleRect) && !(0, _main1.grabBoard).holding) {
            (0, _cursor.setCurrentCursor)("grab");
            resetToDefault = false;
        }
    }
}
(0, _events.addEventHandler)("editorUpdate", updateBlockInteractions, 0);

},{"../../utils/events":"5W5Qt","../../window/cursor":"8IR6J","../blocks/main":"gvfQM","../board/main":"25mxR","../main":"i8xue","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["iJYvl","h7u1C"], "h7u1C", "parcelRequire94c2")

//# sourceMappingURL=index.b71e74eb.js.map
