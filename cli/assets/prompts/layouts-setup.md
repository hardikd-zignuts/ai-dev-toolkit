---
title: Page layouts
category: Architecture
description: Inspect this repo, ask every layout question that is not already proven, then add page shells that match the current stack and styling.
tags: [layouts, app-shell, sidebar, header, dashboard]
---

Set up shared page layouts in this repository.

## Process (do not skip)

1. Inspect the repo first. Do not write or edit application code until the user answers your questions and approves a plan.
2. Auto-detect the current tech stack from evidence. Do not assume React, Next.js, Vue, or any UI library.
3. Report what you found, with the files that prove it.
4. Ask every question below that you cannot prove from the repo. Ask them in **one** message. Do not silently pick defaults.
5. After answers, present a short plan (layouts to add, files to change, how they plug into the router). Wait for approval.
6. Implement only what was approved, using this project's existing folders, naming, styling, and file extensions.

If this is not a frontend app, say so and ask whether to continue.

## Inspect (adapt automatically)

Look at package.json, framework config, router files, existing layout files, and styling setup.

Detect and report:

- Language and file extensions (`.tsx`, `.vue`, `.svelte`, `.ts`, and so on)
- Framework and how layouts are done here: React Router outlets, Next.js nested `layout.tsx`, Vue Router views, Nuxt `layouts/`, SvelteKit `+layout.svelte`, or other
- Styling: Tailwind, CSS Modules, vanilla CSS, Sass, styled-components, or a UI kit (shadcn, MUI, Vuetify, PrimeVue, Nuxt UI, and so on)
- Existing header, sidebar, footer, or layout components
- Breakpoints or responsive patterns already used
- Package manager

Reuse existing layout and UI primitives. Do not introduce a new CSS framework.

## Questions (ask all that are still unknown)

Ask all of these unless the repo already answers them:

1. Which layouts do you want: dashboard app shell, auth (login) layout, marketing/public layout, blank layout, error layout? Pick any combination.
2. Dashboard chrome: sidebar, top nav, both, or none?
3. Should the sidebar collapse on desktop, and become a drawer on small screens? What is the mobile breakpoint (or use the project's existing one)?
4. What should the header include: logo, search, notifications, user menu, theme toggle, none of these, or something else?
5. What are the sidebar/nav items (label + route)? If unknown, should we use placeholders?
6. Is there a footer? If yes, what should it contain?
7. Auth layout: centered card only, or card plus a branding side panel?
8. Error UI: React/Vue error boundary, framework error page (`error.tsx` / `+error.svelte`), or both?
9. Should new layouts wrap existing pages, or only be used by new route groups?
10. Branding: product name, logo path, and default home route?
11. Where should new files live?
12. May we add a dependency (for example a drawer primitive) if the UI kit has no equivalent? If no, use existing components only.
13. Accessibility extras to require: skip link, keyboard-closable drawer, focus trap? Default to yes unless you say no.
14. Should we add tests? If yes, which runner is already in the project?

Do not implement until every applicable question is answered and the plan is approved.

## After approval, implement

Match the detected framework layout mechanism and styling:

- Dashboard shell with the agreed header/sidebar/main/footer
- Auth layout if requested
- Error fallback if requested
- Semantic landmarks (`header`, `nav`, `aside`, `main`, `footer`) when they fit the stack
- Active nav state from the current route
- Responsive behavior as agreed

## Constraints

- Do not switch styling systems or UI kits
- Do not replace an existing layout file without explicit approval
- Follow this repo's folder conventions (route groups vs `components/layouts`)
