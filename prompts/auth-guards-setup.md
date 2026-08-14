---
title: Auth Guards Setup
category: Security / Routing
description: Quick setup prompt for route protection, authentication context, role-based guards, and redirect logic.
tags: [auth, guard, routing, react-router, nextjs, middleware, typescript, security]
---

# Auth Guards & Protected Routes Setup Prompt

Use this prompt to set up authentication guards, protected route wrappers, AuthContext/Provider, role-based access control (RBAC), and unauthenticated redirect workflows in your repository.

---

## Copy & Paste Prompt

```text
Set up a complete Authentication Guard & Route Protection system in this codebase.

### Project Details
- Framework & Router: <React Router v6/v7 / Next.js App Router / Vue Router>
- Auth Strategy: <JWT / Session Cookie / Firebase Auth / Supabase Auth / OAuth>
- Target Directory: <src/auth or src/components/guards or src/providers>

### Requirements & Best Practices

1. Auth Context & Provider (`AuthContext.tsx` / `AuthProvider.tsx`):
   - Define `User` interface, `AuthState` (user, isAuthenticated, isLoading, error), and `AuthContextValue`.
   - Provide login, logout, and token refresh/session revalidation methods.
   - Support persistent auth state checks on application mount (e.g. token validation or session restoration).

2. Protected Route Guard (`ProtectedRoute` / `AuthGuard`):
   - Wrap protected page components or layout routes.
   - Show a loading spinner / fallback while checking authentication status.
   - If unauthenticated, redirect to `/login` with `from` state parameter (to return to requested page after login).

3. Role-Based Access Control Guard (`RoleGuard` / `RequireRole`):
   - Support role authorization checks (e.g. `allowedRoles={['admin', 'manager']}`).
   - Show a `403 Forbidden` / `Unauthorized` page or redirect to `/unauthorized` if user lacks required role.

4. Public-Only Guard (`GuestGuard` / `PublicOnlyRoute`):
   - Prevent authenticated users from visiting `/login`, `/register`, or `/forgot-password`, automatically redirecting them to `/dashboard`.

5. Type Safety & Exports:
   - Export convenient hooks (e.g. `useAuth()`, `useUser()`).
   - Include inline JSDoc comments explaining guard usage with example code snippets.

### Expected Files Output
- `AuthProvider.tsx` (Context, State, and custom `useAuth()` hook)
- `ProtectedRoute.tsx` (Authentication route wrapper)
- `RoleGuard.tsx` (Role-based access guard wrapper)
- `GuestGuard.tsx` (Public-only route wrapper)
- `index.ts` barrel export file
```
