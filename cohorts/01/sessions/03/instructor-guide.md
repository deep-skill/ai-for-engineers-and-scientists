# Clase 3: cultura de cómputo

Preparada el 10 de octubre de 2026. Tema del plan: **Cultura de cómputo: sistema operativo, archivos y terminal**. La propuesta original es de 120 minutos con ocho láminas y hasta 30 minutos de presentación, intercalados con demostración y práctica.

El docente confirmó el 11 de octubre que dictó la sesión con esta presentación y ejemplos del proyecto existente. Ese registro no confirma la duración exacta ni cada actividad de la propuesta. La guía se ajustó el 13 de octubre para retomar los ejemplos HTTP anteriores, sin requerir una demo adicional. El dictado de la sesión 2 sigue por confirmar en el plan.

## Propósito y ritmo

El grupo debe poder ubicar su proyecto, ejecutar el programa disponible y explicar dónde ocurre el trabajo de cliente y servidor. Retomar lo efectivamente cubierto en la sesión 2. Si faltó un tema, ajustar el repaso o registrarlo para otro bloque, conservando el objetivo de cultura de cómputo. Git mantiene su sesión dedicada en la clase 4. La tabla conserva el ritmo previsto, no los tiempos reales del dictado.

| Minutos | Actividad | Lámina y máximo de explicación |
|---|---|---|
| 0–5 | Repaso breve y apertura de OpenCode, terminal y proyecto. | 1, 1 min |
| 5–20 | Programa en disco, proceso, CPU, RAM y resultado persistido. Ejecutar un ejemplo real. | 2, 4 min |
| 20–35 | Explorador de archivos, carpeta actual, rutas, formatos y ubicación del CSV. | 3, 4 min |
| 35–55 | Terminal, shell, argumentos y revisión de una ejecución. | 4, 5 min |
| 55–70 | Runtime, versiones y dependencias. Comparar errores observables y hacer una pausa breve. | 5, 4 min |
| 70–90 | Navegador, servidor, datos y recorrido de una petición en los ejemplos existentes. | 6, 5 min |
| 90–105 | API, MCP y permisos dentro de la arquitectura. Ubicarlos en el proyecto. | 7, 4 min |
| 105–120 | Revisar resultados, conteos, instrucciones y recorrido de la petición. | 8, 3 min |

## Antes de abrir la clase

1. Abrir la presentación en modo estable, OpenCode y una terminal disponible. Comprobar el runtime y la versión que usa el programa existente.
2. Abrir únicamente el proyecto USGS del alumno, basado en el starter de la clase anterior. Ubicar su código y sus resultados. Las soluciones docentes quedan fuera del contexto del agente del alumno.
3. Tener el catálogo archivado y `sources.json` intactos. No consultar el catálogo actual como si fuera el mismo conjunto.
4. Tener el comando real de ejecución y un CSV o resultado disponible. Preparar ejemplos de carpeta actual, rutas, argumentos y dependencias usando esos archivos.
5. Retomar el ejemplo HTTP de la sesión anterior. Si el proyecto ya tiene una web, ubicar su dirección real y preparar Network. Si no la tiene, recorrer la petición existente en el código y explicar cliente, servidor y respuesta. No construir otra web para este bloque.

El servidor de la presentación, iniciado con `npm run dev` en el puerto 8765, sirve las láminas; no debe confundirse con el programa de sismos. Las direcciones de la lámina 6 son ilustrativas y no enlazan a otro servidor requerido.

## Notas de explicación

- La animación de proceso, el árbol de rutas y los mensajes de error de las láminas son ejemplos locales ilustrativos. No inspeccionan el equipo ni ejecutan comandos. Contrastar cada ejemplo con una acción real del docente.
- Carpeta, extensión y contenido cumplen funciones distintas. La extensión no convierte GeoJSON a CSV. La ruta relativa depende del directorio de trabajo.
- La terminal muestra entradas y salidas; el shell interpreta comandos. PATH ayuda a localizar ejecutables. Los nombres de comandos y runtimes dependen del sistema y la instalación.
- Un entorno virtual Python organiza dependencias por proyecto y no equivale a una máquina virtual. Documentar intérprete y versiones cuando se agregan bibliotecas.
- Frontend, backend y persistencia describen funciones. Pueden coexistir en el mismo equipo. `127.0.0.1` es local y no publica la aplicación. Los puertos permiten diferenciar servicios.
- API, MCP y credenciales se ubican en el recorrido. Autenticación identifica un acceso y autorización limita acciones. OAuth organiza autorización delegada. La lámina 7 ilustra contratos y permisos, sin conectar servidores MCP ni manejar claves.

Las notas con P desarrollan los conceptos y enlazan fuentes. R permite revisión por lámina con comentarios guardados en el navegador. Evitar convertir el bloque en memorización de comandos o una clase completa de protocolos.

## Evidencias para el cierre

El alumno puede mostrar su carpeta actual, las entradas preservadas, el comando que ejecuta el programa y sus resultados. Puede explicar el recorrido HTTP usando los ejemplos anteriores. Las instrucciones deben permitir repetir la ejecución. Comprobar especialmente que los conteos se calculan sobre el snapshot del 6 de octubre; si el resultado muestra solo una parte de los eventos, distinguir esa cantidad del total filtrado.

Fuentes consultadas el 10 de octubre de 2026: [procesos en Microsoft Learn](https://learn.microsoft.com/en-us/windows/win32/procthread/about-processes-and-threads), [archivos en MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Dealing_with_files), [PowerShell](https://learn.microsoft.com/en-us/powershell/scripting/learn/shell/using-aliases), [entornos Python](https://docs.python.org/3/tutorial/venv.html), [web en MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works), [HTTP en Node](https://nodejs.org/api/http.html), [OAuth 2.0](https://www.rfc-editor.org/rfc/rfc6749), [MCP](https://modelcontextprotocol.io/docs/learn/architecture), [USGS](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).
