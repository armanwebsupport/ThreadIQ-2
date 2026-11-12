const Dash={
  stats(){
    const t=DB.get('tyres'),c=s=>t.filter(x=>x.status===s).length,n=t.length||1;
    return{t,h:c('healthy'),a:c('attention'),c:c('critical'),n,p:Math.round(c('healthy')/n*100)};
  },
  render(){
    const s=Dash.stats(),v=DB.get('vehicles'),f=v[0];
    const ok=f?s.t.filter(x=>x.vehicleId===f.id&&x.status==='healthy').length:0;
    const tot=f?s.t.filter(x=>x.vehicleId===f.id).length:0;
    const act=[['🛞','Tyre Inventory','tyres'],['🔍','Inspection','history'],['🔧','Maintenance'],['🔄','Rotation'],['⏱️','Pressure Monitor','tyres'],['📄','Reports','analytics'],['⚙️','Settings'],['⋯','More','more']];
    return `
    <div class="card welcome"><div><small>Welcome Back,</small><h2>Maksud Alam</h2><small>Vivaan Marg Transport</small></div><div class="truck">🚚</div></div>
    <div class="stats">
      <div class="stat"><div class="ic">🚛</div><b>${v.length}</b><span>Vehicles</span></div>
      <div class="stat"><div class="ic">🛞</div><b>${s.t.length}</b><span>Tyres</span></div>
      <div class="stat red"><div class="ic">🔧</div><b>${s.a+s.c}</b><span>Alerts</span></div>
      <div class="stat grn"><div class="ic">📶</div><b>${s.p}%</b><span>Health</span></div>
    </div>
    <div class="card"><h3>📈 Tyre Health Overview <span class="link" onclick="App.go('analytics')">View Details →</span></h3>
      <div class="health"><div class="gauge" style="--p:${s.p}"><div><span><b>${s.p}%</b>Overall Health</span></div></div>
      <div class="legend">
        <p><span><i class="dot" style="background:var(--g)"></i>Healthy</span><b>${s.h}</b></p>
        <p><span><i class="dot" style="background:var(--y)"></i>Attention</span><b>${s.a}</b></p>
        <p><span><i class="dot" style="background:var(--r)"></i>Critical</span><b>${s.c}</b></p>
      </div></div></div>
    <div class="actions">${act.map(a=>`<button onclick="${a[2]?`App.go('${a[2]}')`:`App.toast('Coming soon')`}"><i>${a[0]}</i>${a[1]}</button>`).join('')}</div>
    <div class="card"><h3>🚚 Active Fleet <span class="link" onclick="App.go('vehicles')">View All →</span></h3>
    ${f?`<div class="fleet"><div class="truck">🚚</div><div><b style="font-size:18px">${f.name}</b><br><span class="plate">${f.plate}</span><br><span style="color:var(--g)">🛞 ${ok} / ${tot} Tyres OK</span><br><small>Next Service in ${f.service} Hrs</small></div></div>`:'<small>No vehicles yet</small>'}</div>`;
  }
};
