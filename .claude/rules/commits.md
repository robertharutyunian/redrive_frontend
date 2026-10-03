# Commits & branches

- Conventional Commits: `type(scope): summary` — types `feat`, `fix`, `refactor`, `style`,
  `chore`, `docs`, `perf`. Scope = page or component tier (e.g. `feat(tires): add catalog filters`).
- Summary in English, imperative, ≤ 72 chars.
- Branches: `feat/<short-name>`, `fix/<short-name>`. Never commit directly to `main` unless asked.
- Before committing: `pnpm check` (tsc + ESLint + Prettier) must pass.
- Never commit `.env*` files (except `.env.example`).
