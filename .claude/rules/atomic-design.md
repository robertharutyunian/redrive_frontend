# Atomic design

Components live in `src/components/{atoms,molecules,organisms,templates}`.
Pages (`src/app/**/page.tsx`) are the top tier.

## Tiers

- **atoms** — single UI primitive (Button, Input, Price).
- **molecules** — a few atoms combined (SearchField).
- **organisms** — a self-contained, reusable section (SiteHeader, TireCard).
- **templates** — two kinds of folders:
  - layout skeletons shared by many pages (e.g. `PageShell/`)
  - page-specific sections: `<PageName>Component/` (see 150-line limit below)
- **pages** — compose templates/organisms. Pages contain no data fetching and
  no heavy markup.

A component imports only from tiers **below** it.

## Component folders

- Reusable component: one folder per component —
  `Name/Name.tsx`, `Name/Name.module.css`, `Name/index.ts`.
- Page-specific sections: one folder per page —
  `templates/<PageName>Component/` with flat files `<PageName><Part>.tsx` +
  `.module.css`, and one `index.ts`.

## Data

Data is fetched inside async Server Components (usually the page's sections),
and each one is wrapped in `<Suspense>` by its parent. See `api-conventions.md`.

## Server vs Client

Server Component by default. Add `'use client'` only to the smallest leaf that
needs state, event handlers or browser APIs.

## 150-line limit

No `.tsx` file may exceed **150 lines**.

- Code that belongs to one page → move it into
  `src/components/templates/<PageName>Component/`, every file prefixed with the
  page name (`AboutPageComponent/AboutPageDrawer.tsx`). Use the
  `split-large-component` skill.
- A shared component (atom/molecule/organism) that grows too big → split it into
  smaller shared components in the right tiers. Don't give it a page prefix.
