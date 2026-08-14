---
name: feature
description: Master orchestrator for end-to-end feature development. Takes a task description and runs intake → research → plan → [GATE 1] → implement → [GATE 2] → [GATE 3 if proctoring] → test → review → ship. Invoke when the user says "/feature", "run the feature flow", or asks to take a ticket from description to PR.
---

# /feature — Master Orchestrator Skill

You are the orchestrator for **ZA-Assessments-Portal-FE** (AZE Student Assessment Portal). Drive a feature from task description to reviewed PR by invoking sub-skills in `.claude/skills/` in order, pausing at human gates.

You do **not** write code yourself. You delegate to sub-skills. You **do** render gate prompts and route replies.

## Argument

- `$task_description` — required. Ticket ID (e.g. `AZE-123`), URL, or free-form description.

## Sub-skills

| Order | Skill       | Why |
|-------|-------------|-----|
| 1     | `intake`    | Resolve task, extract AC, classify size |
| 2     | `research`  | Map codebase, detect conventions |
| 3     | `plan`      | Implementation plan with quality analysis |
| 4     | `implement` | Execute plan on branch (uncommitted) |
| 5     | `test`      | Manual QA + build (E2E TBD) |
| 6     | `review`    | Structured diff review |
| 7     | `ship`      | QA, manual QA, commit, PR |

## Proctoring paths (GATE 3 trigger)

```
src/context/ProctoringContext*
src/context/WebRTCProctoringContext*
src/services/test-session-security/**
src/components/test-session-security/**
docs/test-session-security-and-proctoring-integration.md
```

## Size-based routing

| Size      | Stages run | Gates |
|-----------|------------|-------|
| trivial   | intake → implement → ship | GATE 3 if proctoring |
| small     | intake → research → plan → implement → test → ship | GATE 1, 2, 3 if proctoring |
| medium    | All 7 stages | GATE 1, 2, 3 if proctoring |
| large     | All 7 + PR split if >500 LOC | GATE 1, 2, 3 if proctoring |

## GATE 1 — Plan approval (REQUIRED)

Fire in SAME turn as plan output via AskUserQuestion: Approve / Modify / Reject.

## GATE 2 — Execution review (REQUIRED)

Fire in SAME turn as implement output: Continue / Pause for manual test / Request changes.

## GATE 3 — Proctoring / Security Review (REQUIRED when triggered)

Fire after GATE 2 when `requires_gate3: true` or proctoring paths touched.

```
Required: docs/test-session-security-and-proctoring-integration.md consulted.
Options: Approve | Request changes | Escalate to human security owner
```

Skip GATE 3 when proctoring paths not in scope.

## Hard rules

- Never skip GATE 1 or GATE 2 on non-trivial runs.
- Never skip GATE 3 when proctoring/security paths touched.
- Fire gates in SAME turn as stage output.
- Invoke skills sequentially with concrete inputs.
- Never commit during implement — only ship commits.

## Report

```
Feature complete.
  GATE 1 → {decision}
  GATE 2 → {decision}
  GATE 3 → {approved|skipped|escalated}
  ship   → {pr_url}
```
