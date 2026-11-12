const Tyres={
  render(){
    const vs=DB.get('vehicles'),t=DB.get('tyres'),vn=id=>(vs.find(v=>v.id===id)||{}).name||'-';
    return `<h2 class="pg">Tyre Inventory</h2>
    <div class="card"><h3>Add Tyre</h3>
      <select id="tv">${vs.map(v=>`<option value="${v.id}">${v.name}</option>`).join('')}</select>
      <input id="tp" placeholder="Position (e.g. FL, T1)"><input id="tb" placeholder="Brand (MRF, Apollo...)">
      <button class="btn" onclick="Tyres.add()">Add Tyre</button></div>
    <div class="card">${t.map(x=>`<div class="row"><div><b>${x.pos}</b> · ${x.brand}<br><small>${vn(x.vehicleId)} · ${x.pressure} PSI · ${x.tread}mm</small></div>
      <select style="width:auto;margin:0" onchange="Tyres.status(${x.id},this.value)">${['healthy','attention','critical'].map(s=>`<option ${s===x.status?'selected':''}>${s}</option>`).join('')}</select></div>`).join('')||'<small>No tyres</small>'}</div>`;
  },
  add(){
    if(!tv.value||!tp.value.trim())return App.toast('Vehicle aur position chahiye');
    DB.add('tyres',{vehicleId:+tv.value,pos:tp.value.trim(),brand:tb.value.trim()||'-',pressure:100,tread:12,status:'healthy'});
    App.go('tyres');
  },
  status(id,s){DB.update('tyres',id,{status:s});App.toast('Updated')}
};
