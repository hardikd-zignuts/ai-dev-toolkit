---
name: intake
description: Resolve a task description (ticket ID, URL, or free-form prompt) into structured task_type, size, summary, acceptance criteria, validated success criteria, and cross-team impact. Use first when starting any new development task, or as the first step of the /feature orchestrator.
---

# intake

Turn a fuzzy task description into a structured intake the rest of the workflow can rely on.

## Project Context

**ZA-Assessments-Portal-FE** — AZE Student Assessment Portal. React 18 + Vite SPA, base path `/student/`. Ticket keys: `AZE-###` (Jira).

## Input

`task_description`: ticket ID, URL, or free-form text.

## Procedure

1. **Resolve the source.**
   - Ticket key (`AZE-###`): **Primary** — Atlassian MCP (`plugin-atlassian-atlassian`) to fetch title, description, AC.
   - **Fallback** — if MCP unavailable, ask user once to paste ticket content. STOP if still empty.
   - URL: Atlassian MCP or `gh issue view` / `gh pr view`.
   - Free-form: user message is the source.

2. **Extract acceptance criteria.** Explicit AC or infer 3–5 testable criteria.

3. **Classify task type:** `feature` | `bug` | `refactor` | `release` | `review`

4. **Size:** trivial | small | medium | large. Default `medium` if unsure.

5. **Validate success criteria** — distinct from AC list.

6. **Cross-team impact:** ZA-AI-Assessments-FE (admin), ZA-Client-Portal-FE, ZA-Evaluation-Portal-FE, backend APIs, or `Self-contained`.

## Output

```
Type, Size, Summary, Acceptance criteria, Success criteria, Cross-team impact
Ticket source: <Atlassian MCP | user paste | free-form>
```

## Failure modes

- MCP unavailable: one paste request, then STOP if empty.
- Success criteria ambiguous: ask user before proceeding.
