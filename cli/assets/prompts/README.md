# Universal Repo Setup Prompts

A curated collection of framework-agnostic AI setup prompts for quick repository initialization, core frontend architecture, and boilerplate scaffolding across **React**, **Vite**, **Next.js**, **Vue 3**, **Nuxt**, **SvelteKit**, and **TypeScript** web applications.

Every prompt includes automatic framework detection instructions so AI coding assistants (**Cursor**, **Claude Code**, **Antigravity**, **GitHub Copilot**, **Windsurf**) automatically generate code using your project's exact framework, router, styling engine, and file conventions (`.tsx`, `.ts`, `.vue`, `.svelte`).

---

## Catalog

| Setup Prompt | Category | Framework Support | File |
| ------------ | -------- | ----------------- | ---- |
| **Auth Guards Setup** | Security / Routing | React, Next.js, Vue, Nuxt, SvelteKit | [`auth-guards-setup.md`](auth-guards-setup.md) |
| **Layouts Setup** | Architecture | React, Next.js, Vue, Nuxt, SvelteKit | [`layouts-setup.md`](layouts-setup.md) |
| **TanStack Query Setup** | Data Fetching | React Query, Vue Query, Svelte Query, Next.js, Nuxt | [`tanstack-query-setup.md`](tanstack-query-setup.md) |
| **Firebase Setup** | Backend / BaaS | React, Next.js, Vue, Nuxt, SvelteKit | [`firebase-setup.md`](firebase-setup.md) |
| **API Client Setup** | Networking | Axios / Fetch / Ofetch (React, Next.js, Vue, Nuxt, Svelte) | [`api-client-setup.md`](api-client-setup.md) |
| **State Store Setup** | State Management | Zustand, Pinia, Redux Toolkit, Svelte Stores | [`state-store-setup.md`](state-store-setup.md) |
| **Theme Provider Setup** | UI System | Light/Dark mode for React, Next.js, Vue, Nuxt, Svelte | [`theme-provider-setup.md`](theme-provider-setup.md) |

---

## How to Use

1. Copy the content of any `.md` setup prompt file into your AI IDE chat or prompt window.
2. The AI assistant will inspect your repository to auto-detect your framework (React/Next.js/Vue/Nuxt/SvelteKit), router, and styling engine.
3. The AI assistant generates fully typed, framework-native setup files tailored to your project.
