# Clase 4: Git y tu primer agente en un proyecto real

Preparada el 13 de octubre de 2026. Esta sesión se adapta a **90 minutos** por decisión del docente; el cronograma general conserva sus ocho sesiones. La presentación tiene nueve láminas y 28 minutos de explicación: siete de Git y dos de bonus. Las demostraciones se realizan fuera de las láminas, sobre el repositorio y los ejemplos existentes.

## Ritmo de la clase

| Minutos | Bloque | Tiempo de láminas |
|---|---|---|
| 0–15 | Historia, repositorio y commit. Luego, explicación sobre el proyecto existente. | 1 y 2: 7 min |
| 15–35 | DAG, ramas e integración. Intercalar el historial y las ramas reales. | 3 y 4: 8 min |
| 35–50 | Git, GitHub y colaboración. Mostrar el remoto y una revisión si resulta útil. | 5: 3 min |
| 50–75 | Directorio de trabajo, índice, historial, comandos y `.gitignore`. | 6 y 7: 5 min |
| 75–85 | Bonus Scion y conversación sobre decisiones de arquitectura. | 8 y 9: 5 min |
| 85–90 | Preguntas y cierre. | Sin lámina adicional |

## Preparación docente

Abrir la presentación con `npm run dev` y Node 22+ en `http://127.0.0.1:8765/cohorts/01/sessions/04/index.html`. Tener a mano el mismo repositorio, la terminal y el agente que ya se usaron. Identificar un commit y una rama útiles para explicar; revisar el trabajo pendiente antes de realizar operaciones sobre él. La clase conserva el foco en teoría de Git y deja al docente elegir las demostraciones.

P abre las notas con fuentes e indicaciones para las explicaciones en vivo. O abre el índice. R permite comentarios por lámina, guardados en el navegador. Las flechas, Home y End navegan por la presentación. Desactivar En vivo para presentar una versión estable.

Los controles de DAG, ramas y staging cambian únicamente una ilustración. No leen el historial real, ejecutan Git ni modifican archivos. A, B, C, D y M son etiquetas conceptuales y no hashes del repositorio. El gráfico del bonus usa observaciones declaradas en su fuente; la procedencia está en `scion-data.json`.

## Puntos de explicación

### 1. Historia y commit

Separar los antecedentes generales de la historia de Linux. Copias manuales y sistemas centralizados ayudan a presentar el problema; Linux usó parches, BitKeeper y luego Git. No atribuir a Git la invención del control de versiones distribuido.

Un commit referencia un árbol del contenido versionado, padres y metadatos. El modelo de instantáneas permite reutilizar contenido sin cambios; no significa duplicar todos los archivos en cada versión. El hash identifica un objeto y no demuestra que el programa esté correcto. Mostrar un commit existente cuando quieras pasar a la terminal.

### 2. DAG y ramas

Mantener la convención **commit → padre** en todas las flechas. Cadena, divergencia e integración son etapas del mismo ejemplo. Un DAG no tiene ciclos dirigidos; un merge puede tener varios padres sin crear un ciclo. Los DAG también permiten representar restricciones entre tareas y ordenar dependencias.

Una rama es una referencia móvil. HEAD suele señalar la rama activa, aunque también existe detached HEAD. Al crear `mejora`, ambas ramas apuntan a B. Después divergen a C y D. El merge M conserva los dos padres; un fast-forward mueve la referencia cuando no hay divergencia y no crea un nuevo commit de merge. El nombre `main` es el elegido en este ejemplo. Los conflictos dependen del contenido y necesitan una decisión, no aparecen por el mero hecho de tener dos ramas.

### 3. Colaboración

Relacionar Git con la copia local y GitHub con alojamiento y revisión. `origin` es un nombre habitual de remoto. `clone` crea una copia; `fetch` obtiene objetos y referencias; `pull` obtiene e integra según opciones/configuración; `push` comparte objetos y solicita actualizar referencias. Un pull request es una propuesta de revisión en la plataforma. No equipararlo a `git pull` ni equiparar commit a publicación.

### 4. Comandos e ignore

La ilustración del archivo cambia de 4.5 a 5; `git add` conserva 5 en el índice. Otra edición llega a 6 y `git commit` registra el 5 preparado, dejando 6 pendiente. Esto muestra por qué el índice contiene versiones concretas y no solo nombres de archivos.

Comandos de consulta para situar en la explicación: `git status`, `git diff`, `git diff --cached` y `git log --oneline --graph --decorate`. Los ejemplos de registro y ramas se realizan en el entorno del docente. El agente puede ayudar a leer el README, entender un cambio y explicar un diff; la decisión de qué registrar se revisa sobre la evidencia del proyecto.

`.gitignore` trata archivos sin seguimiento. Los ejemplos de dependencias, configuración privada y caché no son una regla universal para los datos del curso. Mantener las fuentes y entregas que requiere el proyecto. Agregar una regla no deja de rastrear un archivo ni elimina versiones anteriores.

### 5. Bonus y cierre

Usar el artículo fechado como caso de arquitectura. Contrastar las necesidades de un proyecto pequeño con las del sistema descrito y preguntar qué compromisos introduciría cambiar de diseño. El detalle del bonus queda en las notas de las dos láminas; no hay instalación ni migración en esta sesión.

## Fuentes

Consultadas el 13 de octubre de 2026:

- [Historia de Git](https://git-scm.com/book/en/v2/Getting-Started-A-Short-History-of-Git) y [control de versiones](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control).
- [Objetos Git](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects), [glosario](https://git-scm.com/docs/gitglossary), [ramas](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell) y [merges](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging).
- [DAG y orden topológico](https://docs.python.org/3/library/graphlib.html).
- [GitHub y Git](https://docs.github.com/en/get-started/start-your-journey/what-is-github), [remotos](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes) y [git pull](https://git-scm.com/docs/git-pull).
- [Registro de cambios](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository) y [gitignore](https://git-scm.com/docs/gitignore).
- [Redesigning source control at Anthropic](https://www.anthropic.com/engineering/redesigning-source-control).
- [Logo Git](https://git-scm.com/community/logos), de Jason Long, CC BY 3.0. La procedencia de los logos está en `assets/external-sources.json`.

## Estado y verificación

La presentación y esta guía describen la preparación de la sesión 4, programada para el 13 de octubre. El dictado sigue pendiente de confirmación del docente en el plan del curso. La siguiente sesión del calendario es la 5, **Programación dirigida por IA: fundamentos con rigor**, el martes 20 de octubre, según la reprogramación aprobada el 14 de octubre; sus materiales cuentan con un borrador preparado para revisión.

Se verificaron la navegación por teclado, el índice, las notas, los enlaces a guías y la vista en pantalla pequeña. Los controles del DAG, las ramas y las tres zonas se comprobaron contra las relaciones y estados descritos en esta guía. El logo de Git y los datos del bonus conservan sus fuentes y procedencia.
