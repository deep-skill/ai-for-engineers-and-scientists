# Digital Mine — Progreso y decisiones

| Versión | Fecha | Estado |
|---|---|---|
| 0.2 | 22 de octubre de 2026 | Registro de trabajo; documentación técnica completa para revisión |

> Este documento registra lo avanzado y las decisiones tomadas. No es un documento de requisitos ni de arquitectura: esos viven en los documentos 01 a 04 y en los artefactos de análisis y documentación 06 a 09.

## 1. Estado actual

| Documento | Contenido | Estado |
|---|---|---|
| `01-alcance-mvp.md` | PRD ligero y definición del alcance del MVP | Base de trabajo |
| `02-arquitectura.md` | Arquitectura propuesta, eventos, datos, NFRs y stack | Propuesta revisada; no implementable todavía |
| `03-backlog.md` | Fases, historias, KPIs, alertas y DoD | Propuesto |
| `04-srs.md` | Especificación de requisitos, versión 0.2 | Borrador para revisión |
| `05-decisiones.md` | Este registro | v0.2 |
| `06-vsm.md` | Análisis del flujo de valor | Borrador v0.1 |
| `07-ddd.md` | Análisis de dominio DDD-lite | Borrador v0.1 |
| `08-adr.md` | Registro de decisiones de arquitectura | Borrador v0.1; ADR-008 a ADR-014 propuestas |
| `09-c4.md` | Documentación C4 y diagramas | Borrador v0.1 |

No existe implementación ejecutable, monorepo ni datos generados. El stack sigue siendo una propuesta sujeta a confirmación. Los recursos cloud de C4 son futuros u opcionales, no implementados.

## 2. Decisiones tomadas

| ID | Fecha | Decisión | Consecuencia |
|---|---|---|---|
| DL-001 | 22 oct 2026 | El documento `01-alcance-mvp.md` es un PRD ligero; el SRS es un documento separado. | Se añadió la nota de PRD ligero y el enlace a `04-srs.md`. |
| DL-002 | 22 oct 2026 | El SRS v0.1 contiene 25 requisitos funcionales, 12 no funcionales, criterios de aceptación y trazabilidad. | `04-srs.md` queda como base para la revisión. |
| DL-003 | 22 oct 2026 | El método de análisis es **VSM + DDD-lite**. | Se crearon `06-vsm.md` y `07-ddd.md`. |
| DL-004 | 22 oct 2026 | El método de documentación es **ADR + C4 + SRS**. No se usan arc42, ATAM, TOGAF ni Event Storming. | Se crearon `08-adr.md` y `09-c4.md`; el SRS se actualizó a v0.2. |
| DL-005 | 22 oct 2026 | Los diagramas C4 usan **solo componentes**. Los recursos cloud se distinguen con un matiz visual. | Una sola vista de componentes muestra software y recursos cloud; no hay diagramas separados de despliegue. |
| DL-006 | 22 oct 2026 | La tecnología de diagramas es **PlantUML + Structurizr**. Structurizr DSL es la fuente del modelo; PlantUML renderiza las vistas. | `docs/diagrams/workspace.dsl`, tres `.puml` y tres SVG en `docs/diagrams/out/`. |
| DL-007 | 22 oct 2026 | Se asigna un agente por documento técnico y la coherencia final la valida el agente coordinador. | Ver sección 6. |
| DL-008 | 22 oct 2026 | Esta iteración documenta el MVP; no se implementa código. | Los documentos distinguen propuesto, confirmado y pendiente. |
| DL-009 | 22 oct 2026 | Se completan VSM, DDD-lite, ADR y C4; el SRS se actualiza a v0.2 con 28 FR y 13 NFR. | Documentación técnica lista para revisión; no hay decisiones P0 aceptadas. |
| DL-010 | 22 oct 2026 | La clasificación ore/waste queda **abierta**: el alcance la sitúa en la descarga; ADR-013 propone el carguío. | VSM, DDD, C4 y SRS la marcan como TBD o propuesta; no se presenta como confirmada. |
| DL-011 | 22 oct 2026 | El envelope v2 (`runId`, `shiftId`, `seq`, `streamId`, `receivedAt`) es una propuesta de ADR-008/009/011, no una decisión aceptada. | `02-arquitectura.md` conserva el envelope original; el SRS lo marca como propuesto. |
| DL-012 | 22 oct 2026 | La validación final se registra en la sección 7. | Enlaces, tablas, PlantUML y coherencia revisados. |

## 3. Revisión de arquitectura: hallazgos que condicionan la documentación

La revisión de `02-arquitectura.md` concluyó que la dirección es coherente, pero que faltan decisiones antes de implementar. Se registran como brechas P0:

| ID | Brecha | Efecto | Artefacto previsto |
|---|---|---|---|
| P0-01 | Autoridad y semántica del reloj simulado; dominio de la telemetría y de la retención. | Latencia, alertas, replay y determinismo no son verificables. | ADR-008 |
| P0-02 | Identidad y orden de eventos por equipo; deduplicación persistente. | Los ciclos y KPIs pueden emparejar mal; el determinismo no se puede probar. | ADR-009 |
| P0-03 | Fuente de verdad: eventos, tablas o proyecciones; derivados que vuelven al bus. | Riesgo de doble conteo y bucles de ingesta. | ADR-010 |
| P0-04 | Ciclo de vida del turno y de la corrida de simulación. | No se puede cerrar el ciclo plan → ejecución → reconciliación. | ADR-011 |
| P0-05 | Versionado del plan y cambios a mitad de turno. | La reconciliación plan vs real queda ambigua. | ADR-012 |
| P0-06 | Punto de clasificación ore/waste. | Afecta rutas, destinos, metas y reconciliación. | ADR-013 |
| P0-07 | Fórmulas de KPIs, reglas de alerta y parámetros del simulador. | El núcleo del MVP no es implementable sin inventar reglas. | ADR-014.1 a 014.3 |

Hallazgos P1 que se documentarán sin bloquear el análisis: contratos REST/WebSocket/MQTT, frontera de confianza local, backpressure y escritura por lotes, geometría y SRID del mapa, alcance verificable del determinismo, y arranque con migraciones y seed.

## 4. Decisiones abiertas heredadas del SRS

El SRS v0.2 registra D-01 y D-03 a D-14. Este registro no las repite; las mantiene como referencia. Estados relevantes:

- **D-02 (VSM/DDD/TOGAF):** resuelta. Se adoptan VSM y DDD-lite como métodos de análisis; TOGAF queda excluido.
- **D-01 (stack):** sigue abierta y sujeta a confirmación.
- **D-05 (contratos):** el envelope v2 y los payloads siguen TBD.
- **D-06 y D-07 (fórmulas y parámetros):** remiten a ADR-014.1 y ADR-014.3.
- **P0-06 (clasificación ore/waste):** sigue abierta; ver DL-010.

Las ADR-008 a ADR-014 están en estado **Propuesto**. Ninguna se declara aceptada en este registro.

## 5. Convención de diagramas

- **Nivel C4:** solo componentes. No se crean diagramas separados de contexto, contenedores, despliegue o código.
- **Recursos cloud:** se representan como componentes con el estereotipo `<<cloud>>`, color e icono distintivos. Los recursos locales usan `<<local>>` o el estilo base.
- **Contexto:** los actores y sistemas externos se muestran como componentes externos dentro de la misma vista.
- **Fuente del modelo:** Structurizr DSL (`workspace.dsl`). Las vistas se mantienen como PlantUML (`.puml`) y se renderizan a SVG.
- **VSM y DDD:** no son diagramas C4. Se documentan con tablas y, si hace falta, un diagrama de proceso o mapa de contextos; no usan la convención de componentes cloud.
- **Nomenclatura:** `c4-operacion.puml`, `c4-ingesta.puml`, `c4-reconciliacion.puml`; salidas en `docs/diagrams/out/`.

## 6. Plan de documentación y agentes

| Documento | Responsable | Contenido | Estado |
|---|---|---|---|
| `06-vsm.md` | Agente VSM | Flujo de valor actual, esperas, colas, cuellos de botella y puntos de captura. | Completado v0.1 |
| `07-ddd.md` | Agente DDD-lite | Lenguaje ubicuo, contextos, agregados, eventos y mapa de contextos. | Completado v0.1 |
| `08-adr.md` | Agente ADR | ADR-001 a ADR-014, con estado, contexto, opciones y consecuencias. | Completado v0.1; P0 propuestas |
| `09-c4.md` + `docs/diagrams/` | Agente C4 | Modelo Structurizr, diagramas PlantUML de componentes y catálogo. | Completado v0.1 |
| `04-srs.md` v0.2 | Agente SRS | Requisitos, trazabilidad y decisiones abiertas. | Completado v0.2 |
| Validación final | Agente coordinador | Coherencia entre VSM, DDD, ADR, C4 y SRS; enlaces y render. | Completado; ver sección 7 |

## 7. Validación de coherencia

| Verificación | Resultado |
|---|---|
| Enlaces relativos en 04 a 09 | Resuelven; no hay destinos faltantes. |
| Tablas Markdown | Columnas consistentes en los documentos nuevos. |
| PlantUML | Los tres `.puml` compilan con `plantuml -checkonly`. |
| SVG | Los tres SVG locales existen y son XML válido; `docs/diagrams/out/` está excluido de Git y se regenera con las instrucciones de 09. |
| Structurizr | `workspace.dsl` validado y exportado por el agente con Structurizr CLI 2025.11.09; el CLI no queda instalado en el repositorio. |
| `git diff --check` | Sin errores de espacios ni tabulaciones. |
| Coherencia de alcance | El MVP sigue siendo local; cloud es futuro y no genera requisitos. |
| Decisiones | ADR-008 a ADR-014 siguen en estado Propuesto; el SRS no las declara aceptadas. |

### 7.1 Inconsistencias detectadas y tratamiento

1. **Clasificación ore/waste.** El alcance (01 §2) la sitúa en la descarga; ADR-013 propone clasificar en el carguío. Se mantiene como decisión abierta (DL-010). VSM, DDD, C4 y SRS la marcan como TBD o propuesta; no se presenta como confirmada.
2. **Envelope v2.** `02-arquitectura.md` §5.1 define el envelope original sin `runId`, `shiftId`, `seq`, `streamId` ni `receivedAt`. El SRS y ADR-008/009/011 proponen la versión 2. Se añadió una nota de vigencia en `02-arquitectura.md` para que el lector sepa que la propuesta posterior prevalece solo si se acepta.
3. **Derivados como eventos.** `02-arquitectura.md` §5.3 lista `kpi.snapshot`, `alert.*` y `data_source.health` como eventos; ADR-010 propone que no vuelvan al bus operacional. La nota de vigencia de `02` remite a ADR-010.
4. **`simulation_runs`.** ADR-011 y el SRS la proponen; `02-arquitectura.md` §6 no la lista. Queda registrada como tabla propuesta en el SRS y en DDD.
5. **NFR de latencia, throughput y retención.** El SRS separa latencia p95 de actualización visible, define el determinismo comparable y deja el dominio temporal de retención como TBD. Los umbrales siguen sujetos a confirmación.
6. **Registro de decisiones.** Esta versión actualiza el estado de los documentos 04 a 09 y deja constancia de que las ADR P0 no están aceptadas.

## 8. Próximos pasos

1. Revisar el conjunto 04 a 09 con el docente.
2. Confirmar o rechazar ADR-008 a ADR-014, empezando por reloj, orden de eventos, fuente de verdad y ciclo de turno.
3. Cerrar la clasificación ore/waste (DL-010) y actualizar 01, 06, 07, 08 y 04 de forma coherente.
4. Definir contratos, fórmulas de KPI, umbrales y parámetros del simulador (ADR-014 y anexo P1).
5. Actualizar `02-arquitectura.md` cuando las ADR se acepten; hoy conserva la propuesta original con nota de vigencia.
6. No iniciar la implementación hasta que las ADR bloqueantes estén aceptadas.

## 9. Registro de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 0.1 | 22 oct 2026 | Registro inicial de progreso, método, convención de diagramas y plan de agentes. |
| 0.2 | 22 oct 2026 | Se completan 06 a 09, SRS v0.2, validación de coherencia y tratamiento de inconsistencias. |
