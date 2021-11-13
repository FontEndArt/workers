/* eslint-disable */
import { CacheFirst } from "workbox-strategies/CacheFirst";
import { NetworkFirst } from "workbox-strategies/NetworkFirst";
import { precacheAndRoute } from "workbox-precaching/precacheAndRoute";
import { registerRoute } from "workbox-routing/registerRoute";

precacheAndRoute(self.__WB_MANIFEST);
registerRoute("/", new NetworkFirst());

registerRoute(
  "/favicon.ico",
  new CacheFirst({
    cacheName: "ico-cache",
    matchOptions: {
      ignoreVary: true,
    },
  })
);

self.addEventListener("fetch", function (event) {
  console.log(event);
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
