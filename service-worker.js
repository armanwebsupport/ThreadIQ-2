const C='threadiq-v1',F=['index.html','css/style.css','css/dashboard.css','css/forms.css','js/database.js','js/dashboard.js','js/vehicles.js','js/tyres.js','js/inspection.js','js/reports.js','js/app.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x))))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
