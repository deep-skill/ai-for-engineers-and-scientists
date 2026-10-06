const ASSETS="../../../../assets/";
const link=(url,label)=>'<a href="'+url+'" target="_blank" rel="noopener noreferrer">'+label+'</a>';
const slides=[
  {
    "title": "LLMs, agentes y herramientas",
    "minutes": 1,
    "className": "hero",
    "html": "<img class=\"hero-mark\" src=\"../../../../assets/deepskill.png\" alt=\"\"><p class=\"course\">AI for Engineers and Scientists · Cohorte 01</p><h1>LLMs, agentes<br>y <span class=\"gradient\">herramientas</span></h1><p class=\"lead\">Construir una herramienta de trabajo<br>con datos reales y un agente.</p><p class=\"byline\">Jean Pierre Mandujano · 6 de octubre de 2026</p>",
    "notes": "Dejar la portada mientras se conectan. La apertura completa dura cinco minutos. Mostrar la promesa: una calculadora solar que podremos abrir y revisar. No recorrer las ocho sesiones del curso.",
    "sources": []
  },
  {
    "title": "Jean Pierre Mandujano",
    "minutes": 2,
    "html": "<div class=\"split profile\"><img class=\"portrait\" src=\"../../../../assets/JeanPierre.webp\" alt=\"Jean Pierre Mandujano\"><div><p class=\"kicker\">Founder · CTO & Tech Lead · Coach ICPC</p><h1>Jean Pierre<br>Mandujano</h1><p class=\"lead\">Programación competitiva y entrenamiento técnico.</p><p class=\"lead\">Liderazgo de ingeniería y construcción de software para la industria.</p><p class=\"lead\">Cofundador de Deep Pit Technology, adquirida por STRACON Technologies en 2022.</p></div></div>",
    "notes": "Contar dos experiencias, no leer un CV: resolver problemas con rigor en programación competitiva y llevar software a operación. Presentar el liderazgo de forma general. No afirmar título universitario. Conectar con cómo dirigir y verificar a un agente.",
    "sources": [
      "https://www.deepskill.space/"
    ]
  },
  {
    "title": "DeepSkill: software, IA y talento",
    "minutes": 2,
    "html": "<h1>DeepSkill</h1><p class=\"statement\">Ingeniería de software, IA aplicada<br>y formación técnica.</p><div class=\"cols\"><article class=\"flat\"><h3>Software para la industria</h3><p>Haul Sight: co-desarrollo con IMSS para operaciones mineras.</p></article><article class=\"flat\"><h3>IA aplicada</h3><p>Agentes y automatización en procesos de trabajo.</p></article><article class=\"flat\"><h3>Formación técnica</h3><p>Entrenamientos en Cerro Verde, vía Tecsup y UNI.</p></article></div><div class=\"talent\"><article><img src=\"../../../../assets/ElvisCapia.webp\" alt=\"Elvis Capia\"><div><h3>Elvis Capia</h3><p>Mentor · Algoritmos<br>Coach ICPC</p></div></article><article><img src=\"../../../../assets/RacsoGalvan.webp\" alt=\"Racsó Galvan\"><div><h3>Racsó Galvan</h3><p>Mentor · Programación<br>Finalista mundial ICPC</p></div></article><article><img src=\"../../../../assets/EmanuelSoto.png\" alt=\"Emanuel Soto\"><div><h3>Emanuel Soto</h3><p>Mentor · Computer Science<br>Finalista mundial ICPC</p></div></article></div>",
    "notes": "Explicar las dos líneas de Deep Skill: software e IA para organizaciones y formación de talento. Se puede mencionar Haul Sight como co-desarrollo con IMSS y entrenamientos Cerro Verde vía Tecsup / UNI. No convertir cotizaciones en proyectos ejecutados. Retratos y nombres proceden de la web oficial.",
    "sources": [
      "https://www.deepskill.space/",
      "https://www.deepskill.space/enterprise"
    ]
  },
  {
    "title": "Modelo, chat y herramienta",
    "minutes": 3,
    "html": "<h1>Modelo, chat y herramienta</h1><div class=\"definitions\"><div class=\"definition\"><strong class=\"blue\">Modelo</strong><p>Procesa contexto y genera respuestas.<br><span class=\"muted\">Ejemplos: modelos de las familias GPT y Claude.</span></p></div><div class=\"definition\"><strong>Chat</strong><p>Una interfaz de conversación.<br><span class=\"muted\">Puede conversar y también dar acceso a un agente.</span></p></div><div class=\"definition\"><strong class=\"accent\">Herramienta</strong><p>Una operación que el sistema puede ejecutar.<br><span class=\"muted\">Leer archivos, ejecutar Python, consultar una API.</span></p></div></div>",
    "notes": "Usar un mismo ejemplo: pedir una explicación de energía solar, leer NASA, ejecutar un cálculo. Chat no determina autonomía. Separar modelo, producto e interfaz.",
    "sources": [
      "https://www.anthropic.com/engineering/building-effective-agents",
      "https://artificialanalysis.ai/methodology"
    ]
  },
  {
    "title": "Workflow y agente",
    "minutes": 2,
    "html": "<h1>Workflow y agente</h1><h3>Workflow · el recorrido está definido</h3><div class=\"steps\"><span>Leer datos</span><i>→</i><span>Validar</span><i>→</i><span>Calcular</span><i>→</i><span>Graficar</span></div><h3 class=\"accent\">Agente · decide el siguiente paso</h3><div class=\"steps loop\"><span>Objetivo</span><i>→</i><span>Decisión</span><i>→</i><span>Herramienta</span><i>→</i><span>Resultado</span><i>↺</i></div><p class=\"lead\">El agente puede construir y utilizar workflows.</p><p class=\"muted\">Los pasos conocidos pueden ejecutarse como programas reproducibles.</p>",
    "notes": "El agente adapta el recorrido a lo que encuentra. El workflow predefine orden y condiciones. En la demo el agente crea un programa; después el programa calcula sin llamar al LLM al mover cada control.",
    "sources": [
      "https://www.anthropic.com/engineering/building-effective-agents"
    ]
  },
  {
    "title": "El arnés del agente",
    "minutes": 2,
    "html": "<h1>El arnés del agente</h1><p class=\"lead\">El software que coordina el modelo y la ejecución.</p><div class=\"harness\"><div><h3 class=\"blue\">Modelo</h3><p>Recibe contexto.<br>Propone respuestas<br>y acciones.</p></div><div class=\"hub\"><h2>Arnés</h2><p>Contexto · ciclo de trabajo<br>herramientas · permisos<br>resultados · sesión</p></div><div class=\"tool-list\"><p>Archivos y carpetas</p><p>Terminal y Python</p><p>Servicios y conectores</p><p>Navegador e interfaces</p></div></div><p class=\"arrow-label\">Decidir → ejecutar → observar → continuar</p><p class=\"closing\">El acceso depende del entorno, las herramientas conectadas y los permisos.</p>",
    "notes": "Harness se traduce como arnés. El modelo propone una llamada; el software ejecuta la herramienta y devuelve el resultado. Capacidades gráficas requieren la extensión adecuada: no afirmar que OpenCode trae todas las herramientas activadas.",
    "sources": [
      "https://opencode.ai/docs/tools/",
      "https://learn.chatgpt.com/docs/codex/cli"
    ]
  },
  {
    "title": "Producto, interfaz y entorno",
    "minutes": 2,
    "html": "<h1>Producto, interfaz y entorno</h1><table class=\"matrix\"><thead><tr><th>Capa</th><th>Ejemplos</th><th>Qué elegimos</th></tr></thead><tbody><tr><td>Modelo</td><td>GPT · Claude · modelos abiertos</td><td>Capacidad, velocidad y coste</td></tr><tr><td>Producto / arnés</td><td>OpenCode · Claude Code · Codex</td><td>Cómo organiza y ejecuta el trabajo</td></tr><tr><td>Interfaz</td><td>Desktop · terminal · editor · web</td><td>Desde dónde lo dirigimos</td></tr><tr><td>Entorno</td><td>Tu computador · servidor · cloud</td><td>Dónde están archivos y programas</td></tr></tbody></table><p class=\"closing\">La interfaz no determina la autonomía. Un agente local puede usar un modelo alojado en cloud.</p>",
    "notes": "Distinguir dónde corre el arnés y las herramientas de dónde se ejecuta la inferencia. Cloud es un entorno; no una familia de modelos. GPT es una familia; ChatGPT es un producto. Claude nombra tanto la aplicación como una familia.",
    "sources": [
      "https://opencode.ai/docs/",
      "https://code.claude.com/docs/en/overview",
      "https://learn.chatgpt.com/docs/cloud"
    ]
  },
  {
    "title": "Herramientas que amplían el trabajo",
    "minutes": 2,
    "html": "<h1>Herramientas que amplían el trabajo</h1><div class=\"tool-grid\"><article><h3>Archivos</h3><p>Leer datos, crear código, escribir reportes.</p></article><article><h3>Terminal y programas</h3><p>Instalar librerías, ejecutar y comprobar.</p></article><article><h3>Python y librerías</h3><p>pandas para datos · Plotly para gráficos.</p></article><article><h3>Servicios y APIs</h3><p>NASA, USGS y aplicaciones conectadas.</p></article><article><h3>Navegador e interfaces gráficas</h3><p>Inspeccionar e interactuar con aplicaciones.</p></article><article><h3>Workflows y productos específicos</h3><p>n8n y aplicaciones para pasos ya resueltos.</p></article></div><p class=\"closing\">Conocer informática permite dar mejores instrucciones y verificar resultados.</p>",
    "notes": "Con agentes y herramientas generales podemos construir muchas soluciones. Un producto puede ahorrar pasos o integraciones. No prometer reemplazar servicios externos, datos con licencia o infraestructura solo con un agente. Mostrar documentación de una librería.",
    "sources": [
      "https://opencode.ai/docs/tools/",
      "https://docs.n8n.io/advanced-ai/examples/understand-tools",
      "https://pandas.pydata.org/docs/",
      "https://plotly.com/python/"
    ]
  },
  {
    "title": "LLMs: tokens, contexto y generación",
    "minutes": 2,
    "html": "<h1>Tokens, contexto y generación</h1><p class=\"lead\">El texto se convierte en tokens. El modelo genera una continuación paso a paso.</p><div class=\"token-line\" aria-label=\"Fragmentos conceptuales, no tokenización real\"><span>Analiza</span><span> estos</span><span> datos</span><span> → …</span></div><div class=\"cols\"><article class=\"flat\"><h3>Contexto</h3><p>Instrucciones, documentos y resultados de herramientas.</p></article><article class=\"flat\"><h3>Transformer</h3><p>La atención relaciona elementos del contexto.</p></article><article class=\"flat\"><h3>Verificación</h3><p>Una respuesta convincente puede contener errores.</p></article></div><p class=\"closing\">Entrenamiento: aprender parámetros. Inferencia: usar el modelo con un contexto concreto.</p>",
    "notes": "Mantenerlo intuitivo. El dibujo es conceptual; no es un tokenizer real. Un token puede ser parte de una palabra. No desarrollar matemáticas de atención. Verificar cálculos con el programa y la fuente.",
    "sources": [
      "https://arxiv.org/abs/1706.03762",
      "https://artificialanalysis.ai/methodology"
    ]
  },
  {
    "title": "Elegir modelo según la tarea",
    "minutes": 2,
    "html": "<h1>Elegir modelo según la tarea</h1><p class=\"statement\">Capacidad · velocidad · coste · herramientas</p><div class=\"cols\"><article class=\"flat\"><h3>Modelos de frontera</h3><p>Evaluar tareas difíciles y variantes de razonamiento.</p></article><article class=\"flat\"><h3>Modelos pequeños o rápidos</h3><p>Evaluar tareas acotadas y frecuentes.</p></article><article class=\"flat\"><h3>Modelos con pesos abiertos</h3><p>Comparar proveedores, licencias y opciones locales.</p></article></div><div class=\"links\"><a class=\"button primary\" href=\"https://artificialanalysis.ai/\" target=\"_blank\" rel=\"noopener noreferrer\">Artificial Analysis ↗</a><a class=\"button\" href=\"https://models.dev/\" target=\"_blank\" rel=\"noopener noreferrer\">Models.dev ↗</a></div><p class=\"closing\">El benchmark orienta. La decisión se comprueba con nuestra tarea y nuestro arnés.</p>",
    "notes": "Pasar a Artificial Analysis: inteligencia, velocidad, latencia y coste por tarea. Distinguir tarifa por token de coste de completar una tarea. No congelar ranking. Evaluar capacidad para llamar herramientas. Pesos abiertos no equivale a licencia open source.",
    "sources": [
      "https://artificialanalysis.ai/",
      "https://artificialanalysis.ai/methodology",
      "https://models.dev/"
    ]
  },
  {
    "title": "Qué cuesta una tarea con agentes",
    "minutes": 2,
    "html": "<h1>Qué cuesta una tarea con agentes</h1><p class=\"cost-formula\">Tokens de entrada + tokens de salida<br>+ herramientas y cómputo</p><div class=\"cost-list\"><p><strong>Contexto acumulado</strong><br><span class=\"muted\">Archivos, historial y resultados.</span></p><p><strong>Iteraciones</strong><br><span class=\"muted\">Muchas llamadas para una tarea.</span></p><p><strong>Modelo y razonamiento</strong><br><span class=\"muted\">Tarifas y uso por variante.</span></p><p><strong>Caché y ejecución</strong><br><span class=\"muted\">Dependen del proveedor y el entorno.</span></p></div><div class=\"links\"><a class=\"button primary\" href=\"../../../../tools/cost-calculator.html\" target=\"_blank\" rel=\"noopener noreferrer\">Calculadora de coste ↗</a></div><p class=\"closing\">La herramienta terminada puede calcular sin llamar otra vez al LLM.</p>",
    "notes": "Una tarea puede llamar varias veces al modelo, reenviando contexto. Entrada y salida tienen tarifas distintas; caché y razonamiento varían. Usar precios ficticios claramente etiquetados en la calculadora y reemplazarlos por tarifas oficiales. Separar gasto de modelo de cómputo, herramientas y revisión humana.",
    "sources": [
      "https://artificialanalysis.ai/methodology",
      "https://opencode.ai/docs/zen/"
    ]
  },
  {
    "title": "API, suscripción y modelo local",
    "minutes": 2,
    "html": "<h1>API, suscripción y modelo local</h1><table class=\"matrix\"><thead><tr><th>Forma de acceso</th><th>Cómo se paga</th><th>Qué revisar</th></tr></thead><tbody><tr><td>API</td><td>Tokens / operaciones</td><td>Proveedor, saldo y límites</td></tr><tr><td>Suscripción</td><td>Cuota con uso incluido</td><td>Cuotas, modelos y arnés compatible</td></tr><tr><td>Oferta gratuita</td><td>Sin coste bajo condiciones</td><td>Disponibilidad y duración</td></tr><tr><td>Modelo local</td><td>Hardware, memoria y energía</td><td>Capacidad del equipo</td></tr></tbody></table><p class=\"small muted\" style=\"margin-top:25px\">Referencia al 6 oct. 2026: OpenCode Go USD 10/mes · Warp Free USD 0/mes para la terminal. El uso de IA tiene condiciones y límites.</p><p class=\"closing\">Una suscripción no equivale automáticamente a crédito de API ni a uso ilimitado.</p>",
    "notes": "Abrir precios oficiales en vivo. Warp gratis como terminal no equivale a inferencia ilimitada gratis. Las suscripciones de proveedores no habilitan cualquier arnés. Software open source, pesos abiertos y servicio de inferencia gratuito son conceptos diferentes.",
    "sources": [
      "https://opencode.ai/go/",
      "https://opencode.ai/docs/zen/",
      "https://www.warp.dev/pricing",
      "https://learn.chatgpt.com/pricing/",
      "https://claude.com/pricing"
    ]
  },
  {
    "title": "OpenCode Desktop: un proyecto de trabajo",
    "minutes": 1,
    "html": "<h1>OpenCode Desktop</h1><div class=\"split\"><div><p class=\"lead\">Una carpeta de proyecto.<br>Un modelo disponible.<br>Un objetivo verificable.</p><p class=\"muted\">Primero inspeccionar y proponer.<br>Después ejecutar y revisar.</p><div class=\"links\"><a class=\"button\" href=\"https://opencode.ai/download\" target=\"_blank\" rel=\"noopener noreferrer\">Descarga oficial ↗</a></div></div><pre class=\"workspace\">solar/starter/\n├── BRIEF.md\n├── data/\n│   ├── lima-2025.json\n│   ├── arequipa-2025.json\n│   ├── piura-2025.json\n│   └── sources.json\n└── … lo construimos hoy</pre></div><p class=\"closing\">Desktop es la interfaz; el modelo puede venir de un proveedor remoto.</p>",
    "notes": "Abrir SOLO demos/solar/starter en OpenCode Desktop. Elegir un modelo gratuito disponible en el selector tras probarlo. Identificar carpeta, proveedor y modelo. La referencia está fuera de starter.",
    "sources": [
      "https://opencode.ai/download",
      "https://opencode.ai/docs/models/",
      "https://opencode.ai/docs/zen/"
    ]
  },
  {
    "title": "Warp, shell y agentes de terminal",
    "minutes": 1,
    "html": "<h1>Warp, shell y agentes</h1><div class=\"cols\"><article class=\"flat\"><h3>Terminal</h3><p>Warp</p><p class=\"small muted\">Alternativas: Ghostty<br>y Windows Terminal.</p></article><article class=\"flat\"><h3>Shell</h3><p>zsh · bash · PowerShell</p><p class=\"small muted\">Interpreta los comandos<br>y organiza su ejecución.</p></article><article class=\"flat\"><h3>Agentes</h3><p>OpenCode<br>Claude Code · Codex</p><p class=\"small muted\">Pueden trabajar desde<br>una terminal compatible.</p></article></div><div class=\"steps\" style=\"margin-top:40px\"><span>Carpeta</span><i>→</i><span>Entorno virtual</span><i>→</i><span>Librerías</span><i>→</i><span>Programa</span></div><p class=\"closing\">Warp es nuestra terminal de trabajo. Sus funciones de IA son una opción adicional.</p>",
    "notes": "Mostrar Warp unos minutos: pwd / ls, python --version y ejecutar el programa. Mencionar claude y codex como dos agentes de terminal además de OpenCode. No dar una clase de shell completa. Shell, terminal y modelo son distintos.",
    "sources": [
      "https://docs.warp.dev/",
      "https://ghostty.org/docs",
      "https://learn.microsoft.com/en-us/windows/terminal/",
      "https://code.claude.com/docs/en/overview",
      "https://learn.chatgpt.com/docs/codex/cli"
    ]
  },
  {
    "title": "Calculadora solar con NASA",
    "minutes": 1,
    "html": "<h1>Calculadora solar con NASA</h1><div class=\"split\"><div><h2 class=\"demo-title\">¿Cómo cambia la producción entre Lima, Arequipa y Piura?</h2><p>365 días de 2025 por ciudad.<br>Una demanda elegida por nosotros.<br>Potencia y pérdidas como supuestos.</p><p class=\"small muted\">NASA POWER · superficie horizontal<br>kWh/m²/día</p></div><div class=\"demo-result\"><h3 class=\"accent\">Construimos una herramienta</h3><ul><li>Lectura de datos públicos</li><li>Análisis con pandas</li><li>Gráficos con Plotly</li><li>Comparación y cálculo reproducible</li></ul></div></div><div class=\"links\"><a class=\"button primary\" href=\"../../../../demos/solar/reference/output/index.html\" target=\"_blank\" rel=\"noopener noreferrer\">Ver resultado de referencia ↗</a><a class=\"button\" href=\"../../../../demos/solar/starter/BRIEF.md\" target=\"_blank\" rel=\"noopener noreferrer\">Brief y datos ↗</a></div>",
    "notes": "Pedir inspección, verificación de unidades y plan antes de ejecutar. Modelo educativo: kWp por horas solares equivalentes por performance ratio. Diferenciar los datos de NASA de nuestros supuestos. No incluye inclinación, sombras, baterías ni diseño eléctrico. Datos archivados para independencia de la API durante clase.",
    "sources": [
      "https://power.larc.nasa.gov/docs/tutorials/service-data-request/api/"
    ]
  },
  {
    "title": "Alternativas de demo",
    "appendix": true,
    "minutes": 0,
    "html": "<h1>Alternativas de demo</h1><table class=\"matrix\"><thead><tr><th>Problema</th><th>Datos y librerías</th><th>Resultado</th></tr></thead><tbody><tr><td><strong>Energía solar</strong></td><td>NASA POWER<br>pandas · Plotly</td><td>Comparar ciudades,<br>demanda y potencia</td></tr><tr><td>Sismos y distancia</td><td>USGS<br>pandas · Plotly · pyproj</td><td>Mapa, filtros y eventos<br>próximos a un punto</td></tr><tr><td>Planificar una ruta</td><td>OpenStreetMap<br>OSMnx · NetworkX</td><td>Ruta y distancias<br>sobre una red real</td></tr></tbody></table><p class=\"closing\">Solar y sismos tienen datos archivados. La ruta requiere más preparación.</p>",
    "notes": "Apéndice opcional. Solar es la base provisional. Sismos tiene datos reales y brief, aún sin herramienta completa. OpenStreetMap añade variabilidad de consultas y dependencias. Una sola demo central en la sesión.",
    "sources": [
      "https://power.larc.nasa.gov/docs/tutorials/service-data-request/api/",
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php",
      "https://osmnx.readthedocs.io/"
    ]
  },
  {
    "title": "Revisar el trabajo del agente",
    "appendix": true,
    "minutes": 0,
    "html": "<h1>Revisar el trabajo del agente</h1><div class=\"definitions\"><div class=\"definition\"><strong>Fuente</strong><p>¿Qué datos utilizó? ¿De cuándo son? ¿Qué unidades tienen?</p></div><div class=\"definition\"><strong class=\"blue\">Cálculo</strong><p>Comprobar un día y un mes. Separar datos de supuestos.</p></div><div class=\"definition\"><strong class=\"accent\">Resultado</strong><p>Abrir la herramienta. Cambiar un control. Revisar su comportamiento.</p></div></div><p class=\"closing\">En este modelo lineal, duplicar la potencia debe duplicar la producción.</p>",
    "notes": "Comparar 1 de enero con la fuente y la tabla. Enero tiene 31 días: un promedio mensual no es un total. Pedir una modificación y revisar de nuevo. Guardar código permite reproducir y continuar.",
    "sources": []
  },
  {
    "title": "Páginas para tener a mano",
    "appendix": true,
    "minutes": 0,
    "html": "<h1>Páginas para tener a mano</h1><div class=\"tool-grid\"><article><h3><a href=\"https://artificialanalysis.ai/\" target=\"_blank\" rel=\"noopener noreferrer\">Artificial Analysis ↗</a></h3><p>Capacidad, velocidad, latencia y coste.</p></article><article><h3><a href=\"https://models.dev/\" target=\"_blank\" rel=\"noopener noreferrer\">Models.dev ↗</a></h3><p>Modelos y proveedores.</p></article><article><h3><a href=\"https://opencode.ai/docs/\" target=\"_blank\" rel=\"noopener noreferrer\">OpenCode Docs ↗</a></h3><p>Modelos, herramientas y permisos.</p></article><article><h3><a href=\"https://www.warp.dev/pricing\" target=\"_blank\" rel=\"noopener noreferrer\">Precios oficiales ↗</a></h3><p>Límites, cuota y consumo adicional.</p></article><article><h3><a href=\"https://pandas.pydata.org/docs/\" target=\"_blank\" rel=\"noopener noreferrer\">pandas ↗</a> · <a href=\"https://plotly.com/python/\" target=\"_blank\" rel=\"noopener noreferrer\">Plotly ↗</a></h3><p>Análisis y visualización.</p></article><article><h3><a href=\"https://power.larc.nasa.gov/\" target=\"_blank\" rel=\"noopener noreferrer\">NASA POWER ↗</a> · <a href=\"https://earthquake.usgs.gov/\" target=\"_blank\" rel=\"noopener noreferrer\">USGS ↗</a></h3><p>Datos públicos y documentación.</p></article></div>",
    "notes": "Recursos para compartir. Lista completa en docs/sources.md. Consultar precios y rankings en vivo.",
    "sources": [
      "https://artificialanalysis.ai/",
      "https://models.dev/",
      "https://opencode.ai/docs/",
      "https://www.warp.dev/pricing",
      "https://pandas.pydata.org/docs/",
      "https://plotly.com/python/",
      "https://power.larc.nasa.gov/",
      "https://earthquake.usgs.gov/"
    ]
  }
];

