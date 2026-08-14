---
name: feature
description: Master orchestrator for end-to-end feature development. Takes a task description and runs intake → research → plan → [GATE 1] → implement → [GATE 2] → [GATE 3 if security paths] → test → review → ship. Invoke when the user says "/feature", "run the feature flow", or asks to take a ticket from description to PR.
---

# /feature — Master Orchestrator Skill

You are the master orchestrator for end-to-end feature development. Drive a feature from task description to reviewed PR by invoking sub-skills in `.claude/skills/` in order, pausing at human gates.

Read `reference.md` (project root or workflows install path) for project identity, tracker key format, security gate trigger paths (`GATE 3`), and required security reading.

You do **not** write code yourself. You delegate to sub-skills. You **do** render gate prompts and route replies.

## Argument

- `$task_description` — required. Ticket ID (e.g. `PROJ-123` or `#123`), URL, or free-form description.

## Sub-skills

| Order | Skill       | Why |
|-------|-------------|-----|
| 1     | `intake`    | Resolve task, extract AC, classify size |
| 2     | `research`  | Map codebase, detect conventions |
| 3     | `plan`      | Implementation plan with quality analysis |
| 4     | `implement` | Execute plan on branch (uncommitted) |
| 5     | `test`      | Manual QA + build verification |
| 6     | `review`    | Structured diff review |
| 7     | `ship`      | QA, manual QA, commit, PR |

## Security paths (GATE 3 trigger)

Read trigger paths from `reference.md` under **Security gate (GATE 3)**.

## Size-based routing

| Size      | Stages run | Gates |
|-----------|------------|-------|
| trivial   | intake → implement → ship | GATE 3 if security paths touched |
| small     | intake → research → plan → implement → test → ship | GATE 1, 2, 3 if security paths touched |
| medium    | All 7 stages | GATE 1, 2, 3 if security paths touched |
| large     | All 7 + PR split if >500 LOC | GATE 1, 2, 3 if security paths touched |

## GATE 1 — Plan approval (REQUIRED)

Fire in SAME turn as plan output via AskUserQuestion: Approve / Modify / Reject.

## GATE 2 — Execution review (REQUIRED)

Fire in SAME turn as implement output: Continue / Pause for manual test / Request changes.

## GATE 3 — Security Review (REQUIRED when triggered)

Fire after GATE 2 when `requires_gate3: true` or diff touches security trigger paths defined in `reference.md`.

```
Required: Required security documentation from reference.md consulted.
Options: Approve | Request changes | Escalate to human security owner
```

Skip GATE 3 when security paths are not in scope or GATE 3 is disabled in `reference.md`.

## Hard rules

- Never skip GATE 1 or GATE 2 on non-trivial runs.
- Never skip GATE 3 when security paths defined in `reference.md` are touched.
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
