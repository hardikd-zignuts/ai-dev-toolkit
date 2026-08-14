---
agent: agent
description: Self-review, QA (lint + build), AI approval, manual QA checklist, commit, PR creation, review cycle.
---

# ship

Hand the change off. Sub-stages: `SELF_REVIEW → QA → AI_APPROVAL → MANUAL_QA → COMMIT → PUSH → PR_OPEN → REVIEW_CYCLE`

## Project Context

Read `reference.md` (project root or workflows install path) for QA commands, commit format, and manual QA domains table.

## QA Commands (run in order)
- Dependency install if manifests changed
- Run lint command from `reference.md`
- Run build command from `reference.md`
- Run test command from `reference.md` (or note `N/A — no test runner configured`)

## Commit Format (Conventional Commits v1.0.0)
Follow pattern from `reference.md`: e.g. `feat({TICKET-ID}): improve user flow`

## AI Approval Checklist
- [ ] Plan compliance & convention compliance per `reference.md`
- [ ] Do-not-touch paths respected
- [ ] Lint + build + tests pass
- [ ] Gating / environment flags verified
- [ ] All ACs met

## Manual QA (required)
Map intake ACs to browser/manual checks using the **Manual QA domains** table in `reference.md`.

## PR Creation
1. Check existing: `gh pr list --head <branch>`
2. Use `.github/PULL_REQUEST_TEMPLATE.md` if available
3. Push: `git push -u origin <branch>` (never force-push)
4. Create: `gh pr create --base main --head <branch>`

## Output
```
QA:          lint ✓, build ✓
Manual QA:   <sections> — pass/fail
AI approval: PASS
🔗 PR: <url>
```
