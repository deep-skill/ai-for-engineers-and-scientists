# Explorador de sismos con USGS

**Problema:** explorar los sismos M4.5+ del último mes y encontrar los eventos registrados más próximos a Lima dentro de este catálogo.

Construye un mapa y una visualización interactiva de magnitud y profundidad usando `data/usgs-m45-month.geojson`. La descarga es real; el momento de captura y la URL están en `data/sources.json`.

## Resultado

- Mapa mundial con filtro para la región andina.
- Filtros por magnitud, profundidad y fecha.
- Tamaño por magnitud y color por profundidad; leyendas con unidades.
- Tabla de los cinco eventos más próximos a un punto elegido, usando distancia geodésica con `pyproj` o una implementación de Haversine documentada.
- Perfil de profundidad y gráfico magnitud-profundidad con Plotly.
- Exportación CSV del subconjunto filtrado.

Librerías sugeridas: pandas, Plotly y pyproj. Cada `geometry.coordinates` contiene longitud, latitud y profundidad en km. Las fechas son milisegundos Unix UTC. Revisar nulos antes de calcular.

Los conteos dependen de la cobertura de monitoreo y del umbral de magnitud. Este explorador describe el catálogo; no predice sismos ni estima peligro sísmico. USGS es un catálogo global, no un reemplazo del catálogo completo del IGP peruano.

> Lee los datos y el brief, verifica unidades y propone un plan. Después de mi revisión, construye una página interactiva con el mapa y los filtros. Conserva una copia local de los datos y documenta los cálculos de distancia.

