# Digital Mine — Registro de decisiones de arquitectura (ADR)

| Versión | Fecha | Estado | Base |
|---|---|---|---|
| 0.1 | 22 de octubre de 2026 | Borrador para revisión; todas las ADR en estado **Propuesto** | Documentos 02, 04 y 05 |

> Este registro aplica el método **ADR + C4 + SRS** definido en [05 — Progreso y decisiones](05-decisiones.md). Documenta decisiones de arquitectura, no requisitos ni implementación. **Ninguna decisión P0 está aceptada todavía:** las ADR-008 a ADR-014 son propuestas para revisión del docente y del equipo. Las ADR-001 a ADR-007 se resumen desde la arquitectura propuesta y tampoco tienen acta de aceptación.

## 1. Propósito y convención

### 1.1 Qué registra un ADR

Una ADR (*Architecture Decision Record*) es un registro breve y durable de una decisión de arquitectura significativa. Captura el contexto, el problema, las opciones consideradas, la dirección recomendada y sus consecuencias. Responde **por qué** se elige algo, no **cómo** se implementa.

Se usa una ADR cuando la decisión:

- afecta la estructura, los límites entre módulos o la propiedad de los datos;
- cambia contratos, requisitos no funcionales, determinismo, seguridad u operación;
- es costosa de revertir o condiciona varias fases del backlog;
- necesita quedar trazable frente al SRS y al modelo C4.

No se usa una ADR para cada biblioteca, detalle de código o preferencia de estilo. Esos detalles viven en el código, en los contratos (anexo P1) o en el SRS.

### 1.2 Estados posibles

| Estado | Significado | Efecto |
|---|---|---|
| **Propuesto** | La ADR está redactada y en revisión. La recomendación no obliga. | Se puede discutir, cambiar o rechazar. No se implementa como si estuviera confirmada. |
| **Aceptado** | El docente, el equipo o ambos confirmaron explícitamente la decisión, con fecha. | Obliga al diseño y a la implementación. Un cambio semántico requiere otra ADR o una sustitución. |
| **Rechazado** | La opción fue evaluada y descartada. Se conserva el motivo. | No se implementa. El ID no se reutiliza. |
| **Sustituido** | Otra ADR reemplazó esta decisión. | Se conserva por historia y se enlaza a la ADR sucesora. |

Regla de paso a **Aceptado**: no se deduce por estar el documento en el repositorio, por haber usado la idea en una demo ni por silencio. Requiere confirmación explícita, con fecha y responsable, registrada en este documento o en el acta de revisión.

### 1.3 Fecha y ciclo de vida

- La **fecha** de cada ADR es la fecha de propuesta. Cuando se acepte, se añade la fecha de aceptación y el responsable.
- Los IDs son inmutables y no se reutilizan. Una ADR rechazada conserva su número.
- Una ADR aceptada no se reescribe para cambiar su sentido. Se crea una nueva ADR que la sustituya y se actualiza el estado de la anterior.
- Las correcciones de forma (enlaces, erratas, formato) no cambian el estado ni la decisión.
- Todo detalle no definido se marca **TBD**. Este registro no inventa fórmulas, umbrales ni parámetros para llenar vacíos.

### 1.4 Relación con el SRS y el modelo C4

| Artefacto | Pregunta que responde | Contenido | Cuándo se actualiza |
|---|---|---|---|
| **ADR** (este documento) | ¿Por qué se decide así? | Contexto, problema, opciones, recomendación, consecuencias, preguntas abiertas | Al proponer, aceptar, rechazar o sustituir una decisión |
| **SRS** ([04 — SRS](04-srs.md)) | ¿Qué debe cumplir el sistema y cómo se verifica? | FR, NFR, criterios de aceptación, trazabilidad | Cuando una ADR aceptada cambia requisitos o NFR; la versión prevista es la 0.2 |
| **C4** (`09-c4.md`) | ¿Cómo se estructura el software? | Componentes, responsabilidades, relaciones y contratos entre ellos | Cuando una ADR aceptada cambia límites, componentes o responsabilidades |

Reglas de convivencia:

1. Una ADR no reemplaza un requisito. La recomendación se vuelve verificable cuando el SRS la incorpora como FR o NFR con criterio de aceptación.
2. Una ADR aceptada puede añadir o aclarar NFR (por ejemplo, el dominio temporal de la retención) y debe actualizar la trazabilidad del SRS.
3. Los componentes C4 citados en este documento son **previstos**. El modelo definitivo vive en `09-c4.md`; ninguna ADR crea por sí sola un componente implementado.
4. [05 — Progreso y decisiones](05-decisiones.md) registra las brechas P0. Cuando una ADR se acepte, ese registro debe actualizar el estado de la brecha correspondiente.
5. Si una ADR y el SRS discrepan, se corrige el artefacto desactualizado. El SRS gobierna la verificación; la ADR gobierna el diseño.

### 1.5 Convención de este registro

- Las ADR-001 a ADR-007 se resumen en una línea y remiten a [02 — Arquitectura propuesta](02-arquitectura.md), §10. No se reescriben.
- Las ADR-008 a ADR-014 se desarrollan con contexto, problema, opciones, recomendación, consecuencias, requisitos, componentes y preguntas abiertas.
- La recomendación se presenta siempre como **propuesta**, no como decisión aceptada.
- Las referencias a documentos existentes son enlaces relativos. Los documentos 06, 07 y 09 ya están publicados y se enlazan cuando corresponde.
- Se usa español para el texto y se conservan en inglés los nombres estándar (`event-time`, `replay`, `QoS`, `tick`).
- Las propuestas respetan los principios de [02 — Arquitectura](02-arquitectura.md), §1: monolito modular, event-driven, adaptadores reemplazables, simulador determinista, local-first y sin Kafka, Kubernetes ni microservicios.

## 2. Índice de ADR

| ID | Título | Estado | Origen |
|---|---|---|---|
| ADR-001 | Monolito modular | Propuesto | 02 §10 |
| ADR-002 | MQTT para telemetría y WebSocket para la UI | Propuesto | 02 §10 |
| ADR-003 | PostgreSQL + TimescaleDB + PostGIS | Propuesto | 02 §10 |
| ADR-004 | Simulador primero, adaptadores después | Propuesto | 02 §10 |
| ADR-005 | Mapa 2D/2.5D antes que 3D | Propuesto | 02 §10 |
| ADR-006 | Sin autenticación en el MVP | Propuesto | 02 §10 |
| ADR-007 | Eventos versionados con Zod | Propuesto | 02 §10 |
| ADR-008 | Autoridad y semántica del reloj simulado | Propuesto | P0-01 |
| ADR-009 | Identidad y orden de eventos | Propuesto | P0-02 |
| ADR-010 | Fuente de verdad: eventos, tablas y proyecciones | Propuesto | P0-03 |
| ADR-011 | Ciclo de vida del turno y de la corrida | Propuesto | P0-04 |
| ADR-012 | Versionado del plan y reconciliación | Propuesto | P0-05 |
| ADR-013 | Punto de clasificación ore/waste | Propuesto | P0-06 |
| ADR-014 | Reglas de dominio pendientes: KPIs, alertas y simulador | Propuesto | P0-07 |

## 3. ADR existentes (ADR-001 a ADR-007)

La [arquitectura propuesta](02-arquitectura.md), §10, presenta estas siete decisiones. El documento 02 está marcado como propuesta y no existe un acta de aceptación, por lo que este registro las mantiene en estado **Propuesto**. El detalle, el motivo y las consecuencias están en esa sección; aquí solo se resume una línea.

| ID | Decisión | Resumen de una línea | Estado |
|---|---|---|---|
| ADR-001 | Monolito modular | Un servidor con módulos de ingesta, gemelo, API y WebSocket; el simulador es un proceso aparte. | Propuesto |
| ADR-002 | MQTT + WebSocket | MQTT para telemetría y eventos; WebSocket para el consumo de la UI. | Propuesto |
| ADR-003 | PostgreSQL + TimescaleDB + PostGIS | Un solo motor para datos relacionales, series temporales y geometría. | Propuesto |
| ADR-004 | Simulador primero | Construir y demostrar con simulador; los adaptadores a FMS/SCADA llegan después. | Propuesto |
| ADR-005 | Mapa 2D/2.5D | Menor costo que 3D y suficiente para cerrar el ciclo operacional. | Propuesto |
| ADR-006 | Sin autenticación en el MVP | MVP local y no expuesto; OIDC/RBAC se agregan antes de exponer el sistema. | Propuesto |
| ADR-007 | Eventos versionados con Zod | Contratos explícitos, `eventVersion` y validación en la frontera de ingesta. | Propuesto |

Si el docente acepta la arquitectura, estas siete pueden pasar a **Aceptado** en bloque o por separado. Hasta entonces no se usan como base contractual para implementar.

## 4. ADR nuevos (ADR-008 a ADR-014)

Las siete ADR siguientes cubren las brechas P0-01 a P0-07 del registro [05 — Progreso y decisiones](05-decisiones.md), §3. Todas tienen fecha 22 de octubre de 2026 y estado **Propuesto**. Cada recomendación es una propuesta para revisión; las preguntas abiertas deben cerrarse antes de implementar la fase correspondiente. Las recomendaciones se redactan en presente para facilitar la revisión, pero **no son decisiones aceptadas**.

---

### ADR-008 — Autoridad y semántica del reloj simulado

| Campo | Valor |
|---|---|
| ID | ADR-008 |
| Estado | Propuesto |
| Fecha | 22 de octubre de 2026 |
| Brecha | P0-01 |
| Ámbito | Tiempo, latencia, retención, pausa y replay |

#### Contexto

El alcance fija telemetría a 1 Hz, turnos de 8 horas, almacenamiento en UTC y una aceleración por defecto de 1 segundo real = 1 minuto simulado ([01 — Alcance](01-alcance-mvp.md), §6). La arquitectura define `occurredAt` como “hora simulada o real del hecho” y `sentAt` como “hora real de publicación” ([02 — Arquitectura](02-arquitectura.md), §5.1), y fija latencia y retención en [02 — Arquitectura](02-arquitectura.md), §9. El backlog mezcla alertas en minutos simulados y en segundos reales ([03 — Backlog](03-backlog.md), §4). El SRS exige mostrar el reloj simulado (FR-SIM-03), permitir replay (FR-RPL-01) y fijar latencia, retención y tiempo (NFR-PERF-01, NFR-RET-01, NFR-USA-01).

El sistema tiene, de hecho, dos relojes: el real, que gobierna la publicación, la latencia y la salud de las fuentes, y el simulado, que gobierna la operación cuando `simulated=true`. La documentación los menciona, pero no define cuál manda en cada cálculo.

#### Problema

- No hay una autoridad de reloj explícita: no se sabe si el tiempo simulado lo posee el simulador, el servidor o la fuente.
- `occurredAt` puede ser simulado o real, pero el envelope no declara el dominio temporal de forma inequívoca; `simulated` distingue el origen, no el uso de la marca de tiempo.
- La latencia p95 menor a 2 segundos no se puede medir contra `occurredAt` cuando el tiempo corre 60 veces más rápido.
- La retención de 7 días de telemetría y 30 días de eventos no dice si son días simulados o reales.
- Las alertas de chancador y camión usan minutos simulados; la de fuente sin señal usa segundos reales. Sin una regla común, el motor de alertas no es verificable.
- Pausa y replay introducen huecos, repeticiones y eventos que no deben generar alertas nuevas.
- El determinismo exige que el avance del simulador no dependa del reloj de pared ni del orden de llegada de los mensajes.

Sin esta decisión, NFR-PERF-01, NFR-RET-01 y FR-ALR-01 no tienen una interpretación única.

#### Opciones

| Opción | Descripción | A favor | En contra |
|---|---|---|---|
| **A. Doble reloj con dominios explícitos** | El origen posee el reloj de su dominio; el simulador posee el simulado y las fuentes reales el suyo. Cada cálculo declara si usa tiempo de evento o tiempo real. | Conserva la aceleración, el replay y los adaptadores; permite medir latencia real y ordenar por tiempo de evento. | Más campos, más reglas y una UI que debe mostrar ambos relojes. |
| **B. Reloj real único con desfase visual** | Todos los timestamps son reales; la hora simulada es solo una etiqueta o un offset de presentación. | Simple y con una sola línea de tiempo. | No representa un turno de 8 horas en 8 minutos sin reescribir tiempos; rompe el replay y el determinismo; las alertas en minutos simulados dejan de tener sentido. |
| **C. Reloj autoritativo del servidor** | El servidor asigna `occurredAt` al ingerir, con su propio reloj. | Una sola autoridad y orden único. | El simulador no puede operar sin servidor; las fuentes reales tienen su propio reloj; se confunde tiempo de evento con tiempo de ingesta; dificulta el replay y los adaptadores. |

#### Recomendación (propuesta)

Se propone adoptar la opción **A**: dos dominios temporales explícitos, con estas reglas.

| Cálculo | Dominio | Base |
|---|---|---|
| Orden de eventos, ciclos, KPIs, reconciliación y replay | Tiempo de evento | `occurredAt` |
| Latencia de pipeline, frescura, salud de fuentes y mensajes por segundo | Tiempo real | `sentAt` y `receivedAt` |
| Alertas | El que declare cada regla | `timeDomain` de la regla (ADR-014.2) |
| Retención | A confirmar | Propuesta: tiempo de evento, con una guarda de tiempo real y volumen |

1. **Autoridad.** Para eventos simulados, el simulador es dueño del reloj simulado. Avanza en pasos simulados fijos y no deriva su tiempo del reloj de pared. Para fuentes reales, el reloj de la fuente es la autoridad; el adaptador conserva su marca y registra la ingesta por separado. El servidor no reescribe `occurredAt`.
2. **Semántica del envelope.** `occurredAt` es el instante del hecho en el dominio de su fuente y es inmutable. `sentAt` es el instante real de publicación y también es inmutable. `receivedAt` es un campo del servidor, no del envelope, y registra la recepción real. `simulated` debe ser coherente con el `runId` y con la configuración de la corrida. La frecuencia de telemetría pertenece al mismo dominio: 1 Hz en una fuente simulada significa una muestra por segundo simulado; 1 Hz en una fuente real significa una muestra por segundo real. La UI puede remuestrear para graficar, pero no altera el dato persistido.
3. **Contexto de reloj.** La época, la escala y el `runId` se registran en los metadatos de la corrida (ADR-011), no se infieren de cada mensaje. El envelope v2 incorpora `runId` (ADR-009); la escala se consulta en `simulation_runs`.
4. **Prohibición de reescritura.** Ni el servidor ni la UI corrigen `occurredAt` para “acomodar” el orden. Una corrección de un hecho es un evento nuevo, no una edición del anterior.
5. **Latencia.** Se calcula como `receivedAt − sentAt`, en tiempo real. No se usa `occurredAt` para medir latencia de pipeline cuando la fuente es simulada y acelerada. Para fuentes reales puede reportarse además el retraso del evento (`receivedAt − occurredAt`), pero es una métrica distinta.
6. **Frescura y salud.** La frescura de una fuente se mide con tiempo real desde la última recepción o publicación. Una fuente simulada en pausa no es una fuente caída: la UI debe mostrar “pausado” y las reglas de salud deben suprimirse o marcarse como no aplicables.
7. **Alertas.** Cada regla declara su dominio temporal. Las reglas del backlog de chancador detenido, camión inactivo y desvío de plan usan tiempo simulado; la de fuente sin señal usa tiempo real; la de cola se evalúa sobre el estado del evento o una ventana declarada. El detalle queda en ADR-014.2.
8. **Retención.** Se almacenan ambos tiempos. La política debe declarar su dominio. La propuesta es retener por `occurredAt` para replay y reconciliación (7 días de telemetría y 30 días de eventos en tiempo de evento), con una guarda por tiempo real y por volumen de disco. El valor definitivo de NFR-RET-01 queda TBD.
9. **Pausa.** Al pausar se detiene el reloj simulado: no se emiten eventos, `occurredAt` no avanza y el hueco de `sentAt` es esperado. Al reanudar se continúa la misma corrida, sin una ráfaga de recuperación salvo que se configure explícitamente.
10. **Replay.** Es de solo lectura. No publica en MQTT, no escribe eventos, no crea alertas nuevas y no altera las proyecciones vivas. Ordena por el tiempo de evento persistido y la UI marca claramente el modo replay y la corrida original. Si se necesitan alertas, se muestran las alertas persistidas, no se vuelven a emitir.
11. **Mezcla de dominios.** En el MVP, los hechos de un turno provienen de un solo dominio: todo simulado o todo real. Mezclar fuentes sintéticas y reales en el mismo turno queda fuera de alcance hasta que exista una regla de convivencia.

#### Consecuencias

**A favor**

- La latencia, la frescura y la retención tienen una interpretación verificable.
- El replay y la reconciliación comparten un mismo orden temporal.
- Los adaptadores reales pueden conservar su reloj y convivir con el simulador.
- Las alertas dejan de mezclar unidades temporales por accidente.

**Costos y riesgos**

- El envelope y la UI deben exponer dos tiempos; si solo se muestra uno, el usuario se confunde.
- El motor de alertas necesita `timeDomain` por regla y pruebas específicas.
- La retención debe resolver una ambigüedad del NFR; hasta confirmarla, el dimensionamiento de disco es provisional.
- Una pausa mal tratada puede generar alertas falsas de “fuente sin señal”.
- El manejo del reloj agrega complejidad al simulador y a la API de la corrida.
- Si 1 Hz se interpreta en tiempo simulado y la aceleración es 1:60, el caudal real de telemetría puede superar el NFR-PERF-02 de 100 msg/s sostenidos. Hay que confirmar si el NFR se mide en mensajes reales o en muestras simuladas, o ajustar la frecuencia, la aceleración o el lote de publicación.

Mitigaciones: reloj dual visible, etiquetas “simulado” y “real” en las vistas, pruebas de pausa/replay, y una regla explícita de supresión de salud durante la pausa.

#### Requisitos relacionados

- **FR-SIM-03:** mostrar el reloj simulado y distinguirlo del real.
- **FR-SIM-04:** publicar telemetría a 1 Hz y eventos con `simulated=true`.
- **FR-ALR-01:** generar y limpiar alertas con hora y contexto.
- **FR-RPL-01:** reconstruir una ventana sin alterar los datos originales.
- **FR-DF-02:** mostrar latencia y frescura por fuente.
- **FR-TWIN-01:** actualizar el estado en menos de 5 segundos.
- **NFR-PERF-01:** latencia p95 menor a 2 segundos desde MQTT hasta la UI.
- **NFR-RET-01:** retención de 7 días de telemetría y 30 días de eventos.
- **NFR-USA-01:** UTC, zona del navegador y reloj simulado visible.
- **NFR-DET-01:** misma semilla y configuración, mismo turno.
- **NFR-OBS-01:** salud por fuente y errores registrados.

#### Componentes C4 previstos

- `apps/simulator`: reloj simulado y avance determinista.
- `apps/server` (Ingesta): `receivedAt`, validación y correlación de tiempos.
- `apps/server` (Gemelo): evaluación de alertas con dominio temporal.
- `apps/server` (API y WebSocket): exposición de hora simulada y real.
- `apps/web`: reloj dual, modo pausa y modo replay.
- `packages/domain`: tipos de tiempo, dominio temporal y utilidades de ventana.
- `packages/db`: columnas e índices para `occurredAt`, `sentAt` y `receivedAt`.

#### Preguntas abiertas

- ¿La retención de NFR-RET-01 se expresa en tiempo simulado o real? ¿Se necesitan ambas?
- ¿Qué escalas de aceleración se permiten además de 1:60? ¿Se admite escala variable dentro de una corrida?
- ¿1 Hz se refiere a segundos reales o simulados para efectos del throughput y del NFR-PERF-02?
- ¿La época simulada es fija o configurable por turno? ¿Se reinicia en cada turno?
- ¿La UI muestra ambos relojes siempre o solo cuando `simulated=true`?
- ¿Se permite mezclar fuentes simuladas y reales en un mismo turno en una fase posterior?
- ¿Las alertas se evalúan durante la pausa y durante el replay, o solo se muestran las persistidas?
- ¿Se añaden `runId`, `clockScale` y `timeDomain` al envelope v2 o se consultan en la corrida?

---

### ADR-009 — Identidad y orden de eventos

| Campo | Valor |
|---|---|
| ID | ADR-009 |
| Estado | Propuesto |
| Fecha | 22 de octubre de 2026 |
| Brecha | P0-02 |
| Ámbito | Identidad, deduplicación, orden y late events |

#### Contexto

El envelope define `eventId` como UUID para deduplicación, pero no define `runId`, `seq` ni una clave de orden ([02 — Arquitectura](02-arquitectura.md), §5.1). Los tópicos MQTT separan telemetría por equipo y eventos por tipo, con QoS 1 ([02 — Arquitectura](02-arquitectura.md), §5.2). El backlog prevé deduplicar por `eventId` ([03 — Backlog](03-backlog.md), F3) y el SRS exige validar, deduplicar y persistir (FR-SIM-05), reconstruir el estado (FR-TWIN-02) y reproducir el mismo turno (FR-SIM-02, NFR-DET-01).

QoS 1 garantiza entrega al menos una vez, no exactamente una vez. Un mensaje puede duplicarse en una reconexión, y el orden solo se preserva por tópico y por cliente mientras la conexión es estable. El servidor recibe varios tópicos y no puede suponer un orden global.

#### Problema

- `eventId` identifica, pero no ordena. Sin una secuencia por equipo o fuente, no se detectan huecos ni eventos fuera de orden.
- La deduplicación en memoria se pierde al reiniciar el servidor; una repetición posterior vuelve a contar el mismo ciclo.
- Los eventos de un camión llegan por tópicos distintos; el orden entre tópicos no está garantizado.
- Un evento tardío puede emparejar mal un ciclo y contaminar KPIs ya calculados.
- El replay y la prueba de determinismo necesitan un orden canónico reproducible, independiente del orden de llegada.
- No está definido qué garantiza MQTT y qué debe garantizar el consumidor.

Sin esta decisión, FR-SIM-05, FR-TWIN-03 y NFR-DET-01 no se pueden verificar de forma estable.

#### Opciones

| Opción | Descripción | A favor | En contra |
|---|---|---|---|
| **A. Identidad de productor + `seq` + dedup persistente + orden por evento** | El productor asigna `eventId` estable y `seq` por flujo; el servidor deduplica en base de datos y ordena por `occurredAt` con desempate. | Idempotencia real, detección de huecos, replay determinista y tolerancia a duplicados. | Más campos en el contrato, índices únicos y una ventana de reordenamiento. |
| **B. Orden asignado en la ingesta** | El servidor asigna un número de llegada y ordena por él. | Simple y sin cambios de contrato. | El orden depende de la red y de la reconexión; no es reproducible; no detecta huecos; el replay puede diferir del vivo. |
| **C. Confiar en MQTT y deduplicar en memoria** | Se asume que QoS 1 y el orden por tópico bastan; se guarda una caché de IDs vistos. | Mínimo esfuerzo inicial. | Los duplicados tras reinicio y los eventos entre tópicos rompen ciclos y KPIs; no cumple determinismo ni recuperación. |

#### Recomendación (propuesta)

Se propone adoptar la opción **A**, con este contrato mínimo.

1. **Identidad.** `eventId` es un UUID generado por el productor en el momento de crear el hecho y se conserva en todos los reintentos. Se propone UUIDv7 por su orden temporal aproximado, sujeto a confirmación de la biblioteca. `eventId` es la clave global de idempotencia.
2. **Corrida.** `runId` identifica una ejecución del simulador (ADR-011). Es obligatorio para eventos simulados y permite separar secuencias cuando el simulador se reinicia. Para fuentes reales, el adaptador puede usar el identificador de sesión de conexión como `runId`.
3. **Secuencia.** `seq` es un entero positivo, monótono y sin huecos intencionales, por par `(runId, streamId)`. `streamId` es el equipo para telemetría (`equipmentId`) y la fuente o agregado para eventos. Empieza en 1, incrementa en 1 por mensaje publicado y se reutiliza si el mensaje se reintenta. Un hueco es una señal de pérdida, no un error de orden.
4. **Envelope v2.** Se propone `eventVersion: 2` con `runId` y `seq` obligatorios para el simulador, y `streamId` cuando no se pueda derivar del tópico. Como no hay datos persistidos todavía, el MVP puede nacer en v2 sin migración. La compatibilidad con v1 queda como pregunta abierta.
5. **Deduplicación persistente.** La tabla de eventos tiene índice único por `eventId`; la telemetría tiene además índice único por `(runId, streamId, seq)`. La escritura es “insertar primero”: si el evento ya existe, se confirma y se ignora, y se incrementa una métrica de duplicados. Si el mismo `eventId` llega con payload distinto, se conserva el primero y se registra una alerta de calidad. La deduplicación debe sobrevivir reinicios y cubrir, al menos, la ventana de retención de eventos.
6. **Orden canónico.** El orden de dominio es `(occurredAt, streamId, seq, eventId)`. Para una proyección global se antepone `source`. `sentAt` y `receivedAt` no ordenan hechos de dominio; solo miden latencia.
7. **Tolerancia a tarde.** El procesamiento en vivo usa una ventana de reordenamiento configurable (valor TBD). Un evento que llega dentro de la ventana se aplica en orden. Uno que llega después se persiste, se marca como tardío y no reescribe el estado vivo; se incluye en el cierre del turno y en la recomputación de las proyecciones afectadas. La política exacta de recomputación es TBD.
8. **Huecos.** La ingesta compara `seq` con el último visto del flujo. Un hueco incrementa una métrica de calidad y afecta la salud de la fuente; no bloquea los eventos posteriores.
9. **Alcance de MQTT.** MQTT garantiza QoS 1 (al menos una vez), no exactly-once; preserva orden por tópico y cliente mientras la conexión es estable, no entre tópicos, reconexiones o publicadores; los mensajes retenidos no son un log. Por tanto, la idempotencia y el orden los garantiza el consumidor, no el broker.
10. **Replay.** Lee de la base y aplica el mismo orden canónico. No depende de MQTT ni del orden de llegada original.
11. **Adaptadores reales.** Si una fuente no trae `seq`, el adaptador lo asigna por sesión y lo documenta en su contrato (P1-01). No se inventa una secuencia global de sitio.

#### Consecuencias

**A favor**

- Duplicados y reintentos no inflan ciclos ni tonelaje.
- El servidor detecta pérdidas y puede explicar huecos en la vista de flujo.
- El replay y la reconciliación usan un orden reproducible.
- La prueba de determinismo compara secuencias, no llegadas.

**Costos y riesgos**

- El contrato de eventos cambia a v2 y exige coordinación entre simulador e ingesta.
- Los índices únicos y la ventana de reordenamiento agregan complejidad y carga.
- Un evento tardío puede obligar a recomputar proyecciones; el costo debe acotarse.
- Una fuente real sin secuencia requiere una regla de adaptación explícita.
- La ventana de reordenamiento es un parámetro nuevo que debe fijarse con el docente/equipo.

#### Requisitos relacionados

- **FR-SIM-04:** publicar telemetría y eventos con el envelope versionado.
- **FR-SIM-05:** validar, deduplicar y persistir; rechazar inválidos sin incorporarlos al estado.
- **FR-TWIN-02:** reconstruir el estado desde la base al reiniciar.
- **FR-TWIN-03:** proyectar ciclos y calcular KPIs.
- **FR-RPL-01:** reconstruir una ventana desde el histórico.
- **NFR-DET-01:** misma semilla y configuración, misma secuencia y KPIs.
- **NFR-REC-01:** no perder eventos persistidos y reconstruir el estado.
- **NFR-PERF-02:** sostener 100 msg/s y ráfagas de 1 000/s sin perder eventos válidos.

#### Componentes C4 previstos

- `apps/simulator`: generación de `eventId`, `runId` y `seq`.
- `apps/server` (Ingesta): validación, deduplicación, detección de huecos y ventana de reordenamiento.
- `packages/db`: índices únicos en `events` y `telemetry`, y registro de duplicados.
- `apps/server` (Gemelo): aplicación ordenada y recomputación de proyecciones.
- `apps/server` (API): replay en orden canónico.
- `packages/domain`: tipos de identidad y orden, y pruebas de secuencia.

#### Preguntas abiertas

- ¿UUIDv4 o UUIDv7? ¿La biblioteca elegida garantiza orden temporal?
- ¿`seq` es por equipo, por fuente o por tópico? ¿Qué pasa con un equipo que publica telemetría y eventos?
- ¿Qué valor tiene la ventana de reordenamiento y qué se hace con un evento más tardío?
- ¿Se persiste el evento tardío y se recomputa, o se descarta del estado vivo?
- ¿La telemetría usa `eventId` además de `(runId, streamId, seq)`?
- ¿Se acepta `eventVersion: 1` en el MVP o se exige v2 desde el inicio?
- ¿Cuánto tiempo se conserva la deduplicación y qué pasa si un evento reaparece después de la retención?
- ¿Cómo asigna `seq` un adaptador real que no lo provee?
- ¿Qué `runId` y qué `seq` usan los eventos emitidos por el servidor, como `plan.published` o los hitos administrativos?

---

### ADR-010 — Fuente de verdad: eventos, tablas y proyecciones

| Campo | Valor |
|---|---|
| ID | ADR-010 |
| Estado | Propuesto |
| Fecha | 22 de octubre de 2026 |
| Brecha | P0-03 |
| Ámbito | Persistencia, proyecciones y derivados |

#### Contexto

La arquitectura define tablas para eventos, telemetría, ciclos, KPIs, alertas, salud de fuentes y métricas del pipeline ([02 — Arquitectura](02-arquitectura.md), §6). También incluye `kpi.snapshot`, `alert.raised`, `alert.cleared` y `data_source.health` entre los eventos principales ([02 — Arquitectura](02-arquitectura.md), §5.3). El SRS exige reconstruir el estado (FR-TWIN-02), calcular KPIs (FR-TWIN-03), reconciliar (FR-REC-01) y conservar alertas (FR-ALR-01).

No está definido qué dato es la verdad, qué es una proyección reconstruible y qué derivado puede volver al bus. Sin esa separación, un KPI calculado puede ingresar como evento y volver a contarse; una alerta puede realimentar su propia regla; y una corrección puede dejar la base y el gemelo en desacuerdo.

#### Problema

- ¿Los eventos son la verdad y las tablas son vistas, o al revés?
- ¿La telemetría es un hecho inmutable o una proyección de eventos?
- ¿Los KPIs se calculan desde eventos o se leen de una tabla que puede estar desactualizada?
- ¿Qué pasa con `kpi.snapshot`, `alert.*` y `data_source.health`? ¿Se publican en MQTT? ¿Se consumen?
- ¿Cómo se reconstruye el estado después de un reinicio sin duplicar ciclos?
- ¿El plan y la configuración son eventos o datos maestros?
- ¿Cómo se evita el doble conteo entre telemetría y eventos?

#### Opciones

| Opción | Descripción | A favor | En contra |
|---|---|---|---|
| **A. Hechos event-sourced + datos maestros + proyecciones** | Los eventos operacionales y la telemetría son la verdad; la configuración y el plan son datos maestros versionados; ciclos, KPIs, alertas y salud son proyecciones. | Reconstruible, auditable y coherente con event-driven; evita bucles si los derivados no vuelven a la ingesta. | Más trabajo de proyección y de recomputación; hay que definir bien qué es maestro y qué es derivado. |
| **B. Tablas como verdad, eventos como transporte** | Las tablas de estado y KPIs son la fuente; los eventos solo notifican. | Consultas simples y menos recomputación. | El replay y la reconstrucción quedan ambiguos; una tabla mutada pierde la historia; el determinismo no se puede probar. |
| **C. Event sourcing puro para todo** | También la configuración, el plan y las reglas son eventos. | Historia completa y consistencia total. | Sobrecarga para un MVP local; complica la edición de datos maestros y no aporta al alcance. |

#### Recomendación (propuesta)

Se propone adoptar una variante de **A**: hechos operacionales event-sourced, datos maestros versionados y proyecciones reconstruibles. La tabla siguiente resume la autoridad propuesta para cada grupo.

| Dato | Autoridad | Naturaleza | ¿Reconstruible? |
|---|---|---|---|
| Hechos operacionales (`truck.loaded`, `crusher.downtime_started`, etc.) | Tabla `events` | Log append-only inmutable | Es la fuente; no se reconstruye desde otra tabla |
| Telemetría y muestras del chancador | `telemetry`, `crusher_samples` | Mediciones append-only | No se reconstruyen desde eventos; se conservan como medida original |
| Sitio, equipos, rutas, destinos y frentes | Tablas maestras vía API | Configuración versionada | Sí, desde migraciones, seed e historial de cambios |
| Plan y metas | `plans` / `plan_targets` | Versiones inmutables (ADR-012) | Sí, desde las versiones publicadas |
| Turnos y corridas | `shifts`, `simulation_runs` | Registros operacionales | Sí, desde eventos y configuración |
| Ciclos | `cycles` | Proyección | Sí, desde eventos en orden canónico |
| KPIs | `kpi_snapshots` | Derivado; oficial al cierre | Sí, desde eventos y versión de fórmula |
| Alertas | `alerts` | Derivado con historia inmutable | Sí, desde hechos y versión de regla |
| Salud y métricas del pipeline | `data_sources`, `data_flow_metrics` | Derivado de la ingesta | No es histórico de negocio; se reinicia con el servidor |
| Estado en memoria del gemelo | Ninguna tabla | Caché | Sí, desde la base |

Reglas de la recomendación:

1. **Los hechos operacionales entran solo por la ingesta.** Los hechos administrativos (plan, turno, corrida) entran por la API y se registran en sus tablas; su notificación es un evento, no la edición de la tabla.
2. **Los derivados no vuelven a la ingesta.** `kpi.snapshot`, `alert.raised`, `alert.cleared` y `data_source.health` no se publican en el MQTT operacional del MVP. Se entregan a la UI por WebSocket o API. Si en el futuro se publican para integraciones, usan un espacio de tópicos separado, llevan `derived=true` y `origin=server`, y la ingesta los filtra explícitamente. Si esta propuesta se acepta, la lista de eventos de [02 — Arquitectura](02-arquitectura.md), §5.3, debe separar hechos de derivados.
3. **`data_source.health` no es un evento de fuente.** Es una proyección calculada por el servidor a partir de la ingesta. Si una fuente quiere reportar latido, emite `source.heartbeat` (evento nuevo propuesto); la salud la sigue calculando el servidor.
4. **KPIs en vivo y KPIs oficiales.** Los snapshots en vivo son provisionales y se pueden recalcular. Los KPIs oficiales del turno se calculan al cierre desde el log de eventos, con una versión de fórmula registrada, y quedan inmutables.
5. **Ciclos desde eventos, no desde telemetría.** Un ciclo se deriva de `truck.queued`, `truck.loading_started`, `truck.loaded`, `truck.hauling_started`, `truck.dumped` y `truck.returning`. La telemetría sirve para posición, velocidad, estado y salud; no para contar tonelaje.
6. **Tonelaje desde eventos de carga y descarga.** No se suma telemetría y evento a la vez. Si la báscula es la fuente, su evento es el hecho; la telemetría no se usa como sustituto.
7. **Reconstrucción.** Al reiniciar: cargar datos maestros, leer el log en orden canónico, reconstruir el estado en memoria y recalcular las proyecciones que falten. Las proyecciones se pueden borrar y reconstruir; el log y la telemetría no.
8. **Escrituras idempotentes.** Las proyecciones usan claves deterministas y `upsert`; una recomputación no duplica ciclos, alertas ni snapshots.

#### Consecuencias

**A favor**

- Hay una respuesta única a “¿de dónde sale este número?”.
- El replay, la reconstrucción y la reconciliación comparten la misma fuente.
- Se elimina el riesgo de que un KPI o una alerta se reingieran y se cuenten dos veces.
- La telemetría y los eventos tienen roles distintos y no compiten.

**Costos y riesgos**

- Las proyecciones requieren recomputación y pruebas de consistencia.
- El cierre de turno es más costoso que leer una tabla ya calculada.
- La vista de flujo de datos debe explicar etapas internas aunque no haya eventos MQTT para ellas.
- Si se necesita integración externa de KPIs o alertas, habrá que abrir un canal separado.
- La autoridad del plan y de la configuración debe reflejarse en la API y en la UI.

#### Requisitos relacionados

- **FR-TWIN-02:** reconstruir el estado desde la base.
- **FR-TWIN-03:** proyectar ciclos y calcular KPIs.
- **FR-REC-01:** calcular cumplimiento plan vs real.
- **FR-REC-02:** cerrar el turno y dejar retroalimentación.
- **FR-ALR-01:** generar, limpiar y conservar alertas.
- **FR-RPL-01:** reproducir una ventana desde el histórico.
- **FR-DF-02:** mostrar métricas y frescura por conexión.
- **NFR-DET-01:** reproducibilidad de la secuencia y los KPIs.
- **NFR-REC-01:** recuperación ante reinicio.
- **NFR-RET-01:** retención de telemetría y eventos.
- **NFR-OBS-01:** salud y errores observables.

#### Componentes C4 previstos

- `apps/server` (Ingesta): única puerta de hechos operacionales.
- `apps/server` (Gemelo): proyecciones, KPIs en vivo y alertas.
- `apps/server` (Reconciliación): KPIs oficiales al cierre.
- `apps/server` (API y WebSocket): lectura de proyecciones y entrega de derivados.
- `packages/db`: esquema, índices y repositorios; separación entre log, maestros y proyecciones.
- `packages/domain`: claves de proyección y reglas de reconstrucción.

#### Preguntas abiertas

- ¿Las alertas son proyecciones con historia o hechos inmutables? La propuesta es proyección con historia.
- ¿Se necesita publicar algún derivado en MQTT para la vista de flujo o para integraciones futuras?
- ¿Cómo se versiona una fórmula de KPI y qué pasa con los snapshots calculados con una versión anterior?
- ¿Cuál es el tiempo objetivo de reconstrucción tras un reinicio? NFR-REC-01 lo deja TBD.
- ¿Los cambios de datos maestros (equipos, rutas, frentes) también se registran como eventos de auditoría?
- ¿La telemetría se deduplica por `eventId` o por `(runId, streamId, seq)`?
- ¿Se permite borrar y reconstruir proyecciones en caliente durante una demo?

---

### ADR-011 — Ciclo de vida del turno y de la corrida

| Campo | Valor |
|---|---|
| ID | ADR-011 |
| Estado | Propuesto |
| Fecha | 22 de octubre de 2026 |
| Brecha | P0-04 |
| Ámbito | Turnos, corridas, arranque, pausa y cierre |

#### Contexto

El alcance fija turnos de 8 horas y una aceleración configurable ([01 — Alcance](01-alcance-mvp.md), §6). La arquitectura define las tablas `shifts` y `events` con `shift.started` y `shift.ended` ([02 — Arquitectura](02-arquitectura.md), §5.3 y §6). El backlog pide un turno completo, escenarios y cierre con reconciliación ([03 — Backlog](03-backlog.md), F2 y F5). El SRS exige publicar el plan y que el simulador lo consuma (FR-PLAN-02), generar el turno (FR-SIM-01), reproducirlo (FR-SIM-02), mostrar el reloj (FR-SIM-03) y cerrar con retroalimentación (FR-REC-02).

No está definido quién crea el turno, quién emite `shift.started` y `shift.ended`, cómo se relacionan `shiftId` y `runId`, qué pasa al reiniciar el simulador, si se pueden encadenar turnos o quién posee la semilla, el escenario y la aceleración.

#### Problema

- Sin un ciclo de vida explícito, el cierre del turno y la reconciliación no tienen un disparador único.
- `shift.started` y `shift.ended` pueden ser emitidos por el servidor, por el simulador o por una fuente real, con semánticas distintas.
- Un reinicio del simulador puede crear eventos duplicados o perder la continuidad del turno.
- No se sabe si un turno puede tener varias corridas ni cómo se reconcilian.
- La semilla, el escenario y la aceleración no tienen dueño ni momento de fijación; sin eso, el determinismo no es verificable.
- No está definido qué pasa si se pausa, se aborta o se cambia la aceleración a mitad de turno.
- El multi-turno y el encadenamiento no están en el alcance, pero tampoco están explícitamente fuera.

#### Opciones

| Opción | Descripción | A favor | En contra |
|---|---|---|---|
| **A. Servidor dueño del turno; simulador dueño de la corrida y del reloj** | El servidor crea y cierra el turno; el simulador ejecuta una corrida, posee el reloj y emite los hitos operacionales. | Separación clara, reconstruible, compatible con fuentes reales y con el reloj de ADR-008. | Más estados, comandos y validaciones entre procesos. |
| **B. Simulador dueño de todo** | El simulador crea el turno, emite los eventos y cierra. | Demo simple y autónoma. | El servidor no puede validar ni cerrar; no encaja con FMS/SCADA reales; la reconciliación queda dentro del simulador. |
| **C. Planificador externo dueño del turno** | Un sistema externo crea turnos y el gemelo solo observa. | Modelo realista para una mina. | Fuera del alcance local-first del MVP; agrega una dependencia que no existe. |

#### Recomendación (propuesta)

Se propone adoptar la opción **A**, con dos entidades y dos máquinas de estado.

| Entidad | Identidad | Dueño | Contenido |
|---|---|---|---|
| **Turno** (`Shift`) | `shiftId` (UUID) | Servidor | Sitio, ventana planificada en tiempo simulado, estado, plan base, corridas asociadas |
| **Corrida** (`SimulationRun`) | `runId` (UUID) | Simulador, registrada por el servidor | `shiftId`, semilla, escenario, aceleración, versión de configuración, época del reloj, estado, inicio y fin reales |

Estados propuestos:

- **Turno:** `scheduled → active → closing → closed`; `cancelled` desde `scheduled` o `active`.
- **Corrida:** `created → running ↔ paused → completed`, con salidas a `failed` o `aborted`.

Reglas de la recomendación:

1. **Creación del turno.** El servidor crea el turno cuando el planificador registra la ventana y el plan inicial, antes de publicarlo, o por una acción explícita de la API. La publicación del plan referencia el turno; no lo crea implícitamente. Hay un solo turno activo por sitio en el MVP.
2. **Arranque de la corrida.** Un usuario o un guion de demo inicia la corrida indicando `planVersion`, semilla, escenario y aceleración. El servidor valida que el plan esté publicado y que el turno exista, crea el registro de corrida y envía el comando de arranque al simulador.
3. **Emisión de hitos.** El simulador, como dueño del reloj simulado, emite `shift.started` al llegar a la hora de inicio y `shift.ended` al llegar a la hora de fin. El servidor los valida contra la ventana y los persiste. En una integración real, el FMS o el sistema de operaciones emite los mismos hitos; el contrato es “lo emite quien posee el reloj operacional”, no un proceso fijo.
4. **Metadatos de corrida.** Antes de operar, el simulador emite `sim.run_started` (evento nuevo propuesto) con `runId`, `shiftId`, semilla, escenario, aceleración, versión y hash de configuración, época del reloj y `planVersion`. El servidor lo persiste en `simulation_runs`. Este evento es la evidencia de reproducibilidad.
5. **Cierre.** Al recibir `shift.ended`, el servidor pasa el turno a `closing`, espera una ventana de gracia para eventos tardíos (ADR-009), ejecuta la reconciliación, congela los KPIs oficiales y marca el turno como `closed`. La retroalimentación para el siguiente plan referencia el turno cerrado (FR-REC-02).
6. **Pausa y reanudación.** Pausar detiene el reloj simulado y no emite eventos. Reanudar continúa la misma corrida y el mismo `runId`. Cambiar la aceleración, la semilla o el escenario durante la corrida no está permitido en el MVP: exige una corrida nueva.
7. **Reinicio.** Si se reinicia el servidor, el simulador puede seguir corriendo; el servidor reconstruye su estado desde la base y retoma el consumo. Si se reinicia el simulador, se crea una corrida nueva para el mismo turno, con `runId` nuevo y `seq` reiniciado; la reconciliación incluye todas las corridas del turno. La política de reanudación exacta del reloj (desde el último evento o desde el inicio del turno) queda TBD.
8. **Multi-turno.** El MVP soporta turnos secuenciales, sin solapamiento y con una corrida activa por turno. La operación continua de varios turnos sin reiniciar el simulador queda TBD y no se asume en el alcance.
9. **Aborto.** Abortar termina la corrida como `aborted`. El turno puede cerrarse como incompleto o cancelarse; la política de negocio es TBD.
10. **Replay.** No es una corrida. Es una vista de solo lectura sobre datos persistidos (ADR-008) y no crea `runId`, no emite hitos ni altera el turno.

#### Consecuencias

**A favor**

- El cierre del turno tiene un disparador y un responsable claros.
- La relación turno/corrida permite reinicios sin perder la reconciliación.
- La semilla, el escenario y la aceleración quedan registrados y son auditables.
- El contrato de hitos es compatible con fuentes reales.

**Costos y riesgos**

- Hay más estados y comandos que en una demo monolítica.
- La ventana de gracia y el cierre deben coordinarse con ADR-009 y ADR-012.
- Un simulador que se reinicia a mitad de turno obliga a reconciliar varias corridas.
- La pausa y el cambio de velocidad son fuentes de confusión si la UI no los muestra.
- El contrato de arranque y parada necesita definirse en P1-01.

#### Requisitos relacionados

- **FR-PLAN-02:** publicar el plan y emitir `plan.published`.
- **FR-SIM-01:** generar un turno sintético completo.
- **FR-SIM-02:** reproducir el mismo turno con la misma semilla y configuración.
- **FR-SIM-03:** mostrar el reloj simulado y la aceleración.
- **FR-REC-02:** cerrar el turno y dejar retroalimentación.
- **FR-TWIN-02:** reconstruir el estado al reiniciar.
- **NFR-DET-01:** determinismo por semilla y configuración.
- **NFR-REC-01:** recuperación ante reinicio.
- **NFR-CAP-01:** un turno de 8 horas con la flota base.

#### Componentes C4 previstos

- `apps/server` (API): creación y cierre de turnos, comandos de corrida.
- `apps/server` (Ingesta): recepción y validación de `shift.*` y `sim.run_started`.
- `apps/server` (Reconciliación): cierre y congelamiento de KPIs.
- `apps/simulator`: máquina de estados de la corrida, reloj y emisión de hitos.
- `packages/db`: `shifts`, `simulation_runs` y relación con eventos.
- `apps/web`: control de arranque, pausa, reanudación y visualización del estado.

#### Preguntas abiertas

- ¿Quién emite `shift.started` y `shift.ended` en el MVP: el simulador o el servidor? La propuesta es el simulador, por ser dueño del reloj.
- ¿La ventana del turno es fija (por ejemplo, tres turnos de 8 horas por día) o configurable?
- ¿Quién puede iniciar, pausar o abortar una corrida? En el MVP no hay autenticación.
- ¿Se permite cambiar la aceleración a mitad de turno? La propuesta es no.
- ¿Qué pasa con el reloj si se reinicia el simulador a mitad de turno: continúa desde el último evento o reinicia la ventana?
- ¿Un turno puede tener varias corridas activas a la vez? La propuesta es no.
- ¿Cómo se cierra un turno incompleto o abortado?
- ¿Cuánto dura la ventana de gracia para eventos tardíos antes de cerrar?
- ¿El multi-turno continuo entra en el MVP o queda explícitamente fuera?

---

### ADR-012 — Versionado del plan y reconciliación

| Campo | Valor |
|---|---|
| ID | ADR-012 |
| Estado | Propuesto |
| Fecha | 22 de octubre de 2026 |
| Brecha | P0-05 |
| Ámbito | Plan, cambios a mitad de turno y baseline de reconciliación |

#### Contexto

El planificador crea y ajusta el plan de turno, y el sistema lo publica para que el simulador lo consuma ([01 — Alcance](01-alcance-mvp.md), §3; FR-PLAN-01 y FR-PLAN-02). La arquitectura define `plans`, `plan_targets` y `assignments` ([02 — Arquitectura](02-arquitectura.md), §6) y el evento `plan.published`. La reconciliación compara plan vs real por turno, frente y destino (FR-REC-01) y alimenta el siguiente plan (FR-REC-02).

El alcance permite ajustar el plan, pero no define qué versión es la referencia cuando hay cambios a mitad de turno. Sin esa regla, el cumplimiento puede calcularse contra un plan que ya no estaba vigente, o contra un plan modificado después de los hechos.

#### Problema

- ¿El plan es mutable o inmutable una vez publicado?
- ¿Qué pasa si el planificador cambia metas o asignaciones a mitad de turno?
- ¿La reconciliación usa el plan del inicio, el último plan o una mezcla por tramos?
- ¿Cómo se demuestra qué plan estaba vigente cuando ocurrió un evento?
- ¿Se puede editar un plan después del cierre del turno?
- ¿Las asignaciones de flota forman parte del plan o son una entidad separada?
- ¿Cómo se reproduce un turno si el plan cambió?

#### Opciones

| Opción | Descripción | A favor | En contra |
|---|---|---|---|
| **A. Versiones inmutables + plan base del turno** | Cada publicación crea una versión inmutable; la reconciliación oficial usa la versión vigente al inicio del turno y los ajustes se muestran aparte. | Auditable, determinista y simple de explicar; conserva la historia. | Los ajustes a mitad de turno no cambian el cumplimiento oficial; puede percibirse como rígido. |
| **B. Plan mutable** | El plan se edita y se sobrescribe; la reconciliación usa siempre el último. | Simple para el usuario. | Se pierde la historia; el mismo turno puede dar resultados distintos; no es reproducible. |
| **C. Plan congelado por turno** | No se permiten cambios después de publicar; los ajustes van al siguiente turno. | Máxima claridad y determinismo. | No cubre la adaptación operativa que el alcance insinúa; el planificador no puede corregir. |

#### Recomendación (propuesta)

Se propone adoptar la opción **A**, con estas reglas.

1. **Identidad.** `planId` es estable para el turno; `planVersion` es un entero que empieza en 1 y crece con cada publicación. Cada versión tiene `publishedAt` (tiempo real), `effectiveFrom` (tiempo simulado) y `supersedes` (versión anterior).
2. **Inmutabilidad.** Una versión publicada no se edita. Un cambio de metas, frentes o asignaciones crea una versión nueva. Una corrección de un error de captura también es una versión nueva, con su motivo.
3. **Vigencia.** En cada instante simulado hay una sola versión vigente: la de `effectiveFrom` más reciente que no supere ese instante. El simulador consume la versión vigente y `plan.published` incluye `planId`, `planVersion`, `effectiveFrom` y `supersedes`.
4. **Baseline oficial.** La reconciliación oficial del turno usa la versión vigente al inicio del turno, llamada **plan base**. Las versiones posteriores se registran, se muestran como “ajustes” y no modifican el cumplimiento oficial del MVP. La reconciliación segmentada por tramos, con metas normalizadas por tiempo, queda como alternativa TBD para una fase posterior.
5. **Cierre inmutable.** Al cerrar el turno se congelan el plan base, las versiones publicadas, la versión de fórmula de KPI y el punto de corte del log de eventos. El resultado de reconciliación es inmutable y referencia `planId`, `planVersion` base, `shiftId` y la marca temporal del cierre. No se edita un plan de un turno cerrado.
6. **Asignaciones.** La asignación camión–pala forma parte de la versión del plan (una instantánea por versión). Un cambio de asignación crea una versión nueva; no se muta la asignación histórica.
7. **Validación.** Antes de publicar se validan metas no negativas, frentes y destinos existentes, coherencia con la flota y ventana del turno. Las reglas exactas de validación quedan TBD.
8. **Reproducibilidad.** La corrida registra la versión base y las versiones publicadas durante el turno; la reconciliación referencia la versión base. Repetir el turno con la misma semilla, configuración y secuencia de versiones de plan debe dar el mismo resultado.

#### Consecuencias

**A favor**

- Se puede responder qué plan estaba vigente en cualquier instante.
- El cierre es auditable y reproducible.
- Los ajustes operativos no borran la historia.
- La reconciliación oficial es estable y comparable entre turnos.

**Costos y riesgos**

- El planificador debe entender que un ajuste no cambia el cumplimiento oficial del MVP.
- Hay más versiones y una UI que debe distinguir “plan base” de “ajuste vigente”.
- La reconciliación segmentada queda pendiente; si el docente la quiere, habrá que definir la normalización de metas.
- Las asignaciones versionadas agregan complejidad al formulario.

#### Requisitos relacionados

- **FR-PLAN-01:** crear y ajustar el plan de turno.
- **FR-PLAN-02:** publicar el plan y emitir `plan.published`.
- **FR-REC-01:** calcular cumplimiento por turno, frente y destino.
- **FR-REC-02:** cerrar el turno y dejar retroalimentación.
- **FR-SIM-02:** reproducir el mismo turno con la misma configuración.
- **NFR-DET-01:** misma semilla y configuración, mismo resultado.

#### Componentes C4 previstos

- `apps/server` (API): crear, validar y publicar versiones del plan.
- `apps/server` (Reconciliación): seleccionar el plan base y congelar el cierre.
- `apps/simulator`: consumir la versión vigente y registrar `planVersion`.
- `packages/db`: `plans`, `plan_targets`, `assignments` con versionado.
- `apps/web`: formulario de plan, historial de versiones y distinción base/ajuste.
- `packages/domain`: reglas de vigencia y validación.

#### Preguntas abiertas

- ¿La reconciliación oficial debe usar el plan base o la versión vigente en cada tramo? La propuesta es el plan base.
- Si se adopta la reconciliación segmentada, ¿cómo se normalizan las metas absolutas por tiempo?
- ¿Quién puede publicar un ajuste a mitad de turno? ¿Requiere aprobación?
- ¿La numeración de versiones se reinicia en cada turno?
- ¿Las asignaciones se versionan con el plan o tienen su propia línea temporal?
- ¿Cuál es la granularidad de `effectiveFrom` (minuto simulado, evento, inicio de turno)?
- ¿Se permite publicar un plan después de que el turno empezó pero antes del primer evento?
- ¿Qué pasa si un ajuste llega después del cierre? ¿Se rechaza o se registra como extemporáneo?

---

### ADR-013 — Punto de clasificación ore/waste

| Campo | Valor |
|---|---|
| ID | ADR-013 |
| Estado | Propuesto |
| Fecha | 22 de octubre de 2026 |
| Brecha | P0-06 |
| Ámbito | Material, rutas, destinos, metas y reconciliación |

#### Contexto

El alcance muestra una decisión ore/waste después del acarreo y antes del destino ([01 — Alcance](01-alcance-mvp.md), §2), y describe la descarga como “clasificación ore/waste y destino” (§2, tabla de etapas). También fija que no se modelan geología, leyes, dilución ni clasificación fina, solo tonelaje y clasificación ore/waste (§4 y §6). El plan tiene metas por frente y destino; la reconciliación compara por turno, frente y destino (FR-REC-01). El chancador recibe ore y el botadero recibe waste.

No está definido si la clasificación ocurre en el carguío, en la descarga o en un punto intermedio. La elección cambia la ruta, el destino, el momento en que se conoce el material, las metas y la forma de reconciliar.

#### Problema

- Si se clasifica en el carguío, el camión conoce su destino antes de salir y la ruta es directa.
- Si se clasifica en la descarga, el camión puede recorrer una ruta común y decidir al final; se necesita una báscula o un sensor que clasifique, y el alcance no incluye leyes ni calidad.
- La clasificación afecta las metas por frente y destino y el cálculo de ore/waste.
- Una reclasificación a mitad de ciclo o un camión mal dirigido pueden duplicar o perder tonelaje en la reconciliación.
- El diagrama del alcance puede leerse como clasificación en la descarga, aunque el modelo de datos no tiene una entidad de calidad.

#### Opciones

| Opción | Descripción | A favor | En contra |
|---|---|---|---|
| **A. Clasificación en el carguío** | El frente tiene un material declarado (ore o waste) en el plan; el camión se carga con ese material y conoce su destino antes de salir. | Determinista, simple, coherente con la ausencia de leyes; rutas y metas claras; no requiere sensor de calidad. | No modela clasificación por sensor ni errores de clasificación; depende de que el plan declare bien el frente. |
| **B. Clasificación en la descarga** | El camión acarrea y se clasifica al descargar, con báscula o sensor. | Se acerca a una operación con clasificación en destino. | Requiere datos de calidad que el MVP no tiene; la ruta y el destino quedan indefinidos hasta el final; complica metas y colas. |
| **C. Híbrida con reclasificación** | Se declara en el carguío y se permite reclasificar en la descarga con un evento de excepción. | Cubre errores y cambios de último momento. | Agrega un evento, reglas de corrección y riesgo de doble conteo; no es necesario para el alcance. |

#### Recomendación (propuesta)

Se propone adoptar la opción **A**, con estas reglas.

1. **Clasificación en el carguío.** El material (`ore` o `waste`) es un atributo del frente (`digUnit`); la versión del plan fija el material con el que se opera ese frente. El camión se carga con ese material y recibe su destino planificado antes de iniciar el acarreo.
2. **Eventos.** `truck.loaded` incluye `materialType`, `digUnitId`, tonelaje y destino planificado. `truck.dumped` incluye el destino real, el tonelaje descargado y el mismo `materialType`; no se reclasifica en el viaje.
3. **Rutas y destinos.** Ore va al chancador primario; waste va al botadero. La ruta se asigna en el carguío y no cambia en el ciclo. Un destino distinto es una excepción operativa, no una reclasificación.
4. **Báscula.** La báscula o el sensor de carga miden tonelaje; no cambian el material. La descarga registra el tonelaje de báscula; la carga conserva el tonelaje declarado como referencia. Cuál de los dos es el oficial para KPI y reconciliación se define en ADR-014.1 (TBD).
5. **Metas y reconciliación.** Las metas se expresan por frente y destino. La reconciliación usa el material declarado en el carguío y el destino real de la descarga; el ore y el waste se suman por separado y no se cuentan dos veces. Una diferencia entre destino planificado y real se muestra como desvío.
6. **Excepciones.** Si un camión descarga en un destino distinto al planificado, se registra el destino real y una marca de excepción; no se reescribe `truck.loaded`. La reconciliación oficial usa el hecho real y muestra la desviación. La política de corrección posterior es TBD.
7. **Un material por frente y versión.** En el MVP, un frente tiene un solo material por versión de plan. Si cambia, se publica una versión nueva (ADR-012). No se modelan cargas mezcladas ni stockpile ROM intermedio.
8. **Lectura del diagrama.** El rombo del alcance después del acarreo se interpreta como **selección de destino**, no como el acto de clasificación. La clasificación ocurre en el carguío. Si el docente prefiere clasificar en la descarga, esta ADR debe revisarse y el diagrama del documento 01 actualizarse en una pasada posterior.

#### Consecuencias

**A favor**

- El ciclo es determinista y fácil de simular.
- Las rutas y los destinos se conocen antes de salir, lo que simplifica el mapa y las colas.
- Las metas por frente y destino son coherentes con la clasificación.
- No se necesitan datos de leyes ni un sensor de calidad.

**Costos y riesgos**

- No se modelan errores de clasificación ni clasificación por sensor.
- La calidad del plan depende de que el frente esté bien declarado.
- Una reclasificación real obliga a una versión nueva o a una excepción.
- El diagrama del alcance puede inducir a error si no se aclara la lectura.

#### Requisitos relacionados

- **FR-SIM-01:** generar un turno con ore/waste y destino.
- **FR-TWIN-03:** proyectar ciclos y KPIs.
- **FR-CRU-01:** mostrar la alimentación del chancador.
- **FR-REC-01:** calcular cumplimiento por turno, frente y destino.
- **FR-PLAN-01:** planificar frentes, metas y destinos.
- **NFR-DET-01:** reproducibilidad del turno.

#### Componentes C4 previstos

- `packages/domain`: tipo de material, reglas de destino y validaciones.
- `apps/simulator`: asignación de material y destino en el carguío.
- `apps/server` (Ingesta): validación de coherencia entre material y destino.
- `apps/server` (Gemelo y Reconciliación): ciclos, tonelaje y desvíos.
- `apps/web`: mapa, panel de flota y plan vs real con ore/waste.
- `packages/db`: `dig_units`, `destinations` y eventos de carga/descarga.

#### Preguntas abiertas

- ¿Un frente puede tener más de un material en el mismo turno? La propuesta es no, salvo nueva versión de plan.
- ¿Se permite reclasificar una carga en la descarga? La propuesta es no en el MVP.
- ¿Cómo se trata una carga mezclada o un stockpile ROM intermedio? Fuera de alcance.
- ¿El botadero tiene capacidad limitada? No está en el alcance; queda TBD.
- ¿Se necesita un evento de excepción por destino incorrecto o basta la marca en `truck.dumped`?
- ¿Se actualiza el diagrama del documento 01 para aclarar que la clasificación ocurre en el carguío?
- ¿La clasificación debe ser auditable por frente y turno para la reconciliación?

---

### ADR-014 — Reglas de dominio pendientes: KPIs, alertas y simulador

| Campo | Valor |
|---|---|
| ID | ADR-014 |
| Estado | Propuesto |
| Fecha | 22 de octubre de 2026 |
| Brecha | P0-07 |
| Ámbito | Fórmulas de KPI, reglas de alerta, parámetros y escenarios |

#### Contexto

El backlog enumera KPIs y reglas de alerta sin fórmulas completas ([03 — Backlog](03-backlog.md), §3 y §4). El SRS deja abiertas las fórmulas de KPI y reconciliación (D-06), los parámetros del simulador (D-07) y los parámetros de los escenarios (D-11) ([04 — SRS](04-srs.md), §9). El alcance fija la flota base, el turno de 8 horas, la telemetría a 1 Hz, la aceleración 1:60 y la semilla reproducible ([01 — Alcance](01-alcance-mvp.md), §6).

El MVP no se puede implementar sin estas reglas, pero tampoco se deben inventar valores para llenar el vacío. Este ADR define **cómo** se fijan las reglas y marca **TBD** todo lo que requiere confirmación del docente o del equipo. Se divide en tres subdecisiones en un solo documento.

#### Problema

- Los KPIs pueden tener definiciones distintas según el tablero, la reconciliación o el código.
- Las alertas usan términos ambiguos (“sin movimiento y sin ciclo”, “punto de control”, “cola”) y mezclan dominios temporales.
- Los parámetros del simulador no tienen valores, unidades, rangos ni procedencia.
- Los escenarios no tienen comportamiento ni parámetros definidos.
- Sin reglas estables, la prueba de determinismo no puede comparar resultados.

#### Opciones (nivel ADR-014)

| Opción | Descripción | A favor | En contra |
|---|---|---|---|
| **A. Catálogo de dominio versionado** | KPIs, reglas y configuración viven en `packages/domain` como catálogos versionados, con esquema, dueño y pruebas. | Una sola definición para UI, ingesta y reconciliación; auditable y testeable. | Requiere disciplina de catálogo y confirmación del dominio. |
| **B. Fórmulas y reglas dispersas** | Cada tablero o módulo implementa su fórmula y sus umbrales. | Rápido al principio. | Resultados inconsistentes, difícil de probar y de explicar. |
| **C. Motor externo de reglas** | Un motor dedicado evalúa KPIs y alertas. | Potente para reglas complejas. | Sobrecarga para un MVP local; agrega dependencia y no resuelve la definición del dominio. |

#### Recomendación (nivel ADR-014)

Se propone adoptar la opción **A**: un catálogo de KPIs, un catálogo de reglas de alerta y un esquema de configuración del simulador, todos versionados y con dueño. Las subdecisiones 014.1, 014.2 y 014.3 detallan el contenido. Ninguna fórmula ni ningún parámetro se considera aceptado hasta que el docente lo confirme y el SRS v0.2 lo recoja.

#### Consecuencias (ADR-014)

- El MVP gana reglas explícitas y testeables, pero depende de la confirmación del docente para fórmulas, umbrales y parámetros.
- El catálogo y la configuración agregan mantenimiento y versionado.
- Sin el cierre de estas reglas, los tableros, las alertas y la reconciliación no se consideran aceptados.
- La procedencia de los parámetros debe quedar documentada; no se presentan como mediciones reales.

#### Requisitos relacionados (ADR-014)

FR-TWIN-03, FR-FLT-02, FR-CRU-02, FR-REC-01, FR-REC-03, FR-ALR-01, FR-SCN-01, FR-DF-02; NFR-DET-01, NFR-OBS-01, NFR-CAP-01. El detalle por subdecisión está en cada sección.

#### Componentes C4 previstos (ADR-014)

`packages/domain`, `apps/simulator`, `apps/server` (Gemelo, Reconciliación y WebSocket), `packages/db` y `apps/web`.

#### Preguntas abiertas (ADR-014)

- ¿Quién firma el catálogo de KPIs, las reglas y la configuración: docente, equipo o ambos?
- ¿Estas reglas se congelan antes de F2/F5 o se ajustan durante la demo?
- ¿Cómo se versiona un cambio que afecta históricos y comparaciones entre turnos?

#### ADR-014.1 — Fórmulas de KPIs

**Contexto y problema.** El backlog lista nueve familias de KPIs, pero no define numerador, denominador, grano, ventana, exclusiones ni redondeo. Un mismo nombre puede significar cosas distintas: “ciclos por hora” puede contar ciclos completos o ciclos iniciados; “utilización” puede dividir por tiempo calendario, programado o disponible; “cumplimiento” puede comparar tonelaje o ciclos.

**Opciones.**

| Opción | Descripción | A favor | En contra |
|---|---|---|---|
| **A. Catálogo de KPI con especificación completa** | Cada KPI tiene id, definición, unidad, grano, dominio temporal, fuentes, exclusiones, redondeo, versión y dueño. | Una sola definición para todos los consumidores; se prueba y se versiona. | Más trabajo inicial y necesidad de confirmación del docente. |
| **B. Fórmula ad hoc por tablero** | Cada vista calcula lo que necesita. | Menos coordinación inicial. | Números contradictorios y reconciliación no reproducible. |
| **C. Definición estándar externa sin adaptación** | Se adopta una definición de industria tal cual. | Ahorra discusión. | Puede no coincidir con los eventos disponibles ni con el alcance; no hay una fuente única aplicable. |

**Recomendación (propuesta).** Se propone adoptar A. El catálogo debe declarar, como mínimo:

| Campo | Contenido |
|---|---|
| `id` | Identificador estable, por ejemplo `kpi.tonnage.total` |
| `nombre` | Nombre para la UI |
| `definición` | Numerador y denominador, con unidades |
| `grano` | Turno, frente, destino, equipo, hora |
| `dominioTemporal` | Simulado o real, y ventana |
| `fuentes` | Eventos o mediciones autorizados |
| `exclusiones` | Estados, intervalos censurados, datos inválidos |
| `redondeo` | Regla y número de decimales |
| `version` | Versión de la fórmula |
| `dueño` | Docente o equipo que confirma |

Los KPI a cerrar y las decisiones que faltan:

| KPI | Definición a cerrar | Fuentes candidatas |
|---|---|---|
| Tonelaje total movido | ¿Ore + waste? ¿Cargado o descargado? ¿Báscula o evento? | `truck.loaded`, `truck.dumped` |
| Tonelaje ore y waste por destino | ¿Clasificación en carguío (ADR-013)? ¿Destino real o planificado? | Eventos de carga y descarga |
| Ciclos por hora y tiempo medio de ciclo | ¿Qué eventos marcan inicio y fin? ¿Se incluye el retorno? ¿Se cuentan ciclos cancelados? | `truck.queued`, `truck.loaded`, `truck.dumped`, `truck.returning` |
| Tiempo de cola en pala y chancador | ¿Solo estado `queued`? ¿Incluye maniobra? ¿Cómo se censura al cerrar el turno? | `truck.queued`, `truck.loading_started` |
| Utilización de palas y camiones | ¿Denominador calendario, programado, disponible u operativo? ¿Se excluye `down`? | Estados y eventos de equipo |
| Throughput y disponibilidad del chancador | ¿Instantáneo o promedio? ¿Entrada o salida? ¿`stopped` y `blocked` cuentan igual? | `crusher.telemetry`, `crusher.downtime_*` |
| Cumplimiento del plan | ¿Tonelaje o ciclos? ¿Plan base o vigente (ADR-012)? ¿Metas prorrateadas por tiempo? | Plan y eventos de descarga |
| Frescura de datos por fuente | ¿Última recepción o última publicación? ¿Máximo o p95? | Ingesta y `sentAt`/`receivedAt` |
| Mensajes por segundo y latencia | ¿Ventana? ¿p95? ¿Incluye errores? | Métricas de ingesta |

**Consecuencias.** Habrá una definición única y pruebas derivadas del catálogo; a cambio, cada KPI requiere confirmación y versionado. Cambiar una fórmula obliga a decidir si se recalculan los históricos o se conserva la versión anterior.

**Requisitos relacionados.** FR-TWIN-03, FR-FLT-02, FR-CRU-02, FR-REC-01, FR-REC-03, FR-DF-02; NFR-DET-01.

**Componentes C4 previstos.** `packages/domain` (catálogo), `apps/server` (Gemelo y Reconciliación), `apps/web` (tableros), `packages/db` (`kpi_snapshots` con `formulaVersion`).

**Preguntas abiertas.**

- ¿Cuál es la definición exacta de cada KPI y quién la aprueba?
- ¿El ciclo se mide de carguío a descarga o de descarga a descarga?
- ¿La utilización usa tiempo calendario, programado o disponible?
- ¿El cumplimiento se pondera por tonelaje o por ciclos?
- ¿Se prorratean las metas por tiempo cuando el turno se interrumpe?
- ¿Los KPIs históricos se recalculan al cambiar una fórmula o se conservan con su versión?
- ¿FR-REC-03 (tendencias) entra en el MVP o queda para después?

#### ADR-014.2 — Reglas de alerta y dominio temporal

**Contexto y problema.** El backlog define cinco alertas con umbrales provisionales: chancador detenido más de 5 minutos simulados, camión inactivo más de 10 minutos simulados, fuente sin señal más de 30 segundos reales, cumplimiento menor al 85 % en el punto de control y más de 3 camiones en cola. No define el punto de control, el significado exacto de “inactivo”, la histéresis, la limpieza ni el comportamiento en pausa o replay.

**Opciones.**

| Opción | Descripción | A favor | En contra |
|---|---|---|---|
| **A. Catálogo declarativo de reglas** | Cada regla declara condición, dominio temporal, ventana, umbral, histéresis, limpieza y severidad; un motor único las evalúa. | Consistente, testeable y fácil de ajustar. | Requiere definir el esquema y confirmar cada regla. |
| **B. Reglas codificadas por alerta** | Cada alerta se implementa con su propio `if`. | Rápido. | Duplica lógica, complica la limpieza y la prueba. |
| **C. Motor externo** | Se integra un motor de reglas. | Flexible. | Fuera del principio de simplicidad local. |

**Recomendación (propuesta).** Se propone adoptar A. El esquema mínimo de una regla es: `id`, `version`, `scope`, `condition`, `timeDomain`, `window`, `threshold`, `hysteresis`, `clearCondition`, `severity`, `cooldown`, `enabled` y `owner`. Las reglas se versionan; un cambio de umbral crea una versión nueva.

Aclaraciones que deben confirmarse:

| Regla | Ambigüedad | Dominio propuesto | Cierre propuesto |
|---|---|---|---|
| Chancador detenido | ¿`stopped` y `blocked` cuentan? ¿`maintenance` cuenta? ¿Qué limpia la alerta? | Simulado | Usar la máquina de estados; iniciar al entrar en `stopped`; limpiar al volver a `running` con histéresis TBD |
| Camión inactivo | “Sin movimiento y sin ciclo” no está definido; ¿se excluye `down`? | Simulado | Definir inactividad por posición y por ausencia de eventos; excluir `down` o alertar aparte; limpiar al moverse o reiniciar ciclo |
| Fuente sin señal | ¿Por fuente o por tópico? ¿Qué pasa en pausa? | Real | Usar última recepción por fuente; suprimir si la corrida está pausada; dar gracia de arranque TBD |
| Desvío de plan | ¿Cuál es el punto de control? ¿Cómo se prorratea la meta? | Simulado | Definir checkpoint y fórmula en 014.1; una alerta por episodio; limpiar si se recupera |
| Cola excesiva | ¿Instantánea o sostenida? ¿Por pala, por chancador o total? | Evento o ventana declarada | Exigir N muestras consecutivas (N TBD); histéresis al bajar del umbral |

Los umbrales 5, 10, 30, 85 y 3 son los del backlog y se mantienen como **provisionales** hasta que el docente los confirme.

Reglas transversales:

- Una sola alerta activa por `(ruleId, scopeKey)`; los cambios se registran como actualización, no como alertas nuevas.
- La alerta conserva un historial de estados: `raisedAt`, `updatedAt`, `clearedAt`, contexto y versión de regla.
- La evaluación es determinista: mismo estado y misma regla producen el mismo resultado.
- En pausa no se evalúan reglas de tiempo simulado; las de tiempo real se suprimen o se marcan como no aplicables para fuentes simuladas.
- En replay no se crean alertas nuevas; se muestran las persistidas.
- La UI debe explicar por qué se disparó una alerta y qué la limpió.

**Consecuencias.** Menos falsos positivos y alertas explicables; a cambio, hay que definir y probar cada regla y mantener el catálogo.

**Requisitos relacionados.** FR-ALR-01, FR-TWIN-01, FR-REC-01, FR-DF-02; NFR-OBS-01, NFR-DET-01.

**Componentes C4 previstos.** `apps/server` (Gemelo y motor de alertas), `packages/domain` (catálogo de reglas), `packages/db` (`alerts` con historial), `apps/web` (panel de alertas), `apps/server` (WebSocket).

**Preguntas abiertas.**

- ¿`blocked` y `maintenance` del chancador cuentan como detenido?
- ¿Qué significa exactamente “camión inactivo” y qué pasa con un camión `down`?
- ¿La alerta de fuente sin señal es por fuente o por tópico?
- ¿Cuál es el punto de control del desvío de plan y cómo se prorratea la meta?
- ¿La cola se mide por pala, por chancador o en total? ¿Cuántas muestras consecutivas se exigen?
- ¿Qué severidades y canales de notificación existen? En el MVP, ¿solo UI?
- ¿Se permite silenciar una alerta? ¿Quién y por cuánto tiempo?
- ¿Las alertas se conservan al cerrar el turno y por cuánto tiempo?

#### ADR-014.3 — Parámetros del simulador y escenarios

**Contexto y problema.** El alcance fija la flota base (2 palas, 6 camiones, 1 perforadora), turnos de 8 horas, telemetría a 1 Hz y aceleración 1:60, pero no define capacidades, velocidades, tiempos de carga y descarga, disciplina de colas, throughput del chancador, capacidad de tolva ni distribución de fallas. Los escenarios normal, parada de chancador y falla de camión no tienen comportamiento ni parámetros. Sin valores reproducibles, el simulador no se puede probar ni comparar entre ejecuciones.

**Opciones.**

| Opción | Descripción | A favor | En contra |
|---|---|---|---|
| **A. Configuración versionada + PRNG con semilla** | Un archivo de configuración validado con Zod, con superposición de escenario, semilla y flujos aleatorios nombrados. | Reproducible, auditable y fácil de ajustar sin recompilar. | Requiere esquema, validación y disciplina de versiones. |
| **B. Constantes en el código** | Los valores viven en el simulador. | Menos archivos. | Cambiar un parámetro exige recompilar; no se audita la corrida. |
| **C. Configuración en base de datos o UI** | El usuario edita parámetros en vivo. | Flexible para la demo. | Puede romper el determinismo y agrega alcance de administración. |

**Recomendación (propuesta).** Se propone adoptar A, con estas reglas:

1. **Esquema de configuración.** Un archivo versionado, validado con Zod, con grupos y unidades explícitas. Los valores concretos quedan **TBD** y deben ser confirmados por el docente o un experto minero.
2. **Identidad de la corrida.** `configVersion` + hash del contenido + semilla + `planVersion` identifican la corrida. Se registran en `simulation_runs` y en `sim.run_started` (ADR-011). Mismos insumos ⇒ mismos resultados.
3. **Aleatoriedad.** Un PRNG sembrado por corrida, con flujos nombrados e independientes (por ejemplo, llegadas, fallas y escenario) para que agregar un flujo no altere los demás. Prohibido `Math.random`, el reloj de pared y el orden de iteración no determinista.
4. **Tiempo.** El simulador avanza en un `tick` simulado fijo. La aceleración cambia cuántos ticks se ejecutan por segundo real, no la secuencia. La telemetría a 1 Hz se emite una vez por segundo simulado; el tamaño del tick queda TBD.
5. **Escenarios.** Son superposiciones deterministas sobre la configuración base, elegidas al iniciar la corrida y no modificables a mitad de corrida.

| Escenario | Comportamiento propuesto | Parámetros TBD |
|---|---|---|
| `normal` | Sin fallas inyectadas; la operación sigue las reglas base. | Ninguno adicional |
| `crusher_stop` | El chancador se detiene durante una ventana simulada; la tolva y las colas evolucionan según la configuración. | Inicio, duración, recuperación y si la tolva sigue recibiendo |
| `truck_failure` | Un camión queda fuera de servicio durante una ventana; la flota restante se redistribuye según la regla de asignación. | Camión afectado, inicio, duración, reparación y reasignación |

6. **Procedencia.** Los valores son sintéticos y deben documentarse como supuestos, no como mediciones reales. Si se usan referencias públicas, se registran fuente, fecha y unidades; si son estimaciones, se etiquetan como tales.
7. **Validación.** El esquema rechaza valores fuera de rango, unidades inconsistentes y combinaciones imposibles (por ejemplo, cero camiones o un turno sin chancador).

**Consecuencias.** Las corridas son reproducibles y los escenarios se pueden comparar; a cambio, hay que mantener el esquema, documentar la procedencia y conseguir los valores del dominio.

**Requisitos relacionados.** FR-SIM-01, FR-SIM-02, FR-SCN-01; NFR-DET-01, NFR-CAP-01.

**Componentes C4 previstos.** `apps/simulator` (carga de configuración, PRNG y escenarios), `packages/domain` (esquema Zod), `packages/db` (`simulation_runs`), `apps/web` (selector de escenario y parámetros visibles).

**Preguntas abiertas.**

- ¿Quién define y aprueba los valores de capacidades, velocidades, tiempos y distribución de fallas?
- ¿Qué unidades y rangos se aceptan para cada parámetro?
- ¿El `tick` simulado es de 1 segundo, medio segundo u otro valor?
- ¿La aceleración puede ser distinta de 1:60? ¿Se permite cambiarla entre corridas?
- ¿La parada de chancador tiene recuperación gradual o vuelve de inmediato a `running`?
- ¿La falla de camión tiene reparación dentro del turno o dura hasta el final?
- ¿Se pueden inyectar varias fallas en un mismo escenario?
- ¿Los escenarios se seleccionan solo al inicio o también durante la corrida? La propuesta es solo al inicio.

#### Dependencias entre subdecisiones

- **014.1** depende de **ADR-013** (clasificación ore/waste) y **ADR-012** (plan base para el cumplimiento).
- **014.2** depende de **ADR-008** (dominio temporal) y de la definición de cumplimiento de **014.1**.
- **014.3** depende de **ADR-011** (corrida y semilla) y de **ADR-013** (material y destinos).

## 5. Decisiones pendientes y responsables

**Convención:** **Docente** es el responsable del curso y del criterio de dominio; **Equipo** son los responsables técnicos de la implementación. Una decisión compartida requiere acuerdo de ambos. La confirmación se registra en la columna **Estado** con la fecha y el cambio a **Aceptado**. Si el docente delega una decisión en el equipo, se registra la delegación.

| ADR | Decisión pendiente | Confirma | Artefacto que bloquea | Prioridad | Estado |
|---|---|---|---|---|---|
| ADR-001 a ADR-007 | Arquitectura, stack y alcance técnico | Docente | F0 en adelante | Alta | Abierta |
| ADR-008 | Autoridad del reloj, dominio de retención, latencia y pausa | Docente + equipo | Ingesta, alertas, replay | Alta | Abierta |
| ADR-009 | Identidad, `seq`, deduplicación y orden de eventos | Equipo | Ingesta y determinismo | Alta | Abierta |
| ADR-010 | Fuente de verdad, proyecciones y derivados que vuelven al bus | Docente + equipo | Proyecciones y reconciliación | Alta | Abierta |
| ADR-011 | Ciclo de vida del turno y la corrida; emisión de hitos | Docente + equipo | Simulador y cierre | Alta | Abierta |
| ADR-012 | Versionado del plan y baseline de reconciliación | Docente + equipo | Reconciliación | Alta | Abierta |
| ADR-013 | Punto de clasificación ore/waste | Docente | Simulador, rutas y metas | Alta | Abierta |
| ADR-014.1 | Catálogo y fórmulas de KPI | Docente | Tableros y reconciliación | Alta | Abierta |
| ADR-014.2 | Reglas de alerta, umbrales y dominio temporal | Docente + equipo | Alertas | Alta | Abierta |
| ADR-014.3 | Parámetros del simulador y escenarios | Docente + equipo | Simulador y demo | Alta | Abierta |
| Anexo P1 (P1-01 a P1-06) | Contratos, seguridad local, backpressure, geometría, determinismo y arranque/seed | Equipo | Detalle de implementación | Media | Abierta |

## 6. Anexo A — ADR candidatos P1

Estos temas están identificados en [05 — Progreso y decisiones](05-decisiones.md), §3, como hallazgos P1. No bloquean el análisis de las P0, pero deben resolverse antes de la fase que los usa. No se desarrollan aquí y no tienen número definitivo; se propone asignarles ADR-015 en adelante cuando se prioricen.

| ID | Título | Problema | Prioridad |
|---|---|---|---|
| P1-01 | Contratos REST, WebSocket y MQTT | Faltan endpoints, métodos, códigos de error, payloads por tipo de evento, esquema de deltas, frecuencia y reconexión de WebSocket, y contratos de los tópicos MQTT. | Alta |
| P1-02 | Frontera de seguridad local | El MVP no tiene autenticación, pero debe definir interfaces de escucha, puertos, credenciales de MQTT y base de datos, secretos y ausencia de exposición a internet. | Media |
| P1-03 | Backpressure y escritura por lotes | La ingesta debe sostener 100 msg/s y ráfagas de 1 000/s sin perder eventos válidos; faltan buffer, tamaño de lote, flush, límites de memoria y política ante consumidor lento. | Alta |
| P1-04 | Geometría y SRID | Faltan el sistema de coordenadas, el SRID de PostGIS, la relación entre coordenadas locales y geográficas, la proyección del mapa y la precisión esperada. | Media |
| P1-05 | Alcance verificable del determinismo | “Mismo turno” debe precisar qué se compara (secuencia de eventos, valores de telemetría, KPIs, orden, timestamps), con qué tolerancia y con qué prueba automática. | Alta |
| P1-06 | Arranque, migraciones y seed | Faltan la estrategia de migraciones, la idempotencia del seed, el reinicio limpio y los datos de demo reproducibles; el registro 05 lo menciona como P1. | Media |

## 7. Próximos pasos

1. Revisar las ADR-008 a ADR-014 con el docente y el equipo, y registrar aceptación o rechazo con fecha.
2. Actualizar [05 — Progreso y decisiones](05-decisiones.md) con el estado de las brechas P0 cuando cada ADR se acepte.
3. Revisar el SRS v0.2 y actualizarlo cuando se acepten las ADR, moviendo los TBD a definiciones verificables.
4. Actualizar `09-c4.md` y los diagramas con los componentes previstos que resulten aceptados.
5. Resolver los P1 del anexo antes de las fases F3 y F6.
6. No iniciar la implementación de una fase hasta que sus ADR bloqueantes estén en estado **Aceptado**.

## 8. Control de cambios

| Versión | Fecha | Cambio |
|---|---|---|
| 0.1 | 22 de octubre de 2026 | Registro inicial: propósito y convención, índice ADR-001 a ADR-014, resumen de las siete ADR existentes, desarrollo propuesto de ADR-008 a ADR-014, tabla de responsables y anexo P1. |
