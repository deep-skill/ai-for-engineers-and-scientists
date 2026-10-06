# Sesión 1 — LLMs, agentes y herramientas

Duración base: 90 minutos. Extensión: hasta 120. Diapositivas principales: 15, 27 minutos en total. Tres apéndices opcionales. No hay diapositiva de recorrido del curso.

| Minutos | Actividad | Resultado |
|---|---|---|
| 0–5 | Portada, JP y Deep Skill mientras llegan | Trayectoria, talento y trabajo de la empresa |
| 5–27 | Definiciones, productos, LLMs y costes | Mapa de conceptos y formas de trabajo |
| 27–40 | OpenCode Desktop y Warp en vivo | Abrir carpeta, identificar modelo, herramientas y ejecución |
| 40–50 | Artificial Analysis y coste en vivo | Comparar capacidad, velocidad, coste y cuotas |
| 50–80 | Construcción de la calculadora solar | Herramienta con datos reales de NASA |
| 80–90 | Comprobar, modificar y cerrar | Verificación manual y código reproducible |

Extensión: 90–110 práctica guiada; 110–120 dudas y problemas de participantes. Si se alarga la presentación personal, reducir el catálogo de productos. Mantener una demo central.

## Preparación

1. Probar presentación, flechas y pantalla completa desde el servidor local.
2. Abrir SOLO demos/solar/starter en OpenCode Desktop.
3. Ensayar con el modelo gratuito realmente disponible. La reconstrucción por un agente dentro de OpenCode Desktop aún no se ha probado: verificar antes de clase.
4. Mantener la solución de referencia fuera de la carpeta del agente.
5. Probar Python y librerías en un entorno virtual nuevo.
6. Mantener los datos NASA archivados y su procedencia.
7. Abrir Warp, Artificial Analysis, documentación y calculadora de coste.

## Presentación propia

JP: coach ICPC, liderazgo de ingeniería, cofundador de Deep Pit Technology y fundador de Deep Skill. No afirmar título universitario; cargos de banca se presentan de forma general. Contar dos experiencias de resolución de problemas.

Deep Skill: software, IA aplicada y formación. Haul Sight se presenta como co-desarrollo con IMSS. Entrenamientos acreditables: Cerro Verde vía Tecsup y UNI. Los retratos son de mentores de la web oficial; no atribuirles proyectos que no ejecutaron.

## Editar el curso en vivo — 3 minutos dentro del bloque de herramientas

Abrir la presentación en su propia ventana. Activar L / En vivo y mantener visible una diapositiva. Pedir al agente un cambio concreto de contenido o estilo, revisar el cambio en el repo y observar la actualización conservando la diapositiva. Mostrar que el agente puede editar archivos y controlar el navegador: eso lo aporta el arnés con sus herramientas. Desactivar En vivo al terminar de editar para presentar una versión estable.

Usar un cambio real que mejore la clase, por ejemplo agregar una aclaración a la definición de herramienta. Para comparar comportamientos, cambiar una variable de la calculadora solar en el navegador y comprobar un número con Python.

## Secuencia de la demo

1. Mostrar problema y fuente NASA.
2. Pedir inspección de esquema, cobertura, unidades y plan.
3. Revisar el plan; pedir ejecución en entorno virtual.
4. Mostrar lectura, instalación, creación de código, ejecución y corrección.
5. Abrir la herramienta y cambiar ciudad, potencia, demanda y performance ratio.
6. Verificar un día y un promedio mensual.
7. Pedir comparación simultánea o exportación CSV.
8. Mostrar que el programa terminado calcula sin nuevas llamadas al LLM.

Los prompts completos están en el brief. No pegar el código de referencia en el prompt.

## Cálculo

NASA reporta irradiación horizontal en kWh/m²/día. Dividir por 1 kW/m² da horas solares equivalentes. Multiplicar por potencia nominal en kWp y performance ratio estima energía. El ratio de 0.80 es un supuesto editable.

El mes de menor recurso se elige por irradiación media diaria mensual. La producción anual suma 365 días. No se modelan inclinación, sombras, baterías, inversores ni disponibilidad horaria.

## Costes

La calculadora usa tarifas ficticias: USD 1 por millón de tokens de entrada, USD 0.20 por millón leído de caché y USD 5 por millón de salida. Diez llamadas de 12.000 tokens de entrada y 1.200 de salida, con 50% de entrada cacheada y cero coste de herramientas, dan USD 0.132. No es el precio de un modelo.

Variar llamadas y contexto. Separar precio por token de coste por tarea y de revisión humana. Las suscripciones tienen cuotas; la API se factura aparte salvo condiciones explícitas.

## Alternativa de sismos

USGS: mapa, profundidad, magnitud y distancias a Lima. Hay datos y brief, aún sin solución terminada. No presentar conteos como peligro ni predicción sísmica.

