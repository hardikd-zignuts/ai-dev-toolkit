---
title: RBAC
category: Authentication & Security / Authorization
description: Inspect this repo, ask every roles-and-permissions question that is not already proven, then add RBAC that matches the current auth layer and stack.
tags: [auth, rbac, authorization, roles, permissions, typescript, security]
---

Set up role-based access control (RBAC) in this repository.

RBAC is **authorization** (what a signed-in user may do). Login and route guards are **authentication**. Reuse the existing auth layer. Do not add a new auth vendor. If the user only needs "must be logged in", point them at the Protected Routes prompt.

## Process (do not skip)

1. Inspect the repo first. Do not write or edit application code until the user answers your questions and approves a plan.
2. Auto-detect the current auth layer, session shape, and any existing roles from evidence. Do not assume Clerk organizations or a roles table.
3. Report what you found, with the files that prove it.
4. Ask every question below that you cannot prove from the repo. Ask them in **one** message. Do not silently pick defaults.
5. After answers, present a short plan (role source, role names, server vs UI checks, files). Wait for approval.
6. Implement only what was approved, using this project's existing auth, folders, naming, and file extensions.

If there is no auth layer, say so: RBAC needs a signed-in user. Ask which auth vendor to set up first, or whether to stop.

## Inspect (adapt automatically)

Look at package.json, auth config, session/JWT callbacks, database schema, and existing admin routes.

Detect and report:

- Language, framework, router, and file extensions
- Auth layer: Auth.js, Better Auth, Clerk, Firebase, Supabase, custom JWT, or none
- Where identity already lives (session, JWT claims, user table, Clerk public metadata)
- Existing role, permission, or org code
- UI library (for hiding actions vs showing 403)
- Package manager

Reuse existing session and user types. Do not invent a second user model.

## Questions (ask all that are still unknown)

Ask all of these unless the repo already answers them:

1. Keep any existing roles, replace them, or add RBAC because there is none?
2. Model: roles only (`admin`, `editor`, `viewer`), permissions only, or roles that map to permissions?
3. List the roles (and permissions if used) for this setup. What is the default role for a new user?
4. Where should roles live: JWT / session claim, database column or join table, Clerk metadata / orgs, Supabase `app_metadata`, Firebase custom claims, or other?
5. Who can assign roles: a seed script, an admin UI, Clerk dashboard, SQL, or you will manage them outside this change?
6. Unauthorized destination: `/403` page, home, login, or an inline message on the same page?
7. Enforcement: server/middleware only, UI hide/disable only, or both? (UI-only is not security.)
8. Which routes, layouts, or API handlers need which roles? List path prefixes and APIs.
9. Relation to Protected Routes: assume login is already required, or also add unauthenticated redirects in this change?
10. Where should new files live (helpers, types, middleware, 403 page)?
11. May we add a dependency if this stack has no RBAC helper? Confirm yes/no. Prefer small helpers over a new library.
12. Should we add tests? If yes, which runner is already in the project?

Do not implement until every applicable question is answered and the plan is approved. Do not invent roles the user did not list.

## After approval, implement

Match the detected auth layer and framework:

- Typed roles/permissions and a single `can` / `hasRole` helper
- Server or middleware checks on the agreed routes and APIs
- UI hiding only if requested, always backed by server checks when APIs exist
- 403 (or agreed) handling
- TypeScript types if the repo uses TypeScript

## Constraints

- Do not add a second auth system
- Do not treat client-side hiding as the only control
- Do not overwrite existing auth without explicit approval
- Keep SKILL.md and unrelated files unchanged
