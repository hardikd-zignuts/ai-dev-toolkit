---
mode: agent
description: Structured diff review with critical/warning/info and GO/NO-GO verdict.
---

# review (ZA-Assessments-Portal-FE — Student Portal)

Evidence-based review. Every finding: `file:line` + quote + issue + fix.

## AZE Student Portal-specific checks
- No TypeScript / wrong import paths / inline axios
- API errors handled with toast + isError UI
- Proctoring files changed only with explicit task
- Auth via useAuth(); no new Formik; Sonner toasts; Tailwind v3
- No console.log in production code

## Verdict
- **GO** — zero critical findings
- **NO-GO** — critical findings → back to implement

## Output
Critical / warning / info sections with verdict.
