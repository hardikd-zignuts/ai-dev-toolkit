---
name: frontend-test-case-generator
description: Analyzes frontend functionality and generates comprehensive, practical test cases based on actual application behavior, adapting to the project's existing testing strategy. Use when generating test cases, test plans, or test coverage for UI components, pages, features, or user flows; when the user asks for frontend tests, QA scenarios, or testing strategy; or when preparing tests before or after implementation.
---

# Frontend Test Case Generator

Analyze frontend functionality and generate comprehensive, practical test cases based on the actual application behavior.

This skill MUST NOT be hardcoded to any specific testing technology.

Do not assume Jest, Vitest, Cypress, Playwright, React Testing Library, or any other testing framework.

This skill must adapt to the project's existing testing strategy.

The project being worked on is always the source of truth.

Behave like a senior QA engineer and frontend developer designing tests inside an unfamiliar existing codebase.

## Core principles

- Follow existing testing conventions.
- Prioritize behavior over implementation details.
- Prefer stable tests that validate user-visible behavior and important business logic.
- Do not generate meaningless tests simply to increase test count.
- Test what matters for correctness, regressions, and user impact.
- Do not modify code or add dependencies unless explicitly asked.

## Workflow

### Phase 1: Inspect the repository

Before generating test cases, inspect the existing repository and understand:

- Existing test files
- Testing framework
- Test structure
- Naming conventions
- Mocking approach
- Fixtures
- Test utilities
- Authentication setup
- API mocking
- Existing test patterns
- CI/testing configuration

**How to inspect:**

1. Read project config files (package manifests, test runner config, CI workflow files).
2. Locate test directories and read representative examples at unit, integration, and E2E levels.
3. Identify how tests are named, organized, and executed (scripts, CI jobs, coverage gates).
4. Find shared test utilities, custom matchers, render helpers, and fixture locations.
5. Note auth setup: login helpers, session mocks, role fixtures, protected-route patterns.
6. Note API mocking: MSW, interceptors, stub servers, fixture JSON, nock, or manual mocks.
7. Document findings briefly before generating test cases.

For a detailed inspection checklist, see [reference.md](reference.md).

### Phase 2: Analyze the target

Identify what to test:

| Input | How to gather |
|-------|---------------|
| Component | Source file, props/API, states, user interactions, a11y requirements |
| Page/screen | Route, layout, data dependencies, navigation, loading/error/empty states |
| Feature/flow | Entry points, steps, validations, side effects, permissions, edge cases |
| Changed code | Diff, related tests, impacted user journeys |

Read the implementation and any related specs, types, API contracts, or design docs. Trace user-visible behavior and business rules — not internal implementation details unless the project already tests at that level.

### Phase 3: Generate test cases

Analyze the requested feature/component/functionality and generate tests covering relevant scenarios.

Consider:

#### Functional

- Happy path
- Alternative flows
- User interactions
- State transitions

#### Validation

- Required fields
- Invalid values
- Boundary values
- Incorrect formats
- Missing values

#### Error handling

- API failures
- Network failures
- Server errors
- Invalid responses
- Unexpected states

#### Edge cases

- Empty data
- Large data
- Long text
- Missing fields
- Duplicate data
- Boundary conditions

#### Permissions

- Authentication
- Authorization
- Different user roles
- Restricted actions

#### UI

- Loading
- Empty
- Error
- Disabled
- Success
- Modal/dialog behavior
- Navigation
- Responsive behavior when relevant

#### Accessibility

When relevant, test keyboard navigation, labels, focus behavior, accessible states, and semantic behavior.

Apply only categories relevant to the target. Skip categories that do not apply.

Prioritize scenarios that protect critical paths, prevent regressions, and reflect real user behavior.

### Phase 4: Align output with project conventions

**If the project has an existing testing framework**, generate tests using it — matching file location, naming, structure, imports, mocking style, and assertion patterns found in Phase 1.

**If no testing framework exists**, do not silently introduce one. Explain the recommended approach and trigger the human gate before adding dependencies/configuration.

When the user asks for executable test code, produce it only after Phase 1 confirms the framework and conventions, or after explicit approval to introduce testing infrastructure.

## Human gate

Stop and ask for confirmation before:

- Adding a testing framework or new test dependencies
- Creating test config files or CI changes
- Introducing a new testing pattern that conflicts with existing conventions
- Writing tests that require secrets, production credentials, or destructive setup

## Test case ID format

Use stable, readable IDs: `{AREA}-{NNN}` (e.g., `LOGIN-001`, `CHECKOUT-012`). Match project conventions if a different format already exists.

## Priority levels

| Priority | Meaning |
|----------|---------|
| P0 | Critical path; must pass before release |
| P1 | Important behavior; high regression risk |
| P2 | Secondary flows, edge cases, or polish |
| P3 | Nice-to-have; low risk if omitted initially |

## Final response format

Every completed test generation task must end with this structure:

```markdown
## Test Strategy

What should be tested and why.

## Test Cases

For each:

- ID
- Scenario
- Preconditions
- Steps
- Expected Result
- Priority

## Coverage

Mention which areas are covered.

## Missing Information

Identify assumptions or missing requirements.

## Recommended Additional Tests

Only if genuinely useful.
```

When the user also requests executable tests, add after the above:

```markdown
## Generated Tests

Framework and conventions followed.

## Files

Paths for new or updated test files.

## How to Run

Commands from the project's existing test scripts.
```

## Additional resources

- For repository inspection signals and scenario guidance, see [reference.md](reference.md)
