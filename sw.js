const CACHE_NAME = 'pomodoro-v1';
const ARQUIVOS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './alarm.mp3'
];

// "install": quando o SW e registrado pela primeira vez,
// abre o cache e salva todos os arquivos listados
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ARQUIVOS))
  );
});

// "fetch": cada vez que o app pede um arquivo,
// o SW verifica se ja tem no cache antes de ir na rede
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
