# IA para ingenieros y científicos

El curso de DeepSkill **AI for Engineers and Scientists** tiene un repositorio independiente con las presentaciones HTML, materiales y demos de la cohorte 01. Esta referencia permite retomar el trabajo desde `cofounder-agents`; el contenido y las instrucciones técnicas se mantienen en el repo del curso.

## Repositorio y documentación

- GitHub privado: [deep-skill/ai-for-engineers-and-scientists](https://github.com/deep-skill/ai-for-engineers-and-scientists).
- Carpeta local: `../ai-for-engineers-and-scientists`, junto a este monorepo.
- [README del curso](https://github.com/deep-skill/ai-for-engineers-and-scientists/blob/main/README.md): arranque, estructura, materiales y construcción de la referencia docente.
- [CLAUDE.md del curso](https://github.com/deep-skill/ai-for-engineers-and-scientists/blob/main/CLAUDE.md): instrucciones propias del proyecto; `AGENTS.md` es su symlink.
- [Guía del instructor](https://github.com/deep-skill/ai-for-engineers-and-scientists/blob/main/cohorts/01/sessions/01/instructor-guide.md): tiempos, explicación conceptual y secuencia de demo.
- [Opciones de demo](https://github.com/deep-skill/ai-for-engineers-and-scientists/blob/main/docs/demo-options.md): NASA, USGS, rutas y ensayo de sismos.
- [Fuentes](https://github.com/deep-skill/ai-for-engineers-and-scientists/blob/main/docs/sources.md): documentación primaria y referencias de precios fechadas.

Al cierre del 6 de octubre de 2026, el repo del curso estaba limpio y `main` local coincidía con GitHub en `f002518` (`Document quake prototype trial in demo options`). La reorganización de la sesión está en `6a1b554` (`Restructure session one around LLMs and practical agent work`).

## Arranque local

Desde la raíz de `cofounder-agents`:

```sh
cd ../ai-for-engineers-and-scientists
npm run dev
```

Requiere Node 22 o posterior y no necesita instalar dependencias npm. El servidor escucha en localhost:

- Materiales: `http://127.0.0.1:8765/`.
- Presentación: `http://127.0.0.1:8765/cohorts/01/sessions/01/index.html`.
- Calculadora de costes: `http://127.0.0.1:8765/tools/cost-calculator.html`.

Flechas o Espacio cambian de diapositiva; F activa pantalla completa, P muestra notas y R abre Revisión. **En vivo** / L recarga la página cuando cambian los archivos y conserva la diapositiva y el modo Revisión. Los comentarios de revisión se guardan en el navegador. Desactivar En vivo al presentar una versión estable. Los gráficos y controles son JavaScript local y no llaman a un LLM.

## Decisiones de la primera sesión

Clase práctica de 90 a 120 minutos, con hasta 30 minutos de diapositivas intercalados con herramientas y demo. Hay 16 diapositivas principales y tres apéndices opcionales. La portada destaca **IA para ingenieros y científicos**, el tema **¿Qué es realmente un LLM?** y el subtítulo **Trabajar con agentes**.

El orden acordado es presentación de JP y DeepSkill; LLM y Transformer; tokens, generación y contexto; cambios en software y análisis; apertura de OpenCode Desktop y Warp; chat, workflows y agentes; arnés, modelo, entorno y herramientas; elección de modelos y costes; construcción y verificación de una herramienta. No hay diapositiva separada de recorrido del curso. Mantener gráficos ligeros, branding DeepSkill y ejemplos editables en HTML/CSS/JavaScript.

OpenCode Desktop es la opción de trabajo por defecto, buscando un modelo gratuito o barato realmente disponible. Warp sirve para mostrar la terminal. Comparar capacidades y costes con Artificial Analysis y documentación oficial. Los tamaños de contexto son ejemplos ilustrativos; las tarifas API de la calculadora son ficticias. Los precios de Warp tienen fecha y fuente en el repo del curso.

La introducción comercial destaca a JP como fundador de DeepSkill y consultor que lidera transformaciones de arquitectura. Los casos incluyen Minsur / DrillPlan Generator (fase 1 entregada), Haul Sight con IMSS, formación para Cerro Verde vía Tecsup y entrenamientos en UNI. Las ampliaciones propuestas se distinguen de los proyectos ejecutados. GitHub, LinkedIn y DeepSkill están enlazados en la presentación.

## Demos y trabajo pendiente

La demo base provisional compara energía solar entre Lima, Arequipa y Piura con datos reales NASA POWER de 2025. Los alumnos abren solo `demos/solar/starter/`, con brief, datos y procedencia; la solución docente está separada en `demos/solar/reference/` y utiliza Python, pandas y Plotly. Los ZIPs para alumnos excluyen la solución y tienen un manifiesto de hashes.

USGS es la alternativa geográfica con datos y brief. El ensayo de sismos del 6 de octubre está documentado en `docs/demo-options.md`: análisis con pandas/matplotlib y prototipo web con Leaflet y D3. Esos prototipos quedaron en `/tmp`, fuera de Git; el brief de la herramienta final sigue pidiendo Plotly. Las rutas con OpenStreetMap quedan para una sesión posterior.

La presentación y sus interacciones fueron verificadas visualmente; la referencia solar se ejecutó y comprobó. **Falta ensayar la construcción completa dentro de OpenCode Desktop con el modelo gratuito elegido y medir cuánto tarda.** Validar la referencia docente no garantiza esa reconstrucción durante la clase.

El código, datos, briefs y documentación están versionados en el repo del curso. El entorno virtual y `demos/solar/reference/output/` son locales y se regeneran con las instrucciones del README. Retomar las ediciones y el ensayo allí, manteniendo esta nota como referencia desde el monorepo.
