# Clase 2: del chat al agente

Preparación del 8 de octubre de 2026. Sesión de 120 minutos, con ocho láminas y hasta 30 minutos de presentación intercalados con trabajo en OpenCode. RAG ocupa la última media hora y no tiene práctica. Este archivo registra lo preparado, no confirma el dictado.

## Alcance acordado con JP

Decisiones confirmadas el 8 de octubre de 2026, antes del dictado:

1. **Del chat al agente.** Repasar brevemente la clase 1 y explicar contexto, herramientas y ciclo de planificación, acción, observación y verificación.
2. **Herramientas locales con los mismos sismos.** Abrir el proyecto USGS en OpenCode, inspeccionar el GeoJSON, calcular los cinco eventos más próximos a Lima, exportar a CSV y revisar el archivo manualmente en Excel o Numbers. Hacer visible qué decide el modelo, qué ejecuta la herramienta y cómo se comprueba la entrega.
3. **Conexiones con sistemas externos.** Consultar USGS por API para obtener datos actualizados y distinguir API, MCP y credenciales. Los ejemplos seleccionados son USGS sin clave, NASA NeoWs con DEMO_KEY, DeepWiki como MCP público y Everything para OAuth de prueba. Microsoft Learn queda como alternativa pública. Las conexiones MCP se preparan y verifican en OpenCode antes de mostrarlas; no se ejecutan desde la presentación.
4. **RAG al final, solo teoría.** Reservar los minutos 90–120 para límites de la lectura exhaustiva, fragmentos, embeddings, similitud semántica, preparación del corpus, recuperación y generación con fuentes. Usar diagramas con etiquetas cortas; el desarrollo queda en las notas docentes. Incluir versiones, contradicciones y ausencia de evidencia en la conversación de cierre.

La práctica debe terminar antes del bloque RAG. Control del navegador con Playwright MCP, creación de una presentación para Keynote, bases de datos y servicios locales adicionales son extensiones opcionales; no desplazan los cuatro bloques ni requieren una implementación RAG.

## Apertura y ritmo

| Minutos | Actividad | Lámina |
|---|---|---|
| 0–5 | Repaso de 1–2 minutos: chat frente a entorno agéntico. Abrir OpenCode y el proyecto USGS. | 1, hasta 1 min |
| 5–20 | Precisar el contexto y revisar la inspección inicial del agente. | 2, hasta 5 min |
| 20–35 | Señalar una acción, su herramienta y la observación real. | 3, hasta 5 min |
| 35–50 | Comparar archivo local, API y MCP. DeepWiki sin autenticación y Everything con OAuth de prueba. | 4, hasta 5 min |
| 50–80 | Top 5, exportación CSV, apertura manual en Excel/Numbers, verificación. Consulta API actualizada si cabe. | 5, hasta 4 min |
| 80–90 | Cerrar entregas, resolver pendientes y descansar. | Sin láminas nuevas |
| 90–96 | Problema del volumen documental y selección de evidencia. | 6, hasta 2 min |
| 96–108 | Embeddings y similitud semántica con un gráfico ilustrativo. | 7, hasta 4 min |
| 108–120 | Arquitectura RAG y preguntas. | 8, hasta 4 min |

El grupo trabaja con los mismos sismos USGS. No necesita Docker ni una base de datos. Las notas de cada lámina se abren con P y contienen el desarrollo y las fuentes. R abre revisión con comentarios locales.

La lámina de conexiones incluye una variante de API con clave: NASA NeoWs con `DEMO_KEY`, clave pública de pruebas con límites reducidos. Puede mostrarse brevemente para distinguir interfaz de credencial. La práctica principal sigue con USGS. Crear una presentación para Keynote o automatizar todo el escritorio son extensiones opcionales, no requisitos del ejercicio.

## Antes de dictar

1. Abrir la presentación y OpenCode Desktop. Comprobar el proveedor y modelo disponibles sin mostrar credenciales.
2. Abrir únicamente `demos/earthquakes/starter/` como proyecto del alumno. La referencia numérica está en la página docente, fuera de esa carpeta.
3. Tener Excel o Numbers disponible para abrir el CSV manualmente. Si usa otro delimitador por configuración regional, mostrar la importación o pedir una exportación alternativa.
4. Preparar DeepWiki con el procedimiento de la versión instalada de OpenCode. Endpoint: `https://mcp.deepwiki.com/mcp`, sin autenticación. Confirmar la lista de herramientas y una pregunta sobre un repositorio público (por ejemplo Leaflet/Leaflet) antes de mostrarlo al grupo. Microsoft Learn queda como alternativa sin autenticación. Preparar también Everything para contrastar el flujo OAuth de prueba, sin cuenta propia. La página de la presentación no hace esas conexiones.
5. Tener preparada la consulta al feed USGS con acceso de red. Guardar cualquier respuesta nueva separada del snapshot original. Si la red falla, la práctica con archivo sigue funcionando.

Fuentes de configuración: [MCP en OpenCode](https://docs.opencode.ai/docs/mcp-servers/), [DeepWiki MCP](https://docs.devin.ai/work-with-devin/deepwiki-mcp), [Microsoft Learn MCP](https://learn.microsoft.com/en-us/training/support/mcp), [Everything con OAuth de prueba](https://github.com/modelcontextprotocol/inspector/blob/main/docs/mcp-server-configuration.md). Las configuraciones pueden cambiar entre versiones: consultar el formato de la instalación que se usará, sin copiar otra configuración global del docente.

## Qué mirar durante el trabajo

- Contexto: el agente debe inspeccionar campos y procedencia antes de asumir unidades. Documentos y resultados aportan información, no instrucciones con la autoridad del usuario.
- Ciclo: señalar acciones y observaciones visibles. El ejemplo animado de la lámina 3 es una secuencia guionada local, no un registro de llamadas reales.
- Herramientas: lectura, ejecución, petición HTTP y MCP son recorridos que pueden combinarse. MCP puede funcionar localmente o conectarse a un servidor remoto. API key es una credencial, no otro protocolo.
- Entrega: IDs, coordenadas, magnitudes, profundidad, fecha UTC, distancia en km, orden y CSV. Preguntar qué evidencia sostiene que el trabajo terminó.

## Referencia numérica

La página calcula Haversine en JavaScript, con radio terrestre de 6371 km y coordenadas de Lima (-12.0464, -77.0428). Usa el original archivado en `demos/earthquakes/starter/data/` y su procedencia. La vista de puntos usa latitud/longitud; no representa una proyección cartográfica adecuada para medir distancias sobre el dibujo.

| Orden | ID USGS | Magnitud | Distancia superficial km |
|---|---|---|---|
| 1 | us7000tgy2 | 4.5 | 282.5 |
| 2 | us7000tivb | 4.5 | 452.1 |
| 3 | us7000tgvk | 4.5 | 521.6 |
| 4 | us7000tii3 | 4.9 | 893.9 |
| 5 | us7000tg9q | 4.7 | 901.2 |

Estos valores son cálculos derivados del snapshot, no distancias medidas por USGS. No comparar con un catálogo actualizado como si fuera idéntico. Una fórmula elipsoidal documentada puede producir diferencias respecto a Haversine.

## Extensión opcional de navegador

OpenCode admite herramientas MCP adicionales. [Playwright MCP](https://playwright.dev/docs/getting-started-mcp) permite manejar un navegador y revisar la página generada. Esto requiere preparar esa integración; no implica control general de Excel, Numbers o todo el escritorio. No configurar la integración durante el bloque principal si consume el tiempo de práctica. No es un requisito del alumno ni una parte implementada por esta presentación.

## Referencia técnica para explicar MCP

API significa Application Programming Interface. HTTP es un protocolo de comunicación; REST es un estilo arquitectónico. SOAP define un marco de mensajes XML que puede utilizar HTTP. Estos conceptos describen aspectos distintos de una integración.

MCP significa Model Context Protocol. Define mensajes basados en JSON-RPC 2.0 y capacidades que intercambian cliente y servidor. `tools/list` permite descubrir herramientas con nombre, descripción y JSON Schema de entrada; `tools/call` permite invocar una con argumentos. El host de IA presenta las herramientas al modelo y su cliente MCP envía la llamada elegida. El servidor ejecuta la implementación y devuelve el resultado. Las operaciones iniciales y metadatos concretos dependen de la versión del protocolo compatible con el cliente y el servidor.

El transporte puede ser entrada/salida estándar entre procesos locales o Streamable HTTP para un servidor remoto. Un servidor también puede exponer recursos y prompts. La implementación de una herramienta puede llamar a la API USGS; esa API no se convierte automáticamente en MCP por devolver JSON.

Fuentes: [API en MDN](https://developer.mozilla.org/en-US/docs/Glossary/API), [REST en MDN](https://developer.mozilla.org/en-US/docs/Glossary/REST), [SOAP 1.2 en W3C](https://www.w3.org/TR/soap12-part1/), [arquitectura MCP](https://modelcontextprotocol.io/docs/learn/architecture).

## RAG al cierre

Comenzar cuando la práctica haya terminado. Preguntar qué cambia con miles de manuales y versiones. Explicar preparación del corpus, fragmentos con metadatos, índice de búsqueda, recuperación ante una consulta y generación con evidencia en el contexto.

La lámina de embeddings convierte pregunta y fragmento en vectores y compara textos relacionados con palabras distintas: «La bomba no entrega agua» y «Sin caudal en la descarga». El espacio 2D, sus posiciones y el vector numérico están inventados para explicar la idea: no se ejecuta un modelo ni se muestran resultados medidos. Un modelo entrenado produce la representación; un modelo compatible representa la consulta. La similitud coseno compara direcciones, no demuestra verdad ni equivale a una probabilidad. Recuperar devuelve los textos originales y su origen para incorporarlos al contexto del LLM. Los detalles del entrenamiento y del coseno quedan en las notas de la lámina, no como párrafos en pantalla.

La arquitectura final muestra la variante semántica en dos fases: documentos → fragmentos → embeddings → índice; pregunta → embedding → recuperación de fragmentos → LLM → respuesta. El índice conserva o referencia texto y metadatos, además de vectores. El modelo de embeddings y el generativo tienen funciones diferentes. Para códigos técnicos, versiones e identificadores, explicar brevemente el valor de la búsqueda léxica y de los filtros.

El índice puede ser léxico, vectorial o híbrido. Los archivos en disco no consumen tokens por estar almacenados. El coste depende del contenido procesado y de la arquitectura, y no se promete un ahorro automático. Un agente puede buscar y citar sin RAG, y también puede usar un recuperador RAG como herramienta. Las referencias y la corrección requieren diseño y verificación.

Preguntas de discusión: ¿qué pasa si no se encuentra evidencia?, ¿si el documento está desactualizado?, ¿si dos fuentes discrepan? Sin implementación ni ejercicio RAG.

### Precisiones para la explicación y las preguntas

- **Fragmentos:** tamaños grandes pueden mezclar temas y pequeños pueden separar instrucciones de sus condiciones. Conservar unidades de significado, secciones y tablas; comprobar la estrategia con preguntas representativas, sin presentar un tamaño universal.
- **Similitud:** dos textos contradictorios pueden tener embeddings próximos. La similitud permite recuperar contenido relacionado, pero no decide verdad, vigencia ni suficiencia de la evidencia.
- **Versiones y conflictos:** conservar documento, versión, equipo/modelo y condiciones de aplicación. La versión más reciente no necesariamente corresponde al caso. Si el conflicto sigue sin resolverse, mostrar ambas fuentes y pedir la información que falta; no elegir solo por la puntuación de similitud.
- **Diagnóstico:** observar fragmentos recuperados, contexto realmente enviado y respuesta. Comprobar si la evidencia correcta se recuperó y llegó completa; después probar la generación con esa evidencia proporcionada manualmente. No atribuir un fallo al recuperador sin comprobarlo.
- **Ausencia de respaldo:** definir una política de abstención. «No encontré información suficiente en las fuentes consultadas» no equivale a «la pregunta está fuera del tema». RAG ayuda a reducir alucinaciones, pero no las elimina automáticamente. Evaluar preguntas respondibles, preguntas sin respuesta en el corpus y distractores similares; revisar respuestas sin respaldo y abstenciones innecesarias.

Fuentes: [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents), [arquitectura MCP](https://modelcontextprotocol.io/docs/learn/architecture), [Contextual Retrieval](https://www.anthropic.com/engineering/contextual-retrieval), [formato USGS](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php). Consultadas el 8 de octubre de 2026.
