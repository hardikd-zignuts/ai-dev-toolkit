---
title: Layouts Setup
category: Architecture
description: Quick setup prompt for modular App Shell layouts, Header/Sidebar dashboard layout, Auth layout, and Error Boundaries.
tags: [layouts, app-shell, sidebar, header, dashboard, error-boundary, ui, responsiveness]
---

# App Layouts & Shell Architecture Setup Prompt

Use this prompt to set up modular UI layouts including an authenticated Dashboard App Shell (Header, Collapsible Sidebar, Footer, Main Content Area), Auth layout, and Error Boundaries.

---

## Copy & Paste Prompt

```text
Set up a modular, responsive App Layout architecture in this codebase.

### Project Details
- Framework & Styling: <React/Next.js/Vue + Tailwind CSS / Vanilla CSS / CSS Modules>
- Router Integration: <React Router Outlet / Next.js layout children / Vue RouterView>
- Target Directory: <src/layouts or src/components/layouts>

### Requirements & Best Practices

1. Dashboard App Shell (`DashboardLayout`):
   - Structural layout: Sticky Header, Collapsible Sidebar navigation, Main Content area (`<main>`), and Footer.
   - Mobile-First Responsiveness: Collapsible drawer/hamburger menu for mobile (<768px) and persistent sidebar for desktop.
   - Header Components: User profile dropdown, notifications icon placeholder, search bar, and theme toggle.
   - Active Route Highlighting: Automatically highlight active navigation link based on current path.

2. Auth Layout (`AuthLayout`):
   - Centered card layout for Login, Signup, Password Reset, and Verification pages.
   - Side panel featuring company branding, background gradient, or promotional imagery.

3. Error Boundary Layout (`ErrorBoundaryLayout` / `GlobalErrorBoundary`):
   - Catch unexpected component render crashes gracefully.
   - Display a user-friendly error UI with "Reload Page" and "Go to Home" action buttons.
   - Include error logging hook placeholder (e.g. Sentry / console error).

4. Accessibility & Semantics:
   - Use semantic landmarks (`<header>`, `<aside>`, `<nav>`, `<main>`, `<footer>`).
   - Add keyboard accessibility to mobile navigation drawer (`Escape` key closes drawer).

### Expected Files Output
- `DashboardLayout.tsx` (App Shell with Header & Sidebar)
- `Header.tsx` (Top navigation bar)
- `Sidebar.tsx` (Side navigation menu)
- `AuthLayout.tsx` (Clean centered layout for auth pages)
- `ErrorBoundary.tsx` (React Error Boundary layout)
- `index.ts` barrel export file
```
