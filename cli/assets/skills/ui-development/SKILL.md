---
name: ui-development
description: Builds frontend UI from screenshots, Figma designs, mockups, or detailed UI requirements using the target project's existing patterns and components. Use when implementing UI, building screens from designs, translating mockups to code, or when the user mentions Figma, screenshots, mockups, wireframes, or frontend layout work.
---

# UI Development

Build frontend UI from screenshots, Figma designs, mockups, or detailed UI requirements.

This skill MUST NOT be hardcoded to any specific frontend technology.

Do not assume React, Next.js, Vue, Angular, Tailwind, MUI, Bootstrap, or any specific framework/library.

The project being worked on is always the source of truth.

Behave like a senior frontend engineer implementing a design inside an unfamiliar existing codebase.

## Workflow

### Phase 1: Inspect the repository

Before making any changes, inspect the existing repository and understand:

- Framework and language
- Folder/module structure
- Existing component architecture
- Existing reusable components
- Styling approach
- UI/component libraries
- Theme/design tokens
- Typography
- Spacing conventions
- Existing responsive patterns
- Naming conventions
- Existing utilities/helpers
- Existing state and data patterns

**How to inspect:**

1. Read project config files (package manager manifests, build config, framework config).
2. Locate the component directory and read representative examples.
3. Search for existing components that match the requested UI (buttons, inputs, modals, tables, cards, etc.).
4. Identify styling sources: CSS modules, utility classes, design tokens, theme files, global styles.
5. Find similar existing screens or layouts to use as implementation references.
6. Note routing, layout wrappers, and data-fetching patterns if the UI connects to data.

Document findings briefly before writing code.

### Phase 2: Plan the implementation

1. Map each design element to an existing component, extension, or new piece.
2. Prefer composition of existing primitives over new abstractions.
3. Identify ambiguous requirements; ask targeted questions only when ambiguity materially affects implementation.
4. If the design requires a new pattern, abstraction, component, dependency, or architecture, **stop and ask for human confirmation** before introducing it.

### Phase 3: Implement

Then implement the requested UI using the existing project's patterns.

### Phase 4: Validate

After implementation, validate the result against the provided screenshot/Figma/design.

## Core rules

- Reuse existing components whenever possible.
- Extend existing components when appropriate.
- Reuse existing utilities.
- Follow existing styling conventions.
- Follow existing naming and folder conventions.
- Match the provided design as closely as practical.
- Preserve existing functionality.
- Do not rewrite working reusable code unnecessarily.
- Do not create duplicate components.
- Do not introduce unnecessary dependencies.
- Do not change unrelated files.
- Do not introduce a new architectural or styling pattern without confirmation.

If an existing pattern can reasonably support the requested UI, use it.

If the requested design genuinely requires a new pattern, abstraction, component, dependency, or architecture, stop and ask for human confirmation before introducing it.

When requirements are ambiguous, inspect the repository first and make reasonable assumptions. Ask targeted questions only when the ambiguity materially affects the implementation.

Do not redesign existing functionality unless explicitly requested.

## Design fidelity checklist

Pay attention to:

- Layout
- Spacing
- Typography
- Colors
- Borders
- Shadows
- Icons
- States (default, hover, focus, active, disabled)
- Interactions
- Forms
- Tables
- Modals/dialogs
- Loading states
- Empty states
- Error states
- Accessibility
- Responsive behavior

For Figma designs, use Figma MCP tools when available. For screenshots, compare visually after implementation.

## Implementation guidelines

### Component reuse

Before creating anything new, search the codebase for:

- Exact or near matches (e.g., existing `Modal`, `DataTable`, `Button`)
- Composable primitives (e.g., `Stack`, `Box`, `Card`, layout wrappers)
- Page-level patterns similar to the requested screen

Extend via props, variants, or composition when an existing component is close but not exact.

### Styling

- Use the project's existing styling mechanism only.
- Pull colors, spacing, and typography from existing tokens/theme variables when they exist.
- Match naming conventions for CSS classes, BEM blocks, or utility usage already present in the project.
- Do not mix in styles from a different paradigm (e.g., do not add Tailwind to a CSS-modules-only project).

### State and data

- Follow existing patterns for local state, global state, forms, and API calls.
- Wire UI to existing data hooks, services, or stores when applicable.
- Use placeholder/mock data only when the design is visual-only and the project already uses that pattern elsewhere.

### Accessibility

- Use semantic HTML elements appropriate to the project's conventions.
- Preserve or add keyboard navigation consistent with existing interactive components.
- Include labels, alt text, and ARIA attributes following patterns already in the codebase.
- Ensure focus states and color contrast match or improve on existing standards.

### Scope control

- Change only files required for the requested UI.
- Do not refactor adjacent code unless it blocks the implementation.
- Do not upgrade dependencies or restructure folders without confirmation.

## Validation steps

1. Compare layout, spacing, typography, and colors against the design reference.
2. Check interactive states if specified or inferrable from the design.
3. Verify responsive behavior at breakpoints the project already supports.
4. Run the project's linter/type-check on changed files.
5. Run existing tests; add tests only if the project convention expects them for UI changes.
6. Manually verify the UI renders without breaking surrounding pages.

## Final response format

Every completed UI task must end with this structure:

```markdown
## Analysis

What was inspected and which existing patterns were followed.

## Changes Made

What was implemented.

## Files Changed

List relevant files.

## Validation

What was checked/tested.

## Remaining Concerns

Any mismatch, assumption, or human decision required.
```

## Additional resources

- For a detailed pre-implementation inspection checklist, see [reference.md](reference.md)
