---
name: debug
description: Root-cause analysis for bugs with file:line evidence. Use BEFORE plan for bug tickets.
---

# debug

Evidence-based root-cause analysis for **ZA-Assessments-Portal-FE** (Student Portal).

## Common bug sources

- React Query stale cache / wrong queryKey
- Redux persist hydration mismatch
- Auth / LTI session stale after login
- Axios interceptor errors
- React Router v6 context
- Firebase FCM / service worker
- Proctoring / TestSessionSecurityHost
- react-hook-form reset timing
- Sonner / Toaster missing

## Procedure

1. Deterministic reproduction
2. 2–3 hypotheses
3. Cheapest disproof each
4. Run disproofs
5. Root cause with file:line
6. Fix hypothesis

## Output

Reproduction, hypotheses, root cause, fix hypothesis. Next: intake → plan.
