# Páginas y fuentes

Revisión documental: 2026-10-06. Rankings, tarifas y disponibilidad pueden cambiar; consultar la fuente en clase.

| Tema | Fuente | Uso |
|---|---|---|
| Branding y mentores | [DeepSkill](https://www.deepskill.space/) | Logo y retratos oficiales |
| Agentes y workflows | [Anthropic](https://www.anthropic.com/engineering/building-effective-agents) | Distinción arquitectónica |
| Codex CLI | [OpenAI](https://learn.chatgpt.com/docs/codex/cli) | Archivos, comandos y terminal |
| Codex Cloud | [OpenAI](https://learn.chatgpt.com/docs/cloud) | Entorno remoto |
| Claude Code | [Overview](https://code.claude.com/docs/en/overview) | Interfaces y ejecución |
| OpenCode | [Descargas](https://opencode.ai/download) · [Herramientas](https://opencode.ai/docs/tools/) · [Modelos](https://opencode.ai/docs/models/) | Desktop, extensiones y proveedores |
| OpenCode Zen | [Zen](https://opencode.ai/docs/zen/) | API y ofertas gratuitas temporales |
| OpenCode Go | [Go](https://opencode.ai/go/) | Referencia USD 10/mes, con cuotas |
| Warp | [Docs](https://docs.warp.dev/) · [Precios](https://www.warp.dev/pricing) | Terminal gratis; IA con condiciones |
| Terminales | [Ghostty](https://ghostty.org/docs) · [Windows Terminal](https://learn.microsoft.com/en-us/windows/terminal/) | Alternativas |
| Benchmarks | [Artificial Analysis](https://artificialanalysis.ai/) · [Metodología](https://artificialanalysis.ai/methodology) | Capacidad, velocidad, latencia, coste |
| Catálogo | [Models.dev](https://models.dev/) | Modelos y proveedores |
| Transformer | [Attention Is All You Need](https://arxiv.org/abs/1706.03762) · [How do Transformers work?](https://huggingface.co/learn/llm-course/chapter1/4) | Atención, arquitectura y entrenamiento |
| Workflows | [n8n](https://docs.n8n.io/advanced-ai/examples/understand-tools) | Herramientas e integraciones |
| Solar | [NASA POWER](https://power.larc.nasa.gov/docs/tutorials/service-data-request/api/) | Parámetro y unidades |
| Sismos | [USGS](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) | Formato y unidades |
| Librerías | [pandas](https://pandas.pydata.org/docs/) · [Plotly](https://plotly.com/python/) | Datos y visualización |
| Rutas | [OSMnx](https://osmnx.readthedocs.io/) | Opción aún sin ensayo |

Cada data/sources.json incluye URLs, timestamp, unidades y hashes. La calculadora de coste usa tarifas ficticias; no contiene un precio concreto de GPT o Claude.


Tipografía Geist: [Google Fonts](https://fonts.google.com/specimen/Geist). Licencia SIL Open Font License incluida en assets/Geist-OFL.txt. Logo y retratos: material de Deep Skill, sin nueva licencia de distribución.

Los logos de herramientas y las capturas públicas están registrados con URL y SHA-256 en `assets/external-sources.json`. Las tres capturas de Artificial Analysis corresponden a inteligencia, velocidad y coste por tarea; el selector de la diapositiva muestra la métrica elegida. Son capturas del 6 de octubre de 2026. Los datos actuales se consultan en la página durante la clase.

## Lecturas para continuar

- [LLM Course de Hugging Face](https://huggingface.co/learn/llm-course/chapter1/1): fundamentos de modelos de lenguaje.
- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents): patrones base y distinción entre workflows y agentes. Es un artículo de 2024; consultar las docs actuales para herramientas e interfaces.
- [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices): contexto, entorno y verificación.
- [AI Agents Course](https://huggingface.co/learn/agents-course/en/unit0/introduction): conceptos y ejercicios de Hugging Face.
- [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents): continuidad y entorno de ejecución.
- [Prompting, OpenAI Docs](https://learn.chatgpt.com/docs/prompting): objetivo, contexto y límites de una tarea.
- [MCP](https://modelcontextprotocol.io/docs/getting-started/intro): conectar herramientas y datos con aplicaciones de IA.
- [Rethinking skills and prompts](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra): lectura avanzada sobre cambios en las prácticas con modelos más capaces.

El catálogo del portal está en `materials/catalog.js`. Las tarifas consultadas de Warp están en `tools/access-pricing.js`: Free 0, Build 20 y Max 200 USD/mes. Los equivalentes con pago anual son 18 y 180 USD/mes para Build y Max. Consulta del 6 oct. 2026, [fuente oficial](https://www.warp.dev/pricing). No representan consumo ilimitado.

Los tamaños de contexto de la sesión (128K, 256K y 1M) son ejemplos interactivos, no una tabla de especificaciones de modelos. El presupuesto reserva 8K para salida de forma pedagógica; comprobar ventana y límite de salida en la documentación del modelo elegido.


## Clase 2: contexto, herramientas, integraciones y RAG

Consultadas el 8 de octubre de 2026. El catálogo USGS archivado mantiene su URL, respuesta original, captura y hash en `demos/earthquakes/starter/data/sources.json`. Los valores de distancia de la presentación son cálculos derivados con Haversine, no mediciones USGS.

- [Arquitectura MCP](https://modelcontextprotocol.io/docs/learn/architecture): capacidades, mensajes y transporte local o remoto.
- [DeepWiki MCP](https://docs.devin.ai/work-with-devin/deepwiki-mcp): endpoint público, sin autenticación, y herramientas de consulta de repositorios.
- [Microsoft Learn MCP](https://learn.microsoft.com/en-us/training/support/mcp): alternativa documental pública, sin autenticación.
- [Servidor de referencia Everything](https://github.com/modelcontextprotocol/inspector/blob/main/docs/mcp-server-configuration.md): OAuth con identidad de prueba y datos ficticios.
- [MCP en OpenCode](https://docs.opencode.ai/docs/mcp-servers/): integración de servidores locales y remotos.
- [Playwright MCP](https://playwright.dev/docs/getting-started-mcp): extensión opcional de control del navegador.
- [Autenticación NASA](https://api.nasa.gov/assets/html/authentication.html): clave pública DEMO_KEY y límites de uso para el ejemplo adicional de API con clave.
- [Contextual Retrieval](https://www.anthropic.com/engineering/contextual-retrieval): recuperación y evidencia para el cierre conceptual sobre RAG.
- [Modelo multilingüe de Sentence Transformers](https://huggingface.co/sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2): representaciones vectoriales de frases y búsqueda por similitud. Consultado el 8 de octubre de 2026. La presentación usa un dibujo conceptual con posiciones y números inventados, no embeddings obtenidos con este modelo.
- Referencia docente de EscuelaIT: `/Users/manduinca/Projects/escuelait/Curso-de-desarrollo-de-aplicaciones-con-IA-Generativa-con-LLM/clase-3/notebook/01-conceptos.ipynb`, celdas 6–8 (embeddings, similitud coseno, preparación y consulta), y su `clase-3/README.md`. Consultados el 8 de octubre de 2026 para adaptar la secuencia conceptual; no se trasladan su implementación, costes ni comparaciones numéricas.
- [API](https://developer.mozilla.org/en-US/docs/Glossary/API), [REST](https://developer.mozilla.org/en-US/docs/Glossary/REST) y [SOAP 1.2](https://www.w3.org/TR/soap12-part1/): referencia técnica de las diferencias entre interfaz, estilo y protocolo de mensajes.

Las ilustraciones de la presentación se ejecutan localmente. Los endpoints públicos y la autorización se muestran desde un cliente MCP durante la demo; la página no ejecuta llamadas a un LLM ni se conecta a esos servidores.
