---
title: Auth Guards Setup
category: Security / Routing
description: Universal setup prompt for route protection, authentication context/store, role-based guards, and redirect logic across React, Next.js, Vue, Nuxt, and SvelteKit.
tags: [auth, guard, routing, react, nextjs, vue, nuxt, svelte, middleware, typescript, security]
---

# Universal Auth Guards & Protected Routes Setup Prompt

Use this prompt to set up authentication guards, protected route wrappers, AuthContext/Store, role-based access control (RBAC), and redirect workflows in any frontend repository (React, Next.js, Vite, Vue, Nuxt, SvelteKit).

---

## Copy & Paste Prompt

```text
Set up a complete Authentication Guard & Route Protection system for this repository.

### Framework Auto-Detection & Adaptation
1. Inspect this project's dependencies and structure to auto-detect:
   - Framework & Router: React (Vite / React Router v6/v7), Next.js (App Router `middleware.ts` / Pages Router), Vue 3 (Vite / Vue Router), Nuxt (`middleware/auth.ts`), or SvelteKit (`hooks.server.ts`).
   - File Conventions: `.tsx`, `.ts`, `.vue`, or `.svelte`.
2. Do not invent new routing frameworks — match the exact router and conventions used in this codebase.

### Setup Requirements

1. Auth State Provider / Store:
   - React / Next.js: `AuthContext` + `AuthProvider` + `useAuth()` hook.
   - Vue / Nuxt: Pinia auth store (`useAuthStore()`) or `provide`/`inject`.
   - SvelteKit: Svelte auth store or `locals` session hook.
   - State fields: `user`, `isAuthenticated`, `isLoading`, `error`, plus `login()`, `logout()`, and `refreshSession()` methods.

2. Protected Route Guard:
   - React/Vite: `<ProtectedRoute>` wrapper checking `isAuthenticated` and rendering `<Outlet />` or `children`.
   - Next.js: `middleware.ts` intercepting protected path prefixes (e.g. `/dashboard/*`) + client guard hook.
   - Vue / Nuxt: Router navigation guard (`router.beforeEach`) or Nuxt page middleware (`defineNuxtRouteMiddleware`).
   - Behavior: Show loading fallback while validating auth status. If unauthenticated, redirect to `/login` preserving target return URL.

3. Role-Based Access Control (RBAC):
   - Support role permissions (e.g. `allowedRoles: ['admin', 'manager']`).
   - Redirect to `/403` / `/unauthorized` or render an unauthorized error state if the user lacks permissions.

4. Guest / Public-Only Guard:
   - Prevent logged-in users from accessing `/login`, `/register`, or `/forgot-password`, automatically redirecting them to `/dashboard`.

### Expected Output
- Framework-native Auth Provider / Store file
- Protected Route Guard / Middleware file
- Role-Based Access Guard file
- Guest Route Guard file
- Barrel export file (`index.ts`)
```
