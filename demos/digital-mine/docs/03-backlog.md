# Digital Mine — Backlog del MVP

> Proyecto en preparación. Este documento describe el MVP propuesto; la implementación está pendiente.

## 1. Fases

### F0 — Fundaciones

- Monorepo pnpm + Turborepo.
- TypeScript estricto, Biome y configuración compartida.
- Docker Compose con PostgreSQL/TimescaleDB y Mosquitto.
- Variables de entorno y `.env.example`.
- README con arranque local.
- CI básica (lint, typecheck y tests).

**Salida:** el repositorio compila y levanta la infraestructura sin implementar aún la operación.

### F1 — Dominio y base de datos

- Entidades: sitio, banco, frente, destino, ruta, equipo, turno, plan, asignación.
- Tipos de evento y envelope versionado.
- Máquinas de estado de camión, pala, perforadora y chancador.
- Esquema y migraciones de base de datos.
- Datos semilla de un sitio y una flota.
- Pruebas unitarias del dominio.

**Salida:** dominio probado y base de datos reproducible.

### F2 — Simulador sintético

- Layout del sitio: tajo, bancos, frentes, rutas, botadero y chancador.
- Plan de turno y asignación de flota.
- Movimiento de camiones con rutas, velocidades y colas.
- Ciclos de carguío, acarreo, descarga y retorno.
- Eventos de perforación y voladura.
- Alimentación, throughput, tolva y paradas del chancador.
- Escenarios: turno normal, parada de chancador y falla de camión.
- Semilla reproducible y aceleración del tiempo configurable.
- Publicación MQTT.

**Salida:** un turno completo se genera y se publica por MQTT.

### F3 — Ingesta y gemelo

- Suscripción MQTT y validación de eventos con Zod.
- Deduplicación por `eventId`.
- Persistencia de telemetría y eventos.
- Estado en memoria del gemelo y reconstrucción desde la base.
- Proyección de ciclos y cálculo de KPIs.
- API REST de estado, histórico, plan y salud.
- WebSocket con snapshot y deltas.
- Replay por rango de tiempo.

**Salida:** el servidor refleja el turno en vivo y permite reconstruirlo.

### F4 — Operación en vivo

- Layout general de la aplicación.
- Mapa 2D/2.5D con tajo, rutas, frentes, botadero, chancador y equipos.
- Panel de flota: estado, ubicación, carga, ciclo y última señal.
- Panel de chancado: alimentación, throughput, tolva y paradas.
- Alertas básicas.
- Reloj simulado y selector de escenario.

**Salida:** un usuario puede seguir la operación en vivo desde la web.

### F5 — Planificación y reconciliación

- Formulario de plan de turno: frentes, metas, destinos y asignación.
- Publicación del plan y consumo por el simulador.
- Tablero plan vs. real por turno, frente y destino.
- KPIs de tonelaje, ciclos, utilización y cumplimiento.
- Cierre de turno y reporte.
- Retroalimentación visible para el siguiente plan.

**Salida:** el ciclo planificación → ejecución → reconciliación queda cerrado.

### F6 — Flujo de datos

- Topología de fuentes y etapas del pipeline.
- Métricas por conexión: mensajes/s, bytes/s, latencia, errores y última señal.
- Inspector de mensajes recientes con filtros.
- Salud de fuentes y alertas de datos obsoletos.
- Vista de latencia y lag.

**Salida:** el usuario puede ver y diagnosticar el tránsito de datos en tiempo real.

### F7 — Endurecimiento y demo

- Pruebas end-to-end con Playwright.
- Pruebas de carga básicas.
- Manejo de reconexión de MQTT y WebSocket.
- Documentación de operación y guion de demo.
- Revisión de accesibilidad y responsive básico.

**Salida:** demo reproducible de punta a punta.

## 2. Historias de usuario

| ID | Historia | Prioridad |
|---|---|---|
| US-01 | Como despachador, quiero ver la posición y el estado de los equipos en un mapa para seguir la operación. | Must |
| US-02 | Como despachador, quiero ver los ciclos y las colas para detectar demoras. | Must |
| US-03 | Como operador de chancado, quiero ver alimentación, throughput y tolva para detectar paradas. | Must |
| US-04 | Como planificador, quiero crear un plan de turno con metas por frente y destino. | Must |
| US-05 | Como supervisor, quiero comparar plan vs. real para evaluar el turno. | Must |
| US-06 | Como TI/OT, quiero ver el flujo y la salud de los datos para diagnosticar fallas. | Must |
| US-07 | Como supervisor, quiero reproducir un turno para investigar incidentes operativos. | Should |
| US-08 | Como supervisor, quiero recibir alertas de chancador detenido, camión inactivo o fuente sin señal. | Should |
| US-09 | Como ingeniero de perforación y voladura, quiero ver los eventos de perforación y voladura para entender la disponibilidad de frentes. | Should |
| US-10 | Como usuario de demo, quiero elegir escenarios (normal, parada de chancador, falla de camión) para mostrar el comportamiento del gemelo. | Should |
| US-11 | Como gerente de operaciones, quiero ver tendencias y cumplimiento por turno. | Could |
| US-12 | Como usuario, quiero reasignar un camión manualmente desde el mapa. | Could (post-MVP) |

## 3. KPIs del MVP

- Tonelaje total movido (ore + waste).
- Tonelaje de ore enviado a chancado y de waste a botadero.
- Ciclos por hora y tiempo medio de ciclo.
- Tiempo de cola en pala y en chancador.
- Utilización de palas y camiones.
- Throughput y disponibilidad del chancador.
- Cumplimiento del plan por turno, frente y destino.
- Frescura de datos por fuente (segundos desde la última señal).
- Mensajes por segundo y latencia del pipeline.

## 4. Reglas de alerta iniciales

| Alerta | Condición |
|---|---|
| Chancador detenido | Estado `stopped` por más de 5 minutos simulados |
| Camión inactivo | Sin movimiento y sin ciclo por más de 10 minutos simulados |
| Fuente sin señal | Sin mensajes por más de 30 segundos reales |
| Desvío de plan | Cumplimiento menor al 85 % en el punto de control del turno |
| Cola excesiva | Más de 3 camiones esperando en una pala o en el chancador |

## 5. Definition of Done

- Código tipado, formateado y con lint sin errores.
- Pruebas unitarias de la lógica nueva y, cuando aplique, de integración.
- Documentación actualizada.
- Sin funcionalidades fuera del alcance del MVP.
- Datos semilla reproducibles.
- Funciona con el arranque documentado.
- Logs claros y errores manejados.
- Revisión visual básica en escritorio.

## 6. Próximos pasos

1. Confirmar supuestos: perforación/voladura a nivel de evento, mapa 2D/2.5D y stack propuesto.
2. Crear el esqueleto del monorepo (F0).
3. Implementar dominio, esquema y simulador (F1–F2).
4. Conectar ingesta, gemelo y primera vista en vivo (F3–F4).
5. Cerrar el ciclo con plan vs. real (F5).
