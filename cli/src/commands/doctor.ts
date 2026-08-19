import fs from "node:fs";
import path from "node:path";
import { KNOWN_SKILL_PATHS } from "../constants/ides.js";
import { heading, muted, success, warn } from "../lib/ui.js";

export interface DoctorOptions {
  root?: string;
  cwd?: string;
}

export async function runDoctor(options: DoctorOptions = {}): Promise<void> {
  const cwd = options.cwd ?? process.cwd();
  heading("Check install");

  let foundInstalls = 0;
  const pathsToCheck = options.root ? [options.root] : KNOWN_SKILL_PATHS;

  heading("Skills");
  for (const relPath of pathsToCheck) {
    const fullPath = path.resolve(cwd, relPath);
    if (!fs.existsSync(fullPath)) continue;

    foundInstalls++;
    success(`Found skills at ${relPath}`);

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
        console.log(`  - ${skillName}: SKILL.md [ok], reference.md [ok]`);
      } else if (hasSkill) {
        console.log(`  - ${skillName}: SKILL.md [ok], reference.md [missing]`);
      } else {
        console.log(`  - ${skillName}: invalid skill directory`);
      }
    }
  }

  if (foundInstalls === 0) {
    warn("No skill installations found in standard project locations.");
    muted("  Run npx agentkitx setup to install skills into your IDE.");
  }

  heading("Workflows");
  const hasGithubWf = fs.existsSync(path.join(cwd, ".github", "prompts"));
  const hasWfRef = fs.existsSync(path.join(cwd, "workflows-reference.md"));

  if (hasGithubWf) {
    success("Workflows installed (.github/prompts)");
    if (hasWfRef) {
      success("workflows-reference.md present");
    } else {
      warn("workflows-reference.md missing. Run: npx agentkitx setup");
    }
  } else {
    muted("No workflows found (.github/prompts).");
  }

  heading("Git hooks");
  const hasPreCommit = fs.existsSync(path.join(cwd, ".husky", "pre-commit"));
  const hasCommitMsg = fs.existsSync(path.join(cwd, ".husky", "commit-msg"));

  if (hasPreCommit || hasCommitMsg) {
    success(`Git hooks installed (pre-commit: ${hasPreCommit ? "yes" : "no"}, commit-msg: ${hasCommitMsg ? "yes" : "no"})`);
  } else {
    muted("No .husky git hooks found.");
  }

  console.log();
}
