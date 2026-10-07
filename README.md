# AI for Engineers and Scientists

Deep Skill's practical course on working with LLMs and agents. Cohort 01 materials, prepared on October 6, 2026. Slides and teaching notes are in Spanish.

## Preview

```sh
npm run dev
```

Open `http://127.0.0.1:8765/`. Requires Node 22 or newer; there are no npm dependencies to install. The server uses Node's built-in HTTP and filesystem modules, binds to localhost and reloads the presentation on file changes when **En vivo** is enabled.

- Slides: `cohorts/01/sessions/01/index.html`
- Teaching plan: `cohorts/01/sessions/01/instructor-guide.md`
- Demo options: `docs/demo-options.md`
- Materials library, readable briefs and downloads: `index.html`
- Read a guide: `materials/read.html?doc=solar`
- Cost calculator: `tools/cost-calculator.html`
- Dated Warp plan snapshot: `tools/access-pricing.js`

Slides: arrows / Space navigate, Home / End jump, F fullscreen, P shows speaker notes, O opens the slide index, R opens **Revisión**. The review panel contains the idea, interaction and discussion points for each slide; comments persist in this browser's local storage. Sources are linked from the relevant slide notes. Press Escape to close overlays. L / En vivo toggles automatic reload on file changes, preserving the current slide and review mode. Disable it during a finished presentation.

The deck includes interactive concept diagrams, workflow steps, service cases, an illustrative token sequence, a cost calculator and a NASA comparison. These controls run locally in JavaScript; they do not call an LLM. Product logos and public screenshots have provenance in `assets/external-sources.json`. Definitions, diagrams and charts are editable HTML/CSS/JavaScript rather than flattened slides.

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
cohorts/01/sessions/01/          HTML presentation and teacher notes
demos/solar/starter/             student workspace: brief + public data
demos/solar/reference/           teacher solution, separate from starter
demos/earthquakes/starter/       geographic alternative
docs/                           demo comparison and source registry
tools/                          cost calculator and public-data refresh
```

All API-model prices in the calculator are editable examples, not an actual provider tariff. The small subscription comparison is dated and links to official prices. No API keys or model subscriptions are needed to preview these teaching materials.
