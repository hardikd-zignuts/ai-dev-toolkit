---
title: Light and dark theme
category: UI System
description: Inspect this repo, ask every theme question that is not already proven, then add light/dark mode that matches the current styling system.
tags: [theme, dark-mode, css-variables, tailwind, typescript]
---

Set up light and dark theme in this repository.

## Process (do not skip)

1. Inspect the repo first. Do not write or edit application code until the user answers your questions and approves a plan.
2. Auto-detect the current styling system from evidence. Do not assume Tailwind, `next-themes`, or a `.dark` class.
3. Report what you found, with the files that prove it.
4. Ask every question below that you cannot prove from the repo. Ask them in **one** message. Do not silently pick defaults.
5. After answers, present a short plan (library vs custom, class vs data attribute, files, FOUC strategy). Wait for approval.
6. Implement only what was approved, using this project's existing tokens, UI kit, and file extensions.

If this is not a frontend app, say so and ask whether to continue.

## Inspect (adapt automatically)

Look at package.json, Tailwind/CSS config, root layout/HTML, and existing theme providers.

Detect and report:

- Language and file extensions
- Framework: React, Next.js, Vue, Nuxt, SvelteKit, or other
- Styling: Tailwind (`darkMode` setting), CSS variables, CSS Modules, Sass, styled-components, or a UI kit (shadcn, MUI, Chakra, Vuetify, Nuxt UI, PrimeVue, and so on)
- Theme helpers already installed: `next-themes`, `@nuxtjs/color-mode`, `useDark` (VueUse), MUI `ThemeProvider`, or other
- How the document root is marked today (`class="dark"`, `data-theme`, `data-mode`)
- Package manager

Reuse the UI kit's theme API when it exists (for example MUI palette mode, shadcn + `next-themes`). Do not add a second theme system.

## Questions (ask all that are still unknown)

Ask all of these unless the repo already answers them:

1. Keep the existing theme solution, extend it, or add a new one? If new, custom provider or a library that fits this framework (`next-themes`, `@nuxtjs/color-mode`, VueUse `useDark`, or other)?
2. Modes: `light` and `dark` only, or also `system` (follow OS)?
3. How should the DOM be marked: `.dark` class on `<html>`, `data-theme="dark"`, both, or the UI kit's required attribute?
4. Tailwind (if used): `darkMode: 'class'` or `'media'`? Changing this affects the whole app — confirm before changing.
5. Persist choice: localStorage, cookie (better for SSR), or none? What storage key?
6. Prevent flash of the wrong theme on first load (FOUC): yes or no? If SSR, cookie or inline script in the document head?
7. Toggle UI: icon button, dropdown (light/dark/system), or no UI yet (API only)?
8. Where should the toggle live: header, settings page, both, or you will place it later?
9. Color tokens: reuse existing CSS variables / Tailwind theme colors, or define a new token list? If new, which tokens (background, foreground, border, accent, and so on)?
10. Should `prefers-reduced-motion` or contrast settings be respected in the toggle animation?
11. Where should new files live?
12. May we add a package if a helper library is chosen and not installed?
13. Should we add tests? If yes, which runner is already in the project?

Do not implement until every applicable question is answered and the plan is approved.

## After approval, implement

Match the detected styling system:

- Theme state: `theme`, `resolvedTheme`, `setTheme`, `toggleTheme` as applicable
- Document root sync as agreed
- Persistence as agreed
- FOUC prevention if requested
- Accessible toggle if requested (`aria-label`, keyboard usable)
- No new color palette unless requested

## Constraints

- Do not restyle the whole app or replace brand colors unless asked
- Do not change `darkMode` in Tailwind without explicit approval
- Do not add both `next-themes` and a custom class toggler
