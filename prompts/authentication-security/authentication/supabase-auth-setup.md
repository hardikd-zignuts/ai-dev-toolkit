---
title: Supabase Auth
category: Authentication & Security / Authentication
description: Inspect this repo, ask every Supabase Auth question that is not already proven, then wire Supabase Auth using this project's stack and env style.
tags: [auth, supabase, supabase-auth, session, typescript, security]
---

Set up Supabase Auth in this repository using the current stack.

This prompt is **auth-only**. Do not invent Row Level Security policies, Storage buckets, or database tables unless the user explicitly asks.

## Process (do not skip)

1. Inspect the repo first. Do not write or edit application code until the user answers your questions and approves a plan.
2. Auto-detect the current tech stack and any existing Supabase or auth setup from evidence. Do not assume `@supabase/ssr` or env names.
3. Report what you found, with the files that prove it.
4. Ask every question below that you cannot prove from the repo. Ask them in **one** message. Do not silently pick defaults.
5. After answers, present a short plan (client vs SSR helpers, auth methods, files, env names). Wait for approval.
6. Implement only what was approved, using this project's existing folders, env style, and file extensions.

If this is not a web app, say so and ask whether to continue.

## Inspect (adapt automatically)

Look at package.json, env examples, existing Supabase clients, middleware, and other auth libraries.

Detect and report:

- Language and file extensions
- Framework and SSR model (Next.js App Router, Nuxt, SvelteKit, Vite SPA, other)
- Whether `@supabase/supabase-js` and/or `@supabase/ssr` are already installed
- Existing auth: Supabase, Auth.js, Clerk, Firebase, custom JWT, or none
- Env names already used (`NEXT_PUBLIC_SUPABASE_URL`, `VITE_SUPABASE_*`, or other)
- Package manager

Reuse an existing Supabase client. Do not create a second client or a second auth system without explicit approval.

## Questions (ask all that are still unknown)

Ask all of these unless the repo already answers them:

1. Keep the existing auth system, replace it, or add Supabase Auth because there is none?
2. Hosted Supabase or self-hosted? Do you already have the project URL and anon key (placeholders only in git)?
3. Client-only, or SSR cookie helpers (`@supabase/ssr` / framework cookies)? Follow this framework's default unless you specify otherwise.
4. PKCE flow: yes (recommended for SSR), or implicit? Confirm.
5. Sign-in methods now: email/password (with or without email confirm), magic link, OTP, phone, and/or OAuth? Which OAuth providers now vs later?
6. Redirect / site URLs for local and production. Confirm callback paths.
7. Env names: follow the framework prefix we detected, or names already in `.env.example`?
8. After login / logout destinations? Guest-only routes?
9. Row Level Security: out of scope for this change, generate starter policies, or you will manage policies in the Supabase dashboard only?
10. Should we add route protection in this change, or leave Protected Routes for later?
11. Where should new files live (browser client, server client, middleware)?
12. May we add `@supabase/supabase-js` and `@supabase/ssr` if missing? Confirm yes/no.
13. Should we add tests? If yes, which runner is already in the project?

Do not implement until every applicable question is answered and the plan is approved. Do not invent service role keys or put them in client code.

## After approval, implement

Match the detected framework:

- Browser and/or server Supabase clients as requested
- Auth helpers (session, sign-in, sign-out) for this stack
- Only the auth methods that were requested
- `.env.example` placeholders for public URL and anon key (never the service role in client env)
- TypeScript types if the repo uses TypeScript
- Middleware or guards only if requested

## Constraints

- Never commit real keys; never expose the service role to the browser
- Do not invent RLS policies or database schema unless requested
- Do not replace existing auth without explicit approval
- Keep SKILL.md and unrelated files unchanged
