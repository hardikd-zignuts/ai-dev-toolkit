---
name: ai-code-review
description: Performs comprehensive, practical frontend code reviews on repositories, pull requests, commits, or changed files by first inspecting project conventions and then reporting actionable findings with severity and confidence. Use when reviewing code, pull requests, diffs, commits, or when the user asks for a code review, PR review, or frontend review.
---

# AI Code Review

Perform comprehensive, practical frontend code reviews on existing repositories, pull requests, commits, or changed files.

This skill MUST NOT be hardcoded to any specific frontend technology.

Do not assume React, Next.js, Vue, Angular, Tailwind, MUI, Bootstrap, or any specific framework/library.

The project being reviewed is always the source of truth.

Behave like a senior frontend engineer reviewing code inside an unfamiliar existing codebase.

## Core principles

- The project's existing conventions are the source of truth.
- Prioritize actual engineering risks over subjective style preferences.
- Do not report something merely because it differs from your preferred coding style if it follows the project's established convention.
- Do not invent problems.
- Do not recommend large refactors when a small fix is sufficient.
- Do not modify code unless explicitly asked to fix the findings.

If asked to fix findings, make the smallest safe changes and preserve existing patterns.

## Workflow

### Phase 1: Determine review scope

Identify what to review:

| Input | How to gather |
|-------|---------------|
| Pull request | `git diff` against base branch, PR description, changed files |
| Commit(s) | `git show`, `git diff` for specified range |
| Changed files | User-provided paths or unstaged/staged diff |
| Full repository | Focus on critical paths; sample representative modules |

Prefer reviewing the smallest meaningful diff. Expand scope only when context is required to validate a finding.

### Phase 2: Inspect the repository

Before reviewing code, inspect the repository to understand:

- Framework/language
- Architecture
- Folder structure
- Coding conventions
- Component patterns
- State management
- API patterns
- Error handling
- Testing approach
- Authentication/authorization patterns
- Existing utilities
- Dependency usage
- Project-specific conventions

**How to inspect:**

1. Read project config files (package manifests, build config, framework config, linter/formatter config).
2. Map folder structure and locate entry points, components, services, and shared utilities.
3. Read representative examples of components, pages, hooks/stores, and API clients.
4. Search for patterns used in the area under review (naming, error handling, loading states, auth guards).
5. Note testing conventions: test location, frameworks, mocking patterns, coverage expectations.
6. Document findings briefly before evaluating the diff.

For a detailed inspection checklist, see [reference.md](reference.md).

### Phase 3: Review the code

Review for:

1. Bugs
2. Logic errors
3. Security vulnerabilities
4. Performance problems
5. Accessibility issues
6. Type-safety problems
7. Error handling
8. State management issues
9. API integration issues
10. Code duplication
11. Maintainability
12. Architecture
13. Unnecessary complexity
14. Potential regressions
15. Incorrect edge-case handling
16. Resource/memory issues
17. Dependency problems

**Review method:**

1. Read each changed file in context — open surrounding code when needed.
2. Trace data flow: inputs → state → side effects → rendered output.
3. Check edge cases: empty, loading, error, unauthorized, stale data, rapid re-entry.
4. Compare new code against established patterns found in Phase 2.
5. Run available validation when practical: linter, type-check, tests related to changed files.
6. Record only meaningful findings with evidence.

### Phase 4: Classify findings

**Severity:**

- Critical — production breakage, data loss, security exploit, or blocking defect
- High — likely bug, serious regression, or significant security/performance risk
- Medium — incorrect behavior under common edge cases, maintainability risk, or notable a11y gap
- Low — minor issue, localized improvement, or low-impact inconsistency
- Informational — observation, optional improvement, or context for future work

**Issue type** (include in each finding):

- Confirmed issue — verified in code or by failing check
- Likely issue — strong evidence but not fully verified at runtime
- Potential concern — plausible risk requiring human judgment
- Recommendation — optional improvement aligned with project conventions

**Confidence:**

- High — clear evidence in the diff or reproducible check
- Medium — reasonable inference from code structure and patterns
- Low — speculative; flag as potential concern, not a definitive defect

Do not escalate severity based on preference alone.

### Phase 5: Report (read-only by default)

Produce the final output using the format below. Do not modify code unless the user explicitly asks to fix findings.

## Finding format

For every meaningful finding provide:

- Severity
- File
- Location/line when available
- Problem
- Why it matters
- Recommended fix
- Confidence

Use this structure within the Findings section:

```markdown
### [Short title]

**Severity:** Critical | High | Medium | Low | Informational
**Type:** Confirmed issue | Likely issue | Potential concern | Recommendation
**Location:** `path/to/file.ext` (line N) or function/component name
**Problem:** What is wrong or risky.
**Impact:** Why it matters — user impact, security, correctness, maintainability.
**Recommendation:** Smallest safe fix; preserve existing patterns.
**Confidence:** High | Medium | Low
```

## Final output format

Every completed review must end with this structure:

```markdown
## Summary

Overall assessment.

## Findings

For each finding:

Severity:
Location:
Problem:
Impact:
Recommendation:
Confidence:

## Positive Observations

Mention important things implemented correctly when useful.

## Priority Actions

List the most important fixes first.

## Validation

Mention any checks/tests performed.

## Remaining Concerns

Anything that requires human review.
```

The goal is to provide a senior-level, actionable code review rather than a generic checklist.

## Fixing findings (only when explicitly requested)

When the user asks to fix findings:

1. Address Priority Actions first, highest severity first.
2. Make the smallest safe change per finding.
3. Match existing naming, patterns, and file organization.
4. Do not refactor unrelated code.
5. Re-run validation on changed files.
6. Summarize what was fixed and what remains.

## Additional resources

- For repository inspection signals and review category guidance, see [reference.md](reference.md)
