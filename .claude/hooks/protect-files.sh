#!/usr/bin/env bash
# PreToolUse(Edit|Write): block edits to secrets, generated files and lockfiles.
f=$(jq -r '.tool_input.file_path // empty')
[ -z "$f" ] && exit 0
name=$(basename "$f")

case "$name" in
  .env.example) exit 0 ;;
  .env|.env.*) echo "Blocked: $name holds secrets — ask the user to edit it." >&2; exit 2 ;;
  pnpm-lock.yaml) echo "Blocked: lockfile is managed by pnpm — run pnpm commands instead." >&2; exit 2 ;;
esac
case "$f" in
  */node_modules/*|*/.next/*) echo "Blocked: $f is generated/vendored." >&2; exit 2 ;;
esac
exit 0
