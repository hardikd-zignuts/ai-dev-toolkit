---
title: Microsoft OAuth
category: Authentication & Security / OAuth Providers
description: Inspect this repo, ask every Microsoft / Entra ID OAuth question that is not already proven, then attach Microsoft sign-in to the existing auth layer.
tags: [auth, oauth, microsoft, entra, azure-ad, typescript, security]
---

Add Microsoft (Entra ID / Azure AD / personal Microsoft accounts) as an OAuth sign-in provider in this repository.

Microsoft OAuth is an **add-on**. Attach it to the auth layer already in the project. Do not invent a new auth stack unless the user chooses one first.

## Process (do not skip)

1. Inspect the repo first. Do not write or edit application code until the user answers your questions and approves a plan.
2. Auto-detect the current auth layer and stack from evidence. Do not assume Next.js or a tenant type.
3. Report what you found, with the files that prove it.
4. Ask every question below that you cannot prove from the repo. Ask them in **one** message. Do not silently pick defaults.
5. After answers, present a short plan (auth layer, tenant, env names, scopes, files). Wait for approval.
6. Implement only what was approved, using this project's existing auth config, folders, and file extensions.

If there is no auth layer, stop after questions: ask which vendor to set up first and do not implement Microsoft until that exists or is approved in the same plan.

## Inspect (adapt automatically)

Look at package.json, env examples, auth config, and existing OAuth providers.

Detect and report:

- Language, framework, and file extensions
- Auth layer already in use (and config file paths)
- Existing Microsoft / Azure AD / Entra wiring
- Env prefix and any `MICROSOFT_*` / `AZURE_*` / `AUTH_MICROSOFT_*` names
- Package manager

Reuse the existing auth config. Do not add a second Microsoft client or a second auth vendor.

## Questions (ask all that are still unknown)

Ask all of these unless the repo already answers them:

1. Which auth layer should Microsoft attach to: existing one we detected, Auth.js, Better Auth, Firebase Auth, Supabase Auth, Clerk, or other? If none exists, which vendor should we set up first?
2. Entra tenant: `common` (work + personal), `organizations` (work/school only), `consumers` (personal only), or a specific tenant ID?
3. Is an Entra app registration already created? Confirm redirect URIs for local and production, and whether this is a single-tenant or multi-tenant app.
4. Sign-in only, or also account linking when the same email already exists?
5. Scopes now: `openid email profile` / `User.Read`, or extras (Microsoft Graph, Calendars, Mail, other)? List extras. Prefer the minimum.
6. Env names: follow this auth library's defaults (client ID, secret, tenant), or names already in `.env.example`?
7. Should Microsoft be the only social button on login, or sit next to existing providers?
8. Where should config changes live?
9. May we add a dependency if this auth layer needs a Microsoft plugin? Confirm yes/no.
10. Should we add tests? If yes, which runner is already in the project?

Do not implement until every applicable question is answered and the plan is approved. Do not invent client IDs, secrets, or tenant IDs.

## After approval, implement

- Register Microsoft on the chosen auth layer only, with the approved tenant authority
- Callback URLs and env placeholders in `.env.example`
- Requested scopes only
- TypeScript types if the repo uses TypeScript

## Constraints

- Never commit real secrets
- Do not add a new auth vendor unless the user approved it in this plan
- Do not request Graph Mail/Calendar scopes unless requested
- Keep SKILL.md and unrelated files unchanged
