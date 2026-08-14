# Responsive Design — Inspection & Diagnostics Reference

Use during Phase 1 and Phase 2. Read only sections relevant to the task.

## Breakpoints and media queries

| Signal | Where to look |
|--------|---------------|
| Breakpoint values | CSS/SCSS variables, theme config, design tokens, Tailwind/Uno config, MUI/Chakra theme |
| Naming convention | `sm`/`md`/`lg`, `mobile`/`tablet`/`desktop`, pixel values |
| Approach | Mobile-first (`min-width`) vs desktop-first (`max-width`) |
| Mixins/helpers | `@media`, `@include breakpoint`, `@screen`, custom hooks |

Document the breakpoints actually used in the codebase — do not assume defaults (768px, 1024px, etc.).

## Responsive utilities

Search for:

```
hidden | visible | show | hide | sr-only
stack | column | row | flex-col | flex-row
container | wrapper | max-w | min-w
overflow | scroll | truncate | ellipsis | text-wrap
col-span | grid-cols | columns
order | reorder
d-none | d-block | d-flex (display toggles)
is-mobile | is-tablet | useMedia | useBreakpoint | matchMedia
```

Note whether utilities are CSS-class-based, JS-driven, or component-prop-based.

## Layout system

- Grid: columns, gaps, auto-fit/auto-fill, nested grids
- Flex: wrap, direction changes at breakpoints, flex-basis/min-width traps
- Container: max-width, horizontal padding, centered layouts
- Spacing scale: whether margins/padding shrink on smaller viewports

## Component patterns to inspect

### Navigation

- Header/nav collapse behavior
- Hamburger / drawer / bottom nav triggers
- Sticky/fixed positioning and z-index stacking
- Logo and menu item wrapping

### Tables

- Horizontal scroll wrappers
- Column hiding or priority columns
- Card/list fallback on mobile
- Sticky headers or first column

### Forms

- Label/input stacking
- Multi-column form grids collapsing
- Button groups wrapping
- Full-width inputs on mobile

### Modals / dialogs / drawers

- Width/max-width at breakpoints
- Full-screen mobile behavior
- Padding and scroll inside dialog body
- Close button placement

### Images and media

- `max-width: 100%`, aspect-ratio, object-fit
- srcset/picture elements
- Icon sizing at smaller viewports

### Typography

- Fluid type scales, clamp(), breakpoint-based font sizes
- Line length and heading wrapping
- Truncation vs wrap policies

## Common problem diagnostics

| Symptom | Likely causes | Fix direction (using existing patterns) |
|---------|---------------|----------------------------------------|
| Horizontal page scroll | Fixed widths, negative margins, `100vw`, non-wrapping flex children, wide tables/images | Find overflow source; apply existing container/overflow utilities |
| Element overflows container | Missing `min-width: 0` on flex child, fixed pixel width, long unbroken strings | Use project truncation/wrap/scroll patterns |
| Grid breaks awkwardly | Too many columns for viewport, fixed column widths, missing auto-fit | Match grid collapse pattern from similar pages |
| Text clipped or overflowing | No wrap/truncate utility, fixed height, `white-space: nowrap` | Apply existing text overflow classes |
| Spacing too large on mobile | Desktop padding/margins not reduced at breakpoints | Use token values already scaled for mobile |
| Nav unusable on mobile | Missing collapse, overlapping items, touch targets too small | Reuse existing mobile nav component/pattern |
| Table unusable on mobile | No scroll wrapper or mobile fallback | Copy table responsive pattern from elsewhere in repo |
| Form fields overlap | Multi-column layout without collapse | Stack using existing form layout pattern |
| Modal too wide / clipped | Fixed width without max-width or mobile override | Match modal sizing from existing dialogs |
| Images overflow | Missing responsive image rules | Use project's image component or CSS pattern |
| Wrong content order on mobile | Source order vs visual order | Use existing order utilities if present; avoid reorder hacks if project doesn't use them |
| Hover-only interactions on touch | `:hover` without tap alternative | Follow existing mobile interaction patterns |

## Viewport validation checklist

Test at breakpoints the project defines. If unspecified, check at minimum:

| Viewport | Typical width | Focus |
|----------|---------------|-------|
| Mobile | ~375px | Single column, nav, touch targets, overflow |
| Tablet | ~768px | Intermediate layouts, grid columns, nav transition |
| Desktop | ~1280px+ | Preserve existing behavior; no regressions |

Per page/ component changed, verify:

- [ ] No horizontal overflow on body
- [ ] Content readable without zoom
- [ ] Interactive elements reachable and tappable
- [ ] Navigation functional at each size
- [ ] Tables/forms/modals usable
- [ ] Images scale correctly
- [ ] Desktop layout unchanged unless requested

Use browser devtools, project Storybook/viewport tools, or existing test utilities if available.

## When to ask for confirmation

Stop and ask before:

- Introducing a new breakpoint not in the design system
- Adding a new responsive utility framework or dependency
- Creating a duplicate responsive wrapper/component
- Changing global breakpoint tokens affecting the whole app
- Switching mobile nav paradigm (e.g., header → drawer) when none exists
- Redesigning table/form/modal behavior beyond making it fit
- Implementing a responsive pattern not used anywhere else in the codebase

## Dominant pattern identification

When multiple responsive approaches coexist:

1. Count usage: grep/search for utility prefixes, mixins, or hook names.
2. Prefer patterns in newer or shared/core components over one-off legacy pages.
3. Prefer patterns in the same feature area or route group being modified.
4. If still unclear, ask which pattern to follow before implementing.
