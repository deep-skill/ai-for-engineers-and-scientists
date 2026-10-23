# Clase 6: flujo de trabajo agéntico

## Planear, ejecutar, depurar y verificar

Borrador preparado el 22 de octubre de 2026 para revisión del docente. Cinco láminas y 12 minutos de explicación dentro de la sesión programada de 120 minutos. La práctica se realiza fuera de la presentación. La preparación de estos materiales no confirma el dictado de la sesión 6.

## Punto de partida confirmado

JP confirmó el 22 de octubre que la sesión anterior avanzó principalmente en requisitos y especificaciones. Las ocho láminas de la clase 5 cubren un alcance preparado más amplio; no se registra que todos esos temas se hayan dictado.

Hoy se continúa el proyecto desde sus especificaciones, avanzando tanto como permita la práctica. Digital Mine es el proyecto de minería acordado para las siguientes clases; en este repositorio contiene alcance, arquitectura propuesta y backlog, con implementación pendiente. Revisar el estado real del proyecto antes de seleccionar el incremento. El stack y el alcance siguen sujetos a revisión.

## Idea central

El ciclo de vida organiza las etapas y los resultados de ingeniería. El ciclo **planear → ejecutar → verificar** guía cada avance dentro de esas etapas. La depuración se activa ante un fallo y produce una corrección que vuelve a ejecutarse y verificarse. La evidencia puede requerir ajustar el plan.

El proceso es agnóstico de agente, modelo y lenguaje. OpenCode es el entorno de trabajo del docente. Los modos de una herramienta ayudan a organizar acciones; no sustituyen criterios de aceptación, diseño, comprobación o revisión humana.

## Las cinco láminas

| Lámina | Tiempo | Propósito |
|---|---|---|
| Flujo de trabajo agéntico | 2 min | Relacionar el ciclo de vida de la clase 5 con la táctica de cada avance. |
| Antecedentes del trabajo iterativo | 2 min | Situar mejora continua, desarrollo ágil y acción/observación en agentes. |
| Una iteración de trabajo | 3 min | Planear un cambio acotado, ejecutarlo y contrastarlo con un criterio. |
| Depuración con evidencia | 3 min | Reproducir, formular y contrastar una hipótesis, corregir y volver a verificar. |
| Criterio de cierre | 2 min | Relacionar requisito, cambio, comprobación y evidencia reproducible. |

La explicación se puede intercalar: abrir con el mapa y los antecedentes; regresar a la iteración durante el trabajo, a depuración cuando haya un fallo y al cierre tras cada incremento. Los 12 minutos corresponden a las láminas, no a toda la clase.

## Recorrido de la práctica

1. Revisar las especificaciones, las decisiones pendientes y el estado real de los archivos. Elegir un incremento que pueda observarse y comprobarse durante la sesión.
2. Definir objetivo, límites, decisiones de diseño relevantes y evidencia esperada. Pedir al agente que explore lo necesario y proponga un plan proporcional al cambio.
3. Ejecutar cambios revisables. Observar las herramientas, sus resultados y cualquier desviación del alcance. Conservar requisitos y contratos como referencia.
4. Verificar el comportamiento esperado y las restricciones. Si aparece un fallo, registrar condiciones, entrada, esperado y observado; formular una hipótesis y una comprobación dirigida antes de corregir.
5. Repetir el caso que falló y las comprobaciones relacionadas. Revisar el diff y registrar cómo reproducir el resultado, qué queda pendiente y cuál sería el siguiente incremento.

La actividad continúa sobre el proyecto existente. No requiere preparar otra aplicación o demo HTTP. Los ejemplos de API, autenticación, red y respuestas vacías ya vistos pueden retomarse si aparecen durante el trabajo. La sesión no promete completar el MVP entero ni su infraestructura prevista.

Si se repite el mismo fallo sin evidencia nueva, revisar la hipótesis, el entorno o la información faltante antes de seguir cambiando código. Si el resultado inesperado revela una decisión de producto, volver a requisitos y hacer explícita esa decisión; no modificar el criterio solo para que una prueba pase.

Reservar unos minutos al final para explicar lo comprobado, las limitaciones y el siguiente paso. Un commit conserva una versión; no prueba por sí mismo que cumple ni implica un despliegue. Las referencias docentes se mantienen separadas de la carpeta de trabajo del alumno.

## Precisiones para la historia

- **1939, Shewhart:** especificación, producción e inspección como proceso cíclico. Deming desarrolló después los ciclos de aprendizaje y mejora; el PDSA tiene una evolución propia. No atribuir todo este conjunto a un único autor.
- **2001, Manifiesto Ágil:** surgió en febrero en Snowbird, con 17 participantes. Sus principios relacionan entregas frecuentes, software funcionando, excelencia técnica y reflexión. El esquema de tres pasos de esta clase es una síntesis didáctica, no la definición de Agile.
- **2022, ReAct:** Shunyu Yao y colaboradores presentaron el artículo en arXiv el 6 de octubre; la versión de ICLR es de 2023. Intercala razonamiento y acciones para incorporar observaciones y actualizar planes. No es un método completo de ingeniería de software.
- **Uso actual:** Anthropic documenta prácticas de exploración, planificación, implementación y verificación, incluidas experiencias de equipos internos. OpenCode ofrece Plan y Build para separar análisis y ejecución; sus herramientas efectivas dependen de la configuración y los permisos.

La línea de tiempo muestra antecedentes relacionados, no una genealogía causal demostrada. La historia se mantiene breve para dedicar la sesión al proyecto.

## Uso de la presentación

Con Node 22+, ejecutar `npm run dev` y abrir `http://127.0.0.1:8765/cohorts/01/sessions/06/index.html`. Flechas y Espacio navegan; Home y End saltan al inicio y al final. O abre el índice, P las notas con fuentes y R la revisión por lámina. Los comentarios se guardan en el navegador. Desactivar En vivo al presentar una versión estable.

Los diagramas son conceptuales y editables. Los enlaces entre iteración y depuración solo cambian de lámina. La página no llama a modelos, ejecuta pruebas, modifica el proyecto ni despliega servicios. Digital Mine conserva por separado los documentos de su MVP propuesto.

## Fuentes

Consultadas el 22 de octubre de 2026:

- [Circling Back, Ronald D. Moen y Clifford L. Norman, 2010](https://deming.org/wp-content/uploads/2020/06/circling-back.pdf), historia de los ciclos de Shewhart y Deming.
- [PDSA, Deming Institute](https://deming.org/explore/pdsa/), aprendizaje y mejora.
- [Historia del Manifiesto Ágil](https://agilemanifesto.org/history.html) y [principios originales](https://agilemanifesto.org/principles.html).
- [ReAct, Shunyu Yao y colaboradores](https://arxiv.org/abs/2210.03629).
- [Buenas prácticas de Claude Code, Anthropic](https://code.claude.com/docs/en/best-practices).
- [Agentes de OpenCode](https://opencode.ai/docs/agents/).
- [Qué revisar en un cambio, Google Engineering Practices](https://google.github.io/eng-practices/review/reviewer/looking-for.html).
