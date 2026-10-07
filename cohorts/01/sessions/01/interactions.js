'use strict';
(() => {
 const $=selector=>document.querySelector(selector),cities=COURSE_DATA.cities,chart=CourseCharts;
 const selected=(selector,key,value)=>document.querySelectorAll(selector).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset[key]===String(value))));
 const service=[
  {title:'Software para la minería.',text:'Arquitectura, consultoría y desarrollo para resolver problemas concretos. Trabajamos con los equipos que usan la solución.',project:'Minsur · DrillPlan Generator',detail:'Generación de mallas y collars de sondaje, con visualización 3D.'},
  {title:'IA aplicada al trabajo diario.',text:'Agentes, análisis de datos y automatización. Integramos las herramientas que necesita cada proceso.',project:'Haul Sight',detail:'Co-desarrollo con IMSS para el análisis de operaciones mineras.'},
  {title:'Talento que resuelve problemas.',text:'Algoritmos, Python e ingeniería con práctica guiada. Formación para personas y equipos técnicos.',project:'Cerro Verde y UNI',detail:'Python para Ingenieros en Cerro Verde vía Tecsup. Entrenamientos técnicos en UNI.'}
 ];
 function showService(i){selected('[data-service]','service',i);const s=service[i];$('#service-detail').innerHTML='<span class="eyebrow">Servicio de DeepSkill</span><h2>'+s.title+'</h2><p>'+s.text+'</p><div class="case-line"><span>Trabajo ejecutado</span><div><strong>'+s.project+'</strong><small>'+s.detail+'</small></div></div>'+link(i===2?'https://www.deepskill.space/enterprise':'https://www.deepskill.space/','Conocer DeepSkill');}
 document.querySelectorAll('[data-service]').forEach(b=>b.onclick=()=>showService(Number(b.dataset.service)));showService(0);

 const eras=[
  {title:'Tu código ejecuta el análisis.',text:'Eliges las librerías, escribes el programa, lo ejecutas y corriges.',role:'Tú',steps:['Elegir librerías','Escribir código','Ejecutar','Verificar'],result:'Programa y reporte'},
  {title:'El LLM propone; tú ejecutas.',text:'Pides una explicación o código. Tú lo integras, lo ejecutas y compruebas el resultado.',role:'LLM + tú',steps:['Pedir ayuda','Revisar código','Ejecutar','Verificar'],result:'Una propuesta que llevas al programa'},
  {title:'El agente construye y comprueba.',text:'Recibe el objetivo, usa archivos y herramientas, observa los resultados y ajusta su trabajo.',role:'Agente + herramientas',steps:['Inspeccionar','Programar','Ejecutar','Corregir'],result:'Software y evidencia para tu revisión'}
 ];
 function era(i){selected('[data-era]','era',i);const e=eras[i];$('#era-explanation').innerHTML='<span class="eyebrow">Software y análisis de datos</span><h2>'+e.title+'</h2><p>'+e.text+'</p><span class="era-human">Tú defines el objetivo y los criterios de aceptación.</span>';$('#era-work').innerHTML='<span class="era-task">El mismo problema: comparar los datos solares.</span><span class="era-role">'+e.role+'</span><div class="era-steps">'+e.steps.map((s,n)=>'<span><small>0'+(n+1)+'</small>'+s+'</span>').join('')+'</div><span class="era-result">'+e.result+'</span>';}
 document.querySelectorAll('[data-era]').forEach(b=>b.onclick=()=>era(Number(b.dataset.era)));era(2);

 $('#warp-pricing').onclick=()=>{const pricing=COURSE_PRICING;$('#overlay-content').innerHTML='<h2>Warp: terminal y consumo de agentes</h2><p class="note-time">Consulta: '+pricing.dateLabel+' · USD · facturación mensual</p><div class="warp-modal-plans">'+pricing.warp.map(p=>'<article><h3>'+p.name+' · USD '+p.monthly+'/mes</h3><p>'+p.detail+'</p>'+(p.annual!==null?'<small>Con pago anual: equivalente a USD '+p.annual+'/mes.</small>':'')+'</article>').join('')+'</div><p>Para practicar con OpenCode puedes usar la terminal gratuita. El consumo del modelo se contrata según el acceso elegido.</p>'+link(pricing.source,'Precios oficiales de Warp')+'<br>'+link('../../../../index.html#costes','Comparar facturación en Materiales');$('#overlay').showModal();};

 const concepts=[
  '<span class="eyebrow">Ejemplo conceptual</span><h2>“Compara Lima y Arequipa”</h2><div class="diagram-flow"><div class="diagram-block">Contexto<br><small>Instrucciones y datos</small></div><span class="diagram-arrow">→</span><div class="diagram-block">'+logo('gpt','GPT')+'<br>Modelo</div><span class="diagram-arrow">→</span><div class="diagram-block green">Texto<br><small>o una llamada a herramienta</small></div></div><p class="example-label">El modelo propone una respuesta. El arnés ejecuta las operaciones.</p>',
  '<span class="eyebrow">La superficie de conversación</span><div class="chat-bubble user">Compara Lima y Arequipa con datos de 2025.</div><div class="chat-bubble result">Puedo explicar la comparación o dirigir un agente que analice los archivos.</div><div class="brand-row">'+chip('gpt','ChatGPT')+chip('claude','Claude')+'</div><p class="example-label">Esquema de una interfaz, sin modelo en ejecución.</p>',
  '<span class="eyebrow">Una operación ejecutable</span><h2>El código hace el cálculo.</h2><pre class="code-sample">datos = leer_archivos_nasa()\nresumen = datos.groupby("ciudad").mean()\ngraficar(resumen)</pre><div class="brand-row">'+chip('python','Python')+chip('pandas','pandas')+'</div><p class="example-label">Leer, calcular y graficar son operaciones que realiza el computador.</p>'
 ];
 function showConcept(i){selected('[data-concept]','concept',i);$('#concept-stage').innerHTML=concepts[i];}
 document.querySelectorAll('[data-concept]').forEach(b=>b.onclick=()=>showConcept(Number(b.dataset.concept)));showConcept(0);

 let flowMode=0,flowStep=0;
 function showFlow(){const missing=$('#flow-missing').checked,agent=flowMode===1;
  const names=agent&&missing?['Leer datos','Validar','Investigar huecos','Proponer solución']:['Leer datos','Validar','Calcular','Graficar'];
  $('#flow-track').innerHTML=names.map((name,i)=>'<div class="flow-node '+(i===flowStep-1?'active':i<flowStep?'done':'')+'"><small>0'+(i+1)+'</small><span>'+name+'</span></div>').join('');
  $('#flow-title').textContent=agent?'El agente elige la acción.':'El recorrido está definido.';
  $('#flow-description').textContent=agent?'Usa el objetivo y el resultado anterior para decidir cómo continuar.':'Los pasos y las condiciones se escribieron antes de ejecutarlo.';
  const logs=missing?(agent?['Fuente leída.','Se detectan días faltantes.','Revisar cobertura y alternativas.','Proponer cómo continuar con datos suficientes.']:['Fuente leída.','Regla definida: detener si faltan datos.','El workflow se detiene y registra el problema.','Es necesario cambiar el flujo o la entrada.']):['Fuente leída.','Unidades y período comprobados.','Promedios calculados.','Gráfico generado.'];
  $('#flow-log').textContent=flowStep?logs[Math.min(flowStep-1,3)]:'Avanzamos paso a paso.';
  selected('[data-flow-mode]','flowMode',flowMode);
  $('#flow-step').textContent=flowStep>=4?'Volver al inicio':'Ver siguiente paso';
 }
 document.querySelectorAll('[data-flow-mode]').forEach(b=>b.onclick=()=>{flowMode=Number(b.dataset.flowMode);flowStep=0;showFlow();});
 $('#flow-step').onclick=()=>{flowStep=flowStep>=4?0:flowStep+1;showFlow();};$('#flow-reset').onclick=()=>{flowStep=0;showFlow();};$('#flow-missing').onchange=()=>{flowStep=0;showFlow();};showFlow();

 const harness={
 model:'El modelo procesa el contexto y propone texto o llamadas a herramientas. Puede estar alojado fuera de tu computador.',
 files:'Los archivos dan contexto al agente y conservan el resultado: datos, programas, documentos y reportes.',
 terminal:'La terminal permite ejecutar programas, instalar librerías y observar sus resultados dentro del entorno autorizado.',
 browser:'El navegador y el control gráfico requieren herramientas conectadas. Su disponibilidad depende del arnés y del entorno.',
 permissions:'El arnés aplica permisos, organiza la sesión y devuelve los resultados al modelo para continuar el ciclo.'
 };
 document.querySelectorAll('[data-harness]').forEach(b=>b.onclick=()=>{selected('[data-harness]','harness',b.dataset.harness);$('#harness-explainer').textContent=harness[b.dataset.harness];});
 $('#harness-explainer').textContent='Modelo, arnés y herramientas participan en un ciclo de decisiones y resultados. Haz clic en una pieza.';

 const january=cities.map(c=>({name:c.name,value:c.months[0].mean_irradiation}));
 const toolViews=[
  '<span class="eyebrow">Fuente pública</span><h2>Una API entrega los datos.</h2><p>NASA POWER devuelve una serie diaria con período, unidades y coordenadas.</p><pre class="code-sample">requests.get(url_nasa)\n\nALLSKY_SFC_SW_DWN\nunidad: kWh/m²/día\nperíodo: 2025</pre>',
  '<span class="eyebrow">Programa</span><h2>Python organiza el trabajo.</h2><p>El código conserva un cálculo que podemos repetir y revisar.</p><pre class="code-sample">for ciudad in ciudades:\n    datos = leer_fuente(ciudad)\n    verificar_periodo(datos)\n    construir_reporte(datos)</pre>',
  '<span class="eyebrow">Análisis</span><h2>pandas agrupa y compara.</h2><p>Irradiación media diaria de enero de 2025, en kWh/m²/día.</p><table class="data-table"><thead><tr><th>Ciudad</th><th>Media diaria</th></tr></thead><tbody>'+january.map(r=>'<tr><td>'+r.name+'</td><td>'+r.value.toFixed(3)+'</td></tr>').join('')+'</tbody></table>',
  '<span class="eyebrow">Visualización</span><h2>Plotly permite explorar.</h2><p>Recurso solar mensual de 2025 · kWh/m²/día.</p>'+chart.legend(cities)+chart.lines(cities,1,null,true),
  '<span class="eyebrow">Pasos conocidos</span><h2>Un workflow conecta operaciones.</h2><p>Podemos programar un flujo o utilizar un producto como n8n.</p><div class="diagram-flow"><div class="diagram-block">Entrada</div><span class="diagram-arrow">→</span><div class="diagram-block">Validación</div><span class="diagram-arrow">→</span><div class="diagram-block green">Reporte</div></div><p class="example-label">La elección depende de las integraciones y del mantenimiento.</p>',
  '<span class="eyebrow">Ejecución y observación</span><h2>La terminal y el navegador.</h2><p>Ejecutar el programa, revisar la interfaz y probar un cambio son acciones diferentes.</p><pre class="code-sample">$ python build.py\n✓ Datos comprobados\n✓ Herramienta creada\n\nAbrir el resultado y cambiar un control.</pre>'
 ];
 function showTool(i){selected('[data-tool]','tool',i);$('#tool-preview').innerHTML=toolViews[i];}
 document.querySelectorAll('[data-tool]').forEach(b=>b.onclick=()=>showTool(Number(b.dataset.tool)));showTool(0);

 const fragments=['Arequipa',' tiene',' mayor',' recurso',' solar',' anual',' en',' 2025.'];let generated=0;
 function showTokens(){$('#token-stream').innerHTML=generated?fragments.slice(0,generated).map(f=>'<span class="token">'+f+'</span>').join(''):'<span class="token-placeholder">La continuación aparecerá aquí…</span>';$('#token-next').disabled=generated>=fragments.length;}
 $('#token-next').onclick=()=>{generated=Math.min(fragments.length,generated+1);showTokens();};$('#token-reset').onclick=()=>{generated=0;showTokens();};showTokens();

 const metric=['Inteligencia y capacidad para resolver las tareas que nos importan.','Tiempo de respuesta y velocidad de generación. Comparar también la latencia.','Lo que cuesta completar una tarea, además de la tarifa por token.'];
 document.querySelectorAll('[data-metric]').forEach(b=>b.onclick=()=>{selected('[data-metric]','metric',b.dataset.metric);const i=Number(b.dataset.metric);$('#metric-explanation').textContent=metric[i];$('#benchmark-screen').src=ASSETS+'screens/aa-'+['intelligence','speed','cost'][i]+'.png';$('#benchmark-screen').alt='Gráfico real de '+['inteligencia','velocidad','coste por tarea'][i]+' de Artificial Analysis';});$('#metric-explanation').textContent=metric[0];

 function cost(){const N=Number($('#cost-calls').value),I=Number($('#cost-context').value),f=$('#cost-cache').checked?.5:0,values=[N*I*(1-f)/1e6,N*I*f*.2/1e6,N*1200*5/1e6];$('#cost-calls-label').textContent=N;$('#cost-context-label').textContent=I.toLocaleString('es-PE')+' tokens';$('#slide-cost-total').textContent='$'+values.reduce((a,b)=>a+b,0).toFixed(3);$('#slide-cost-chart').innerHTML=chart.bars(values,['Entrada','Caché','Salida']);}
 ['#cost-calls','#cost-context','#cost-cache'].forEach(s=>$(s).addEventListener('input',cost));cost();

 const access=[
  {label:'API',title:'Consumo por uso.',flow:'Tu arnés → Proveedor → Tokens',text:'Pagas por tokens u operaciones del proveedor, según la tarifa y el tipo de consumo.',limit:'Revisar saldo, límites, caché y razonamiento.',logos:chip('opencode','OpenCode Zen')+chip('gpt','OpenAI'),url:'https://opencode.ai/docs/zen/'},
  {label:'Suscripción',title:'Una cuota con condiciones.',flow:'Plan → Uso incluido → Cuotas',text:'El plan incluye acceso y una cantidad de uso. La compatibilidad depende del producto y del arnés.',limit:'Revisar modelos, cuotas y facturación adicional. El crédito de API puede ser independiente.',logos:chip('gpt','ChatGPT')+chip('claude','Claude'),url:'https://learn.chatgpt.com/pricing/'},
  {label:'Oferta gratuita',title:'Una entrada para practicar.',flow:'Arnés → Modelo disponible → Límites',text:'OpenCode ofrece opciones de modelos gratuitos. Su disponibilidad y condiciones pueden cambiar.',limit:'Probar el modelo disponible antes de la clase y preparar una alternativa.',logos:chip('opencode','OpenCode'),url:'https://opencode.ai/docs/zen/'},
  {label:'Modelo local',title:'Tu equipo hace la inferencia.',flow:'Modelo → RAM / GPU → Energía',text:'Los pesos se ejecutan en tu hardware. La capacidad depende del modelo y del equipo.',limit:'Hay costes de memoria, cómputo y operación, aunque no exista una tarifa por token.',logos:chip('deepseek','Pesos abiertos'),url:'https://models.dev/'}
 ];
 function showAccess(i){selected('[data-access]','access',i);const a=access[i];$('#access-stage').innerHTML='<div class="access-visual"><span class="eyebrow">'+a.label+'</span><h2>'+a.title+'</h2><div class="access-arrow"><span>'+a.flow+'</span></div><div class="brand-row">'+a.logos+'</div></div><div class="access-info"><h2>Cómo se consume</h2><p>'+a.text+'</p><p class="access-limit">'+a.limit+'</p>'+link(a.url,'Consultar condiciones')+'</div>';}
 document.querySelectorAll('[data-access]').forEach(b=>b.onclick=()=>showAccess(Number(b.dataset.access)));showAccess(0);

 const commands=[
 '$ pwd\n~/proyecto-solar',
 '$ python3 -m venv .venv\n$ source .venv/bin/activate',
 '$ python -m pip install requests pandas plotly',
 '$ python build.py\nDatos comprobados. Resultado: output/index.html'
 ];let terminalStep=0;
 function terminal(){$('#terminal-output').textContent=commands.slice(0,terminalStep+1).join('\n\n');$('#terminal-output').scrollTop=$('#terminal-output').scrollHeight;$('#terminal-step').textContent=terminalStep>=commands.length-1?'Volver al inicio':'Ver siguiente comando';}
 $('#terminal-step').onclick=()=>{terminalStep=terminalStep>=commands.length-1?0:terminalStep+1;terminal();};$('#terminal-reset').onclick=()=>{terminalStep=0;terminal();};terminal();

 let solarCity=0;
 function solar(){const power=Number($('#solar-power').value),city=cities[solarCity];$('#solar-power-label').textContent=power.toFixed(1)+' kWp';$('#solar-annual').textContent=(city.annual_irradiation_kwh_m2*power*.8).toLocaleString('es-PE',{maximumFractionDigits:0});$('[data-chart="solar"]').innerHTML=chart.legend([city])+chart.lines([city],power*.8,3);selected('[data-solar-city]','solarCity',solarCity);}
 document.querySelectorAll('[data-solar-city]').forEach(b=>b.onclick=()=>{solarCity=Number(b.dataset.solarCity);solar();});$('#solar-power').addEventListener('input',solar);solar();
 $('[data-chart="cover"]').innerHTML=chart.legend(cities)+'<p class="cover-chart-unit">Irradiación media diaria · kWh/m²/día</p>'+chart.lines(cities,1,null,true);
 $('[data-chart="option-solar"]').innerHTML=chart.lines(cities,1,null,true);

 const bins=COURSE_DATA.quakes.bins,max=Math.max(...bins.map(b=>b.count),1);
 $('#quake-preview').innerHTML='<svg viewBox="0 0 320 160" class="chart-svg" role="img" aria-label="Magnitudes del snapshot real de USGS">'+bins.map((b,i)=>{const h=b.count/max*100,x=20+i*57;return '<rect x="'+x+'" y="'+(115-h)+'" width="35" height="'+h+'" fill="'+(i<2?'#4d7fff':'#99ff32')+'" rx="3"/><text x="'+(x+17)+'" y="145" text-anchor="middle" fill="#858da8" font-size="14">'+b.label+'</text><text x="'+(x+17)+'" y="'+(108-h)+'" text-anchor="middle" fill="#bfc9e5" font-size="14">'+b.count+'</text>';}).join('')+'</svg>';

 let doubled=false;const raw=COURSE_DATA.verification.lima_jan_01;
 function verify(){const p=doubled?2:1,e=raw*p*.8;$('#verify-source').textContent='"20250101": '+raw;$('#verify-equation').innerHTML=raw.toFixed(3)+' h × '+p+' kWp × 0.80<strong>'+e.toFixed(3)+' kWh</strong>';$('#verify-double').textContent=doubled?'Volver a 1 kWp':'Duplicar potencia';$('#verify-check').textContent=doubled?'La potencia se duplica. La energía también.':'Comprobamos un dato, una unidad y un cálculo.';}
 $('#verify-double').onclick=()=>{doubled=!doubled;verify();};verify();
})();
