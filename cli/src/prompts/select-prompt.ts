import { select } from "@inquirer/prompts";
import { PROMPTS_CATALOG } from "../constants/prompts-catalog.js";
import type { SetupPromptMeta } from "../types.js";

export async function promptSelectArchitecturePrompt(
  message = "Which Architecture Setup Prompt?",
): Promise<SetupPromptMeta> {
  const choiceId = await select<string>({
    message,
    choices: PROMPTS_CATALOG.map((prompt) => ({
      name: `${prompt.title} (${prompt.category})`,
      value: prompt.id,
      description: prompt.frameworks,
    })),
  });

  return PROMPTS_CATALOG.find((p) => p.id === choiceId)!;
}
