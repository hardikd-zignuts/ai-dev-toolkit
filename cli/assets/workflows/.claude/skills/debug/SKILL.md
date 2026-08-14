---
name: debug
description: Root-cause analysis for bugs with file:line evidence. Use BEFORE plan for bug tickets.
---

# debug

Evidence-based root-cause analysis for bug reports.

## Project Context

Read `reference.md` (project root or workflows install path) for stack details, path aliases, and common component architecture.

## Common bug categories to investigate

- State management / cache hydration mismatch
- API client interceptors / auth token expiration
- Routing context & navigation params
- Form state validation / timing issues
- Async lifecycle & race conditions
- Notification / toast service initialization
- Component prop mismatches & type errors

## Procedure

1. Deterministic reproduction
2. Formulate 2–3 testable hypotheses
3. Identify cheapest disproof for each
4. Execute disproofs
5. Establish root cause with `file:line` evidence
6. Propose fix hypothesis

## Output

Reproduction steps, hypotheses, root cause with `file:line`, fix hypothesis. Next step: intake → plan.
