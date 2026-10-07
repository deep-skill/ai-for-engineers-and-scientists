'use strict';
(() => {
 const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(),resources=COURSE_RESOURCES;
 let category='Todos';const search=document.querySelector('#resource-search');
 function render(){const q=normalize(search.value),items=resources.filter(r=>(category==='Todos'||r.group===category)&&normalize([r.title,r.publisher,r.description,r.purpose,r.group].join(' ')).includes(q));
  document.querySelector('#resource-library').innerHTML=items.map(r=>'<article class="resource-card"><div class="resource-meta">'+(r.logo?'<img class="resource-logo" src="assets/logos/'+r.logo+'" alt="'+r.publisher+'">':'<span class="resource-emoji" aria-hidden="true">'+r.icon+'</span>')+'<span>'+r.group+'</span></div><h3>'+r.title+'</h3><p>'+r.description+'</p><p class="resource-purpose">'+r.purpose+'</p><a href="'+r.url+'" target="_blank" rel="noopener noreferrer">'+r.publisher+' ↗</a></article>').join('');
  document.querySelector('#resource-count').textContent=items.length+' de '+resources.length+' recursos';document.querySelector('#empty-resources').hidden=items.length>0;
 }
 document.querySelectorAll('[data-resource-filter]').forEach(button=>button.onclick=()=>{category=button.dataset.resourceFilter;document.querySelectorAll('[data-resource-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));render();});search.addEventListener('input',render);render();
 const pricing=COURSE_PRICING;let annual=false;
 function prices(){document.querySelector('#warp-plans').innerHTML=pricing.warp.map(plan=>'<article class="pricing-card"><h3>'+plan.name+'</h3><div class="plan-price">$'+(annual&&plan.annual!==null?plan.annual:plan.monthly)+'<small> USD/mes</small></div><p>'+plan.detail+'</p><span class="plan-billing">'+(plan.monthly===0?'Terminal gratuita.':annual?'Equivalente mensual; pago anual de USD '+plan.annual*12+'.':'Facturación mensual.')+'</span></article>').join('');document.querySelectorAll('[data-billing]').forEach(b=>b.setAttribute('aria-pressed',String((b.dataset.billing==='annual')===annual)));}
 document.querySelectorAll('[data-billing]').forEach(button=>button.onclick=()=>{annual=button.dataset.billing==='annual';prices();});prices();
})();
