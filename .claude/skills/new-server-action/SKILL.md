---
name: new-server-action
description: Use when building a form or mutation (login, register, add to cart, checkout, order) that must call the backend. Creates a Server Action with validation, try/catch error handling, and Armenian errors.
---

# New Server Action

1. Read the Server Actions / forms guide in `node_modules/next/dist/docs/` first.
2. Put actions in `src/app/<route>/actions.ts` with `"use server";` at the top.
3. Signature for forms: `(prevState: State, formData: FormData) => Promise<State>` so it works with `useActionState`.
4. Validate input on the server (never trust the client). Return field errors in Armenian:
   `{ ok: false, errors: { phone: "Մուտքագրեք ճիշտ հեռախոսահամար" } }`.
5. Call the backend via the domain module in `src/lib/api/` (already `try/catch` + `no-store`, returns `ApiResult`). If the action does its own calls, wrap them in `try/catch` with `unstable_rethrow(err)` first in the `catch`.
6. On `!result.ok` return the Armenian error to the form. On success `redirect(...)` if navigating — call `redirect` **outside** the `try` block. No `revalidateTag` (nothing is cached).
7. Auth actions: store the JWT with `(await cookies()).set("token", accessToken, { httpOnly: true, secure: true, sameSite: "lax", path: "/" })`. Never return the token to the client.
8. The form itself stays a Server Component using `<form action={...}>`; only the part using `useActionState`/pending UI is `'use client'`. Forms must work as multipage navigations (no SPA patterns).
9. Run `pnpm check` (tsc + ESLint + Prettier).
