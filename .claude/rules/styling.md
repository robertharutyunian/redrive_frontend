---
paths:
  - "src/**/*.css"
  - "src/**/*.tsx"
---

# Styling

- CSS Modules only (`Name.module.css`). No Tailwind, no CSS-in-JS, no inline `style` except truly dynamic values.
- Use tokens from `src/styles/tokens.css` (`var(--color-*)`, `--space-*`, `--radius-*`, `--font-size-*`).
  No raw hex colors or magic spacing numbers in modules; add a token if one is missing.
- **Mobile-first**: base styles target mobile, then `@media (min-width: ...)` upward.
  Breakpoints: 640px (tablet), 1024px (desktop), 1280px (wide).
- No fixed pixel widths for layout; use `max-width`, `%`, `flex`/`grid`, `clamp()`.
- Touch targets ≥ 44px high on interactive elements.
- Warm Orange (`--color-primary`) is an accent — CTAs and key highlights only.
- Brand: clean, whitespace-forward. No flames, racing graphics, metallic gradients, tire-track decoration.
- Images: always `next/image` with `alt` (Armenian) and explicit `sizes`.
