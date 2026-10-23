# Digital Mine - modelo C4 de componentes
# Documentacion: ../09-c4.md
# Validar: structurizr validate -w demos/digital-mine/docs/diagrams/workspace.dsl
# Exportar: structurizr export -f plantuml -w demos/digital-mine/docs/diagrams/workspace.dsl -o demos/digital-mine/docs/diagrams/out/structurizr
# El MVP es local. Los recursos Cloud son futuro/opcional y no estan implementados.
# Solo hay vistas de componentes: no se crean vistas de contexto, contenedores, despliegue ni codigo.

workspace "Digital Mine" "Modelo C4 de componentes del MVP de Digital Mine. Solo se modelan componentes: actores, sistemas externos y recursos cloud candidatos aparecen en la misma vista. Los recursos cloud son futuro/opcional y no estan implementados." {

    model {

        # Actores humanos del MVP (01-alcance-mvp.md, seccion 5.1)
        planificador = person "Planificador de corto plazo" "Crea y ajusta el plan de turno, metas por frente y destino. Revisa el cumplimiento." "Person"
        despachador = person "Despachador" "Sigue la flota, las colas y las alertas. La reasignacion manual es post-MVP." "Person"
        operadorChancado = person "Operador de chancado" "Monitorea alimentacion, throughput, tolva y paradas del chancador primario." "Person"
        supervisor = person "Supervisor de turno" "Revisa KPIs, alertas, plan vs real y replay del turno." "Person"
        tiOt = person "TI/OT" "Monitorea la salud de las fuentes, el flujo y los errores de datos." "Person"

        # Sistema en alcance: una sola agrupacion logica para las vistas de componentes.
        # No implica un unico proceso ni describe despliegue.
        digitalMine = softwareSystem "Digital Mine" "Gemelo digital que refleja y explica la operacion de una mina a cielo abierto. MVP local con datos sinteticos." "System" {

            mvp = container "MVP local (agrupacion logica)" "Componentes previstos del MVP. La implementacion esta pendiente. Contexto distinto de unidad de despliegue: el simulador es un proceso aparte y la base y el broker corren en Docker Compose." "TypeScript, Next.js, Fastify, PostgreSQL/TimescaleDB, MQTT, Docker" "Local" {

                web = component "Web" "Mapa 2D/2.5D, tableros de flota y chancado, plan, plan vs real, replay, flujo de datos, alertas y selector de escenario." "Next.js, React, Tailwind, MapLibre GL JS, React Flow, Recharts" "Component,Local"

                api = component "API REST" "Consultas de estado, historico, plan, KPIs y salud; creacion y publicacion del plan; comandos de corrida." "Fastify, Zod" "Component,Local"

                ingest = component "Ingesta" "Suscripcion MQTT, validacion con Zod, deduplicacion por eventId, orden canonico, deteccion de huecos y persistencia." "Fastify, MQTT.js, Zod" "Component,Local"

                twin = component "Gemelo" "Estado en memoria, proyeccion de ciclos y colas, KPIs en vivo, alertas y reconstruccion desde la base." "TypeScript, packages/domain" "Component,Local"

                ws = component "WebSocket" "Snapshot inicial y deltas en vivo hacia la web." "Fastify, @fastify/websocket" "Component,Local"

                recon = component "Reconciliacion" "Selecciona el plan base, agrega tonelaje por turno, frente y destino, calcula cumplimiento, congela el snapshot y cierra el turno." "TypeScript, packages/domain" "Component,Local"

                sim = component "Simulador" "Genera un turno sintetico reproducible con semilla, escenario, reloj y aceleracion; publica telemetria y eventos." "TypeScript, MQTT.js" "Component,Local"

                db = component "Base de datos" "Log de eventos, telemetria, datos maestros, proyecciones, KPIs, alertas y salud." "PostgreSQL + TimescaleDB + PostGIS (Docker Compose)" "Component,Local"

                broker = component "Broker MQTT" "Bus de telemetria, eventos sinteticos, plan publicado y salud. QoS 1." "Eclipse Mosquitto (Docker Compose)" "Component,Local"

                group "Recursos cloud candidatos (futuro, no implementados)" {
                    managedDb = component "Base de datos gestionada" "Alternativa futura a la base local. No desplegada ni contratada." "Servicio gestionado compatible con PostgreSQL (TBD)" "Component,Cloud"
                    managedBroker = component "Broker MQTT gestionado" "Alternativa futura a Mosquitto para operar fuera del entorno local. No desplegado." "Servicio MQTT gestionado (TBD)" "Component,Cloud"
                    objectStore = component "Almacenamiento de objetos para replay" "Archivo de telemetria y eventos para replay de largo plazo. No implementado." "Object storage (TBD)" "Component,Cloud"
                    observability = component "Observabilidad gestionada" "Metricas, trazas y logs centralizados. Alternativa futura a pino y a la vista de flujo local. No implementada." "Servicio gestionado (TBD)" "Component,Cloud"
                }

                # Relaciones dentro del MVP
                web -> api "Consulta estado, historico, plan y KPIs" "REST/JSON"
                web -> ws "Recibe snapshot y deltas" "WebSocket"
                api -> twin "Lee estado, KPIs y alertas"
                api -> recon "Solicita cierre y reporte"
                api -> db "Lee y escribe plan, catalogo y turnos" "SQL"
                api -> broker "Publica plan.published" "MQTT QoS 1"
                api -> sim "Inicia, pausa o aborta la corrida" "Comando local"
                ingest -> broker "Se suscribe a telemetria, eventos y salud" "MQTT QoS 1"
                ingest -> twin "Entrega eventos validados y ordenados" "En proceso"
                ingest -> db "Persiste log, telemetria y metricas de ingesta" "SQL"
                twin -> db "Reconstruye estado y proyecciones" "SQL"
                twin -> ws "Publica deltas de estado y alertas"
                recon -> db "Lee hechos y escribe snapshots oficiales" "SQL"
                sim -> broker "Publica telemetria y eventos sinteticos; consume plan.published" "MQTT QoS 1"

                # Relaciones con actores
                planificador -> web "Crea y publica el plan; revisa cumplimiento" "HTTPS"
                despachador -> web "Sigue flota, colas y alertas" "HTTPS"
                operadorChancado -> web "Monitorea alimentacion, tolva y paradas" "HTTPS"
                supervisor -> web "Revisa KPIs, plan vs real y replay" "HTTPS"
                tiOt -> web "Diagnostica flujo y salud de datos" "HTTPS"

                # Alternativas cloud: relaciones de sustitucion, no trafico implementado
                db -> managedDb "Sustitucion futura; no implementada" "Servicio gestionado (TBD)" "Future"
                broker -> managedBroker "Sustitucion futura; no implementada" "Servicio gestionado (TBD)" "Future"
                db -> objectStore "Archivo de historico para replay (futuro)" "Object storage (TBD)" "Future"
                ingest -> observability "Exporta metricas y trazas (futuro)" "Servicio gestionado (TBD)" "Future"
            }
        }

        # Sistemas externos: todos futuros. El MVP los sustituye con el simulador.
        fms = softwareSystem "FMS / GPS (futuro)" "Asignaciones, posicion, velocidad, carga y estado de la flota. Se conecta por un adaptador futuro; el MVP usa el simulador." "External"
        scada = softwareSystem "SCADA / PLC de chancado (futuro)" "Alimentacion, throughput, tolva y estado del chancador. OPC UA futuro." "External"
        planSource = softwareSystem "Planificador externo / PlanSource (futuro)" "Plan de mina por archivo o API. Fuera del MVP." "External"
        bascula = softwareSystem "Bascula / sensor de carga (futuro)" "Tonelaje por ciclo. En el MVP el tonelaje lo declara el simulador." "External"
        drillBlast = softwareSystem "Sistema de perforacion y voladura (futuro)" "Patrones, metros perforados y eventos de tronadura." "External"

        fms -> ingest "Telemetria y asignaciones (adaptador futuro)" "MQTT (futuro)"
        scada -> ingest "Telemetria del chancador (futuro)" "OPC UA (futuro)"
        bascula -> ingest "Tonelaje por ciclo (futuro)" "Evento (futuro)"
        drillBlast -> ingest "Eventos de perforacion y voladura (futuro)" "Evento (futuro)"
        planSource -> api "Plan de mina por archivo o API (futuro)" "API/JSON (futuro)"
    }

    views {

        component mvp "operacion" "Operacion en vivo: actores, mapa, estado del gemelo y base local. Incluye la alternativa cloud de base gestionada como futuro." {
            include despachador
            include operadorChancado
            include supervisor
            include web
            include api
            include ws
            include twin
            include ingest
            include db
            include broker
            include sim
            include managedDb
            autolayout lr
        }

        component mvp "ingesta" "Ingesta y observabilidad: fuentes, broker, validacion, salud y alternativas cloud futuras." {
            include tiOt
            include web
            include api
            include ws
            include ingest
            include twin
            include db
            include broker
            include sim
            include fms
            include scada
            include bascula
            include drillBlast
            include managedBroker
            include objectStore
            include observability
            autolayout lr
        }

        component mvp "reconciliacion" "Reconciliacion plan vs real: planificador, supervisor, cierre del turno, replay y alternativas cloud futuras." {
            include planificador
            include supervisor
            include web
            include api
            include ws
            include recon
            include twin
            include db
            include planSource
            include objectStore
            include managedDb
            autolayout lr
        }

        styles {
            element "Person" {
                shape Person
                background "#13131F"
                color "#FFFFFF"
                fontSize 13
            }
            element "External" {
                background "#EDEDED"
                color "#333333"
                stroke "#8A8A8A"
                fontSize 12
            }
            element "Local" {
                background "#F7F8FA"
                color "#13131F"
                stroke "#5A5F68"
                fontSize 12
            }
            element "Cloud" {
                background "#E6EEFF"
                color "#0B2E6F"
                stroke "#1A53FF"
                border dashed
                fontSize 12
            }
            element "Component" {
                background "#F7F8FA"
                color "#13131F"
                stroke "#5A5F68"
            }
            relationship "Relationship" {
                color "#5A5F68"
                style solid
                fontSize 11
            }
            relationship "Future" {
                color "#1A53FF"
                style dashed
                fontSize 11
            }
        }
    }
}
