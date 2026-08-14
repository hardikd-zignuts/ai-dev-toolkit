---
mode: agent
description: Root-cause analysis for bugs. Use BEFORE plan for bug tickets.
---

# debug (ZA-Assessments-Portal-FE — Student Portal)

Evidence-based root-cause analysis for the Student Portal.

## Common bug sources
- React Query stale cache / wrong queryKey
- Redux persist hydration mismatch
- Auth / LTI session stale after login
- Axios interceptor swallowing errors
- React Router v6 context issues
- Firebase FCM / service worker
- Proctoring / TestSessionSecurityHost strike flow
- react-hook-form reset before data loads
- Sonner / Toaster missing from tree

## Procedure
1. Deterministic reproduction (URL under `/student/`, steps, expected vs actual)
2. 2–3 competing hypotheses
3. Cheapest disproof per hypothesis
4. Run disproofs; mark surviving/eliminated
5. Root cause with `file:line`
6. Fix hypothesis (not full implementation)

## Output
Reproduction, hypotheses table, root cause, fix hypothesis.
Next: `/intake` then `/plan`.
