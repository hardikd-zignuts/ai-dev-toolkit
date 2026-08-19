---
title: Better Auth
category: Authentication & Security / Authentication
description: Inspect this repo, ask every Better Auth question that is not already proven, then wire Better Auth using this project's stack and env style.
tags: [auth, better-auth, session, oauth, typescript, security]
---

Set up Better Auth in this repository using the current stack.

## Process (do not skip)

1. Inspect the repo first. Do not write or edit application code until the user answers your questions and approves a plan.
2. Auto-detect the current tech stack and any existing auth from evidence. Do not assume Next.js, a database, or plugins.
3. Report what you found, with the files that prove it.
4. Ask every question below that you cannot prove from the repo. Ask them in **one** message. Do not silently pick defaults.
5. After answers, present a short plan (packages, database plugin, auth methods, files, env names). Wait for approval.
6. Implement only what was approved, using this project's existing folders, naming, env style, and file extensions.

If this is not a web app that can host a Better Auth handler, say so and ask whether to continue.

## Inspect (adapt automatically)

Look at package.json, lockfiles, framework config, env examples, existing auth, and database / ORM files.

Detect and report:

- Language and file extensions
- Framework and how API routes / server handlers work here
- Existing auth: Better Auth, Auth.js, Clerk, Firebase, Supabase, custom JWT, or none
- Database and ORM: Prisma, Drizzle, Kysely, other, or none
- Existing `BETTER_AUTH_*` env names and base URL
- Package manager

Reuse an existing Better Auth instance if present. Do not add a second auth system without explicit approval.

## Questions (ask all that are still unknown)

Ask all of these unless the repo already answers them:

1. Keep the existing auth system, replace it, or add Better Auth because there is none?
2. Base URL and trusted origins for local and production. Confirm the values.
3. Database + ORM plugin: Prisma, Drizzle, Kysely, other, or you will add a DB in this change? Which database URL env name already exists?
4. Sign-in methods now: email/password, magic link / email OTP, username, and/or OAuth? Which OAuth providers now vs later?
5. Plugins for this setup: two-factor, organizations, passkeys, username, admin, other, or none yet?
6. Framework helpers: which Better Auth client / server integration matches this repo (Next.js, Nuxt, SvelteKit, Expo, other)?
7. Env names: follow Better Auth defaults, or names already in `.env.example`?
8. After login / logout destinations? Guest-only routes?
9. Should we add route protection in this change, or only Better Auth wiring and leave Protected Routes for later?
10. Where should new files live (server auth, client, schema/migrations)?
11. May we add `better-auth` and related packages if missing? Confirm yes/no.
12. Should we add tests? If yes, which runner is already in the project?

Do not implement until every applicable question is answered and the plan is approved. Do not invent secrets or a second auth vendor.

## After approval, implement

Match the detected framework:

- Better Auth server instance, handler, and client helpers this stack expects
- Database schema / migrations only if a DB plugin was approved
- Only plugins and providers that were requested
- `.env.example` placeholders (no real secrets)
- TypeScript types if the repo uses TypeScript
- Middleware or guards only if requested

## Constraints

- Do not overwrite existing auth without explicit approval
- Do not enable organization, 2FA, or passkey plugins unless requested
- Never commit real secrets
- Keep SKILL.md and unrelated files unchanged
