---
title: Firebase Setup
category: Backend / BaaS
description: Quick setup prompt for Firebase SDK (Auth, Firestore, Storage) with env variable validation and typed helper hooks.
tags: [firebase, auth, firestore, storage, baas, typescript, env-validation]
---

# Firebase Setup & Best Practices Prompt

Use this prompt to set up Firebase (Authentication, Firestore Database, Cloud Storage) in a frontend repository with environment variable validation, singleton app initialization, and React/Vue typed hooks.

---

## Copy & Paste Prompt

```text
Set up Firebase SDK (Authentication, Firestore, Cloud Storage) in this codebase with best practices.

### Project Details
- Framework: <React / Next.js / Vite / Vue>
- Firebase Features Needed: <Auth (Email/Password + Google OAuth), Firestore DB, Storage>
- Target Directory: <src/lib/firebase or src/services/firebase>

### Requirements & Best Practices

1. Environment Variable Validation (`config.ts`):
   - Define expected environment variables (`VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, etc. / `NEXT_PUBLIC_*`).
   - Validate presence of required env variables on startup, throwing a descriptive error if missing.

2. Firebase Singleton Initialization (`firebase.ts`):
   - Initialize Firebase App using `getApps().length ? getApp() : initializeApp(config)`.
   - Export typed instances for `auth` (`getAuth()`), `db` (`getFirestore()`), and `storage` (`getStorage()`).
   - Enable Firestore local persistence / offline caching if enabled.

3. Auth Service & Hooks (`services/authService.ts`, `useFirebaseAuth.ts`):
   - Methods for Email/Password Signup & Login, Google Popup Sign-in, Password Reset, and Logout.
   - React/Vue hook listening to `onAuthStateChanged`, providing `user`, `loading`, and `error` state.

4. Firestore Helpers & Converter (`services/firestore.ts`):
   - Generic Firestore data converter for type-safe collection queries (`withConverter<T>`).
   - Helper methods for `getDocument`, `getCollection`, `addDocument`, `updateDocument`, and `deleteDocument`.

### Expected Files Output
- `config.ts` (Env variable validation & config schema)
- `firebase.ts` (Singleton app & service initialization)
- `authService.ts` (Authentication methods & Google OAuth helper)
- `useFirebaseAuth.ts` (React/Vue authentication state listener hook)
- `firestoreHelpers.ts` (Type-safe Firestore database utilities)
```
