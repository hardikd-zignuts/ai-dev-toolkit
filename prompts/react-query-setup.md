---
title: React Query Setup
category: Data Fetching
description: Quick setup prompt for TanStack (React) Query provider, QueryClient defaults, Devtools, and Query Key Factory pattern.
tags: [react-query, tanstack-query, data-fetching, cache, query-client, devtools, typescript]
---

# React Query (TanStack Query) Setup Prompt

Use this prompt to set up TanStack Query (React Query v5) with production-ready defaults, global error handling, Devtools, hydration/SSR support, and a type-safe Query Key Factory pattern.

---

## Copy & Paste Prompt

```text
Set up TanStack Query (React Query v5) boilerplate and query key factory in this project.

### Project Details
- Framework: <React / Next.js / Vite>
- Query Version: TanStack Query v5 (`@tanstack/react-query`)
- Target Directory: <src/lib/react-query or src/providers>

### Requirements & Best Practices

1. QueryClient Configuration (`queryClient.ts`):
   - Set optimal default options for queries (`staleTime: 5 * 60 * 1000`, `gcTime: 10 * 60 * 1000`, `refetchOnWindowFocus: false`, `retry: 1`).
   - Set default mutation error handling (e.g. global error logger or toast notification hook integration).

2. React Query Provider Component (`QueryProvider.tsx`):
   - Wrap application children with `QueryClientProvider`.
   - Render `@tanstack/react-query-devtools` in development mode (`process.env.NODE_ENV === 'development'`).

3. Type-Safe Query Key Factory (`queryKeys.ts`):
   - Implement the Query Key Factory pattern to manage query keys centrally and prevent key collision/typos.
   - Example scope structures for `users`, `posts`, `settings` (lists, detail views, filtered queries).

4. Custom Helper Hooks (`useCustomQuery.ts` / `useCustomMutation.ts`):
   - Provide clean custom wrappers or utility patterns for boilerplate API query hooks.

### Expected Files Output
- `queryClient.ts` (Configured QueryClient instance with production defaults)
- `QueryProvider.tsx` (Provider component + Devtools integration)
- `queryKeys.ts` (Type-safe Query Key Factory)
- Example usage file showing a custom query hook (`useFetchUser.ts`)
```
