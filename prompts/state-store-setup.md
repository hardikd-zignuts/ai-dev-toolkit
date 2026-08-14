---
title: State Store Setup
category: State Management
description: Universal setup prompt for global state management stores (Zustand, Pinia, Redux Toolkit, or Svelte Stores) with TypeScript typing, persistence, and devtools across React, Next.js, Vue, Nuxt, and Svelte.
tags: [state-management, zustand, pinia, redux-toolkit, svelte-store, react, nextjs, vue, nuxt, svelte, typescript]
---

# Universal Global State Store Setup Prompt

Use this prompt to set up global state management stores (Zustand, Pinia, Redux Toolkit, or Svelte Stores) with full TypeScript type safety, LocalStorage persistence middleware, modular slices/modules, and Devtools integration across React, Next.js, Vue 3, Nuxt, or Svelte projects.

---

## Copy & Paste Prompt

```text
Set up a modular, type-safe Global State Store architecture in this codebase.

### Framework Auto-Detection & Adaptation
1. Inspect this project's dependencies and structure to auto-detect:
   - Target State Library:
     - React / Next.js / Vite: Zustand (preferred for light weight), Redux Toolkit, or React Context.
     - Vue 3 / Nuxt: Pinia (`defineStore`).
     - Svelte / SvelteKit: Svelte writable/readable stores or Nanostores.
2. Adapt all code generation and file extensions (.ts, .js) to match this project's stack.

### Setup Requirements

1. Store Architecture & Slices:
   - Create modular store slices (e.g. `userStore`, `uiStore`, `cartStore`).
   - Define explicit TypeScript interfaces for state properties and action functions.

2. State Updates & Immutability:
   - Ensure immutable state updates.
   - Export selectors/getters to allow components to subscribe strictly to specific state fields, avoiding unnecessary re-renders.

3. Persistence Middleware:
   - Configure persistence middleware (e.g. Zustand `persist` / Pinia `pinia-plugin-persistedstate`).
   - Allow whitelisting specific fields to persist (e.g. theme, token) while keeping temporary UI states unpersisted.

4. SSR & Hydration Safety:
   - Ensure hydration safety for SSR frameworks (Next.js / Nuxt / SvelteKit) to prevent hydration mismatch warnings between server and client rendering.

### Expected Output
- User authentication & profile store slice (`userStore.ts`)
- UI state store slice (`uiStore.ts`) (sidebar state, modal triggers, toasts)
- Store persistence configuration file (`storeUtils.ts`)
- Barrel export file (`index.ts`)
```
