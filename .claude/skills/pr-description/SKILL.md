---
name: pr-description
description: Write a pull request title and description for the current branch.
disable-model-invocation: true
---

# PR description

1. Inspect `git log main..HEAD` and `git diff main...HEAD`.
2. Title: Conventional Commit style, ≤ 72 chars.
3. Body:
   - **Summary** — what and why, 2–4 bullets.
   - **Changes** — grouped by page / component tier / api.
   - **Screenshots** — placeholder for mobile + desktop if UI changed.
   - **Testing** — what was verified (lint, tsc, manual pages checked on mobile/desktop).
4. Don't push or open the PR unless the user asks.
