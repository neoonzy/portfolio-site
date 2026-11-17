# ATELIER / Design and engineering rules

This is the personal portfolio of Luis Eduardo Lustosa, a creative technologist working with interfaces, software, 3D fabrication and cultural projects. The site's interaction model is a deliberate piece of art direction, not a standard marketing landing page.

## Do not regress the experience

- **Six rooms, six modes:** Entry is a kinetic poster; Archive is a manipulable worktable; Laboratory is a functional typing-game experiment; Notebook is a book you turn; Person is a route map plus accessible work records; Contact is a typographic poster. Do not turn these into a single stack of conventional cards or large scroll-only sections.
- Preserve all actual project records from `src/data/projects.js`, existing links, the authentic screenshots, full Typeee demo and the eight Behance works.
- On mobile, show a four-route dock and exactly one visible entry to the full room map; the worktable becomes horizontally scrollable and projects open **native bottom-sheet dialogs**. Avoid redundant nav controls and click targets below the fold.
- Keep the original physics from `KineticWordmark.jsx`; its obstacles remain real labels and the floor is placed before `.print-index`.
- Art direction: paper cream, ultramarine archive, yellow laboratory, salmon notebook, black personal history, orange contact. Every color identifies a room. Preserve square corners, visible rules, exposed archive numbers, grotesk display and mono indexes.
- Never invent photographs, experience dates, client quotes, impact metrics, third-party testimonials or portfolio projects. When no image exists, show an openly labeled abstract placeholder.

## Interaction and accessibility

- Every scene has a real `h1`, visible current-room semantics, focus restoration, hash deep-links, browser history and a scroll reset on navigation.
- Keyboard shortcuts: 1–6 choose a room; M opens map; Escape closes native dialogs. Do not hijack shortcuts while typing in inputs or contenteditable.
- Every action must also work by click or tap without dragging; dragging is an enhancement only for fine-pointer devices.
- Mobile project details must become visible immediately after selection. Do not hide them behind several screenfuls of scroll.
- Native `dialog` is preferred for the map and mobile project sheets; preserve accessible labels and closing affordances.
- Keep reduced-motion styles and avoid unconditional parallax, WebGL and scroll-jacking. Avoid hover-only disclosure.

## Reference standards

- [Taste Skill](https://github.com/Leonxlnx/taste-skill/blob/main/skills/taste-skill/SKILL.md): ownable art direction, image evidence, intentional rhythm, strong first screens.
- [Vercel Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md): semantic elements, keyboard support, clear focus, meaningful buttons, non-blocking form inputs and image stability.
- [Playwright CLI](https://github.com/microsoft/playwright-cli): snapshots and screenshots of desktop/mobile in addition to scripted browser checks.

## Tests and publishing

```bash
npm ci
npm run build
node --test tests/glyphPhysics.test.mjs
```

`.github/workflows/atelier-qa.yml` runs Playwright and the official Playwright CLI at eight viewport widths. Review its actual image artifact, not only the green status.

The Vercel `git.deploymentEnabled=false` setting is intentional. Work on `feat/atelier-spatial-experience`; do not merge into main or publish production without direct approval.
