# Clase 3: archivos, terminal y el proyecto existente

Usa el mismo proyecto de sismos en OpenCode. Abre únicamente tu carpeta `earthquakes-starter` o `demos/earthquakes/starter/`. Retoma el programa y los resultados de las sesiones anteriores. Las soluciones docentes quedan fuera de esa carpeta. Esta guía reutiliza los ejemplos disponibles; no requiere construir otro programa ni una web nueva.

## Resultado esperado

Al terminar puedes identificar dónde están los datos, ejecutar el programa disponible desde una terminal y explicar el recorrido de una petición HTTP ya utilizada. Conserva las entradas originales y comprueba los resultados y las instrucciones de ejecución.

El catálogo original es `data/usgs-m45-month.geojson`, con procedencia en `data/sources.json`: 517 eventos, recuperados el 6 de octubre de 2026 a las 23:24 UTC. No es el catálogo actualizado de hoy. Las coordenadas son longitud, latitud y profundidad en km; el tiempo original usa milisegundos Unix UTC.

## 1. Ubicar el proyecto

> Inspecciona este proyecto de sismos sin modificar los datos originales. Identifica la carpeta actual, las rutas de entrada y salida, los programas existentes, su runtime y dependencias. Explica cómo ejecutar el análisis disponible, qué argumentos admite y dónde guarda sus resultados. Propón cómo comprobar el CSV y los conteos contra el catálogo archivado. Si falta algún archivo, indícalo. Retoma los ejemplos existentes; no construyas otro programa ni una web nueva.

Comprueba la carpeta en el explorador de archivos y en la terminal. La ubicación real depende de dónde descomprimiste el proyecto. Una ruta con espacios necesita comillas cuando la usas como argumento.

| Acción | macOS / Linux | Windows con PowerShell |
|---|---|---|
| Ver carpeta actual | `pwd` | `Get-Location` |
| Listar archivos | `ls` | `Get-ChildItem` |
| Entrar a datos | `cd data` | `Set-Location data` |
| Volver al proyecto | `cd ..` | `Set-Location ..` |

Cambiar de carpeta puede hacer que una ruta relativa deje de coincidir. Compara `data/usgs-m45-month.geojson` desde el proyecto con `usgs-m45-month.geojson` desde `data/`. Renombrar una extensión no convierte el contenido a otro formato.

## 2. Ejecutar y revisar

Identifica con el agente el runtime del programa existente. Comprueba su versión y las dependencias del proyecto. Si el programa usa Python, el comando puede ser `python3`, `python` o `py` según la instalación. Usa el comando que realmente hayas comprobado.

> Revisa el análisis y el CSV existentes. Explica el comando exacto, la carpeta desde la que se ejecuta, los argumentos y las dependencias necesarias. Comprueba filas, IDs, fecha UTC, unidades y conteos contra el catálogo. Para comparar con la presentación, revisa los umbrales de magnitud mayor o igual a 4.5, 5 y 6, excluyendo magnitudes nulas. Señala cualquier diferencia de criterio o archivo faltante.

Ejecuta tú el comando documentado en una terminal. Identifica comando, script y argumentos. Ubica el resultado y ábrelo. El éxito que declara el proceso debe contrastarse con el archivo y los cálculos. Si el programa no está disponible, identifica qué falta antes de intentar ejecutarlo.

Si aparecen errores, primero recoge la salida, la carpeta actual y el comando. Una ruta incorrecta y una dependencia ausente requieren comprobaciones diferentes. Si usas dependencias externas en Python, conserva un entorno virtual del proyecto y sus versiones documentadas.

## 3. Retomar el ejemplo HTTP

> Localiza la petición HTTP que ya usamos. Explica qué componente la envía, qué servidor responde, qué ruta y parámetros utiliza y qué datos devuelve. Distingue los archivos archivados de una consulta nueva a USGS. Si hay una web en este proyecto, ubica qué hace el navegador y qué hace el servidor. No construyas otro servicio.

Revisa la URL, los parámetros, el estado y la respuesta en el ejemplo existente. Si ya hay una web funcionando, observa la petición en Network. Si la consulta se hizo desde un script o herramienta, sigue ese recorrido y explica qué cambia respecto de un navegador. No hace falta montar una nueva aplicación para identificar cliente, servidor y datos.

Ubica dónde ocurre cada ejecución: en tu equipo o en un servidor remoto. `127.0.0.1` apunta al equipo de quien abre el enlace y no publica una aplicación en Internet. Tener guardado el código tampoco mantiene activo un proceso.

## Entrega y verificación

- Entradas originales y su procedencia conservadas.
- Programa y resultados existentes identificados, con unidades, fecha UTC y criterio de filtrado.
- Instrucciones que otra persona pueda ejecutar desde una carpeta identificada.
- Una petición anterior revisada con su URL, parámetros y respuesta disponible.
- Explicación de qué hizo el cliente, qué hizo el servidor y dónde están los datos.

Los conteos M ≥ 4.5, M ≥ 5 y M ≥ 6 son acumulados: no deben sumarse. Este ejercicio no estima peligro sísmico. La siguiente clase tiene el espacio dedicado a Git.

Fuentes: [archivos y rutas en MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Dealing_with_files), [funcionamiento de la web en MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works), [entornos Python](https://docs.python.org/3/tutorial/venv.html), [formato USGS](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php). Consultadas el 10 de octubre de 2026.
