# UI Development — Repository Inspection Reference

Use this checklist during Phase 1. Read only the sections relevant to the task.

## Project identity

| Signal | Where to look |
|--------|---------------|
| Language | File extensions, `tsconfig`, `jsconfig`, `pyproject.toml`, etc. |
| Framework | `package.json`, `composer.json`, `Cargo.toml`, `go.mod`, framework config files |
| Build tool | Vite, Webpack, Parcel, esbuild, Angular CLI, etc. |
| Package manager | Lock files: `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, `bun.lockb` |

## Structure

- Entry points: `src/main.*`, `app/`, `pages/`, `routes/`
- Component locations: `components/`, `ui/`, `shared/`, `widgets/`
- Layout shells: `layouts/`, `App.*`, root route wrappers
- Assets: `assets/`, `public/`, `static/`, `icons/`
- Styles: `styles/`, `theme/`, `tokens/`, global CSS/SCSS entry files

## Component architecture

Note:

- File naming: PascalCase vs kebab-case, index barrel exports
- Co-location: styles/tests next to components vs separate folders
- Composition patterns: slots, children, render props, compound components
- Prop conventions: `variant`, `size`, `className`, event handler naming

## Styling system

Identify ONE primary approach and stay within it:

- Utility-first (Tailwind, UnoCSS, etc.)
- CSS Modules / scoped CSS
- CSS-in-JS (styled-components, Emotion, styled-system)
- Component library theming (MUI, Chakra, Ant Design, etc.)
- Design tokens (CSS variables, JSON tokens, Style Dictionary output)
- Preprocessor (SCSS, Less, Stylus)

Find: spacing scale, font sizes/weights, color palette, border radius, shadow tokens, breakpoint definitions.

## Existing UI inventory

Search for reusable pieces before building:

```
button | input | select | checkbox | radio | switch
modal | dialog | drawer | popover | tooltip
table | list | card | badge | avatar | tag
form | field | label | error | validation
spinner | skeleton | empty | alert | toast
nav | sidebar | header | footer | breadcrumb
grid | flex | stack | container | section
icon | svg | image
```

## Responsive patterns

- Breakpoint definitions and naming
- Mobile-first vs desktop-first
- Hidden/shown utilities or media-query patterns
- Container max-widths

## State and data

- Local state patterns (hooks, stores, signals)
- Form libraries and validation approach
- API client / fetch layer location
- Loading and error handling conventions on existing pages

## Icons and media

- Icon library or inline SVG pattern
- Image component wrapper (lazy load, srcset)
- Font loading (Google Fonts, self-hosted, icon fonts)

## When to ask for confirmation

Stop and ask before:

- Adding a new npm/package dependency
- Introducing a new styling paradigm
- Creating a generic component that duplicates an existing one under a different name
- Changing global theme tokens affecting the whole app
- Modifying shared layout or routing structure
- Removing or redesigning existing functionality not in scope
