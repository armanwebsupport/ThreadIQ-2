const DB={
  get(k){try{return JSON.parse(localStorage.getItem('tiq_'+k))||[]}catch(e){return[]}},
  set(k,v){try{localStorage.setItem('tiq_'+k,JSON.stringify(v))}catch(e){}},
  add(k,o){const a=this.get(k);o.id=Date.now()+Math.floor(Math.random()*9999);a.push(o);this.set(k,a);return o},
  del(k,id){this.set(k,this.get(k).filter(x=>x.id!==id))},
  update(k,id,p){this.set(k,this.get(k).map(x=>x.id===id?{...x,...p}:x))},
  addVehicle(name,plate,n){
    const v=this.add('vehicles',{name,plate,service:120});
    for(let i=1;i<=n;i++)this.add('tyres',{vehicleId:v.id,pos:'T'+i,brand:'MRF',pressure:100,tread:12,status:'healthy'});
    return v;
  },
  seed(){
    try{if(localStorage.getItem('tiq_seeded'))return;localStorage.setItem('tiq_seeded','1')}catch(e){}
    this.addVehicle('BharatBenz 4028','JH-01-AB-1234',10);
    this.addVehicle('Tata Prima 3530','JH-09-CD-5678',10);
    const t=this.get('tyres');t[2].status='attention';t[12].status='critical';this.set('tyres',t);
  }
};
