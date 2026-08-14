import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";
import { KNOWN_SKILL_PATHS } from "../constants/ides.js";

export interface DoctorOptions {
  root?: string;
  cwd?: string;
}

export async function runDoctor(options: DoctorOptions = {}): Promise<void> {
  const cwd = options.cwd ?? process.cwd();
  console.log(chalk.bold("\n🩺 AgentKitX System & Installation Doctor\n"));

  let foundInstalls = 0;
  const pathsToCheck = options.root ? [options.root] : KNOWN_SKILL_PATHS;

  for (const relPath of pathsToCheck) {
    const fullPath = path.resolve(cwd, relPath);
    if (!fs.existsSync(fullPath)) continue;

    foundInstalls++;
    console.log(chalk.green(`✓ Found skill installation at: ${relPath}`));

    const entries = fs.readdirSync(fullPath, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const skillName = entry.name;
      const skillDir = path.join(fullPath, skillName);
      const skillFile = path.join(skillDir, "SKILL.md");
      const refFile = path.join(skillDir, "reference.md");

      const hasSkill = fs.existsSync(skillFile);
      const hasRef = fs.existsSync(refFile);

      if (hasSkill && hasRef) {
        console.log(`  └─ ${chalk.cyan(skillName)}: SKILL.md [✓], reference.md [✓]`);
      } else if (hasSkill) {
        console.log(`  └─ ${chalk.yellow(skillName)}: SKILL.md [✓], reference.md [✗ missing]`);
      } else {
        console.log(`  └─ ${chalk.red(skillName)}: Invalid skill directory`);
      }
    }
  }

  if (foundInstalls === 0) {
    console.log(chalk.yellow("! No skill installations detected in standard project locations."));
    console.log(chalk.dim("  Run 'npx agentkitx setup' to install skills into your IDE."));
  }

  console.log(chalk.bold("\n🔄 AI Workflows Check:"));
  const hasGithubWf = fs.existsSync(path.join(cwd, ".github", "prompts"));
  const hasClaudeWf = fs.existsSync(path.join(cwd, ".claude", "skills"));
  const hasWfRef = fs.existsSync(path.join(cwd, "workflows-reference.md")) || fs.existsSync(path.join(cwd, "reference.md"));

  if (hasGithubWf || hasClaudeWf) {
    console.log(chalk.green(`✓ AI Workflows active (GitHub: ${hasGithubWf ? "yes" : "no"}, Claude: ${hasClaudeWf ? "yes" : "no"})`));
    console.log(`  └─ reference.md status: ${hasWfRef ? chalk.green("✓ Present") : chalk.yellow("⚠ Missing (run 'npx agentkitx setup --type workflow')")}`);
  } else {
    console.log(chalk.dim("  No active AI Workflows pipeline found."));
  }

  console.log(chalk.bold("\n⚓ Git Hooks / Husky Check:"));
  const hasPreCommit = fs.existsSync(path.join(cwd, ".husky", "pre-commit"));
  const hasCommitMsg = fs.existsSync(path.join(cwd, ".husky", "commit-msg"));

  if (hasPreCommit || hasCommitMsg) {
    console.log(chalk.green(`✓ Git Hooks installed (pre-commit: ${hasPreCommit ? "yes" : "no"}, commit-msg: ${hasCommitMsg ? "yes" : "no"})`));
  } else {
    console.log(chalk.dim("  No .husky git hooks found."));
  }

  console.log();
}
