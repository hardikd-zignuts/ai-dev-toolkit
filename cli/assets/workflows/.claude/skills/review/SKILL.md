---
name: review
description: Structured diff review with critical/warning/info and GO/NO-GO. Fresh context for medium/large.
---

# review

Perform a structured code diff review.

## Project Context

Read `reference.md` (project root or workflows install path) for stack details, path aliases, do-not-touch paths, and hard rules.

## Checks

- Verify changes against **Hard rules** and stack conventions in `reference.md`
- Error handling: verify graceful UI/API error handling
- Confirm no files in **Do-not-touch** list were modified without explicit ticket authorization
- Check for leftover debug statements or temporary code (`console.log`, `debugger`, etc.)

## Verdict

GO (zero critical issues) | NO-GO (critical issues found → route back to implement)

## Output

Critical / warning / info findings with file:line evidence, followed by GO/NO-GO verdict.
