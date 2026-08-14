---
title: Theme Provider Setup
category: UI System
description: Quick setup prompt for Light/Dark mode Theme Provider, OS color scheme preference detection, CSS variables, and LocalStorage persistence.
tags: [theme, dark-mode, theme-provider, css-variables, tailwind, context, typescript]
---

# Theme Provider & Dark Mode Setup Prompt

Use this prompt to set up a Dark/Light Theme Provider in your project, supporting system OS color scheme detection (`prefers-color-scheme`), manual toggle override, LocalStorage persistence, and CSS class/variable injection.

---

## Copy & Paste Prompt

```text
Set up a robust Theme Provider & Dark Mode system in this repository.

### Project Details
- Framework & Styling: <React/Next.js/Vue + Tailwind CSS (class strategy) / CSS Variables / Styled Components>
- Default Theme: <system / light / dark>
- Target Directory: <src/providers or src/components/theme>

### Requirements & Best Practices

1. Theme Context & Provider (`ThemeProvider.tsx`):
   - Support three theme options: `'light' | 'dark' | 'system'`.
   - Read saved theme preference from `localStorage` on initial load.
   - Listen for OS media query changes (`window.matchMedia('(prefers-color-scheme: dark)')`) when set to `'system'`.

2. DOM Class & Style Injection:
   - Synchronize document root element (`<html>` or `<body>`) by toggling `.dark` class or `data-theme="dark"` attribute.
   - Set `color-scheme: dark` or `color-scheme: light` in CSS root to prevent browser native element flash.

3. Custom Hook (`useTheme.ts`):
   - Export custom hook returning `{ theme, resolvedTheme, setTheme, toggleTheme }`.
   - Throw a helpful error if used outside `<ThemeProvider>`.

4. Theme Toggle UI Component (`ThemeToggle.tsx`):
   - Render accessible theme switcher control (Dropdown, Toggle Switch, or Sun/Moon Icon Button).
   - Ensure proper `aria-label` for screen reader accessibility.
   - Include smooth CSS color transitions between light and dark modes without layout layout shifts.

### Expected Files Output
- `ThemeProvider.tsx` (Context provider & theme state manager)
- `useTheme.ts` (Custom hook for consuming and updating theme)
- `ThemeToggle.tsx` (Accessible UI toggle component with Sun/Moon icons)
- `index.ts` barrel export file
```
