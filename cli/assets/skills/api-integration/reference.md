# API Integration — Repository Inspection Reference

Use this checklist during Phase 1. Read only the sections relevant to the task.

## Project identity

| Signal | Where to look |
|--------|---------------|
| Language | File extensions, `tsconfig`, `jsconfig`, etc. |
| Package manager | Lock files: `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, `bun.lockb` |
| Environment config | `.env*`, config modules, runtime env injection |

## API layer location

Search for directories and files named:

```
api/ | apis/ | services/ | service/ | client/ | http/ | requests/
lib/api | utils/api | shared/api | core/network
```

Also search imports: `@/api`, `@/services`, `useQuery`, `useMutation`, store slices with async thunks.

## HTTP client

Identify ONE primary client and stay within it:

| Pattern | Signals |
|---------|---------|
| Wrapped fetch | `fetch(`, custom `request()`, `httpClient`, `apiClient` |
| Library client | axios/fetch wrapper imports, configured instance with interceptors |
| Generated client | OpenAPI/Swagger codegen, tRPC, GraphQL codegen output |
| Framework data layer | Server actions, route handlers, loader/action patterns |

Note:

- Base URL source (env var name, config key)
- Default headers (Content-Type, Accept, custom headers)
- Request/response interceptors or middleware
- Timeout and abort/cancellation patterns
- Serialization (JSON, form-data, query-string builders)

## Authentication and authorization

| Concern | Where to look |
|---------|---------------|
| Token storage | localStorage, sessionStorage, cookies, secure storage helpers |
| Header injection | Authorization bearer, API keys, custom auth headers |
| Refresh flow | 401 handlers, refresh endpoints, retry-after-refresh |
| Route guards | Protected routes, role checks before fetch |
| Credentials mode | `credentials: 'include'`, cookie-based sessions |

Preserve existing behavior — do not change auth strategy for one integration.

## Request patterns

Study 2–3 existing integrations similar to the requested operation:

- Function vs class vs hook vs store action
- URL construction (path params, query strings, body shape)
- HTTP method conventions
- Idempotency keys, request IDs, correlation headers
- File upload patterns (multipart, presigned URLs, chunked)

## Response patterns

Note:

- Envelope shape (`{ data, error }`, raw payload, nested `result`)
- Success status codes handled
- Pagination shape (cursor, offset/limit, page number, links)
- List vs detail response differences
- Date/enum/nullable field normalization
- Mapping layer between API DTO and UI model

## Error handling

| Layer | Signals |
|-------|---------|
| Global | Interceptors, error boundaries, global toast handlers |
| Service | try/catch, Result types, thrown typed errors |
| UI | Inline errors, retry buttons, fallback components |

Document:

- Error type/interface shape
- Status-code mapping (401, 403, 404, 422, 500)
- Validation error field mapping
- User-facing vs log-only messages

## State management

Identify how data reaches the UI:

| Pattern | Signals |
|---------|---------|
| Custom hooks | `useXxx`, `useFetch`, data hooks wrapping services |
| Query libraries | Query/mutation hooks, cache keys, stale time |
| Global store | Redux slices, Zustand stores, Pinia modules, signals |
| Local component state | useState/useReducer with useEffect fetch |
| Server-side | SSR loaders, RSC fetch, getServerSideProps patterns |

Match the dominant pattern for comparable features.

## Loading, empty, and success states

Find conventions on existing data-driven screens:

- Skeleton vs spinner vs shimmer
- Empty list placeholders and copy
- Optimistic UI for mutations
- Disabled buttons during submission
- Refetch/invalidate after mutation

## Caching and retry

Only adopt if the project already uses them:

- Cache keys and invalidation rules
- Stale-while-revalidate, background refetch
- Retry count, backoff, retryable status codes
- Deduping concurrent identical requests

## Types and contracts

| Source | Where to look |
|--------|---------------|
| Hand-written | `types/`, `interfaces/`, co-located `.types.ts` |
| Generated | OpenAPI/GraphQL/schema output folders |
| Inline | JSDoc, PropTypes, Zod/Yup schemas |
| Backend docs | README, Swagger UI URL, Postman collections in repo |

Cross-check types against live examples in existing integrations before assuming shape.

## Utilities to reuse

Search before creating new helpers:

```
buildQueryString | serializeParams | parseError | normalizeResponse
getAuthHeaders | handleApiError | createApiClient | withAuth
paginate | flattenPages | mapDtoToModel
```

## When to ask for confirmation

Stop and ask before:

- Adding a new npm/package dependency for HTTP or state
- Introducing the project's first instance of a pattern (e.g., first mutation hook, first GraphQL query)
- Creating a parallel API module that duplicates an existing client
- Changing shared interceptors, auth flow, or global error handling
- Guessing request/response fields not documented anywhere
- Backend contract changes required to complete the integration

## Validation matrix

After implementation, verify each applicable row:

| Scenario | Expected behavior |
|----------|-------------------|
| Success | Data displayed or stored per existing pattern |
| Loading | Loading indicator/state matches sibling features |
| Empty | Empty state shown when response has no items |
| API error | User-friendly error; no unhandled rejection |
| Invalid data | Graceful fallback or error; no crash |
| Auth failure | Existing logout/redirect/re-auth behavior |
