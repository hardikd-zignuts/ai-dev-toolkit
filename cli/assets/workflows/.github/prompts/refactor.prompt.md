---
agent: agent
description: Behavior-preserving structural changes. One concern per commit when shipping.
---

# refactor

Safe structural refactoring while preserving existing behavior.

## Project Context

Read `reference.md` (project root or workflows install path) for stack specifications, path aliases, and the **Do-not-touch** list.

## Safe targets

- Extract reusable hooks/modules from oversized components/functions
- Move pure utility functions into shared utilities path from `reference.md`
- Consolidate repetitive API pattern handlers into API layer from `reference.md`
- Rename symbols for clarity (updating all imports)

## Never refactor without explicit ticket instruction

- Files or modules listed in **Do-not-touch** under `reference.md`
- Security or authentication core logic

## Procedure

1. Intake scope (define what behavior must remain identical)
2. Research callers and impact radius
3. Plan with line estimate
4. Implement with lint check after each step
5. Manual QA / test verification to confirm zero behavior change
