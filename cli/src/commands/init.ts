import { select } from "@inquirer/prompts";
import type { InstallContext } from "../types.js";
import { resolveInstallPath } from "../constants/ides.js";
import { copySkills } from "../lib/copy-skills.js";
import { formatDisplayPath, resolveTargetPath } from "../lib/paths.js";
import { printNextSteps, success } from "../lib/ui.js";
import { promptCopilotPath, promptSelectIde } from "../prompts/select-ide.js";
import { promptSelectScope } from "../prompts/select-scope.js";
import { promptOverwriteConflicts, promptSelectSkills } from "../prompts/select-skills.js";

export interface InitOptions {
  force?: boolean;
  cwd?: string;
}

export async function runInit(options: InitOptions = {}): Promise<InstallContext | null> {
  const cwd = options.cwd ?? process.cwd();

  const ide = await promptSelectIde();
  const copilotPath = ide.id === "github-copilot" ? await promptCopilotPath() : undefined;
  const scope = await promptSelectScope(ide, copilotPath);
  const skillFolders = await promptSelectSkills();

  const installPath = resolveInstallPath(ide, scope, copilotPath);
  const targetDir = resolveTargetPath(installPath, cwd);
  const displayPath = formatDisplayPath(installPath, cwd);

  const result = await copySkills({
    skillFolders,
    targetDir,
    force: options.force,
    onConflict: options.force ? undefined : promptOverwriteConflicts,
  });

  if (result.copied.length === 0) {
    return null;
  }

  success(`Installed to ${displayPath}`);
  printNextSteps(installPath, result.copied);

  return {
    ide,
    scope,
    installPath,
    targetDir,
    copilotPath,
    installedSkills: result.copied,
  };
}
