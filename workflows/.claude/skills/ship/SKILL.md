---
name: ship
description: Self-review, QA, AI approval, manual QA, PR open, and review-comment cycle. Idempotent — safe to re-invoke.
---

# ship

Self-review → QA → AI approval → manual QA → commit → PR → review cycle.

## Sub-stages

`SELF_REVIEW → QA → AI_APPROVAL → MANUAL_QA → PR_OPEN → REVIEW_CYCLE`

## QA

1. `npm install` if package.json changed
2. `npm run lint`
3. `npm run build`
4. `npm test` only if script exists; else `N/A — E2E not configured`

## AI approval

- Plan compliance, convention compliance (no TS, @/ alias, src/api/, no Formik, Sonner, auth/proctoring/dragGuard intact)
- Gating: N/A unless VITE_APP_* in ticket
- Lint + build pass
- All ACs met

## Manual QA (required)

Map AC to browser checks. Sections when applicable:
- Auth: login, session, logout
- Assessment: start → consent → timer → submit → results
- Proctoring: fullscreen, tab strike, terminate (GATE 3 must have passed)
- Audio: mic, RecordRTC, WaveSurfer
- FCM: permission, service worker
- Payments: success/failure redirects

## PR

- Conventional Commits: `feat(AZE-123): improve assessment timer display`
- Use `.github/PULL_REQUEST_TEMPLATE.md`
- `gh pr list --head <branch>` for idempotency
- Never force-push

## Output

End with `🔗 PR: <url>`
