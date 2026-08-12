import { select } from "@inquirer/prompts";
import type { IdeConfig, InstallScope } from "../constants/ides.js";
import { resolveInstallPath } from "../constants/ides.js";

export async function promptSelectScope(ide: IdeConfig, copilotPath?: string): Promise<InstallScope> {
  const projectPath = resolveInstallPath(ide, "project", copilotPath);
  const globalPath = resolveInstallPath(ide, "global", copilotPath);

  return select<InstallScope>({
    message: "Install to",
    choices: [
      {
        name: `This project (${projectPath})`,
        value: "project",
      },
      {
        name: `Global (${globalPath})`,
        value: "global",
      },
    ],
  });
}
