# AI for Engineers and Scientists

Teaching repository owned by Deep Skill. Presentations and audience-facing material are in Spanish. Code and commit messages are in English.

- Cohorts live in `cohorts/<number>/`; sessions in `sessions/<number>/`.
- Presentations are dependency-free HTML/CSS/JavaScript, not PowerPoint. Preserve the DeepSkill website branding: #0c0c14, #13131f, #1a53ff / #4d7fff, #99ff32, Geist, and the official logo lockup.
- Run `npm run dev` with Node 22+. The localhost preview uses only Node built-ins, with SSE live reload. Static hosting also works; automatic reload has a polling fallback. R opens per-slide review; feedback is stored only in the browser.
- Use real logos with source provenance, editable conceptual diagrams and real-data charts. Clearly distinguish local illustrations from actual model calls and product screenshots.
- `AGENTS.md` is a symlink to this file. Edit only `CLAUDE.md`.
- Keep teacher reference implementations outside the folder students open with their agent. Never place the completed solution inside `starter/`.
- Real public datasets must keep source URLs, retrieval timestamps, units, original responses and provenance. Do not label derived estimates as measurements.
- Do not inflate instructor degrees, credentials, client references or a mentor's employment. Use confirmed source material.
- Session 1 has at most 30 minutes of slides; the rest is live tools and a working demo. Do not add a course roadmap slide.
- Verify presentations and demos in a real browser, including keyboard navigation, smaller screens, links and meaningful computations.
- Pricing snapshots need a date and official sources. Illustrative prices must say they are illustrative. Subscriptions are not unlimited and do not automatically include API usage.
- The materials portal uses `materials/catalog.js` for its resource library and `tools/access-pricing.js` for dated Warp prices. Guides render their original Markdown through `materials/read.html`; edit the Markdown, not a duplicate HTML body. Regenerate student ZIPs with `python3 tools/package_starters.py` after changing a starter brief or data.
