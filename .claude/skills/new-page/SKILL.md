---
name: new-page
description: Use when adding a new customer-facing page/route. Scaffolds an App Router page following the atomic-design and Armenian-only conventions.
---

# New page

1. Read the relevant guide in `node_modules/next/dist/docs/` first (Next 16 differs from training data).
2. Create `src/app/<route>/page.tsx` as a Server Component. Multipage app — no SPA shell, no client-side routing tricks.
3. Compose from existing atoms/molecules/organisms/templates; add new ones only when nothing fits.
4. Copy is Armenian only, brand tone: straightforward, helpful, confident.
5. Data: server-side via `src/lib/api/` modules. Request-time data (`cookies()`, `headers()`, `searchParams`) goes inside `<Suspense>`; API data is fetched uncached (`cache: "no-store"`) through `src/lib/api/` modules that use `try/catch` and return `ApiResult` — so every data-awaiting component sits inside `<Suspense>` with an Armenian fallback, and renders an error state on `!result.ok`.
6. Add `metadata` / `generateMetadata` for the page.
7. CSS Modules, mobile-first; verify mobile breakpoints.
8. If any component file passes 150 lines, apply the `split-large-component` skill.
9. Finish with `pnpm check` (tsc + ESLint + Prettier).
