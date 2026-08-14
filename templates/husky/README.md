# Husky templates

Copy-paste Git hook templates for user projects. These wire **lint-staged** (eslint + prettier on staged files), a full-project **typecheck**, and **Conventional Commits** via commitlint.

## What runs on commit

| Hook         | Action                                                                       |
| ------------ | ---------------------------------------------------------------------------- |
| `pre-commit` | `lint-staged` (eslint --fix + prettier on staged files), then `tsc --noEmit` |
| `commit-msg` | commitlint with `@commitlint/config-conventional`                            |

## Files

| File                             | Copy to (in your project) | Purpose                                    |
| -------------------------------- | ------------------------- | ------------------------------------------ |
| `husky/pre-commit`               | `.husky/pre-commit`       | Runs lint-staged, then `npm run typecheck` |
| `husky/commit-msg`               | `.husky/commit-msg`       | Validates commit message with commitlint   |
| `lint-staged.config.example.mjs` | `lint-staged.config.mjs`  | Staged-file lint/format commands           |
| `commitlint.config.example.mjs`  | `commitlint.config.mjs`   | Conventional Commits rules                 |
| `package.json.snippet`           | merge into `package.json` | Scripts and devDependencies                |

## Prerequisites

- Node.js 18+
- Existing `eslint`, `prettier`, and `typescript` setup in the target project
- A `tsconfig.json` that supports `tsc --noEmit`

This template only adds Husky wiring — it does not scaffold linter or TypeScript configs.

## Install

From your **project root**:

1. **Install dev dependencies** — merge values from [`package.json.snippet`](package.json.snippet):

   ```bash
   npm install --save-dev husky lint-staged @commitlint/cli @commitlint/config-conventional
   ```

2. **Add scripts** to your `package.json`:

   ```json
   {
     "scripts": {
       "prepare": "husky",
       "typecheck": "tsc --noEmit"
     }
   }
   ```

3. **Copy hook files** to `.husky/` and make them executable:

   ```bash
   mkdir -p .husky
   cp path/to/ai-dev-toolkit/templates/husky/husky/pre-commit .husky/pre-commit
   cp path/to/ai-dev-toolkit/templates/husky/husky/commit-msg .husky/commit-msg
   chmod +x .husky/pre-commit .husky/commit-msg
   ```

4. **Copy config files** to your project root:

   ```bash
   cp path/to/ai-dev-toolkit/templates/husky/lint-staged.config.example.mjs lint-staged.config.mjs
   cp path/to/ai-dev-toolkit/templates/husky/commitlint.config.example.mjs commitlint.config.mjs
   ```

5. **Wire Git hooks** (once after install):

   ```bash
   npm run prepare
   ```

## Verify

1. Stage a file with a lint issue — `git commit` should fail at the pre-commit hook.
2. Fix lint, then commit with a bad message (e.g. `bad message`) — commit-msg should reject it.
3. Commit with a valid message (e.g. `feat: add login form`) — both hooks should pass.

## CommonJS projects

If your project does not use `"type": "module"`, rename the config files to `.cjs` and use `module.exports`:

```js
module.exports = {
  extends: ["@commitlint/config-conventional"],
};
```

## Customize

- Adjust lint-staged globs and commands in `lint-staged.config.mjs` to match your stack (e.g. add `*.vue`, swap eslint for biome).
- Change the typecheck script if you use a different command (e.g. `vue-tsc --noEmit`).
- Extend commitlint rules in `commitlint.config.mjs` for team-specific message policies.
