# AI Development Workflow — Repository Reference

This file is the single customization surface for the 7-stage AI development workflow (`intake` → `research` → `plan` → `implement` → `test` → `review` → `ship`). Customize this file for your repository after copying `workflows/` into your project.

---

## Project identity

| Signal | Value | Inspection hints / Default |
|--------|-------|----------------------------|
| Project name | `<project-name>` | e.g. `my-awesome-app` |
| Repository URL | `<repo-url>` | e.g. `https://github.com/org/repo` |
| Base path / Deploy URL | `/` | App base path (e.g. `/`, `/app/`) or staging URL |

---

## Ticket source

| Config | Value | Notes |
|--------|-------|-------|
| Tracker type | `github-issues` | `jira` \| `github-issues` \| `linear` \| `none` |
| Ticket key format | `PROJ-###` | e.g. `PROJ-###`, `#123`, `ENG-###` |
| Primary fetcher | `gh` | Atlassian MCP (`plugin-atlassian-atlassian`) \| `gh issue view` \| `linear` \| `user-paste` |
| Fallback | `user-paste` | Ask user to paste ticket details if CLI/MCP unavailable |

---

## Stack

| Layer | Value / Choice | Inspection hints |
|-------|----------------|------------------|
| Language | `TypeScript` | TypeScript \| JavaScript \| Python \| Go \| Rust \| etc. |
| Framework | `<framework>` | React 18 \| Next.js \| Vue \| Svelte \| FastAPI \| Express \| etc. |
| Build tool | `<build-tool>` | Vite \| Webpack \| Next.js \| Cargo \| Go build \| etc. |
| Styling | `<styling>` | Tailwind CSS \| CSS Modules \| Styled Components \| MUI \| etc. |
| State & Data | `<state-management>` | React Query \| Redux Toolkit \| Zustand \| Pinia \| etc. |
| Form handling | `<forms>` | React Hook Form \| Zod / Yup \| Native \| etc. |
| Notifications / Toasts | `<toasts>` | Sonner \| Toastify \| Native \| etc. |
| Test runner | `<test-runner>` | Vitest \| Jest \| Playwright \| Pytest \| none |

---

## Paths & aliases

| Key | Path / Alias | Description |
|-----|--------------|-------------|
| Source root | `src/` | Primary source code folder |
| Import alias | `@/` | Import path mapping for source root |
| API layer | `src/api/` | HTTP client, API handlers, query hooks |
| Components | `src/components/` | Shared UI components |
| Utilities | `src/utils/` | Shared helper functions |
| Tests | `tests/` | Unit, integration, or E2E tests |

---

## Branch & commits

| Rule | Pattern / Convention |
|------|----------------------|
| Feature branch pattern | `feat/{TICKET-ID}-{short-desc}` |
| Bugfix branch pattern | `fix/{TICKET-ID}-{short-desc}` |
| Commit message format | Conventional Commits (`feat({TICKET-ID}): message`, `fix({TICKET-ID}): message`) |

---

## QA commands

| Command type | Command | Notes |
|--------------|---------|-------|
| Lint | `npm run lint` | Run before committing |
| Type check | `npm run typecheck` | Run if TypeScript is configured |
| Build | `npm run build` | Required pass before shipping |
| Unit / Integration tests | `npm test` | Set to `N/A` if no test runner configured |

---

## Manual QA domains

Use this table during `/test` and `/ship` to perform targeted browser verification:

| Domain | Key user flows to verify | Sensitive path indicators |
|--------|--------------------------|---------------------------|
| Authentication | Login, session persistence, logout, token refresh | `src/auth/`, `src/context/Auth*` |
| Core Feature | Primary workflow navigation, form submission, data rendering | `src/pages/`, `src/features/` |
| UI & Layout | Responsive layout, dark mode, toast notifications | `src/components/ui/`, `src/styles/` |

---

## Security gate (GATE 3)

Configure sensitive files or modules that require an explicit Security Review (GATE 3) during `/feature` or `/plan`:

| Config | Value / List |
|--------|--------------|
| **Trigger paths** | `src/auth/**`, `src/security/**`, `src/payments/**` *(Glob patterns relative to repo root. Leave empty if GATE 3 is disabled)* |
| **Required reading** | `docs/security.md` *(Security guidelines doc to read before approving GATE 3, or `N/A`)* |
| **When to skip** | Skip GATE 3 automatically if no trigger paths are touched in the plan/diff. |

---

## Do-not-touch

Files or functions the agent must **never** modify without explicit user authorization:

- Production configuration (`vite.config.ts`, `next.config.js`, etc.)
- Auth/Encryption core (`src/auth/crypto.ts`)
- Database migrations or schema files (`prisma/schema.prisma`)

---

## Cross-team impact

Services, portals, or backend repositories to check for breaking changes during `intake`:

- Backend API service
- Admin portal
- Shared design system package

---

## Hard rules

Non-negotiable conventions discovered from codebase (add real repo conventions here):

1. **No direct DOM manipulation** — use framework reactive state.
2. **Never commit raw console.log** in production code.
3. **Only `/ship` commits** — never create git commits during `/implement`.

---

## Optional Cursor rules

If using Cursor, specify MDC rules to load:

| Rule Name | File Glob | Description |
|-----------|-----------|-------------|
| `workflow-conventions` | `.cursor/rules/workflow-conventions.mdc` | Project-specific architecture rules |
