---
name: new-component
description: Use when creating a new reusable UI component (atom, molecule, organism, or template). Picks the right atomic tier and scaffolds the folder.
---

# New component

1. Check `src/components/` for an existing component that fits or can be extended first.
2. Pick the tier:
   - **atom** — single primitive, no composition (Button, Input, Badge, Price).
   - **molecule** — a few atoms working together (SearchField, TireSizeSelect).
   - **organism** — a self-contained UI section (SiteHeader, TireCard grid, CartSummary).
   - **template** — page layout skeleton composing organisms.
     Imports only go downward through tiers.
3. Scaffold `src/components/<tier>/<Name>/`:
   - `<Name>.tsx` — named export, typed `<Name>Props`, Server Component by default.
   - `<Name>.module.css` — mobile-first, tokens only.
   - `index.ts` — `export { Name } from "./Name";` (+ `export type { NameProps }`).
4. If it needs state/handlers, move only that interactive part into a small `'use client'` child.
5. Text props/defaults in Armenian; accept `className` for composition when useful.
6. Keep ≤ 150 lines; otherwise split (see `split-large-component`).
7. Run `pnpm check` (tsc + ESLint + Prettier).
