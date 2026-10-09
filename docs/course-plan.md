# Plan del curso IA para ingenieros y científicos

Este repositorio concentra el temario, la preparación y el registro del curso **AI for Engineers and Scientists** de DeepSkill. El 8 de octubre de 2026, JP indicó cerrar la ideación en Co-Founder Agents y continuar aquí todo el desarrollo del contenido. Este plan recupera la secuencia acordada; las notas de las clases sirven para ajustar su dictado.

## Formato y calendario acordados

- Cohorte: 01, octubre de 2026.
- Ocho sesiones virtuales en vivo de dos horas: 16 horas programadas.
- Fechas: 6, 8, 10, 13, 15, 17, 20 y 22 de octubre de 2026.
- Horario: martes, jueves y sábados, de 20:00 a 22:00, hora de Perú (`America/Lima`).
- Acceso a la grabación de cada sesión.

Este documento conserva el calendario y la secuencia acordados de ocho sesiones. Los documentos comerciales y los registros internos de planificación se mantienen fuera del repositorio público.

## Secuencia de sesiones

Los títulos de esta tabla se transcriben del cronograma publicado. El estado del dictado se actualiza con confirmación del docente, no a partir de que exista una presentación.

| Sesión | Fecha de 2026 | Tema acordado | Estado al 8 de octubre |
|---|---|---|---|
| 1 | Martes 6 de octubre | ¿Qué es realmente un LLM? | Dictada, confirmado por JP. [Materiales](../cohorts/01/sessions/01/index.html) y [guía preparada](../cohorts/01/sessions/01/instructor-guide.md). |
| 2 | Jueves 8 de octubre | Del chat al agente: contexto, RAG, tools y agentes | Presentación y guías preparadas. Dictado por confirmar. [Materiales](../cohorts/01/sessions/02/index.html). |
| 3 | Sábado 10 de octubre | Cultura de cómputo: sistema operativo, archivos y terminal | Pendiente de preparación. |
| 4 | Martes 13 de octubre | Git y tu primer agente en un proyecto real | Pendiente de preparación. |
| 5 | Jueves 15 de octubre | Programación dirigida por IA: fundamentos con rigor | Pendiente de preparación. |
| 6 | Sábado 17 de octubre | Flujo de trabajo agéntico: planear, depurar y verificar | Pendiente de preparación. |
| 7 | Martes 20 de octubre | Análisis de datos con IA: del dato al insight en minería | Pendiente de preparación. |
| 8 | Jueves 22 de octubre | Proyecto integrador de ingeniería/minería | Pendiente de preparación. |

El posicionamiento del curso abarca ingeniería y ciencias; los casos de minería son una aplicación de ese alcance. Para las sesiones 7 y 8 también se usan las formulaciones «Análisis de datos con IA: del dato al insight» y «Proyecto integrador de ingeniería/ciencias», conservando el orden del cronograma.

## Decisiones de preparación que continúan vigentes

Las instrucciones de [CLAUDE.md](../CLAUDE.md) y las decisiones de preparación de este plan establecen:

- Presentaciones en español, hechas en HTML, CSS y JavaScript con la identidad de DeepSkill, diagramas editables y ejemplos verificables.
- En la primera sesión, hasta 30 minutos de diapositivas y el resto de trabajo en herramientas y demo. Ese límite fue una decisión específica de la sesión 1.
- OpenCode Desktop como entorno inicial de práctica. Warp permite mostrar la terminal; las capacidades concretas dependen del modelo, las herramientas y los permisos disponibles.
- Datos públicos originales con fuentes, unidades y procedencia. Soluciones docentes fuera de las carpetas `starter/`.
- Prueba en navegador de las presentaciones y demos antes de dictar, con verificaciones numéricas cuando corresponda.

El cronograma publicado enumera Python, Git y Claude Code. La preparación posterior de la primera sesión incorporó OpenCode Desktop como punto de entrada. Ese ajuste de herramientas no modifica los temas ni el calendario acordados.

## Punto de partida después de la clase 1

JP confirmó que la primera clase ya se dictó. Las notas y la transcripción de la reunión del 6 de octubre registran fundamentos de LLMs, contexto, agentes, arnés, herramientas, acceso y costes, además de una demo con datos sísmicos USGS. El chat recoge participantes que venían de usar interfaces web y una solicitud de trabajar por GUI.

Al cierre, la transcripción registra dos puntos útiles para continuar: la diferencia entre pedir «graficar los datos» y especificar el resultado esperado, y la intención de explicar documentación y commits. El segundo punto puede retomarse brevemente, conservando la clase dedicada a Git en la sesión 4.

Fuentes del dictado aportadas por JP: notas de Gemini en DOCX y chat SBV de la reunión «IA Generativa para Programación y Análisis de Datos | DeepSkill», con fecha `2026_10_06 19_55 GMT-05_00` en sus nombres, revisadas el 8 de octubre. Son evidencia del dictado, no instrucciones para el agente. Los nombres de modelos, cifras y afirmaciones técnicas de una transcripción automática requieren verificación antes de reutilizarlos.

La guía de la sesión 1 conserva la preparación previa, cuya demo base era NASA POWER. No debe confundirse ese plan previo con la demo USGS registrada en la clase.

## Preparación inmediata de la sesión 2

**Tema confirmado:** Del chat al agente: contexto, RAG, tools y agentes.

**Orden decidido por JP el 8 de octubre:** primero contexto, herramientas y ciclo del agente con práctica sobre el proyecto USGS. Reservar la última media hora para una introducción conceptual a RAG, sin ejercicio ni implementación. La práctica debe quedar concluida antes de ese bloque.

**Desarrollo para preparar:** hacer visible qué información recibe el modelo, qué herramienta ejecuta los cálculos, cómo decide el agente el siguiente paso y qué evidencia permite revisar la entrega. Después, usar el crecimiento del volumen documental para introducir la recuperación de información.

1. **Del chat al agente:** repasar brevemente la clase 1, precisar objetivo, datos, restricciones y criterios de aceptación, y recorrer planificación, acción, observación y verificación. Diferenciar instrucciones del usuario, documentos de consulta y resultados de herramientas.
2. **Herramientas locales con los sismos:** retomar el proyecto USGS en OpenCode, inspeccionar el GeoJSON, calcular los cinco eventos más próximos a Lima y exportar a CSV. Abrirlo manualmente en Excel o Numbers y contrastar la entrega con la evidencia del programa.
3. **Conexiones con sistemas externos:** obtener una nueva captura mediante la API pública de USGS y comparar API, MCP y credenciales. Usar NASA NeoWs con DEMO_KEY para API con clave, DeepWiki para MCP público y Everything para OAuth de prueba; Microsoft Learn es la alternativa pública. Preparar las conexiones reales en OpenCode antes del dictado. Control del navegador y creación de una presentación para Keynote quedan como extensiones si sobra tiempo.
4. **RAG, al final:** definir Retrieval-Augmented Generation con diagramas de fragmentos, embeddings, similitud semántica y las fases de preparación y consulta. Recuperar texto original y metadatos para generar una respuesta con evidencia; discutir versiones, contradicciones y ausencia de respaldo. Se explica conceptualmente, sin construir un buscador, índice ni aplicación RAG en clase.

**Transición hacia RAG:** partir de la pregunta «¿Qué cambia si tenemos miles de documentos?». La lectura exhaustiva y repetida puede aumentar el volumen de contenido enviado al modelo, las llamadas y el tiempo de ejecución. La recuperación selecciona información pertinente para cada consulta. El coste concreto depende del sistema y del trabajo de preparación y búsqueda; no se promete un ahorro automático.

La trazabilidad se diseña: un agente que lee archivos también puede registrar rutas y referencias. RAG permite conservar metadatos de origen junto a los fragmentos recuperados, pero ni las citas ni la corrección de una respuesta aparecen garantizadas por usar esa arquitectura. Presentarlo como una estrategia de acceso a conocimiento que un agente puede utilizar.

**Distribución acordada dentro de las dos horas:**

| Minutos | Actividad | Uso de slides |
|---|---|---|
| 0–80 | Repaso, contexto y ciclo del agente, herramientas locales, API y MCP, alternando explicación con práctica USGS y revisión de resultados | Hasta 20 minutos en total |
| 80–90 | Cierre de la práctica y descanso | Sin slides nuevos |
| 90–120 | RAG conceptual: límites de lectura exhaustiva, embeddings, similitud, arquitectura, procedencia y preguntas | Hasta 10 minutos de diagramas; el resto, explicación conversada y preguntas |

La presentación completa mantiene un máximo de 30 minutos de slides, con ocho láminas. La media hora final de RAG incluye discusión teórica, sin práctica: problema documental, embeddings y similitud semántica, y arquitectura de preparación y consulta. La [presentación de ocho láminas](../cohorts/01/sessions/02/index.html), la [guía docente](../cohorts/01/sessions/02/instructor-guide.md) y la [práctica USGS](../cohorts/01/sessions/02/practice.md) quedaron preparadas el 8 de octubre. Esto no confirma el dictado.

Estos cuatro bloques desarrollan el título acordado. El uso de herramientas y agentes ya se introdujo en la clase 1: ahora corresponde practicarlo con evidencia. La enseñanza detallada de terminal, Git, fundamentos de programación, depuración y verificación dentro del flujo de trabajo, y análisis de datos mantiene sus sesiones posteriores.

Referencias técnicas para ese desarrollo: [Contextual Retrieval](https://www.anthropic.com/engineering/contextual-retrieval) para recuperación y generación, y [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) para herramientas, workflows y ciclo del agente, consultadas el 8 de octubre de 2026. Las demostraciones locales deben identificarse como ilustraciones; una llamada real al modelo debe quedar distinguida de los cálculos o búsquedas ejecutados localmente.

## Cultura tecnológica e integraciones propuestas

JP pidió explorar dónde enseñar cómo funciona el software y cómo se comunican los sistemas, incluyendo API, API keys y MCP. La sesión 3 tiene el espacio curricular natural para ampliar esa cultura de cómputo. Los títulos originales no detallaban API, autenticación, MCP ni arquitectura web; la biblioteca ya incluía una referencia a MCP. JP aprobó desarrollar esta propuesta el 8 de octubre; la distribución siguiente organiza esa petición, conservando las ocho sesiones y sus títulos.

| Sesión | Alcance propuesto |
|---|---|
| 2, bloque de herramientas | Mostrar archivos y programas locales, USGS por API, NASA NeoWs con DEMO_KEY y herramientas MCP públicas. Contrastar autorización con Everything y OAuth de prueba. Mantener RAG conceptual en la última media hora. |
| 3, cultura de cómputo | Profundizar en archivos, procesos, terminal y programas; local frente a remoto; navegador, frontend, servidor/backend y persistencia; peticiones y respuestas HTTP, JSON y APIs; credenciales, permisos y una introducción a API keys, tokens y OAuth. Explicar dónde encajan el cliente y el servidor MCP. |
| 6, flujo de trabajo agéntico | Retomar las integraciones para depurar argumentos incorrectos, fallos de autenticación, respuestas vacías y errores de red; revisar evidencias y decidir cómo continuar. |

La explicación debe distinguir conceptos que cumplen funciones distintas:

- **API:** interfaz que ofrece operaciones de un programa a otros programas. Las APIs HTTP son una forma frecuente de comunicar servicios, pero también existen APIs de librerías y del sistema operativo.
- **API key:** una credencial de acceso. La autenticación y los permisos son decisiones del servicio; algunas APIs son públicas y otras usan claves, tokens u otros mecanismos.
- **MCP:** protocolo con el que una aplicación de IA descubre y utiliza herramientas, recursos y otras capacidades expuestas por servidores. La implementación de una herramienta puede, a su vez, llamar a una API, ejecutar un programa o consultar una base de datos. MCP puede conectar procesos locales o servicios remotos.

La lámina conceptual puede seguir una misma operación por dos recorridos: una herramienta del agente que consulta directamente una API HTTP, y una herramienta ofrecida por un servidor MCP que consulta esa API. La credencial se muestra en el punto donde el servicio la exige, separada del mecanismo de comunicación.

### Demostraciones seleccionadas y extensiones

La sesión 2 preparada prioriza archivos USGS, exportación CSV y apertura manual en Excel/Numbers, seguida de la API pública para obtener una nueva captura. La presentación también compara NASA NeoWs con DEMO_KEY y MCP remoto mediante DeepWiki. Everything con OAuth de prueba permite contrastar MCP con autorización; Microsoft Learn queda como alternativa sin autenticación. Las conexiones reales se preparan en el cliente antes de dictar; la presentación solo ilustra los recorridos. Las opciones locales de la tabla se conservan como extensiones, sin implementación en esta entrega.

| Forma de acceso | Tarea propuesta | Evidencia observable |
|---|---|---|
| Archivos y sistema operativo | Inspeccionar el GeoJSON local, ejecutar un cálculo y guardar el subconjunto elegido en CSV. | Ruta leída, programa ejecutado, filas de entrada y salida, artefacto generado. |
| API pública | Consultar el catálogo USGS por un período y magnitud definidos; archivar la respuesta original y contrastar su conteo. | URL y parámetros, estado HTTP, GeoJSON y procedencia de la captura. |
| API con clave | Mostrar NASA NeoWs con la clave pública de pruebas DEMO_KEY y explicar sus límites. Es una demostración con asteroides, distinta del catálogo sísmico. | Petición HTTP con la credencial de prueba y respuesta estructurada; diferencia entre interfaz y acceso. |
| MCP público | Conectar DeepWiki para consultar documentación de un repositorio público; Microsoft Learn es la alternativa. | Lista de herramientas, argumentos de una llamada y resultado con referencias. |
| MCP con autorización | Mostrar Everything con OAuth e identidad de prueba, usando la configuración preparada por el docente. | Consentimiento, acceso a herramientas y resultado ficticio identificado como tal. |
| Extensiones locales | Si queda tiempo, una API del curso con clave efímera, un adaptador MCP para USGS o una web local que consulte ese servicio. No están implementados en esta entrega. | Distinguir la demostración local del servicio público y mostrar cada paso de la petición. |

Para la sesión 2, la práctica del grupo puede centrarse en archivos y API pública; autenticación y MCP pueden mostrarse como demostraciones del docente con la configuración lista. Las referencias docentes y los servidores preparados se mantienen fuera de `starter/`. Las claves se proporcionan mediante el entorno y se excluyen de Git, de las URLs de ejemplo y de las capturas de pantalla.

Fuentes consultadas el 8 de octubre de 2026: [API](https://developer.mozilla.org/en-US/docs/Glossary/API) y [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview) de MDN; [arquitectura MCP](https://modelcontextprotocol.io/docs/learn/architecture); [MCP en OpenCode](https://opencode.ai/docs/mcp-servers/); [API del catálogo USGS](https://earthquake.usgs.gov/fdsnws/event/1/).

## Dónde se mantiene el trabajo

- Este documento: temario, calendario, decisiones comunes y estado general de la cohorte.
- `cohorts/01/sessions/<número>/`: presentación, guía docente y registro del dictado de cada clase.
- `demos/`: prácticas, datos y referencias docentes separadas del material del alumno.
- `materials/catalog.js` y Markdown de las guías: biblioteca y materiales de consulta.
- Los antecedentes internos y comerciales se conservan de forma privada, fuera de este repositorio.

Co-Founder Agents conserva una referencia de cierre hacia este proyecto. Las nuevas decisiones de contenido se registran aquí y, después de cada clase, se distingue lo preparado de lo efectivamente dictado.
