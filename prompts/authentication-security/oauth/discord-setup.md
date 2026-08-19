---
title: Discord OAuth
category: Authentication & Security / OAuth Providers
description: Inspect this repo, ask every Discord OAuth question that is not already proven, then attach Discord sign-in to the existing auth layer.
tags: [auth, oauth, discord, typescript, security]
---

Add Discord as an OAuth sign-in provider in this repository.

Discord OAuth is an **add-on**. Attach it to the auth layer already in the project. Do not invent a new auth stack unless the user chooses one first.

## Process (do not skip)

1. Inspect the repo first. Do not write or edit application code until the user answers your questions and approves a plan.
2. Auto-detect the current auth layer and stack from evidence. Do not assume Next.js or bot vs user OAuth.
3. Report what you found, with the files that prove it.
4. Ask every question below that you cannot prove from the repo. Ask them in **one** message. Do not silently pick defaults.
5. After answers, present a short plan (auth layer, scopes, env names, files). Wait for approval.
6. Implement only what was approved, using this project's existing auth config, folders, and file extensions.

If there is no auth layer, stop after questions: ask which vendor to set up first and do not implement Discord until that exists or is approved in the same plan.

## Inspect (adapt automatically)

Look at package.json, env examples, auth config, and existing OAuth providers.

Detect and report:

- Language, framework, and file extensions
- Auth layer already in use (and config file paths)
- Existing Discord OAuth or bot token usage
- Env prefix and any `DISCORD_*` / `AUTH_DISCORD_*` names
- Package manager

Reuse the existing auth config. Do not add a second Discord client or a second auth vendor. Do not add a Discord bot unless requested.

## Questions (ask all that are still unknown)

Ask all of these unless the repo already answers them:

1. Which auth layer should Discord attach to: existing one we detected, Auth.js, Better Auth, Firebase Auth, Supabase Auth, Clerk, or other? If none exists, which vendor should we set up first?
2. User login (OAuth2) only, or also a bot? This prompt defaults to user login unless you ask for a bot.
3. Is a Discord application already created? Confirm redirect URLs for local and production.
4. Sign-in only, or also account linking when the same email already exists?
5. Scopes now: `identify` and `email`, or extras (`guilds`, `guilds.join`, `connections`, other)? List extras. Prefer the minimum.
6. Restrict sign-in to members of specific guilds? If yes, which guild IDs, and what happens if the user is not a member?
7. Env names: follow this auth library's defaults, or names already in `.env.example`?
8. Should Discord be the only social button on login, or sit next to existing providers?
9. Where should config changes live?
10. May we add a dependency if this auth layer needs a Discord plugin? Confirm yes/no.
11. Should we add tests? If yes, which runner is already in the project?

Do not implement until every applicable question is answered and the plan is approved. Do not invent Discord client IDs, secrets, or bot tokens.

## After approval, implement

- Register Discord on the chosen auth layer only
- Callback URLs and env placeholders in `.env.example`
- Requested scopes only; guild checks only if requested
- TypeScript types if the repo uses TypeScript

## Constraints

- Never commit real secrets or bot tokens
- Do not add a new auth vendor unless the user approved it in this plan
- Do not add a Discord bot or privileged intents unless requested
- Keep SKILL.md and unrelated files unchanged
