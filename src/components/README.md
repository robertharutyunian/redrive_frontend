# Component library — atomic design

Four tiers, each a folder under its tier directory:

```
src/components/
  atoms/        smallest, single-purpose UI primitives (Button, Input, Icon)
  molecules/    a few atoms + markup combined (FieldGroup = Label + Input)
  organisms/    a chunk of UI assembled from molecules/atoms (SiteHeader)
  templates/    page-level layout skeletons that compose organisms (PageShell)
```

Pages (the conceptual 5th tier) are just `src/app/**/page.tsx` — they compose a
template with real content. No separate "pages" folder in the component library.

## Per-component convention

Each component gets its own folder:

```
Button/
  Button.tsx
  Button.module.css
  index.ts        // export { Button } from "./Button";
```

Import via the folder's barrel: `import { Button } from "@/components/atoms/Button";`

## Server vs. Client Components

**Default every component to a Server Component — no `'use client'`.** Only add
the directive on the specific component that actually needs state, event
handlers, or a browser API. Compose client components as deep in the tree as
possible so the rest of the page stays server-rendered.

This is the rule that keeps the app from becoming an SPA one `'use client'` at
a time — see `.claude/project.md` for the full rationale.
