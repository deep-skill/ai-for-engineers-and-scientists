'use strict';
const ASSETS='../../../../assets/';
const link=(url,label,cls='text-link')=>'<a class="'+cls+'" href="'+url+'" target="_blank" rel="noopener noreferrer">'+label+' ↗</a>';
const source={
  history:'https://deming.org/wp-content/uploads/2020/06/circling-back.pdf',
  pdsa:'https://deming.org/explore/pdsa/',
  agileHistory:'https://agilemanifesto.org/history.html',
  agile:'https://agilemanifesto.org/principles.html',
  react:'https://arxiv.org/abs/2210.03629',
  practice:'https://code.claude.com/docs/en/best-practices',
  opencode:'https://opencode.ai/docs/agents/',
  review:'https://google.github.io/eng-practices/review/reviewer/looking-for.html'
};
const guides={previous:'../05/index.html',mine:'../../../../materials/read.html?doc=digital-mine-scope',teacher:'../../../../materials/read.html?doc=session06-instructor'};
const footer=(text,detail='')=>'<div class="slide-bottom"><p>'+text+'</p>'+(detail?'<span>'+detail+'</span>':'')+'</div>';
const make=(title,minutes,chapter,html,notes,sources,idea,interaction,focus,when)=>({title,minutes,chapter,html,notes,sources,review:{idea,interaction,focus},className:'',when});

const slides=[
make('Flujo de trabajo agéntico',2,'Clase 6 · 22 octubre 2026',`
  <h1>Flujo de trabajo <span class="gradient">agéntico</span></h1>
  <p class="slide-lead">Una táctica para avanzar dentro del ciclo de vida del software.</p>
  <div class="strategy-tactic">
    <div class="strategy-level"><span class="diagram-label">El ciclo de vida organiza el proyecto</span>${lifecycleStrip()}</div>
    <div class="zoom-bridge"><span aria-hidden="true">↓</span><p>En cada avance concreto</p></div>
    <div class="tactic-level">${stepFlow(WORKFLOW.iteration.map(step=>({title:step.title,detail:step.detail})),'compact-flow')}<div class="simple-return"><span aria-hidden="true">↶</span>El resultado orienta la siguiente decisión</div></div>
  </div>
  ${footer('El ciclo de trabajo se repite dentro de las etapas de ingeniería.','Jean Pierre Mandujano · Cohorte 01 · DeepSkill')}`,
  'JP confirmó el 22 de octubre que la clase anterior avanzó principalmente en requisitos y especificaciones. Partir de ese punto real. El mapa de cinco etapas retoma la presentación anterior; operación y mantenimiento retroalimentan el ciclo, como se explicó allí. El ciclo de vida organiza necesidades, diseño, implementación, pruebas y entrega. La táctica de esta sesión se aplica a cada incremento y también a una tarea de análisis, una corrección o una comprobación. Planear incluye explorar los archivos y entender las restricciones existentes. Ejecutar incluye observar el resultado de las herramientas y ajustar el siguiente paso. Verificar compara con un criterio definido antes de actuar. El ciclo ayuda a ordenar el trabajo; la calidad también depende de decisiones de diseño, pruebas apropiadas y revisión humana. Los diagramas son conceptuales y no representan una ejecución real del agente. La práctica continúa en el proyecto elegido por el docente, con Digital Mine como caso acordado.',
  [source.agile,source.practice],'El ciclo de vida organiza el proyecto; el ciclo de trabajo guía cada avance.','Relacionar el mapa anterior con la iteración que se repetirá durante la práctica.','Mantener la relación entre requisito, diseño y evidencia en cada avance.','Apertura · 2 min'),

make('Antecedentes del trabajo iterativo',2,'Historia y práctica actual',`
  <h1>Antecedentes del trabajo iterativo</h1><p class="slide-lead">Aprender de los resultados y ajustar la siguiente acción.</p>
  <div class="history-line">
    <div><b>1939</b><h2>Shewhart</h2><p>Especificar<br>producir<br>inspeccionar</p><small>Antecedente de los ciclos de mejora</small></div>
    <div><b>2001</b><h2>Manifiesto Ágil</h2><p>Entregas frecuentes<br>software funcionando<br>reflexión</p><small>Desarrollo con retroalimentación</small></div>
    <div><b>2022</b><h2>ReAct</h2><p>Razonar<br>actuar<br>observar</p><small>Yao y colaboradores · agentes con herramientas</small></div>
  </div>
  <div class="current-practice"><span>Práctica actual</span><p>Explorar → planear → implementar → comprobar</p><div>${link(source.practice,'Anthropic')}${link(source.opencode,'OpenCode')}</div></div>
  ${footer('Estos antecedentes ayudan a situar el método de trabajo de hoy.','Cada propuesta tiene su propio alcance y propósito.')}`,
  'Esta lámina reúne antecedentes relacionados, no afirma una línea de descendencia directa entre ellos. En 1939, Walter A. Shewhart publicó Statistical Method from the Viewpoint of Quality Control y explicó especificación, producción e inspección como un proceso cíclico de aprendizaje. Deming desarrolló después estos ciclos; presentó su rueda en Japón en 1950 y la evolución del PDSA continuó durante las décadas siguientes. No atribuir a Deming la invención literal del PDCA ni llamar PDSA a cualquier secuencia de tres pasos. El Manifiesto Ágil surgió en febrero de 2001, firmado por 17 participantes; sus principios incluyen entregas frecuentes, excelencia técnica y reflexión. ReAct, de Shunyu Yao y colaboradores, se presentó en arXiv el 6 de octubre de 2022 y llegó a ICLR 2023. Estudia intercalar razonamiento y acciones para incorporar observaciones del entorno y actualizar planes. No es un método completo de ingeniería de software. Como práctica actual, Anthropic documenta explorar, planear, implementar y verificar, y describe su uso en equipos internos. OpenCode ofrece agentes Plan y Build; esa distinción respalda separar análisis y ejecución, pero no demuestra por sí sola que un resultado esté verificado. El esquema del curso sintetiza estas ideas con fines didácticos y sigue siendo agnóstico de herramienta y modelo.',
  [source.history,source.pdsa,source.agileHistory,source.agile,source.react,source.practice,source.opencode],'La iteración con retroalimentación tiene antecedentes anteriores a los agentes de IA.','Recorrer tres hitos y situar la práctica documentada actual.','Evitar presentar el ciclo del curso como un estándar único o atribuirlo a un único autor.','Antes de la práctica · 2 min'),

make('Una iteración de trabajo',3,'Planear · ejecutar · verificar',`
  <h1>Una iteración de trabajo</h1><p class="slide-lead">El criterio de comprobación se define antes de actuar.</p>
  <div class="iteration-main">${stepFlow(WORKFLOW.iteration)}</div>
  <div class="iteration-outcomes"><div><span class="outcome-label">Si cumple</span><strong>Revisar y cerrar el incremento</strong></div><div><span class="outcome-label investigate">Si no cumple</span><strong>Depurar y corregir</strong><a href="#s-4">Ver el recorrido de depuración →</a></div></div>
  <div class="loop-back"><span aria-hidden="true">↶</span><p>Volver a ejecutar y verificar; ajustar el plan cuando la evidencia lo requiera.</p></div>
  ${footer('El avance se puede explicar: qué se esperaba, qué cambió y qué se observó.','La profundidad del plan y de las comprobaciones depende del cambio y su riesgo.')}`,
  'Elegir un incremento acotado a partir de las especificaciones que ya existen. Planear: explorar el estado real del repositorio, identificar el objetivo, los límites, las decisiones de diseño y una comprobación observable. La prueba o el criterio no debe inventarse después para justificar lo que produjo el agente. Esto no exige escribir siempre una prueba automatizada antes del código: el criterio sí debe estar claro. Ejecutar: hacer cambios revisables, leer resultados de herramientas y comparar lo que se está haciendo con el plan. El agente puede usar un ciclo más fino de acción y observación dentro de este paso. Verificar: comprobar el comportamiento esperado con pruebas, ejecución, revisión del cambio o inspección de la interfaz según corresponda. Revisar también restricciones y diseño; pasar una prueba no cubre todo. Si falta información, volver al plan. Si falla una comprobación, pasar a depuración y volver a ejecutar y verificar. Si se repite el mismo fallo sin evidencia nueva, detener los cambios y revisar la hipótesis o la información faltante. La lámina es un esquema conceptual; no ejecuta pruebas ni modifica el proyecto.',
  [source.practice,source.react,source.agile],'Cada iteración conecta un cambio acotado con un criterio y evidencia observable.','Seguir el recorrido de éxito o abrir el recorrido de depuración.','Evitar que el agente expanda el alcance o dé por cumplido un criterio sin comprobarlo.','Durante el proyecto · 3 min'),

make('Depuración con evidencia',3,'Investigar un fallo',`
  <h1>Depuración con evidencia</h1><p class="slide-lead">Describir la diferencia entre lo esperado y lo observado.</p>
  <div class="debug-comparison"><div><span>Esperado</span><strong>Criterio acordado</strong></div><span aria-hidden="true">≠</span><div><span>Observado</span><strong>Resultado registrado</strong></div></div>
  <div class="debug-path">${stepFlow([
    {title:'Reproducir',detail:'Mismas condiciones'},
    {title:'Plantear',detail:'Una hipótesis concreta'},
    {title:'Contrastar',detail:'Una comprobación dirigida'},
    {title:'Corregir',detail:'La causa identificada'}
  ],'four-steps')}</div>
  <div class="debug-return"><span aria-hidden="true">↶</span><a href="#s-3">Ejecutar y verificar nuevamente</a><span>Revisar también lo que antes funcionaba</span></div>
  ${footer('Una causa se confirma con una comprobación.','Logs, entradas, estado y errores son evidencias para investigar.')}`,
  'Separar el síntoma de la causa. Registrar el resultado esperado y lo observado, con entrada, entorno, comando y mensaje pertinentes. Reproducir con las mismas condiciones; cuando el fallo es intermitente, conservar las condiciones y observaciones disponibles. Revisar primero la evidencia: archivos usados, datos, configuración, permisos, dependencias, respuestas de herramientas y logs. Formular una hipótesis concreta y una comprobación capaz de apoyarla o descartarla. Si se descarta, volver a formular una hipótesis. Cambiar una causa cada vez y evitar acumular cambios sin saber cuál alteró el comportamiento. Tras corregir, repetir el caso que fallaba y comprobar los comportamientos relacionados para detectar regresiones. Un fallo de autenticación, una respuesta vacía o un error de red son ejemplos de integraciones ya vistas; no hace falta construir otra demo HTTP. La verificación técnica también necesita un criterio funcional: una petición con estado 200 puede seguir devolviendo información incorrecta. Pedir al agente que explique qué evidencia llevó a la corrección; su explicación es una hipótesis hasta contrastarla. Al finalizar, volver a la lámina de la iteración.',
  [source.practice,source.review],'La depuración relaciona una hipótesis con una comprobación antes de corregir.','Seguir el recorrido y regresar a la verificación de la iteración.','Mantener trazabilidad del caso que falló y de las comprobaciones posteriores.','Cuando aparece un fallo · 3 min'),

make('Criterio de cierre',2,'Evidencia del avance',`
  <h1>Criterio de cierre</h1><p class="slide-lead">Cada avance conserva su relación con lo pedido.</p>
  <div class="traceability"><span>Requisito</span><b aria-hidden="true">→</b><span>Cambio</span><b aria-hidden="true">→</b><span>Comprobación</span><b aria-hidden="true">→</b><strong>Evidencia</strong></div>
  <div class="closure-list"><div><span>Cumplimiento</span><p>Resultado contrastado con el criterio</p></div><div><span>Coherencia</span><p>Cambio revisado frente al diseño</p></div><div><span>Entrega</span><p>Versión e instrucciones para reproducir</p></div></div>
  <div class="closing-prompt"><strong>¿Qué cambió? ¿Cómo se comprobó? ¿Qué falta?</strong><div>${link(guides.mine,'Digital Mine · alcance')}${link(guides.teacher,'Guía docente')}</div></div>
  ${footer('El siguiente incremento empieza con un nuevo plan.','Dejar registradas las limitaciones y las decisiones pendientes.')}`,
  'Cerrar un incremento requiere evidencia proporcional a su alcance. Revisar el resultado frente al requisito, las restricciones y las decisiones de diseño. Inspeccionar el diff, las interfaces, los errores y los comportamientos que podrían haberse afectado. La evidencia puede ser una ejecución reproducible, una prueba con resultado esperado independiente de la implementación o una inspección de la interfaz; combinar medios cuando haga falta. Registrar cómo reproducir la comprobación, la versión usada y lo que sigue pendiente. Documentar y crear un commit cuando el docente lo decida. Un commit conserva una versión; no demuestra por sí solo que cumple, ni implica publicación o despliegue. Los criterios no se eliminan para que una comprobación pase. Una limitación detectada debe quedar como trabajo pendiente, con su efecto visible. Retomar Digital Mine desde su documentación, sin afirmar que ya existe una implementación o un conjunto de datos. La práctica está fuera de estas láminas. Preguntar al grupo qué evidencia permitiría aceptar el incremento que se trabajó hoy.',
  [source.practice,source.review,source.agile],'Cerrar un incremento relaciona resultado, diseño y evidencia reproducible.','Revisar el avance del proyecto con las tres preguntas y consultar el alcance existente.','Separar lo comprobado de lo pendiente; conservar un cambio que otro pueda revisar.','Cierre de cada incremento · 2 min')
];
