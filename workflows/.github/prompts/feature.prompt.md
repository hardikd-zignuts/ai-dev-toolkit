---
mode: agent
description: Master orchestrator for end-to-end feature development. Runs intake → research → plan → [GATE 1] → implement → [GATE 2] → [GATE 3 if proctoring] → test → review → ship.
---

# /feature — Master Orchestrator (AZE Student Assessment Portal)

You are the orchestrator for **ZA-Assessments-Portal-FE** (Student Portal). Drive a feature from task description to reviewed PR by running sub-prompts in `.github/prompts/` in order, pausing at human gates.

## Argument

- `$task_description` — required. AZE ticket ID (e.g. `AZE-123`), URL, or free-form description.

## Sub-prompts

| Order | Prompt      | Why |
|-------|-------------|-----|
| 1     | `intake`    | Resolve task, extract AC, classify size |
| 2     | `research`  | Map codebase, detect conventions |
| 3     | `plan`      | Write implementation plan |
| 4     | `implement` | Execute plan on branch |
| 5     | `test`      | Manual QA + build check (E2E TBD) |
| 6     | `review`    | Structured diff review |
| 7     | `ship`      | Self-review, QA, manual QA, open PR |

## Proctoring paths (GATE 3 trigger)

```
src/context/ProctoringContext*
src/context/WebRTCProctoringContext*
src/services/test-session-security/**
src/components/test-session-security/**
docs/test-session-security-and-proctoring-integration.md
```

## Size-based routing

| Size    | Stages run                                               | Gates         |
|---------|----------------------------------------------------------|---------------|
| trivial | intake → implement → ship                                | GATE 3 if proctoring |
| small   | intake → research → plan → implement → test → ship       | GATE 1, GATE 2, GATE 3 if proctoring |
| medium  | All 7 stages                                             | GATE 1, GATE 2, GATE 3 if proctoring |
| large   | All 7 stages; plan splits PR if >500 LOC                 | GATE 1, GATE 2, GATE 3 if proctoring |

## Procedure

### Stage 1 — Intake
Run `intake` with `$task_description`. Capture: `task_type`, `size`, `summary`, `acceptance_criteria`, `success_criteria`, `cross_team_impact`.

### Stage 2 — Research (skip if trivial)
Run `research` with intake outputs.

### Stage 3 — Plan (skip if trivial)
Run `plan` with intake + research outputs. Capture `requires_gate3`.

### GATE 1 — Plan approval (REQUIRED, never skip)

Ask the user in the SAME turn as the plan output:

```
Plan ready for {ticket-or-summary}. Approve to proceed to implementation?

  [Approve] Plan looks good — proceed to implementation.
  [Modify]  Adjust the plan based on feedback.
  [Reject]  Stop and rethink the approach.
```

### Stage 4 — Implement
Run `implement` with approved plan + research. Capture `branch`, `requires_gate3`.

### GATE 2 — Execution review (REQUIRED, never skip)

```
Implementation complete on branch {branch}. Continue?

  [Continue]              Code looks fine — proceed.
  [Pause for manual test] Pause so I can manually validate.
  [Request changes]       Implementation needs revision.
```

### GATE 3 — Proctoring / Security Review (REQUIRED when proctoring paths touched)

Fire after GATE 2 when `requires_gate3: true` or diff touches proctoring paths:

```
GATE 3 — Proctoring / Security Review
Required: confirm docs/test-session-security-and-proctoring-integration.md was consulted.

  [Approve]           Security approach looks correct
  [Request changes]   Describe security concerns
  [Escalate]          Escalate to human security owner
```

### Stage 5 — Test
Run `test`. If failures, route back to `implement`.

### Stage 6 — Review (skip if trivial)
Run `review`. If critical findings, feed to `implement`.

### Stage 7 — Ship
Run `ship` with `ticket`, `branch`, `task_type`, `size`.

### Report

```
Feature complete.
  intake     → {task_type}, {size}
  GATE 1     → {decision}
  GATE 2     → {decision}
  GATE 3     → {approved|skipped|escalated}
  test       → manual QA documented
  ship       → {pr_url}
```

## Hard rules

- Never skip GATE 1 or GATE 2 on non-trivial runs.
- Never skip GATE 3 when proctoring/security paths are touched.
- Fire gates in the SAME turn as the preceding stage output.
- Run prompts sequentially.
- Never commit during implement — only ship commits.
