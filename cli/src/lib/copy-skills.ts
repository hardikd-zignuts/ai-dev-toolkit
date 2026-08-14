import fs from "node:fs";
import path from "node:path";
import fse from "fs-extra";
import ora from "ora";
import { getSkillsSourceDir } from "./skills-source.js";
import { success, warn } from "./ui.js";

export interface CopySkillsOptions {
  skillFolders: string[];
  targetDir: string;
  force?: boolean;
  onConflict?: () => Promise<boolean>;
}

export interface CopySkillsResult {
  copied: string[];
  skipped: string[];
}

function skillExistsInTarget(targetDir: string, folder: string): boolean {
  return fs.existsSync(path.join(targetDir, folder));
}

export async function copySkills(options: CopySkillsOptions): Promise<CopySkillsResult> {
  const { skillFolders, targetDir, force = false, onConflict } = options;
  const sourceDir = getSkillsSourceDir();

  await fse.ensureDir(targetDir);

  const copied: string[] = [];
  const skipped: string[] = [];

  const spinner = ora("Installing skills...").start();

  for (const folder of skillFolders) {
    const source = path.join(sourceDir, folder);
    const dest = path.join(targetDir, folder);

    if (!fs.existsSync(source)) {
      spinner.warn(`Skill not found: ${folder}`);
      skipped.push(folder);
      continue;
    }

    if (skillExistsInTarget(targetDir, folder) && !force) {
      if (onConflict) {
        const shouldOverwrite = await onConflict();
        if (!shouldOverwrite) {
          skipped.push(folder);
          continue;
        }
      } else {
        skipped.push(folder);
        continue;
      }
    }

    await fse.copy(source, dest, { overwrite: true });
    copied.push(folder);
  }

  if (copied.length > 0) {
    spinner.succeed(`Installed ${copied.length} skill${copied.length === 1 ? "" : "s"}`);
  } else {
    spinner.warn("No skills were installed");
  }

  if (skipped.length > 0) {
    warn(`Skipped ${skipped.length}: ${skipped.join(", ")}`);
  }

  return { copied, skipped };
}

export function detectExistingInstall(cwd = process.cwd()): string | null {
  const candidates = [
    ".cursor/skills",
    ".claude/skills",
    ".windsurf/skills",
    ".github/skills",
    ".agents/skills",
  ];

  for (const candidate of candidates) {
    const fullPath = path.resolve(cwd, candidate);
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
      const hasSkills = fs.readdirSync(fullPath).some((entry) => {
        const entryPath = path.join(fullPath, entry);
        return fs.statSync(entryPath).isDirectory();
      });
      if (hasSkills) {
        return candidate;
      }
    }
  }

  return null;
}

export function listInstalledSkills(targetDir: string): string[] {
  if (!fs.existsSync(targetDir)) return [];

  return fs
    .readdirSync(targetDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}
