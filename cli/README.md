# agentkitx CLI

Interactive CLI for installing portable [Agent Skills](https://agentskills.io), AI Workflows, Architecture Setup Prompts, and Git Hooks from this repository into Cursor, Claude Code, GitHub Copilot, Windsurf, Antigravity, and other compatible tools.

## Usage

```bash
npx agentkitx              # interactive wizard menu
npx agentkitx setup        # quick setup (skills, workflows, prompts, husky, or all)
npx agentkitx add          # add skills to an existing install
npx agentkitx prompt       # view or copy architecture setup prompts
npx agentkitx reference    # print or copy reference.md customization prompt
npx agentkitx list         # browse catalog (skills, prompts, workflows, templates)
npx agentkitx doctor       # verify installation health
```

## Development

From this directory:

```bash
npm install
npm run dev          # run CLI without building (tsx)
npm run build        # compile to dist/
npm run sync-assets  # copy repo assets → assets/ (skills, prompts, workflows, templates)
```

During local development, the CLI reads assets from the root repo directories when they exist. Published packages use bundled `assets/`.

## Publish checklist

1. Verify the npm name `agentkitx` is available.
2. Bump version in `package.json`.
3. Run publish (syncs all assets and builds automatically):

   ```bash
   npm publish --access public
   ```

4. Smoke test from a temp project:

   ```bash
   npx agentkitx@latest list
   npx agentkitx@latest setup
   ```

## Package layout

```text
cli/
├── bin/agentkitx.js       # entry point
├── src/                   # TypeScript source
├── dist/                  # compiled output (gitignored)
├── assets/                # bundled skills, prompts, workflows, templates at publish
└── scripts/sync-assets.mjs# copies repo assets before publish
```
