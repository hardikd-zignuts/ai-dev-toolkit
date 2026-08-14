---
title: Firebase Setup
category: Backend / BaaS
description: Universal setup prompt for Firebase SDK (Auth, Firestore, Storage) with env variable validation, singleton init, and typed hooks/composables across React, Next.js, Vue, Nuxt, and Svelte.
tags: [firebase, auth, firestore, storage, baas, react, nextjs, vue, nuxt, svelte, typescript, env-validation]
---

# Universal Firebase Setup & Best Practices Prompt

Use this prompt to set up Firebase (Authentication, Firestore Database, Cloud Storage) in any frontend repository (React, Next.js, Vite, Vue 3, Nuxt, SvelteKit) with environment variable validation, singleton app initialization, and typed framework hooks/composables.

---

## Copy & Paste Prompt

```text
Set up Firebase SDK (Authentication, Firestore, Cloud Storage) in this codebase with best practices.

### Framework Auto-Detection & Adaptation
1. Inspect this project's dependencies and structure to auto-detect:
   - Framework & Env Prefix:
     - Vite (React/Vue/Svelte): `import.meta.env.VITE_FIREBASE_*`
     - Next.js: `process.env.NEXT_PUBLIC_FIREBASE_*`
     - Nuxt 3: `useRuntimeConfig().public.firebase*`
     - SvelteKit: `$env/static/public`
   - State & Reactive Patterns: React hooks (`useFirebaseAuth`), Vue composables (`useFirebaseAuth`), or Svelte stores.
2. Adapt all code generation and file extensions (.ts, .tsx, .vue, .svelte) to match this project.

### Setup Requirements

1. Environment Variable Validation (`config.ts`):
   - Validate presence of required environment variables (`API_KEY`, `AUTH_DOMAIN`, `PROJECT_ID`, `STORAGE_BUCKET`, `MESSAGING_SENDER_ID`, `APP_ID`).
   - Throw a descriptive error at startup if any required environment variable is missing.

2. Firebase Singleton Initialization (`firebase.ts`):
   - Initialize Firebase App using `getApps().length ? getApp() : initializeApp(config)`.
   - Export typed instances for `auth` (`getAuth()`), `db` (`getFirestore()`), and `storage` (`getStorage()`).

3. Auth Service & Hooks / Composables:
   - Auth methods: Email/Password Signup & Login, Google OAuth Popup Sign-in, Password Reset, and Logout.
   - Reactive Auth Listener: React hook / Vue composable / Svelte store subscribing to `onAuthStateChanged`, returning `{ user, loading, error }`.

4. Type-Safe Firestore Helpers (`firestore.ts`):
   - Generic Firestore data converter (`withConverter<T>`) for strongly-typed collection queries.
   - Helper functions for `getDocument<T>`, `getCollection<T>`, `addDocument<T>`, `updateDocument<T>`, and `deleteDocument`.

### Expected Output
- Environment variable validation & config file (`config.ts`)
- Firebase singleton initialization file (`firebase.ts`)
- Auth service methods file (`authService.ts`)
- Framework-native Auth state listener hook / composable (`useFirebaseAuth.ts` / `.vue`)
- Type-safe Firestore database utilities file (`firestoreHelpers.ts`)
```
