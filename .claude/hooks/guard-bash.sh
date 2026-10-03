#!/usr/bin/env bash
# PreToolUse(Bash): block destructive or risky shell commands. Exit 2 = block, stderr goes to Claude.
cmd=$(jq -r '.tool_input.command // empty')
[ -z "$cmd" ] && exit 0

block() { echo "Blocked by guard-bash: $1" >&2; exit 2; }

echo "$cmd" | grep -Eq 'rm[[:space:]]+-[a-zA-Z]*r[a-zA-Z]*f?[[:space:]]+(/|~|\$HOME|\.|\*)([[:space:]]|$)' && block "recursive rm on a broad path"
echo "$cmd" | grep -Eq 'git[[:space:]]+push.*(--force|-f([[:space:]]|$))' && block "force push"
echo "$cmd" | grep -Eq 'git[[:space:]]+push.*[[:space:]](origin[[:space:]]+)?main([[:space:]]|$)' && block "push to main — use a feature branch"
echo "$cmd" | grep -Eq 'git[[:space:]]+(reset[[:space:]]+--hard|clean[[:space:]]+-[a-zA-Z]*f)' && block "discards local work"
echo "$cmd" | grep -Eq '(curl|wget)[^|]*\|[[:space:]]*(ba|z)?sh' && block "piping a download into a shell"
echo "$cmd" | grep -Eq '(^|[[:space:]])(npm|yarn|bun)[[:space:]]+(i|install|add|ci)([[:space:]]|$)' && block "this project uses pnpm"
echo "$cmd" | grep -Eq '(cat|less|head|tail|more)[[:space:]]+[^|;&]*\.env(\.local|\.production)?([[:space:]]|$)' && block "reading secret .env files"
exit 0
