---
name: redrive-review
description: Review current changes against ReDrive project conventions (atomic design, 150-line limit, server-first, Armenian copy, CSS Modules, caching).
disable-model-invocation: true
---

# ReDrive code review

Review `git diff` (and untracked files) against `main`. Report findings grouped by severity with `file:line`.

Checklist:

- **Architecture**: correct atomic tier; imports only go downward; pages only orchestrate.
- **Size**: every component file ≤ 150 lines; overflow moved to `templates/<PageName>Component/` with page-name prefix.
- **Server-first**: no unnecessary `'use client'`; client code pushed to leaves; no backend calls from the client; no `NEXT_PUBLIC_` API URLs.
- **Next 16**: `cookies()`/`headers()`/`searchParams` inside `<Suspense>`; API calls use `fetch` with `cache: "no-store"` (no `'use cache'`/`cacheTag`/`revalidate`); every call in `try/catch` with `unstable_rethrow(err)` first; data-awaiting components inside `<Suspense>`; `redirect()` never inside `try`.
- **Styling**: CSS Modules + tokens only, mobile-first media queries, no fixed layout widths.
- **Content**: all user-facing text, `alt`, metadata and errors in Armenian; brand tone.
- **A11y**: semantic elements, labels, one `<h1>`, focus states.
- **Types**: no `any`, typed API responses.
- **Security**: JWT only in httpOnly cookie; inputs validated in Server Actions.

Finish by running `pnpm check` (tsc + ESLint + Prettier) and include results.
