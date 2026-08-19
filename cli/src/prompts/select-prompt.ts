import chalk from "chalk";
import { select } from "@inquirer/prompts";
import { PROMPTS_TREE } from "../constants/prompts-catalog.js";
import type { PromptTreeNode, SetupPromptMeta } from "../types.js";

const BACK = "__back__";

function asMeta(node: Extract<PromptTreeNode, { type: "prompt" }>): SetupPromptMeta {
  return {
    id: node.id,
    title: node.title,
    summary: node.summary,
    category: node.category,
    frameworks: node.frameworks,
    fileName: node.fileName,
    filePath: "",
  };
}

export async function promptSelectArchitecturePrompt(
  message = "Which feature do you want to add? You will copy a prompt to paste into your AI IDE.",
): Promise<SetupPromptMeta> {
  const stack: PromptTreeNode[][] = [PROMPTS_TREE];

  while (true) {
    const current = stack.at(-1)!;
    const isRoot = stack.length === 1;
    const titleWidth = Math.max(
      ...current.map((node) => node.title.length),
      isRoot ? 0 : 6,
    );

    const choiceId = await select<string>({
      message: isRoot ? message : "Select a category or prompt",
      choices: [
        ...(!isRoot
          ? [
              {
                name: "← Back",
                value: BACK,
              },
            ]
          : []),
        ...current.map((node) => ({
          name: `${node.title.padEnd(titleWidth)}  ${chalk.dim(node.summary)}`,
          value: node.id,
        })),
      ],
    });

    if (choiceId === BACK) {
      stack.pop();
      continue;
    }

    const selected = current.find((node) => node.id === choiceId);
    if (!selected) {
      continue;
    }

    if (selected.type === "group") {
      stack.push(selected.children);
      continue;
    }

    return asMeta(selected);
  }
}
