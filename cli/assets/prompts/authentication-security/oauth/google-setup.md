---
title: Google OAuth
category: Authentication & Security / OAuth Providers
description: Inspect this repo, ask every Google OAuth question that is not already proven, then attach Google sign-in to the existing auth layer.
tags: [auth, oauth, google, typescript, security]
---

Add Google as an OAuth sign-in provider in this repository.

Google OAuth is an **add-on**. Attach it to the auth layer already in the project (Auth.js, Better Auth, Firebase Auth, Supabase Auth, Clerk, or other). Do not invent a new auth stack unless the user chooses one first.

## Process (do not skip)

1. Inspect the repo first. Do not write or edit application code until the user answers your questions and approves a plan.
2. Auto-detect the current auth layer and stack from evidence. Do not assume Next.js or a provider.
3. Report what you found, with the files that prove it.
4. Ask every question below that you cannot prove from the repo. Ask them in **one** message. Do not silently pick defaults.
5. After answers, present a short plan (auth layer, env names, callback URLs, scopes, files). Wait for approval.
6. Implement only what was approved, using this project's existing auth config, folders, and file extensions.

If there is no auth layer, stop after questions: ask which vendor to set up first (Auth.js, Better Auth, Firebase Auth, Supabase Auth, Clerk, other) and do not implement Google until that exists or is approved in the same plan.

## Inspect (adapt automatically)

Look at package.json, env examples, auth config, and existing OAuth providers.

Detect and report:

- Language, framework, and file extensions
- Auth layer already in use (and config file paths)
- Existing Google (or other) OAuth wiring
- Env prefix and any `GOOGLE_*` / `AUTH_GOOGLE_*` names
- Package manager

Reuse the existing auth config. Do not add a second Google client or a second auth vendor.

## Questions (ask all that are still unknown)

Ask all of these unless the repo already answers them:

1. Which auth layer should Google attach to: existing one we detected, Auth.js, Better Auth, Firebase Auth, Supabase Auth, Clerk, or other? If none exists, which vendor should we set up first?
2. Is a Google Cloud OAuth client already created? Confirm redirect/callback URLs for local and production.
3. Sign-in only, or also account linking when the same email already exists?
4. Scopes now: `openid email profile` only, or extra Google APIs (Calendar, Drive, Gmail, other)? List extras.
5. Restrict to a Google Workspace hosted domain (`hd`)? If yes, which domain?
6. Google One Tap / FedCM: skip, or add if this stack supports it?
7. Env names: follow this auth library's defaults, or names already in `.env.example`?
8. Should Google be the only social button on login, or sit next to existing providers?
9. Where should config changes live (existing auth file vs new helper)?
10. May we add a dependency if this auth layer needs a Google plugin? Confirm yes/no.
11. Should we add tests? If yes, which runner is already in the project?

Do not implement until every applicable question is answered and the plan is approved. Do not invent Google client IDs or secrets.

## After approval, implement

- Register Google on the chosen auth layer only
- Callback URLs and env placeholders documented in `.env.example`
- Requested scopes only
- TypeScript types if the repo uses TypeScript

## Constraints

- Never commit real secrets
- Do not add a new auth vendor unless the user approved it in this plan
- Do not enable extra Google APIs unless requested
- Keep SKILL.md and unrelated files unchanged
