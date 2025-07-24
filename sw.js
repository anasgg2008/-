const CACHE_NAME = 'your-store-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',          // غيّر هذا للاسم الصحيح لملف CSS عندك
  '/app.js',              // غيّر للاسم الصحيح لملف جافاسكريبت عندك
  '/images/icon-192.png', // تأكد من رفع الصورة في المسار الصحيح
  '/images/icon-512.png',
  // أضف هنا أي ملفات أخرى مهمة في موقعك (صور، خطوط، صفحات، سكريبتات ...)
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
