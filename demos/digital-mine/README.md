# Digital Mine

Gemelo digital de una mina a cielo abierto para cerrar el ciclo de operación:

**planificación → perforación → voladura → carguío → acarreo → descarga → chancado primario → reconciliación**

El MVP usa datos sintéticos y está diseñado para conectar fuentes reales (FMS, GPS, SCADA) más adelante.

## Estado

- Alcance del MVP definido.
- Arquitectura y backlog documentados.
- Implementación pendiente: no hay una aplicación ejecutable ni datos generados todavía.
- Incorporado al curso el 21 de octubre de 2026 como caso de proyecto minero.
- Uso confirmado por el docente para las siguientes clases, dentro de este repositorio general.

## Documentación

- [Alcance del MVP](docs/01-alcance-mvp.md)
- [Arquitectura propuesta](docs/02-arquitectura.md)
- [Backlog del MVP](docs/03-backlog.md)

## Stack propuesto

TypeScript · Next.js · Fastify · PostgreSQL/TimescaleDB · MQTT · Docker.

## Principio del MVP

El gemelo **refleja y explica** la operación; no comanda equipos reales ni optimiza el despacho. El ciclo se cierra con la comparación plan vs. real y la retroalimentación al planificador.

## Uso en el curso

Digital Mine se desarrollará como proyecto de minería para las siguientes clases, dentro de `demos/digital-mine/` en este repositorio. Permite trabajar requisitos, decisiones de arquitectura y planificación sobre un caso común. Las actividades concretas se definirán al preparar cada sesión, manteniendo el temario acordado del curso.

La documentación describe lo que se propone construir, no funcionalidades ya implementadas. El stack, los supuestos y el alcance se revisan antes de comenzar el desarrollo.

Los comandos y carpetas de la arquitectura son el objetivo de implementación; todavía no existen los servicios, el monorepo ni la infraestructura. Los futuros datos de simulación deben identificarse como sintéticos y distinguirse de mediciones reales. Las implementaciones de referencia del docente se mantendrán separadas de la carpeta de trabajo del alumno.
