---
agent: agent
description: Write implementation plan with quality analysis, failure modes, line estimate, requires_gate3, and risk. Ends with GATE 1.
---

# plan

Write a file-level plan. Every step cites `file:line` from research.

## Project Context

Read `reference.md` (project root or workflows install path) for stack specifications, path aliases, and security gate paths (`GATE 3`).

## Procedure

1. **Numbered steps** — what, files (`file:line`), new dependencies, verification method.
2. **Quality analysis:** Security, Performance, Reusability, Readability, Testability (manual QA), Cross-team impact (per `reference.md`).
3. **Failure-mode table** per API call / user action.
4. **Line estimate** — split PR if >500 LOC.
5. **Risk** — low/medium/high with one-sentence reason.
6. **requires_gate3** — `true` if changes touch security paths defined in `reference.md`.
7. **Gating:** Note feature toggles or environment flags if applicable.

## Output sections

- Implementation steps
- Quality analysis table
- Failure-mode table
- Line estimate
- Gating note
- Security review: requires_gate3 + security doc reference
- Risk
- GATE 1 approval prompt
