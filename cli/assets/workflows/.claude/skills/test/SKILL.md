---
name: test
description: Document manual verification and execute QA/build commands from reference.md. Use after implement or as step 5 of /feature.
---

# test

Verify behavior through automated tests (if configured) and manual verification.

## Project Context

Read `reference.md` (project root or workflows install path) for QA commands (test runner, build script) and manual QA domain checklist.

## Procedure

1. Check `reference.md` under **QA commands** for test command; run if configured (output `N/A` if none).
2. Map each AC to manual verification steps (using app base path from `reference.md`).
3. For bugfixes: re-run reproduction steps from `/debug`.
4. Always execute the build command specified in `reference.md` (e.g. `npm run build`).
5. Perform domain checks based on **Manual QA domains** table in `reference.md`.

## Output

```
Test runner: none | <test command result>
Build: pass/fail
Manual verification per AC
all_green: true|false
```

## Failure modes

- Build fails → route to implement
- Manual AC fails → route to implement with notes
