---
title: Auth.js
category: Authentication & Security / Authentication
description: Inspect this repo, ask every Auth.js question that is not already proven, then wire Auth.js using this project's stack and env style.
tags: [auth, authjs, nextauth, session, oauth, typescript, security]
---

Set up Auth.js (NextAuth) in this repository using the current stack.

## Process (do not skip)

1. Inspect the repo first. Do not write or edit application code until the user answers your questions and approves a plan.
2. Auto-detect the current tech stack and any existing auth from evidence. Do not assume Next.js, React, or a database.
3. Report what you found, with the files that prove it.
4. Ask every question below that you cannot prove from the repo. Ask them in **one** message. Do not silently pick defaults.
5. After answers, present a short plan (packages, adapter, providers, files, env names, session strategy). Wait for approval.
6. Implement only what was approved, using this project's existing folders, naming, env style, and file extensions.

If this is not a web app that can host an Auth.js handler, say so and ask whether to continue.

## Inspect (adapt automatically)

Look at package.json, lockfiles, framework config, env examples, existing auth or session code, and database setup.

Detect and report:

- Language and file extensions
- Framework: Next.js (App Router or Pages Router), other frameworks Auth.js supports, or something else
- Existing auth: Auth.js/NextAuth, Better Auth, Clerk, Firebase, Supabase, custom JWT, or none
- Database / ORM already in use: Prisma, Drizzle, MongoDB, none
- Env prefix and existing `AUTH_*` / `NEXTAUTH_*` names
- Package manager

Reuse an existing Auth.js config if present. Do not add a second auth system without explicit approval.

## Questions (ask all that are still unknown)

Ask all of these unless the repo already answers them:

1. Keep the existing auth system, replace it, or add Auth.js because there is none?
2. Framework adapter: Next.js App Router, Next.js Pages Router, or another Auth.js integration? If not Next.js, confirm that Auth.js is still the right choice.
3. Session strategy: JWT or database sessions?
4. Database adapter if sessions or OAuth accounts need storage: Prisma, Drizzle, MongoDB, other, or none (JWT only)?
5. Sign-in methods for this setup: credentials (email/password), magic link / email provider, and/or OAuth? Which OAuth providers now (Google, GitHub, Microsoft, Apple, Discord, other), and which later?
6. Callback / redirect URLs and app origin (local and production). Do you already have provider client IDs and secrets, or only placeholders in `.env.example`?
7. Env names: follow Auth.js defaults (`AUTH_SECRET`, `AUTH_URL`, provider keys), or names already in `.env.example`?
8. After login, where should users go? After logout? Guest-only routes?
9. Should we add route protection in this change (middleware / guarded pages), or only Auth.js wiring and leave Protected Routes for a later prompt?
10. Where should new files live (auth config, route handler, types)?
11. May we add `next-auth` / `auth` packages and an adapter if missing? Confirm yes/no.
12. Should we add tests? If yes, which runner is already in the project?

Do not implement until every applicable question is answered and the plan is approved. Do not invent secrets, client IDs, or a second auth vendor.

## After approval, implement

Match the detected framework:

- Auth.js config, route handler, and session helpers this stack expects
- Only the providers and adapter that were requested
- `.env.example` placeholders for `AUTH_SECRET` and each provider (no real secrets)
- TypeScript types if the repo uses TypeScript
- Middleware or guards only if requested

## Constraints

- Do not overwrite existing auth without explicit approval
- Do not add Firestore, Clerk, or another vendor "for convenience"
- Never commit real secrets
- Keep SKILL.md and unrelated files unchanged
