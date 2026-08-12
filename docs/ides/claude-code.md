# Claude Code

Install AI Dev Toolkit skills for [Claude Code](https://code.claude.com).

## Install

From your project root:

```bash
mkdir -p .claude/skills
cp -R /path/to/ai-dev-toolkit/skills/* .claude/skills/
```

Copy only the skills you need, or copy all and remove unused folders.

Optional (personal, all projects): `~/.claude/skills/`.

## Invoke

- Auto: Claude loads a skill when the task matches its description.
- Manual: `/skill-name` (directory name under `.claude/skills/`).

## Customize `reference.md`

Update each skill you use **before** implementation or review.

Skills root for the [shared prompt](../../README.md#update-referencemd): `.claude/skills`

Example path: `.claude/skills/ui-development/reference.md`

## Notes

- Keep always-on project facts in `CLAUDE.md`; keep multi-step workflows in skills so they load on demand.
- New top-level skills directories may need a session restart to be discovered.
