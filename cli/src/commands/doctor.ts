import fs from "node:fs";
import chalk from "chalk";
import { select } from "@inquirer/prompts";
import { KNOWN_SKILL_PATHS } from "../constants/ides.js";
import { listInstalledSkills } from "../lib/copy-skills.js";
import { resolveTargetPath } from "../lib/paths.js";
import { error, heading, info, success, warn } from "../lib/ui.js";

export interface DoctorOptions {
  root?: string;
  cwd?: string;
}

function checkSkillFolder(skillDir: string): { valid: string[]; invalid: string[] } {
  const valid: string[] = [];
  const invalid: string[] = [];

  for (const folder of listInstalledSkills(skillDir)) {
    const skillMd = `${skillDir}/${folder}/SKILL.md`;
    const referenceMd = `${skillDir}/${folder}/reference.md`;

    if (fs.existsSync(skillMd) && fs.existsSync(referenceMd)) {
      valid.push(folder);
    } else {
      invalid.push(folder);
    }
  }

  return { valid, invalid };
}

export async function runDoctor(options: DoctorOptions = {}): Promise<boolean> {
  const cwd = options.cwd ?? process.cwd();
  let targetRoot = options.root;

  if (!targetRoot) {
    const existing = KNOWN_SKILL_PATHS.filter((candidate) =>
      fs.existsSync(resolveTargetPath(candidate, cwd)),
    );

    if (existing.length === 0) {
      error("No skills directory found. Run `npx agentkitx init` first.");
      return false;
    }

    if (existing.length === 1) {
      targetRoot = existing[0];
    } else {
      targetRoot = await select({
        message: "Which skills directory should we check?",
        choices: existing.map((path) => ({ name: path, value: path })),
      });
    }
  }

  const targetDir = resolveTargetPath(targetRoot, cwd);

  heading("Installation check");
  info(`Checking ${targetRoot}`);

  if (!fs.existsSync(targetDir)) {
    error(`Directory not found: ${targetDir}`);
    return false;
  }

  const { valid, invalid } = checkSkillFolder(targetDir);

  if (valid.length === 0 && invalid.length === 0) {
    warn("No skill folders found.");
    return false;
  }

  console.log();
  if (valid.length > 0) {
    success(`${valid.length} valid skill${valid.length === 1 ? "" : "s"}:`);
    for (const folder of valid) {
      console.log(`  ${chalk.green("✔")} ${folder}`);
    }
  }

  if (invalid.length > 0) {
    console.log();
    warn(`${invalid.length} incomplete skill${invalid.length === 1 ? "" : "s"}:`);
    for (const folder of invalid) {
      console.log(`  ${chalk.yellow("⚠")} ${folder} (missing SKILL.md or reference.md)`);
    }
  }

  console.log();
  return invalid.length === 0;
}
