---
mode: agent
description: Self-review, QA (lint + build), AI approval, manual QA checklist, commit, PR creation, review cycle.
---

# ship (ZA-Assessments-Portal-FE — Student Portal)

Hand the change off. Sub-stages: `SELF_REVIEW → QA → AI_APPROVAL → MANUAL_QA → COMMIT → PUSH → PR_OPEN → REVIEW_CYCLE`

## QA Commands (run in order)
```bash
npm install        # if package.json changed
npm run lint       # ESLint v9 flat config — fix ALL errors
npm run build      # Vite production build
npm test           # only if script exists; else "N/A — E2E not configured"
```

## Commit Format (Conventional Commits v1.0.0)
```
feat(AZE-123): improve assessment timer display

Refs: AZE-123
```

## AI Approval Checklist
- [ ] No TypeScript introduced
- [ ] All imports use @/ alias
- [ ] API calls through src/api/
- [ ] Auth via useAuth(); proctoring/dragGuard untouched unless required
- [ ] Lint + build pass
- [ ] Gating: N/A unless VITE_APP_* specified in ticket
- [ ] All ACs met

## Manual QA (required)
Map intake AC to browser checks. Sections: auth, assessment, proctoring, audio, FCM, payments — run those applicable.

## PR Creation
1. Check existing: `gh pr list --head <branch>`
2. Use `.github/PULL_REQUEST_TEMPLATE.md`
3. Push: `git push -u origin <branch>` (never force-push)
4. Create: `gh pr create --base main --head <branch>`

## Output
```
QA:          lint ✓, build ✓
Manual QA:   <sections> — pass/fail
AI approval: PASS
🔗 PR: <url>
```
