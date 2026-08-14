---
name: refactor
description: Behavior-preserving structural changes. One concern per commit when shipping.
---

# refactor

**ZA-Assessments-Portal-FE** — JavaScript/JSX. Safe refactoring only.

## Safe targets

- Extract hooks from large components
- Move pure functions to src/utils/
- Consolidate API patterns in src/api/

## Never refactor without explicit instruction

- ProctoringContext, WebRTCProctoringContext
- src/services/test-session-security/
- initDragGuard() in main.jsx

## Procedure

Intake scope → research → plan → implement → manual QA (no behavior change).
