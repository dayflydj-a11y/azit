const CACHE_NAME = 'azit-v1';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// 구글 실시간 동기화 오염 방지를 위해 캐싱을 우회하고 네트워크에서 직접 자원을 수신
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
