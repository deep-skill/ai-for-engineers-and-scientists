# Opciones de demo

La base provisional es energía solar. Se puede cambiar sin rehacer conceptos o branding.

| Opción | Problema | Librerías | Impacto visual | Estado |
|---|---|---|---|---|
| NASA POWER — solar | Comparar producción y potencia para una demanda entre Lima, Arequipa y Piura | requests, pandas, Plotly | Curvas, controles y comparación | Datos archivados; referencia gráfica |
| USGS — sismos | Explorar M4.5+ y hallar eventos próximos a un punto | pandas, Plotly, pyproj | Mapa, profundidad y filtros | Datos archivados; brief |
| OpenStreetMap — rutas | Hallar ruta y distancias sobre red vial | OSMnx, NetworkX | Mapa y red de calles | Propuesta pendiente de ensayo |

## Por qué solar

Problema de ingeniería explicable en un minuto. Produce una herramienta útil y exige validar unidades, integrar una fuente, instalar librerías, agrupar datos, construir interfaz y revisar resultados. Muestra que el agente puede crear un programa que luego funciona sin IA.

Tres respuestas NASA de 2025 archivadas permiten avanzar sin conexión. Son estimaciones en una celda geográfica, no mediciones de un instrumento local. El consumo de 3 kWh/día y el ratio 0.80 son supuestos editables.

## Cuándo elegir sismos

Para un público de geología/minería o mayor impacto geográfico. Selección, comparación y distancias aportan más que solo colorear puntos. USGS M4.5+ no equivale al catálogo completo del IGP.

## Ensayo sismos (2026-10-06)

Prototipos fuera del repo, en `/tmp` (no commiteados). `starter/data` intacto: 517 eventos, SHA original.

- pandas/matplotlib: histograma de magnitudes, scatter profundidad vs magnitud, serie diaria. Mag 4.5–6.6 (media 4.83), prof 7–587.6 km. Verificado contra `us6000u0le`.
- Web Leaflet 1.9.4 + D3 v7: mapa con tamaño por magnitud y color por profundidad, scatter mag vs prof, filtros de magnitud/profundidad y recorte andino (57/517). GeoJSON es `[lon,lat]`; Leaflet usa `[lat,lon]`.
- Decisión: Leaflet para mapa (tiles/zoom), D3 para scatter liviano. El producto final del brief sigue pidiendo Plotly.

## Rutas para después

Son útiles, pero las consultas y dependencias geográficas agregan variabilidad. Mejor después de familiarizarse con carpeta, terminal y librerías.

## Límite de la preparación

La aplicación de referencia se ejecuta y verifica como software propio. Eso no prueba que un modelo gratuito concreto la reconstruya dentro de OpenCode Desktop durante clase. Falta ensayar ese flujo.

Fuentes: [NASA POWER](https://power.larc.nasa.gov/docs/tutorials/service-data-request/api/), [USGS](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php), [OSMnx](https://osmnx.readthedocs.io/).

