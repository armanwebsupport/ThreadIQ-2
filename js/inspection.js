const Insp={
  render(){
    const vs=DB.get('vehicles'),t=DB.get('tyres'),h=DB.get('inspections').slice().reverse();
    return `<h2 class="pg">Inspection & History</h2>
    <div class="card"><h3>New Inspection</h3>
      <label>Tyre</label><select id="it">${t.map(x=>`<option value="${x.id}">${(vs.find(v=>v.id===x.vehicleId)||{}).name} – ${x.pos}</option>`).join('')}</select>
      <label>Pressure (PSI)</label><input id="ip" type="number" value="100">
      <label>Tread depth (mm)</label><input id="id" type="number" value="10">
      <label>Status</label><select id="is"><option>healthy</option><option>attention</option><option>critical</option></select>
      <textarea id="in" rows="2" placeholder="Notes"></textarea>
      <button class="btn" onclick="Insp.save()">Save Inspection</button></div>
    <div class="card"><h3>History</h3>${h.map(i=>`<div class="row"><div><b>${i.label}</b><br><small>${i.date} · ${i.pressure} PSI · ${i.tread}mm${i.note?' · '+i.note:''}</small></div><span class="tag ${i.status}">${i.status}</span></div>`).join('')||'<small>Koi inspection nahi</small>'}</div>`;
  },
  save(){
    const id=+it.value,x=DB.get('tyres').find(y=>y.id===id);if(!x)return App.toast('Tyre select karo');
    const v=DB.get('vehicles').find(y=>y.id===x.vehicleId)||{};
    DB.add('inspections',{tyreId:id,label:v.name+' – '+x.pos,pressure:+ip.value,tread:+document.getElementById('id').value,status:is.value,note:document.getElementById("in").value,date:new Date().toLocaleString()});
    DB.update('tyres',id,{pressure:+ip.value,tread:+document.getElementById('id').value,status:is.value});
    App.toast('Saved');App.go('history');
  }
};
