# App feature setup prompts

Copy-paste prompts for an AI coding assistant. Each prompt **inspects this repository first**, **asks every unanswered question in one message**, then implements only after you approve a plan. Generated code should follow the stack that is already in the project (framework, router, styling, env vars, file extensions).

Works with assistants in Cursor, Claude Code, Antigravity, GitHub Copilot, Windsurf, and similar tools.

## Catalog

| Prompt | What it sets up | File |
| ------ | ---------------- | ---- |
| Login and protected pages | Auth state and route guards | [`auth-guards-setup.md`](auth-guards-setup.md) |
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
