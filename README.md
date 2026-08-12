# AI Dev Toolkit

Portable [Agent Skills](https://agentskills.io) for AI-assisted software development — works across Cursor, Claude Code, Antigravity, GitHub Copilot, Windsurf, and other tools that load `SKILL.md`.

Canonical skills live in [`skills/`](skills/). Install them into your IDE’s project skills folder with the CLI (recommended) or copy manually.

## Quick install

From your project root:

```bash
npx ai-toolkit
```

The interactive wizard walks you through IDE selection, install location, and skill choices. Subcommands are also available:

```bash
npx ai-toolkit init          # setup wizard
npx ai-toolkit add           # add skills to an existing install
npx ai-toolkit list          # show skill catalog
npx ai-toolkit reference     # print reference.md customization prompt
npx ai-toolkit doctor        # verify an installation
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

Prefer **`npx ai-toolkit`** for install; use the guides below for IDE-specific paths and invocation details.

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

Multi-step combinations of skills. Coming soon.

## Prompts

Reusable prompts for debugging, documentation, and analysis. Coming soon.

## Code review

Extended review automation beyond the [ai-code-review](skills/ai-code-review/SKILL.md) skill. Coming soon.

## Husky / Git hooks

Git hook integrations and developer automation. Coming soon.
