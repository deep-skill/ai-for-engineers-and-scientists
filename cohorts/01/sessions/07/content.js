'use strict';
const ASSETS='../../../../assets/';
const link=(url,label,cls='text-link')=>'<a class="'+cls+'" href="'+url+'" target="_blank" rel="noopener noreferrer">'+label+' ↗</a>';
const source={
 eda:'https://www.itl.nist.gov/div898/handbook/eda/section1/eda11.htm',
 outliers:'https://www.itl.nist.gov/div898/handbook/eda/section3/eda35h.htm',
 association:'https://www.itl.nist.gov/div898/handbook/eda/section3/scatterp.htm',
 missing:'https://pandas.pydata.org/docs/user_guide/missing_data.html',
 engineering:'https://www.ibm.com/think/topics/data-engineering',
 science:'https://www.ibm.com/think/topics/data-science',
 reproducibility:'https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1005510',
 synthetic:'https://www.ibm.com/think/topics/synthetic-data',
 pandas:'https://pandas.pydata.org/docs/getting_started/intro_tutorials/02_read_write.html',
 sql:'https://duckdb.org/docs/2.0/sql/introduction.html',
 plotly:'https://plotly.com/python/',
 agent:'https://opencode.ai/docs/'
};
const footer=(text,detail='')=>'<div class="slide-bottom"><p>'+text+'</p>'+(detail?'<span>'+detail+'</span>':'')+'</div>';
const make=(title,minutes,chapter,html,notes,sources,idea,interaction,focus)=>({title,minutes,chapter,html,notes,sources,review:{idea,interaction,focus},className:'',when:'Explicación conceptual · práctica aparte'});

const slides=[
make('La pregunta y la decisión',2,'Clase 7 · 24 octubre 2026',`
 <h1>Análisis de datos <span class="gradient">con IA</span></h1>
 <p class="slide-lead">El gemelo digital conecta datos y preguntas de ingeniería.</p>
 <div class="question-visual">
  <blockquote>¿Dónde se alarga<br>el ciclo de acarreo?</blockquote>
  <div class="question-path" role="group" aria-label="Definir el análisis antes de calcular">
   <div><span>Medida</span><strong>Tiempo por ciclo</strong><small>Minutos · un ciclo completo</small></div>
   <div><span>Comparación</span><strong>Condiciones similares</strong><small>Ruta · carga · período</small></div>
   <div><span>Decisión</span><strong>Qué revisar primero</strong><small>Con evidencia y criterio operativo</small></div>
  </div>
 </div>
 ${footer('El análisis empieza por lo que queremos decidir.','Digital Mine · caso de acarreo con datos sintéticos')}`,
 'Abrir con una decisión concreta, no con la orden genérica de graficar un archivo. El ejemplo pregunta dónde se alarga un ciclo de acarreo para priorizar una revisión operativa. Definir antes qué marca el inicio y el fin del ciclo, qué rutas y equipos entran, el período y la unidad de observación. Una fila puede representar un evento, un ciclo o un turno: mezclar esas granularidades cambia el resultado. Acordar la medida y sus unidades, la comparación y el alcance de la conclusión. Comparar condiciones semejantes ayuda a interpretar diferencias, pero no demuestra causalidad. La IA puede ayudar a precisar la pregunta, revisar el diccionario de datos y proponer un plan. La decisión y los criterios necesitan conocimiento del dominio. Este caso es conceptual y no afirma que Digital Mine tenga datos operativos o una implementación. El título curricular sigue siendo Análisis de datos con IA: del dato al insight en minería. La clase anterior preparó el ciclo planear, ejecutar y verificar; aquí se aplica al análisis sin atribuir actividades concretas al dictado no confirmado.',
 [source.eda],'Una pregunta concreta conecta medida, comparación y decisión.','Recorrer la pregunta y las tres definiciones del ejemplo minero.','Precisar unidad de observación, población y período antes de calcular.'),

make('Tres disciplinas de datos',2,'Ingeniería · análisis · ciencia',`
 <h1>Tres disciplinas de datos</h1>
 <p class="slide-lead">Énfasis distintos sobre un mismo problema.</p>
 <div class="disciplines-map" role="group" aria-label="Tres disciplinas que colaboran sobre los ciclos de acarreo">
  <div class="disciplines-case"><span>En una mina</span><strong>Ciclos de acarreo</strong></div>
  <div class="discipline-branches" aria-hidden="true"><span>↓</span><span>↓</span><span>↓</span></div>
  <div class="discipline-grid">
   <article><h2>Ingeniería<br> de datos</h2><p>Datos disponibles y confiables</p><small>Integrar sensores y despacho</small><strong>Tabla de ciclos</strong></article>
   <article class="current-discipline"><h2>Análisis<br> de datos</h2><p>Comprender y decidir</p><small>Comparar tiempos por ruta</small><strong>Informe de hallazgos</strong></article>
   <article><h2>Ciencia<br> de datos</h2><p>Modelar y contrastar</p><small>Predecir duración y medir error</small><strong>Modelo evaluado</strong></article>
  </div>
 </div>
 ${footer('Las disciplinas se solapan y colaboran.','Ejemplo conceptual · el foco de esta clase es el análisis de datos')}`,
 'La distinción es por énfasis y tipo de resultado, con fronteras que varían entre organizaciones. Ingeniería de datos diseña y opera sistemas de captura, integración, transformación y almacenamiento; cuida disponibilidad, calidad, trazabilidad y acceso. Análisis de datos explora e interpreta evidencia para responder preguntas y apoyar decisiones, con indicadores, comparaciones e informes. Ciencia de datos combina estadística, programación y conocimiento del dominio para formular y contrastar hipótesis y construir modelos; puede usar aprendizaje automático, pero no se reduce a él. El mismo caso minero permite ilustrar entregables: integrar eventos en una tabla de ciclos, comparar tiempos por ruta y evaluar un modelo de duración con datos separados del ajuste. Son ejemplos, no tareas exclusivas. Un analista también puede modelar y un científico explorar y preparar datos. La limpieza aparece en las tres disciplinas; convertir un CSV una vez no agota la ingeniería de datos. El esquema representa colaboración, sin una jerarquía de profesiones ni tres fases obligatorias. Generar datos es una tarea que puede apoyarse en reglas, simulación o modelos, y no una cuarta disciplina equivalente. La lámina no construye un pipeline ni entrena un modelo. No hay mediciones nuevas de Digital Mine en esta lámina.',
 [source.engineering,source.science],'Las disciplinas comparten métodos y se distinguen por su énfasis y entregables.','Comparar tres contribuciones al mismo caso de ciclos de acarreo.','Evitar presentar análisis como solo gráficos, ciencia como solo IA o ingeniería como solo limpieza.'),

make('Datos sintéticos del acarreo',3,'Origen · tipos · reglas',`
 <h1>Datos sintéticos del acarreo</h1>
 <p class="slide-lead">Un escenario produce registros que podemos comprobar.</p>
 <div class="synthetic-flow" role="group" aria-label="Reglas de un escenario producen ciclos sintéticos que se validan">
  <div><span>Diseño</span><strong>Escenario y reglas</strong></div><b aria-hidden="true">→</b><div><span>Generación</span><strong>Ciclos sintéticos</strong></div><b aria-hidden="true">→</b><div><span>Comprobación</span><strong>Coherencia y unidades</strong></div>
 </div>
 <div class="record-heading"><strong>Una fila = un ciclo</strong><span>Ejemplo C-001</span></div>
 <div class="data-types" role="group" aria-label="Tipos de datos de un ciclo de acarreo sintético">
  <div><span>Categoría</span><strong>R-01</strong><small>Ruta</small></div><div><span>Número</span><strong>80 t</strong><small>Carga</small></div><div><span>Fecha y hora</span><strong>24 oct. · 13:00 UTC</strong><small>Inicio del ciclo</small></div><div><span>Indicador</span><strong>Sí</strong><small>Es simulado</small></div>
 </div>
 ${footer('Los patrones de una simulación dependen de sus reglas.','Datos sintéticos de ejemplo · sin mediciones de una mina real')}`,
 'Generar datos significa construir registros a partir de un escenario y reglas explícitas. Para un ejemplo operativo conviene respetar estados, secuencias, unidades y relaciones, no inventar columnas sin restricciones. Un generador puede usar parámetros y semilla cuando incorpora azar; repetir también requiere conservar versión y configuración. El ejemplo de esta presentación es una tabla didáctica fija de ocho ciclos, con valores elegidos explícitamente, sin distribución ajustada ni semilla. No es la salida del simulador de Digital Mine. Cada fila resume un ciclo completo, incluida espera inicial, carguío, viaje cargado, descarga y retorno. Los campos ilustran categorías, magnitudes numéricas, fecha/hora e indicadores booleanos. Los identificadores de camión y ciclo se tratan como etiquetas aunque contengan dígitos. Un conteo es numérico discreto; una duración o carga permite valores fraccionarios. CSV es un formato tabular y JSON una estructura de intercambio, no tipos estadísticos. Conservar el indicador de simulación y documentar datos medidos, sintéticos y métricas derivadas por separado. Revisar duplicados, faltantes, unidades y secuencias; un faltante no equivale a cero. La IA puede escribir el generador y sus comprobaciones, pero las reglas del escenario necesitan revisión del dominio.',
 [source.synthetic,source.missing],'Los datos sintéticos tienen reglas y tipos explícitos que deben poder comprobarse.','Seguir el recorrido de generación y leer cuatro tipos en un mismo ciclo.','Distinguir generación de análisis, tipo de dato de formato y dato sintético de medición.'),

make('Explorar los datos',3,'Digital Mine · acarreo',`
 <h1>Explorar el ciclo de acarreo</h1>
 <p class="slide-lead">Comparar, descomponer y formular preguntas.</p>
 <div class="exploration-layout">
  <figure class="haulage-chart"><figcaption>Tiempo por ruta y componente</figcaption><div id="haulage-chart" aria-live="polite"><p class="chart-loading">Cargando el ejemplo sintético…</p></div></figure>
  <div class="exploration-questions"><div><span>Comparar</span><strong>¿En qué ruta tarda más?</strong></div><div><span>Descomponer</span><strong>¿Es espera, servicio o traslado?</strong></div><div><span>Contrastar</span><strong>¿Qué supusimos al generar?</strong></div></div>
 </div>
 ${footer('Una media resume; el rango muestra parte de la variación.','Ejemplo sintético · 8 ciclos, 4 por ruta · no representa una operación real')}`,
 'El gráfico usa ocho ciclos sintéticos de la ilustración local. Agrupa por ruta y calcula medias por ciclo: R-01 suma 3 minutos de espera, 6 de servicio y 17 de traslado, total 26; R-02 suma 8, 6 y 22, total 36. Servicio combina carguío y descarga; traslado combina acarreo cargado y retorno vacío. La espera incluye solo la cola inicial del ejemplo. Los rangos de duración total son 24–28 y 32–40 minutos; cada grupo tiene cuatro ciclos. Son agregaciones de duraciones, no mediciones reales ni estimaciones de productividad. Todos los ciclos están completos y tienen igual peso; si se cambia ese criterio, revisar el denominador y el efecto de ciclos incompletos. El patrón fue incorporado al elegir las reglas: el ejemplo no descubre un cuello de botella real ni valida el gemelo. Para explorar otros datos, elegir distribución para variación, series para cambios temporales y dispersión para relaciones. Revisar tamaño de muestra, faltantes y condiciones comparables antes de interpretar. El gráfico es un cálculo local verificable, no una llamada a un modelo ni una ejecución del gemelo. La construcción del generador y el análisis práctico se realizan fuera de la presentación.',
 [source.eda,source.synthetic],'El análisis relaciona comparaciones con componentes y supuestos del escenario.','Leer los totales y sus componentes en dos rutas sintéticas.','Conservar unidades, tamaño de grupo y origen sintético; no inferir un problema real de la mina.'),

make('Herramientas y trabajo con IA',3,'Agente · cálculo · visualización',`
 <h1>Herramientas y trabajo con IA</h1>
 <p class="slide-lead">La pregunta y el criterio siguen a cargo del ingeniero.</p>
 <div class="ai-toolchain" role="group" aria-label="El agente usa herramientas de procesamiento y visualización para producir evidencia">
  <div><img src="${ASSETS}logos/opencode.png" alt="OpenCode" class="pipeline-logo"><span>Agente</span><h2>OpenCode</h2><p>Propone código<br>y usa herramientas</p></div><b aria-hidden="true">→</b>
  <div><div class="pipeline-logos"><img src="${ASSETS}logos/python.png" alt="Python"><img src="${ASSETS}logos/pandas.svg" alt="pandas"></div><span>Procesamiento</span><h2>SQL · Python</h2><p>Consulta, transforma<br>y calcula</p></div><b aria-hidden="true">→</b>
  <div><img src="${ASSETS}logos/plotly.svg" alt="Plotly" class="pipeline-logo"><span>Visualización</span><h2>Tablas y gráficos</h2><p>Plotly o una<br>hoja de cálculo</p></div>
 </div>
 <div class="format-strip"><span>Entradas</span><strong>CSV · JSON</strong><p>Archivos con datos y procedencia</p></div>
 ${footer('El código y los resultados permiten comprobar el análisis.','Diagrama conceptual · el agente usa las herramientas disponibles y autorizadas')}`,
 'Distinguir componentes: CSV y JSON son formatos; SQL es un lenguaje de consultas; Python es un lenguaje de programación; pandas es una librería para datos tabulares; Plotly es una librería de visualización. Una hoja de cálculo puede servir para inspeccionar y contrastar. Un motor como DuckDB puede ejecutar SQL sobre datos locales; se cita como referencia, sin imponer una base de datos al proyecto. OpenCode es el entorno agéntico usado en el curso, no el motor que sustituye toda computación. El agente puede leer archivos, proponer código, ejecutar herramientas y revisar salidas según permisos y configuración. Pedirle un objetivo, campos relevantes, unidades, restricciones y evidencia esperada. Para crear datos sintéticos, preferir un generador reproducible con reglas comprobadas a una tabla presentada como si fuera una observación. Después, conservar consultas o scripts y revisar filas, exclusiones, fórmulas y gráficos. La IA también puede sugerir explicaciones equivocadas: contrastarlas con resultados de herramientas. El diagrama no realiza llamadas al modelo ni instala estas herramientas; los logos provienen de los archivos oficiales ya registrados en el repositorio. El gráfico anterior está hecho con JavaScript local, no con pandas o Plotly.',
 [source.pandas,source.sql,source.plotly,source.agent],'El agente coordina herramientas; el análisis conserva código y resultados revisables.','Seguir una tarea desde el agente al procesamiento y la visualización.','Distinguir formatos, lenguajes, librerías y agente; evitar atribuir cálculos a una respuesta textual.'),

make('Verificar y comunicar',3,'Resultado · hipótesis · alcance',`
 <h1>Interpretación con evidencia</h1>
 <p class="slide-lead">El alcance de la conclusión depende de los datos y los supuestos.</p>
 <div class="finding-example"><span>En el ejemplo sintético</span><blockquote>La espera media es mayor en R-02.</blockquote><p>La diferencia está incorporada en las reglas del escenario.</p></div>
 <div class="evidence-path compact-evidence" role="group" aria-label="Trazabilidad del análisis sintético"><div><span>Origen</span><strong>Datos</strong><small>Y reglas del escenario</small></div><b aria-hidden="true">→</b><div><span>Proceso</span><strong>Código</strong><small>Y unidades</small></div><b aria-hidden="true">→</b><div><span>Entrega</span><strong>Hallazgos</strong><small>Y límites</small></div></div>
 ${footer('Antes de decidir: contrastar datos, cálculos y supuestos.')}`,
 'Describir primero el resultado: las medias de espera del ejemplo son 3 y 8 minutos. La explicación conocida aquí es el diseño de los valores sintéticos, no una observación de congestión real. En datos operativos, una relación puede sugerir una hipótesis sin demostrar causalidad: ruta, pendiente, carga y condiciones de operación pueden influir en varias variables. Separar lo observado, la explicación propuesta y lo que falta contrastar. Revisar unidades, recuentos, ciclos incompletos, exclusiones y denominadores. Contrastar casos pequeños con un cálculo independiente; repetir el proceso desde los datos de origen con reglas y entorno identificados. Reproducir un resultado no prueba que el escenario sea realista o que la interpretación sea válida. Los datos sintéticos sirven para desarrollo, pruebas y aprendizaje; su utilidad depende de los supuestos y, para uso real, de validación apropiada. Conservar los datos con su etiqueta, código, parámetros, comprobaciones y alcance del informe. La IA puede ayudar a redactar, pero la conclusión debe coincidir con la evidencia. No se promete terminar el MVP; la práctica de construcción y análisis sucede fuera de las slides. La sesión 8 mantiene el proyecto integrador.',
 [source.association,source.reproducibility,source.synthetic],'Un hallazgo sintético se interpreta dentro de sus reglas y conserva evidencia revisable.','Relacionar el hallazgo del ejemplo con datos, código y alcance.','Separar hipótesis de causa demostrada y reproducibilidad de validez.')
];
slides[2].previousTitle='Entender y preparar los datos';
