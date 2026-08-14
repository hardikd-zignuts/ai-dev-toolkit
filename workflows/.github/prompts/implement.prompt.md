---
mode: agent
description: Execute approved plan on feature branch. Uncommitted changes only. Ends with GATE 2.
---

# implement (ZA-Assessments-Portal-FE — Student Portal)

Execute the approved plan. **No commits** — ship commits later.

## Conventions
- JavaScript/JSX only, `@/` imports, API via `src/api/`
- react-hook-form for new forms; shadcn/ui first; Sonner toasts
- Never modify proctoring/security without explicit task
- Never modify initDragGuard() in main.jsx

## Branch naming
`feat/AZE-123`, `fix/AZE-456`, etc.

## Procedure
1. git fetch; create branch
2. Each plan step → change → npm run lint
3. Set `requires_gate3: true` if proctoring paths changed
4. Output files changed + GATE 2 prompt

## Output
Branch, steps completed, files changed, requires_gate3, lint status, GATE 2.
