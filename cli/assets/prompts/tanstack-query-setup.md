---
title: TanStack Query Setup
category: Data Fetching
description: Universal setup prompt for TanStack (React / Vue / Svelte) Query client defaults, Provider, Devtools, and Query Key Factory pattern across React, Next.js, Vue, Nuxt, and Svelte.
tags: [tanstack-query, react-query, vue-query, svelte-query, data-fetching, cache, query-client, devtools, typescript]
---

# Universal TanStack Query Setup Prompt

Use this prompt to set up TanStack Query (v5) with production-ready defaults, global error handling, Devtools, hydration/SSR boundaries, and a type-safe Query Key Factory pattern across React, Next.js, Vue, Nuxt, or Svelte projects.

---

## Copy & Paste Prompt

```text
Set up TanStack Query (v5) client, provider, devtools, and query key factory in this repository.

### Framework Auto-Detection & Adaptation
1. Inspect this project's dependencies and structure to auto-detect:
   - Target Query Package:
     - React / Next.js / Vite: `@tanstack/react-query` + `@tanstack/react-query-devtools`
     - Vue 3 / Vite / Nuxt: `@tanstack/vue-query` + `@tanstack/vue-query-devtools` (or Vue Query plugin `VueQueryPlugin`)
     - Svelte / SvelteKit: `@tanstack/svelte-query`
   - SSR / Hydration Requirements: Next.js App Router (`HydrationBoundary`), Nuxt 3 SSR, or client-side SPA.
2. Adapt all code generation and file extensions (.ts, .tsx, .vue, .svelte) to match this project's framework.

### Setup Requirements

1. QueryClient Configuration:
   - Set production default options: `staleTime: 5 * 60 * 1000` (5 mins), `gcTime: 10 * 60 * 1000` (10 mins), `refetchOnWindowFocus: false`, `retry: 1`.
   - Set global mutation error handling (e.g. log errors or trigger toast notification hook).

2. Query Provider & Devtools Component / Plugin:
   - React / Next.js: `QueryProvider` component wrapping `QueryClientProvider` + Devtools component.
   - Vue / Nuxt: Vue plugin setup `app.use(VueQueryPlugin, config)` + Devtools component.
   - Svelte: `QueryClientProvider` wrapper in `+layout.svelte`.
   - Ensure Devtools are conditionally rendered only in development mode.

3. Type-Safe Query Key Factory (`queryKeys.ts`):
   - Implement the Query Key Factory pattern to manage query keys centrally and prevent typos.
   - Example key structure for domains (`users`, `posts`, `settings`) supporting lists, item details, and filtered queries.

4. Example Custom Query Hook / Composables:
   - React / Next.js: `useUserQuery(userId)` hook wrapping `useQuery`.
   - Vue / Nuxt: `useUserQuery(userId)` composable wrapping `useQuery`.
   - Svelte: `createUserQuery(userId)` wrapper using Svelte Query.

### Expected Output
- QueryClient configuration file (`queryClient.ts`)
- Query Provider component / Vue plugin file
- Type-safe Query Key Factory file (`queryKeys.ts`)
- Example query hook / composable file
```
