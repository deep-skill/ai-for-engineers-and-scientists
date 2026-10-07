'use strict';
window.CourseCharts=(()=>{
 const C={lima:'#4d7fff',arequipa:'#99ff32',piura:'#ffb969'},M=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
 function lines(cities, factor=1, demand=null, compact=false) {
  const w=680,h=compact?290:365,p={l:62,r:28,t:30,b:45},max=Math.ceil(Math.max(...cities.flatMap(c=>c.months.map(m=>m.mean_irradiation*factor)),demand||0)*1.12),x=i=>p.l+i*(w-p.l-p.r)/11,y=v=>h-p.b-v/max*(h-p.b-p.t);
  const grid=Array.from({length:5},(_,i)=>{const v=max*i/4;return '<line x1="'+p.l+'" x2="'+(w-p.r)+'" y1="'+y(v)+'" y2="'+y(v)+'" stroke="#ffffff12"/><text x="'+(p.l-15)+'" y="'+(y(v)+6)+'" text-anchor="end" fill="#878ba5" font-size="17">'+v.toFixed(v%1?1:0)+'</text>';}).join('');
  const traces=cities.map(c=>{const coords=c.months.map((m,i)=>x(i)+','+y(m.mean_irradiation*factor)).join(' ');return '<polyline points="'+coords+'" fill="none" stroke="'+C[c.slug]+'" stroke-width="4" stroke-linejoin="round"/>'+c.months.map((m,i)=>'<circle cx="'+x(i)+'" cy="'+y(m.mean_irradiation*factor)+'" r="4.5" fill="'+C[c.slug]+'"><title>'+c.name+', '+M[i]+': '+(m.mean_irradiation*factor).toFixed(2)+'</title></circle>').join('');}).join('');
  const demandLine=demand===null?'':'<line x1="'+p.l+'" x2="'+(w-p.r)+'" y1="'+y(demand)+'" y2="'+y(demand)+'" stroke="#c9cbdc" stroke-width="2" stroke-dasharray="8 8"/>';
  return '<svg class="chart-svg" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="Promedios mensuales de NASA POWER por ciudad">'+grid+traces+demandLine+M.map((m,i)=>'<text x="'+x(i)+'" y="'+(h-13)+'" text-anchor="middle" fill="#878ba5" font-size="16">'+m+'</text>').join('')+'</svg>';
 }
 function legend(cities){return '<div class="chart-legend">'+cities.map(c=>'<span><i style="background:'+C[c.slug]+'"></i>'+c.name+'</span>').join('')+'</div>';}
 function bars(values,labels,colors=['#4d7fff','#99ff32','#ffb969']) {const max=Math.max(...values,.00001);return '<div class="bar-chart">'+values.map((v,i)=>'<div class="bar-row"><span>'+labels[i]+'</span><div><i style="width:'+Math.max(v/max*100,0)+'%;background:'+colors[i]+'"></i></div><strong>$'+v.toFixed(3)+'</strong></div>').join('')+'</div>';}
 return {lines,legend,bars,colors:C};
})();
