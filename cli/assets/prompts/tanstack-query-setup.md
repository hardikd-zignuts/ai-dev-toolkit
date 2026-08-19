---
title: Data fetching
category: Data Fetching
description: Inspect this repo, ask every data-fetching question that is not already proven, then add caching that matches the current stack.
tags: [data-fetching, tanstack-query, cache, typescript]
---

Set up shared data fetching (load, cache, refetch) in this repository.

## Process (do not skip)

1. Inspect the repo first. Do not write or edit application code until the user answers your questions and approves a plan.
2. Auto-detect the current tech stack from evidence. Do not assume React Query or any package.
3. Report what you found, with the files that prove it.
4. Ask every question below that you cannot prove from the repo. Ask them in **one** message. Do not silently pick defaults.
5. After answers, present a short plan (library, files, defaults, example hook). Wait for approval.
6. Implement only what was approved, using this project's existing folders, naming, and file extensions.

If this is not a frontend app, say so and ask whether to continue.

## Inspect (adapt automatically)

Look at package.json, framework config, existing fetch/API/query code, and SSR setup.

Detect and report:

- Language and file extensions
- Framework: React, Next.js, Vue, Nuxt, SvelteKit, or other
- Data libraries already installed: TanStack Query, SWR, Apollo, RTK Query, VueUse, tRPC, custom fetch wrappers, or none
- HTTP client already in the project
- SSR/hydration: App Router, Nuxt, SvelteKit, or client-only SPA
- Toast/error UI already used
- Package manager

If a data library already exists, prefer extending it. Do not add TanStack Query on top of SWR/Apollo/RTK Query unless the user explicitly wants to replace it.

## Questions (ask all that are still unknown)

Ask all of these unless the repo already answers them:

1. Keep the existing data library, add TanStack Query, or replace the current one? If TanStack Query, which package matches this framework (`@tanstack/react-query`, `vue-query`, `svelte-query`, or other)?
2. Client-only, or SSR with hydration (Next.js `HydrationBoundary`, Nuxt plugin, SvelteKit layout)?
3. Defaults you want, or use these only after you confirm them: `staleTime` (for example 5 minutes), `gcTime` (for example 10 minutes), `refetchOnWindowFocus` (on/off), `retry` count?
4. Install and show Devtools in development only: yes or no?
5. How should query/mutation errors surface: existing toast, console, error boundary, or a callback you specify?
6. Do you want a central query-key factory? If yes, which domains (for example `users`, `posts`, `settings`)?
7. Should we generate one example query hook/composable against a real endpoint in this repo? If yes, which endpoint and type?
8. Should mutations invalidate specific keys automatically?
9. Where should new files live?
10. May we add npm packages? If the chosen library is not installed, confirm the exact packages and versions range (current major, for example v5).
11. Should we add tests? If yes, which runner is already in the project?

Do not implement until every applicable question is answered and the plan is approved.

## After approval, implement

Match the detected framework package:

- Query client with the agreed defaults
- Provider or plugin wired into the real app entry/layout
- Devtools only if requested, development-only
- Query key factory if requested
- One example hook/composable if requested
- Global error handling wired to the agreed UI

## Constraints

- Do not add a second data-fetching library without explicit approval
- Do not change API URLs or auth headers except to reuse the existing HTTP client
- Follow this repo's hook/composable naming
