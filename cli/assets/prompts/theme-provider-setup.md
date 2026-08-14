---
title: Theme Provider Setup
category: UI System
description: Universal setup prompt for Light/Dark mode Theme Provider, OS color scheme preference detection, CSS variables, and LocalStorage persistence across React, Next.js, Vue, Nuxt, and Svelte.
tags: [theme, dark-mode, theme-provider, css-variables, tailwind, react, nextjs, vue, nuxt, svelte, typescript]
---

# Universal Theme Provider & Dark Mode Setup Prompt

Use this prompt to set up a Dark/Light Theme Provider in any frontend repository (React, Next.js, Vite, Vue 3, Nuxt, SvelteKit), supporting OS color scheme preference detection (`prefers-color-scheme`), manual theme toggling, LocalStorage persistence, and CSS class/variable sync.

---

## Copy & Paste Prompt

```text
Set up a robust Theme Provider & Dark Mode system in this repository.

### Framework Auto-Detection & Adaptation
1. Inspect this project's dependencies and structure to auto-detect:
   - Framework & Component Type: React (`ThemeProvider.tsx`), Next.js (`next-themes` / Context), Vue 3 (`useDark` / `ThemeProvider.vue`), Nuxt (`@nuxtjs/color-mode`), or Svelte (`ThemeProvider.svelte`).
   - CSS Strategy: Tailwind CSS (`dark:` variant class mode), CSS custom properties (`var(--bg-primary)`), or UI component library tokens.
2. Adapt all code generation and file extensions (.ts, .tsx, .vue, .svelte) to match this project's stack.

### Setup Requirements

1. Theme Provider / Store:
   - Support three theme options: `'light' | 'dark' | 'system'`.
   - Read saved theme preference from `localStorage` on initial mount.
   - Listen for OS media query changes (`window.matchMedia('(prefers-color-scheme: dark)')`) when set to `'system'`.

2. DOM Class & Attribute Synchronization:
   - Synchronize document root element (`<html>` or `<body>`) by toggling `.dark` class or `data-theme="dark"` attribute.
   - Prevent flash of unstyled theme (FOUC) during initial page load using an inline script or SSR theme head script.

3. Custom Hook / Composable / Store:
   - Export custom hook (`useTheme()`) or composables returning `{ theme, resolvedTheme, setTheme, toggleTheme }`.

4. Theme Toggle UI Component:
   - Render accessible theme toggle switcher control (Dropdown or Sun/Moon Icon Button).
   - Ensure proper `aria-label` for screen reader accessibility.

### Expected Output
- Framework-native Theme Provider component / store file
- Framework-native `useTheme` hook / composable file
- Accessible Theme Toggle UI component (`ThemeToggle.tsx` / `.vue` / `.svelte`)
- Barrel export file (`index.ts`)
```
