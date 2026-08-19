---
title: Clerk
category: Authentication & Security / Authentication
description: Inspect this repo, ask every Clerk question that is not already proven, then wire Clerk using this project's stack and env style.
tags: [auth, clerk, session, oauth, typescript, security]
---

Set up Clerk authentication in this repository using the current stack.

## Process (do not skip)

1. Inspect the repo first. Do not write or edit application code until the user answers your questions and approves a plan.
2. Auto-detect the current tech stack and any existing auth from evidence. Do not assume Next.js or Clerk components.
3. Report what you found, with the files that prove it.
4. Ask every question below that you cannot prove from the repo. Ask them in **one** message. Do not silently pick defaults.
5. After answers, present a short plan (SDK, middleware, UI approach, files, env names). Wait for approval.
6. Implement only what was approved, using this project's existing folders, env style, and file extensions.

If this is not a web app Clerk supports, say so and ask whether to continue.

## Inspect (adapt automatically)

Look at package.json, lockfiles, framework config, env examples, middleware, and existing auth.

Detect and report:

- Language and file extensions
- Framework: Next.js (App or Pages Router), Remix, Expo, other
- Existing auth: Clerk, Auth.js, Better Auth, Firebase, Supabase, custom JWT, or none
- Existing theme / UI kit (Clerk appearance should follow it if we use hosted components)
- Env names already used (`NEXT_PUBLIC_CLERK_*`, `CLERK_*`, or other)
- Package manager

Reuse existing Clerk providers if present. Do not add a second auth system without explicit approval.

## Questions (ask all that are still unknown)

Ask all of these unless the repo already answers them:

1. Keep the existing auth system, replace it, or add Clerk because there is none?
2. Do you already have a Clerk application (publishable and secret keys), or only placeholders?
3. Env names: follow Clerk + this framework's public prefix, or names already in `.env.example`?
4. UI: Clerk hosted components (`SignIn`, `SignUp`, `UserButton`), custom forms on the Clerk SDK, or a mix?
5. Sign-in methods Clerk should enable in this app: email/password, magic link, passkeys, and/or social (Google, GitHub, Microsoft, Apple, Discord, other)? Which now vs later?
6. Middleware / `clerkMiddleware` (or this framework's equivalent): protect routes now, or only wrap the app with Clerk and leave Protected Routes for later?
7. Which routes must require login? Which are public? After sign-in / sign-up redirects?
8. Organizations / B2B: skip, or set up now (roles come later via the RBAC prompt unless you need org switcher UI now)?
9. Appearance: match the existing theme, Clerk default, or skip styling?
10. Where should new files live (provider, middleware, sign-in pages)?
11. May we add `@clerk/*` packages for this framework if missing? Confirm yes/no.
12. Should we add tests? If yes, which runner is already in the project?

Do not implement until every applicable question is answered and the plan is approved. Do not invent Clerk keys.

## After approval, implement

Match the detected framework:

- Clerk provider / loaders this SDK expects
- Sign-in and sign-up UI as requested
- Middleware or route protection only if requested
- `.env.example` placeholders for publishable and secret keys (secret never in client bundles)
- TypeScript types if the repo uses TypeScript

## Constraints

- Never commit real secrets
- Do not add Auth.js or Firebase "alongside" Clerk unless explicitly approved
- Do not overwrite existing auth without explicit approval
- Keep SKILL.md and unrelated files unchanged
