# Antigravity

Install AI Dev Toolkit skills for [Google Antigravity](https://codelabs.developers.google.com/getting-started-with-antigravity-skills).

## Install

From your project root:

```bash
mkdir -p .agents/skills
cp -R /path/to/ai-dev-toolkit/skills/* .agents/skills/
```

Copy only the skills you need, or copy all and remove unused folders.

Optional (global, all projects): `~/.gemini/config/skills/`.

## Invoke

- Auto: The agent indexes each skill’s `name` and `description`, then loads full instructions when the task matches.
- Supporting files (`reference.md`, scripts) load with the skill when relevant.

## Customize `reference.md`

Update each skill you use **before** implementation or review.

Skills root for the [shared prompt](../../README.md#update-referencemd): `.agents/skills`

Example path: `.agents/skills/ui-development/reference.md`

## Notes

- `.agents/skills/` is the cross-tool project path — good if the same repo is used with Cursor or Copilot.
- CLI and IDE global paths can differ; prefer project `.agents/skills/` for team-shared skills.
