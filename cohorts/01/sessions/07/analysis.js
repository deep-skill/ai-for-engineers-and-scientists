'use strict';
// Computes a teaching chart from a declared synthetic haulage fixture.
const ANALYSIS=Object.freeze({
 summarize(cycles){
  if(!Array.isArray(cycles)||!cycles.length)throw Error('Empty fixture');
  const groups=new Map(),seen=new Set();
  const fields=['espera_min','carguio_min','acarreo_min','descarga_min','retorno_min'];
  for(const cycle of cycles){
   if(!cycle.ciclo_id||seen.has(cycle.ciclo_id)||!/^R-\d{2}$/.test(cycle.ruta)||cycle.simulated!==true)throw Error('Invalid synthetic cycle');
   if(!Number.isFinite(Date.parse(cycle.inicio_utc))||!Number.isFinite(cycle.carga_t)||cycle.carga_t<=0)throw Error('Invalid cycle metadata');
   if(fields.some(field=>!Number.isFinite(cycle[field])||cycle[field]<0))throw Error('Invalid duration');
   seen.add(cycle.ciclo_id);
   if(!groups.has(cycle.ruta))groups.set(cycle.ruta,{route:cycle.ruta,count:0,wait:0,service:0,travel:0,min:Infinity,max:-Infinity});
   const group=groups.get(cycle.ruta),total=fields.reduce((sum,field)=>sum+cycle[field],0);
   group.count++;group.wait+=cycle.espera_min;group.service+=cycle.carguio_min+cycle.descarga_min;group.travel+=cycle.acarreo_min+cycle.retorno_min;
   group.min=Math.min(group.min,total);group.max=Math.max(group.max,total);
  }
  return [...groups.values()].sort((a,b)=>a.route.localeCompare(b.route)).map(group=>({...group,wait:group.wait/group.count,service:group.service/group.count,travel:group.travel/group.count,total:(group.wait+group.service+group.travel)/group.count}));
 }
});
async function renderHaulageChart(){
 const target=document.querySelector('#haulage-chart');
 try{
  const response=await fetch('data/haulage-example.json',{cache:'no-store'});
  if(!response.ok)throw Error('Fixture unavailable');
  const fixture=await response.json();
  if(fixture.metadata?.data_kind!=='synthetic')throw Error('Undeclared data kind');
  const groups=ANALYSIS.summarize(fixture.cycles);
  const limit=Math.max(10,Math.ceil(Math.max(...groups.map(group=>group.total))/10)*10);
  const format=n=>n.toLocaleString('es-PE',{maximumFractionDigits:1});
  target.innerHTML='<div class="chart-unit">Duración media del ciclo (min)</div>'+
   '<div class="haulage-bars" role="img" aria-label="Ejemplo sintético. '+groups.map(g=>g.route+': '+g.count+' ciclos, media '+format(g.total)+' minutos; espera '+format(g.wait)+', servicio '+format(g.service)+', traslado '+format(g.travel)).join('. ')+'.">'+
   groups.map(group=>'<div class="haulage-row"><span class="route-label">'+group.route+'<small>n = '+group.count+'</small></span><div class="cycle-track" style="--total-width:'+group.total/limit*100+'%">'+['wait','service','travel'].map(key=>'<span class="cycle-segment '+key+'" style="width:'+group[key]/limit*100+'%">'+format(group[key])+'</span>').join('')+'<strong class="cycle-total">'+format(group.total)+'</strong></div></div>').join('')+
   '<div class="cycle-axis">'+Array.from({length:5},(_,i)=>'<span>'+format(limit*i/4)+'</span>').join('')+'</div></div>'+
   '<div class="cycle-legend"><span><i class="wait"></i>Espera</span><span><i class="service"></i>Servicio</span><span><i class="travel"></i>Traslado</span></div>'+
   '<p class="chart-note">Rangos del ciclo: '+groups.map(group=>group.route+' '+format(group.min)+'–'+format(group.max)+' min').join(' · ')+'<br><a href="data/haulage-example.json" target="_blank" rel="noopener noreferrer">Datos y supuestos ↗</a></p>';
  target.dataset.ready='true';
 }catch{
  target.innerHTML='<p class="chart-error">No se pudo leer el ejemplo sintético. Abre la presentación desde la web local o el sitio estático.</p>';
 }
}
if(typeof document!=='undefined')renderHaulageChart();
