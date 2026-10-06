# Calculadora solar con datos de NASA

**Problema:** una estación de trabajo consume 3 kWh al día. ¿Cómo cambia la producción estimada de un sistema solar según la ciudad y el tamaño instalado? ¿Qué tamaño nominal cubriría esa demanda en promedio en el mes de menor recurso solar de 2025?

Construye una herramienta gráfica que compare Lima, Arequipa y Piura usando los archivos reales de `data/`.

## Datos y unidades

- Fuente: NASA POWER, parámetro `ALLSKY_SFC_SW_DWN`.
- Período completo: 2025, 365 registros diarios por ciudad.
- Unidades de la respuesta: `kW-hr/m^2/day`, equivalentes a kWh/m²/día.
- Son estimaciones en una celda geográfica sobre una superficie horizontal, no mediciones de una estación local ni irradiancia sobre un panel inclinado.
- Coordenadas, URL original, hora de descarga y SHA-256 están en `data/sources.json`.
- El valor de relleno viene en `header.fill_value`; debe tratarse como ausente.
- El agente y tú deben verificar las unidades en la respuesta original antes de calcular.

## Modelo educativo

Para este primer cálculo usa irradiancia de referencia de 1 kW/m²:

`horas solares equivalentes = irradiación diaria / 1 kW/m²`

`producción diaria estimada [kWh] = potencia nominal [kWp] × horas solares equivalentes [h] × performance ratio`

Usa un performance ratio inicial de 0.80 como **supuesto editable**, no como dato de NASA. Calcula promedios mensuales ponderados por los días reales. El total anual es la suma de las estimaciones diarias, no 12 veces un mes promedio.

`potencia para cubrir el mes de menor recurso [kWp] = demanda diaria / (horas solares medias de ese mes × performance ratio)`

Esto compara energía media: no garantiza suministro diario ni dimensiona baterías, inversores, sombras o estructuras. La potencia calculada es un equivalente continuo de kWp, no una cantidad comercial de paneles.

## Resultado esperado

1. Página HTML con selección de ciudad, demanda, potencia nominal y performance ratio.
2. Gráfico mensual de producción media diaria frente a demanda.
3. Producción anual, mes de menor recurso y tamaño nominal orientativo.
4. Tabla y CSV de los cálculos para revisarlos.
5. Código Python que reproduce el análisis con pandas y Plotly.
6. Fuente, período, unidades y supuestos visibles.

## Primer pedido al agente

> Lee el brief y los datos. Verifica esquema, cobertura, valores ausentes y unidades. Propón un plan para construir la calculadora. Espera mi revisión antes de modificar archivos.

## Segundo pedido

> Ejecuta el plan aprobado dentro de esta carpeta. Crea un entorno virtual e instala las librerías necesarias en él. Conserva los datos originales. Genera una herramienta HTML, una tabla CSV y el código reproducible. Comprueba manualmente un día y un promedio mensual contra la respuesta de NASA. Documenta fuentes y supuestos. La página debe funcionar con los datos archivados, sin depender de la API en cada interacción.

## Cambio durante la demo

> Añade una comparación simultánea entre las tres ciudades y un control de demanda. Comprueba que duplicar la potencia duplica la producción y que las unidades de todas las etiquetas son correctas.

