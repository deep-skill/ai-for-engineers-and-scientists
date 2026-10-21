# Clase 5: programación dirigida por IA, fundamentos con rigor

## Ciclo de vida del software

Borrador preparado el 20 de octubre de 2026 y documentado para su versionado el 21 de octubre. Ocho láminas y 28 minutos de presentación dentro de una sesión prevista de 120 minutos. La validación del contenido por el docente y la confirmación del dictado siguen pendientes; versionar los materiales no confirma ninguna de ellas.

Las láminas desarrollan conceptos de ingeniería de software: requisitos, análisis y diseño, programación, pruebas, entrega, operación y mantenimiento. La práctica sobre un proyecto concreto se realiza fuera de las láminas y queda a cargo del docente. La clase es independiente del modelo, el agente y el lenguaje; OpenCode es el entorno de demostración si se decide usar.

## Ritmo propuesto

| Minutos | Trabajo con el docente | Lámina y tiempo de explicación |
|---|---|---|
| 0–10 | Repaso y mapa del ciclo; ubicar decisiones que aparecen en cualquier proyecto. | 1 · 2 min |
| 10–30 | Requisitos: función, calidad, restricción y criterio verificable. | 2 · 4 min |
| 30–50 | Análisis, diseño y plan: problema, estructura y camino de cambio. | 3 · 6 min |
| 50–70 | Programación: datos, control, funciones, errores y dependencias. Incluir una pausa breve. | 4 · 4 min |
| 70–90 | Pruebas: niveles, anatomía de un caso y límites. | 5 · 4 min |
| 90–105 | Entrega: artefacto, entorno, CI/CD y vuelta atrás. | 6 · 4 min |
| 105–115 | Operación: observabilidad, incidentes y tipos de mantenimiento. | 7 · 2 min |
| 115–120 | Situar los skills públicos y cerrar con preguntas. | 8 · 2 min |

Las demostraciones prácticas no forman parte de las láminas. El docente puede abrir el proyecto que elija en los bloques de trabajo; las láminas no dependen de él.

## Preparar la explicación

Abrir las láminas con Node 22+ y `npm run dev` en `http://127.0.0.1:8765/cohorts/01/sessions/05/index.html`. Las flechas y Espacio navegan; Home y End saltan al inicio y al final. O abre el índice, P las notas con fuentes y R la revisión por lámina. Los comentarios quedan en el navegador. Desactivar En vivo al presentar una versión estable.

## Hilo conductor

Cada lámina responde una pregunta de ingeniería: qué problema resolver, cómo estructurarlo, cómo expresarlo, cómo comprobarlo, cómo entregarlo y cómo aprender de su uso. El mapa inicial muestra cinco etapas de desarrollo; la operación y el mantenimiento se presentan en la lámina 7 como el retorno que vuelve a abrir requisitos, no como una sexta caja.

Si se usa un caso práctico, mantenerlo fuera de las láminas y distinguir con claridad un ejemplo didáctico de una medición o de una captura real. No atribuir al proyecto del alumno criterios que no se hayan acordado.

## Puntos que conviene profundizar

- **Requisitos:** distinguir función, calidad y restricción; convertir una intención en un criterio observable. Evitar ambigüedades sin medida, delimitar el alcance y conservar la trazabilidad entre requisito, diseño, prueba y entrega. El requisito no es la solución ni la tarea.
- **Análisis y diseño:** el análisis precisa el problema, las reglas, los estados y el vocabulario; el diseño reparte responsabilidades y define contratos. Buscar cohesión y bajo acoplamiento, comparar alternativas y documentar el porqué. El plan ordena cambios y verificaciones; no sustituye al diseño. Evitar sobreingeniería.
- **Programación:** leer datos e invariantes, control del flujo, funciones y efectos, manejo de errores y dependencias. La legibilidad importa porque el código se lee y se modifica más de lo que se escribe. La IA puede generar una implementación plausible; la revisión humana comprueba límites y coherencia con el diseño.
- **Pruebas:** los niveles unitario, de integración y de aceptación aportan evidencias distintas. Un caso tiene estado inicial, acción y resultado observable; los límites encuentran lo que el caso feliz oculta. La expectativa debe venir del requisito, no de la implementación. Cobertura no es garantía.
- **Entrega:** una versión utilizable requiere un artefacto identificable, instrucciones, dependencias y configuración. CI integra y comprueba; entrega continua deja versiones listas; despliegue continuo activa producción. Rollback depende también de datos y compatibilidad. Un push no es un despliegue.
- **Operación:** separar señales, síntomas, causas y decisiones. Distinguir incidente, defecto, adaptación y mejora; reconocer mantenimiento correctivo, adaptativo, perfectivo y preventivo. Situar la operación como el retorno al ciclo y conectar con la depuración y verificación de la sesión 6.

## Cómo leer las ilustraciones

Todos los diagramas son conceptuales y editables. Los controles de Análisis, Diseño y Plan cambian el texto del ejemplo; los de CD alternan entrega y despliegue continuos. Ninguno inspecciona el equipo, ejecuta pruebas, publica artefactos ni llama a un modelo. Esta versión no incluye cálculos ni datos inventados en las láminas.

La operación y el mantenimiento tienen su propia lámina y no se presentan como una sexta caja del mapa. El retorno inferior de la lámina 1 representa el uso real que vuelve a abrir requisitos.

## Skills y fuentes

El anexo «Skills públicos para el ciclo de vida» enlaza los originales y registra sus versiones. Se priorizan fuentes identificables: Superpowers, GitHub, Sentry, Anthropic y Vercel. La presentación no instala ni activa esos skills. Para una demostración en OpenCode, leer primero el original seleccionado y comprobar que las herramientas y dependencias del entorno permiten seguirlo.

Un skill es un método reutilizable; no concede permisos ni sustituye las herramientas, el criterio humano o la evidencia de ejecución. La revisión del resultado sigue siendo necesaria. El formato abierto permite compartir instrucciones, mientras que la compatibilidad efectiva depende de cada integración.

## Referencias conceptuales

Consultadas el 20 de octubre de 2026:

- [ISO/IEC/IEEE 29148](https://standards.ieee.org/ieee/29148/10449/), ingeniería de requisitos.
- [ISO/IEC 25010](https://www.iso.org/standard/78176.html), modelo de calidad del producto.
- [Ciclo de vida del software, AWS](https://aws.amazon.com/what-is/sdlc/).
- [Modelo C4, Simon Brown](https://c4model.com/) y [Architecture Decision Records](https://adr.github.io/).
- [The Practical Test Pyramid, Martin Fowler](https://martinfowler.com/articles/practical-test-pyramid.html).
- [Software Engineering at Google](https://abseil.io/resources/swe-book) y [Google Engineering Practices](https://google.github.io/eng-practices/review/).
- [GitHub Actions](https://docs.github.com/en/actions/get-started/understand-github-actions), [Continuous Delivery](https://martinfowler.com/bliki/ContinuousDelivery.html) y [Google SRE](https://sre.google/sre-book/monitoring-distributed-systems/).
- [Agent Skills](https://agentskills.io/home) y [skills en OpenCode](https://opencode.ai/docs/skills/).

La secuencia de ocho sesiones se mantiene. Esta clase sitúa la programación dentro del ciclo; la sesión 6 profundiza en planear, depurar y verificar mediante un flujo agéntico.

## Estado y verificación

La presentación y esta guía describen la preparación de la sesión 5, programada para el 20 de octubre. El dictado sigue pendiente de confirmación del docente en el plan del curso.

Se verificaron la navegación por teclado, el índice, las notas, la revisión por lámina, los enlaces y los controles conceptuales en vistas de escritorio y de 390 px, sin desbordes horizontales. Las láminas no ejecutan cálculos, pruebas ni despliegues.
