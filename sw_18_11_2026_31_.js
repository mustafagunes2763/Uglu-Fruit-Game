// Ugluslar Fruit Game - servis calisani. Bunu bir daha degistirmen gerekmez:
// guncellemeleri oyun kendisi kontrol eder ve "Guncelle" tusuyla sorar.
const C='ugluslar-app',F=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:'reload'})))));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const req=e.request;if(req.method!=='GET')return;const u=new URL(req.url);
  if(u.origin!==self.location.origin||u.searchParams.has('check'))return; // Firebase ve surum kontrolu dogrudan internete
  e.respondWith(caches.match(req,{ignoreSearch:true}).then(r=>r||fetch(req).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(req,cp));}return res;})
    .catch(()=>caches.match('./index.html'))));});
