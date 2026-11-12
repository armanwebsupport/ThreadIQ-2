const Rep={
  render(){
    const s=Dash.stats(),vs=DB.get('vehicles');
    const bar=(l,n,c)=>`<small>${l}: ${n}</small><div class="bar"><i style="width:${n/s.n*100}%;background:var(${c})"></i></div>`;
    return `<h2 class="pg">Analytics & Reports</h2>
    <div class="card"><h3>Tyre Status</h3>${bar('Healthy',s.h,'--g')}${bar('Attention',s.a,'--y')}${bar('Critical',s.c,'--r')}</div>
    <div class="card"><h3>By Vehicle</h3>${vs.map(v=>{const tv=s.t.filter(x=>x.vehicleId===v.id),bad=tv.filter(x=>x.status!=='healthy').length;
      return `<div class="row"><div><b>${v.name}</b><br><small>${v.plate}</small></div><span class="tag ${bad?'attention':'healthy'}">${tv.length-bad}/${tv.length} OK</span></div>`}).join('')||'<small>No data</small>'}</div>
    <div class="card"><h3>Summary</h3><div class="row"><span>Total inspections</span><b>${DB.get('inspections').length}</b></div><div class="row"><span>Overall health</span><b>${s.p}%</b></div></div>`;
  }
};
