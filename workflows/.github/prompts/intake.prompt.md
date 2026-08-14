---
mode: agent
description: Resolve a task description into structured task_type, size, summary, acceptance criteria, success criteria, and cross-team impact.
---

# intake (ZA-Assessments-Portal-FE — Student Portal)

Turn a fuzzy task description into a structured intake. AZE Student Assessment Portal — React 18 + Vite + JavaScript/JSX, base path `/student/`. Ticket keys: `AZE-###`.

## Input

`task_description`: AZE ticket ID, URL, or free-form text.

## Procedure

1. **Resolve the source.** Ticket key → **Primary:** Atlassian MCP (`plugin-atlassian-atlassian`) to fetch title, description, AC. **Fallback:** ask user to paste details once; STOP if still empty.
2. **Extract acceptance criteria.** Pull explicit AC; otherwise infer 3–5 testable criteria.
3. **Classify task type:** `feature`, `bug`, `refactor`, `release`, or `review`.
4. **Size the task:** trivial (<50 LOC, 1 file), small (50–200 LOC), medium (200–500 LOC), large (>500 LOC).
5. **Validate success criteria.** State what "done" means explicitly.
6. **Note cross-team impact.** Consider: ZA-AI-Assessments-FE (admin), ZA-Client-Portal-FE (client), ZA-Evaluation-Portal-FE (evaluator), backend APIs.

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

Ticket source: <Atlassian MCP | user paste | free-form>
```
