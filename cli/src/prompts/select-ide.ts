import { select } from "@inquirer/prompts";
import { IDES, type IdeConfig, type IdeId } from "../constants/ides.js";

export async function promptSelectIde(message = "Which IDE?"): Promise<IdeConfig> {
  const choice = await select<IdeId>({
    message,
    choices: IDES.map((ide) => ({
      name: ide.name,
      value: ide.id,
      description: ide.projectPath,
    })),
  });

  return IDES.find((ide) => ide.id === choice)!;
}

export async function promptCopilotPath(): Promise<string> {
  return select({
    message: "Preferred project path for GitHub Copilot?",
    choices: [
      {
        name: ".github/skills (recommended)",
        value: ".github/skills",
      },
      {
        name: ".agents/skills (cross-tool)",
        value: ".agents/skills",
      },
    ],
  });
}
