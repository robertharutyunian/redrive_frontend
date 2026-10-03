---
name: split-large-component
description: Use when a page or page-specific .tsx file exceeds (or is about to exceed) 150 lines. Moves its sections into src/components/templates/<PageName>Component/ with page-name-prefixed files.
---

# Split a component over 150 lines

Limit: a `.tsx` file must not exceed 150 lines.

This skill is for **page-specific** code. If the oversized file is a shared
atom/molecule/organism, split it into smaller shared components in the right
tiers instead (no page prefix).

1. Take the page name, e.g. `AboutPage`.
2. Create `src/components/templates/<PageName>Component/` (e.g. `AboutPageComponent/`).
3. Move each extracted piece into that folder as its own file, named
   **`<PageName><Purpose>`** — the page name is always the prefix:
   - `AboutPageDrawer.tsx` + `AboutPageDrawer.module.css`
   - `AboutPageHero.tsx`, `AboutPageTeam.tsx`, ...
     Name by what the piece is, not by its position.
4. Add an `index.ts` barrel exporting the public pieces:
   `export { AboutPageDrawer } from "./AboutPageDrawer";`
5. The original file keeps only composition and imports from
   `@/components/templates/AboutPageComponent`.
6. Keep Server Components by default; only the extracted leaf that needs state
   gets `'use client'`.
7. Pieces that are genuinely reusable across pages belong in atoms/molecules/organisms
   instead — don't bury them in a page folder.
8. Verify every resulting file is ≤ 150 lines, then run `pnpm check` (tsc + ESLint + Prettier).

Layout example:

```
src/components/templates/AboutPageComponent/
  AboutPageDrawer.tsx
  AboutPageDrawer.module.css
  AboutPageHero.tsx
  AboutPageHero.module.css
  index.ts
```
