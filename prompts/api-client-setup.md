---
title: API Client Setup
category: Networking
description: Quick setup prompt for Axios or Fetch API Client with request/response interceptors, Bearer token injection, refresh token rotation, and global error handling.
tags: [api-client, axios, fetch, interceptors, jwt, refresh-token, typescript, error-handling]
---

# API Client & Interceptors Setup Prompt

Use this prompt to set up a production-ready HTTP API Client (Axios or Fetch wrapper) with automatic JWT Bearer token injection, transparent refresh token rotation, request cancellation, and standardized error handling.

---

## Copy & Paste Prompt

```text
Set up a robust API Client with request/response interceptors and token refresh logic in this repository.

### Project Details
- HTTP Library: <Axios / Native Fetch wrapper>
- Base URL & Env: <VITE_API_BASE_URL / NEXT_PUBLIC_API_URL>
- Token Storage: <HttpOnly Cookie / LocalStorage / Memory + Refresh Cookie>
- Target Directory: <src/lib/api or src/services/api>

### Requirements & Best Practices

1. Client Instance & Base Config (`apiClient.ts`):
   - Create Axios instance / Fetch wrapper configured with `baseURL`, `timeout` (e.g. 15000ms), and default headers (`Content-Type: application/json`).

2. Request Interceptor:
   - Inject Authorization Bearer header (`Authorization: Bearer <token>`) automatically if token exists.
   - Attach unique Request ID or language headers if required.

3. Response Interceptor & Token Refresh (`interceptors/authInterceptor.ts`):
   - Catch `401 Unauthorized` responses automatically.
   - Implement queue mechanism to pause pending failed requests while refreshing the access token (`POST /auth/refresh`).
   - If token refresh succeeds, retry failed queued requests with the new token.
   - If token refresh fails, clear auth state and redirect to `/login`.

4. Error Normalization (`apiError.ts`):
   - Define custom `ApiError` class with properties `status`, `code`, `message`, and `validationErrors`.
   - Normalize network errors, timeouts, 4xx client errors, and 5xx server errors into consistent `ApiError` objects.

5. Type-Safe Helper Methods (`http.ts`):
   - Export strongly-typed HTTP methods (`http.get<T>`, `http.post<T>`, `http.put<T>`, `http.delete<T>`).

### Expected Files Output
- `apiClient.ts` (Axios / Fetch client instance & config)
- `apiError.ts` (Standardized ApiError class & error parser)
- `authInterceptor.ts` (Automatic token injection & 401 refresh token queue)
- `http.ts` (Strongly typed helper methods)
```
