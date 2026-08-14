---
name: plan
description: Produce an implementation plan with file-level changes, quality analysis, failure-mode table, requires_gate3, risk assessment, and line estimate. Use after intake + research, or as step 3 of /feature.
---

# plan

Write the plan a human will approve. Every change references `file:line` from research.

## Project Context

**ZA-Assessments-Portal-FE** — React 18 + Vite SPA (JavaScript/JSX). `@/` alias. Tailwind v3. API in `src/api/`. React Query v5 + Redux Toolkit.

## Proctoring detection

Set `requires_gate3: true` when plan touches:
`ProctoringContext*`, `WebRTCProctoringContext*`, `test-session-security/**`, `docs/test-session-security-and-proctoring-integration.md`

## Procedure

1. Numbered steps with files, deps, verification.
2. Quality analysis: Security (AuthContext/LTI/proctoring), Performance, Reusability, Readability, Testability (manual QA), Cross-team.
3. Failure-mode table per API/action.
4. Line estimate; PR split if >500 LOC.
5. Gating: `N/A unless ticket specifies VITE_APP_* env toggle`
6. `requires_gate3` + security doc reference
7. Risk: low | medium | high

## Output

Plan steps, quality analysis, failure modes, line estimate, gating note, requires_gate3, risks.

End with: `## Stop — orchestrator fires GATE 1 next`

## Verification

- ≥3 steps with file:line
- All 6 quality dimensions
- No TBD placeholders
