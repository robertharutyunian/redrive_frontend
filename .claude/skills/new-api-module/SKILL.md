---
name: new-api-module
description: Use when a feature needs data from a backend domain (tires, brands, inventory, orders, ...) that has no module in src/lib/api yet, or a new endpoint in an existing one.
---

# New API module

Follow `.claude/rules/api-conventions.md`: native `fetch` with `cache: "no-store"`, every call in `try/catch`, no `'use cache'`.

1. Check the backend contract in `../redrive_backend/src/<domain>/` (controller routes + DTOs) if available; otherwise ask the user for the endpoint shape. Don't guess fields.
2. Types: `src/lib/api/types/<domain>.ts` mirroring the backend response.
3. Module `src/lib/api/<domain>.ts`:
   ```ts
   import "server-only";
   import { unstable_rethrow } from "next/navigation";
   import { apiFetch, type ApiResult } from "./client";
   import type { Tire } from "./types/tires";

   export async function getTires(): Promise<ApiResult<Tire[]>> {
     try {
       const data = await apiFetch<Tire[]>("/tires", { cache: "no-store" });
       return { ok: true, data };
     } catch (err) {
       unstable_rethrow(err);
       console.error("getTires failed", err);
       return { ok: false, error: "Չհաջողվեց բեռնել անվադողերը։ Փորձեք կրկին։" };
     }
   }
   ```
4. User-specific endpoints: read the token with `(await cookies()).get("token")` and pass `Authorization: Bearer <token>` in headers.
5. Usage: the component that awaits it is a Server Component wrapped in `<Suspense fallback={...}>` by its parent; it renders an Armenian error state when `!result.ok`.
6. Run `pnpm check`.
