---
agent: agent
description: Execute approved plan on feature branch. Uncommitted changes only. Ends with GATE 2.
---

# implement

Execute the approved plan. **No commits** — ship creates commits.

## Project Context

Read `reference.md` (project root or workflows install path) for stack details, path aliases, branch naming rules, lint command, do-not-touch rules, and security gate paths.

## Conventions

- Follow code style and UI component guidelines from `reference.md`
- Respect **Do-not-touch** list in `reference.md` — never modify sacred files/functions without explicit ticket scope
- Set `requires_gate3: true` if changes touch security paths defined in `reference.md`

## Procedure

1. `git fetch`; create branch following pattern in `reference.md` (e.g. `feat/{TICKET-ID}-{desc}`)
2. Each plan step → edit files → run lint command from `reference.md`
3. Set `requires_gate3: true` if security trigger paths are modified
4. Output files changed + GATE 2 prompt

## Output

Branch, steps completed, files changed, requires_gate3, lint status, GATE 2.
