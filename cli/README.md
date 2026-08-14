# agentkitx CLI

Interactive CLI for installing [Agent Skills](https://agentskills.io) from this repository into Cursor, Claude Code, GitHub Copilot, Windsurf, Antigravity, and other compatible tools.

## Usage

```bash
npx agentkitx              # interactive menu
npx agentkitx init         # setup wizard
npx agentkitx add          # add skills to existing install
npx agentkitx list         # catalog
npx agentkitx reference    # reference.md prompt
npx agentkitx doctor       # verify install
```

## Development

From this directory:

```bash
npm install
npm run dev          # run CLI without building (tsx)
npm run build        # compile to dist/
npm run sync-skills  # copy ../skills → assets/skills/
```

During local development, the CLI reads skills from `../skills/` when that directory exists. Published packages use bundled `assets/skills/`.

## Publish checklist

1. Verify the npm name `agentkitx` is available (or update `package.json`).
2. Bump version in `package.json`.
3. Run publish (syncs skills and builds automatically):

   ```bash
   npm publish --access public
   ```

4. Smoke test from a temp project:

   ```bash
   npx agentkitx@latest list
   npx agentkitx@latest init
   ```

## Package layout

```text
cli/
├── bin/agentkitx.js       # entry point
├── src/                    # TypeScript source
├── dist/                   # compiled output (gitignored)
├── assets/skills/          # bundled skills at publish (gitignored)
└── scripts/sync-skills.mjs # copies ../skills before publish
```

Skill authors work in the repo root [`skills/`](../skills/) directory — no need to touch `cli/` unless maintaining the package.
