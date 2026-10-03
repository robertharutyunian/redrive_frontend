# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@.claude/project.md

## Next.js 16 — read the docs first

This version has breaking changes — APIs, conventions, and file structure may differ from training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code, and heed deprecation notices.

## Commands

Use **pnpm** only (never npm/yarn).

- `pnpm dev` — dev server on port **3001** (the backend uses 3000)
- `pnpm build` / `pnpm start` — production build / serve on 3001
- `pnpm check` — TypeScript + ESLint + Prettier. **Must pass before you finish.**
- `pnpm typecheck` / `pnpm lint` / `pnpm format` — run one check alone
- Env: copy `.env.example` → `.env.local` and set `API_URL`

No test runner is configured yet.

## Where to find what

Each topic has **one** source of truth. Follow that file; don't rely on memory.

**Rules** (`.claude/rules/`, loaded automatically):

- `atomic-design.md` — component tiers, folder structure, Server vs Client, 150-line limit
- `api-conventions.md` — backend calls: `fetch` without cache, `try/catch`, `ApiResult`, `<Suspense>`, auth token
- `styling.md` — CSS Modules, design tokens, mobile-first breakpoints, images
- `content-language.md` — Armenian-only UI text, brand tone, prices, accessibility
- `commits.md` — commit message format and branch names

**Skills** (`.claude/skills/`, step-by-step workflows):

- `new-page` — add a new page/route
- `new-component` — add a reusable atom/molecule/organism/template
- `split-large-component` — a page file is over 150 lines
- `new-api-module` — connect a new backend endpoint
- `new-server-action` — build a form or mutation
- `/redrive-review`, `/pr-description` — only when the user asks

**Project context** (`.claude/project.md`, imported above) — what the business is, hard constraints, brand, auth plan, known gaps.

## Hooks

Hooks in `.claude/hooks/` run automatically:

- Some shell commands and file edits are **blocked** (e.g. `.env*`, lockfile, force push). If blocked, read the reason and change your approach — don't work around it.
- After each edit, the file may be **reformatted** by Prettier. Re-read a file before editing the same spot again.
- After each edit and before you finish, TypeScript/ESLint/Prettier errors are reported back. **Fix them**; you can't finish until `pnpm check` passes.
