const App={
  views:{home:()=>Dash.render(),vehicles:()=>Veh.render(),analytics:()=>Rep.render(),history:()=>Insp.render(),tyres:()=>Tyres.render(),
    more:()=>`<h2 class="pg">More</h2><div class="card"><div class="row" onclick="App.go('tyres')"><span>🛞 Tyre Inventory</span>→</div><div class="row"><span>ThreadIQ v1.0</span></div><button class="btn del" onclick="App.reset()">Reset All Data</button></div>`},
  go(n){
    document.getElementById('view').innerHTML=App.views[n]();
    document.querySelectorAll('.bottom button').forEach(b=>b.classList.toggle('on',b.dataset.v===n));
    document.getElementById('badge').textContent=Dash.stats().a+Dash.stats().c;
    scrollTo(0,0);
  },
  toast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)},
  reset(){if(confirm('Saara data delete?')){Object.keys(localStorage).filter(k=>k.startsWith('tiq_')).forEach(k=>localStorage.removeItem(k));DB.seed();App.go('home')}}
};
DB.seed();App.go('home');
if('serviceWorker' in navigator)navigator.serviceWorker.register('service-worker.js').catch(()=>{});
