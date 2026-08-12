# ai-toolkit CLI

Interactive CLI for installing [Agent Skills](https://agentskills.io) from this repository into Cursor, Claude Code, GitHub Copilot, Windsurf, Antigravity, and other compatible tools.

## Usage

```bash
npx ai-toolkit              # interactive menu
npx ai-toolkit init         # setup wizard
npx ai-toolkit add          # add skills to existing install
npx ai-toolkit list         # catalog
npx ai-toolkit reference    # reference.md prompt
npx ai-toolkit doctor       # verify install
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

1. Verify the npm name `ai-toolkit` is available (or update `package.json`).
2. Bump version in `package.json`.
3. Run publish (syncs skills and builds automatically):

   ```bash
   npm publish --access public
   ```

4. Smoke test from a temp project:

   ```bash
   npx ai-toolkit@latest list
   npx ai-toolkit@latest init
   ```

## Package layout

```text
cli/
├── bin/ai-toolkit.js   # entry point
├── src/                    # TypeScript source
├── dist/                   # compiled output (gitignored)
├── assets/skills/          # bundled skills at publish (gitignored)
└── scripts/sync-skills.mjs # copies ../skills before publish
```

Skill authors work in the repo root [`skills/`](../skills/) directory — no need to touch `cli/` unless maintaining the package.
