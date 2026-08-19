---
title: Apple OAuth
category: Authentication & Security / OAuth Providers
description: Inspect this repo, ask every Sign in with Apple question that is not already proven, then attach Apple sign-in to the existing auth layer.
tags: [auth, oauth, apple, sign-in-with-apple, typescript, security]
---

Add Sign in with Apple as an OAuth sign-in provider in this repository.

Apple OAuth is an **add-on**. Attach it to the auth layer already in the project. Do not invent a new auth stack unless the user chooses one first.

## Process (do not skip)

1. Inspect the repo first. Do not write or edit application code until the user answers your questions and approves a plan.
2. Auto-detect the current auth layer and stack from evidence. Do not assume Next.js or native vs web.
3. Report what you found, with the files that prove it.
4. Ask every question below that you cannot prove from the repo. Ask them in **one** message. Do not silently pick defaults.
5. After answers, present a short plan (auth layer, Services ID vs native, secret handling, files). Wait for approval.
6. Implement only what was approved, using this project's existing auth config, folders, and file extensions.

If there is no auth layer, stop after questions: ask which vendor to set up first and do not implement Apple until that exists or is approved in the same plan.

## Inspect (adapt automatically)

Look at package.json, env examples, auth config, and existing OAuth providers.

Detect and report:

- Language, framework, and file extensions (web vs React Native / Expo)
- Auth layer already in use (and config file paths)
- Existing Apple sign-in wiring
- Env prefix and any `APPLE_*` / `AUTH_APPLE_*` names
- Package manager

Reuse the existing auth config. Do not add a second Apple client or a second auth vendor.

## Questions (ask all that are still unknown)

Ask all of these unless the repo already answers them:

1. Which auth layer should Apple attach to: existing one we detected, Auth.js, Better Auth, Firebase Auth, Supabase Auth, Clerk, or other? If none exists, which vendor should we set up first?
2. Platform: web (Services ID), iOS/Android native, or both?
3. Is an Apple Developer identifier already created (App ID, Services ID, key)? Confirm callback URLs / return URLs for local and production.
4. Client secret: generate a JWT from the Apple key at runtime, rotate a stored secret, or placeholders only until you supply values?
5. Sign-in only, or also account linking? Apple may send a private relay email (Hide My Email) — how should we store and match accounts?
6. Requested claims: name and email on first sign-in only (Apple's default). Confirm we will persist name/email on first callback.
7. Env names: follow this auth library's defaults, or names already in `.env.example`?
8. Should Apple be the only social button on login, or sit next to existing providers?
9. Where should config changes live?
10. May we add a dependency if this auth layer needs an Apple plugin? Confirm yes/no.
11. Should we add tests? If yes, which runner is already in the project?

Do not implement until every applicable question is answered and the plan is approved. Do not invent Team IDs, key IDs, or `.p8` key material.

## After approval, implement

- Register Apple on the chosen auth layer only
- Env placeholders in `.env.example` (never commit `.p8` keys)
- Handle Hide My Email / first-login name persistence as approved
- TypeScript types if the repo uses TypeScript

## Constraints

- Never commit Apple private keys or real secrets
- Do not add a new auth vendor unless the user approved it in this plan
- Do not assume email is stable; Apple relay addresses can change pairing rules
- Keep SKILL.md and unrelated files unchanged
