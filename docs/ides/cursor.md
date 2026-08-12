# Cursor

Install AI Dev Toolkit skills for [Cursor](https://cursor.com).

## Install

From your project root:

```bash
mkdir -p .cursor/skills
cp -R /path/to/ai-dev-toolkit/skills/* .cursor/skills/
```

Copy only the skills you need, or copy all and remove unused folders.

Optional (personal, all projects): `~/.cursor/skills/`.

## Invoke

- Auto: Agent applies a skill when the task matches its description.
- Manual: `/skill-name` in chat, or `@` and select the skill.

## Customize `reference.md`

Update each skill you use **before** implementation or review.

Skills root for the [shared prompt](../../README.md#update-referencemd): `.cursor/skills`

Example path: `.cursor/skills/ui-development/reference.md`

## Notes

- Cursor also discovers `.agents/skills/` and `.claude/skills/` — useful for repos shared across tools.
- Prefer `.cursor/skills/` for Cursor-first projects unless you need a shared path.
