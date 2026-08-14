# Quick Repo Setup Prompts

A curated collection of production-ready AI prompts for quick repository setup, boilerplate scaffolding, and core frontend infrastructure patterns across React, Next.js, Vue, Svelte, and TypeScript applications.

Works seamlessly with **Cursor**, **Claude Code**, **Antigravity**, **GitHub Copilot**, **Windsurf**, and any AI coding assistant.

---

## Catalog

| Setup Prompt | Category | Infrastructure Focus | File |
| ------------ | -------- | -------------------- | ---- |
| **Auth Guards Setup** | Security / Routing | Protected routes, Auth Context, role-based guards, and login redirect logic | [`auth-guards-setup.md`](auth-guards-setup.md) |
| **Layouts Setup** | Architecture | App Shell, Dashboard layout (Header/Sidebar), Auth layout, and Error Boundaries | [`layouts-setup.md`](layouts-setup.md) |
| **React Query Setup** | Data Fetching | TanStack Query client defaults, Provider, Devtools, and Query Key Factory pattern | [`react-query-setup.md`](react-query-setup.md) |
| **Firebase Setup** | Backend / BaaS | Firebase SDK (Auth, Firestore, Storage) with env validation and typed hooks | [`firebase-setup.md`](firebase-setup.md) |
| **API Client Setup** | Networking | Axios / Fetch instance, Bearer token injection, refresh token rotation, & interceptors | [`api-client-setup.md`](api-client-setup.md) |
| **State Store Setup** | State Management | Zustand / Redux / Pinia store setup with TypeScript, persist middleware, & devtools | [`state-store-setup.md`](state-store-setup.md) |
| **Theme Provider Setup** | UI System | Light/Dark mode provider, system color scheme detection, & CSS variables setup | [`theme-provider-setup.md`](theme-provider-setup.md) |

---

## How to Use

1. Select the infrastructure setup prompt you need from the catalog.
2. Copy the content of the `.md` file into your AI IDE chat or prompt window.
3. Customize parameter placeholders (e.g., `<framework>`, `<auth-provider>`, `<target-dir>`) if needed.
4. Let the AI assistant generate fully typed, production-ready setup files following industry best practices.
