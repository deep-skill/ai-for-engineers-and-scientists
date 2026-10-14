'use strict';
(() => {
 const $=s=>document.querySelector(s);
 let processState=0;
 $('#process-toggle').onclick=()=>{
  processState=(processState+1)%3;
  $('#process-node').classList.toggle('running',processState===1);
  $('#process-state').textContent=['Sin ejecutar','En ejecución','Proceso terminado'][processState];
  $('#output-state').textContent=processState?'Guardado en disco':'Pendiente';
  $('#process-toggle').textContent=['Ejecutar ilustración','Finalizar ilustración','Reiniciar ilustración'][processState];
 };
 const illustratedFiles=new Set(['/proyecto-sismos/BRIEF.md','/proyecto-sismos/analisis.py','/proyecto-sismos/data/usgs-m45-month.geojson','/proyecto-sismos/data/sources.json','/proyecto-sismos/output/eventos.csv']);
 function resolvePath(){const result=LAB.resolve($('#working-directory').value,$('#relative-path').value.trim());$('#resolved-path').textContent=result;const found=illustratedFiles.has(result);$('#path-result').textContent=found?'Coincide con el árbol ilustrado.':'No existe en el árbol ilustrado.';$('#path-result').classList.toggle('missing',!found);}
 $('#path-form').onsubmit=event=>{event.preventDefault();resolvePath();};$('#working-directory').onchange=resolvePath;resolvePath();
 const commands={posix:[['Carpeta actual','pwd'],['Listar archivos','ls'],['Cambiar carpeta','cd data']],windows:[['Carpeta actual','Get-Location'],['Listar archivos','Get-ChildItem'],['Cambiar carpeta','Set-Location data']]};
 function shell(key){document.querySelectorAll('[data-shell]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.shell===key)));$('#command-runtime').textContent=key==='windows'?'py':'python3';$('#shell-commands').innerHTML=commands[key].map(([name,command])=>'<div><span>'+name+'</span><code>'+command+'</code></div>').join('');}
 document.querySelectorAll('[data-shell]').forEach(b=>b.onclick=()=>shell(b.dataset.shell));shell('posix');
 const errors={path:{message:"FileNotFoundError:\n  'data/usgs-m45-month.geojson'",question:'¿Desde qué carpeta se ejecutó?',action:'Comprobar la carpeta actual y la ruta del archivo.'},dependency:{message:"ModuleNotFoundError:\n  No module named 'pandas'",question:'¿Qué entorno usa ese Python?',action:'Comprobar el intérprete y sus paquetes instalados.'}};
 function error(key){document.querySelectorAll('[data-error]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.error===key)));$('#error-message').textContent=errors[key].message;$('#error-question').textContent=errors[key].question;$('#error-action').textContent=errors[key].action;}
 document.querySelectorAll('[data-error]').forEach(b=>b.onclick=()=>error(b.dataset.error));error('path');
 const interfaces={api:{nodes:['Cliente HTTP','API del servicio','Datos'],detail:'El cliente envía una petición según el contrato de la API.'},mcp:{nodes:['Cliente MCP','Servidor MCP','API / archivo'],detail:'El cliente descubre capacidades y las invoca. El servidor implementa el acceso a los datos.'}};
 function route(key){document.querySelectorAll('[data-interface]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.interface===key)));$('#interface-route').innerHTML=interfaces[key].nodes.map(n=>'<strong>'+n+'</strong>').join('<span class="flow-connector" aria-hidden="true"></span>');$('#interface-detail').textContent=interfaces[key].detail;}
 document.querySelectorAll('[data-interface]').forEach(b=>b.onclick=()=>route(b.dataset.interface));route('api');
 const prompt='Inspecciona este proyecto de sismos sin modificar los datos originales. Identifica la carpeta actual, las rutas de entrada y salida, los programas existentes, su runtime y dependencias. Explica cómo ejecutar el análisis disponible, qué argumentos admite y dónde guarda sus resultados. Propón cómo comprobar el CSV y los conteos contra el catálogo archivado. Si falta algún archivo, indícalo. Retoma los ejemplos existentes; no construyas otro programa ni una web nueva.';
 $('#copy-prompt').onclick=async()=>{try{await navigator.clipboard.writeText(prompt);$('#copy-status').textContent='Pedido copiado.';}catch{$('#overlay-content').innerHTML='<h2>Primer pedido</h2><p>'+prompt+'</p>';$('#overlay').showModal();$('#copy-status').textContent='Selecciona el pedido de la ventana.';}};
 const dataRoot='../../../../demos/earthquakes/starter/data/';
 Promise.all(['usgs-m45-month.geojson','sources.json'].map(file=>fetch(dataRoot+file).then(r=>{if(!r.ok)throw Error('Missing snapshot');return r.json();}))).then(([catalog,provenance])=>{
  const thresholds=[4.5,5,6],counts=thresholds.map(n=>LAB.count(catalog.features,n)),max=Math.max(1,...counts);
  $('#magnitude-bars').innerHTML=thresholds.map((n,i)=>'<div class="magnitude-row"><span>M ≥ '+n+'</span><div class="magnitude-track"><i style="width:'+counts[i]/max*100+'%"></i></div><strong>'+counts[i]+'</strong></div>').join('');
  $('#snapshot-provenance').textContent='USGS · '+catalog.features.length+' eventos · captura '+new Date(provenance.retrieved_at).toISOString().slice(0,16).replace('T',' ')+' UTC. Conteos acumulados, no sumables.';
 }).catch(()=>{$('#magnitude-bars').textContent='No se pudo cargar el catálogo. Abre la práctica para localizar los datos originales.';});
})();
