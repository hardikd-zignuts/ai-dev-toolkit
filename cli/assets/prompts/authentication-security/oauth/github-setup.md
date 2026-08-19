---
title: GitHub OAuth
category: Authentication & Security / OAuth Providers
description: Inspect this repo, ask every GitHub OAuth question that is not already proven, then attach GitHub sign-in to the existing auth layer.
tags: [auth, oauth, github, typescript, security]
---

Add GitHub as an OAuth sign-in provider in this repository.

GitHub OAuth is an **add-on**. Attach it to the auth layer already in the project. Do not invent a new auth stack unless the user chooses one first.

## Process (do not skip)

1. Inspect the repo first. Do not write or edit application code until the user answers your questions and approves a plan.
2. Auto-detect the current auth layer and stack from evidence. Do not assume Next.js or a provider.
3. Report what you found, with the files that prove it.
4. Ask every question below that you cannot prove from the repo. Ask them in **one** message. Do not silently pick defaults.
5. After answers, present a short plan (auth layer, OAuth App vs GitHub App, env names, scopes, files). Wait for approval.
6. Implement only what was approved, using this project's existing auth config, folders, and file extensions.

If there is no auth layer, stop after questions: ask which vendor to set up first and do not implement GitHub until that exists or is approved in the same plan.

## Inspect (adapt automatically)

Look at package.json, env examples, auth config, and existing OAuth providers.

Detect and report:

- Language, framework, and file extensions
- Auth layer already in use (and config file paths)
- Existing GitHub OAuth wiring
- Env prefix and any `GITHUB_*` / `AUTH_GITHUB_*` names
- Package manager

Reuse the existing auth config. Do not add a second GitHub client or a second auth vendor.

## Questions (ask all that are still unknown)

Ask all of these unless the repo already answers them:

1. Which auth layer should GitHub attach to: existing one we detected, Auth.js, Better Auth, Firebase Auth, Supabase Auth, Clerk, or other? If none exists, which vendor should we set up first?
2. GitHub OAuth App or GitHub App? Is the app already created? Confirm callback URLs for local and production.
3. Sign-in only, or also account linking when the same email already exists?
4. Scopes now: `read:user` + `user:email`, or extras (`repo`, `read:org`, gist, other)? List extras. Prefer the minimum.
5. Organization access: any org, specific orgs, or none?
6. Allow users with private emails (need `user:email`)? Confirm.
7. Env names: follow this auth library's defaults, or names already in `.env.example`?
8. Should GitHub be the only social button on login, or sit next to existing providers?
9. Where should config changes live?
10. May we add a dependency if this auth layer needs a GitHub plugin? Confirm yes/no.
11. Should we add tests? If yes, which runner is already in the project?

Do not implement until every applicable question is answered and the plan is approved. Do not invent GitHub client IDs or secrets.

## After approval, implement

- Register GitHub on the chosen auth layer only
- Callback URLs and env placeholders in `.env.example`
- Requested scopes only
- TypeScript types if the repo uses TypeScript

## Constraints

- Never commit real secrets
- Do not add a new auth vendor unless the user approved it in this plan
- Do not request `repo` or org-admin scopes unless requested
- Keep SKILL.md and unrelated files unchanged
