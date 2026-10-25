# Digital Mine — generador de datos sintéticos

Genera un turno sintético de carguío y acarreo con eventos, ciclos, manifiesto, calidad de datos y validación.

> **Datos sintéticos.** No son mediciones de una mina real. El simulador usa supuestos documentados; no representa una operación existente.

## Requisitos

- Python 3.11 o superior.
- SimPy 4.1.1.

```bash
cd demos/digital-mine/simulator
python3 -m venv .venv
.venv/bin/pip install -e .
```

## Generar

```bash
.venv/bin/python -m mine_sim \
  --config config/shift-001.json \
  --seed 42 \
  --out data/shift-001
```

## Salidas

```text
data/shift-001/
  events.jsonl                 # datos recibidos (con degradación)
  cycles.csv                   # ciclos reconstruibles desde lo recibido
  manifest.json                # configuración, semilla y conteos
  data_quality.json            # pérdida, tardíos, duplicados e incompletos
  validation.json              # checks de estructura y dominio
  ground_truth/
    events.jsonl               # simulación completa, no es el dataset operativo
    cycles.csv                 # ciclos completos de referencia
```

`ground_truth/` sirve para medir la pérdida de datos. No debe usarse como si fuera el dataset recibido ni presentarse como una medición real.

## Escenarios incluidos

- **Indisponibilidad de un camión:** `T-03` acumula 5 % del turno (24 min) sin operar por problemas técnicos. Se emiten `truck.down` y `truck.up`; no hay órdenes de mantenimiento.
- **Caída del servidor de despacho:** 30 min por mal tiempo. La operación continúa, pero la recepción se degrada: eventos perdidos, tardíos, duplicados e incompletos. Los ciclos afectados quedan `partial`.

Los parámetros están en `config/shift-001.json` y se registran en el manifiesto.

## Estructura del código

- `config.py`: carga de configuración y distribuciones.
- `events.py`: envelope de eventos y escritura JSONL.
- `model.py`: modelo SimPy de palas, camiones, rutas y destinos.
- `quality.py`: degradación por caída y resumen de calidad.
- `cycles.py`: proyección de ciclos desde eventos.
- `validate.py`: invariantes y criterios de aceptación.
- `cli.py`: comando de generación.
