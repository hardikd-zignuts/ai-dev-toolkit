---
name: api-integration
description: Implements and maintains frontend API integrations by detecting and following the target project's existing service layer, HTTP client, auth, error handling, and state patterns. Use when wiring UI to backend endpoints, adding or updating API calls, integrating new endpoints, or when the user mentions API integration, data fetching, service layer, or backend communication.
---

# API Integration

Implement and maintain frontend API integrations while adapting completely to the existing project's architecture and conventions.

This skill MUST NOT assume any specific framework, HTTP client, state-management library, API library, or backend technology.

Do not hardcode:

- React
- Next.js
- Axios
- Fetch
- React Query
- Redux
- Zustand
- GraphQL
- REST
- Any other specific technology

Detect the project's actual implementation first.

The project being worked on is always the source of truth.

Behave like a senior engineer integrating an API inside an unfamiliar existing codebase.

## Workflow

### Phase 1: Inspect the repository

Before implementing an API integration, inspect:

- Existing API/service layer
- HTTP client
- Request patterns
- Response patterns
- Authentication
- Authorization
- Error handling
- Loading states
- Empty states
- Data transformation
- State management
- Caching
- Retry behavior
- Existing types/interfaces
- Existing utilities
- Existing API hooks/helpers

**How to inspect:**

1. Locate the API/service layer (search for `api`, `services`, `client`, `http`, `fetch`, hooks, stores).
2. Read representative existing integrations that match the requested operation (list, detail, create, update, delete).
3. Identify the HTTP client wrapper, base URL config, and request/response interceptors.
4. Trace authentication: token storage, header injection, refresh flows, cookie handling.
5. Note error handling: global handlers, toast/alert patterns, typed error shapes, status-code mapping.
6. Note state patterns: where loading/success/empty/error states live (hooks, stores, components).
7. Find existing types/interfaces for requests, responses, pagination, and errors.
8. Document findings briefly before writing code.

For a detailed inspection checklist, see [reference.md](reference.md).

### Phase 2: Understand the API contract

Before implementation, understand the API contract from available documentation, types, examples, or existing code.

Review:

- Request parameters
- Request body
- Headers
- Authentication
- Response types
- Error responses
- Pagination
- Filtering
- Sorting
- Search
- Uploads/downloads
- Optimistic updates
- Caching
- Retry behavior

Only implement relevant concerns for the specific integration.

If the API contract is unclear or contradictory, ask targeted questions rather than guessing.

### Phase 3: Plan the integration

1. Map the new endpoint to the closest existing integration pattern.
2. Identify types to reuse vs extend vs create.
3. Determine where loading, empty, and error states should surface.
4. If implementing the integration requires introducing a new architectural pattern or dependency, **stop and ask for human confirmation** before proceeding.

### Phase 4: Implement

Follow the existing implementation patterns.

Integrate the API using the project's established infrastructure — do not invent a parallel approach.

### Phase 5: Validate

After implementation, validate:

- Successful response
- Loading state
- Empty response
- API error
- Invalid data
- Authentication failure where applicable

Run the project's linter/type-check on changed files. Run existing tests when present.

## Core rules

- Reuse existing API infrastructure.
- Reuse existing types and utilities.
- Do not create duplicate API clients.
- Do not introduce a new API library unnecessarily.
- Do not duplicate request logic.
- Do not change unrelated API integrations.
- Preserve existing authentication behavior.
- Handle loading, success, empty, and error states.
- Handle API failures gracefully.
- Validate assumptions about request/response structures.
- Keep UI and API responsibilities appropriately separated according to the existing architecture.

The goal is clean integration into the existing application, not creation of a new API architecture.

## Implementation guidelines

### Service layer

- Add new endpoints alongside existing ones in the established service/module location.
- Match naming, export style, and function signatures used by sibling integrations.
- Use the project's HTTP client — never instantiate a second client.

### Types

- Extend or compose existing request/response types when possible.
- Place types where the project already keeps them (shared types folder, co-located with service, generated schema).
- Do not redefine types that already exist under a different name.

### State and UI wiring

- Follow existing patterns for hooks, stores, or direct service calls.
- Surface loading, empty, and error states using conventions already present on similar screens.
- Keep request logic in the service/API layer; keep presentation logic in UI components unless the project co-locates them.

### Concern selection

Implement only what the integration requires:

| Concern | Implement when |
|---------|----------------|
| Pagination | List endpoints return paginated data |
| Filtering/sorting/search | Endpoint supports query params for these |
| Uploads/downloads | Binary or multipart payloads involved |
| Optimistic updates | Existing screens use this pattern for mutations |
| Caching/retry | Project already caches or retries similar calls |
| Auth refresh | Existing flows handle token expiry for comparable calls |

### Scope control

- Change only files required for the requested integration.
- Do not refactor adjacent API code unless it blocks the integration.
- Do not upgrade dependencies or restructure folders without confirmation.

## Human gate

Stop and ask for confirmation before:

- Adding a new HTTP client or API library dependency
- Introducing a new service-layer architecture (e.g., first GraphQL layer in a REST-only project)
- Creating a duplicate client, hook factory, or request wrapper
- Changing global auth, interceptors, or error-handling behavior
- Modifying unrelated integrations or shared infrastructure beyond the requested endpoint

## Validation steps

1. Verify a successful response renders or stores data correctly.
2. Confirm loading indicators appear during in-flight requests.
3. Confirm empty states when the response is legitimately empty.
4. Confirm error states for API failures and malformed responses.
5. Confirm auth failures follow existing logout/redirect/retry behavior.
6. Run linter and type-check on changed files.
7. Run existing tests; add tests only if the project convention expects them for API changes.

## Final response format

Every completed API integration task must end with this structure:

```markdown
## Analysis

Existing API architecture and patterns identified.

## Implementation

What was integrated.

## Files Changed

Relevant files.

## API Behavior

Request/response and state handling.

## Validation

Tests/checks performed.

## Remaining Concerns

Anything requiring backend clarification or human confirmation.
```

## Additional resources

- For a detailed pre-implementation inspection checklist, see [reference.md](reference.md)
