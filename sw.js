!function(){"use strict";try{self["workbox:core:6.4.0"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}const s={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},n=e=>[s.prefix,e,s.suffix].filter((e=>e&&e.length>0)).join("-"),a=e=>e||n(s.precache),i=e=>e||n(s.runtime);function r(e,t){const s=t();return e.waitUntil(s),s}try{self["workbox:precaching:6.4.0"]&&_()}catch(e){}function c(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const a=new URL(n,location.href),i=new URL(n,location.href);return a.searchParams.set("__WB_REVISION__",s),{cacheKey:a.href,url:i.href}}class o{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class l{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._precacheController=e}}let h;async function d(e,s){let n=null;if(e.url){n=new URL(e.url).origin}if(n!==self.location.origin)throw new t("cross-origin-copy-response",{origin:n});const a=e.clone(),i={headers:new Headers(a.headers),status:a.status,statusText:a.statusText},r=s?s(i):i,c=function(){if(void 0===h){const e=new Response("");if("body"in e)try{new Response(e.body),h=!0}catch(e){h=!1}h=!1}return h}()?a.body:await a.blob();return new Response(c,r)}function u(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class f{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const p=new Set;try{self["workbox:strategies:6.4.0"]&&_()}catch(e){}function m(e){return"string"==typeof e?new Request(e):e}class b{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new f,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:s}=this;let n=m(e);if("navigate"===n.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const a=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))n=await e({request:n.clone(),event:s})}catch(e){if(e instanceof Error)throw new t("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}const i=n.clone();try{let e;e=await fetch(n,"navigate"===n.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:i,response:e});return e}catch(e){throw a&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:a.clone(),request:i.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=m(e);let s;const{cacheName:n,matchOptions:a}=this._strategy,i=await this.getCacheKey(t,"read"),r=Object.assign(Object.assign({},a),{cacheName:n});s=await caches.match(i,r);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:n,matchOptions:a,cachedResponse:s,request:i,event:this.event})||void 0;return s}async cachePut(e,s){const n=m(e);var a;await(a=0,new Promise((e=>setTimeout(e,a))));const i=await this.getCacheKey(n,"write");if(!s)throw new t("cache-put-with-no-response",{url:(r=i.url,new URL(String(r),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var r;const c=await this._ensureResponseSafeToCache(s);if(!c)return!1;const{cacheName:o,matchOptions:l}=this._strategy,h=await self.caches.open(o),d=this.hasCallback("cacheDidUpdate"),f=d?await async function(e,t,s,n){const a=u(t.url,s);if(t.url===a)return e.match(t,n);const i=Object.assign(Object.assign({},n),{ignoreSearch:!0}),r=await e.keys(t,i);for(const t of r)if(a===u(t.url,s))return e.match(t,n)}(h,i.clone(),["__WB_REVISION__"],l):null;try{await h.put(i,d?c.clone():c)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of p)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:o,oldResponse:f,newResponse:c.clone(),request:i,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let n=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))n=m(await e({mode:t,request:n,event:this.event,params:this.params}));this._cacheKeys[s]=n}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),n=n=>{const a=Object.assign(Object.assign({},n),{state:s});return t[e](a)};yield n}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class g{constructor(e={}){this.cacheName=i(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,n="params"in e?e.params:void 0,a=new b(this,{event:t,request:s,params:n}),i=this._getResponse(a,s,t);return[i,this._awaitComplete(i,a,s,t)]}async _getResponse(e,s,n){let a;await e.runCallbacks("handlerWillStart",{event:n,request:s});try{if(a=await this._handle(s,e),!a||"error"===a.type)throw new t("no-response",{url:s.url})}catch(t){if(t instanceof Error)for(const i of e.iterateCallbacks("handlerDidError"))if(a=await i({error:t,event:n,request:s}),a)break;if(!a)throw t}for(const t of e.iterateCallbacks("handlerWillRespond"))a=await t({event:n,request:s,response:a});return a}async _awaitComplete(e,t,s,n){let a,i;try{a=await e}catch(i){}try{await t.runCallbacks("handlerDidRespond",{event:n,request:s,response:a}),await t.doneWaiting()}catch(e){e instanceof Error&&(i=e)}if(await t.runCallbacks("handlerDidComplete",{event:n,request:s,response:a,error:i}),t.destroy(),i)throw i}}class v extends g{constructor(e={}){e.cacheName=a(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(v.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,s){let n;const a=s.params||{};if(!this._fallbackToNetwork)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{const t=a.integrity,i=e.integrity,r=!i||i===t;n=await s.fetch(new Request(e,{integrity:i||t})),t&&r&&(this._useDefaultCacheabilityPluginIfNeeded(),await s.cachePut(e,n.clone()))}return n}async _handleInstall(e,s){this._useDefaultCacheabilityPluginIfNeeded();const n=await s.fetch(e);if(!await s.cachePut(e,n.clone()))throw new t("bad-precaching-response",{url:e.url,status:n.status});return n}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,n]of this.plugins.entries())n!==v.copyRedirectedCacheableResponsesPlugin&&(n===v.defaultPrecacheCacheabilityPlugin&&(e=s),n.cacheWillUpdate&&t++);0===t?this.plugins.push(v.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}v.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},v.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await d(e):e};class w{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new v({cacheName:a(e),plugins:[...t,new l({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const s=[];for(const n of e){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:a}=c(n),i="string"!=typeof n&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(a)&&this._urlsToCacheKeys.get(a)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(a),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:a});this._cacheKeysToIntegrities.set(e,n.integrity)}if(this._urlsToCacheKeys.set(a,e),this._urlsToCacheModes.set(a,i),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return r(e,(async()=>{const t=new o;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const n=this._cacheKeysToIntegrities.get(s),a=this._urlsToCacheModes.get(t),i=new Request(t,{integrity:n,cache:a,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:i,event:e}))}const{updatedURLs:s,notUpdatedURLs:n}=t;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(e){return r(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(const a of t)s.has(a.url)||(await e.delete(a),n.push(a.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params=Object.assign({cacheKey:s},t.params),this.strategy.handle(t))}}let y;const x=()=>(y||(y=new w),y);try{self["workbox:routing:6.4.0"]&&_()}catch(e){}const R=e=>e&&"object"==typeof e?e:{handle:e};class C{constructor(e,t,s="GET"){this.handler=R(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=R(e)}}class k extends C{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class L{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:a,route:i}=this.findMatchingRoute({event:t,request:e,sameOrigin:n,url:s});let r=i&&i.handler;const c=e.method;if(!r&&this._defaultHandlerMap.has(c)&&(r=this._defaultHandlerMap.get(c)),!r)return;let o;try{o=r.handle({url:s,request:e,event:t,params:a})}catch(e){o=Promise.reject(e)}const l=i&&i.catchHandler;return o instanceof Promise&&(this._catchHandler||l)&&(o=o.catch((async n=>{if(l)try{return await l.handle({url:s,request:e,event:t,params:a})}catch(e){e instanceof Error&&(n=e)}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw n}))),o}findMatchingRoute({url:e,sameOrigin:t,request:s,event:n}){const a=this._routes.get(s.method)||[];for(const i of a){let a;const r=i.match({url:e,sameOrigin:t,request:s,event:n});if(r)return a=r,(Array.isArray(a)&&0===a.length||r.constructor===Object&&0===Object.keys(r).length||"boolean"==typeof r)&&(a=void 0),{route:i,params:a}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,R(e))}setCatchHandler(e){this._catchHandler=R(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this._routes.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this._routes.get(e.method).splice(s,1)}}let E;const q=()=>(E||(E=new L,E.addFetchListener(),E.addCacheListener()),E);function D(e,s,n){let a;if("string"==typeof e){const t=new URL(e,location.href);a=new C((({url:e})=>e.href===t.href),s,n)}else if(e instanceof RegExp)a=new k(e,s,n);else if("function"==typeof e)a=new C(e,s,n);else{if(!(e instanceof C))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});a=e}return q().registerRoute(a),a}class U extends C{constructor(e,t){super((({request:s})=>{const n=e.getURLsToCacheKeys();for(const a of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:a}={}){const i=new URL(e,location.href);i.hash="",yield i.href;const r=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(i,t);if(yield r.href,s&&r.pathname.endsWith("/")){const e=new URL(r.href);e.pathname+=s,yield e.href}if(n){const e=new URL(r.href);e.pathname+=".html",yield e.href}if(a){const e=a({url:i});for(const t of e)yield t.href}}(s.url,t)){const t=n.get(a);if(t){return{cacheKey:t,integrity:e.getIntegrityForCacheKey(t)}}}}),e.strategy)}}class N extends g{async _handle(e,s){let n,a=await s.cacheMatch(e);if(!a)try{a=await s.fetchAndCachePut(e)}catch(e){e instanceof Error&&(n=e)}if(!a)throw new t("no-response",{url:e.url,error:n});return a}}const T={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};try{self["workbox:cacheable-response:6.4.0"]&&_()}catch(e){}class j{constructor(e={}){this._statuses=e.statuses,this._headers=e.headers}isResponseCacheable(e){let t=!0;return this._statuses&&(t=this._statuses.includes(e.status)),this._headers&&t&&(t=Object.keys(this._headers).some((t=>e.headers.get(t)===this._headers[t]))),t}}class I{constructor(e){this.cacheWillUpdate=async({response:e})=>this._cacheableResponse.isResponseCacheable(e)?e:null,this._cacheableResponse=new j(e)}}function K(e){e.then((()=>{}))}let M,P;const A=new WeakMap,S=new WeakMap,O=new WeakMap,W=new WeakMap,B=new WeakMap;let F={get(e,t,s){if(e instanceof IDBTransaction){if("done"===t)return S.get(e);if("objectStoreNames"===t)return e.objectStoreNames||O.get(e);if("store"===t)return s.objectStoreNames[1]?void 0:s.objectStore(s.objectStoreNames[0])}return V(e[t])},set:(e,t,s)=>(e[t]=s,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function H(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(P||(P=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(z(this),t),V(A.get(this))}:function(...t){return V(e.apply(z(this),t))}:function(t,...s){const n=e.call(z(this),t,...s);return O.set(n,t.sort?t.sort():[t]),V(n)}}function $(e){return"function"==typeof e?H(e):(e instanceof IDBTransaction&&function(e){if(S.has(e))return;const t=new Promise(((t,s)=>{const n=()=>{e.removeEventListener("complete",a),e.removeEventListener("error",i),e.removeEventListener("abort",i)},a=()=>{t(),n()},i=()=>{s(e.error||new DOMException("AbortError","AbortError")),n()};e.addEventListener("complete",a),e.addEventListener("error",i),e.addEventListener("abort",i)}));S.set(e,t)}(e),t=e,(M||(M=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some((e=>t instanceof e))?new Proxy(e,F):e);var t}function V(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,s)=>{const n=()=>{e.removeEventListener("success",a),e.removeEventListener("error",i)},a=()=>{t(V(e.result)),n()},i=()=>{s(e.error),n()};e.addEventListener("success",a),e.addEventListener("error",i)}));return t.then((t=>{t instanceof IDBCursor&&A.set(t,e)})).catch((()=>{})),B.set(t,e),t}(e);if(W.has(e))return W.get(e);const t=$(e);return t!==e&&(W.set(e,t),B.set(t,e)),t}const z=e=>B.get(e);const G=["get","getKey","getAll","getAllKeys","count"],Q=["put","add","delete","clear"],J=new Map;function X(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(J.get(t))return J.get(t);const s=t.replace(/FromIndex$/,""),n=t!==s,a=Q.includes(s);if(!(s in(n?IDBIndex:IDBObjectStore).prototype)||!a&&!G.includes(s))return;const i=async function(e,...t){const i=this.transaction(e,a?"readwrite":"readonly");let r=i.store;return n&&(r=r.index(t.shift())),(await Promise.all([r[s](...t),a&&i.done]))[0]};return J.set(t,i),i}F=(e=>({...e,get:(t,s,n)=>X(t,s)||e.get(t,s,n),has:(t,s)=>!!X(t,s)||e.has(t,s)}))(F);try{self["workbox:expiration:6.4.0"]&&_()}catch(e){}const Y="cache-entries",Z=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class ee{constructor(e){this._db=null,this._cacheName=e}_upgradeDb(e){const t=e.createObjectStore(Y,{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1})}_upgradeDbAndDeleteOldDbs(e){this._upgradeDb(e),this._cacheName&&function(e,{blocked:t}={}){const s=indexedDB.deleteDatabase(e);t&&s.addEventListener("blocked",(()=>t())),V(s).then((()=>{}))}(this._cacheName)}async setTimestamp(e,t){const s={url:e=Z(e),timestamp:t,cacheName:this._cacheName,id:this._getId(e)},n=(await this.getDb()).transaction(Y,"readwrite",{durability:"relaxed"});await n.store.put(s),await n.done}async getTimestamp(e){const t=await this.getDb(),s=await t.get(Y,this._getId(e));return null==s?void 0:s.timestamp}async expireEntries(e,t){const s=await this.getDb();let n=await s.transaction(Y).store.index("timestamp").openCursor(null,"prev");const a=[];let i=0;for(;n;){const s=n.value;s.cacheName===this._cacheName&&(e&&s.timestamp<e||t&&i>=t?a.push(n.value):i++),n=await n.continue()}const r=[];for(const e of a)await s.delete(Y,e.id),r.push(e.url);return r}_getId(e){return this._cacheName+"|"+Z(e)}async getDb(){return this._db||(this._db=await function(e,t,{blocked:s,upgrade:n,blocking:a,terminated:i}={}){const r=indexedDB.open(e,t),c=V(r);return n&&r.addEventListener("upgradeneeded",(e=>{n(V(r.result),e.oldVersion,e.newVersion,V(r.transaction))})),s&&r.addEventListener("blocked",(()=>s())),c.then((e=>{i&&e.addEventListener("close",(()=>i())),a&&e.addEventListener("versionchange",(()=>a()))})).catch((()=>{})),c}("workbox-expiration",1,{upgrade:this._upgradeDbAndDeleteOldDbs.bind(this)})),this._db}}class te{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._matchOptions=t.matchOptions,this._cacheName=e,this._timestampModel=new ee(e)}async expireEntries(){if(this._isRunning)return void(this._rerunRequested=!0);this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),s=await self.caches.open(this._cacheName);for(const e of t)await s.delete(e,this._matchOptions);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,K(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){const t=await this._timestampModel.getTimestamp(e),s=Date.now()-1e3*this._maxAgeSeconds;return void 0===t||t<s}return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}class se{constructor(e={}){this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const a=this._isResponseDateFresh(n),i=this._getCacheExpiration(s);K(i.expireEntries());const r=i.updateTimestamp(t.url);if(e)try{e.waitUntil(r)}catch(e){}return a?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this._getCacheExpiration(e);await s.updateTimestamp(t.url),await s.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&function(e){p.add(e)}((()=>this.deleteCacheAndMetadata()))}_getCacheExpiration(e){if(e===i())throw new t("expire-custom-caches-only");let s=this._cacheExpirations.get(e);return s||(s=new te(e,this._config),this._cacheExpirations.set(e,s)),s}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);if(null===t)return!0;return t>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}var ne;self.skipWaiting(),D(/^https:\/\/use\.typekit\.net\/evk7lzt\.css$/,new N({cacheName:"typekit-stylesheets",plugins:[new I({statuses:[0,200]}),new se({maxAgeSeconds:31536e3})]})),D(/^https:\/\/p\.typekit\.net/,new N({cacheName:"typekit-stylesheets",plugins:[new I({statuses:[0,200]}),new se({maxAgeSeconds:31536e3})]})),D(/^https:\/\/img\.shields\.io/,new class extends g{constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(T)}async _handle(e,s){const n=s.fetchAndCachePut(e).catch((()=>{}));let a,i=await s.cacheMatch(e);if(i);else try{i=await n}catch(e){e instanceof Error&&(a=e)}if(!i)throw new t("no-response",{url:e.url,error:a});return i}}({cacheName:"badges",plugins:[new I({statuses:[0,200]}),new se({maxAgeSeconds:31536e3})]})),D(/^https:\/\/use\.typekit\.net/,new N({cacheName:"typekit-webfonts",plugins:[new I({statuses:[0,200]}),new se({maxAgeSeconds:31536e3})]})),function(e){x().precache(e)}([{revision:"377fdf9a360edf0bf7cdbd225c5939be",url:"0b14a2ce.js"},{revision:"b04d8c824a39e7a14d9a87dde2a2c495",url:"0d66fba0.js"},{revision:"042b1837e224846577f98379003c9442",url:"0d66fba02.js"},{revision:"fbcc62935c44b45c35c2c8d86c1f4866",url:"0d66fba03.js"},{revision:"4ed981555416c8fcfe0e8429567eebc5",url:"0d830ab0.js"},{revision:"1464c366588cdeab7bbd4ee8610ea1a5",url:"0d830ab02.js"},{revision:"af0420aed194274adb4445642ecb2bf8",url:"0d830ab03.js"},{revision:"c38d3794e0f490a822577ba4103016a1",url:"0eb6a1b3.js"},{revision:"f14c73a5413e6610891184726f23f799",url:"1a00b51e.js"},{revision:"810238ec003eeb34f18c3c8e5b928171",url:"2d14be7b.js"},{revision:"75e86ef7024b328983ae983bca39f9ca",url:"404.html"},{revision:"524543102e0c1d3e757bb915c4494706",url:"49d897c2.js"},{revision:"7e4e7dd1384cfd27aa70ca036940ac04",url:"4ba04450.js"},{revision:"536be5da82a2239bab06fb1902c5e025",url:"529a1fce.js"},{revision:"0ddaae76794bb5fbf33835b10e96a31f",url:"54328dd6.js"},{revision:"9d3a64c9ff649aec74325605077729fc",url:"610e82e0.js"},{revision:"eb168d7cc89262022911e833e80021ab",url:"71b6d35d.js"},{revision:"4221c5cac8d07c134fa336ca28dfbe55",url:"7a4b4284.js"},{revision:"996071b1ccf4e87555319815ee2a2675",url:"9aceec6f.js"},{revision:"5a48d6ea11f638b732ae3672f3671922",url:"a93d8787.js"},{revision:"95bd9b719a2efbf0fee886825c44c764",url:"ac6f7576.js"},{revision:"3cce72da5295254c38bcd2fba77eeb0c",url:"c585250a.js"},{revision:"95eec18f073393a085a0cfe160909fce",url:"cf81941e.js"},{revision:"5a844e9b62eae5859f476527b87094f5",url:"components/accordion-item/index.html"},{revision:"e19901d131464d5fa344b25056e838d2",url:"components/accordion/index.html"},{revision:"9327881fe55602381fb217313860183e",url:"components/action-bar/index.html"},{revision:"4e476780cdecc46d60af3fb11eb4d9a4",url:"components/action-button/index.html"},{revision:"3074bae02c2e22236a50ed350a9259ec",url:"components/action-group/index.html"},{revision:"ccd68bdf4f3b80b4ad848cf4afa2934c",url:"components/action-menu/index.html"},{revision:"83bdbc6857a3789d1cb19db5e1c96f8b",url:"components/asset/index.html"},{revision:"31420e9a471c99086aecd3410995a74b",url:"components/avatar/index.html"},{revision:"a43294402b3b0048ff0cfaa33f704409",url:"components/banner/index.html"},{revision:"399185bb78cc172a970cdfb745b0b964",url:"components/base/index.html"},{revision:"2e30b327355006a87961c868c9f366e5",url:"components/bundle/index.html"},{revision:"f81b99b02e2a84aa5314c0a87f9bdede",url:"components/button-group/index.html"},{revision:"1a6b4c2e960ef58e84b0135016c0d2aa",url:"components/button/index.html"},{revision:"fa63fe897a07c4ddd374b21507dcd178",url:"components/card/index.html"},{revision:"75f28868ddeb09aba9e7fba5f8c68d34",url:"components/checkbox/index.html"},{revision:"c62e8b9a4cf0250e84cdc178d6b19cb9",url:"components/coachmark/index.html"},{revision:"08e24a3dd5a0404ae30c2fc32d7574aa",url:"components/color-area/index.html"},{revision:"f721b909976b659e9f8f793f8a12332d",url:"components/color-handle/index.html"},{revision:"c76b5a8b86e8817ee0e8dde45ef38817",url:"components/color-loupe/index.html"},{revision:"11d316c7ca126cf497ee191ba8c0bcad",url:"components/color-slider/index.html"},{revision:"fb40945d21a1bac1ec9efa2ed9649e88",url:"components/color-wheel/index.html"},{revision:"f575021056c74657d5f0f5d059f71a21",url:"components/dialog-wrapper/index.html"},{revision:"9963c97fc0ca5f2789ff7c1f183da410",url:"components/dialog/index.html"},{revision:"1bf5dc45e9de7267e081bb62c5cbd6d3",url:"components/divider/index.html"},{revision:"7669ff10168b3b506830ed05a7430491",url:"components/dropzone/index.html"},{revision:"e07530325178d4a1891aa0fa5120ce83",url:"components/field-group/index.html"},{revision:"d35605c58aedfed31cd7c1b44af4c6f9",url:"components/field-label/index.html"},{revision:"fcdf01125bc6c5488338d9526e1b47c0",url:"components/help-text-mixin/index.html"},{revision:"4a9eefc6201b52e0d09a76be41ce206b",url:"components/help-text/index.html"},{revision:"c7672a8a378a78416d7824f4ea0e3c65",url:"components/icon/index.html"},{revision:"78400e46884b1aac1376283a992c6232",url:"components/icons-ui/index.html"},{revision:"550b92bf3e36b647573ede37b102b94b",url:"components/icons-workflow/index.html"},{revision:"f0050b914aeec1f6075e0dd26a185e92",url:"components/icons/index.html"},{revision:"1c9633b6b6a045fda83cfb7e669e1ca8",url:"components/iconset/index.html"},{revision:"53fe65311d7a156f24b4321d09e4a7a8",url:"components/illustrated-message/index.html"},{revision:"f4c65878718a9238191ca8b4c2460fb5",url:"components/link/index.html"},{revision:"54041ce62e32379914e7319ef20a41c1",url:"components/menu-group/index.html"},{revision:"87e2e5265cd69e2bc8d521eee93dd96c",url:"components/menu-item/index.html"},{revision:"a33e44ae82ae0d34a23acb7345286245",url:"components/menu/index.html"},{revision:"86851317b2b86eed5a6ea6c3cf4a250e",url:"components/meter/index.html"},{revision:"1d6380af0ccc83f253926b525ccf2de7",url:"components/number-field/index.html"},{revision:"6faebb26850f45f4759b1e8c620fbf82",url:"components/overlay-trigger/index.html"},{revision:"27466295e4ec759e41332df8014b3465",url:"components/overlay/index.html"},{revision:"e48ff53413fb4a0b88dd7aac2020758f",url:"components/picker/index.html"},{revision:"d3671509251eb8deec47918242649fc4",url:"components/popover/index.html"},{revision:"f40adfcec5037cb7ad52fd4765f9556e",url:"components/progress-bar/index.html"},{revision:"e7a1fabe647a49c8b606ee3adf5762a0",url:"components/progress-circle/index.html"},{revision:"6e5612f214348c709f6dbde439b94d84",url:"components/quick-actions/index.html"},{revision:"77a5b19853cd3414b5747b572de25a61",url:"components/radio/index.html"},{revision:"7b91ec1ff0480ff7821045f6b22ad90a",url:"components/search/index.html"},{revision:"9abf04d722d73eaf29f4700dfd9f323f",url:"components/shared/index.html"},{revision:"72dc70a5dc16e023033780c5e0a78b80",url:"components/sidenav-item/index.html"},{revision:"a890a01c6ad8f8ccd671a48d70c86c3e",url:"components/sidenav/index.html"},{revision:"179ae20cd45a2a76a7c077502b72fa41",url:"components/slider-handle/index.html"},{revision:"49d820b761e69163fddd09815ad288b1",url:"components/slider/index.html"},{revision:"cac4a520400441c1d1798657f73eecf5",url:"components/split-button/index.html"},{revision:"c8766a1c82bcf4543f505b96a23c65bf",url:"components/split-view/index.html"},{revision:"4b7bbe73e55ef319f45fd9a2ae818146",url:"components/status-light/index.html"},{revision:"666b97f9082484b4e9d1c2cf42159d2c",url:"components/styles/index.html"},{revision:"44382bc8ca302812f095e1cf6e505750",url:"components/switch/index.html"},{revision:"b452b2ee25295789b00cd5bb02a7b6c8",url:"components/tab-panel/index.html"},{revision:"91522fb612fcfd30f0ab89ae89015078",url:"components/tab/index.html"},{revision:"e3256ed9c657a4289edc6076a16f5ccb",url:"components/tabs/index.html"},{revision:"af5f78ea48d36147317146bff9bf88ac",url:"components/tags/index.html"},{revision:"18f30f281c9fa9786dbe5790ffbbd948",url:"components/textarea/index.html"},{revision:"a5361b364019736861ea4fc3c7c5a68c",url:"components/textfield/index.html"},{revision:"195f3684cdbb0f7af1e31213b24a99f0",url:"components/theme/index.html"},{revision:"c6da7be1dc1ccaa8a964623592fd15c4",url:"components/thumbnail/index.html"},{revision:"0af0a750c2acb6caa1b88c5f51f1f3e6",url:"components/toast/index.html"},{revision:"c2d90fb8708be3de562b14f3a380d9fa",url:"components/tooltip/index.html"},{revision:"88fd896dd06386b42e77e2ea50fc061e",url:"components/top-nav/index.html"},{revision:"1102ad774c55dba47ccc5a5848e7ba50",url:"components/tray/index.html"},{revision:"5d355b37829bf085f72a91531ee4d0ca",url:"components/underlay/index.html"},{revision:"8a238106386c9e867e062f4838a1b98f",url:"f2d2e82d.js"},{revision:"b28bf60dd7e50b6dffd394ebc0f9057a",url:"favicon.ico"},{revision:"7e28e33447289ffe4a5abb9567d26fd5",url:"favicon.svg"},{revision:"875e892c61fc8725ac3976d9f2a97e08",url:"fonts.css"},{revision:"3423d943b32a5f847599d586d7605b6d",url:"getting-started/index.html"},{revision:"3d7440a3a91d87be3591e973ce77f47b",url:"guides/adding-component/index.html"},{revision:"f79bd40f0adcff04d6e6bd152cd74cc2",url:"guides/generating-components/index.html"},{revision:"ccf2d0a427cca069ede1df49f4f3df85",url:"guides/spectrum-config/index.html"},{revision:"2ac0bd9c9dbfe2c7e5c15a41fd7aa091",url:"images/icons/icon-128x128.png"},{revision:"c7caef98e3d5da19b00cfb4cd59e8afb",url:"images/icons/icon-144x144.png"},{revision:"95368112d0a434dbfb09d976282ae72c",url:"images/icons/icon-152x152.png"},{revision:"930bce645c9d4be7b21e3a7bb23204c0",url:"images/icons/icon-192x192.png"},{revision:"93e47e8071188b9fcbe386ca049d3613",url:"images/icons/icon-384x384.png"},{revision:"6bfb22699738473ec045858e6feac991",url:"images/icons/icon-512x512.png"},{revision:"86a2c89e4ae9c51650d18bd4baf9a1ee",url:"images/icons/icon-72x72.png"},{revision:"b73f20cc6535ba21709b0b8a70a47138",url:"images/icons/icon-96x96.png"},{revision:"b3f4a18d2c8affddc87976af8c8512f7",url:"index.html"},{revision:"acae74b82a669e5757ab4efe54f7cb5b",url:"manifest.webmanifest"},{revision:"db47095f53968d22bd97247472599c0d",url:"migrations/2021-8-11/index.html"},{revision:"9b0fce463888b96cdc98a3348af00f84",url:"shell-end.html"},{revision:"a12fd9930d9b9d1fbeb272a32716e258",url:"shell-start.html"},{revision:"23fde442467ebe673b44d40f1d2f8feb",url:"styles.css"},{revision:"4",url:"index.html?homescreen"},{revision:"1643062607998",url:"searchIndex.json"}]),function(e){const t=x();D(new U(t,e))}(ne)}();