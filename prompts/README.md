# App feature setup prompts

Copy-paste prompts for an AI coding assistant. Each prompt **inspects this repository first**, **asks every unanswered question in one message**, then implements only after you approve a plan. Generated code should follow the stack that is already in the project (framework, router, styling, env vars, file extensions).

Works with assistants in Cursor, Claude Code, Antigravity, GitHub Copilot, Windsurf, and similar tools.

From the CLI: `npx agentkitx` → **Copy a prompt to add app features**, then section → group → prompt. Use **← Back** to go up a level.

## Authentication & Security

### Authentication

| Prompt | What it sets up | File |
| ------ | ---------------- | ---- |
| Auth.js | Auth.js (NextAuth) session, adapter, and providers | [`authentication-security/authentication/authjs-setup.md`](authentication-security/authentication/authjs-setup.md) |
| Better Auth | Better Auth server, database plugin, and client helpers | [`authentication-security/authentication/better-auth-setup.md`](authentication-security/authentication/better-auth-setup.md) |
| Firebase Authentication | Firebase Auth only (no Firestore/Storage unless you ask) | [`authentication-security/authentication/firebase-auth-setup.md`](authentication-security/authentication/firebase-auth-setup.md) |
| Supabase Auth | Supabase sign-in with this project's SSR or client pattern | [`authentication-security/authentication/supabase-auth-setup.md`](authentication-security/authentication/supabase-auth-setup.md) |
| Clerk | Clerk provider, components, and optional middleware | [`authentication-security/authentication/clerk-setup.md`](authentication-security/authentication/clerk-setup.md) |

### OAuth Providers

These attach to an existing auth layer. If none exists, the prompt asks which vendor to set up first.

| Prompt | What it sets up | File |
| ------ | ---------------- | ---- |
| Google | Google sign-in | [`authentication-security/oauth/google-setup.md`](authentication-security/oauth/google-setup.md) |
| GitHub | GitHub sign-in | [`authentication-security/oauth/github-setup.md`](authentication-security/oauth/github-setup.md) |
| Microsoft | Microsoft / Entra ID sign-in | [`authentication-security/oauth/microsoft-setup.md`](authentication-security/oauth/microsoft-setup.md) |
| Apple | Sign in with Apple | [`authentication-security/oauth/apple-setup.md`](authentication-security/oauth/apple-setup.md) |
| Discord | Discord sign-in | [`authentication-security/oauth/discord-setup.md`](authentication-security/oauth/discord-setup.md) |

### Authorization

| Prompt | What it sets up | File |
| ------ | ---------------- | ---- |
| RBAC | Roles and permissions on the existing auth layer | [`authentication-security/authorization/rbac-setup.md`](authentication-security/authorization/rbac-setup.md) |
| Protected Routes | Auth state and route guards | [`auth-guards-setup.md`](auth-guards-setup.md) |

## App features

| Prompt | What it sets up | File |
| ------ | ---------------- | ---- |
| Page layouts | App shell, auth layout, error fallback | [`layouts-setup.md`](layouts-setup.md) |
| Data fetching | Shared cache/load/refetch (TanStack Query or the library you already use) | [`tanstack-query-setup.md`](tanstack-query-setup.md) |
| Firebase | Auth and data using this project's env style | [`firebase-setup.md`](firebase-setup.md) |
| API client | Shared HTTP client and error handling | [`api-client-setup.md`](api-client-setup.md) |
| App state | Client store (Zustand, Pinia, Redux, Svelte stores, or what you already use) | [`state-store-setup.md`](state-store-setup.md) |
| Light and dark theme | Theme toggle that matches your CSS/UI kit | [`theme-provider-setup.md`](theme-provider-setup.md) |

## How to use

1. From your project: `npx agentkitx` → **Copy a prompt to add app features**, or open a file in this folder.
2. Paste the prompt into your AI IDE.
3. The assistant should: inspect the repo → list what it detected → ask remaining questions → show a plan → wait for your approval → then write files.
4. If it starts coding before those steps, stop it and point it back at the process in the prompt.

Do not skip the question step. Silent defaults are how the wrong library gets installed.
