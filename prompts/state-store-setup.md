---
title: State Store Setup
category: State Management
description: Quick setup prompt for global state management stores (Zustand, Redux Toolkit, or Pinia) with TypeScript typing, persistence, and devtools.
tags: [state-management, zustand, redux-toolkit, pinia, state-store, persist, devtools, typescript]
---

# Global State Store Setup Prompt

Use this prompt to set up global state management stores (Zustand, Redux Toolkit, or Pinia) with full TypeScript type safety, LocalStorage persistence middleware, slice modularity, and Devtools integration.

---

## Copy & Paste Prompt

```text
Set up a modular, type-safe Global State Store architecture in this codebase.

### Project Details
- State Management Library: <Zustand / Redux Toolkit / Pinia / React Context>
- Persistence Required: <Yes (User Preferences, Auth, Theme) / No>
- Target Directory: <src/store or src/state>

### Requirements & Best Practices

1. Store Architecture & Slices:
   - Modular slice architecture (e.g. `useUserStore`, `useUIStore`, `useCartStore`).
   - Define explicit TypeScript interfaces for state properties and action methods.

2. State Updates & Immutability:
   - Ensure clean state mutations (use `immer` middleware if using complex nested state objects in Redux/Zustand).
   - Export selectors to allow components to subscribe only to specific state slices (preventing unnecessary re-renders).

3. Persistence Middleware:
   - Configure persistence middleware (e.g., Zustand `persist` / `redux-persist`) for specified slices.
   - White-list or black-list specific state fields to avoid persisting sensitive data or transient UI flags.

4. Devtools & SSR Hydration:
   - Integrate Redux Devtools extension for state inspection.
   - Handle SSR hydration mismatches gracefully if using Next.js/Nuxt (`useHydrated` hook or store initialization check).

### Expected Files Output
- `useUserStore.ts` (User profile & authentication state slice)
- `useUIStore.ts` (UI state slice: sidebar open/closed, modal states, notifications)
- `storeUtils.ts` (Persist config & hydration helpers)
- `index.ts` barrel export file
```
