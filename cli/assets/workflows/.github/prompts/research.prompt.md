---
agent: agent
description: Codebase exploration, convention detection, file mapping with file:line evidence.
---

# research

Read the code before planning. Every claim cites `file:line`.

## Project Context

Read `reference.md` (project root or workflows install path) for stack details, path aliases, lint commands, and security gate paths.

## Conventions to verify

- Framework and API client structure per `reference.md`
- Auth, styling, state management, and toast/notification patterns per `reference.md`
- Flag security impact if changes touch sensitive paths defined in `reference.md`

## Procedure

1. Read `AGENTS.md` and `CLAUDE.md` if present in repository root.
2. Search codebase using 3+ synonyms for key domain terms.
3. Trace async data/lifecycle flows.
4. Verify nearby code conventions and patterns.
5. Run lint command per `reference.md`; validate hypotheses.

## Output

Conventions, files to change, files to reference, hypotheses table, open questions.
