---
mode: agent
description: Codebase exploration, convention detection, file mapping with file:line evidence.
---

# research (ZA-Assessments-Portal-FE — Student Portal)

Read the code before planning. Every claim cites `file:line`.

## Conventions to verify
- React 18 + Vite 5, JavaScript/JSX, `@/` alias
- API in `src/api/`, React Query + Redux, react-hook-form preferred
- Auth: `useAuth()` + LTI; Sonner toasts; Tailwind v3
- Proctoring paths: flag if task touches security/proctoring

## Procedure
1. Read AGENTS.md + CLAUDE.md
2. Search with 3+ synonym terms
3. Trace async lifecycle if applicable
4. Verify conventions in nearby files
5. Run npm run lint; validate hypotheses

## Output
Conventions, files to change, files to reference, hypotheses table, open questions.
