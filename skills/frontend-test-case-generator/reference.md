# Frontend Test Case Generator — Reference

Use this checklist during Phase 1. Read only the sections relevant to the task.

## Project identity

| Signal | Where to look |
|--------|---------------|
| Language | File extensions, `tsconfig`, `jsconfig` |
| Framework | `package.json`, framework config files |
| Test runner | `package.json` scripts, `vitest.config.*`, `jest.config.*`, `playwright.config.*`, `cypress.config.*`, `karma.conf.*` |
| CI | `.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile`, CircleCI config |

## Locating tests

Common locations:

```
__tests__/
tests/
test/
e2e/
cypress/
playwright/
spec/
*.test.*
*.spec.*
```

Note co-location vs centralized folders. Follow whichever pattern the project uses.

## Inspection checklist

### Test structure

- Unit vs integration vs E2E boundaries
- Page Object Model or similar abstractions
- Describe/it vs test blocks vs feature files
- Setup/teardown: `beforeEach`, global setup, database seeding
- Snapshot usage (if any)

### Naming conventions

- File naming: `Component.test.tsx` vs `component.spec.js` vs `component.cy.ts`
- Test title style: sentence case, should/when/given patterns
- ID or tag conventions in test names or metadata

### Mocking approach

| Pattern | Signals |
|---------|---------|
| MSW | `msw`, `setupServer`, handlers directory |
| Module mocks | `vi.mock`, `jest.mock`, manual `__mocks__` |
| HTTP stubs | nock, fetch mock, axios-mock-adapter |
| Browser intercept | Cypress/Playwright route/intercept APIs |
| Store/state mocks | preloaded state, mock providers, test stores |

Reuse existing handlers and fixtures instead of inventing parallel mock layers.

### Fixtures and factories

- Static JSON in `fixtures/`, `__fixtures__/`, `mocks/`
- Factory libraries: `@faker-js/faker`, `factory.ts`, custom builders
- Seed data scripts for E2E

### Test utilities

Search for:

```
renderWithProviders | customRender | mountWithRouter
createWrapper | TestProviders | AllTheProviders
setupTests | test-utils | testing-library
loginAs | authenticate | mockSession
waitFor | findBy | getByRole patterns in existing tests
```

### Authentication setup

- Login helpers or session cookies in E2E
- Mock tokens, JWT decode stubs, auth context providers
- Role-based fixtures: admin, guest, member, etc.
- Route guards and redirect expectations

### API mocking

- Where handlers live and how they are registered
- Base URL / environment overrides in test config
- Error simulation patterns (500, timeout, malformed JSON)
- Pagination, empty list, and partial response fixtures

### CI/testing configuration

- Commands run in CI vs local-only scripts
- Coverage thresholds and reporting
- Parallel/shard configuration
- Required checks before merge
- Browser matrix for E2E

## Scenario selection guide

Use this to decide which categories apply. Do not force every category on every target.

| Target type | Usually prioritize |
|-------------|------------------|
| Form | Validation, submission, error handling, disabled/loading, a11y labels |
| List/table | Empty, pagination, sorting, loading, error, large data |
| Modal/dialog | Open/close, focus trap, escape, confirm/cancel, nested actions |
| Auth flow | Login/logout, session expiry, role redirects, restricted routes |
| Async data | Loading, success, empty, error, retry, stale data |
| Navigation | Route changes, back button, deep links, query params |
| Permission-gated UI | Role visibility, disabled actions, unauthorized messaging |

## Behavior-first test design

Prefer:

- Assertions on visible text, roles, URLs, and user outcomes
- Interaction sequences a user would perform
- Business rules expressed as preconditions and expected results

Avoid unless the project already does so:

- Testing private functions or internal state directly
- Snapshotting entire pages without behavioral assertions
- Brittle selectors tied to implementation details (class names, DOM depth)
- Duplicate coverage across unit and E2E for the same behavior without reason

## Executable test alignment

When writing code, mirror existing patterns:

```markdown
Checklist:
- [ ] Same directory and file naming as sibling tests
- [ ] Same imports and test utility entry point
- [ ] Same mock/fixture sources
- [ ] Same assertion style and async patterns
- [ ] Same cleanup and isolation approach
```

## No framework present

If inspection finds no tests and no test dependencies:

1. State what was searched and what was missing.
2. Recommend one approach based on project type (SPA, SSR, mobile web) — do not prescribe a default stack.
3. Outline minimal setup: runner, config, example test, CI hook.
4. Wait for explicit approval before adding packages or config files.

## Test case template

```markdown
### {ID}: {Short scenario name}

**Scenario:** One-line description of the behavior under test.

**Preconditions:**
- Required state, data, auth role, or environment

**Steps:**
1. ...
2. ...

**Expected Result:**
- Observable outcome(s)

**Priority:** P0 | P1 | P2 | P3
```

## Coverage mapping

When summarizing coverage, map test cases to areas:

- Functional flows
- Validation rules
- Error handling
- Edge cases
- Permissions
- UI states
- Accessibility

Call out deliberate gaps (out of scope, needs backend, needs design decision, flaky-prone without infrastructure).
