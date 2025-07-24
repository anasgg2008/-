const CACHE_NAME = 'your-store-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',          // غيّر للاسم الصحيح لملف CSS عندك
  '/app.js',              // غيّر للاسم الصحيح لملف جافاسكريبت عندك
  '/manifest.json',       // مهم جداً تضيف ملف المانيست
  '/images/icon-192.png',
  '/images/icon-512.png',
  // أضف هنا أي ملفات أخرى ضرورية لموقعك
];

// عند تثبيت الـ Service Worker، خزّن الملفات المهمة
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// عند طلب موارد، حاول تجيبها من الكاش أولاً، وإذا ما موجودة حملها من الشبكة
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// عند تفعيل الـ Service Worker، احذف الكاش القديم إذا وجد
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
});
