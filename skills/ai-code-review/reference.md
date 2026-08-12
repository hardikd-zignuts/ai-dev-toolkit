# AI Code Review — Reference

Use during Phase 2 (inspect) and Phase 3 (review). Read only sections relevant to the codebase and diff.

## Repository inspection

### Project identity

| Signal | Where to look |
|--------|---------------|
| Language | File extensions, `tsconfig`, `jsconfig`, language version config |
| Framework | Package manifests, framework config files, entry points |
| Build tool | Vite, Webpack, Parcel, esbuild, framework CLI config |
| Package manager | Lock files: `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, `bun.lockb` |
| Lint/format | ESLint, Biome, Prettier, Stylelint, editorconfig |

### Architecture and structure

- Entry points: `src/main.*`, `app/`, `pages/`, `routes/`
- Feature vs layer organization: by domain, by type, or hybrid
- Shared code: `components/`, `ui/`, `shared/`, `lib/`, `utils/`, `hooks/`, `services/`
- API layer: `api/`, `services/`, `queries/`, generated clients
- State: stores, context providers, query caches, signals
- Auth: guards, middleware, token storage, role checks
- Config and env: `.env.example`, runtime config, feature flags

### Conventions to extract

- File naming: PascalCase vs kebab-case, barrel `index` exports
- Component patterns: composition, slots, compound components, render props
- Styling: primary mechanism and token/theme usage
- Import order and alias paths (`@/`, `~/`, etc.)
- Error/loading/empty UI patterns on existing pages
- Form validation and submission handling
- Test placement: co-located vs `__tests__/`, e2e location

Document 3–5 concrete examples (file paths + pattern names) before reviewing the diff.

## Review categories

### Bugs and logic errors

- Off-by-one, wrong operator, inverted conditions
- Missing null/undefined checks where the codebase usually guards
- Race conditions: stale closures, un-awaited async, missing cleanup
- Incorrect dependency arrays or effect lifecycle issues (where applicable)
- Wrong default values or fallbacks

### Security

- XSS: unsanitized HTML, `dangerouslySetInnerHTML` equivalents, URL injection
- AuthZ: missing permission checks on UI actions or routes
- Sensitive data in logs, URLs, or client storage
- CSRF/token handling inconsistent with project patterns
- Dependency with known vulnerability only when verifiable from lockfile/advisories

### Performance

- Unnecessary re-renders or expensive work in hot paths
- Missing memoization only when the project already uses that pattern for similar cases
- N+1 requests, waterfall fetches, missing debounce/throttle where peers use it
- Large bundle imports (whole library vs subpath)
- List rendering without keys or with unstable keys

### Accessibility

- Missing labels, roles, or keyboard support vs existing interactive components
- Focus traps in modals, visible focus states
- Color contrast and non-color-only state indicators
- Live regions for dynamic updates when the project uses them elsewhere

### Type safety

- `any` or unsafe casts bypassing project norms
- Incorrect generics or narrowed types causing runtime assumptions
- Mismatch between API response types and usage

### Error handling

- Swallowed errors, empty catch blocks
- Missing user-facing error states when peers show them
- Inconsistent error propagation in async chains

### State management

- Duplicated source of truth
- Derived state stored redundantly
- Updates after unmount, missing abort/cancel for requests

### API integration

- Wrong HTTP method, path, or payload shape vs existing client patterns
- Missing loading/error handling
- Cache invalidation issues with project's data layer

### Maintainability and architecture

- Duplication that violates DRY only when it increases real maintenance cost
- Leaky abstractions, cross-layer imports breaking project boundaries
- New patterns inconsistent with adjacent code without justification

Flag architecture issues only when they create measurable risk — not when the structure merely differs from personal preference.

## Severity calibration

| Severity | Examples |
|----------|----------|
| Critical | Auth bypass, XSS, data corruption, crash on common path, secrets committed |
| High | Functional bug for primary flow, broken regression in core feature |
| Medium | Edge-case bug, inconsistent error handling, a11y gap on key interaction |
| Low | Naming drift, minor duplication, small perf win |
| Informational | Suggestion aligned with optional cleanup, note for future PR |

## Confidence calibration

| Confidence | When to use |
|------------|-------------|
| High | Issue visible in diff, or linter/type-check/test failure confirms |
| Medium | Strong static evidence; runtime not verified |
| Low | Depends on external context, product rules, or backend behavior |

Prefer fewer high-confidence findings over many speculative ones.

## Validation checks

Run when available and proportional to scope:

```bash
# Examples — use the project's actual scripts from package manifest
npm run lint
npm run typecheck
npm test -- --findRelatedTests <changed-files>
```

Record what was run and the outcome in the Validation section. If checks cannot run, state that and rely on static review.

## Anti-patterns in reviewing

- Do not flag convention-compliant code as wrong.
- Do not suggest rewriting to a different framework or paradigm.
- Do not list generic best practices unrelated to the diff.
- Do not duplicate the same root cause as multiple findings — consolidate.
- Do not recommend new dependencies unless necessary for a confirmed issue.
