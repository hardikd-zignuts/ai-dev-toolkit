---
title: Protected Routes
category: Authentication & Security / Authorization
description: Inspect this repo, ask every auth and routing question that is not already proven, then add login protection that matches the current stack.
tags: [auth, guard, routing, middleware, typescript, security]
---

Set up protected and guest-only routes in this repository.

## Process (do not skip)

1. Inspect the repo first. Do not write or edit application code until the user answers your questions and approves a plan.
2. Auto-detect the current tech stack from evidence. Do not assume React, Next.js, Vue, or any library.
3. Report what you found, with the files that prove it.
4. Ask every question below that you cannot prove from the repo. Ask them in **one** message. Do not silently pick defaults.
5. After answers, present a short plan (files to add or change, libraries to use or install, route behavior). Wait for approval.
6. Implement only what was approved, using this project's existing folders, naming, and file extensions.

If this is not a frontend app, say so and ask whether to continue.

## Inspect (adapt automatically)

Look at package.json, lockfiles, tsconfig, framework config, router files, env examples, and existing auth or session code.

Detect and report:

- Language: TypeScript or JavaScript, and file extensions in use
- Framework: React, Next.js (App Router or Pages Router), Vite, Vue, Nuxt, SvelteKit, Remix, or other
- Router: React Router, Next.js routing, Vue Router, Nuxt middleware, SvelteKit hooks, or other
- Auth that already exists: NextAuth/Auth.js, Clerk, Firebase Auth, Supabase, custom JWT, cookies, or none
- Session storage already used: httpOnly cookie, localStorage, memory, or server session
- UI library and styling already used
- Existing login, register, dashboard, or middleware files
- Package manager: npm, pnpm, or yarn

Reuse what already exists. Do not add a second auth system or a second router.

## Questions (ask all that are still unknown)

Ask all of these unless the repo already answers them:

1. Which auth system should we use or keep: existing one, custom email/password, Firebase, Auth.js/NextAuth, Clerk, Supabase, or other?
2. Where should the session live: httpOnly cookie, localStorage, memory, or server session?
3. Which routes must require login? List path prefixes (for example `/dashboard`, `/settings`, `/admin`).
4. Which routes are guest-only (logged-in users should be sent away)? For example `/login`, `/register`, `/forgot-password`.
5. After login, where should users go? After logout, where should they go?
6. Should the original URL be remembered and restored after login?
7. Do we need roles or permissions (for example `admin`, `manager`)? If yes, what are the roles, and where is an unauthorized user sent (`/403`, home, or a message on the same page)?
8. What should unauthenticated users see while auth status is loading: spinner, blank page, or existing loading UI?
9. Should we create login/register pages, or only the guards around pages you already have?
10. Token refresh: none, existing endpoint, or new `/auth/refresh` flow?
11. SSR/middleware vs client-only guards: follow the framework default, or do you want both?
12. Where should new files live (folder path)?
13. May we add a new dependency if this stack has no auth helper yet? If no, we must use what is already installed.
14. Should we add tests? If yes, which test runner is already in the project?

Do not implement until every applicable question is answered and the plan is approved.

## After approval, implement

Match the detected framework and router:

- Auth state: `user`, `isAuthenticated`, `isLoading`, `error`, plus `login`, `logout`, and `refreshSession` if refresh was requested
- Protected routes: send unauthenticated users to the agreed login path, with return URL if requested
- Guest routes: send authenticated users to the agreed post-login path
- Roles: only if requested
- Loading fallback while auth is unknown
- TypeScript types if the repo uses TypeScript

## Constraints

- Do not invent a new router, UI kit, or auth vendor if one is already in the project
- Do not overwrite existing auth without explicit approval
- Keep SKILL.md and unrelated files unchanged
