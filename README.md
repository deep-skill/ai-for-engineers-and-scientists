# AI for Engineers and Scientists

Deep Skill's practical course on working with LLMs and agents. Materials for cohort 01, October 2026. Slides and teaching notes are in Spanish.

## Course planning

The [course plan](docs/course-plan.md) is the source of truth for the agreed eight-session curriculum, October 2026 schedule and teaching status. Course ideation in `cofounder-agents` closed on October 8, 2026; all further class preparation and content management happen here.

Internal planning records are maintained privately; this repository contains the public curriculum and teaching materials. The first class was delivered on October 6. Session 2, **Del chat al agente: contexto, RAG, tools y agentes**, now has an eight-slide presentation and practice guide; the dedicated Git lesson remains session 4.

## Preview

```sh
npm run dev
```

Open `http://127.0.0.1:8765/`. Requires Node 22 or newer; there are no npm dependencies to install. The server uses Node's built-in HTTP and filesystem modules, binds to localhost and reloads the presentation on file changes when **En vivo** is enabled.

- Session 1 slides: `cohorts/01/sessions/01/index.html`
- Session 2 slides: `cohorts/01/sessions/02/index.html`
- Session 2 teaching guide: `cohorts/01/sessions/02/instructor-guide.md`
- Session 2 practice: `materials/read.html?doc=session02-practice`
- Course curriculum and schedule: `docs/course-plan.md`
- Teaching plan: `cohorts/01/sessions/01/instructor-guide.md`
- Demo options: `docs/demo-options.md`
- Materials library, readable briefs and downloads: `index.html`
- Read a guide: `materials/read.html?doc=solar`
- Cost calculator: `tools/cost-calculator.html`
- Dated Warp plan snapshot: `tools/access-pricing.js`

Slides: arrows / Space navigate, Home / End jump, F fullscreen, P shows speaker notes, O opens the slide index, R opens **Revisión**. The review panel contains the idea, interaction and discussion points for each slide; comments persist in this browser's local storage. Sources are linked from the relevant slide notes. Press Escape to close overlays. L / En vivo toggles automatic reload on file changes, preserving the current slide and review mode. Disable it during a finished presentation.

The deck introduces LLMs and Transformers, then opens OpenCode and Warp before explaining agent execution. It includes editable diagrams, a token/context budget, chat/workflow/agent comparisons, service cases, a cost calculator and a NASA comparison. These controls run locally in JavaScript; they do not call an LLM. Product logos and public screenshots have provenance in `assets/external-sources.json`. Definitions, diagrams and charts are editable HTML/CSS/JavaScript rather than flattened slides.

Session 2 uses the archived USGS data from session 1. Its diagrams and controls explain context, the agent loop, local tools, HTTP APIs, API keys and remote MCP. The five-nearest-events reference runs Haversine locally in JavaScript on the original snapshot, outside the student starter. The practice asks students to generate a CSV, open it in Excel or Numbers and verify it; a fresh API capture is kept separate. DeepWiki, Microsoft Learn and the OAuth reference server are documented live-demo options, not connections executed by the page. RAG remains conceptual in the final half hour. The home page and both decks include class navigation. Session 2 reflows on smaller screens.

## Student materials

The home page includes a three-reading route, a searchable library of primary sources and a Warp monthly/annual comparison. Guide links use a dependency-free Markdown reader; the Markdown files remain the source of truth. The download ZIPs contain only the brief, original public data and provenance. Rebuild them after changing a starter folder:

```sh
python3 tools/package_starters.py
```

Each archive has a SHA-256 and contents list in `downloads/manifest.json`. The generated teacher reference is local and git-ignored; build it with the instructions below when cloning the repository.

## Solar demo

Real NASA POWER daily solar irradiance for Lima, Arequipa and Piura, calendar year 2025. Three archived source responses are included, so class does not depend on the data API being available.

Students open **only** `demos/solar/starter/` in OpenCode Desktop. This folder has the task, source data, units and constraints, but no solution.

The teacher reference uses `requests`, `pandas` and `plotly`:

```sh
python3 -m venv .venv
.venv/bin/python -m pip install -r demos/solar/reference/requirements.txt
.venv/bin/python demos/solar/reference/build.py
```

Then open `demos/solar/reference/output/index.html` through the local preview server. Plotly is embedded; no external chart CDN is needed. This is an educational first estimate based on horizontal irradiance, not a site-specific photovoltaic design.

To refresh public data:

```sh
python3 tools/prepare_data.py
```

## Earthquake alternative

`demos/earthquakes/starter/` includes a real USGS earthquake snapshot, task brief and provenance. Use this alternative for a geographic analysis with magnitude, depth and date filters. Counts in this catalog depend on monitoring coverage and magnitude; do not equate event counts to hazard or predictions.

## Repository structure

```text
assets/                         official website logo, mentor photos, fonts
cohorts/01/sessions/01/          session 1 HTML presentation and teacher notes
cohorts/01/sessions/02/          session 2 HTML presentation, practice and notes
demos/solar/starter/             student workspace: brief + public data
demos/solar/reference/           teacher solution, separate from starter
demos/earthquakes/starter/       geographic alternative
docs/                           demo comparison and source registry
tools/                          cost calculator and public-data refresh
```

All API-model prices in the calculator are editable examples, not an actual provider tariff. The small subscription comparison is dated and links to official prices. No API keys or model subscriptions are needed to preview these teaching materials.
