---
name: responsive-design
description: Analyzes and implements responsive behavior for existing frontend applications across desktop, tablet, and mobile viewports. Use when fixing layout overflow, adapting UI for smaller screens, making pages mobile-friendly, or when the user mentions responsive design, breakpoints, viewport sizing, horizontal scroll, or mobile/tablet layout issues.
---

# Responsive Design

Analyze and implement responsive behavior for existing frontend applications across desktop, tablet, and mobile screen sizes.

This skill MUST NOT be hardcoded to any specific frontend framework, CSS framework, styling library, or breakpoint system.

Do not assume React, Next.js, Tailwind, Bootstrap, MUI, CSS Modules, SCSS, or any specific technology.

The existing repository is the source of truth.

Behave like a senior frontend engineer improving responsiveness inside an unfamiliar existing codebase — without redesigning it.

## Workflow

### Phase 1: Inspect the repository

Before making changes, inspect:

- Existing responsive implementation
- Existing breakpoints
- Styling conventions
- Layout system
- Shared components
- Navigation patterns
- Table behavior
- Form behavior
- Modal/dialog behavior
- Grid/flex patterns
- Existing mobile/tablet implementations
- Theme/design tokens
- Utility classes/helpers

**How to inspect:**

1. Find breakpoint definitions (CSS variables, media-query mixins, config files, utility class prefixes).
2. Search for existing responsive utilities (hide/show, stack/column, container, overflow helpers).
3. Read representative pages/components that already handle mobile or tablet well.
4. Identify the dominant responsive pattern when multiple exist.
5. Note navigation, table, form, and modal patterns at smaller viewports.
6. Document findings briefly before writing code.

For a detailed inspection checklist, see [reference.md](reference.md).

### Phase 2: Analyze problems

Identify responsive issues in scope. Common categories:

- Horizontal overflow
- Fixed-width elements
- Broken grids
- Text overflow
- Incorrect spacing
- Navigation problems
- Table overflow
- Form layout issues
- Dialog/modal sizing
- Image scaling
- Typography scaling
- Touch interaction issues
- Content visibility
- Element ordering
- Mobile-specific interaction problems

Map each issue to an existing pattern or utility before proposing new CSS or components.

When requirements are ambiguous, inspect the code first. Ask questions only when the answer materially affects implementation.

### Phase 3: Implement

Apply responsive fixes using the repository's existing patterns.

If multiple patterns exist, identify the current/dominant pattern and use it.

If a completely new responsive pattern is required, **stop and ask for human confirmation** before implementing it.

### Phase 4: Validate

After implementation, validate at relevant viewport sizes (desktop, tablet, mobile — use breakpoints the project already defines).

Check: no horizontal overflow, readable text, usable touch targets, functional navigation, scrollable/collapsed tables, usable forms and modals.

Run the project's linter/type-check on changed files when available.

## Core rules

- Preserve existing desktop behavior.
- Do not redesign functionality unless explicitly requested.
- Reuse existing components.
- Reuse existing responsive utilities.
- Follow existing breakpoints instead of inventing new ones unnecessarily.
- Avoid unnecessary CSS duplication.
- Avoid unnecessary dependencies.
- Avoid rewriting reusable code.
- Do not create duplicate components.
- Do not change unrelated functionality.
- Do not introduce a new responsive architecture without human confirmation.

When the repository already has responsive conventions, follow them.

The goal is to make the existing UI responsive, not redesign it.

## Pattern selection

| Situation | Action |
|-----------|--------|
| Project has clear responsive conventions | Follow them |
| Multiple patterns coexist | Identify and use the dominant/current pattern |
| No existing pattern fits the fix | Propose approach and ask for confirmation |
| Fix requires new breakpoint | Confirm with human before adding |

## Implementation guidelines

### Prefer adaptation over invention

1. Extend existing components with responsive props/variants already used elsewhere.
2. Apply existing utility classes or media-query patterns.
3. Adjust layout containers, grid/flex rules, and spacing using project tokens.
4. Use existing overflow, truncation, or scroll patterns for tables and wide content.

### Scope control

- Change only files required for the responsive fix.
- Do not refactor unrelated layout code.
- Do not swap styling paradigms or add dependencies without confirmation.

### Touch and mobile interaction

- Follow existing touch-target sizes and interaction patterns in the codebase.
- Preserve or match existing mobile navigation behavior (drawer, bottom nav, hamburger, etc.).
- Do not change interaction models (e.g., hover-only affordances) unless explicitly requested.

## Final response format

Every completed responsive design task must end with this structure:

```markdown
## Analysis

Existing responsive patterns discovered.

## Changes Made

Responsive changes implemented.

## Files Changed

Relevant files.

## Validation

Viewports/scenarios checked.

## Remaining Concerns

Known limitations or decisions requiring confirmation.
```

## Additional resources

- For inspection checklists and problem diagnostics, see [reference.md](reference.md)
