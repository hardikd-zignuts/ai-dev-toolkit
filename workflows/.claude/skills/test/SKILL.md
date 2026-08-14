---
name: test
description: Document manual browser verification; E2E deferred. Run npm run build. Use after implement or as step 5 of /feature.
---

# test

Verify behavior through manual browser QA. No automated test runner configured.

## Project Context

**ZA-Assessments-Portal-FE** — no `npm test` in package.json. Do **not** auto-install Vitest unless user explicitly requests.

## Future: E2E (Playwright/Cypress) — not yet configured

## Procedure

1. Check package.json for test script; run if present.
2. Map each AC to browser steps (base path `/student/`).
3. Bugfixes: use `/debug` reproduction; re-run manually.
4. Always `npm run build`.
5. Domain checks: auth, assessment, proctoring, audio, FCM, payments.

## Output

```
Test runner: none | <if configured>
Build: pass/fail
Manual verification per AC
all_green: true|false
```

## Failure modes

- Build fails → route to implement
- Manual AC fails → route to implement with notes
