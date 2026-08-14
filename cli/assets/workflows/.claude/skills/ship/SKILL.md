---
name: ship
description: Self-review, QA, AI approval, manual QA, PR open, and review-comment cycle. Idempotent — safe to re-invoke.
---

# ship

Self-review → QA → AI approval → manual QA → commit → PR → review cycle.

## Project Context

Read `reference.md` (project root or workflows install path) for QA commands, branch/commit conventions, and manual QA domains table.

## Sub-stages

`SELF_REVIEW → QA → AI_APPROVAL → MANUAL_QA → PR_OPEN → REVIEW_CYCLE`

## QA

1. `npm install` (or package manager install) if dependency manifests changed
2. Run lint command from `reference.md`
3. Run build command from `reference.md`
4. Run test command from `reference.md` (or note `N/A — no test runner configured`)

## AI approval

- Plan compliance & convention compliance per `reference.md`
- Gating checks pass
- Lint + build + tests pass
- All ACs met

## Manual QA (required)

Map ACs to manual verification checks using the **Manual QA domains** table in `reference.md`.

## PR

- Commit with Conventional Commits pattern from `reference.md`: e.g. `feat({TICKET-ID}): improve user flow`
- Use `.github/PULL_REQUEST_TEMPLATE.md` if available
- `gh pr list --head <branch>` for idempotency
- Never force-push

## Output

End with `🔗 PR: <url>`
