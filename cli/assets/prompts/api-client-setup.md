---
title: API client
category: Networking
description: Inspect this repo, ask every HTTP-client question that is not already proven, then add a shared API client that matches the current stack.
tags: [api-client, http, interceptors, typescript]
---

Set up a shared HTTP API client in this repository.

## Process (do not skip)

1. Inspect the repo first. Do not write or edit application code until the user answers your questions and approves a plan.
2. Auto-detect the current tech stack from evidence. Do not assume Axios, fetch, or any env variable name.
3. Report what you found, with the files that prove it.
4. Ask every question below that you cannot prove from the repo. Ask them in **one** message. Do not silently pick defaults.
5. After answers, present a short plan (library, env name, auth behavior, files). Wait for approval.
6. Implement only what was approved, using this project's existing folders, naming, and file extensions.

If this is not a frontend app, say so and ask whether to continue.

## Inspect (adapt automatically)

Look at package.json, env examples, existing `fetch`/Axios/`$fetch`/ky usage, and auth token storage.

Detect and report:

- Language and file extensions
- Framework and env prefix (`VITE_`, `NEXT_PUBLIC_`, `NUXT_PUBLIC_`, SvelteKit `$env`, or other)
- HTTP tools already installed: Axios, ky, ofetch, `$fetch`, native fetch, GraphQL client, tRPC, or none
- How auth tokens are stored today (cookie, localStorage, memory, none)
- Existing API base URL env vars
- Package manager

Prefer the HTTP library already in the project. Do not add Axios on top of a working `$fetch`/ky/fetch wrapper unless the user asks to replace it.

## Questions (ask all that are still unknown)

Ask all of these unless the repo already answers them:

1. Which client: keep the existing one, native `fetch`, Axios, ofetch/`$fetch`, ky, or other?
2. What is the backend base URL env variable name, and is there a different URL for local vs production?
3. Timeout in milliseconds? (Ask; do not assume 15000.)
4. Default headers besides JSON: any API key header, locale header, or custom headers?
5. Authentication: none, Bearer access token, cookie session sent automatically, or both?
6. Where is the access token read from: memory, localStorage, cookie, or an existing auth store/hook?
7. 401 handling: do nothing, redirect to login, or refresh-token flow? If refresh, what is the exact refresh URL and does the refresh token live in an httpOnly cookie or in JS?
8. Should failed requests during refresh wait in a queue and retry once?
9. What does a backend error body look like (`message`, `code`, `errors[]`, or paste an example)?
10. Typed helpers: `get/post/put/patch/delete` wrappers, or only the raw client instance?
11. Request cancellation / AbortSignal support: yes or no?
12. Retries for GET on network failure: yes (how many) or no?
13. Where should new files live?
14. May we add a package if the chosen client is not installed?
15. Should we add tests? If yes, which runner is already in the project?

Do not implement until every applicable question is answered and the plan is approved.

## After approval, implement

Match the detected stack:

- Client instance with agreed `baseURL`, timeout, and headers
- Auth injection only if requested
- 401 / refresh behavior only if requested
- Normalized error type matching the agreed backend shape
- Typed HTTP helpers if requested
- `.env.example` placeholder for the base URL if that file exists or the user asked for it

## Constraints

- Do not invent backend URLs or token keys
- Do not log tokens
- Do not replace an existing API module without explicit approval
