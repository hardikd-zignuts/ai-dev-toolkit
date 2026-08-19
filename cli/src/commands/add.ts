import { confirm } from "@inquirer/prompts";
import type { InstallContext } from "../types.js";
import { IDES, resolveInstallPath } from "../constants/ides.js";
import { copySkills, detectExistingInstall } from "../lib/copy-skills.js";
import { formatDisplayPath, resolveTargetPath } from "../lib/paths.js";
import { info, printNextSteps, success } from "../lib/ui.js";
import { promptCopilotPath, promptSelectIde } from "../prompts/select-ide.js";
import { promptSelectScope } from "../prompts/select-scope.js";
import { promptOverwriteConflicts, promptSelectSkills } from "../prompts/select-skills.js";

export interface AddOptions {
  force?: boolean;
  cwd?: string;
}

async function resolveTargetFromExisting(cwd: string): Promise<{ installPath: string; targetDir: string } | null> {
  const existing = detectExistingInstall(cwd);
  if (!existing) return null;

  const useExisting = await confirm({
    message: `Detected existing install at ${existing}. Add skills there?`,
    default: true,
  });

  if (!useExisting) return null;

  return {
    installPath: existing,
    targetDir: resolveTargetPath(existing, cwd),
  };
}

async function promptForTarget(cwd: string): Promise<{ installPath: string; targetDir: string }> {
  const existing = await resolveTargetFromExisting(cwd);
  if (existing) return existing;

  const ide = await promptSelectIde("Which IDE install should we add to?");
  const copilotPath = ide.id === "github-copilot" ? await promptCopilotPath() : undefined;
  const scope = await promptSelectScope(ide, copilotPath);
  const installPath = resolveInstallPath(ide, scope, copilotPath);

  return {
    installPath,
    targetDir: resolveTargetPath(installPath, cwd),
  };
}

export async function runAdd(options: AddOptions = {}): Promise<InstallContext | null> {
  const cwd = options.cwd ?? process.cwd();
  const { installPath, targetDir } = await promptForTarget(cwd);
  const skillFolders = await promptSelectSkills("Which skills to add?");

  const displayPath = formatDisplayPath(installPath, cwd);

  info(`Adding to ${displayPath}`);

  const result = await copySkills({
    skillFolders,
    targetDir,
    force: options.force,
    onConflict: options.force ? undefined : promptOverwriteConflicts,
  });

  if (result.copied.length === 0) {
    return null;
  }

  success(`Added ${result.copied.length} skill${result.copied.length === 1 ? "" : "s"} to ${displayPath}`);
  printNextSteps(installPath, result.copied);

  const matchedIde = IDES.find(
    (ide) =>
      installPath === ide.projectPath ||
      installPath === ide.altProjectPath ||
      installPath === ide.globalPath,
  );

  return {
    ide: matchedIde ?? IDES[0],
    scope: installPath.startsWith("~") ? "global" : "project",
    installPath,
    targetDir,
    installedSkills: result.copied,
  };
}
