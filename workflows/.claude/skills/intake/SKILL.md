---
name: intake
description: Resolve a task description (ticket ID, URL, or free-form prompt) into structured task_type, size, summary, acceptance criteria, validated success criteria, and cross-team impact. Use first when starting any new development task, or as the first step of the /feature orchestrator.
---

# intake

Turn a fuzzy task description into a structured intake the rest of the workflow can rely on.

## Project Context

Read `reference.md` (project root or workflows install path) for project identity, ticket source tracker format, primary fetcher, and cross-team impact list.

## Input

`task_description`: ticket ID, URL, or free-form text.

## Procedure

1. **Resolve the source.**
   - Ticket key (format per `reference.md` e.g., `PROJ-###` or `#123`):
     - **Primary** — Use tracker fetcher specified in `reference.md` (e.g. Atlassian MCP `plugin-atlassian-atlassian`, `gh issue view`, `linear`).
     - **Fallback** — if fetcher unavailable, ask user once to paste ticket content. STOP if still empty.
   - URL: Primary tracker fetcher or web/CLI tool.
   - Free-form: user message is the source.

2. **Extract acceptance criteria.** Explicit AC or infer 3–5 testable criteria.

3. **Classify task type:** `feature` | `bug` | `refactor` | `release` | `review`

4. **Size:** trivial | small | medium | large. Default `medium` if unsure.

5. **Validate success criteria** — distinct from AC list.

6. **Cross-team impact:** Check related services/repos listed in `reference.md` under Cross-team impact, or output `Self-contained`.

## Output

```
Type, Size, Summary, Acceptance criteria, Success criteria, Cross-team impact
Ticket source: <Primary fetcher | user paste | free-form>
```

## Failure modes

- Fetcher / CLI unavailable: one paste request, then STOP if empty.
- Success criteria ambiguous: ask user before proceeding.
