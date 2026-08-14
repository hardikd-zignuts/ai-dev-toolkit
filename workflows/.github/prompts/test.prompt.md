---
mode: agent
description: Document manual browser verification; E2E framework deferred. Run npm run build always.
---

# test (ZA-Assessments-Portal-FE — Student Portal)

Verify behavior through manual browser QA. **No test runner configured** — do not auto-install Vitest.

## Future: E2E (Playwright/Cypress) — not yet configured

## Procedure

1. Check `package.json` for `test` script. If absent, skip automated tests.
2. Map each AC to browser steps (base path `/student/`).
3. Bugfixes: use `/debug` reproduction evidence; re-run steps manually.
4. Always run `npm run build`.
5. Domain checks when applicable: auth, assessment, proctoring, audio, FCM, payments.

## Output

```
Test runner: none | <runner if configured>
Build: pass/fail
Manual verification: AC1 → pass/fail, ...
all_green: true|false
```
