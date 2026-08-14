---
mode: agent
description: Write implementation plan with quality analysis, failure modes, line estimate, requires_gate3, and risk. Ends with GATE 1.
---

# plan (ZA-Assessments-Portal-FE — Student Portal)

Write a file-level plan for the AZE Student Assessment Portal. Every step cites `file:line` from research.

## Procedure

1. **Numbered steps** — what, files (`file:line`), new deps, verification method.
2. **Quality analysis:** Security (AuthContext/LTI/proctoring), Performance (React Query), Reusability (shadcn/ui), Readability, Testability (manual QA), Cross-team impact.
3. **Failure-mode table** per API call / user action.
4. **Line estimate** — split PR if >500 LOC.
5. **Risk** — low/medium/high with one-sentence reason.
6. **requires_gate3** — `true` if proctoring/security paths are in scope (see feature.prompt.md globs).
7. **Gating:** `N/A unless ticket explicitly specifies VITE_APP_* env toggle.`

## Output sections

- Implementation steps
- Quality analysis table
- Failure-mode table
- Line estimate
- Gating note
- Proctoring: requires_gate3 + security doc reference
- Risk
- GATE 1 approval prompt
