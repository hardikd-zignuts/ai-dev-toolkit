---
title: API Client Setup
category: Networking
description: Universal setup prompt for Axios or Fetch API Client with request/response interceptors, Bearer token injection, refresh token rotation, and error parsing across React, Next.js, Vue, Nuxt, and Svelte.
tags: [api-client, axios, fetch, interceptors, jwt, refresh-token, react, nextjs, vue, nuxt, svelte, typescript]
---

# Universal API Client & Interceptors Setup Prompt

Use this prompt to set up a production-ready HTTP API Client (Axios or Fetch wrapper) with automatic JWT Bearer token injection, transparent refresh token rotation, request cancellation, and standardized error parsing across React, Next.js, Vue 3, Nuxt, or SvelteKit projects.

---

## Copy & Paste Prompt

```text
Set up a robust HTTP API Client with request/response interceptors and token refresh logic for this repository.

### Framework Auto-Detection & Adaptation
1. Inspect this project's dependencies and structure to auto-detect:
   - Preferred HTTP Tool: Axios (if installed) or native `fetch` / Ofetch / `$fetch` (Nuxt).
   - Environment Base URL Variable: `VITE_API_BASE_URL`, `NEXT_PUBLIC_API_URL`, or `NUXT_PUBLIC_API_BASE`.
2. Adapt code generation and file structure (.ts) to match this project's stack.

### Setup Requirements

1. Client Instance & Configuration (`apiClient.ts`):
   - Create client instance configured with `baseURL`, `timeout` (15000ms), and default `Content-Type: application/json` headers.

2. Request Interceptor:
   - Auto-inject Authorization Bearer token header (`Authorization: Bearer <token>`) when token exists in storage/cookie.

3. Response Interceptor & Token Refresh (`authInterceptor.ts`):
   - Intercept `401 Unauthorized` responses.
   - Implement a queue mechanism to pause pending failed requests while requesting a new access token via `/auth/refresh`.
   - On successful refresh, retry all queued failed requests with the new access token.
   - On failed refresh, clear stored auth tokens and dispatch an unauthenticated event or redirect to `/login`.

4. Standardized Error Handling (`apiError.ts`):
   - Create custom `ApiError` class with `status`, `code`, `message`, and `validationErrors` attributes.
   - Normalize network timeouts, client errors (4xx), and server errors (5xx) into consistent `ApiError` objects.

5. Strongly Typed HTTP Utility Methods (`http.ts`):
   - Export type-safe HTTP helpers: `http.get<T>`, `http.post<T>`, `http.put<T>`, `http.patch<T>`, `http.delete<T>`.

### Expected Output
- API client instance configuration file (`apiClient.ts`)
- ApiError class & error parser file (`apiError.ts`)
- Token injection & 401 refresh token interceptor file (`authInterceptor.ts`)
- Typed HTTP wrapper functions file (`http.ts`)
```
