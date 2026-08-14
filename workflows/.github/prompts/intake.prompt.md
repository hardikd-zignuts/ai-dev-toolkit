---
agent: agent
description: Resolve a task description into structured task_type, size, summary, acceptance criteria, success criteria, and cross-team impact.
---

# intake

Turn a fuzzy task description into a structured intake.

## Project Context

Read `reference.md` (project root or workflows install path) for project identity, ticket key format, primary fetcher, and cross-team impact list.

## Input

`task_description`: ticket ID, URL, or free-form text.

## Procedure

1. **Resolve the source.** Ticket key (format per `reference.md` e.g., `PROJ-###` or `#123`) → **Primary:** Primary tracker fetcher specified in `reference.md` (e.g. Atlassian MCP `plugin-atlassian-atlassian`, `gh issue view`, `linear`). **Fallback:** ask user to paste details once; STOP if still empty.
2. **Extract acceptance criteria.** Pull explicit AC; otherwise infer 3–5 testable criteria.
3. **Classify task type:** `feature`, `bug`, `refactor`, `release`, or `review`.
4. **Size the task:** trivial (<50 LOC, 1 file), small (50–200 LOC), medium (200–500 LOC), large (>500 LOC).
5. **Validate success criteria.** State what "done" means explicitly.
6. **Note cross-team impact.** Check services/repos listed under Cross-team impact in `reference.md`, or state `Self-contained`.

## Output

```
Type:    <feature|bug|refactor|release|review>
Size:    <trivial|small|medium|large>
Summary: <one paragraph>

Acceptance criteria:
  1. <criterion>
  2. <criterion>

Success criteria:
  <one or two sentences>

Cross-team impact:
  <repos/teams or "Self-contained">

Ticket source: <Primary fetcher | user paste | free-form>
```
