import { select } from "@inquirer/prompts";
import { printBanner } from "./lib/ui.js";
import type { MenuAction } from "./types.js";
import { runSetup } from "./commands/setup.js";
import { runAdd } from "./commands/add.js";
import { runList } from "./commands/list.js";
import { runReference } from "./commands/reference.js";
import { runPromptCmd } from "./commands/prompt-cmd.js";

export async function runInteractiveMenu(): Promise<void> {
  printBanner();

  const action = await select<MenuAction>({
    message: "What would you like to do?",
    choices: [
      {
        name: "Set up this project",
        value: "setup",
        description: "Install skills, workflows, and git hooks into your IDE",
      },
      {
        name: "Add skills",
        value: "add",
        description: "Add more skills to an existing install",
      },
      {
        name: "Adapt skills to this project",
        value: "reference",
        description: "Get a prompt that fills in your stack and file paths so skills work here",
      },
      {
        name: "Copy a prompt to add app features",
        value: "prompts",
        description:
          "Auth, OAuth, RBAC, layouts, API, and more — paste it into your AI IDE",
      },
      {
        name: "Browse catalog",
        value: "list",
        description: "See available skills, workflows, prompts, and templates",
      },
      {
        name: "Exit",
        value: "exit",
        description: "Close the wizard",
      },
    ],
  });

  switch (action) {
    case "setup":
      await runSetup();
      break;
    case "add":
      await runAdd();
      break;
    case "reference":
      await runReference();
      break;
    case "prompts":
      await runPromptCmd();
      break;
    case "list":
      runList();
      break;
    case "exit":
      break;
  }
}
