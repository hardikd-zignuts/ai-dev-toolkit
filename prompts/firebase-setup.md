---
title: Firebase
category: Backend / BaaS
description: Inspect this repo, ask every Firebase question that is not already proven, then wire Firebase using this project's env and framework patterns.
tags: [firebase, auth, firestore, storage, typescript]
---

Set up Firebase in this repository using the current stack.

## Process (do not skip)

1. Inspect the repo first. Do not write or edit application code until the user answers your questions and approves a plan.
2. Auto-detect the current tech stack and any existing Firebase setup from evidence. Do not assume env variable names or products.
3. Report what you found, with the files that prove it.
4. Ask every question below that you cannot prove from the repo. Ask them in **one** message. Do not silently pick defaults.
5. After answers, present a short plan (products to enable, files, env names, auth methods). Wait for approval.
6. Implement only what was approved, using this project's existing folders, env style, and file extensions.

If this is not a frontend app, say so and ask whether to continue.

## Inspect (adapt automatically)

Look at package.json, env examples (`.env.example`, `.env.local`), `firebase.json`, existing Firebase files, and framework env docs.

Detect and report:

- Language and file extensions
- Framework and how public env vars are exposed: `import.meta.env.VITE_*`, `process.env.NEXT_PUBLIC_*`, Nuxt `runtimeConfig.public`, SvelteKit `$env/static/public`, or other
- Whether `firebase` / `firebase-admin` is already installed
- Existing Firebase app init, emulators, or hosting config
- Auth/session code that would conflict
- Package manager

Reuse an existing Firebase app singleton. Do not initialize a second app.

## Questions (ask all that are still unknown)

Ask all of these unless the repo already answers them:

1. Which Firebase products: Auth, Firestore, Realtime Database, Storage, Cloud Functions client, Analytics, Cloud Messaging, App Check? Pick only what you need.
2. Auth methods: email/password, Google popup, GitHub, Apple, phone, magic link, anonymous, other? Which ones now?
3. Is this a new Firebase project or an existing one? If existing, do you already have the web config values?
4. Env variable names: follow the framework prefix we detected, or do you have names already in `.env.example`?
5. Should missing env vars throw at startup, or only warn in development?
6. Firestore, Realtime Database, or both? Any collection names to type on day one?
7. Storage: yes or no? Any path prefix (for example `uploads/`)?
8. Use local emulators in development: yes or no? If yes, which emulators?
9. Auth persistence: local, session, none, or framework default?
10. Should we add an auth state hook/composable/store (`user`, `loading`, `error`) wired to `onAuthStateChanged`?
11. Client SDK only, or also Admin SDK (server routes / Cloud Functions)? Admin SDK needs a different credential story — confirm before adding.
12. Where should new files live?
13. May we add the `firebase` package if it is missing? Confirm yes/no.
14. Security rules and `firebase.json`: generate starter files, skip, or you will manage them in the Firebase console only?
15. Should we add tests? If yes, which runner is already in the project?

Do not implement until every applicable question is answered and the plan is approved. Do not invent API keys or project IDs.

## After approval, implement

Match the detected env prefix and framework:

- Validated config (no secrets in source control)
- Singleton app init (`getApps()` / `getApp()` pattern)
- Only the products that were requested
- Auth methods and reactive auth listener if requested
- Typed Firestore helpers if Firestore was requested
- `.env.example` entries for every public config key (placeholders, not real secrets)

## Constraints

- Never commit real API keys
- Do not enable Analytics or Messaging unless requested
- Do not replace existing Firebase init without explicit approval
