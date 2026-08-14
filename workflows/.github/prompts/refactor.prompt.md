---
mode: agent
description: Behavior-preserving structural changes. One concern per commit when shipping.
---

# refactor (ZA-Assessments-Portal-FE — Student Portal)

Safe refactoring for the Student Portal. No behavior changes.

## Safe targets
- Extract hooks from large components (>250 lines)
- Move pure functions to `src/utils/`
- Consolidate duplicate API patterns in `src/api/`
- Rename for clarity (update all imports)

## Never refactor without explicit instruction
- ProctoringContext, WebRTCProctoringContext
- `src/services/test-session-security/`
- `initDragGuard()` in main.jsx

## Procedure
1. Intake scope (what stays identical behaviorally)
2. Research callers and impact radius
3. Plan with line estimate
4. Implement with lint after each step
5. Manual QA to confirm no behavior change
