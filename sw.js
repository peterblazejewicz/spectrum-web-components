!function(){"use strict";try{self["workbox:core:6.4.0"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}const s={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},n=e=>[s.prefix,e,s.suffix].filter((e=>e&&e.length>0)).join("-"),a=e=>e||n(s.precache),i=e=>e||n(s.runtime);function r(e,t){const s=t();return e.waitUntil(s),s}try{self["workbox:precaching:6.4.0"]&&_()}catch(e){}function c(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const a=new URL(n,location.href),i=new URL(n,location.href);return a.searchParams.set("__WB_REVISION__",s),{cacheKey:a.href,url:i.href}}class o{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class d{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._precacheController=e}}let l;async function h(e,s){let n=null;if(e.url){n=new URL(e.url).origin}if(n!==self.location.origin)throw new t("cross-origin-copy-response",{origin:n});const a=e.clone(),i={headers:new Headers(a.headers),status:a.status,statusText:a.statusText},r=s?s(i):i,c=function(){if(void 0===l){const e=new Response("");if("body"in e)try{new Response(e.body),l=!0}catch(e){l=!1}l=!1}return l}()?a.body:await a.blob();return new Response(c,r)}function u(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class f{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const b=new Set;try{self["workbox:strategies:6.4.0"]&&_()}catch(e){}function p(e){return"string"==typeof e?new Request(e):e}class m{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new f,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:s}=this;let n=p(e);if("navigate"===n.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const a=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))n=await e({request:n.clone(),event:s})}catch(e){if(e instanceof Error)throw new t("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}const i=n.clone();try{let e;e=await fetch(n,"navigate"===n.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:i,response:e});return e}catch(e){throw a&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:a.clone(),request:i.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=p(e);let s;const{cacheName:n,matchOptions:a}=this._strategy,i=await this.getCacheKey(t,"read"),r=Object.assign(Object.assign({},a),{cacheName:n});s=await caches.match(i,r);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:n,matchOptions:a,cachedResponse:s,request:i,event:this.event})||void 0;return s}async cachePut(e,s){const n=p(e);var a;await(a=0,new Promise((e=>setTimeout(e,a))));const i=await this.getCacheKey(n,"write");if(!s)throw new t("cache-put-with-no-response",{url:(r=i.url,new URL(String(r),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var r;const c=await this._ensureResponseSafeToCache(s);if(!c)return!1;const{cacheName:o,matchOptions:d}=this._strategy,l=await self.caches.open(o),h=this.hasCallback("cacheDidUpdate"),f=h?await async function(e,t,s,n){const a=u(t.url,s);if(t.url===a)return e.match(t,n);const i=Object.assign(Object.assign({},n),{ignoreSearch:!0}),r=await e.keys(t,i);for(const t of r)if(a===u(t.url,s))return e.match(t,n)}(l,i.clone(),["__WB_REVISION__"],d):null;try{await l.put(i,h?c.clone():c)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of b)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:o,oldResponse:f,newResponse:c.clone(),request:i,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let n=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))n=p(await e({mode:t,request:n,event:this.event,params:this.params}));this._cacheKeys[s]=n}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),n=n=>{const a=Object.assign(Object.assign({},n),{state:s});return t[e](a)};yield n}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class g{constructor(e={}){this.cacheName=i(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,n="params"in e?e.params:void 0,a=new m(this,{event:t,request:s,params:n}),i=this._getResponse(a,s,t);return[i,this._awaitComplete(i,a,s,t)]}async _getResponse(e,s,n){let a;await e.runCallbacks("handlerWillStart",{event:n,request:s});try{if(a=await this._handle(s,e),!a||"error"===a.type)throw new t("no-response",{url:s.url})}catch(t){if(t instanceof Error)for(const i of e.iterateCallbacks("handlerDidError"))if(a=await i({error:t,event:n,request:s}),a)break;if(!a)throw t}for(const t of e.iterateCallbacks("handlerWillRespond"))a=await t({event:n,request:s,response:a});return a}async _awaitComplete(e,t,s,n){let a,i;try{a=await e}catch(i){}try{await t.runCallbacks("handlerDidRespond",{event:n,request:s,response:a}),await t.doneWaiting()}catch(e){e instanceof Error&&(i=e)}if(await t.runCallbacks("handlerDidComplete",{event:n,request:s,response:a,error:i}),t.destroy(),i)throw i}}class v extends g{constructor(e={}){e.cacheName=a(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(v.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,s){let n;const a=s.params||{};if(!this._fallbackToNetwork)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{const t=a.integrity,i=e.integrity,r=!i||i===t;n=await s.fetch(new Request(e,{integrity:i||t})),t&&r&&(this._useDefaultCacheabilityPluginIfNeeded(),await s.cachePut(e,n.clone()))}return n}async _handleInstall(e,s){this._useDefaultCacheabilityPluginIfNeeded();const n=await s.fetch(e);if(!await s.cachePut(e,n.clone()))throw new t("bad-precaching-response",{url:e.url,status:n.status});return n}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,n]of this.plugins.entries())n!==v.copyRedirectedCacheableResponsesPlugin&&(n===v.defaultPrecacheCacheabilityPlugin&&(e=s),n.cacheWillUpdate&&t++);0===t?this.plugins.push(v.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}v.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},v.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await h(e):e};class w{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new v({cacheName:a(e),plugins:[...t,new d({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const s=[];for(const n of e){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:a}=c(n),i="string"!=typeof n&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(a)&&this._urlsToCacheKeys.get(a)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(a),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:a});this._cacheKeysToIntegrities.set(e,n.integrity)}if(this._urlsToCacheKeys.set(a,e),this._urlsToCacheModes.set(a,i),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return r(e,(async()=>{const t=new o;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const n=this._cacheKeysToIntegrities.get(s),a=this._urlsToCacheModes.get(t),i=new Request(t,{integrity:n,cache:a,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:i,event:e}))}const{updatedURLs:s,notUpdatedURLs:n}=t;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(e){return r(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(const a of t)s.has(a.url)||(await e.delete(a),n.push(a.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params=Object.assign({cacheKey:s},t.params),this.strategy.handle(t))}}let y;const x=()=>(y||(y=new w),y);try{self["workbox:routing:6.4.0"]&&_()}catch(e){}const R=e=>e&&"object"==typeof e?e:{handle:e};class C{constructor(e,t,s="GET"){this.handler=R(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=R(e)}}class j extends C{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class k{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:a,route:i}=this.findMatchingRoute({event:t,request:e,sameOrigin:n,url:s});let r=i&&i.handler;const c=e.method;if(!r&&this._defaultHandlerMap.has(c)&&(r=this._defaultHandlerMap.get(c)),!r)return;let o;try{o=r.handle({url:s,request:e,event:t,params:a})}catch(e){o=Promise.reject(e)}const d=i&&i.catchHandler;return o instanceof Promise&&(this._catchHandler||d)&&(o=o.catch((async n=>{if(d)try{return await d.handle({url:s,request:e,event:t,params:a})}catch(e){e instanceof Error&&(n=e)}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw n}))),o}findMatchingRoute({url:e,sameOrigin:t,request:s,event:n}){const a=this._routes.get(s.method)||[];for(const i of a){let a;const r=i.match({url:e,sameOrigin:t,request:s,event:n});if(r)return a=r,(Array.isArray(a)&&0===a.length||r.constructor===Object&&0===Object.keys(r).length||"boolean"==typeof r)&&(a=void 0),{route:i,params:a}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,R(e))}setCatchHandler(e){this._catchHandler=R(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this._routes.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this._routes.get(e.method).splice(s,1)}}let L;const E=()=>(L||(L=new k,L.addFetchListener(),L.addCacheListener()),L);function q(e,s,n){let a;if("string"==typeof e){const t=new URL(e,location.href);a=new C((({url:e})=>e.href===t.href),s,n)}else if(e instanceof RegExp)a=new j(e,s,n);else if("function"==typeof e)a=new C(e,s,n);else{if(!(e instanceof C))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});a=e}return E().registerRoute(a),a}class D extends C{constructor(e,t){super((({request:s})=>{const n=e.getURLsToCacheKeys();for(const a of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:a}={}){const i=new URL(e,location.href);i.hash="",yield i.href;const r=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(i,t);if(yield r.href,s&&r.pathname.endsWith("/")){const e=new URL(r.href);e.pathname+=s,yield e.href}if(n){const e=new URL(r.href);e.pathname+=".html",yield e.href}if(a){const e=a({url:i});for(const t of e)yield t.href}}(s.url,t)){const t=n.get(a);if(t){return{cacheKey:t,integrity:e.getIntegrityForCacheKey(t)}}}}),e.strategy)}}class U extends g{async _handle(e,s){let n,a=await s.cacheMatch(e);if(!a)try{a=await s.fetchAndCachePut(e)}catch(e){e instanceof Error&&(n=e)}if(!a)throw new t("no-response",{url:e.url,error:n});return a}}const N={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};try{self["workbox:cacheable-response:6.4.0"]&&_()}catch(e){}class T{constructor(e={}){this._statuses=e.statuses,this._headers=e.headers}isResponseCacheable(e){let t=!0;return this._statuses&&(t=this._statuses.includes(e.status)),this._headers&&t&&(t=Object.keys(this._headers).some((t=>e.headers.get(t)===this._headers[t]))),t}}class I{constructor(e){this.cacheWillUpdate=async({response:e})=>this._cacheableResponse.isResponseCacheable(e)?e:null,this._cacheableResponse=new T(e)}}function K(e){e.then((()=>{}))}let M,P;const A=new WeakMap,S=new WeakMap,O=new WeakMap,W=new WeakMap,B=new WeakMap;let F={get(e,t,s){if(e instanceof IDBTransaction){if("done"===t)return S.get(e);if("objectStoreNames"===t)return e.objectStoreNames||O.get(e);if("store"===t)return s.objectStoreNames[1]?void 0:s.objectStore(s.objectStoreNames[0])}return V(e[t])},set:(e,t,s)=>(e[t]=s,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function H(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(P||(P=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(z(this),t),V(A.get(this))}:function(...t){return V(e.apply(z(this),t))}:function(t,...s){const n=e.call(z(this),t,...s);return O.set(n,t.sort?t.sort():[t]),V(n)}}function $(e){return"function"==typeof e?H(e):(e instanceof IDBTransaction&&function(e){if(S.has(e))return;const t=new Promise(((t,s)=>{const n=()=>{e.removeEventListener("complete",a),e.removeEventListener("error",i),e.removeEventListener("abort",i)},a=()=>{t(),n()},i=()=>{s(e.error||new DOMException("AbortError","AbortError")),n()};e.addEventListener("complete",a),e.addEventListener("error",i),e.addEventListener("abort",i)}));S.set(e,t)}(e),t=e,(M||(M=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some((e=>t instanceof e))?new Proxy(e,F):e);var t}function V(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,s)=>{const n=()=>{e.removeEventListener("success",a),e.removeEventListener("error",i)},a=()=>{t(V(e.result)),n()},i=()=>{s(e.error),n()};e.addEventListener("success",a),e.addEventListener("error",i)}));return t.then((t=>{t instanceof IDBCursor&&A.set(t,e)})).catch((()=>{})),B.set(t,e),t}(e);if(W.has(e))return W.get(e);const t=$(e);return t!==e&&(W.set(e,t),B.set(t,e)),t}const z=e=>B.get(e);const G=["get","getKey","getAll","getAllKeys","count"],Q=["put","add","delete","clear"],J=new Map;function X(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(J.get(t))return J.get(t);const s=t.replace(/FromIndex$/,""),n=t!==s,a=Q.includes(s);if(!(s in(n?IDBIndex:IDBObjectStore).prototype)||!a&&!G.includes(s))return;const i=async function(e,...t){const i=this.transaction(e,a?"readwrite":"readonly");let r=i.store;return n&&(r=r.index(t.shift())),(await Promise.all([r[s](...t),a&&i.done]))[0]};return J.set(t,i),i}F=(e=>({...e,get:(t,s,n)=>X(t,s)||e.get(t,s,n),has:(t,s)=>!!X(t,s)||e.has(t,s)}))(F);try{self["workbox:expiration:6.4.0"]&&_()}catch(e){}const Y="cache-entries",Z=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class ee{constructor(e){this._db=null,this._cacheName=e}_upgradeDb(e){const t=e.createObjectStore(Y,{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1})}_upgradeDbAndDeleteOldDbs(e){this._upgradeDb(e),this._cacheName&&function(e,{blocked:t}={}){const s=indexedDB.deleteDatabase(e);t&&s.addEventListener("blocked",(()=>t())),V(s).then((()=>{}))}(this._cacheName)}async setTimestamp(e,t){const s={url:e=Z(e),timestamp:t,cacheName:this._cacheName,id:this._getId(e)},n=(await this.getDb()).transaction(Y,"readwrite",{durability:"relaxed"});await n.store.put(s),await n.done}async getTimestamp(e){const t=await this.getDb(),s=await t.get(Y,this._getId(e));return null==s?void 0:s.timestamp}async expireEntries(e,t){const s=await this.getDb();let n=await s.transaction(Y).store.index("timestamp").openCursor(null,"prev");const a=[];let i=0;for(;n;){const s=n.value;s.cacheName===this._cacheName&&(e&&s.timestamp<e||t&&i>=t?a.push(n.value):i++),n=await n.continue()}const r=[];for(const e of a)await s.delete(Y,e.id),r.push(e.url);return r}_getId(e){return this._cacheName+"|"+Z(e)}async getDb(){return this._db||(this._db=await function(e,t,{blocked:s,upgrade:n,blocking:a,terminated:i}={}){const r=indexedDB.open(e,t),c=V(r);return n&&r.addEventListener("upgradeneeded",(e=>{n(V(r.result),e.oldVersion,e.newVersion,V(r.transaction))})),s&&r.addEventListener("blocked",(()=>s())),c.then((e=>{i&&e.addEventListener("close",(()=>i())),a&&e.addEventListener("versionchange",(()=>a()))})).catch((()=>{})),c}("workbox-expiration",1,{upgrade:this._upgradeDbAndDeleteOldDbs.bind(this)})),this._db}}class te{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._matchOptions=t.matchOptions,this._cacheName=e,this._timestampModel=new ee(e)}async expireEntries(){if(this._isRunning)return void(this._rerunRequested=!0);this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),s=await self.caches.open(this._cacheName);for(const e of t)await s.delete(e,this._matchOptions);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,K(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){const t=await this._timestampModel.getTimestamp(e),s=Date.now()-1e3*this._maxAgeSeconds;return void 0===t||t<s}return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}class se{constructor(e={}){this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const a=this._isResponseDateFresh(n),i=this._getCacheExpiration(s);K(i.expireEntries());const r=i.updateTimestamp(t.url);if(e)try{e.waitUntil(r)}catch(e){}return a?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this._getCacheExpiration(e);await s.updateTimestamp(t.url),await s.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&function(e){b.add(e)}((()=>this.deleteCacheAndMetadata()))}_getCacheExpiration(e){if(e===i())throw new t("expire-custom-caches-only");let s=this._cacheExpirations.get(e);return s||(s=new te(e,this._config),this._cacheExpirations.set(e,s)),s}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);if(null===t)return!0;return t>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}var ne;self.skipWaiting(),q(/^https:\/\/use\.typekit\.net\/evk7lzt\.css$/,new U({cacheName:"typekit-stylesheets",plugins:[new I({statuses:[0,200]}),new se({maxAgeSeconds:31536e3})]})),q(/^https:\/\/p\.typekit\.net/,new U({cacheName:"typekit-stylesheets",plugins:[new I({statuses:[0,200]}),new se({maxAgeSeconds:31536e3})]})),q(/^https:\/\/img\.shields\.io/,new class extends g{constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(N)}async _handle(e,s){const n=s.fetchAndCachePut(e).catch((()=>{}));let a,i=await s.cacheMatch(e);if(i);else try{i=await n}catch(e){e instanceof Error&&(a=e)}if(!i)throw new t("no-response",{url:e.url,error:a});return i}}({cacheName:"badges",plugins:[new I({statuses:[0,200]}),new se({maxAgeSeconds:31536e3})]})),q(/^https:\/\/use\.typekit\.net/,new U({cacheName:"typekit-webfonts",plugins:[new I({statuses:[0,200]}),new se({maxAgeSeconds:31536e3})]})),function(e){x().precache(e)}([{revision:"0991aec5e7bcfeb654e843b0536f6228",url:"0a58de6f.js"},{revision:"d00e73a2685aebcabccac009000c4ae4",url:"0c151f11.js"},{revision:"67311da56e2a5309a7180234072cabf4",url:"0c151f112.js"},{revision:"9c2eb4a7d78e26c80ebe852738336a48",url:"0c151f113.js"},{revision:"9f67077340eec709c2e08344804145c4",url:"0d5bac30.js"},{revision:"552e477c3f24b341203cdfa91a59b083",url:"1379384f.js"},{revision:"a5ab24b23628446df2ffd6f470ecb4df",url:"167f6288.js"},{revision:"c814efc4b1389efde70500ea9c8ec9bb",url:"19b9f94f.js"},{revision:"e24847f50685507e6691b066747c5e8c",url:"1a41ae8d.js"},{revision:"6e04e8d1b941db07591d50afc7ae750d",url:"21d6199b.js"},{revision:"ea23baa2ec9f78788514c617e5cbebc4",url:"22fad7c9.js"},{revision:"03e6b0ab1f5972e1f4967a0dfae9cc11",url:"238879af.js"},{revision:"48defacd59455c7d58d73cc42c742c8a",url:"26e95c7a.js"},{revision:"ebefdffda7de8e4cb0e1310d263a5ee5",url:"2aee6762.js"},{revision:"4ed28aabe490e79114d41f9d75678ed5",url:"2aff7b84.js"},{revision:"4d1de1eec0d46995ca26287deb256ef0",url:"31a32b8d.js"},{revision:"562607cce092b4acea364c0f8de06dd1",url:"323ee61e.js"},{revision:"5f703a51a1f9ca8951f05473c55ca894",url:"3aae9796.js"},{revision:"75e86ef7024b328983ae983bca39f9ca",url:"404.html"},{revision:"51851c5515c1cf36af4c9576e850fd55",url:"415e00b3.js"},{revision:"0150989856845d1633ff62b5d515e0e1",url:"436d3e2c.js"},{revision:"c7a1a7c21c99ba64f96d1582429e648b",url:"43e0654a.js"},{revision:"b886eb1d6aeff23cf68d8fbf17933362",url:"43e0654a2.js"},{revision:"6b2eb03ff8453b3a84b61f7fc7de60f3",url:"43e0654a3.js"},{revision:"05e056e22fcb7b6ff1bab477444c6a7f",url:"48f82265.js"},{revision:"fd9042efa4931e2312e1ca3643e0dcfb",url:"49684902.js"},{revision:"be52b1382b22d874f9fab81bb05bece3",url:"5553ea2d.js"},{revision:"b8b544583b2129f8359a68e37ce42325",url:"5dba1fa8.js"},{revision:"6c443c0e1ba216e6d27cedef8f342118",url:"5fbb8ed3.js"},{revision:"adcb3028c94b02abb6d38be6db9eb840",url:"605d3acb.js"},{revision:"3fa740c22b44a0fd583ddc5b12e8810e",url:"6b9e7b1a.js"},{revision:"f20b48be09f34cc1a26a33a163c74eed",url:"7129fe84.js"},{revision:"21a1a51004d031a0bd7886f4629ddd39",url:"719e1234.js"},{revision:"dd3a551fa5d890b41c0a427da20d7d47",url:"72de00ca.js"},{revision:"f3838d7ddd3b63b78c6c5909b8036040",url:"785fdb8c.js"},{revision:"a61ef413fb3468bc854c6852e05fe356",url:"78f07ab8.js"},{revision:"61dceb4e61cd17fad42dba5f39427494",url:"82121e4e.js"},{revision:"ad2348e82f8c2802566956ecd2bbb9f2",url:"8495cdad.js"},{revision:"5609ef3a1ea7d5223a816a7bd4716542",url:"84ed7626.js"},{revision:"1190feaf542a565e6038d10737b4f015",url:"8774539a.js"},{revision:"ab18bf26b62eb4e763842155aac9843f",url:"892f9036.js"},{revision:"3f5e4c5b6e138e085694b03b4ff2377b",url:"89d0d734.js"},{revision:"4e558dbcdc3524acb429820aa608c537",url:"976c71b2.js"},{revision:"71784516e100da0ebab16fda29cfaf8b",url:"9c152608.js"},{revision:"6cbfe317b620c33c089b5e20e5f6a7f1",url:"a29bb693.js"},{revision:"aaebcaba4da53fa4529b850d3cc0f5fd",url:"a8491360.js"},{revision:"a46cdb94d9ee8c346749f9d271495656",url:"b09c6e1a.js"},{revision:"bbf7a20b4485cf17e3c63a25d3fe8173",url:"b5b4292c.js"},{revision:"c4e7c53982e791b2844ac650291baaa9",url:"b5f34f36.js"},{revision:"bfa48aefa3bf92b573172dab49708450",url:"bdc72c94.js"},{revision:"e8e865e7b31b08ee27a6768998cd6054",url:"c0f8c16d.js"},{revision:"8b12b977c8a822434536a91605a05027",url:"components/accordion-item/index.html"},{revision:"e48a36cfb55edfc4556862147d2f5601",url:"components/accordion/index.html"},{revision:"1b43e0940872dd5d293183d860e95bdc",url:"components/action-bar/index.html"},{revision:"fff9f7deae835c92882db4efd273695c",url:"components/action-button/index.html"},{revision:"9859f87d4e01d5ac8e884e67b3a74267",url:"components/action-group/index.html"},{revision:"6a0f47b314e6572922a25b5843044ab0",url:"components/action-menu/index.html"},{revision:"f3f5bf9935e4bad51f991d47b71983f7",url:"components/asset/index.html"},{revision:"9c0cb3261432edec9afa7f2b6197b4dd",url:"components/avatar/index.html"},{revision:"ba5adcd212b9dbdb2d265b33b713c33a",url:"components/badge/index.html"},{revision:"24b69ea136b9e633985b39086f96478f",url:"components/banner/index.html"},{revision:"ef94937b0e4d658393bfa6f95d458326",url:"components/base/index.html"},{revision:"e733e399bd503ca54d303726fa8bd0f1",url:"components/bundle/index.html"},{revision:"552063909d0171b6cf6c269b3fb291ca",url:"components/button-group/index.html"},{revision:"e3cb4452a1e186091cb54102b14ad086",url:"components/button/index.html"},{revision:"a86a9c8a5226310573b22062f845220d",url:"components/card/index.html"},{revision:"e95e37d76c04584379741d8171b358ce",url:"components/checkbox/index.html"},{revision:"e17698dc386e76f2e854a14164ec6062",url:"components/coachmark/index.html"},{revision:"dceb503adda01dd634fdc2fe1c452573",url:"components/color-area/index.html"},{revision:"74f4d2dddb934acef4cb48ef6f9a1602",url:"components/color-handle/index.html"},{revision:"f51d9084e86c180106e56f59fb38e998",url:"components/color-loupe/index.html"},{revision:"183e5419d398e1dfd6529ee233f0c4f5",url:"components/color-slider/index.html"},{revision:"1671fd8e84091385c0549c18d1dea7f4",url:"components/color-wheel/index.html"},{revision:"e833d3d582832fde2d1e3b9e3bd6b698",url:"components/dialog-wrapper/index.html"},{revision:"bef6f965c13e3f8452561f1a608f727e",url:"components/dialog/index.html"},{revision:"50f211c7d8abb89d97432e9964ca56d4",url:"components/divider/index.html"},{revision:"e7c65b7a665ff70a419c806a6ef00b5b",url:"components/dropzone/index.html"},{revision:"f5c7a701f0d790895d2c1524ae3f922f",url:"components/field-group/index.html"},{revision:"f6b2183f172ad1d8629fe6fde3c6d530",url:"components/field-label/index.html"},{revision:"1946cf9c82352a0fb9a610420adaec23",url:"components/help-text-mixin/index.html"},{revision:"c8712600b07a690cb1ecad0b0cff36e9",url:"components/help-text/index.html"},{revision:"8f8ad5216b4318a2a84205bbf4af0249",url:"components/icon/index.html"},{revision:"71482ab353be1df855b46d5c02feec4f",url:"components/icons-ui/index.html"},{revision:"26825bc0c118d2ad80160ae1181f23b1",url:"components/icons-workflow/index.html"},{revision:"bff3e4a74f07b929e0ee51e1bc3bf201",url:"components/icons/index.html"},{revision:"90286261331bf7e8bd1db326b23bd87a",url:"components/iconset/index.html"},{revision:"f9c80cfa4b2bae567b83e7cf6bdda3fe",url:"components/illustrated-message/index.html"},{revision:"4453a50fed4aed67cec449021ab819e5",url:"components/link/index.html"},{revision:"43cf78399869e28ac231df08ec475a10",url:"components/menu-group/index.html"},{revision:"e731ef65312477268cb17c7a15e13b0d",url:"components/menu-item/index.html"},{revision:"1ddac060e2d37364d9228d4c013756cd",url:"components/menu/index.html"},{revision:"3f83cdf61b6b7a991d73f04989f204db",url:"components/meter/index.html"},{revision:"36af077a6215a460c57883e437496647",url:"components/number-field/index.html"},{revision:"530023994d8c5d46a76ed6536bfb2593",url:"components/overlay-trigger/index.html"},{revision:"5e86537b064a2ae11d87543e42bfb108",url:"components/overlay/index.html"},{revision:"368df370aefe342113808dc11455114d",url:"components/picker/index.html"},{revision:"ee16d17ddbc2b0574d669da88dd0d5ab",url:"components/popover/index.html"},{revision:"838de0210fa0a425e68be5a24be13ef3",url:"components/progress-bar/index.html"},{revision:"86e16ba71eb3e74a443f2bfd3416731d",url:"components/progress-circle/index.html"},{revision:"da27a666086256acba1bb584b42f9eb7",url:"components/quick-actions/index.html"},{revision:"ad3101e9af3e0ef8bd96e1bc685e25ce",url:"components/radio/index.html"},{revision:"d3955692dca4577eb6b47c8e6c4ade03",url:"components/search/index.html"},{revision:"b96035ce56395f582bc38d20e94f7e76",url:"components/shared/index.html"},{revision:"57bec48fe35036d18ce69d687b5361f4",url:"components/sidenav-item/index.html"},{revision:"575bcb251cefc18713abd47529abb340",url:"components/sidenav/index.html"},{revision:"83ce70a205768c1a55e417dd3248a87c",url:"components/slider-handle/index.html"},{revision:"e5c616da94c27fb497a39b04790b75e1",url:"components/slider/index.html"},{revision:"bfea576955c6b9aad99dc5ba927bb5d0",url:"components/split-button/index.html"},{revision:"fed42ff9cd7d7410a4f61c07ece727cb",url:"components/split-view/index.html"},{revision:"2e38d038eca67d7568b1b588742c974b",url:"components/status-light/index.html"},{revision:"b2d7af2f7e86a1328b404c504988aa97",url:"components/styles/index.html"},{revision:"86f251441b7107038015496123deed23",url:"components/swatch-group/index.html"},{revision:"5d9ce9e50b9c0f30070fa13bfc2da49f",url:"components/swatch/index.html"},{revision:"a0378fd154de6963a2d934691fe3ece9",url:"components/switch/index.html"},{revision:"21b7687721964d9c7a24f631ef4798bb",url:"components/tab-panel/index.html"},{revision:"1ced31b8cc88b52659680ba804af270c",url:"components/tab/index.html"},{revision:"6351a1fd6269e1f95eeae1cea4cb6bf6",url:"components/tabs/index.html"},{revision:"d4e49ee2eefca5abfb485afb1ddee414",url:"components/tags/index.html"},{revision:"f476f01c1eac41d0bad5fe76aebe5489",url:"components/textarea/index.html"},{revision:"f4ced8a7d0247f22890dad0c1b658382",url:"components/textfield/index.html"},{revision:"eadddc4d8cedb10709bc69f4769ce494",url:"components/theme/index.html"},{revision:"b0ad2ae826e4b55ff2533f84dd4ac5d3",url:"components/thumbnail/index.html"},{revision:"cc4dd34469fda352ad2c1b9d098149b3",url:"components/toast/index.html"},{revision:"d912f935f8bf867c7f843b51d7d2169f",url:"components/tooltip/index.html"},{revision:"25b15b3aca61848b9d135f014e441128",url:"components/top-nav/index.html"},{revision:"50e187155058529383792a9ee1257541",url:"components/tray/index.html"},{revision:"1f8f4a0aa1b15a73589579a4916cf0f4",url:"components/underlay/index.html"},{revision:"36e69b6c8c273e1e647da8eb7d5ea87c",url:"d02421e0.js"},{revision:"83b79ca0f6180feb0b62319c4395b3e5",url:"d9c9b940.js"},{revision:"6104c7fd0578adc9d234ec2db2b0adb5",url:"def45cc3.js"},{revision:"4afe7584f3e3d29ae9a38dc4cf084f32",url:"e50c5e8d.js"},{revision:"1ce2f91effbe7012f1f1fe23a4bd9031",url:"f37e5f8c.js"},{revision:"fb3514d58f46ba9aef4a9c14e4c3c608",url:"f6bedc66.js"},{revision:"b28bf60dd7e50b6dffd394ebc0f9057a",url:"favicon.ico"},{revision:"7e28e33447289ffe4a5abb9567d26fd5",url:"favicon.svg"},{revision:"875e892c61fc8725ac3976d9f2a97e08",url:"fonts.css"},{revision:"68959a45a8d191cf5cd9ceec36ab9abf",url:"getting-started/index.html"},{revision:"5f501bfa75b8fb7a9df8ad2622f8aa68",url:"guides/adding-component/index.html"},{revision:"79c35b907a41009bbf0f35347b8edc94",url:"guides/generating-components/index.html"},{revision:"c747b8457f29486f00e72b274d4739e6",url:"guides/spectrum-config/index.html"},{revision:"2ac0bd9c9dbfe2c7e5c15a41fd7aa091",url:"images/icons/icon-128x128.png"},{revision:"c7caef98e3d5da19b00cfb4cd59e8afb",url:"images/icons/icon-144x144.png"},{revision:"95368112d0a434dbfb09d976282ae72c",url:"images/icons/icon-152x152.png"},{revision:"930bce645c9d4be7b21e3a7bb23204c0",url:"images/icons/icon-192x192.png"},{revision:"93e47e8071188b9fcbe386ca049d3613",url:"images/icons/icon-384x384.png"},{revision:"6bfb22699738473ec045858e6feac991",url:"images/icons/icon-512x512.png"},{revision:"86a2c89e4ae9c51650d18bd4baf9a1ee",url:"images/icons/icon-72x72.png"},{revision:"b73f20cc6535ba21709b0b8a70a47138",url:"images/icons/icon-96x96.png"},{revision:"01aec9a481c1ec79dad496733a5c8d2c",url:"index.html"},{revision:"acae74b82a669e5757ab4efe54f7cb5b",url:"manifest.webmanifest"},{revision:"84c70498de3bc81f392b832ecdb38d01",url:"migrations/2021-8-11/index.html"},{revision:"cf050e247ec0b989bff33d8b08b1f3fb",url:"shell-end.html"},{revision:"a12fd9930d9b9d1fbeb272a32716e258",url:"shell-start.html"},{revision:"fa2d754a74aed834cd12ada1172ccb7d",url:"styles.css"},{revision:"4",url:"index.html?homescreen"},{revision:"1658516504420",url:"searchIndex.json"}]),function(e){const t=x();q(new D(t,e))}(ne)}();
