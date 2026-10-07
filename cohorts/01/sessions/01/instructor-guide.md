# Sesión 1 — LLMs, agentes y herramientas

Duración base: 90 minutos. Extensión: hasta 120. Diapositivas principales: 16, 30 minutos en total. Tres apéndices opcionales. No hay diapositiva de recorrido del curso.

| Minutos | Actividad | Resultado |
|---|---|---|
| 0–5 | Portada, JP y DeepSkill mientras llegan | Curso, trayectoria, talento y trabajo de la empresa |
| 5–13 | LLM, Transformer, generación y contexto | Comprender el modelo y qué trabajo podemos delegar |
| 13–25 | OpenCode Desktop y Warp: diapositiva breve y app real | Abrir carpeta, identificar modelo y mostrar ejecución |
| 25–37 | Agentes, arnés y herramientas alternando láminas y entorno | Relacionar cada concepto con el proyecto abierto |
| 37–50 | Modelos, costes, acceso y brief NASA | Consultar Artificial Analysis y preparar la tarea |
| 50–80 | Construcción de la calculadora solar | Herramienta con datos reales de NASA |
| 80–90 | Comprobar, modificar y cerrar | Verificación manual y código reproducible |

Extensión: 90–110 práctica guiada; 110–120 dudas y problemas de participantes. Las láminas suman 30 minutos; se intercalan con 20 minutos de herramientas y ejemplos en vivo antes de construir. Si se alarga la presentación personal, acortar comparaciones de productos. Mantener una demo central.

## Preparación

1. Ejecutar `npm run dev` (Node 22+, sin dependencias). Probar presentación, flechas, controles y pantalla completa desde el servidor local. Usar R / Revisión para preparar los ajustes por diapositiva; cerrarlo al presentar.
2. Abrir SOLO demos/solar/starter en OpenCode Desktop.
3. Ensayar con el modelo gratuito realmente disponible. La reconstrucción por un agente dentro de OpenCode Desktop aún no se ha probado: verificar antes de clase.
4. Mantener la solución de referencia fuera de la carpeta del agente.
5. Probar Python y librerías en un entorno virtual nuevo.
6. Mantener los datos NASA archivados y su procedencia.
7. Abrir Warp, Artificial Analysis, documentación y calculadora de coste. Mostrar la biblioteca de Materiales y comprobar las descargas de la carpeta de práctica.

## Presentación propia

JP: consultor que lidera transformaciones de arquitectura y equipos de ingeniería en diferentes empresas; fundador de DeepSkill y coach ICPC. Enlaces a GitHub (manduinca), LinkedIn y DeepSkill. Contar un caso de transformación y un problema técnico resuelto. Deep Pit queda como antecedente breve si surge en la conversación. No afirmar título universitario ni inventar nombres de clientes de consultoría.

DeepSkill: empresa que construye software y opera con agentes. La diapositiva agrupa arquitectura, consultoría y desarrollo en una línea y destaca un cliente minero directo: **Minsur · DrillPlan Generator**, generación de mallas y collars de sondaje con visualización 3D. La fase 1 está entregada; las mejoras de fase 2 son una propuesta y no se presentan como ejecución. Se mantienen IA y automatización (Haul Sight, co-desarrollo con IMSS) y formación (Python para Ingenieros en Cerro Verde vía Tecsup; entrenamientos técnicos en UNI como actividad separada). Elegir uno o dos casos para sostener el mensaje comercial dentro de los cinco minutos de apertura. Los retratos son de mentores de la web oficial; no atribuirles proyectos que no ejecutaron.

## Recorrido de las diapositivas

1. Portada: nombre del curso, tema anunciado del LLM y subtítulo de agentes; datos NASA como anticipo.
2. JP: trabajo actual de consultoría y perfiles.
3. DeepSkill: servicios, proyectos ejecutados y talento; elegir un caso.
4. Qué es un LLM: entrenamiento, parámetros y recorrido por el Transformer; atención y otras capas.
5. Tokens, generación y contexto: generar fragmentos y comparar presupuestos ilustrativos de 128K, 256K y 1M.
6. Software y análisis con agentes: el mismo reporte, con responsabilidades que podemos delegar.
7. OpenCode: salir de la lámina y abrir la carpeta starter en Desktop. Ver modelo y proveedor.
8. Warp: mostrar la terminal real y relacionar terminal, shell y agentes.
9. Chat, workflow y agente: comparar quién ejecuta y quién decide; mencionar n8n y Python.
10. Agente y arnés: identificar el ciclo en OpenCode y las herramientas disponibles.
11. Configura tu agente: modelo, arnés y entorno como decisiones concretas del participante.
12. Herramientas: SO, aplicaciones y librerías; relacionarlas con el análisis NASA.
13. Modelos: elegir una métrica y abrir Artificial Analysis en vivo.
14. Coste: duplicar llamadas y quitar caché; tarifas ficticias.
15. Acceso: comparar API, suscripción, gratuito y local.
16. Solar: cambiar ciudad y potencia; empezar la construcción con el agente.

Los apéndices ofrecen alternativas, comprobación manual y enlaces. No es necesario presentarlos completos. El panel R / Revisión muestra la intención y los puntos de discusión de cada diapositiva; sus comentarios permanecen en el navegador.

## Cómo explicar el LLM

Una red neuronal aprende parámetros durante el entrenamiento; en una llamada normal los usa para procesar el contexto y producir una continuación. El diagrama introduce una arquitectura generativa basada en Transformer: tokens, representaciones, atención y transformaciones neuronales. Atención relaciona elementos del contexto; no es una búsqueda en internet. La continuación se genera token a token. Fragmentos y candidatos en la lámina son ilustrativos.

La ventana de contexto limita lo que el modelo puede procesar en la llamada. No equivale a todos los archivos del proyecto ni a una memoria ilimitada. El arnés selecciona instrucciones, historial, archivos y resultados de herramientas. Los tamaños 128K, 256K y 1M son ejemplos de presupuesto, no especificaciones de un producto. Comprobar también el límite de salida del modelo elegido. En la ilustración se reservan 8K para salida: con 72K de archivos, 2K de instrucciones, 18K de historial y 24K de resultados, el total planeado es 124K. Cabe en 128K con 4K libres. Subir archivos permite explicar selección y resumen; una ventana mayor no sustituye dar contexto pertinente.

El cambio en software y análisis se muestra con una tarea: construir un reporte. La asistencia propone código que una persona lleva a ejecución; un agente conectado puede leer, editar, ejecutar, observar y corregir. Seguimos dando objetivos y criterios, y comprobando resultados. Estas formas coexisten y un chat también puede ofrecer un agente.

## Editar el curso en vivo — 3 minutos dentro del bloque de herramientas

Abrir la presentación en su propia ventana. Activar L / En vivo y mantener visible una diapositiva. Pedir al agente un cambio concreto de contenido o estilo, revisar el cambio en el repo y observar la actualización conservando la diapositiva. Mostrar que el agente puede editar archivos y controlar el navegador: eso lo aporta el arnés con sus herramientas. Desactivar En vivo al terminar de editar para presentar una versión estable. El botón no ejecuta un modelo ni consume créditos; solo actualiza la página. Los comentarios de revisión permanecen guardados y los controles de los ejemplos vuelven a su estado inicial al recargar.

Usar un cambio real que mejore la clase, por ejemplo agregar una aclaración a la definición de herramienta. Para comparar comportamientos, cambiar una variable de la calculadora solar en el navegador y comprobar un número con Python.

## Secuencia de la demo

1. Mostrar problema y fuente NASA.
2. Pedir inspección de esquema, cobertura, unidades y plan.
3. Revisar el plan; pedir ejecución en entorno virtual.
4. Mostrar lectura, instalación, creación de código, ejecución y corrección.
5. Abrir la herramienta y cambiar ciudad, potencia, demanda y performance ratio.
6. Verificar un día y un promedio mensual.
7. Pedir comparación simultánea o exportación CSV.
8. Mostrar que el programa terminado calcula sin nuevas llamadas al LLM.

Los prompts completos están en el brief. No pegar el código de referencia en el prompt.

## Cálculo

NASA reporta irradiación horizontal en kWh/m²/día. Dividir por 1 kW/m² da horas solares equivalentes. Multiplicar por potencia nominal en kWp y performance ratio estima energía. El ratio de 0.80 es un supuesto editable.

El mes de menor recurso se elige por irradiación media diaria mensual. La producción anual suma 365 días. No se modelan inclinación, sombras, baterías, inversores ni disponibilidad horaria.

## Costes

La calculadora usa tarifas ficticias: USD 1 por millón de tokens de entrada, USD 0.20 por millón leído de caché y USD 5 por millón de salida. Diez llamadas de 12.000 tokens de entrada y 1.200 de salida, con 50% de entrada cacheada y cero coste de herramientas, dan USD 0.132. No es el precio de un modelo.

Variar llamadas y contexto. Separar precio por token de coste por tarea y de revisión humana. Las suscripciones tienen cuotas; la API se factura aparte salvo condiciones explícitas.

## Warp y materiales de consulta

Precios Warp verificados el 6 de octubre de 2026: Free USD 0; Build USD 20/mes con USD 20 de consumo de agentes incluido; Max USD 200/mes con USD 200 de consumo incluido. Build anual equivale a USD 18/mes y Max anual a USD 180/mes, con pago anual. El consumo adicional se cobra aparte. Para la clase no es necesario contratar Build: Warp puede usarse como terminal con OpenCode. Fuente: https://www.warp.dev/pricing.

Materiales ofrece ZIPs de NASA y USGS con brief, datos y procedencia, sin código de referencia. Los briefs, la guía y el registro de fuentes tienen un lector HTML. Ruta sugerida: Building effective agents (patrones), Best practices for Claude Code (forma de trabajar) y AI Agents Course de Hugging Face (ejercicios). La biblioteca permite buscar y filtrar documentación, modelos y librerías.

## Alternativa de sismos

USGS: mapa, profundidad, magnitud y distancias a Lima. Hay datos y brief, aún sin solución terminada. No presentar conteos como peligro ni predicción sísmica.
