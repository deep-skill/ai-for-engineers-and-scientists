# Digital Mine

Gemelo digital de una mina a cielo abierto para cerrar el ciclo de operación:

**planificación → perforación → voladura → carguío → acarreo → descarga → chancado primario → reconciliación**

El MVP usa datos sintéticos y está diseñado para conectar fuentes reales (FMS, GPS, SCADA) más adelante.

## Estado

- Alcance, SRS, arquitectura, backlog, VSM, DDD-lite, ADR y C4 documentados.
- Primera generación de datos sintéticos de carguío y acarreo en `simulator/data/shift-001/`.
- Aplicación ejecutable pendiente: no hay monorepo, servicios ni interfaz.
- Incorporado al curso el 21 de octubre de 2026 como caso de proyecto minero.
- Uso confirmado por el docente para las siguientes clases, dentro de este repositorio general.

## Documentación

- [Alcance del MVP](docs/01-alcance-mvp.md)
- [Arquitectura propuesta](docs/02-arquitectura.md)
- [Backlog del MVP](docs/03-backlog.md)
- [Especificación de requisitos (SRS)](docs/04-srs.md)
- [Progreso y decisiones](docs/05-decisiones.md)
- [Mapa de flujo de valor (VSM)](docs/06-vsm.md)
- [Análisis de dominio DDD-lite](docs/07-ddd.md)
- [Registro de decisiones de arquitectura (ADR)](docs/08-adr.md)
- [Documentación C4 de componentes](docs/09-c4.md)
- [Plan de datos sintéticos: carguío y acarreo](docs/10-plan-datos-sinteticos.md)
- [Diccionario de datos sintéticos](docs/11-diccionario-datos.md)

> Los documentos 04 a 11 están en revisión. Las ADR-008 a ADR-014 son propuestas; ninguna decisión P0 está aceptada. La aplicación sigue sin implementación; el generador de datos y su primera corrida ya existen.

## Simulador de datos

- [Generador y instrucciones](simulator/README.md)
- [Configuración del turno 001](simulator/config/shift-001.json)
- [Dataset generado](simulator/data/shift-001/)
- [Diccionario de datos](docs/11-diccionario-datos.md)

El generador usa Python 3.11+ y SimPy. El stack de la aplicación (TypeScript, Next.js, Fastify, PostgreSQL/TimescaleDB, MQTT y Docker) sigue siendo una propuesta separada.

## Principio del MVP

El gemelo **refleja y explica** la operación; no comanda equipos reales ni optimiza el despacho. El ciclo se cierra con la comparación plan vs. real y la retroalimentación al planificador.

## Uso en el curso

Digital Mine se desarrollará como proyecto de minería para las siguientes clases, dentro de `demos/digital-mine/` en este repositorio. Permite trabajar requisitos, decisiones de arquitectura y planificación sobre un caso común. Las actividades concretas se definirán al preparar cada sesión, manteniendo el temario acordado del curso.

La documentación describe lo que se propone construir, no funcionalidades ya implementadas. El stack, los supuestos y el alcance se revisan antes de comenzar el desarrollo.

Los comandos y carpetas de la arquitectura son el objetivo de implementación; todavía no existen los servicios, el monorepo ni la infraestructura. El generador de datos y su primera corrida ya existen y están identificados como sintéticos. Las implementaciones de referencia del docente se mantendrán separadas de la carpeta de trabajo del alumno.
