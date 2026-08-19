---
title: App state
category: State Management
description: Inspect this repo, ask every state-management question that is not already proven, then add a store that matches the current stack.
tags: [state-management, zustand, pinia, redux, svelte-store, typescript]
---

Set up shared client state in this repository.

## Process (do not skip)

1. Inspect the repo first. Do not write or edit application code until the user answers your questions and approves a plan.
2. Auto-detect the current tech stack from evidence. Do not assume Zustand, Pinia, or Redux.
3. Report what you found, with the files that prove it.
4. Ask every question below that you cannot prove from the repo. Ask them in **one** message. Do not silently pick defaults.
5. After answers, present a short plan (library, slices, persistence, files). Wait for approval.
6. Implement only what was approved, using this project's existing folders, naming, and file extensions.

If this is not a frontend app, say so and ask whether to continue.

## Inspect (adapt automatically)

Look at package.json and existing store/context/composable files.

Detect and report:

- Language and file extensions
- Framework: React, Next.js, Vue, Nuxt, SvelteKit, or other
- State libraries already installed: Zustand, Pinia, Redux Toolkit, Jotai, Recoil, Valtio, Nanostores, Svelte stores, React Context, or none
- Persistence already used (`persist` middleware, `pinia-plugin-persistedstate`, and so on)
- SSR (Next/Nuxt/SvelteKit) vs client-only
- Package manager

If a store library already exists, extend it. Do not add Zustand next to Redux, or Pinia next to Vuex, unless the user explicitly wants to migrate.

## Questions (ask all that are still unknown)

Ask all of these unless the repo already answers them:

1. Keep the existing store library, or add one? If add: Zustand, Redux Toolkit, Pinia, Svelte stores, Nanostores, Context only, or other? Prefer the usual choice for this framework only after the user confirms.
2. Which slices/modules do you need now: user/session, UI (sidebar, modals, toasts), cart, preferences, other? List them.
3. For each slice, which fields and actions? If you do not know yet, should we scaffold empty typed placeholders?
4. Persistence: none, localStorage, sessionStorage, or cookies? Which fields may persist (never persist secrets unless you explicitly say so)?
5. Devtools: yes or no?
6. SSR hydration concerns: yes (prevent mismatch) or client-only store is fine?
7. Selectors: subscribe to slices/fields to avoid extra re-renders — yes or no?
8. Should auth/session live in this store, or stay in an existing auth library (Clerk, NextAuth, Firebase) as the source of truth?
9. Where should new files live?
10. May we add a package if the chosen library is not installed?
11. Naming: `useXStore`, `useX`, or match existing files?
12. Should we add tests? If yes, which runner is already in the project?

Do not implement until every applicable question is answered and the plan is approved.

## After approval, implement

Match the detected or chosen library:

- Modular slices as agreed, with TypeScript types if the repo uses TypeScript
- Immutable updates and selectors if requested
- Persistence only for the agreed fields
- SSR-safe access if requested
- Barrel export if this repo already uses barrels

## Constraints

- Do not put access tokens in localStorage unless the user explicitly requests it
- Do not duplicate server state that TanStack Query / SWR already owns unless the user wants a copy
- Do not replace an existing store without explicit approval
