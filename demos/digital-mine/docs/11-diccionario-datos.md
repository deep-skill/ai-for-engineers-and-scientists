# Digital Mine — Diccionario de datos sintéticos (carguío y acarreo)

| Versión | Fecha | Estado | Dataset |
|---|---|---|---|
| 0.1 | 24 de octubre de 2026 | Generado para revisión | `data/shift-001`, seed 42 |

> **Datos sintéticos.** Este dataset no es una medición de una mina real. Se generó con un simulador de eventos discretos y supuestos documentados. No debe presentarse como operación real ni usarse para inferir rendimiento de un sitio.

## 1. Identificación de la corrida

| Campo | Valor |
|---|---|
| `runId` | `run-001` |
| `shiftId` | `shift-001` |
| Semilla | `42` |
| Inicio simulado | `2026-10-24T06:00:00Z` |
| Duración del turno | 480 min |
| Gracia de cierre | 120 min |
| Flota | 2 palas, 6 camiones |
| Frentes | 2: F-01 ore, F-02 waste |
| Destinos | Chancador primario y botadero |
| Esquema | 0.1 |
| Validación | `pass` (13 checks) |

## 2. Archivos

| Archivo | Contenido | Uso |
|---|---|---|
| `events.jsonl` | Eventos recibidos, con pérdida, tardanza, duplicados e incompletos. | Dataset operativo para análisis. |
| `cycles.csv` | Ciclos reconstruidos desde los eventos recibidos y deduplicados. | Análisis de ciclos, esperas y tonelaje. |
| `manifest.json` | Configuración, semilla, conteos y hash de configuración. | Reproducibilidad y procedencia. |
| `data_quality.json` | Pérdida, cobertura, tardíos, duplicados, incompletos y ciclos afectados. | Diagnóstico de calidad. |
| `validation.json` | Checks de esquema, estados, masas, capacidad y disrupciones. | Evidencia de aceptación. |
| `ground_truth/events.jsonl` | Simulación completa, sin degradación. | Referencia para medir pérdida; no es el dataset operativo. |
| `ground_truth/cycles.csv` | Ciclos completos de referencia. | Contrastar con los ciclos recibidos. |

## 3. Envelope de evento

| Campo | Tipo | Unidad / formato | Descripción |
|---|---|---|---|
| `eventId` | string | — | Identificador determinista; los duplicados conservan el mismo valor. |
| `eventType` | string | — | Tipo de evento. |
| `eventVersion` | integer | — | Versión del contrato; `1`. |
| `runId` | string | — | Corrida. |
| `shiftId` | string | — | Turno. |
| `seq` | integer | — | Secuencia monótona por camión. |
| `streamId` | string | — | Camión. |
| `occurredAt` | string | ISO 8601 UTC | Tiempo simulado del hecho. |
| `sentAt` | string | ISO 8601 UTC | Instante sintético de publicación desde la época fija configurada. |
| `receivedAt` | string | ISO 8601 UTC | Instante sintético de recepción; puede ser posterior por la caída. |
| `siteId` | string | — | `digital-mine`. |
| `source` | string | — | `simulator`. |
| `simulated` | boolean | — | Siempre `true`. |
| `quality` | string | — | `good`, `late`, `duplicate` o `incomplete`. |
| `duplicate` | boolean | — | `true` si es una repetición. |
| `outageId` | string/null | — | `OUT-001` si el evento se vio afectado. |
| `payload` | object | — | Datos del evento. |

### 3.1 Payload

| Campo | Tipo | Unidad | Descripción |
|---|---|---|---|
| `cycleId` | string/null | — | Ciclo al que pertenece el evento; `null` en `truck.down`, `truck.up` y el idle inicial. |
| `truckId` | string | — | Camión. |
| `shovelId` | string | — | Pala. |
| `frontId` | string | — | Frente. |
| `destinationId` | string | — | Destino. |
| `routeId` | string | — | Ruta. |
| `material` | string | — | `ore` o `waste`. Puede faltar en eventos incompletos. |
| `tons` | number | t | Tonelaje en `truck.loaded` y `truck.dumped`; puede faltar en incompletos. |
| `queueId` | string | — | Cola de pala en `truck.queued`. |
| `unavailabilityId` | string | — | Identificador de la indisponibilidad técnica. |
| `reason` | string | — | `technical` en `truck.down`/`truck.up`. |
| `durationMin` | number | min | Duración planificada de la indisponibilidad. |

## 4. Tipos de evento

| Evento | Significado |
|---|---|
| `truck.idle` | Camión disponible, sin ciclo activo. |
| `truck.queued` | Espera en la cola de la pala. |
| `truck.loading_started` | La pala comienza a cargar. |
| `truck.loaded` | Carga terminada; incluye tonelaje. |
| `truck.hauling_started` | Inicio del acarreo al destino. |
| `truck.arrived_at_destination` | Llegada al destino; inicio de la cola de descarga. |
| `truck.dumping_started` | Comienza la descarga. |
| `truck.dumped` | Descarga terminada; incluye tonelaje. |
| `truck.returning` | Retorno a la pala. |
| `truck.down` | Camión indisponible por problema técnico. |
| `truck.up` | Camión vuelve a estar disponible. |

Secuencia normal de un ciclo: `queued → loading_started → loaded → hauling_started → arrived_at_destination → dumping_started → dumped → returning → idle`.

## 5. Ciclos (`cycles.csv`)

| Campo | Unidad | Descripción |
|---|---|---|
| `cycle_id` | — | `truckId-CNNN`. |
| `run_id`, `shift_id` | — | Corrida y turno. |
| `truck_id`, `shovel_id` | — | Equipos. |
| `front_id`, `destination_id` | — | Frente y destino. |
| `material` | — | `ore` o `waste`; puede quedar vacío en un ciclo parcial. |
| `load_tons` | t | Tonelaje cargado o descargado; vacío si no se recibió. |
| `queue_start` | s | Inicio de la cola en pala. |
| `loading_start`, `loading_end` | s | Inicio y fin de carga. |
| `haul_start` | s | Inicio del acarreo. |
| `arrive_destination` | s | Llegada al destino. |
| `dump_start`, `dump_end` | s | Inicio y fin de descarga. |
| `return_start`, `return_end` | s | Inicio y fin del retorno. |
| `queue_time_s` | s | Espera en pala + espera en destino. |
| `loading_time_s` | s | Duración de carga. |
| `haul_time_s` | s | Duración del acarreo. |
| `dump_time_s` | s | Duración de descarga. |
| `return_time_s` | s | Duración del retorno. |
| `cycle_time_s` | s | `return_end - queue_start`. |
| `waiting_time_s` | s | Igual a `queue_time_s` en esta versión. |
| `quality` | — | `complete` o `partial`. |
| `outage_id` | — | Caída que afectó al ciclo. Puede quedar vacío si el evento afectado se perdió; en ese caso, usar `quality` y `data_coverage`. |
| `data_coverage` | % | Eventos del ciclo recibidos sobre 9 requeridos. |
| `ends_after_shift` | boolean | El ciclo termina después de los 480 min del turno, dentro de la gracia. |

Los tiempos están en segundos desde el inicio simulado del turno. `queue_start=0` indica que el camión entró a la cola al inicio del turno; no implica una espera nula.

En ciclos parciales, `queue_time_s` y `waiting_time_s` pueden sumar solo la cola que conserva ambos extremos; ese valor es una espera observada parcial, no el total del ciclo. Comprobar los tiempos de inicio y fin y la columna `quality` antes de comparar medias de espera.

## 6. Disrupciones incluidas

### 6.1 Indisponibilidad técnica de un camión

| Campo | Valor |
|---|---|
| Camión | `T-03` |
| Fracción del turno | 5 % |
| Duración | 24 min |
| Ventana simulada | 07:35:07 – 07:59:07 UTC |
| Eventos | `truck.down` y `truck.up` |
| Mantenimiento | No se generan órdenes, repuestos ni causas detalladas |

El efecto operativo es visible: T-03 tiene 12 ciclos frente a 13 de T-01 y T-02, y acumula los 24 min de indisponibilidad definidos. No hay registros de mantenimiento.

### 6.2 Caída del servidor de despacho

| Campo | Valor |
|---|---|
| Ventana simulada | 09:30 – 10:00 UTC |
| Duración | 30 min |
| Causa | `bad_weather` |
| Identificador | `OUT-001` |
| Cobertura dentro de la ventana | 50 % (26 de 52 eventos únicos) |
| Eventos perdidos | 26 |
| Tardíos | 16 |
| Duplicados | 5 |
| Incompletos | 6 |
| Normales dentro de la ventana | 4 |

La operación física continúa; lo que falla es la recepción. Los eventos tardíos conservan `occurredAt` y tienen `receivedAt` posterior. Los duplicados conservan `eventId`. Los incompletos pueden perder `tons` o `material`.

## 7. Resumen de calidad

| Métrica | Valor |
|---|---|
| Eventos esperados (verdad sintética) | 818 |
| Filas recibidas | 797 |
| Eventos únicos recibidos | 792 |
| Eventos faltantes | 26 |
| Cobertura global | 96.82 % |
| Cobertura durante la caída | 50.00 % |
| Ciclos de referencia | 90 |
| Ciclos recibidos | 90 |
| Ciclos completos | 79 |
| Ciclos parciales | 11 |
| Ciclos no observables | 0 |

La cobertura global es alta porque la caída dura 30 min de 480; la cobertura **dentro de la ventana** es la métrica que refleja la baja calidad.

## 8. Reglas de interpretación

- No imputar `load_tons`, `material` ni tiempos faltantes en un ciclo `partial`; reportar la cobertura.
- No sumar `cycles.csv` como si fuera la producción completa: faltan eventos y hay ciclos parciales.
- Usar `ground_truth/` solo para medir pérdida y validar. No mezclarlo con el dataset operativo.
- Un evento `duplicate` no debe contarse dos veces; deduplicar por `eventId`.
- Un evento `late` sigue siendo válido, pero su `receivedAt` no es el instante del hecho.
- `truck.down` no es una orden de mantenimiento; es un estado operativo.

## 9. Reproducción

```bash
cd demos/digital-mine/simulator
python3 -m venv .venv
.venv/bin/pip install -e .
.venv/bin/python -m mine_sim \
  --config config/shift-001.json \
  --seed 42 \
  --out data/shift-001
```

La misma configuración y semilla producen los mismos eventos y ciclos. `sentAt` y `receivedAt` usan la época real fija de la configuración; la fecha de generación del manifiesto es la única que cambia.

## 10. Limitaciones

- Parámetros de tiempos, capacidades y rutas son supuestos, no mediciones.
- No se modelan perforación, voladura, chancado dinámico, mantenimiento, cambio de turno ni optimización.
- La caída se modela a nivel de recepción; no simula la recuperación técnica del servidor.
- El 5 % de indisponibilidad se aplica en un bloque de 24 min al inicio de un ciclo; no se modelan paradas parciales dentro de un ciclo.
- No hay telemetría a 1 Hz ni datos de posición; solo eventos y ciclos.
- Los ciclos sin ningún evento recibido no aparecen en `cycles.csv`; su conteo requiere la referencia sintética. La cobertura de eventos tampoco garantiza que todos los campos del payload estén completos.
