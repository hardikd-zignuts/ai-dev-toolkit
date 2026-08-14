---
name: plan
description: Produce an implementation plan with file-level changes, quality analysis, failure-mode table, requires_gate3, risk assessment, and line estimate. Use after intake + research, or as step 3 of /feature.
---

# plan

Write the plan a human will approve. Every change references `file:line` from research.

## Project Context

Read `reference.md` (project root or workflows install path) for stack specifications, path aliases, and security gate paths (`GATE 3`).

## Security path detection

Set `requires_gate3: true` when the plan touches sensitive paths defined under **Security gate (GATE 3)** in `reference.md`.

## Procedure

1. Numbered steps with files, dependencies, and verification.
2. Quality analysis across 6 dimensions: Security, Performance, Reusability, Readability, Testability, Cross-team impact (per `reference.md`).
3. Failure-mode table per API/action.
4. Line estimate; PR split if >500 LOC.
5. Environment gating note if feature toggles apply.
6. `requires_gate3` + reference to required security document if triggered per `reference.md`.
7. Risk rating: low | medium | high.

## Output

Plan steps, quality analysis, failure modes, line estimate, gating note, requires_gate3, risks.

End with: `## Stop — orchestrator fires GATE 1 next`

## Verification

- ≥3 steps with file:line
- All 6 quality dimensions addressed
- No TBD placeholders
