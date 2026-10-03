# ReDrive frontend — project reference

Persistent notes for working on this codebase across sessions. Written during
initial architecture setup (2026-10-03). Update this file as decisions change
— don't let it go stale.

## What this is

Customer-facing frontend for ReDrive, a tire shop. Next.js 16.3.5 (App
Router), talking to a separate NestJS backend (`../redrive_backend`,
PostgreSQL, fully managed by the backend). Admin frontend comes later —
out of scope for now.

Backend domains: auth, users, tires, brands, inventory, orders, order-items,
payment, refund, lg-payment, lg-refund, emails.

## Hard constraints

- **No SPA. Multipage app only.** This was stated emphatically. Keep routing
  file-system based (App Router), keep pages server-rendered, don't collapse
  the app into a client-side-routed shell. Default every component to a
  Server Component; add `'use client'` only on the specific leaf that needs
  state/handlers/browser APIs, as deep in the tree as possible.
- **Armenian-only customer-facing site.** Brand book (`ReDrive_Brandbook.pdf`
  on the user's Desktop) explicitly states: "All customer-facing ReDrive
  communication should be in Armenian." `<html lang="hy">` is set in
  `src/app/layout.tsx`. Tone per brand book: straightforward, helpful,
  confident — never overcomplicated or overly promotional. Don't add a
  language switcher or i18n routing speculatively — nothing in scope requires
  bilingual support yet.
- **CSS Modules only** — no Tailwind (was removed from the project before
  this setup; confirmed intentional).
- **Fully responsive, mobile included.** Every page/component needs to work
  on mobile, not just desktop — build layouts mobile-first (or at minimum
  verify mobile breakpoints) rather than treating mobile as an afterthought
  pass. Use CSS Modules media queries against real breakpoints; avoid fixed
  pixel widths that assume desktop viewport.

## Rendering strategy

`cacheComponents: true` is enabled in `next.config.ts` (Next 16's Cache
Components model).

- **Decision (2026-10-03): API data is not cached.** No `'use cache'`,
  `cacheTag` or `revalidate`. How to fetch: `.claude/rules/api-conventions.md`.
- Because of `cacheComponents`, anything that awaits API data or reads
  `cookies()`/`headers()`/`searchParams` must render inside `<Suspense>`,
  otherwise the build fails.

Read `node_modules/next/dist/docs/` directly before using any Next API —
this is Next 16, conventions differ from training data. (`AGENTS.md` is not
used — `agentRules: false` in `next.config.ts` stops `next dev` generating it.)

## Brand (ReDrive Brand Book v1.0)

- **Colors** (`src/styles/tokens.css`): Charcoal `#1C1F26` (primary
  dark/foreground), Warm Orange `#FF6A00` (primary accent — use
  deliberately, not everywhere), Off-white `#F5F5F2` (default background),
  White `#FFFFFF`. Single light theme — the brand book doesn't define a
  dark-mode variant of the site; dark panels in the book are a presentation
  choice, not a theme toggle.
- **Typography**: two typefaces by script, both wired in `src/app/fonts.ts`.
  - Armenian → **Noto Sans Armenian** (`next/font/google`, subset
    `armenian`).
  - Latin/English → **Google Sans**, self-hosted via `next/font/local` from
    `src/fonts/google-sans/` (variable font files, OFL-licensed — license
    text kept alongside as `OFL.txt`). It is not on fonts.google.com and
    isn't loadable via `next/font/google`; the variable `.ttf` files were
    provided directly by the user.
  - `--font-sans` in `tokens.css` stacks Armenian first, Google Sans second,
    so mixed Armenian/Latin content resolves correctly per character.
- **Visual direction**: clean, functional, whitespace-forward. Real
  photography (real tires/vehicles/service moments), organized/uncluttered
  backgrounds. Avoid clichés: no flames, racing graphics, metallic effects,
  tire-track decoration.
- **Logo**: horizontal full-color is the default signature. No logo asset
  files (SVG/PNG) have been provided yet — only seen embedded in the brand
  book PDF. Don't fabricate logo files from the PDF; get real exports from
  the user when the header/footer/favicon are actually built.
- Full brand book: `ReDrive_Brandbook.pdf` — not in the repo; ask the user
  for it if a brand detail isn't covered here.

## Architecture

- **Atomic design**: `src/components/{atoms,molecules,organisms,templates}`.
  See `src/components/README.md` for the per-component folder convention
  (`Name.tsx` + `Name.module.css` + `index.ts` barrel) and the Server/Client
  default rule. Folders are currently empty (`.gitkeep` only) — real
  components were deliberately deferred until branding existed; now that
  colors/fonts/logo direction are known, start filling these in as real UI
  is built, rather than reintroducing throwaway placeholder components.
  Pages (`src/app/**/page.tsx`) are the implicit 5th tier — no separate
  folder for them.
- **Data layer**: `src/lib/api/client.ts` is a minimal server-only fetch
  wrapper (`apiFetch<T>()`), reading `API_URL` from the environment. It
  defaults to `cache: "no-store"` and exports `ApiResult<T>`; domain
  modules wrap every call in `try/catch` and return `ApiResult`. No
  `NEXT_PUBLIC_` env var — all backend calls happen server-side (Server
  Components/Server Actions), which keeps the client bundle thin and
  reinforces the no-SPA constraint. Add per-domain modules
  (`src/lib/api/tires.ts`, `auth.ts`, ...) as features are actually built,
  not speculatively.
- **Auth (decided, not yet implemented)**: backend returns a JWT in the
  response body (`{ accessToken, user }`), not a cookie
  (`redrive_backend/src/auth/auth.service.ts`). When login/register is
  built: a Server Action sets it as an **httpOnly cookie**; server-side
  calls read it via `next/headers` `cookies()` and attach
  `Authorization: Bearer <token>`. `proxy.ts` (Next 16's renamed
  middleware) does an optimistic cookie-presence check on protected routes
  once those routes exist — not real session enforcement, which stays
  server-side.
- **Ports**: frontend dev/start run on `3001` (`package.json` scripts),
  matching the backend's `.env.example` `CORS_ORIGIN=http://localhost:3001`
  default. Backend runs on `3000`. `.env.example` here has
  `API_URL=http://localhost:3000`.
- **tsconfig**: `@/*` maps to `./src/*` (fixed from a broken `./*` mapping
  that predated this setup — all code lives under `src/`).

## Known gaps / deliberately deferred

- No real logo asset files (SVG/PNG/favicon) yet — PDF-only, see above.
- No business routes yet (tires catalog, cart, account, checkout) — nothing
  was scaffolded under `src/app/` beyond the root `page.tsx`/`layout.tsx`
  placeholder, since the site map hasn't been discussed.
- Auth/session code (`proxy.ts`, cookie helpers) intentionally not written
  yet — there's nothing to protect until real pages exist.
