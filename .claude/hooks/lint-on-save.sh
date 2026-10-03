#!/usr/bin/env bash
# PostToolUse(Edit|Write): after Claude changes a file —
#   1. Prettier auto-formats it (formatting is fixed, not reported)
#   2. ESLint auto-fixes what it can, remaining errors are reported
#   3. tsc type-checks the project for .ts/.tsx changes
#   4. .tsx files over 150 lines are reported
# Exit 2 = problems are sent back to Claude to fix.
f=$(jq -r '.tool_response.filePath // .tool_input.file_path // empty')
[ -z "$f" ] || [ ! -f "$f" ] && exit 0
cd "$CLAUDE_PROJECT_DIR" || exit 0
case "$f" in "$CLAUDE_PROJECT_DIR"/*) ;; *) exit 0 ;; esac

problems=""

# 1. Prettier (respects .prettierignore, skips unknown file types)
if ! out=$(pnpm exec prettier --write --ignore-unknown --log-level warn "$f" 2>&1); then
  problems+="Prettier could not format $f (syntax error?):\n$out\n\n"
fi

case "$f" in
  *.ts|*.tsx|*.js|*.jsx|*.mjs)
    # 2. ESLint
    out=$(pnpm exec eslint --fix --no-warn-ignored "$f" 2>&1) || problems+="ESLint errors in $f:\n$out\n\n"
    ;;
esac

case "$f" in
  *.ts|*.tsx)
    # 3. TypeScript — whole project, since one change can break other files.
    # Ignore Next's generated .next/types (can be stale).
    out=$(pnpm exec tsc --noEmit 2>&1 | grep -E '^[^ ].*error TS' | grep -v '^\.next/')
    [ -n "$out" ] && problems+="TypeScript errors:\n$out\n\n"
    ;;
esac

case "$f" in
  */src/*.tsx)
    # 4. 150-line component limit
    lines=$(wc -l < "$f" | tr -d ' ')
    if [ "$lines" -gt 150 ]; then
      problems+="$f has $lines lines (limit 150). Split it using the split-large-component skill: move pieces into src/components/templates/<PageName>Component/ with page-name-prefixed files.\n"
    fi
    ;;
esac

if [ -n "$problems" ]; then
  printf "%b" "$problems" >&2
  exit 2
fi
exit 0
