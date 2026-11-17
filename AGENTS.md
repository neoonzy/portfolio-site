# Portfolio design and engineering guidance

This repository is the portfolio of Luis Eduardo Lustosa, a designer/developer and digital-fabrication prototyper in Recife. It is a personal, editorial site—not a SaaS template. Do not remove the project information, change the user's identity, or invent credentials, results, client quotes, photos, or contact details.

## Design language — FIELDWORK / Edição 013

- Physical editorial layout: off-white paper, near-black ink, sharp square geometry and one highly restrained acid-lime signal (mainly interactions and a single typography-led chapter).
- Real project screenshots take visual priority; do not use generic stock photographs or fake product UI. Never leave image or embed slots blank. Keep fallback links when third parties refuse iframe embedding.
- A single shared 12 / 6 / 4-column grid governs content AND the GRID overlay. Align visible edges; avoid decorative columns unrelated to the document.
- Hero: readable, aligned **LUIS/** and **EDUARDO**, real project proof, concise description, one primary action. Individual letters have opt-in kinetic physics with real editorial obstacles and floor before the selected-work index.
- Respect editorial hierarchy: selected projects → context/biography → workshop/game → process → visual work → contact. Each chapter serves a distinct purpose; do not duplicate everything.
- Preserve the author's tone: concise, curious, practical, focused on objects and public space. The portfolio speaks in Portuguese (primary) and English.

## Skills and checks

Read and follow:
- Taste Skill: https://github.com/Leonxlnx/taste-skill/tree/main/skills/taste-skill (page type **service**; real work, not a placeholder; equal edges, editorial rhythm, deliberate moments)
- Vercel Web Interface Guidelines: https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md (fetch fresh before audit)
- Playwright CLI: https://github.com/microsoft/playwright-cli/tree/main/skills/playwright-cli (inspect snapshot and screenshots; test with keyboard)

Audit page files for missing names/labels, small touch controls, focus visibility, motion without reduced-motion alternatives, blocked paste, layout shift, invalid HTML semantics, external iframe fallbacks and broken direct routes. Do not add arbitrary effects or background animation.

## Verification

```bash
npm ci
npm test
npm run build
```

GitHub Actions workflow `.github/workflows/visual-qa.yml` runs the browser smoke test at 320, 360, 390, 430, 680, 681, 768, 900, 1120 and 1440 CSS px. It additionally uses **Playwright CLI** for independent snapshots and screenshots and uploads the results as artifacts. Review the screenshots visually, not just the green CI status.

For accessibility, verify zoom 200%, reduced motion, VoiceOver/TalkBack, keyboard tab order and mobile safe areas. Claims of WCAG conformance require an actual audit, not just tests.

## Routing, publishing and project data

- Case studies: `/projetos/:slug`; real work defined in `src/data/projects.js` and `src/data/caseStudies.js`.
- The Vercel build uses root-relative assets; `npm run build:cin` is available for a legacy subdirectory export.
- Automatic Vercel Git deployments are intentionally disabled in `vercel.json`. Never enable them, deploy manually, or merge to main without explicit instruction.
- Keep changes on `feat/ux-audit-complete-revision` until approved.
