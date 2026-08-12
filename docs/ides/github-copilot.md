# GitHub Copilot

Install AI Dev Toolkit skills for [GitHub Copilot](https://docs.github.com/en/copilot/reference/customization-cheat-sheet).

## Install

**Recommended** — from your project root:

```bash
npx ai-dev-toolkit
```

Select **GitHub Copilot** and your preferred project path (`.github/skills` or `.agents/skills`) when prompted.

**Manual** — preferred project path:

```bash
mkdir -p .github/skills
cp -R /path/to/ai-toolkit/skills/* .github/skills/
```

Also supported:

```bash
mkdir -p .agents/skills
cp -R /path/to/ai-toolkit/skills/* .agents/skills/
```

Copy only the skills you need, or copy all and remove unused folders.

Optional (personal): `~/.copilot/skills/` or `~/.agents/skills/`.

## Invoke

- Auto: Copilot loads a skill when the task matches its description.
- Manage skills via Copilot Customizations in the IDE chat panel where available.

## Customize `reference.md`

Update each skill you use **before** implementation or review.

Skills root for the [shared prompt](../../README.md#update-referencemd): `.github/skills` (or `.agents/skills` if you used that path)

Example path: `.github/skills/ui-development/reference.md`

## Notes

- Skills are on-demand. They are not the same as always-on `.github/copilot-instructions.md`.
- Agent skills are supported in VS Code, Copilot CLI, and github.com (JetBrains preview).
- Copilot can also discover `.claude/skills/` if present.
