# Skills públicos para el ciclo de vida

Selección para la clase 5, revisada el 20 de octubre de 2026. Los enlaces apuntan a versiones concretas de los originales. Los nombres y contenidos pertenecen a sus autores; esta guía organiza su uso didáctico.

## Criterios de selección

- Autoría pública e identificable y propósito documentado.
- Correspondencia entre la tarea del skill y la etapa que estamos explicando.
- Instrucciones, herramientas y dependencias que podamos revisar.
- Actividad y adopción del proyecto como señales adicionales; las estrellas del repositorio no evalúan por sí solas cada skill.

Los conceptos de la clase son agnósticos de modelo, agente y lenguaje. OpenCode es el entorno que usa el docente. Cargar un archivo SKILL.md y ejecutar correctamente sus instrucciones son comprobaciones distintas. La colección de Superpowers documenta una integración específica con OpenCode; otros ejemplos pueden necesitar ajustes en herramientas o convenciones del entorno.

## Selección principal de skills y kits

| Momento | Original | Para qué sirve en esta clase |
|---|---|---|
| Especificación | [GitHub Spec Kit](https://github.com/github/spec-kit/blob/6ad208241af0b94b2dc22b5c0534a9a82465bf0a/README.md) · GitHub | Kit de procesos y plantillas para relacionar especificación, plan e implementación; no un skill aislado. |
| Requisitos y alternativas | [brainstorming](https://github.com/obra/superpowers/blob/bb92a77741419a4ab5f06e711a283343f1ada0c3/skills/brainstorming/SKILL.md) · obra/superpowers | Aclarar intención, alcance y decisiones de diseño. |
| Plan de implementación | [writing-plans](https://github.com/obra/superpowers/blob/bb92a77741419a4ab5f06e711a283343f1ada0c3/skills/writing-plans/SKILL.md) · obra/superpowers | Descomponer trabajo y definir cómo comprobar cada paso. |
| Programación y pruebas | [test-driven-development](https://github.com/obra/superpowers/blob/bb92a77741419a4ab5f06e711a283343f1ada0c3/skills/test-driven-development/SKILL.md) · obra/superpowers | Relacionar un caso esperado con el ciclo prueba que falla, implementación y refactorización. |
| Revisión de cambios | [code-review](https://github.com/getsentry/skills/blob/f57ada2d0b640406ea7e25b11d636c530e77c58b/skills/code-review/SKILL.md) · getsentry/skills | Leer prácticas de revisión publicadas por el equipo de Sentry. |
| Comprobación de resultados | [verification-before-completion](https://github.com/obra/superpowers/blob/bb92a77741419a4ab5f06e711a283343f1ada0c3/skills/verification-before-completion/SKILL.md) · obra/superpowers | Pedir evidencia antes de afirmar que un trabajo está terminado. |

TDD es un enfoque específico. El skill de Superpowers prescribe un proceso estricto; revisar el original antes de aplicarlo a un proyecto que ya tiene código. La lámina ilustra el concepto sin activar ese proceso ni modificar los archivos del alumno.

## Referencias complementarias

- [webapp-testing, Anthropic](https://github.com/anthropics/skills/blob/dbd4588f9e1033efb41dad4bef2f7947c8993d44/skills/webapp-testing/SKILL.md): Pruebas de aplicaciones web mediante Playwright. Es una referencia especializada en interfaz, no una estrategia completa de pruebas del software.
- [find-bugs, Sentry](https://github.com/getsentry/skills/blob/f57ada2d0b640406ea7e25b11d636c530e77c58b/skills/find-bugs/SKILL.md): Revisión de posibles fallos en cambios de una rama.
- [web-design-guidelines, Vercel](https://github.com/vercel-labs/agent-skills/blob/063bee94c3f4df8453406c830b0a7df0f2860278/skills/web-design-guidelines/SKILL.md): Revisión de interfaz, accesibilidad y experiencia de uso. No sustituye al análisis y diseño general de un sistema.

## Lectura en OpenCode

Usar la [documentación oficial de Agent Skills en OpenCode](https://opencode.ai/docs/skills/) para comprobar ubicación, descubrimiento y permisos. Leer el propósito del original, identificar sus dependencias y elegir una tarea acotada del proyecto existente. Observar qué instrucciones carga el agente y qué herramientas ejecuta; contrastar su resultado con los criterios acordados.

La presentación solo enlaza las fuentes: no instala skills, configura agentes ni ejecuta sus scripts. Esta selección documenta referencias, no certifica que cada paquete completo se haya probado en OpenCode. Mantener las adaptaciones del entorno separadas del original y conservar su atribución.

## Versiones consultadas

La procedencia técnica, los enlaces originales y los hashes SHA-256 de los archivos consultados se conservan en `references.json`, junto a esta guía.

- [obra/superpowers](https://github.com/obra/superpowers/tree/bb92a77741419a4ab5f06e711a283343f1ada0c3): commit `bb92a77741419a4ab5f06e711a283343f1ada0c3`.
- [getsentry/skills](https://github.com/getsentry/skills/tree/f57ada2d0b640406ea7e25b11d636c530e77c58b): commit `f57ada2d0b640406ea7e25b11d636c530e77c58b`.
- [anthropics/skills](https://github.com/anthropics/skills/tree/dbd4588f9e1033efb41dad4bef2f7947c8993d44): commit `dbd4588f9e1033efb41dad4bef2f7947c8993d44`.
- [github/spec-kit](https://github.com/github/spec-kit/tree/6ad208241af0b94b2dc22b5c0534a9a82465bf0a): commit `6ad208241af0b94b2dc22b5c0534a9a82465bf0a`.
- [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/tree/063bee94c3f4df8453406c830b0a7df0f2860278): commit `063bee94c3f4df8453406c830b0a7df0f2860278`.
