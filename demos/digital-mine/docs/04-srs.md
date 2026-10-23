# Digital Mine — Especificación de requisitos de software (SRS)

| Versión | Fecha | Estado | Base |
|---|---|---|---|
| 0.2 | 22 de octubre de 2026 | Borrador para revisión | Documentos 01 a 09; ADR-008 a ADR-014 en estado propuesto |

> Este documento describe requisitos, no implementación. Digital Mine todavía no tiene una aplicación ejecutable ni datos generados. Complementa el [alcance del MVP](01-alcance-mvp.md), la [arquitectura propuesta](02-arquitectura.md), el [backlog del MVP](03-backlog.md), el [VSM](06-vsm.md), el [análisis DDD-lite](07-ddd.md), las [ADR](08-adr.md) y la [documentación C4](09-c4.md); no reemplaza ninguno de esos documentos. El estado del proyecto está en [05 — Progreso y decisiones](05-decisiones.md).

## 1. Propósito, alcance y relación con los otros documentos

Este SRS define los requisitos verificables del MVP de Digital Mine. Sirve de base para el diseño, la planificación, las pruebas y la aceptación del proyecto. No fija la implementación.

| Documento | Función | Uso en este SRS |
|---|---|---|
| [01 — Alcance del MVP](01-alcance-mvp.md) | PRD ligero y definición del alcance | Aporta capacidades, actores, límites, supuestos y criterios de aceptación |
| [02 — Arquitectura propuesta](02-arquitectura.md) | Arquitectura, eventos, datos, NFRs y stack | Se usa como referencia de diseño; sus decisiones son propuestas |
| [03 — Backlog del MVP](03-backlog.md) | Fases, historias, KPIs, alertas y DoD | Aporta prioridades, fuentes funcionales y criterios de verificación |
| [05 — Progreso y decisiones](05-decisiones.md) | Registro de progreso, método y brechas P0 | Aporta el estado de las decisiones y el método acordado |
| [06 — VSM](06-vsm.md) | Análisis del flujo de valor | Aporta etapas, esperas, colas y puntos de captura para la trazabilidad |
| [07 — DDD-lite](07-ddd.md) | Lenguaje ubicuo, contextos, agregados y eventos | Aporta el contexto DDD de cada requisito |
| [08 — ADR](08-adr.md) | Decisiones de arquitectura | Aporta el estado propuesto de ADR-008 a ADR-014 y sus preguntas abiertas |
| [09 — C4](09-c4.md) | Componentes previstos y diagramas | Aporta los componentes de la trazabilidad; los recursos cloud son futuros |

### 1.1 Relación con VSM, DDD, ADR y C4

El método acordado combina **VSM + DDD-lite** para analizar y **ADR + C4 + SRS** para documentar. Los artefactos 06 a 09 no son requisitos y no sustituyen este SRS:

- **06 — VSM:** fija el flujo, las esperas y los puntos de captura. Aporta la columna “etapa VSM” de la trazabilidad. Es una hipótesis de proceso, no una medición.
- **07 — DDD-lite:** define lenguaje ubicuo, contextos, agregados, eventos y proyecciones. Aporta el “contexto DDD” y no crea requisitos.
- **08 — ADR:** registra decisiones con estado. ADR-008 a ADR-014 están en estado **Propuesto**; una ADR solo obliga cuando se acepta y este SRS la recoge como requisito verificable.
- **09 — C4:** ubica los componentes previstos. Aporta la columna “componente”. Los recursos cloud son candidatos futuros y no forman parte del MVP.

Si un artefacto y este SRS discrepan, el SRS gobierna la verificación y la ADR gobierna el diseño (08, §1.4).

Convención de estado:

- **Confirmado:** alcance, supuestos y criterios de aceptación del documento 01, y el uso del proyecto en el curso registrado en el README. La actualización visible de la UI en menos de 5 segundos también está confirmada en el alcance.
- **Propuesto:** arquitectura, stack, fases e historias del backlog; VSM, DDD-lite, ADR y C4; y los requisitos de este SRS que dependen de una ADR no aceptada.
- **TBD:** contrato, fórmula, parámetro o umbral que aún no está definido.

Las ADR-008 a ADR-014 están en estado Propuesto. Este documento las referencia, pero **no las declara aceptadas**.

## 2. Actores y contexto

Digital Mine reproduce el ciclo planificación → perforación → voladura → carguío → acarreo → descarga → chancado primario → reconciliación. El detalle del ciclo está en el alcance, sección 2.

### 2.1 Actores humanos

| Actor | Necesidad principal en el MVP |
|---|---|
| Planificador de corto plazo | Crear y ajustar el plan de turno, y revisar su cumplimiento |
| Ingeniero de perforación y voladura | Ver eventos de perforación y voladura y la disponibilidad de frentes |
| Despachador | Seguir la flota en el mapa, revisar colas y recibir alertas |
| Operador de equipo | Consultar instrucción y estado; en el MVP la operación es simulada |
| Operador de chancado | Ver alimentación, tolva, throughput y paradas |
| Supervisor de turno | Revisar KPIs, alertas, plan vs real y replay |
| Gerencia de operaciones | Ver tendencias, cumplimiento y reportes |
| TI/OT | Monitorear la salud y el flujo de datos |

### 2.2 Sistemas y actores técnicos

| Sistema | Rol | Medio en el MVP |
|---|---|---|
| Simulador de mina | Genera telemetría, eventos y plan ejecutado | MQTT sintético |
| FMS / GPS / telemetría | Asignaciones, posición, velocidad, carga y combustible | MQTT 1 Hz; FMS con adaptador futuro |
| Perforación, voladura y báscula | Patrones, metros, eventos de tronadura y tonelaje | Eventos |
| SCADA / PLC de chancado | Alimentación, throughput, tolva y estado | MQTT simulado; OPC UA futuro |
| Gemelo digital (el propio sistema) | Estado, histórico, KPIs y alertas | API REST + WebSocket |

### 2.3 Límites del MVP

- Un sitio, un tajo, un chancador primario y un botadero.
- Datos sintéticos; las fuentes reales se conectan mediante adaptadores posteriores.
- El gemelo observa y simula; no comanda equipos reales ni optimiza el despacho.
- Despliegue local, sin autenticación y sin exposición a internet.
- Mapa 2D/2.5D; la vista 3D se evalúa después del MVP.
- Sin geología, leyes, mezcla, mantenimiento ni planta downstream.

El detalle de actores, límites y supuestos está en el alcance, secciones 4 a 6.

## 3. Requisitos funcionales

Se definen **28 requisitos funcionales** agrupados por capacidad. La numeración conserva los 25 de la v0.1 y agrega FR-PLAN-03, FR-SIM-06 y FR-TWIN-04. Los criterios usan el formato dado / cuando / entonces. La prioridad MoSCoW es una propuesta de este borrador; las historias del backlog son la referencia. TBD indica un detalle aún no definido.

### 3.1 Planificación de turno

| ID | Requisito | Prioridad | Criterio de aceptación | Fuente |
|---|---|---|---|---|
| FR-PLAN-01 | Crear y ajustar el plan de turno con frentes, metas por frente y destino, y asignación de flota, en versiones inmutables. | Must | Dado un sitio y una flota configurados, cuando el planificador registra frentes, metas y asignación para un turno y guarda, entonces el sistema persiste la versión 1; si luego ajusta metas o asignaciones, crea una versión nueva con `planVersion` incrementado y `supersedes`, sin editar la anterior. | US-04; Alcance §2 y §3; Backlog F5; ADR-012 (propuesto) |
| FR-PLAN-02 | Publicar una versión del plan de turno y emitir `plan.published` con `planId`, `planVersion`, `effectiveFrom` y `supersedes`, para que el simulador consuma la versión vigente. | Must | Dado un plan guardado y válido, cuando el planificador lo publica, entonces el sistema lo marca como publicado, emite `plan.published` con esos campos y el simulador usa la versión vigente en cada instante simulado. | US-04; Arquitectura §4; ADR-012 (propuesto) |
| FR-PLAN-03 | Distinguir el plan base de los ajustes publicados a mitad de turno y usar el plan base como línea base de la reconciliación. | Must | Dado un turno con una o más versiones publicadas, cuando se reconcilia, entonces el cumplimiento oficial se calcula contra la versión vigente al inicio del turno (plan base); las versiones posteriores se muestran como ajustes y no modifican el resultado oficial. | US-04 y US-05; ADR-012 (propuesto) |

### 3.2 Simulación e ingesta

| ID | Requisito | Prioridad | Criterio de aceptación | Fuente |
|---|---|---|---|---|
| FR-SIM-01 | Generar un turno sintético completo con ore/waste, perforación, voladura, carguío, acarreo, descarga y chancado, con clasificación ore/waste en el carguío según ADR-013 (propuesta, no aceptada). | Must | Dado un plan publicado y una configuración de sitio, cuando se inicia la simulación, entonces se generan telemetría y eventos de todas las etapas del ciclo para el turno; `truck.loaded` y `truck.dumped` incluyen `materialType` y destino coherentes con el material declarado del frente. | Alcance §2, §3 y §7 (criterio 2); ADR-013 (propuesto) |
| FR-SIM-02 | Reproducir el mismo turno con la misma semilla, configuración y secuencia de versiones de plan. | Must | Dadas la misma semilla, configuración y versiones de plan, cuando se ejecuta el turno dos veces, entonces la secuencia de eventos de dominio (tipo, orden canónico y payload de negocio) y los KPIs son iguales; la comparación ignora `eventId` y los timestamps reales `sentAt` y `receivedAt`. La prueba es una corrida de referencia (*golden run*) automatizada. | Alcance §6 y §7 (criterio 9); Arquitectura §1 y §9; ADR-008, ADR-009 y ADR-014.3 (propuestos); NFR-DET-01 |
| FR-SIM-03 | Permitir la aceleración del tiempo simulado y mostrar el reloj simulado, distinguiéndolo del real, y el modo live o replay activo. | Must | Dado un factor de aceleración configurado, por defecto 1 segundo real = 1 minuto simulado, cuando corre la simulación, entonces la UI muestra la hora simulada, la hora real cuando corresponda y el modo live o replay; el reloj simulado no se deriva del reloj de pared. | Alcance §6; Arquitectura §1; ADR-008 (propuesto) |
| FR-SIM-04 | Publicar telemetría a 1 Hz y eventos operacionales por MQTT con el envelope v2 y QoS 1. | Must | Dado un turno en ejecución, cuando el simulador produce telemetría o un evento, entonces publica en los tópicos definidos con QoS 1 y el envelope v2: `eventId`, `eventType`, `eventVersion`, `occurredAt` (tiempo de evento simulado), `sentAt` (tiempo real), `runId`, `shiftId`, `seq`, `streamId`, `siteId`, `source`, `simulated=true` y `payload`; `receivedAt` lo agrega el servidor y no forma parte del envelope. | Alcance §6; Arquitectura §5; ADR-007, ADR-008 y ADR-009 (propuestos) |
| FR-SIM-05 | Ingerir, validar, deduplicar de forma persistente, ordenar y persistir los mensajes recibidos. | Must | Dado un mensaje MQTT, cuando llega al servidor, entonces se valida con Zod; se deduplica por `eventId` contra la base (y la telemetría por `(runId, streamId, seq)`); se aplica el orden canónico `(occurredAt, streamId, seq, eventId)`; si es inválido o duplicado, se registra el rechazo o el duplicado y no se incorpora dos veces al estado; un hueco de `seq` se registra como métrica de calidad. | Arquitectura §3.1; Backlog F3; ADR-007 y ADR-009 (propuestos) |
| FR-SIM-06 | Registrar la corrida de simulación con `runId`, `shiftId`, semilla, escenario, aceleración, versión de configuración, `planVersion` y época del reloj. | Must | Dado el arranque de una corrida, cuando el simulador emite `sim.run_started`, entonces el servidor valida que el turno y el plan estén publicados, persiste los metadatos en `simulation_runs` y rechaza parámetros mutables durante la corrida; una corrida nueva para el mismo turno usa un `runId` nuevo y `seq` reiniciado. | ADR-011 (propuesto); 07 §5 y §6 |

La clasificación en el carguío es una propuesta de ADR-013, no una decisión aceptada. Si se rechaza, FR-SIM-01, FR-REC-01 y la matriz de trazabilidad deben revisarse.

### 3.3 Perforación y voladura

| ID | Requisito | Prioridad | Criterio de aceptación | Fuente |
|---|---|---|---|---|
| FR-DRILL-01 | Mostrar los eventos de perforación y voladura y el estado de liberación de los frentes. | Should | Dado un turno con `drill.pattern_started`, `drill.pattern_completed` y `blast.detonated`, cuando el ingeniero consulta la vista, entonces ve los eventos, los metros perforados y el estado del frente. | US-09; Alcance §2; 07 §6 |

### 3.4 Estado del gemelo

| ID | Requisito | Prioridad | Criterio de aceptación | Fuente |
|---|---|---|---|---|
| FR-TWIN-01 | Mantener el estado vivo de equipos, frentes, chancador, avance del plan y salud de las fuentes. | Must | Dado un flujo de eventos ingeridos, cuando cambia el estado de un equipo, frente o chancador, entonces el gemelo actualiza el estado y lo expone por API y WebSocket; la actualización visible cumple NFR-PERF-03 y la latencia de pipeline se mide según NFR-PERF-01. | Alcance §3; Arquitectura §3.1; ADR-008 y ADR-010 (propuestos) |
| FR-TWIN-02 | Reconstruir el estado del gemelo y las proyecciones desde la base al reiniciar el servidor. | Must | Dado un servidor detenido con eventos y telemetría persistidos, cuando se reinicia, entonces carga los datos maestros, lee el log en orden canónico, reconstruye el estado y las proyecciones que falten y conserva la continuidad del turno, sin duplicar ciclos ni KPIs. | Arquitectura §9; Backlog F3; ADR-009 y ADR-010 (propuestos) |
| FR-TWIN-03 | Proyectar ciclos y calcular los KPIs del turno desde eventos, con la versión de fórmula vigente. | Must | Dado un conjunto de eventos de carguío, acarreo, descarga y retorno, cuando el servidor los procesa en orden canónico, entonces deriva los ciclos y calcula los KPIs del backlog; la telemetría no cuenta tonelaje y cada snapshot registra `formulaVersion`. | Alcance §3; Backlog §3; ADR-010 y ADR-014.1 (propuestos) |
| FR-TWIN-04 | Separar hechos operacionales, proyecciones y derivados, y evitar que los derivados vuelvan a la ingesta operacional. | Must | Dado un KPI, una alerta o una métrica de salud calculados por el servidor, cuando se generan, entonces se exponen a la UI por API o WebSocket y no se publican en los tópicos MQTT operacionales; si en el futuro se publican, usan un espacio de tópicos separado, `derived=true` y la ingesta los filtra. | ADR-010 (propuesto); 07 §3 y §6 |

### 3.5 Mapa y operación en vivo

| ID | Requisito | Prioridad | Criterio de aceptación | Fuente |
|---|---|---|---|---|
| FR-MAP-01 | Mostrar un mapa 2D/2.5D con tajo, bancos, rutas, frentes, botadero, chancador y equipos en movimiento con su estado. | Must | Dado un turno en curso, cuando el usuario abre el mapa, entonces ve las capas del sitio y la posición y el estado de los equipos actualizados en menos de 5 segundos. | US-01; Alcance §3 y §7 (criterio 3) |

### 3.6 Flota

| ID | Requisito | Prioridad | Criterio de aceptación | Fuente |
|---|---|---|---|---|
| FR-FLT-01 | Mostrar el panel de flota con estado, ubicación, carga, ciclo, última señal y colas en pala y chancador. | Must | Dado un turno en curso, cuando el despachador consulta el panel de flota, entonces ve por equipo los datos indicados y las colas con su tiempo de espera; la cola en chancador se deriva de `truck.arrived_at_destination` y `truck.queued` con `queueId`, o de la telemetría si ADR-009 lo decide. | US-01 y US-02; Alcance §3; Backlog F4; ADR-009 (propuesto) |
| FR-FLT-02 | Calcular y mostrar la utilización de palas y camiones. | Should | Dado un turno con eventos de operación, cuando se consulta el tablero, entonces se muestra la utilización por equipo según la fórmula acordada. | Backlog §3 y F5 |

### 3.7 Chancado

| ID | Requisito | Prioridad | Criterio de aceptación | Fuente |
|---|---|---|---|---|
| FR-CRU-01 | Mostrar el tablero de chancado con alimentación, throughput, nivel de tolva, estado y paradas. | Must | Dada la telemetría del chancador, cuando el operador abre el tablero, entonces ve alimentación, throughput, tolva, estado y paradas actualizados en menos de 5 segundos. | US-03; Alcance §3 y §7 (criterio 4) |
| FR-CRU-02 | Registrar las paradas del chancador con inicio y fin, y calcular su disponibilidad. | Must | Dados `crusher.downtime_started` y `crusher.downtime_ended`, cuando el servidor los procesa, entonces registra la parada, su duración y actualiza la disponibilidad del periodo. | Arquitectura §5.3; Backlog §3; ADR-014.1 (propuesto) |

Si `blocked` y `maintenance` cuentan como parada para la disponibilidad y las alertas es TBD (ADR-014.1 y ADR-014.2).

### 3.8 Reconciliación plan vs real

| ID | Requisito | Prioridad | Criterio de aceptación | Fuente |
|---|---|---|---|---|
| FR-REC-01 | Calcular el cumplimiento plan vs real por turno, frente y destino, usando el plan base y el material declarado en el carguío. | Must | Dado un plan base, la operación registrada y las descargas de un turno, cuando se solicita la reconciliación, entonces se muestra el cumplimiento de tonelaje por turno, frente y destino; se usa el material del carguío y el destino real de la descarga, sin doble conteo entre ore descargado y ore chancado. | US-05; Alcance §7 (criterio 5); ADR-010, ADR-012 y ADR-013 (propuestos) |
| FR-REC-02 | Cerrar el turno con un resultado inmutable y dejar retroalimentación visible para el siguiente plan. | Must | Dado un turno finalizado (`shift.ended`), cuando el servidor pasa el turno a `closing`, espera la ventana de gracia para eventos tardíos, ejecuta la reconciliación y lo cierra, entonces congela el plan base, las versiones publicadas, la versión de fórmula, el corte del log y los KPIs oficiales; el cierre no se edita y la retroalimentación queda visible en el siguiente plan. | Alcance §1; Backlog F5; ADR-010, ADR-011 y ADR-012 (propuestos) |
| FR-REC-03 | Mostrar tendencias y cumplimiento histórico por turno. | Could | Dados varios turnos cerrados, cuando la gerencia consulta la vista de tendencias, entonces ve la evolución del cumplimiento y de los KPIs por turno. | US-11; Alcance §5.1; ADR-014.1 (propuesto) |

### 3.9 Replay

| ID | Requisito | Prioridad | Criterio de aceptación | Fuente |
|---|---|---|---|---|
| FR-RPL-01 | Reconstruir un turno o una ventana de tiempo desde el histórico con controles de reproducción, en modo de solo lectura. | Should | Dado un turno persistido, cuando el supervisor selecciona una ventana y usa los controles de tiempo, entonces la UI reproduce el estado y los eventos en orden canónico, marca el modo replay y la corrida original, y no publica en MQTT, no escribe eventos, no crea un `runId` nuevo ni genera alertas nuevas; las alertas mostradas son las persistidas. | US-07; Alcance §7 (criterio 7); ADR-008, ADR-010 y ADR-011 (propuestos) |

### 3.10 Flujo y salud de datos

| ID | Requisito | Prioridad | Criterio de aceptación | Fuente |
|---|---|---|---|---|
| FR-DF-01 | Mostrar la topología de fuentes y etapas del pipeline. | Must | Dado el sistema en ejecución, cuando TI/OT abre la vista de flujo, entonces ve las fuentes, las etapas del pipeline y sus conexiones. | US-06; Backlog F6 |
| FR-DF-02 | Mostrar métricas por conexión: mensajes por segundo, bytes por segundo, latencia, errores, duplicados, huecos y última señal. | Must | Dado tráfico MQTT y WebSocket, cuando se consulta la vista de flujo, entonces se muestran las métricas por conexión, la latencia calculada como `receivedAt − sentAt` en tiempo real y la frescura de cada fuente. | US-06; Alcance §7 (criterio 6); Backlog §3; ADR-008 y ADR-009 (propuestos) |
| FR-DF-03 | Inspeccionar los mensajes recientes con filtros. | Should | Dado un flujo de mensajes, cuando TI/OT filtra por fuente, tipo o periodo, entonces ve los mensajes recientes que cumplen el filtro, incluidos los rechazados y duplicados. | Backlog F6; ADR-009 (propuesto) |

### 3.11 Alertas

| ID | Requisito | Prioridad | Criterio de aceptación | Fuente |
|---|---|---|---|---|
| FR-ALR-01 | Generar, limpiar y conservar alertas según reglas versionadas, con dominio temporal explícito y supresión en pausa y replay. | Should | Dado que se cumple una condición de alerta, cuando el motor evalúa la regla en su `timeDomain`, entonces crea la alerta con hora, contexto y `ruleVersion`; cuando la condición deja de cumplirse, la limpia y conserva el historial. En pausa no se evalúan reglas de tiempo simulado; en replay no se crean alertas nuevas y se muestran las persistidas. | US-08; Backlog §4; ADR-008 y ADR-014.2 (propuestos) |

Reglas iniciales del backlog, sección 4, con el dominio temporal que cada una declara:

- Chancador detenido por más de 5 minutos simulados.
- Camión inactivo por más de 10 minutos simulados.
- Fuente sin mensajes por más de 30 segundos reales.
- Cumplimiento menor al 85 % en el punto de control del turno.
- Más de 3 camiones esperando en una pala o en el chancador.

Los umbrales son provisionales. `blocked` y `maintenance`, el punto de control y la definición exacta de “camión inactivo” son TBD (ADR-014.2).

### 3.12 Escenarios

| ID | Requisito | Prioridad | Criterio de aceptación | Fuente |
|---|---|---|---|---|
| FR-SCN-01 | Permitir elegir los escenarios normal, parada de chancador y falla de camión. | Should | Dado el selector de escenario, cuando el usuario elige uno y reinicia la simulación, entonces el turno se genera con el comportamiento del escenario y la configuración asociada. | US-10; Backlog F2 y F4 |

## 4. Requisitos no funcionales

| ID | Requisito | Criterio medible | Verificación | Origen |
|---|---|---|---|---|
| NFR-PERF-01 | Latencia de pipeline MQTT → UI. | p95 menor a 2 segundos desde la publicación MQTT hasta la UI, medido en tiempo real (`receivedAt − sentAt` más el tramo servidor–UI). Umbral propuesto por la arquitectura; TBD hasta confirmación. | Instrumentación de marcas de tiempo reales y prueba de carga. | Arquitectura §9; ADR-008 (propuesto) |
| NFR-PERF-02 | Throughput del pipeline. | 100 mensajes por segundo sostenidos y 1 000 por segundo en ráfaga, sin pérdida de eventos válidos persistidos. El escenario nominal a 60× con 1 Hz simulado podría requerir ~600 msg/s; el umbral y el dominio temporal están TBD (ADR-008). | Prueba de carga básica. | Arquitectura §9; ADR-008 (propuesto); 05 §7 |
| NFR-PERF-03 | Actualización visible de la UI. | Los cambios de estado, mapa, flota y chancado se reflejan en la UI en menos de 5 segundos, en tiempo real. | Prueba end-to-end con medición de tiempo. | Alcance §6 y §7 (criterios 3 y 4) |
| NFR-CAP-01 | Capacidad del MVP. | Un sitio con un tajo, un chancador y un botadero; 2 palas, 6 camiones y 1 perforadora; un turno de 8 horas con telemetría a 1 Hz. | Simulación de un turno completo con la flota base. | Alcance §6 |
| NFR-DET-01 | Determinismo de la simulación. | La misma semilla, configuración y secuencia de versiones de plan producen la misma secuencia de eventos de dominio y los mismos KPIs. La comparación ignora `eventId` y los timestamps reales `sentAt` y `receivedAt`, y usa el orden canónico. La comparación de telemetría queda TBD (P1-05). | Prueba *golden run* automatizada que compara dos ejecuciones. | Alcance §6; Arquitectura §9; ADR-008, ADR-009 y ADR-014.3 (propuestos) |
| NFR-REC-01 | Recuperación ante reinicio. | El estado reconstruido coincide con el último estado persistido antes del reinicio y no se pierden eventos persistidos; se reconstruyen las proyecciones y se conserva la relación turno–corrida. El tiempo objetivo de recuperación está TBD. | Prueba de reinicio con un turno en curso. | Arquitectura §9; ADR-010 y ADR-011 (propuestos) |
| NFR-RET-01 | Retención de datos. | 7 días de telemetría y 30 días de eventos por defecto, configurable. El dominio temporal (simulado o real) no está decidido: TBD según ADR-008. Se almacenan `occurredAt`, `sentAt` y `receivedAt`; los valores 7/30 son propuestos por la arquitectura. | Revisión de configuración y consulta de datos dentro y fuera de la ventana. | Arquitectura §9; ADR-008 (propuesto) |
| NFR-SEC-01 | Seguridad local. | Sin autenticación en el MVP, accesible solo en local y no expuesto a internet; sin credenciales reales en el repositorio. | Revisión de Docker Compose, puertos y variables de entorno. | Alcance §6; Arquitectura §9 y ADR-006 (propuesto) |
| NFR-USA-01 | Idioma, unidades y tiempo. | Interfaz en español, unidades métricas, almacenamiento en UTC, visualización en la zona del navegador, reloj simulado y real distinguibles y modo live/replay visible. | Revisión de UI y muestras de base de datos. | Alcance §6; Arquitectura §9; ADR-008 (propuesto) |
| NFR-MNT-01 | Mantenibilidad y pruebas. | TypeScript estricto, Biome sin errores, pruebas unitarias del dominio, prueba *golden run* de determinismo y al menos una prueba end-to-end; CI ejecuta lint, typecheck y pruebas. | Pipeline de CI y revisión del DoD. | Backlog F0, F7 y §5; ADR-009 (propuesto) |
| NFR-OBS-01 | Observabilidad. | Logs estructurados con pino, salud por fuente y métricas del pipeline —incluidos duplicados, huecos y rechazos— disponibles en la UI; los errores de ingesta quedan registrados. | Prueba con fuente detenida y mensajes inválidos. | Arquitectura §3.1 y §7; Backlog F6; ADR-009 (propuesto) |
| NFR-PORT-01 | Portabilidad local. | Arranque documentado con `docker compose up -d`, `pnpm install` y `pnpm dev`, sin dependencia de servicios cloud. Los recursos cloud de C4 no son un requisito del MVP. | Ejecución en una máquina limpia con Docker. | Arquitectura §8; Alcance §7 (criterio 1); 09 §3.3 |
| NFR-ACC-01 | Accesibilidad y responsive básico. | Controles principales operables por teclado, foco visible y contraste legible; diseño usable en escritorio y pantalla pequeña. Umbral formal: TBD. | Revisión manual y prueba en navegador. | Backlog F7 |

Los NFR de latencia, throughput, retención y recuperación provienen de la arquitectura propuesta y quedan sujetos a confirmación. `NFR-PERF-01` (p95 < 2 s) y `NFR-RET-01` (dominio de 7/30 días) tienen umbrales TBD; `NFR-PERF-03` (actualización visible < 5 s) está confirmado en el alcance. La ambigüedad de si 1 Hz y 100 msg/s se miden en tiempo real o simulado queda TBD (ADR-008).

## 5. Interfaces y datos

No hay contratos implementados. Esta sección describe las interfaces previstas y marca como TBD lo que aún no está definido.

### 5.1 Interfaz web

| Vista | Contenido | Estado |
|---|---|---|
| Mapa | Tajo, bancos, rutas, frentes, botadero, chancador y equipos | Confirmada en alcance; disposición TBD |
| Flota | Estado, ubicación, carga, ciclo, última señal y colas en pala y chancador | Confirmada; detalle TBD |
| Chancado | Alimentación, throughput, tolva, estado y paradas | Confirmada |
| Plan | Frentes, metas, destinos, asignación, versiones y plan base | Confirmada; versionado propuesto (ADR-012); formulario TBD |
| Plan vs real | Cumplimiento por turno, frente y destino; plan base vs ajustes | Confirmada; línea base propuesta (ADR-012) |
| Replay | Reproducción de un turno con controles de tiempo, solo lectura y modo replay visible | Confirmada; controles TBD |
| Flujo de datos | Topología, métricas, duplicados, huecos e inspector de mensajes | Confirmada; detalle TBD |
| Alertas y escenarios | Alertas activas e históricas con dominio temporal; selector de escenario | Confirmada; umbrales y parámetros TBD |

El layout, la navegación y los componentes concretos no están definidos.

### 5.2 API REST

Recursos previstos: estado del gemelo, histórico, plan versionado, KPIs, salud de fuentes, corridas y replay. Endpoints, métodos, códigos de error y payloads: TBD.

| Recurso | Uso previsto |
|---|---|
| Estado | Consultar el estado actual del gemelo |
| Histórico | Consultar eventos y telemetría para replay |
| Plan | Crear, versionar, publicar y consultar el plan; consultar el plan base |
| Corridas | Iniciar, pausar, reanudar y consultar corridas; metadatos de `simulation_runs` |
| KPIs | Consultar indicadores y reconciliación |
| Salud | Consultar fuentes y pipeline |
| Replay | Consultar una ventana en modo solo lectura |

Las alertas se entregan por WebSocket o API; el mecanismo exacto está TBD.

### 5.3 WebSocket

- Snapshot inicial y deltas en vivo.
- También entrega derivados (KPIs, alertas y salud) que no vuelven al MQTT operacional (ADR-010, propuesto).
- Esquema de mensajes, frecuencia y reconexión: TBD. El manejo de reconexión está previsto en F7.
- La UI debe reflejar los cambios en menos de 5 segundos (NFR-PERF-03).

### 5.4 MQTT

Tópicos definidos en la arquitectura, sección 5.2:

- `mine/{siteId}/plan`
- `mine/{siteId}/telemetry/equipment/{equipmentId}`
- `mine/{siteId}/telemetry/crusher`
- `mine/{siteId}/events/{eventType}`
- `mine/{siteId}/health/{sourceId}`

QoS 1 y un solo sitio en el MVP. El envelope v2 es una propuesta (ADR-009); los payloads por tipo de evento son TBD (P1-01).

| Campo del envelope | Uso | Estado |
|---|---|---|
| `eventId` | UUID del productor; clave de idempotencia | Definido; deduplicación persistente propuesta (ADR-009) |
| `eventType` | Tipo de evento | Definido |
| `eventVersion` | Versión del contrato; v2 propuesta | Propuesto (ADR-009) |
| `occurredAt` | Instante del hecho en el dominio de su fuente; simulado en el MVP; inmutable | Definido; dominio temporal propuesto (ADR-008) |
| `sentAt` | Instante real de publicación | Definido |
| `receivedAt` | Instante real de recepción; campo del servidor, no del envelope | Propuesto (ADR-008) |
| `runId` | Corrida de simulación; obligatorio para eventos simulados | Propuesto (ADR-009 y ADR-011) |
| `shiftId` | Turno al que pertenece el mensaje | Propuesto en el envelope v2; si se deriva del payload, TBD (ADR-009 y ADR-011) |
| `seq` | Secuencia monótona por `(runId, streamId)` | Propuesto (ADR-009) |
| `streamId` | Equipo o flujo para telemetría | Propuesto (ADR-009) |
| `siteId` | Sitio emisor | Definido |
| `source` | Origen: simulator, fms, scada | Definido |
| `correlationId` | Correlación opcional | Definido |
| `simulated` | Distingue dato sintético de medición real | Definido |
| `derived` | Marca un derivado si se publica en un espacio separado | Propuesto (ADR-010) |
| `payload` | Contenido específico del evento | TBD (P1-01) |

El orden canónico es `(occurredAt, streamId, seq, eventId)`; `sentAt` y `receivedAt` no ordenan hechos de dominio, solo miden latencia (ADR-009). Los payloads completos no están definidos.

### 5.5 Base de datos

PostgreSQL con TimescaleDB y PostGIS es una propuesta. El esquema detallado está en la arquitectura, sección 6.

| Grupo | Tablas | Propósito |
|---|---|---|
| Configuración y geometría | `sites`, `benches`, `dig_units`, `destinations`, `roads` | Sitio, bancos, frentes, destinos y rutas |
| Activos y personas | `equipment`, `operators` | Equipos y referencia de operadores |
| Planificación | `shifts`, `plans`, `plan_targets`, `assignments` | Turnos, plan, metas y asignación |
| Corridas | `simulation_runs` | Metadatos de corrida: semilla, escenario, aceleración y reloj (propuesta ADR-011) |
| Series y eventos | `telemetry`, `events`, `crusher_samples` | Telemetría, eventos y muestras del chancador |
| Derivados | `cycles`, `kpi_snapshots` | Ciclos y KPIs calculados |
| Operación | `data_sources`, `data_flow_metrics`, `alerts` | Salud, métricas y alertas |

`simulation_runs` es una tabla nueva propuesta por ADR-011; la arquitectura, sección 6, todavía no la lista. Convenciones: UUID como clave, `timestamptz` en UTC, `jsonb` para payloads variables y nombres en `snake_case`.

**Fuente de verdad y derivados (propuesta ADR-010).**

| Dato | Autoridad | Naturaleza | ¿Vuelve al bus operacional? |
|---|---|---|---|
| Hechos operacionales | `events` | Log append-only inmutable | No; se ingesta una vez |
| Telemetría y muestras del chancador | `telemetry`, `crusher_samples` | Medición append-only | No; no se reconstruye desde eventos |
| Datos maestros | `sites`, `benches`, `dig_units`, `destinations`, `roads`, `equipment` | Configuración versionada | No |
| Plan y metas | `plans`, `plan_targets`, `assignments` | Versiones inmutables | Solo `plan.published` |
| Turnos y corridas | `shifts`, `simulation_runs` | Registros operacionales | Solo hitos (`shift.*`, `sim.run_started`) |
| Ciclos | `cycles` | Proyección | No |
| KPIs | `kpi_snapshots` | Derivado; oficial al cierre | No; API y WebSocket |
| Alertas | `alerts` | Derivado con historia | No; API y WebSocket |
| Salud y métricas | `data_sources`, `data_flow_metrics` | Derivado de la ingesta | No; API y WebSocket |

Los derivados (`kpi.snapshot`, `alert.*`, `data_source.health`) no vuelven a la ingesta operacional. Si en el futuro se publican, usan tópicos separados y `derived=true`. Las proyecciones se reconstruyen desde el log; el log y la telemetría no se reconstruyen.

### 5.6 Adaptadores futuros

- `TelemetrySource` para FMS, GPS y telemetría de equipos.
- `PlantSource` para SCADA/PLC del chancador, con OPC UA como opción.
- `PlanSource` para planes de mina por archivo o API.
- Evaluar ISO 15143-3 (AEMP) y MQTT Sparkplug B.
- Autenticación OIDC, RBAC y segregación IT/OT quedan fuera del MVP.

### 5.7 Datos sintéticos y mediciones reales

- El MVP usa datos sintéticos generados por el simulador.
- Los eventos sintéticos llevan `simulated=true`, `source=simulator`, `runId` y `seq`.
- `occurredAt` pertenece al dominio del evento (simulado en el MVP); `sentAt` y `receivedAt` son tiempo real. La UI muestra ambos relojes y marca el modo live o replay.
- La semilla, la configuración, el escenario, la aceleración y el `planVersion` deben quedar registrados en `simulation_runs` para reproducir un turno.
- El replay es de solo lectura: no publica, no escribe ni crea alertas nuevas.
- Las mediciones reales solo entran por adaptadores futuros y deben conservar fuente, unidades y marca de tiempo. El MVP no las incluye.

## 6. Restricciones y supuestos

| Restricción o supuesto | Valor | Estado |
|---|---|---|
| Sitio | Un sitio, un tajo, un chancador primario y un botadero | Confirmado |
| Flota | 2 palas, 6 camiones y 1 perforadora; configurable | Confirmado |
| Turnos | 8 horas | Confirmado |
| Telemetría | 1 Hz; eventos operacionales inmediatos. El dominio (simulado o real) está TBD según ADR-008 | Confirmado el valor; dominio TBD |
| Actualización de UI | Menos de 5 segundos | Confirmado |
| Mapa | 2D/2.5D; 3D después del MVP | Confirmado |
| Despliegue | Local, sin autenticación, no expuesto a internet | Confirmado |
| Idioma y unidades | Español, unidades métricas, almacenamiento UTC | Confirmado |
| Determinismo | Semilla, configuración y versiones de plan reproducibles; alcance de comparación en NFR-DET-01 | Confirmado |
| Tiempo | `occurredAt` en el dominio del evento (simulado en el MVP); `sentAt` y `receivedAt` en tiempo real | Confirmado; semántica propuesta (ADR-008) |
| Stockpile ROM | No se modela | Confirmado |
| Calidad | Sin leyes, mezcla ni clasificación fina; solo ore/waste y tonelaje | Confirmado |
| Punto de clasificación | El alcance lo sitúa en la descarga; ADR-013 propone el carguío. Decisión abierta (P0-06) | Abierto |
| Control | El gemelo observa y simula; no comanda equipos reales | Confirmado |
| Aceleración | Por defecto 1 segundo real = 1 minuto simulado; configurable | Confirmado |
| Datos | Sintéticos en el MVP | Confirmado |
| Plan | Versiones inmutables y plan base para la reconciliación | Propuesto (ADR-012) |
| Turno y corrida | Un turno activo por sitio; una corrida activa por turno | Propuesto (ADR-011) |
| Cloud | Recursos cloud de C4 fuera del MVP; no se definen requisitos cloud | Confirmado |
| Stack | TypeScript, Next.js, Fastify, PostgreSQL/TimescaleDB, MQTT y Docker | Propuesto |

## 7. Fuera de alcance

La lista completa está en el alcance, sección 4, y no se duplica aquí. Quedan fuera del MVP: geología y calidad del mineral; geotecnia, ambiente, seguridad y salud ocupacional; mantenimiento; planta downstream y logística externa; integración real con FMS/SCADA; optimización automática del despacho y control de equipos reales; gemelo 3D fotorrealista; multiusuario avanzado, SSO, multi-sitio y aplicación móvil; cumplimiento regulatorio y auditoría formal.

La reasignación manual de camiones (US-12) es una mejora posterior al MVP. VSM y DDD-lite se usan como métodos de análisis (sección 1.1); TOGAF queda excluido. No son requisitos del producto. Los recursos cloud de C4 son futuros u opcionales y no forman parte de la implementación del MVP; este SRS no define requisitos cloud.

## 8. Criterios de aceptación del MVP y trazabilidad

### 8.1 Criterios de aceptación

| # | Criterio del alcance §7 | Cobertura | Verificación |
|---|---|---|---|
| 1 | El entorno levanta con un comando documentado (Docker + `pnpm dev`). | NFR-PORT-01 | Ejecución en máquina limpia |
| 2 | El simulador genera un turno completo con ore/waste, perforación, voladura, carguío, acarreo y chancado. | FR-SIM-01, FR-SIM-04, FR-SIM-05, FR-SIM-06 | End-to-end |
| 3 | El mapa muestra equipos en movimiento y su estado con actualización casi en tiempo real. | FR-MAP-01, FR-TWIN-01, NFR-PERF-01, NFR-PERF-03 | End-to-end y medición de latencia |
| 4 | El tablero de chancado muestra alimentación, throughput, tolva y paradas. | FR-CRU-01, FR-CRU-02, NFR-PERF-03 | End-to-end |
| 5 | El tablero de plan vs real calcula cumplimiento por turno, frente y destino. | FR-PLAN-03, FR-REC-01, FR-REC-02 | Integración y end-to-end |
| 6 | La vista de flujo de datos muestra fuentes, mensajes por segundo, última señal y errores. | FR-DF-01, FR-DF-02 | End-to-end |
| 7 | El replay reconstruye un turno con controles de tiempo. | FR-RPL-01 | End-to-end |
| 8 | Existen pruebas unitarias del dominio y al menos una prueba end-to-end. | NFR-MNT-01 | CI |
| 9 | La ejecución con la misma semilla produce el mismo turno. | FR-SIM-02, FR-SIM-06, NFR-DET-01 | *Golden run* automatizada |
| 10 | El alcance y la arquitectura están documentados y son reproducibles. | Documentos 01 a 09, NFR-PORT-01 | Revisión documental y arranque |

Los 10 criterios del alcance siguen cubiertos. El criterio 10 no se asigna a un requisito funcional porque es documental y ahora incluye los documentos 05 a 09.

### 8.2 Matriz de trazabilidad

#### 8.2.1 Fuente, componente y verificación

| FR | Fuente | Componente de arquitectura | Método de verificación |
|---|---|---|---|
| FR-PLAN-01 | US-04; Alcance §2 y §3; Backlog F5; ADR-012 | `apps/web`, `apps/server` (API), `packages/db` | Integración y end-to-end |
| FR-PLAN-02 | US-04; Arquitectura §4; ADR-012 | `apps/server` (API), `apps/simulator` | Integración MQTT |
| FR-PLAN-03 | US-04 y US-05; ADR-012 | `apps/server` (Reconciliación), `apps/web` | Integración y end-to-end |
| FR-SIM-01 | Alcance §2, §3 y §7 (criterio 2); ADR-013 | `apps/simulator`, `packages/domain` | End-to-end |
| FR-SIM-02 | Alcance §6 y §7 (criterio 9); ADR-008, ADR-009 y ADR-014.3 | `apps/simulator`, `packages/domain` | *Golden run* |
| FR-SIM-03 | Alcance §6; Arquitectura §1; ADR-008 | `apps/simulator`, `apps/web` | End-to-end |
| FR-SIM-04 | Arquitectura §5; ADR-007, ADR-008 y ADR-009 | `apps/simulator`, `infra` (Mosquitto) | Integración MQTT |
| FR-SIM-05 | Arquitectura §3.1; Backlog F3; ADR-007 y ADR-009 | `apps/server` (Ingesta), `packages/db` | Integración |
| FR-SIM-06 | ADR-011 | `apps/simulator`, `apps/server` (API e Ingesta), `packages/db` | Integración |
| FR-DRILL-01 | US-09; Alcance §2; 07 §6 | `apps/simulator`, `apps/server`, `apps/web` | End-to-end |
| FR-TWIN-01 | Alcance §3; Arquitectura §3.1; ADR-008 y ADR-010 | `apps/server` (Gemelo), `apps/web` (WebSocket) | Integración y end-to-end |
| FR-TWIN-02 | Arquitectura §9; Backlog F3; ADR-009 y ADR-010 | `apps/server` (Gemelo), `packages/db` | Prueba de reinicio |
| FR-TWIN-03 | Alcance §3; Backlog §3; ADR-010 y ADR-014.1 | `apps/server` (Gemelo), `packages/domain` | Unitarias e integración |
| FR-TWIN-04 | ADR-010 | `apps/server` (Gemelo, API y WebSocket), `apps/web` | Integración |
| FR-MAP-01 | US-01; Alcance §7 (criterio 3); ADR-005 y ADR-008 | `apps/web`, `apps/server` (WebSocket) | End-to-end y revisión visual |
| FR-FLT-01 | US-01 y US-02; Backlog F4; ADR-009 | `apps/web`, `apps/server` (API) | End-to-end |
| FR-FLT-02 | Backlog §3 y F5; ADR-014.1 | `apps/server` (Gemelo), `apps/web` | Integración y end-to-end |
| FR-CRU-01 | US-03; Alcance §7 (criterio 4); ADR-008 y ADR-009 | `apps/web`, `apps/server` (WebSocket) | End-to-end |
| FR-CRU-02 | Arquitectura §5.3; Backlog §3; ADR-014.1 | `apps/server` (Gemelo), `packages/domain` | Unitarias e integración |
| FR-REC-01 | US-05; Alcance §7 (criterio 5); ADR-010, ADR-012 y ADR-013 | `apps/server` (Reconciliación), `apps/web` | Integración y end-to-end |
| FR-REC-02 | Alcance §1; Backlog F5; ADR-010, ADR-011 y ADR-012 | `apps/server` (Reconciliación), `apps/web` | End-to-end |
| FR-REC-03 | US-11; Alcance §5.1; ADR-014.1 | `apps/server` (API), `apps/web` | End-to-end, si entra en el MVP |
| FR-RPL-01 | US-07; Alcance §7 (criterio 7); ADR-008, ADR-010 y ADR-011 | `apps/server` (API), `apps/web` | End-to-end |
| FR-DF-01 | US-06; Backlog F6; ADR-010 | `apps/web` (React Flow), `apps/server` (Ingesta) | End-to-end |
| FR-DF-02 | US-06; Alcance §7 (criterio 6); Backlog §3; ADR-008 y ADR-009 | `apps/server` (Ingesta), `apps/web` | End-to-end y prueba de carga |
| FR-DF-03 | Backlog F6; ADR-009 y ADR-010 | `apps/server` (API), `apps/web` | End-to-end |
| FR-ALR-01 | US-08; Backlog §4; ADR-008 y ADR-014.2 | `apps/server` (Gemelo), `packages/domain`, `apps/web` | Unitarias y end-to-end |
| FR-SCN-01 | US-10; Backlog F2 y F4; ADR-011 y ADR-014.3 | `apps/simulator`, `apps/web` | End-to-end |

#### 8.2.2 Etapa VSM, contexto DDD y ADR

| FR | Etapa VSM | Contexto DDD | ADR relacionado |
|---|---|---|---|
| FR-PLAN-01 | Planificación | Planificación de turno | ADR-012 |
| FR-PLAN-02 | Planificación | Planificación de turno | ADR-012 |
| FR-PLAN-03 | Planificación y reconciliación | Planificación; Reconciliación | ADR-012 |
| FR-SIM-01 | Todas las etapas (perforación → chancado) | Simulación | ADR-013; ADR-014.3 |
| FR-SIM-02 | Transversal (simulación) | Simulación | ADR-008; ADR-009; ADR-014.3 |
| FR-SIM-03 | Transversal (tiempo) | Simulación | ADR-008 |
| FR-SIM-04 | Transversal (ingesta) | Simulación; Ingesta y observabilidad | ADR-007; ADR-008; ADR-009 |
| FR-SIM-05 | Transversal (ingesta) | Ingesta y observabilidad | ADR-007; ADR-009 |
| FR-SIM-06 | Transversal (corrida) | Simulación | ADR-011 |
| FR-DRILL-01 | Perforación y voladura | Operación de mina | ADR-009; D-03 (abierta) |
| FR-TWIN-01 | Todas las etapas | Operación; Chancado | ADR-008; ADR-010 |
| FR-TWIN-02 | Transversal (recuperación) | Ingesta y observabilidad | ADR-009; ADR-010 |
| FR-TWIN-03 | Carguío a reconciliación | Operación; Reconciliación | ADR-010; ADR-014.1 |
| FR-TWIN-04 | Transversal (fuente de verdad) | Ingesta y observabilidad | ADR-010 |
| FR-MAP-01 | Acarreo | Operación de mina | ADR-005; ADR-008 |
| FR-FLT-01 | Carguío y descarga | Operación de mina | ADR-009; ADR-014.1 |
| FR-FLT-02 | Carguío y acarreo | Operación de mina | ADR-014.1 |
| FR-CRU-01 | Chancado primario | Chancado primario | ADR-008; ADR-009 |
| FR-CRU-02 | Chancado primario | Chancado primario | ADR-014.1 |
| FR-REC-01 | Reconciliación | Reconciliación | ADR-010; ADR-012; ADR-013; ADR-014.1 |
| FR-REC-02 | Reconciliación | Reconciliación; Planificación | ADR-010; ADR-011; ADR-012 |
| FR-REC-03 | Reconciliación | Reconciliación | ADR-014.1 |
| FR-RPL-01 | Transversal (replay) | Sin contexto; vista de solo lectura | ADR-008; ADR-010; ADR-011 |
| FR-DF-01 | Transversal (salud) | Ingesta y observabilidad | ADR-010 |
| FR-DF-02 | Transversal (salud) | Ingesta y observabilidad | ADR-008; ADR-009; ADR-010 |
| FR-DF-03 | Transversal (salud) | Ingesta y observabilidad | ADR-009; ADR-010 |
| FR-ALR-01 | Transversal (alertas) | Ingesta y observabilidad | ADR-008; ADR-014.2 |
| FR-SCN-01 | Todas las etapas (escenario) | Simulación | ADR-011; ADR-014.3 |

Todas las ADR de la columna están en estado **Propuesto** (08, §2); no se declaran aceptadas. La referencia “D-03” es una decisión abierta de este SRS, no una ADR.

## 9. Decisiones abiertas

| ID | Decisión | Estado actual | Referencia | Siguiente paso |
|---|---|---|---|---|
| D-01 | Stack del MVP | TypeScript, Next.js, Fastify, PostgreSQL/TimescaleDB, MQTT y Docker, según la arquitectura §7; propuesto y sujeto a confirmación | ADR-001 a ADR-007 (propuestas); 02 §7 | Revisar con el docente y registrar la decisión |
| D-02 | Uso de VSM, DDD o TOGAF | **Resuelta:** VSM + DDD-lite adoptados como métodos de análisis; TOGAF excluido. La documentación usa ADR + C4 + SRS | 05 §2 (DL-003 y DL-004); 06, 07, 08 y 09 | Ninguno; se refleja en la sección 1.1 |
| D-03 | Nivel de detalle de perforación y voladura | El alcance propone eventos de inicio y fin, sin simular la máquina en detalle | 07 §10; ADR-009 y ADR-014.3 (propuestos) | Confirmar el nivel de detalle y los datos asociados |
| D-04 | Geometría y mapa 2D/2.5D | Geometría simple de bancos, frentes y rutas; mapa 2D/2.5D | 08 Anexo P1-04; 09 §7 | Confirmar el detalle, SRID y fuente de la geometría |
| D-05 | Contratos de API, WebSocket y MQTT | Tópicos y envelope definidos; envelope v2 y payloads TBD | ADR-009; 08 Anexo P1-01; 09 §5 | Definir contratos antes de implementar |
| D-06 | Fórmulas de KPIs y reconciliación | TBD, incluido el punto de control de la alerta de desvío | ADR-014.1; 06 Q-06 y Q-07; 07 §7 | Acordar fórmulas y casos de prueba |
| D-07 | Parámetros del simulador | TBD: velocidades, capacidades, tiempos de carga y descarga, colas y paradas | ADR-014.3; 07 §7 | Definir valores configurables y reproducibles |
| D-08 | Autenticación posterior al MVP | OIDC/RBAC, auditoría y segregación IT/OT previstos para después del MVP | ADR-006 (propuesta); 09 §3.4 | Mantener el MVP local sin autenticación |
| D-09 | Reasignación manual de camiones | US-12 es Could post-MVP | 07 §10; ADR-012 | No incluirla en el MVP |
| D-10 | Tendencias y cumplimiento histórico | US-11 es Could | ADR-014.1 (pregunta abierta) | Decidir si se incluye en la demo del MVP |
| D-11 | Parámetros de los escenarios | Normal, parada de chancador y falla de camión; duración y frecuencia TBD | ADR-014.3; 07 §7 | Definir el comportamiento de cada escenario |
| D-12 | Retención y volumen de datos | 7 días de telemetría y 30 días de eventos por defecto, configurables; dominio temporal TBD | ADR-008; NFR-RET-01 | Confirmar dominio, tamaño de disco y política de purga |
| D-13 | Accesibilidad y responsive | Revisión básica prevista en F7; umbral formal TBD | 03 F7; 09 §7 | Acordar el criterio de aceptación |
| D-14 | Fuentes reales prioritarias | FMS, GPS y SCADA/PLC; adaptadores futuros | ADR-004 (propuesta); 09 §3.4 | Definir orden y protocolo: OPC UA, ISO 15143-3 o Sparkplug B |

**Ninguna ADR-008 a ADR-014 está aceptada.** Las referencias de esta tabla son propuestas; no se declaran decisiones tomadas.

### 9.1 Brechas P0 y preguntas abiertas de 06 a 09

| Brecha | ADR (estado) | Requisitos afectados | Pregunta abierta principal | Fuente |
|---|---|---|---|---|
| P0-01 | ADR-008 (Propuesto) | NFR-PERF-01, NFR-RET-01, FR-SIM-03/04, FR-ALR-01, FR-RPL-01 | ¿La retención y el 1 Hz se miden en tiempo simulado o real? ¿La UI muestra ambos relojes siempre? | 08 ADR-008; 06 §9; 07 P0-01 |
| P0-02 | ADR-009 (Propuesto) | FR-SIM-05, FR-FLT-01, FR-TWIN-02/03, NFR-DET-01 | ¿Qué valor tiene la ventana de reordenamiento? ¿La cola se mide con evento de llegada o con telemetría? | 08 ADR-009; 06 Q-03 y Q-08; 07 P0-02 |
| P0-03 | ADR-010 (Propuesto) | FR-TWIN-02/03/04, FR-REC-01/02, NFR-REC-01 | ¿Algún derivado debe publicarse en MQTT? ¿La telemetría se deduplica por `eventId` o por `(runId, streamId, seq)`? | 08 ADR-010; 06 Q-09; 07 P0-03 |
| P0-04 | ADR-011 (Propuesto) | FR-SIM-06, FR-REC-02, FR-RPL-01, NFR-REC-01 | ¿Quién emite `shift.started` y `shift.ended`? ¿Cuánto dura la ventana de gracia? ¿Se permite multi-turno? | 08 ADR-011; 06 Q-05; 07 P0-04 |
| P0-05 | ADR-012 (Propuesto) | FR-PLAN-01/02/03, FR-REC-01/02 | ¿Plan base o versión vigente por tramo? ¿Quién publica ajustes a mitad de turno? | 08 ADR-012; 06 Q-04; 07 P0-05 |
| P0-06 | ADR-013 (Propuesto) | FR-SIM-01, FR-REC-01, NFR-DET-01 | ¿Clasificación en carguío o en descarga? ¿Un frente puede tener más de un material? | 08 ADR-013; 06 Q-01; 07 P0-06 |
| P0-07 | ADR-014.1 a 014.3 (Propuesto) | FR-TWIN-03, FR-FLT-02, FR-CRU-02, FR-REC-01/03, FR-ALR-01, FR-SCN-01, NFR-DET-01 | ¿Fórmulas, umbrales y parámetros? ¿`blocked` cuenta como parada? | 08 ADR-014; 06 Q-02, Q-06 y Q-07; 07 §7 |

Las preguntas abiertas de 06 §10.3, 07 §10, 08 §4 y 09 §7 siguen vigentes. Este SRS no las cierra por sí solo: las remite a las ADR y a la revisión con el docente.

## 10. Control de cambios y próximos pasos

| Versión | Fecha | Cambio | Estado |
|---|---|---|---|
| 0.1 | 22 de octubre de 2026 | Borrador inicial a partir del alcance, la arquitectura y el backlog | Para revisión |
| 0.2 | 22 de octubre de 2026 | Se incorporan VSM, DDD-lite, ADR y C4; se resuelve D-02; se aclaran NFR-PERF-01, NFR-DET-01 y NFR-RET-01; se agregan FR-PLAN-03, FR-SIM-06 y FR-TWIN-04; se amplía el envelope, la fuente de verdad y la trazabilidad; se registran las brechas P0. | Para revisión |

Reglas de cambio:

- Todo cambio de requisito actualiza la trazabilidad de la sección 8 y se registra en esta tabla.
- Si cambia el alcance, se actualiza el documento 01 y se revisan el backlog y la arquitectura.
- Una ADR propuesta no se considera aceptada hasta que el documento 08 registre su aceptación con fecha y responsable.
- El documento no se considera aprobado hasta la revisión del docente.

Próximos pasos:

1. Revisar este borrador con el docente y confirmar las prioridades.
2. Cerrar las ADR-008 a ADR-014 y actualizar 02, 03 y 05 cuando se acepten.
3. Confirmar los TBD: dominio de retención, latencia p95, dominio de 1 Hz y throughput, fórmulas, umbrales y clasificación ore/waste.
4. Convertir los criterios de aceptación en casos de prueba, incluida la *golden run* de determinismo.
5. No iniciar la implementación hasta confirmar los supuestos del alcance y las ADR bloqueantes.
