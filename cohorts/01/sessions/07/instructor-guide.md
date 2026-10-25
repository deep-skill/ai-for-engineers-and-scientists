# Clase 7: análisis de datos con IA

## Del dato al insight en minería

Borrador para revisión preparado el 24 de octubre de 2026 y documentado el 25. Seis láminas y 16 minutos propuestos. La presentación aporta teoría breve centrada en Digital Mine; la construcción del generador y el análisis práctico se realizan fuera de ella. Hay un generador de referencia y una primera corrida disponibles para la práctica. La preparación no confirma el dictado.

## Enfoque de la sesión

JP pidió continuar el desarrollo del proyecto, construir datos sintéticos de acarreo y usarlos después para practicar análisis. Las láminas explican los conceptos que necesita el grupo: disciplinas de datos, generación, tipos, exploración, herramientas con IA e interpretación. No transcriben las instrucciones de preparación ni fijan una demo paso a paso.

El docente puede intercalar esta explicación con la construcción del proyecto. Se mantienen el tema curricular y la secuencia de ocho sesiones. La práctica y el avance real del gemelo se registrarán por separado.

## Recorrido

| Lámina | Tiempo | Propósito |
|---|---|---|
| La pregunta y la decisión | 2 min | Conectar el gemelo digital con una pregunta concreta sobre acarreo. |
| Tres disciplinas de datos | 2 min | Comparar ingeniería, análisis y ciencia, con sus solapamientos. |
| Datos sintéticos del acarreo | 3 min | Distinguir generar de analizar y leer tipos en un registro de ciclo. |
| Explorar los datos | 3 min | Comparar tiempos por ruta y descomponer sus componentes. |
| Herramientas y trabajo con IA | 3 min | Situar agente, formatos, consultas, programación y visualización. |
| Verificar y comunicar | 3 min | Separar resultado, hipótesis y alcance, conservando evidencia. |

La explicación ampliada y sus fuentes están en las notas de cada lámina. El tiempo corresponde solo a la presentación dentro de la sesión de dos horas.

## Precisiones conceptuales

- Ingeniería diseña y opera sistemas de datos; análisis interpreta evidencia para decidir; ciencia formula y contrasta hipótesis y modelos. Las responsabilidades se solapan.
- Generar datos es una tarea, no una cuarta disciplina equivalente. Puede apoyarse en reglas, simulación o modelos. Los patrones de una simulación dependen de sus supuestos.
- Los datos medidos, sintéticos y derivados tienen orígenes distintos. Una media calculada sobre valores sintéticos sigue describiendo ese escenario.
- En una fila de ciclo aparecen categorías, números, fechas/horas e indicadores. Un identificador con dígitos puede seguir siendo una etiqueta. Una carga o duración puede admitir fracciones; un conteo es discreto.
- CSV y JSON son formatos. SQL y Python son lenguajes. pandas y Plotly son librerías. OpenCode coordina trabajo con herramientas según su configuración y permisos.
- Un faltante no equivale a cero y un atípico necesita investigación. Comparar condiciones, tamaños de grupo y variación antes de concluir. Una asociación no demuestra causalidad.
- La IA puede ayudar a construir el generador y el análisis, pero conservar código, reglas y resultados permite comprobar su trabajo. Reproducir un cálculo no valida el realismo del escenario.

## Ejemplo sintético de las láminas

El [archivo didáctico](data/haulage-example.json) contiene ocho ciclos inventados, cuatro por ruta. Incluye unidades, origen, granularidad y supuestos en su metadata. No es una medición, una muestra representativa ni una salida del simulador de Digital Mine. La ilustración acompaña la teoría y es independiente del generador disponible para la práctica.

Cada ciclo incluye espera inicial en carguío, carguío, acarreo cargado, descarga y retorno vacío. No modela otras colas, fallos ni restricciones de recursos compartidos. La carga fija de 80 t es un valor de ejemplo y no define la capacidad de la flota del proyecto.

| Ruta | Ciclos | Espera media (min) | Servicio medio (min) | Traslado medio (min) | Ciclo medio (min) | Rango del ciclo (min) |
|---|---|---|---|---|---|---|
| R-01 | 4 | 3 | 6 | 17 | 26 | 24–28 |
| R-02 | 4 | 8 | 6 | 22 | 36 | 32–40 |

Servicio suma carguío y descarga; traslado suma viaje cargado y retorno. Las medias usan un ciclo completo como unidad y ponderan todos por igual. Las barras parten de cero y comparten escala. Los tiempos se eligieron para mostrar diferencias en espera y traslado: esa diferencia ilustra los supuestos, sin descubrir un problema operativo real.

La página calcula los valores desde el archivo local. Un fallo de carga o un registro inválido muestra un error y no usa cifras inventadas como respaldo. La metadata y `references.json` conservan la procedencia y el hash. No se consulta otra fuente de datos ni se llama a un modelo desde las slides. Los datos USGS de otras clases permanecen intactos y esta sesión ya no los usa.

## Alcance del trabajo práctico

El [generador de referencia](../../../../demos/digital-mine/simulator/README.md) usa Python y SimPy para producir un turno sintético de ocho horas, con dos palas y seis camiones. La primera corrida, con semilla 42, contiene 90 ciclos y separa la simulación completa (`ground_truth/`) de los eventos recibidos y los ciclos reconstruidos. Incluye 24 minutos de indisponibilidad de T-03 y una caída de recepción de 30 minutos; no implementa el gemelo completo ni acepta las ADR pendientes.

El [plan de generación](../../../../demos/digital-mine/docs/10-plan-datos-sinteticos.md) documenta supuestos y alcance; el [diccionario](../../../../demos/digital-mine/docs/11-diccionario-datos.md) explica campos, unidades y calidad. El dataset de práctica expresa los tiempos de ciclos en **segundos**; el ejemplo de las slides usa **minutos**. Sus cifras y rutas no deben mezclarse como si fueran una misma corrida.

El docente selecciona el avance de construcción y las preguntas de análisis fuera de la presentación. Puede comparar datos recibidos con la referencia para estudiar faltantes, duplicados y ciclos parciales, sin imputar valores como si fueran observados. Reproducir la corrida comprueba consistencia y determinismo con estos supuestos; no demuestra realismo operativo.

Las soluciones de referencia del docente seguirán fuera de la carpeta que abra el alumno con su agente. Este ejemplo pequeño permanece junto a las láminas como ilustración identificada, no dentro de un starter.

## Registro de preparación · 25 de octubre de 2026

- Se centraron las seis láminas en Digital Mine y el acarreo; se sustituyó el ejemplo de sismos y se añadió la comparación entre ingeniería, análisis y ciencia de datos.
- Se conservaron diagramas editables, etiquetas breves y notas ampliadas para el docente. La práctica continúa fuera de las slides.
- Se integraron presentación, guía y documentación del dataset en el portal y en la navegación entre clases.
- La presentación se comprobó en navegador, en escritorio y pantalla pequeña, con navegación por teclado, índice, notas y revisión. Los cálculos del gráfico se contrastaron con el archivo local.
- El generador incluye pruebas de determinismo y disrupciones; el dataset conserva configuración, semilla, manifiesto, métricas de calidad y 13 comprobaciones de aceptación. La aplicación de Digital Mine sigue pendiente y el dictado de esta sesión no está confirmado.

## Uso y fuentes

Con Node 22+, ejecutar `npm run dev` y abrir `http://127.0.0.1:8765/cohorts/01/sessions/07/index.html`. También funciona con hosting estático. El ejemplo requiere acceso HTTP para leer su JSON. Flechas y Espacio navegan; O abre índice, P notas y R revisión. Los comentarios se guardan solo en el navegador. Desactivar En vivo al presentar una versión estable.

Referencias consultadas el 24 de octubre de 2026:

- [Ingeniería de datos](https://www.ibm.com/think/topics/data-engineering), [ciencia de datos](https://www.ibm.com/think/topics/data-science) y [datos sintéticos](https://www.ibm.com/think/topics/synthetic-data), IBM.
- [Análisis exploratorio](https://www.itl.nist.gov/div898/handbook/eda/section1/eda11.htm), [atípicos](https://www.itl.nist.gov/div898/handbook/eda/section3/eda35h.htm) y [asociación y causalidad](https://www.itl.nist.gov/div898/handbook/eda/section3/scatterp.htm), NIST/SEMATECH.
- [Lectura y escritura de datos](https://pandas.pydata.org/docs/getting_started/intro_tutorials/02_read_write.html) y [faltantes](https://pandas.pydata.org/docs/user_guide/missing_data.html), pandas.
- [SQL](https://duckdb.org/docs/2.0/sql/introduction.html), DuckDB; [visualización](https://plotly.com/python/), Plotly; [agente](https://opencode.ai/docs/), OpenCode.
- [Good enough practices in scientific computing](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1005510), Wilson y colaboradores, 2017.

Los logos oficiales se reutilizan de `assets/`; sus URLs y hashes constan en el registro de activos del repositorio y en `references.json`. El diagrama de herramientas es conceptual. El gráfico de las láminas usa JavaScript local, sin dependencias de pandas ni Plotly.
