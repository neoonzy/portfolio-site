# FIELDWORK — Edição 013 / Portfolio Design System

**Page type:** service (personal portfolio / hireable creative technologist)
**Goal:** move a visitor from identity → demonstrable projects → process → direct contact.
**Design intent:** a digital workshop publication. Type is the sign; real software and physical objects are the evidence.

## Sources and methodology

This edition draws on three publicly maintained agent skills:

1. **Taste Skill 2.5** — [design-taste-frontend](https://github.com/Leonxlnx/taste-skill/tree/main/skills/taste-skill): editorial rhythm, real project visuals, a legible first screen, equal grid edges, limited deliberate motion and non-generic copy.
2. **Vercel Web Interface Guidelines** — [guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md): semantic controls, keyboard and focus, reduced motion, input labels, meaningful media, image dimensions, appropriate tap targets and no blocked paste.
3. **Microsoft Playwright CLI** — [CLI skill](https://github.com/microsoft/playwright-cli/tree/main/skills/playwright-cli): snapshot-driven browser inspection and screenshots at mobile / desktop sizes.

The Taste Skill is used as a design and critique framework. **Its full external automated gate was not run**, and this document does not claim `GATE: PASS`. CI runs the official Playwright CLI, alongside the existing Playwright smoke tests. The aesthetic has been adapted to the owner's established monochrome editorial identity; not every generic service-page recipe applies to a personal archive/workshop site.

## Visual direction

### Identity
- Paper `#f7f7f2`, ink `#171816`, rules `#bfbfb8`, and one acid-lime signal `#d9fb66` for a small sticker, selected controls and the single large type-led interlude.
- Square corners and exposed rules. No floating dashboard cards, fake 3D, purple gradients, stock photos, blur-as-style or decorative parallax.
- Space Grotesk for display, IBM Plex Mono for metadata. Large editorial typography with less overcompressed tracking.
- A **12 / 6 / 4-column shared grid**; the GRID overlay must reveal the same column definitions used by content.

### First screen
- The existing draggable/falling `LUIS/EDUARDO` remains, preserving the owner's two-line mobile size and left edge.
- The dead space is now a purposeful editorial triptych:
  - concise self-description anchored to real work;
  - **real interactive project screenshot**, with image-dimension reservation and visible case-study action;
  - short 2024—2026 process chronology.
- On mobile, DOM and visual reading order are the same: **description → project → timeline**.
- The bottom collision boundary remains above the selected-work index; collisions with `Projetos/Processos` and `/Sobre` are preserved.
- The featured work follows selection in the index. Images come exclusively from `src/data/projects.js`; no imagined photography.

### Work and ending
- Selected works form a near-black chapter so authentic interface imagery stands out.
- Real case studies, external project links, the search and the typing-game demo remain operative.
- A single acid-lime typography chapter represents the bridge between screen and physical world.
- Contact closes the site on near-black, with the email action visually prioritized.
- All other chapters stay quiet, off-white and paper-like.

## Web Interface Guidelines review

### Updated
- Direct links such as `/#contact` now reposition after React mounts the document, and Playwright verifies the target is actually visible. This was discovered while reviewing the contact screenshot.
- Contact heading has gentler tracking and a smaller responsive type scale, to avoid colliding glyphs on narrow phones.
- `index.html`: explicit `data-type`, `site-kind`, light colour scheme and matching theme-color.
- Project images and case-study images: real width/height dimensions, lazy below-fold loading, eager hero asset, decoding hints.
- `src/components/QuickNavigator.jsx`: named search control, spellcheck disabled, genuine ellipsis.
- `src/components/StudioPanel.jsx`: removed paste/drop suppression, which prevented a normal browser interaction and contravened web guidelines.
- `src/styles/fieldwork-edition.css`: visible hover and focus, 44px+ touch actions, reduced-motion branch, transform-only transitions.
- Existing: native dialog with ESC, skip link, focus management, URL hashes, language labels, keyboard-operable project index, minimized third-party Behance iframes.

### Verify manually / follow-up
- VoiceOver on Safari and TalkBack on Android, including live changes of the hero's selected project.
- Zoom 200%, text-only increase and safe-area insets on several actual phones.
- Live performance metrics (LCP, INP, CLS): no fabricated score until there is a testable deployment.
- Editorial copy, hero effect and case studies in native mobile Safari, especially positioning of individual glyphs during collision.

## Browser workflow

The `.github/workflows/visual-qa.yml` job uses Node 22, Chromium, the real Vite production build and the **official `@playwright/cli` executable**. It captures:

- `cli-mobile.yml`, `cli-desktop.yml`: accessibility-tree snapshots
- `cli-mobile.png`, `cli-desktop.png`: first-screen references
- `cli-projects-mobile.png`: selected-work chapter
- Existing Playwright screenshots and functional smoke tests at 320, 360, 390, 430, 680, 681, 768, 900, 1120 and 1440px

Unit tests in `tests/portfolioUx.test.mjs` guard against regressions in these choices. The screenshot artefact is attached to a GitHub Actions run for the corresponding commit; compare `head_sha` before reviewing.

## What was not changed

- No new libraries for hero physics; the established glyph engine still handles rigid-body motion.
- No invented professional outcomes, feedback quotes or stock image assets.
- No URL or production hosting change; `vercel.json` still contains `"deploymentEnabled": false`.
- No merge to `main` or manual Vercel deployment.
- The editorial section order and bilingual content architecture from edition 012 stay intact.

## Review decision

The result is a **candidate definitive version**, not an automatically published final site. Approve it after visually reviewing the PR screenshots and testing the essential flows on a physical phone. Avoid endless arbitrary aesthetic changes: a new visual element must convey project evidence, reading position or a meaningful action.
