---
name: refactor
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

## Never refactor without explicit ticket instruction

- Files or modules listed in **Do-not-touch** under `reference.md`
- Security or authentication core logic

## Procedure

Intake scope → research → plan → implement → manual QA / test verification (confirm zero behavior change).
