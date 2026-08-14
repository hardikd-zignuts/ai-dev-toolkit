---
name: review
description: Structured diff review with critical/warning/info and GO/NO-GO. Fresh context for medium/large.
---

# review

**ZA-Assessments-Portal-FE** — React 18 + Vite + JavaScript/JSX.

## Checks

- No TypeScript; @/ imports; API via src/api/
- Error handling: toast + isError UI
- Proctoring changed only with explicit task
- Auth via useAuth(); no new Formik; Sonner; Tailwind v3
- No console.log in production

## Verdict

GO (zero critical) | NO-GO (critical → implement)

## Output

Critical / warning / info with file:line evidence.
