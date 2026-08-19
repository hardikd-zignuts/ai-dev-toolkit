import chalk from "chalk";
import { select } from "@inquirer/prompts";
import { PROMPTS_CATALOG } from "../constants/prompts-catalog.js";
import type { SetupPromptMeta } from "../types.js";

export async function promptSelectArchitecturePrompt(
  message = "Which feature do you want to add? You will copy a prompt to paste into your AI IDE.",
): Promise<SetupPromptMeta> {
  const titleWidth = Math.max(...PROMPTS_CATALOG.map((prompt) => prompt.title.length));

  const choiceId = await select<string>({
    message,
    choices: PROMPTS_CATALOG.map((prompt) => ({
      name: `${prompt.title.padEnd(titleWidth)}  ${chalk.dim(prompt.summary)}`,
      value: prompt.id,
    })),
  });

  return PROMPTS_CATALOG.find((p) => p.id === choiceId)!;
}
