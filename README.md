# AgentKitX

Portable [Agent Skills](https://agentskills.io) for AI-assisted software development — works across Cursor, Claude Code, Antigravity, GitHub Copilot, Windsurf, and other tools that load `SKILL.md`.

Canonical skills live in `[skills/](skills/)`. Install them into your IDE’s project skills folder with the CLI (recommended) or copy manually.

## Quick install

From your project root:

```bash
npx agentkitx
```

The interactive wizard walks you through IDE selection, install location, and skill choices. Subcommands are also available:

```bash
npx agentkitx init          # setup wizard
npx agentkitx add           # add skills to an existing install
npx agentkitx list          # show skill catalog
npx agentkitx reference     # print reference.md customization prompt
npx agentkitx doctor        # verify an installation
```

## Table of contents

- [Quick install](#quick-install)
- [Choose your IDE](#choose-your-ide)
- [Shared setup](#shared-setup)
- [Skills](#skills)
- [Workflows](#workflows)
- [Prompts](#prompts)
- [Code review](#code-review)
- [Husky / Git hooks](#husky--git-hooks)

## Choose your IDE

Pick your tool and follow its install guide. Each guide covers install path, how to invoke skills, and where to customize `reference.md`.

Prefer `npx agentkitx` for install; use the guides below for IDE-specific paths and invocation details.

| IDE            | Guide                                                      |
| -------------- | ---------------------------------------------------------- |
| Cursor         | [docs/ides/cursor.md](docs/ides/cursor.md)                 |
| Claude Code    | [docs/ides/claude-code.md](docs/ides/claude-code.md)       |
| Antigravity    | [docs/ides/antigravity.md](docs/ides/antigravity.md)       |
| GitHub Copilot | [docs/ides/github-copilot.md](docs/ides/github-copilot.md) |
| Windsurf       | [docs/ides/windsurf.md](docs/ides/windsurf.md)             |

All IDE guides: [docs/ides/](docs/ides/).

If your tool supports `.agents/skills/`, that path is the most portable project install. Prefer the IDE guide for the exact recommended path.

## Shared setup

Do this **after** installing skills into your project, and **before** asking the agent to implement or review code.

### Skill files

| File           | Role                                                                               |
| -------------- | ---------------------------------------------------------------------------------- |
| `SKILL.md`     | Portable workflow and output format. Do not fork unless you are changing behavior. |
| `reference.md` | Project-specific inspection map. Update this for **each skill you plan to use**.   |

### Update `reference.md`

Open your project in your AI IDE and paste this prompt (replace `<skills-root>` with your install folder from the IDE guide, e.g. `.cursor/skills`, and `<skill-name>` with a skill folder name, e.g. `ui-development`):

```text
Inspect this repository and update <skills-root>/<skill-name>/reference.md with project-specific guidance.

Requirements:
- Keep the existing section headings and generic safety guidance
- Replace generic "where to look" hints with our actual paths (components, services, styles, tests, API layer, auth)
- Document our stack: framework, styling system, state/data layer, HTTP client, test runner
- Add 3–5 concrete examples: real file paths + the pattern they demonstrate
- Do not invent conventions — only document what exists in this repo

Skill to update: <skill-name>
```

Run once per skill when onboarding a project. Re-run when architecture or conventions change significantly.

## Skills

Reusable Agent Skills for specific development tasks. Source of truth: `skills/<name>/`.

**How they work:**

- The agent reads `SKILL.md` for workflow and output format.
- The agent reads `reference.md` during inspection for repo-specific signals.
- Skills are framework-agnostic — your project's existing conventions always win.

### Catalog

| Skill                                                                        | Use when                                           | Files                                                                                                                       |
| ---------------------------------------------------------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| [ui-development](skills/ui-development/SKILL.md)                             | Figma, mockups, wireframes, new screens            | [SKILL.md](skills/ui-development/SKILL.md) · [reference.md](skills/ui-development/reference.md)                             |
| [api-integration](skills/api-integration/SKILL.md)                           | Wiring UI to backend, new endpoints, service layer | [SKILL.md](skills/api-integration/SKILL.md) · [reference.md](skills/api-integration/reference.md)                           |
| [responsive-design](skills/responsive-design/SKILL.md)                       | Layout overflow, mobile/tablet fixes, breakpoints  | [SKILL.md](skills/responsive-design/SKILL.md) · [reference.md](skills/responsive-design/reference.md)                       |
| [ai-code-review](skills/ai-code-review/SKILL.md)                             | PR review, diff review, frontend code review       | [SKILL.md](skills/ai-code-review/SKILL.md) · [reference.md](skills/ai-code-review/reference.md)                             |
| [frontend-security-auditor](skills/frontend-security-auditor/SKILL.md)       | Security audit, XSS, auth/token risks              | [SKILL.md](skills/frontend-security-auditor/SKILL.md) · [reference.md](skills/frontend-security-auditor/reference.md)       |
| [frontend-test-case-generator](skills/frontend-test-case-generator/SKILL.md) | Test plans, QA scenarios, coverage for UI/features | [SKILL.md](skills/frontend-test-case-generator/SKILL.md) · [reference.md](skills/frontend-test-case-generator/reference.md) |

## Workflows

A complete 7-stage AI development pipeline (`intake` → `research` → `plan` → `implement` → `test` → `review` → `ship`) supporting human-in-the-loop gating, automatic sizing, and repository-specific configuration via `reference.md`. Works across Claude Code, GitHub Copilot, Cursor, Antigravity, and Windsurf.

See [`workflows/README.md`](workflows/README.md) and [`workflows/HOWTO-AI-WORKFLOW.md`](workflows/HOWTO-AI-WORKFLOW.md) for complete details.

### Quick install

Copy the workflow template files into your repository:

```bash
cp -R workflows/.github .github/          # Copilot prompts + issue templates
cp -R workflows/.claude .claude/          # Claude Code / Antigravity skills
cp workflows/HOWTO-AI-WORKFLOW.md ./docs/ # Workflow guide
cp workflows/reference.md ./              # Project reference configuration
```

### Customization prompt

After copying files into your project, open your AI IDE in **Plan mode** and paste this prompt:

```text
Customize the AI development workflow for this repository.

1. Read workflows/reference.md (or ./reference.md if copied to project root) and inspect this codebase.
2. Ask me clarifying questions for anything you cannot infer confidently:
   - Issue tracker (Jira, GitHub Issues, Linear, none) and ticket key pattern
   - Branch naming and commit message conventions
   - Lint, build, and test commands
   - Security-sensitive paths that should trigger GATE 3 (or confirm none)
   - Manual QA areas I should verify before each PR
   - Related repos/services for cross-team impact
   - Which AI IDE I use (Cursor, Claude Code, Copilot, Antigravity)
3. After I answer, update reference.md with real values only — do not invent conventions.
4. Update GitHub issue templates (ticket placeholder, affected-area options) to match this project.
5. Update HOWTO-AI-WORKFLOW.md quick-start examples with our project name and ticket format.
6. If I use Cursor and domain-specific rules would help, propose .cursor/rules/workflow-*.mdc files that reference reference.md — do not embed project specifics in SKILL.md or prompt files.

Keep .claude/skills/*/SKILL.md and .github/prompts/*.prompt.md generic; they must read reference.md at runtime.
Present a plan first; apply edits only after I approve.
```

## Prompts

Reusable, battle-tested quick setup prompts for repository boilerplate, core frontend architecture, and infrastructure integrations across React, Next.js, Vue, Svelte, and TypeScript projects.

Catalog guide: [`prompts/README.md`](prompts/README.md)

| Setup Prompt | Category | Infrastructure Focus | File |
| ------------ | -------- | -------------------- | ---- |
| [Auth Guards Setup](prompts/auth-guards-setup.md) | Security / Routing | Protected routes, Auth Context, role-based guards, & redirect logic | [auth-guards-setup.md](prompts/auth-guards-setup.md) |
| [Layouts Setup](prompts/layouts-setup.md) | Architecture | App Shell, Dashboard layout (Header/Sidebar), Auth layout, & Error Boundaries | [layouts-setup.md](prompts/layouts-setup.md) |
| [React Query Setup](prompts/react-query-setup.md) | Data Fetching | TanStack Query client defaults, Provider, Devtools, & Query Key Factory | [react-query-setup.md](prompts/react-query-setup.md) |
| [Firebase Setup](prompts/firebase-setup.md) | Backend / BaaS | Firebase SDK (Auth, Firestore, Storage) with env validation & typed hooks | [firebase-setup.md](prompts/firebase-setup.md) |
| [API Client Setup](prompts/api-client-setup.md) | Networking | Axios / Fetch client, Bearer token injection, refresh token rotation, & error handling | [api-client-setup.md](prompts/api-client-setup.md) |
| [State Store Setup](prompts/state-store-setup.md) | State Management | Zustand / Redux / Pinia store setup with TypeScript, persist middleware, & devtools | [state-store-setup.md](prompts/state-store-setup.md) |
| [Theme Provider Setup](prompts/theme-provider-setup.md) | UI System | Light/Dark mode provider, OS color scheme detection, & CSS variables setup | [theme-provider-setup.md](prompts/theme-provider-setup.md) |



## Code review

Extended review automation beyond the [ai-code-review](skills/ai-code-review/SKILL.md) skill. Coming soon.

## Husky / Git hooks

Copy-paste Git hook templates for **lint/format on staged files**, **full-project typecheck**, and **Conventional Commits**. Minimal wiring only — your project should already have eslint, prettier, and TypeScript set up.

| Hook | Action |
| ---- | ------ |
| `pre-commit` | lint-staged → `tsc --noEmit` |
| `commit-msg` | commitlint (conventional commits) |

Templates live in [`templates/husky/`](templates/husky/). See [templates/husky/README.md](templates/husky/README.md) for install steps, verification, and customization.
