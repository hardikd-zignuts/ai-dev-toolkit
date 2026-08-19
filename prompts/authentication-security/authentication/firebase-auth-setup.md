---
title: Firebase Authentication
category: Authentication & Security / Authentication
description: Inspect this repo, ask every Firebase Auth question that is not already proven, then wire Firebase Authentication using this project's env and framework patterns.
tags: [auth, firebase, firebase-auth, session, typescript, security]
---

Set up Firebase Authentication in this repository using the current stack.

This prompt is **auth-only**. Do not add Firestore, Realtime Database, Storage, Analytics, or Cloud Messaging unless the user explicitly asks. If they need those products, point them at the full Firebase setup prompt after auth is approved.

## Process (do not skip)

1. Inspect the repo first. Do not write or edit application code until the user answers your questions and approves a plan.
2. Auto-detect the current tech stack and any existing Firebase or auth setup from evidence. Do not assume env variable names or auth methods.
3. Report what you found, with the files that prove it.
4. Ask every question below that you cannot prove from the repo. Ask them in **one** message. Do not silently pick defaults.
5. After answers, present a short plan (auth methods, files, env names, persistence). Wait for approval.
6. Implement only what was approved, using this project's existing folders, env style, and file extensions.

If this is not a frontend or full-stack app, say so and ask whether to continue.

## Inspect (adapt automatically)

Look at package.json, env examples, `firebase.json`, existing Firebase init, and other auth libraries.

Detect and report:

- Language and file extensions
- Framework and how public env vars are exposed (`VITE_*`, `NEXT_PUBLIC_*`, Nuxt `runtimeConfig.public`, SvelteKit `$env/static/public`, or other)
- Whether `firebase` / `firebase-admin` is already installed and whether an app singleton already exists
- Existing auth: Firebase Auth, Auth.js, Clerk, Supabase, custom JWT, or none
- Package manager

Reuse an existing Firebase app (`getApps()` / `getApp()`). Do not initialize a second app. Do not add a second auth system without explicit approval.

## Questions (ask all that are still unknown)

Ask all of these unless the repo already answers them:

1. Keep the existing auth system, replace it, or add Firebase Auth because there is none?
2. Is this a new Firebase project or an existing one? If existing, do you already have the web config values?
3. Auth methods now: email/password, Google, GitHub, Apple, Microsoft, phone, magic link, anonymous, other? Which ones now vs later?
4. Auth persistence: local, session, none, or framework default?
5. Client SDK only, or also Admin SDK (server routes / Cloud Functions)? Admin SDK needs a different credential story — confirm before adding.
6. Use Auth emulator in development: yes or no?
7. Should we add an auth state hook/composable/store (`user`, `loading`, `error`) wired to `onAuthStateChanged`?
8. App Check: skip, or set up now? If now, which provider?
9. Env variable names: follow the framework prefix we detected, or names already in `.env.example`?
10. Should missing env vars throw at startup, or only warn in development?
11. Login/register UI: create pages, or only the auth client around pages you already have?
12. Should we add route protection in this change, or leave Protected Routes for later?
13. Where should new files live?
14. May we add the `firebase` package if it is missing? Confirm yes/no.
15. Should we add tests? If yes, which runner is already in the project?

Do not implement until every applicable question is answered and the plan is approved. Do not invent API keys or project IDs.

## After approval, implement

Match the detected env prefix and framework:

- Validated public config (no secrets in source control)
- Singleton app init; Auth only unless other products were explicitly approved
- Requested sign-in methods and reactive auth listener if requested
- `.env.example` entries for every public config key (placeholders, not real secrets)
- TypeScript types if the repo uses TypeScript

## Constraints

- Never commit real API keys
- Do not add Firestore, Storage, Analytics, or Messaging unless requested
- Do not replace existing Firebase init or another auth vendor without explicit approval
- Keep SKILL.md and unrelated files unchanged
