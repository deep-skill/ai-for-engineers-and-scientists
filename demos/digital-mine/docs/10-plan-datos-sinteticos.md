# Digital Mine — Plan de datos sintéticos: carguío y acarreo

| Versión | Fecha | Estado |
|---|---|---|
| 0.1 | 24 de octubre de 2026 | Plan para revisión; primera corrida ejecutada |

> Este documento conserva el plan y el resultado de la primera generación de datos sintéticos de carguío y acarreo. El generador local existe; los parámetros siguen sujetos a revisión. No son mediciones de una mina real ni una implementación completa del gemelo.

## 1. Objetivo

Generar un primer dataset reproducible de un turno de carguío y acarreo, con eventos y ciclos completos, para:

- Alimentar el análisis de datos de la sesión 7.
- Probar el contrato de eventos y el modelo de ciclos del SRS.
- Comparar plan vs real en una etapa posterior.
- Servir como base para el gemelo, sin construir todavía la interfaz ni el replay.

El resultado debe ser un dataset pequeño, legible y verificable, no una simulación de mina completa.

## 2. Alcance de la primera generación

**Dentro:**

- Un sitio, un tajo y un turno de 8 horas simuladas.
- 2 palas, 6 camiones y 2 frentes de carguío, uno ore y uno waste (configurable).
- Material declarado por frente: ore o waste.
- Rutas simples frente → destino, con tiempo de viaje configurable.
- Destinos: chancador primario para ore y botadero para waste.
- Cola FIFO en pala y en destino.
- Ciclo camión: idle → queued → loading → hauling → dumping → returning → idle.
- Tonelaje por ciclo, tiempos de espera, servicio, viaje y ciclo total.
- Semilla reproducible y configuración versionada.

**Fuera:**

- Perforación, voladura y chancado como procesos dinámicos.
- Geología, leyes, dilución y mezcla.
- Órdenes de mantenimiento y detalle de causa; la indisponibilidad técnica se refleja solo como estado operativo.
- Cambio de turno.
- Optimización de despacho o reasignación.
- Telemetría a 1 Hz y visualización en vivo.
- Interfaz web, WebSocket, replay visual y alertas.
- Integración con FMS, GPS o SCADA reales.

La descarga se incluye solo como evento mínimo para cerrar el ciclo. El chancador se modela como un destino con tiempo de servicio, no como una planta de chancado.

### 2.1 Escenarios de realismo incluidos

La primera generación incluye dos disrupciones controladas. No son fallas del simulador: son parte del escenario y deben quedar registradas en el manifiesto.

| Escenario | Regla | Efecto en los datos |
|---|---|---|
| **Indisponibilidad de un camión** | Un camión acumula 5 % del turno (24 min de 480) sin operar por problemas técnicos. Se aplica en un bloque, en un límite de ciclo. | Eventos `truck.down` / `truck.up`; menos ciclos para ese camión; menor utilización. No se generan órdenes de mantenimiento. |
| **Caída del servidor de despacho** | 30 minutos continuos en algún momento del turno, por mal tiempo. La operación física continúa, pero la recepción de datos se degrada. | Eventos faltantes, tardíos, duplicados o incompletos; ciclos parciales o no observables; métricas de calidad y cobertura. |

La caída se modela como un problema de **recepción**, no como una parada de la mina. El simulador sigue generando la operación; el dataset recibido es incompleto. Para poder medir la pérdida se conserva una **verdad sintética** separada (`ground_truth/`), claramente marcada y no destinada al análisis operativo.

## 3. Relación con el curso y el proyecto

La sesión 7 prioriza construir datos sintéticos de acarreo y analizarlos. Esta primera generación cubre carguío y acarreo porque el ciclo de acarreo no se entiende sin la carga. El dataset permite practicar exploración, calidad de datos, tiempos de espera y comparación plan vs real.

El plan es compatible con los documentos existentes:

- `04-srs.md`: FR-SIM-01, FR-SIM-02, FR-SIM-05, FR-TWIN-03 y FR-FLT-01.
- `06-vsm.md`: puntos de captura y colas en pala y destino.
- `07-ddd.md`: agregados `Ciclo`, `EquipoOperativo`, `Frente`, `Destino`.
- `08-adr.md`: eventos, orden, deduplicación y fuente de verdad.
- `09-c4.md`: documentación de componentes; esta primera generación es local y no requiere infraestructura cloud.

## 4. Método de simulación

Se emplea simulación de eventos discretos con SimPy, colas FIFO mediante `simpy.Resource` y separación entre camión, recurso y ruta. Los tiempos de servicio y viaje proceden de distribuciones configurables.

Los frentes, rutas, capacidades y tiempos son supuestos propios de este escenario. No se calibran contra una mina real. La primera generación usa tiempos por ruta y no requiere pathfinding.

## 5. Modelo de datos

### 5.1 Eventos (`events.jsonl`)

Un evento por línea, con el envelope propuesto en el SRS:

| Campo | Tipo | Descripción |
|---|---|---|
| `eventId` | string | Identificador determinista de la corrida. |
| `eventType` | string | `truck.queued`, `truck.loading_started`, `truck.loaded`, `truck.hauling_started`, `truck.arrived_at_destination`, `truck.dumping_started`, `truck.dumped`, `truck.returning`, `truck.idle`, `truck.down`, `truck.up`. |
| `eventVersion` | integer | Versión del contrato; iniciar en 1. |
| `runId` | string | Corrida de simulación. |
| `shiftId` | string | Turno simulado. |
| `seq` | integer | Secuencia monótona por camión. |
| `streamId` | string | Identificador del camión. |
| `occurredAt` | string | Tiempo simulado en ISO 8601, con época fija. |
| `sentAt` | string | Instante sintético de envío, calculado desde `real_epoch`. |
| `receivedAt` | string | Instante sintético de recepción; puede ser posterior por la caída. |
| `siteId` | string | Sitio. |
| `source` | string | `simulator`. |
| `simulated` | boolean | Siempre `true`. |
| `quality` | string | `good`, `late`, `duplicate` o `incomplete`. |
| `duplicate` | boolean | `true` si es una repetición de un evento ya recibido. |
| `outageId` | string | Identificador de la caída, si el evento se vio afectado. |
| `payload` | object | Datos del evento: `cycleId`, camión, pala, frente, destino, material, tonelaje. |

### 5.2 Ciclos (`cycles.csv`)

Una fila por ciclo observable, completo o parcial según los eventos recibidos. La capa `ground_truth/` conserva los ciclos completos de referencia:

| Campo | Unidad | Descripción |
|---|---|---|
| `cycle_id` | — | Identificador determinista. |
| `run_id`, `shift_id` | — | Corrida y turno. |
| `truck_id`, `shovel_id` | — | Equipos. |
| `front_id`, `destination_id` | — | Frente y destino. |
| `material` | — | `ore` o `waste`. |
| `load_tons` | t | Tonelaje cargado. |
| `queue_start`, `loading_start`, `loading_end` | s | Tiempos simulados. |
| `haul_start`, `arrive_destination`, `dump_start`, `dump_end` | s | Tiempos simulados. |
| `return_start`, `return_end` | s | Tiempos simulados. |
| `queue_time_s`, `loading_time_s`, `haul_time_s`, `dump_time_s`, `return_time_s` | s | Duraciones derivadas. |
| `cycle_time_s` | s | `return_end - queue_start`. |
| `waiting_time_s` | s | Suma de esperas en pala y destino. |
| `quality` | — | `complete` o `partial`; los ciclos sin eventos recibidos no tienen fila y se cuentan como no observables en calidad. |
| `outage_id` | — | Caída que afectó al ciclo, si aplica. |
| `data_coverage` | % | Porcentaje de eventos del ciclo que llegaron. |

### 5.3 Manifiesto (`manifest.json`)

- `schemaVersion`, `runId`, `shiftId`, `seed`.
- Configuración completa y hash.
- Flota, frentes, destinos, rutas y distribuciones.
- Fecha real de generación, filas de eventos y ciclos.
- `simulated: true`, `source: simulator`.
- Hash de la configuración (`configSha256`).
- `disruptions`: indisponibilidad del camión y caída del servidor, con ventana, causa y parámetros de entrega.

### 5.4 Validación (`validation.json`)

- Conteos y rangos.
- Invariantes verificados.
- Errores y advertencias.
- Resumen de tonelaje, ciclos y eventos; los detalles de las disrupciones quedan en los checks.
- Resultado global: `passed: true` o `false`.

### 5.5 Verdad sintética y datos recibidos

El dataset distingue dos capas:

| Capa | Archivo | Uso |
|---|---|---|
| **Verdad sintética** | `ground_truth/events.jsonl`, `ground_truth/cycles.csv` | Registro completo de lo que ocurrió en la simulación. Sirve para medir pérdida y validar. No es el dataset de análisis operativo. |
| **Datos recibidos** | `events.jsonl`, `cycles.csv` | Lo que efectivamente llegó al servidor durante y después de la caída. Es la entrada para el análisis y contiene huecos, tardíos, duplicados e incompletos. |

Ambas capas se identifican como sintéticas. La verdad sintética no debe presentarse como medición real ni usarse para ocultar la degradación del dataset recibido.

### 5.6 Calidad de datos (`data_quality.json`)

Resumen de la caída y su efecto:

- Ventana de la caída: inicio, fin, duración y causa.
- Eventos esperados, recibidos, faltantes, tardíos, duplicados e incompletos.
- Cobertura por camión y por tipo de evento.
- Ciclos completos, parciales y no observables.
- Comparación entre verdad sintética y datos recibidos.
- Supuestos de la degradación (porcentajes de pérdida, retraso, duplicación e incompletitud).

## 6. Lógica de simulación

- **Método:** simulación de eventos discretos con SimPy.
- **Lenguaje propuesto:** Python 3.11+ y SimPy 4.
- **Alternativa:** TypeScript con un event loop propio, si se prefiere alinear el stack. El dataset resultante es independiente del lenguaje.
- **Semilla:** una semilla maestra, con flujos pseudoaleatorios por camión, pala y destino. La reproducción se garantiza para la misma configuración; cambiar la flota puede cambiar las colas y la asignación de muestras en recursos compartidos.
- **Asignación:** fija por turno; cada camión tiene una pala asignada. No hay optimización.
- **Colas:** FIFO en pala y destino. El camión espera si el recurso está ocupado.
- **Tiempos:** distribuciones triangulares configurables. Los valores iniciales son supuestos documentados, no mediciones.
- **Corte de turno:** no se inician ciclos nuevos después del fin del turno; el ciclo en curso puede terminar dentro de la gracia y se marca `ends_after_shift`. La validación comprueba que la corrida incluida cierre sus ciclos.
- **Estados:** la máquina de estados del SRS; cada transición emite un evento.
- **Tonelaje:** capacidad del camión × factor de llenado; se registra en `truck.loaded` y se descuenta en `truck.dumped`.
- **Ore/waste:** se declara en el frente y se conserva en el ciclo. No hay reclasificación.
- **Indisponibilidad del camión:** un camión acumula 5 % del turno sin operar. Se detiene en un límite de ciclo, emite `truck.down` y luego `truck.up`; no se generan órdenes de mantenimiento. La duración se calcula como `0.05 × 480 min = 24 min`. Esta versión implementa un solo bloque.
- **Caída del servidor de despacho:** la operación continúa, pero la recepción se degrada durante 30 min. Para cada evento dentro de la ventana se aplica un patrón configurable: pérdida, entrega tardía, duplicación, entrega incompleta o entrega normal. Los eventos tardíos conservan `occurredAt` y reciben un `receivedAt` posterior. Los duplicados conservan el mismo `eventId`. La verdad sintética se guarda aparte.
- **Calidad de datos:** la proyección se calcula desde los eventos recibidos y deduplicados; cada ciclo observable se marca `complete` o `partial`. Los no observables se cuentan por comparación con la referencia. Las duraciones individuales sin sus dos extremos quedan vacías; la espera total de un ciclo parcial puede sumar solo una de las colas observadas, por lo que no debe interpretarse como la espera completa.

## 7. Salidas y estructura

```text
demos/digital-mine/
  simulator/
    README.md
    pyproject.toml
    config/shift-001.json
    src/mine_sim/
    tests/test_generation.py
    data/shift-001/
      events.jsonl
      cycles.csv
      manifest.json
      validation.json
      data_quality.json
      ground_truth/
        events.jsonl
        cycles.csv
  docs/
    10-plan-datos-sinteticos.md
    11-diccionario-datos.md
```

Comando desde `demos/digital-mine/simulator/`, tras instalar el paquete según su README:

```bash
.venv/bin/python -m mine_sim \
  --config config/shift-001.json \
  --seed 42 \
  --out data/shift-001
```

## 8. Validación y criterios de aceptación

1. La misma semilla y configuración producen los mismos eventos y ciclos, ignorando `sentAt` y la fecha real del manifiesto.
2. Todos los ciclos respetan la secuencia de estados.
3. No hay tiempos negativos ni eventos fuera del turno, salvo la ventana de gracia declarada.
4. La suma de tonelaje cargado es igual a la suma de tonelaje descargado.
5. Ningún camión supera su capacidad.
6. Cada ciclo referencia equipos, frente y destino existentes.
7. El dataset pasa la validación de esquema.
8. Existe un diccionario de datos con unidades y supuestos.
9. El resumen exploratorio muestra ciclos, tonelaje, esperas y utilización.
10. El dataset se identifica como sintético en manifiesto, documentación y nombres de archivo.
11. El camión afectado acumula 5 % ± 1 punto porcentual de indisponibilidad, con eventos `truck.down`/`truck.up` y sin órdenes de mantenimiento.
12. La caída del servidor dura 30 min ± 1 min, está registrada en el manifiesto y produce eventos faltantes, tardíos, duplicados o incompletos.
13. La calidad de datos reporta cobertura, pérdida, tardanza, duplicados e incompletos; los ciclos afectados quedan `partial` o `missing`.
14. La verdad sintética y los datos recibidos son distinguibles y no se mezclan en el análisis operativo.

## 9. Fases

| Fase | Entregable | Criterio de salida |
|---|---|---|
| 0. Esqueleto | 1 camión, 1 pala, 1 ruta, 1 destino | Un ciclo completo con eventos y CSV válidos. |
| 1. Turno completo con disrupciones | 2 palas, 6 camiones, 2 frentes, ore/waste, camión al 5 % y caída de 30 min | Un turno de 8 h con ciclos, eventos y datos degradados. |
| 2. Validación | Pruebas e informe de calidad | Determinismo, invariantes y métricas de disrupción en verde. |
| 3. Diccionario y análisis | `11-diccionario-datos.md` y resumen | Dataset comprensible y analizable. |
| 4. Opcional | Telemetría 1 Hz y escenarios adicionales | Solo si el análisis lo necesita. |

### 9.1 Resultado de la primera corrida

La primera corrida quedó preparada con `seed=42` y `config/shift-001.json`:

- 90 ciclos, 818 eventos de verdad sintética y 797 filas recibidas.
- 26 eventos faltantes; cobertura global 96.82 %.
- Caída de 30 min con cobertura de 50 % dentro de la ventana: 16 tardíos, 5 duplicados, 6 incompletos y 4 normales.
- 79 ciclos completos y 11 parciales.
- T-03 con 24 min de indisponibilidad (5 %) y sin registros de mantenimiento.
- `validation.json` en `pass` con 13 checks.

## 10. Decisiones abiertas

| ID | Decisión | Recomendación |
|---|---|---|
| DD-01 | Lenguaje del simulador | Python + SimPy para la simulación de eventos discretos; el dataset es agnóstico. |
| DD-02 | Formato de salida | JSONL para eventos y CSV para ciclos; agregar Parquet/SQLite después si hace falta. |
| DD-03 | Alcance del primer turno | Incluir descarga y destino simple; no modelar chancado dinámico. |
| DD-04 | Cantidad de turnos | Uno primero; luego tres semillas para comparar variabilidad. |
| DD-05 | Telemetría | No incluir 1 Hz en la primera generación; solo eventos y ciclos. |
| DD-06 | Ubicación del código | `demos/digital-mine/simulator/` como referencia del docente, separada del trabajo del alumno. |
| DD-07 | Parámetros | Supuestos documentados; no usar las funciones de tiempo de otro proyecto como si fueran de Digital Mine. |
| DD-08 | Camión con indisponibilidad | Un camión, 5 % del turno (24 min), en un bloque al inicio de un ciclo; configurable. |
| DD-09 | Caída del servidor | 30 min continuos, causa `bad_weather`; 50 % de eventos perdidos, 20 % tardíos, 10 % duplicados, 10 % incompletos y 10 % normales. Valores iniciales, ajustables. |
| DD-10 | Verdad sintética | Guardar `ground_truth/` para medir la pérdida; no usarla como dataset operativo. |

## 11. Riesgos

- **Sobre-modelar:** agregar chancado, mantenimiento o despacho antes de tener un ciclo válido.
- **Confundir sintético con real:** etiquetar todo y no usar cifras de otro proyecto sin decirlo.
- **Parámetros arbitrarios:** documentar cada supuesto y su rango.
- **Contrato inestable:** versionar el esquema y el manifiesto.
- **Determinismo aparente:** usar flujos RNG separados y comparar la secuencia completa, no solo los totales.
- **Confundir verdad sintética con datos recibidos:** separar `ground_truth/` y documentar que no es el dataset operativo.
- **Caída mal modelada:** si se pierden eventos, no imputar datos; marcar ciclos como `partial` o `missing`.

## 12. Próximo paso

Revisar `data/shift-001/` contra `ground_truth/`, validar que las disrupciones se lean con claridad y usar el dataset en el análisis de la sesión 7. La telemetría a 1 Hz y los escenarios adicionales quedan para una fase posterior.
