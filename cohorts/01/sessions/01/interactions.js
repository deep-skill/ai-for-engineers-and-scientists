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
  {title:'Programas cada paso',steps:[['Escribir Python','Tú'],['Ejecutar','Tú'],['Ver el reporte','Tú'],['Corregir','Tú']]},
  {title:'Delegas una propuesta',steps:[['Pedir código','Tú'],['Proponer Python','LLM'],['Ejecutar','Tú'],['Verificar','Tú']]},
  {title:'Delegas parte de la ejecución',steps:[['Leer archivos','Agente'],['Programar y ejecutar','Agente'],['Observar y corregir','Agente'],['Revisar evidencia','Tú']]}
 ];
 function era(i){selected('[data-era]','era',i);const e=eras[i];$('#delegation-track').innerHTML=e.steps.map((s,n)=>'<div class="delegation-node '+(s[1]==='Tú'?'human':'machine')+'"><span class="delegation-role">'+s[1]+'</span><strong>'+s[0]+'</strong><small>0'+(n+1)+'</small></div>').join('');$('#era-title').textContent=e.title;}
 document.querySelectorAll('[data-era]').forEach(b=>b.onclick=()=>era(Number(b.dataset.era)));era(2);
 const transformer={attention:'Atención: relaciona las representaciones de tokens dentro del contexto.',layers:'Las capas transforman esas representaciones para calcular probabilidades del siguiente token.'};
 document.querySelectorAll('[data-transformer]').forEach(b=>b.onclick=()=>{selected('[data-transformer]','transformer',b.dataset.transformer);$('#transformer-caption').textContent=transformer[b.dataset.transformer];});$('#transformer-caption').textContent=transformer.attention;

 $('#warp-pricing').onclick=()=>{const pricing=COURSE_PRICING;$('#overlay-content').innerHTML='<h2>Warp: terminal y consumo de agentes</h2><p class="note-time">Consulta: '+pricing.dateLabel+' · USD · facturación mensual</p><div class="warp-modal-plans">'+pricing.warp.map(p=>'<article><h3>'+p.name+' · USD '+p.monthly+'/mes</h3><p>'+p.detail+'</p>'+(p.annual!==null?'<small>Con pago anual: equivalente a USD '+p.annual+'/mes.</small>':'')+'</article>').join('')+'</div><p>Para practicar con OpenCode puedes usar la terminal gratuita. El consumo del modelo se contrata según el acceso elegido.</p>'+link(pricing.source,'Precios oficiales de Warp')+'<br>'+link('../../../../index.html#costes','Comparar facturación en Materiales');$('#overlay').showModal();};

 let flowMode=0,flowStep=0;
 function showFlow(){const missing=$('#flow-missing').checked,chat=flowMode===0,agent=flowMode===2,limit=flowMode===1&&missing?2:4;
  const names=chat?['Pedir análisis','Proponer código','Tú ejecutas','Tú revisas']:agent&&missing?['Leer fuente','Validar','Investigar','Proponer']:['Leer fuente','Validar','Calcular','Reporte'];
  $('#flow-track').innerHTML=names.map((name,i)=>'<div class="flow-node '+(i===flowStep-1?'active':i<flowStep?'done':'')+'"><small>0'+(i+1)+'</small><span>'+name+'</span></div>').join('');
  const titles=['Una respuesta para continuar','Un recorrido programado','Decisiones según el resultado'];
  const descriptions=['El chat de asistencia devuelve una propuesta. Tú decides cómo ejecutarla.','Los pasos y las condiciones están definidos antes de ejecutar.','El agente usa el objetivo y lo que observa para elegir cómo continuar.'];
  $('#flow-title').textContent=titles[flowMode];$('#flow-description').textContent=descriptions[flowMode];
  $('#comparison-products').innerHTML=chat?chip('gpt','ChatGPT')+chip('claude','Claude'):agent?chip('opencode','OpenCode')+chip('codex','Codex'):chip('n8n','n8n')+chip('python','Python');
  let logs=chat?['Envías el objetivo y el contexto.','El modelo propone código de análisis.','Tú ejecutas el programa.','Tú compruebas el resultado.']:['Fuente leída.','Unidades y período comprobados.','Promedios calculados.','Reporte generado.'];
  if(missing)logs=chat?['Envías el objetivo y el contexto.','El modelo propone código de análisis.','La ejecución detecta datos faltantes.','Aportas el error o datos nuevos para continuar.']:agent?['Fuente leída.','Se detectan días faltantes.','Investigar cobertura y alternativas.','Proponer cómo continuar con datos suficientes.']:['Fuente leída.','Regla definida: detener si faltan datos.'];
  $('#flow-log').textContent=flowStep?logs[flowStep-1]:'Avanzamos paso a paso.';selected('[data-flow-mode]','flowMode',flowMode);$('#flow-step').textContent=flowStep>=limit?'Volver al inicio':'Ver siguiente paso';
 }
 document.querySelectorAll('[data-flow-mode]').forEach(b=>b.onclick=()=>{flowMode=Number(b.dataset.flowMode);flowStep=0;showFlow();});
 $('#flow-step').onclick=()=>{const limit=flowMode===1&&$('#flow-missing').checked?2:4;flowStep=flowStep>=limit?0:flowStep+1;showFlow();};$('#flow-reset').onclick=()=>{flowStep=0;showFlow();};$('#flow-missing').onchange=()=>{flowStep=0;showFlow();};showFlow();

 const harness={
 model:'El modelo recibe contexto y propone la próxima acción. El programa ejecuta los cálculos.',
 harness:'El arnés coordina la sesión, prepara contexto, ejecuta herramientas y devuelve sus resultados al modelo.',
 files:'Una herramienta de archivos permite inspeccionar datos, editar código y conservar resultados.',
 terminal:'Una herramienta de terminal ejecuta programas e instala librerías dentro del entorno autorizado.',
 browser:'El control gráfico requiere una herramienta conectada y un entorno compatible con la aplicación.',
 permissions:'Los permisos del arnés y del entorno delimitan las acciones que el agente puede ejecutar.'
 };
 document.querySelectorAll('[data-harness]').forEach(b=>b.onclick=()=>{selected('[data-harness]','harness',b.dataset.harness);$('#harness-explainer').textContent=harness[b.dataset.harness];});$('#harness-explainer').textContent=harness.harness;
 const setup={model:'Modelo: comprueba capacidad, ventana de contexto, coste y proveedor de acceso.',harness:'Arnés: elige herramientas, permisos e interfaz. Hoy abrimos una carpeta con OpenCode Desktop.',environment:'Entorno: define dónde están archivos y procesos. Un agente local puede usar un modelo remoto.'};
 document.querySelectorAll('[data-setup]').forEach(b=>b.onclick=()=>{selected('[data-setup]','setup',b.dataset.setup);$('#setup-explainer').textContent=setup[b.dataset.setup];});$('#setup-explainer').textContent=setup.harness;
 const toolViews=[
  '<span class="eyebrow">Sistema operativo</span><h2>Organiza y ejecuta</h2><div class="computer-functions"><div><strong>Archivos</strong><span>Datos, código y reportes</span></div><div><strong>Procesos</strong><span>Programas que se ejecutan</span></div><div><strong>Permisos</strong><span>Qué puede acceder y modificar</span></div></div><pre class="code-sample">proyecto/\n├── data/\n├── analysis.py\n└── output/</pre>',
  '<span class="eyebrow">Aplicaciones</span><h2>Ofrecen operaciones al agente</h2><div class="application-chain"><span>Agente</span><i>→</i>'+chip('warp','Terminal')+'<i>→</i>'+chip('python','Python')+'</div><pre class="code-sample">$ python analysis.py\n\nLee datos → calcula → guarda el reporte</pre><p>Un navegador abre el resultado. Una herramienta gráfica conectada puede operar la interfaz.</p>',
  '<span class="eyebrow">Librerías y datos</span><h2>Hacen el trabajo concreto</h2><div class="library-chain"><div>'+chip('nasa','NASA POWER')+'<small>Consultar la fuente</small></div><span>→</span><div>'+chip('pandas','pandas')+'<small>Agrupar y calcular</small></div><span>→</span><div>'+chip('plotly','Plotly')+'<small>Crear gráficos</small></div></div><pre class="code-sample">leer_datos()\nresumen = datos.groupby("ciudad").mean()\ngraficar(resumen)</pre><p>Una API aporta los datos; el código y las librerías construyen el análisis.</p>'
 ];
 function showTool(i){selected('[data-tool]','tool',i);$('#tool-preview').innerHTML=toolViews[i];}
 document.querySelectorAll('[data-tool]').forEach(b=>b.onclick=()=>showTool(Number(b.dataset.tool)));showTool(2);

 const fragments=['El',' reporte',' usa',' datos',' solares',' de',' NASA.'];let generated=0;
 function showTokens(){$('#token-stream').innerHTML=generated?fragments.slice(0,generated).map(f=>'<span class="token">'+f+'</span>').join(''):'<span class="token-placeholder">La continuación aparecerá aquí…</span>';$('#token-next').disabled=generated>=fragments.length;}
 $('#token-next').onclick=()=>{generated=Math.min(fragments.length,generated+1);showTokens();};$('#token-reset').onclick=()=>{generated=0;showTokens();};showTokens();

 let capacity=128000;
 const shortTokens=n=>n>=1000000?(n/1000000).toLocaleString('es-PE',{maximumFractionDigits:3})+'M':(n/1000).toLocaleString('es-PE',{maximumFractionDigits:1})+'K';
 function contextBudget(){const files=Number($('#context-files').value),parts=[2000,18000,files,24000,8000],input=parts.slice(0,4).reduce((a,b)=>a+b,0),total=input+8000,extent=Math.max(capacity,total),classes=['instructions','history','files','tools','reserve'];
  $('#context-files-label').textContent=shortTokens(files)+' tokens';selected('[data-window]','window',capacity);
  const chart=$('#context-budget-chart');chart.innerHTML='<div class="budget-segments">'+parts.map((value,i)=>'<span class="'+classes[i]+'" style="width:'+value/extent*100+'%"></span>').join('')+'</div><i class="budget-limit" style="left:'+Math.min(capacity/extent*100,99.8)+'%"></i><span class="budget-scale">'+shortTokens(capacity)+' · límite del ejemplo</span>';chart.setAttribute('aria-label',shortTokens(input)+' de entrada y 8K reservados para salida; límite '+shortTokens(capacity));
  $('#context-total').textContent=shortTokens(input)+' de entrada + 8K reservados = '+shortTokens(total);
  $('#context-message').textContent=total<=capacity?'Cabe. Quedan '+shortTokens(capacity-total)+' tokens.':'No cabe. Selecciona o resume '+shortTokens(total-capacity)+' tokens antes de enviarlos.';$('#context-message').classList.toggle('over-budget',total>capacity);
 }
 document.querySelectorAll('[data-window]').forEach(b=>b.onclick=()=>{capacity=Number(b.dataset.window);contextBudget();});$('#context-files').addEventListener('input',contextBudget);contextBudget();

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
