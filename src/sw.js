/* eslint-disable */
import { CacheFirst } from "workbox-strategies/CacheFirst";
import { NetworkFirst } from "workbox-strategies/NetworkFirst";
import { precacheAndRoute } from "workbox-precaching/precacheAndRoute";
import { registerRoute } from "workbox-routing/registerRoute";

precacheAndRoute(self.__WB_MANIFEST);
registerRoute("/", new NetworkFirst());

registerRoute(
  ({ request, url }) => {
    console.log(request, url);
    // If this isn't a navigation, skip.
    if (request.mode !== "navigate") {
      return false;
    } // If this is a URL that starts with /_, skip.

    if (url.pathname.startsWith("/_")) {
      return false;
    } // If this looks like a URL for a resource, because it contains // a file extension, skip.

    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    } // Return true to signal that we want to use the handler.

    return true;
  },
  new CacheFirst({
    cacheName: "ico-cache",
    matchOptions: {
      ignoreVary: true,
    },
  })
);

self.addEventListener("fetch", function (event) {
  console.log('fetch', event);
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("install", (event) =>
  event.waitUntil(self.skipWaiting())
);
self.addEventListener("activate", (event) =>
  event.waitUntil(self.clients.claim())
);
