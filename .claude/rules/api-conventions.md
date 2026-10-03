---
paths:
  - "src/lib/api/**"
  - "src/app/**/actions.ts"
  - "src/app/**/page.tsx"
  - "src/components/**/*.tsx"
---

# API conventions

## Fetching: native Next.js `fetch`, no caching

- All backend calls are **server-side only** (Server Components / Server Actions), through
  `apiFetch<T>()` in `src/lib/api/client.ts`. Never call the backend from a Client Component;
  never add a `NEXT_PUBLIC_` API URL.
- Use Next.js `fetch` with **no caching**: `cache: "no-store"`. Do **not** use `'use cache'`,
  `cacheLife`, `cacheTag`, `revalidateTag`, `next: { revalidate }` or `unstable_cache`.
- Because data is uncached, every component that awaits API data must be rendered inside a
  `<Suspense>` boundary with a fallback (Cache Components requirement — otherwise the build fails).
  Keep the `await` as deep in the tree as possible so the page shell stays static.

## Error handling: always `try/catch`

- Every API call is wrapped in `try/catch` in the domain module (`src/lib/api/<domain>.ts`).
- First line of every `catch` is `unstable_rethrow(err)` (from `next/navigation`) so Next.js
  internal errors (`notFound()`, `redirect()`, prerender bailouts) are not swallowed.
- Log the technical error server-side (`console.error`) and return a typed result:
  ```ts
  export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string };
  ```
  `error` is a user-facing **Armenian** message. Never leak backend error text or stack traces to the UI.
- Callers check `result.ok` and render an error/empty state — they don't need their own try/catch.
- 404 from the backend on a detail page → call `notFound()`.

## Structure

- One module per backend domain: `src/lib/api/<domain>.ts` (`tires.ts`, `brands.ts`, `orders.ts`, ...),
  each starting with `import "server-only";`. Create one only when a feature needs it.
- Types in `src/lib/api/types/<domain>.ts`, mirroring backend DTOs. No `any`.
- Mutations go through Server Actions (see `new-server-action` skill) using the same try/catch pattern.
- Auth: JWT from backend → httpOnly cookie set in a Server Action; attach as
  `Authorization: Bearer <token>` from `cookies()` on the server. Never expose the token to the client.
