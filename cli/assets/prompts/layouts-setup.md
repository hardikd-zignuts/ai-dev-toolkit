---
title: Layouts Setup
category: Architecture
description: Universal setup prompt for App Shell layouts, Header/Sidebar dashboard layout, Auth layout, and Error Boundaries across React, Next.js, Vue, Nuxt, and SvelteKit.
tags: [layouts, app-shell, sidebar, header, dashboard, error-boundary, react, nextjs, vue, nuxt, svelte]
---

# Universal App Layouts & Shell Architecture Setup Prompt

Use this prompt to set up modular UI layouts including a Dashboard App Shell (Header, Collapsible Sidebar, Footer, Main Content Area), Auth layout, and Error Boundaries across React, Next.js, Vue 3, Nuxt, or SvelteKit projects.

---

## Copy & Paste Prompt

```text
Set up a modular, responsive App Layout architecture for this repository.

### Framework Auto-Detection & Adaptation
1. Inspect this project's dependencies and structure to auto-detect:
   - Framework & Layout Pattern:
     - React / Vite: React Router `<Outlet />` layout wrappers.
     - Next.js (App Router): `app/(dashboard)/layout.tsx` & `app/(auth)/layout.tsx` nested layouts.
     - Vue 3 / Vite: Vue Router `<RouterView />` layout components or `vue-router-layout`.
     - Nuxt: `layouts/default.vue` & `layouts/auth.vue` with `<slot />`.
     - SvelteKit: `routes/+layout.svelte` with `<slot />`.
   - Styling Engine: Tailwind CSS, CSS Modules, Vanilla CSS, or UI component library (Shadcn UI, Vuetify, PrimeVue, etc.).
2. Adapt all file extensions (.tsx, .vue, .svelte, .ts) and slot/outlet mechanisms to match this project.

### Setup Requirements

1. Dashboard App Shell Layout:
   - Sticky Header with logo/branding, user profile menu, notifications placeholder, search, and theme toggle.
   - Collapsible Sidebar with responsive drawer for mobile viewports (<768px) and persistent side panel for desktop.
   - Main content viewport wrapper (`<main>`) with proper padding and optional Footer.
   - Active route highlighting based on current router path.

2. Auth Layout:
   - Centered card layout for Login, Signup, Password Reset, and Verification pages.
   - Side panel for branding graphics, product callout, or background gradient.

3. Error Boundary / Fallback Layout:
   - Component / Page error boundary catching runtime rendering exceptions.
   - User-friendly fallback screen with "Try Again" and "Back to Home" actions.

4. Accessibility & Semantics:
   - Semantic HTML elements (`<header>`, `<aside>`, `<nav>`, `<main>`, `<footer>`).
   - Accessible keyboard handling for mobile navigation drawer (`Escape` key closes drawer).

### Expected Output
- Framework-native Dashboard App Shell layout component
- Header component & Sidebar navigation component
- Auth layout component
- Error Boundary / Fallback error component
- Barrel export or layout configuration file
```
