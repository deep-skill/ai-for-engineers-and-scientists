# Clase 2: un flujo agéntico con los sismos USGS

Retomamos los datos de la primera clase. Trabaja en OpenCode Desktop con la carpeta `demos/earthquakes/starter/` del repositorio o con el ZIP USGS del portal. Abre solo esa carpeta como proyecto. Esta práctica acota el brief general: primero una tabla y un CSV; el mapa es una extensión si queda tiempo.

## La tarea de hoy

Encuentra los cinco eventos del catálogo archivado más próximos a Lima, usando el punto de referencia de latitud **-12.0464** y longitud **-77.0428**. Entrega una tabla y un CSV con ID del evento, fecha UTC, magnitud, longitud, latitud, profundidad en km y distancia superficial en km.

Conserva `data/usgs-m45-month.geojson` y `data/sources.json`. Son una captura real de USGS, recuperada el 6 de octubre de 2026 a las 23:24 UTC, con 517 eventos del feed mensual M4.5+. «Último mes» se refiere al período del feed en esa captura, no al día en que abras el archivo.

## 1. Inspeccionar y acordar el plan

Pega este pedido en OpenCode:

> Lee BRIEF.md, data/sources.json y la estructura de data/usgs-m45-month.geojson. Para esta clase acotaremos la tarea a los cinco eventos del catálogo más próximos a Lima (-12.0464, -77.0428), una tabla y un CSV. Identifica campos, unidades, nulos y orden de coordenadas. Propón el cálculo de distancia superficial Haversine con radio de 6371 km y un plan de verificación. Conserva los originales. Espera mi revisión del plan antes de construir.

Revisa lo que leyó y qué propone. En GeoJSON el orden es **longitud, latitud, profundidad**. La fecha usa milisegundos Unix y la profundidad usa km. Consulta la [documentación oficial del formato USGS](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).

## 2. Construir y observar las herramientas

Cuando estés conforme con el plan:

> Implementa el plan, ejecútalo sobre la captura archivada y guarda cinco_sismos.csv. Incluye encabezados claros con las unidades. Documenta el método, la fecha de captura y cómo ejecutar el programa. Muéstrame qué herramientas utilizaste y qué archivos generaste.

Observa una lectura de archivos y una ejecución real. Identifica qué decisión tomó el modelo y qué resultado devolvió cada herramienta. Si aparece un error, pide que explique la evidencia del fallo y corrija el programa antes de continuar.

## 3. Abrir el CSV en Excel o Numbers

Abre el archivo tú mismo. Comprueba que se importen columnas separadas, cinco filas de eventos y valores numéricos reconocidos. Si tu configuración regional usa otro delimitador, pide una exportación alternativa documentada, sin cambiar los datos originales.

> Verifica el CSV contra la tabla. Recalcula por separado la distancia del primer evento y explica cualquier diferencia. Comprueba el orden ascendente de las distancias, las unidades, la fecha UTC y que los IDs correspondan a los datos de entrada.

La distancia superficial ordena epicentros: no incorpora profundidad ni estima peligro sísmico. El catálogo tiene un umbral y una cobertura de monitoreo; no representa todos los sismos de Perú.

## 4. Obtener una captura nueva mediante la API

Con el resultado anterior cerrado, el docente muestra cómo una herramienta HTTP consulta el feed público de USGS:

[Feed mensual M4.5+ en GeoJSON](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson)

> Descarga una nueva respuesta del feed mensual M4.5+ de USGS. Guárdala en un archivo distinto, junto con la URL, fecha y hora UTC de recuperación, estado HTTP, unidades y número de eventos. Conserva íntegra la respuesta original. Compara sus IDs con la captura archivada y describe qué cambió. No sobrescribas los datos anteriores ni atribuyas las diferencias únicamente a eventos nuevos: puede haber revisiones y eventos que salieron de la ventana mensual.

La consulta pública de este ejemplo no necesita API key. Una clave es una credencial que otros servicios pueden exigir. Si no hay conexión, continuamos con la captura archivada y conservamos el trabajo verificable.

Como demostración breve de una API con clave, NASA NeoWs acepta la clave pública `DEMO_KEY`. Sirve para explicar dónde viaja una credencial sin pedir registros al grupo. Tiene límites de uso reducidos, indicados en la [documentación de autenticación NASA](https://api.nasa.gov/assets/html/authentication.html). Es otro conjunto de datos, de asteroides; no sustituye el catálogo de sismos de esta práctica. NASA POWER, usado en el ejemplo solar, es un servicio distinto.

## Demo MCP del docente

El docente conecta DeepWiki, revisa las herramientas que ofrece y solicita una consulta sobre un repositorio público comprobado antes de la clase. Por ejemplo:

> Usa DeepWiki para consultar Leaflet/Leaflet. ¿Cómo puedo representar un GeoJSON de puntos y mostrar magnitud y profundidad al seleccionar un evento? Indica dónde encontraste la información.

El endpoint es `https://mcp.deepwiki.com/mcp`. La [documentación oficial de DeepWiki](https://docs.devin.ai/work-with-devin/deepwiki-mcp) indica que es gratuito y no exige autenticación. Ofrece `read_wiki_structure`, `read_wiki_contents` y `ask_question`. El docente comprueba previamente la disponibilidad del repositorio elegido.

Como alternativa, Microsoft Learn usa `https://learn.microsoft.com/api/mcp`, también público y sin autenticación según su [documentación](https://learn.microsoft.com/en-us/training/support/mcp). Podemos pedir documentación oficial para importar un CSV con Power Query.

Para contrastar autorización, el [servidor de referencia oficial Everything](https://github.com/modelcontextprotocol/inspector/blob/main/docs/mcp-server-configuration.md) usa OAuth con una identidad de prueba. Su endpoint es `https://example-server.modelcontextprotocol.io/mcp`. No necesita cuenta ni API key propia; la autorización se muestra con una pantalla de consentimiento. Sirve datos ficticios y no es una fuente de sismos.

Estas direcciones requieren un cliente MCP; abrirlas directamente en un navegador no prueba la conexión. La demostración muestra descubrimiento, argumentos y resultado de la herramienta. La presentación solo contiene los diagramas y las referencias.

La integración de navegador, si se añade con Playwright MCP, es una extensión docente que debe prepararse antes de la clase. Generar el CSV no requiere automatizar Excel o Numbers.

## Cierre de la práctica

Antes del minuto 90, conserva el programa, el CSV y una explicación comprobable de los cálculos y fuentes. El bloque final de RAG será conceptual, sin implementación.
