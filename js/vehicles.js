const Veh={
  render(){
    const t=DB.get('tyres');
    return `<h2 class="pg">Vehicles</h2>
    <div class="card"><h3>Add Vehicle</h3>
      <input id="vn" placeholder="Vehicle name (e.g. BharatBenz 4028)">
      <input id="vp" placeholder="Number plate (JH-01-AB-1234)">
      <input id="vt" type="number" placeholder="Number of tyres" value="10">
      <button class="btn" onclick="Veh.add()">Add Vehicle</button></div>
    <div class="card">${DB.get('vehicles').map(v=>{
      const tv=t.filter(x=>x.vehicleId===v.id),ok=tv.filter(x=>x.status==='healthy').length;
      return `<div class="row"><div><b>${v.name}</b><br><span class="plate">${v.plate}</span><br><small>${ok}/${tv.length} Tyres OK</small></div><button class="btn sm del" onclick="Veh.del(${v.id})">Delete</button></div>`}).join('')||'<small>No vehicles</small>'}</div>`;
  },
  add(){
    const n=vn.value.trim(),p=vp.value.trim(),c=parseInt(vt.value)||0;
    if(!n||!p)return App.toast('Name aur plate daalo');
    DB.addVehicle(n,p,Math.min(c,30));App.toast('Vehicle added');App.go('vehicles');
  },
  del(id){
    if(!confirm('Delete vehicle?'))return;
    DB.del('vehicles',id);DB.set('tyres',DB.get('tyres').filter(x=>x.vehicleId!==id));App.go('vehicles');
  }
};
