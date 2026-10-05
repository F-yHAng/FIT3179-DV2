# Keeping Languages Alive

Australian Indigenous Languages — FIT3179 Data Visualisation 2, Monash University Malaysia.

Author: Yuhang Fei. Created 5 October 2026.

A single static page with 12 original Vega/Vega-Lite charts, including three different map idioms. HTML/CSS controls the page; readable `c01`–`c12` JSON files define its charts. No build step or backend is needed to serve the page.

## Open the visualisation

GitHub Pages: https://F-yHAng.github.io/FIT3179-DV2/

Local preview: serve this directory over HTTP, for example `python3 -m http.server 8000`, then open `http://localhost:8000/`. Opening the HTML through `file://` can prevent JSON loading.

## Data

ABS Census home use (1991–2021); AIATSIS NILS4 2025–26 via Productivity Commission; official department service-location geometry (layer edited November 2024); ABS ASGS 2021 boundaries. See the page footer and `source-catalogue.json` for URLs, reference periods, transformations, licences and hashes.

The NILS4 indicators are Actual observations. Future policy trajectories are excluded. Census home use is not fluency. State revival counts are non-additive. Unspecified categories are excluded only from the named-category views. Service-location dots are not separate centres.

## Chart idioms

Line, choropleth map, proportional symbol map, slope, hierarchical treemap, bump, histogram, heatmap, 100% stacked bar, waffle, bar and dot map. See `chart-manifest.json`.

## Sketch status

The digital reference is a drawing guide. The assessed A4 sketch must be drawn on paper by the student, photographed/scanned and uploaded as `sketch-handdrawn.pdf`. No digital reference is presented as a completed hand-drawn submission.

## AI acknowledgement

OpenAI Codex assisted with research, data preparation, code, layout and writing. The author remains responsible for checking and understanding the final work. Third-party charts or finished visualisations were not reused.

## Third-party software

Pinned local browser builds of Vega 5.30.0, Vega-Lite 5.20.1 and Vega-Embed 6.26.0 (BSD-3-Clause). Fraunces and Source Sans 3 are provided under SIL OFL. See `THIRD-PARTY-NOTICES.md` and licence text files. Dataset rights remain with their original providers; this README does not relicense those materials.
