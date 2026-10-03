#!/usr/bin/env bash
# Stop: before Claude finishes, run the full project check if anything changed:
# TypeScript (tsc), ESLint, Prettier. Exit 2 = Claude must fix before finishing.
input=$(cat)
# Don't loop forever if Claude is already continuing because of this hook.
[ "$(echo "$input" | jq -r '.stop_hook_active // false')" = "true" ] && exit 0

cd "$CLAUDE_PROJECT_DIR" || exit 0
git status --porcelain | grep -q . || exit 0

problems=""

tsc_out=$(pnpm exec tsc --noEmit 2>&1 | grep -E '^[^ ].*error TS' | grep -v '^\.next/')
[ -n "$tsc_out" ] && problems+="TypeScript errors:\n$tsc_out\n\n"

lint_out=$(pnpm exec eslint 2>&1) || problems+="ESLint errors:\n$lint_out\n\n"

fmt_out=$(pnpm exec prettier --check --log-level warn . 2>&1) ||
  problems+="Prettier formatting issues (run: pnpm format):\n$fmt_out\n\n"

if [ -n "$problems" ]; then
  printf "%bFix these before finishing.\n" "$problems" >&2
  exit 2
fi
exit 0
