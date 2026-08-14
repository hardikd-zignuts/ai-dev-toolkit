---
name: implement
description: Execute approved plan on feature branch. Uncommitted only. Ends with GATE 2. Sets requires_gate3 when proctoring touched.
---

# implement

**ZA-Assessments-Portal-FE** — JavaScript/JSX, `@/` alias, API via `src/api/`.

## Conventions

- react-hook-form for new forms; shadcn/ui first; Sonner
- Never modify proctoring/security without explicit task
- Never modify initDragGuard() in main.jsx

## Procedure

1. git fetch; create branch `feat/AZE-123` or `fix/AZE-456`
2. Each plan step → change → npm run lint
3. Set `requires_gate3: true` if proctoring paths changed
4. Output uncommitted diff + GATE 2

## Output

Branch, steps, files changed, requires_gate3, lint status.

Never commit — ship commits.
