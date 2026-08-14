# Windsurf

Install AI Dev Toolkit skills for [Windsurf Cascade](https://docs.devin.ai/desktop/cascade/skills).

## Install

**Recommended** — from your project root:

```bash
npx agentkitx
```

Select **Windsurf** and **This project** when prompted.

**Manual** — from your project root:

```bash
mkdir -p .windsurf/skills
cp -R /path/to/ai-toolkit/skills/* .windsurf/skills/
```

Copy only the skills you need, or copy all and remove unused folders.

Optional (global, all workspaces): `~/.codeium/windsurf/skills/`.

## Invoke

- Auto: Cascade loads a skill when the task matches its description.
- Manual: `@skill-name` in the Cascade input.

## Customize `reference.md`

Update each skill you use **before** implementation or review.

Skills root for the [shared prompt](../../README.md#update-referencemd): `.windsurf/skills`

Example path: `.windsurf/skills/ui-development/reference.md`

## Notes

- Windsurf also discovers `.agents/skills/` (and `.claude/skills/` if Claude config reading is enabled).
- Prefer `.windsurf/skills/` for Windsurf-first projects, or `.agents/skills/` for cross-tool repos.
