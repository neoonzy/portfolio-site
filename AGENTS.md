# Design, engineering and editorial rules — ARQUIVO VIVO 014

A personal portfolio by Luis Eduardo Lustosa in Recife. Never invent client work, academic achievements, user metrics, photographs, stories or personal contacts. Retain all existing verified project information.

## Experimental experience (root)

The root app is `src/ExhibitionApp.jsx`, not `src/App.jsx`. The experimental direction **replaces** a traditional scrolling home with five nonlinear artistic stations:
- `entrada` — kinetic large LUIS/EDUARDO and three interactive photographic project prints
- `obras` — independently selected works with giant typographic specimens and deep case links
- `metodo` — a participatory workshop/process conveyor and playable Typeee demo
- `constelacao` — an atlas of code, object, city and street, with six real original photographs in the contact sheet
- `contato` — direct, expressive final screen and truthful external profile links

A multi-color exhibition is appropriate **only** when the distinct color is part of the spatial identity of each station. Do not revert this experiment to a stack of generic hero/about/projects cards or to the superseded monochrome FIELDWORK landing page. Never add made-up content or stock assets to fill space. Prefer authored project screenshots and six verified photos at `public/photography/`.

## Interaction discipline

- Five stations accessible without mandatory scrolling or dragging: main MAPA, keyboard 1–5, bottom station dock on mobile, left station rail on desktop, accessible search `/`.
- Each physical element needs accessible button semantics or an equivalent direct path. Dragging is optional enhancement, never the only way to select a project.
- Keep existing case-study URLs `/projetos/:slug`; preserve back, hash, focus and PT/EN.
- At modal open, trap Tab, restore focus on close, support Escape. Photo contact sheet also supports arrows, thumbnails and touch swipe.
- Honor reduced motion, 44px touch targets, zoom, screen readers and mobile 320px widths; require test evidence, not assumed compliance.

## Visual language

Treat each station like an installation: distinct spatial composition, purposeful big typography, real artifacts, curious interaction, and precise contrast. The collection of photographs is a **contact sheet of authored records**, not a generic carousel. Document each interaction's intent.

## Verification

```bash
npm ci
npm test
npm run build
```

`scripts/exhibition-qa.mjs` and `.github/workflows/exhibition-qa.yml` run Playwright Chromium for eight responsive widths, all stations, photo contact sheet, keyboard and mobile controls. The workflow also uses the official `@playwright/cli` to capture screenshots and snapshots.

Apply source guidance when reviewing UI:
- Taste Skill: https://github.com/Leonxlnx/taste-skill/tree/main/skills/taste-skill
- Web Interface Guidelines: https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
- Playwright CLI: https://github.com/microsoft/playwright-cli/tree/main/skills/playwright-cli

No unverified Taste Gate claims or Lighthouse scores.

## Publishing

Branch `feat/experiencia-arquivo-vivo` is an experiment. **Never merge or deploy automatically.** Vercel automatic Git deployments must remain off in `vercel.json` (`git.deploymentEnabled: false`). The `main` branch and published portfolio must stay unchanged until the owner approves this design.
