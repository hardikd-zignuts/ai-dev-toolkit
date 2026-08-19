import { select } from "@inquirer/prompts";
import { printBanner } from "./lib/ui.js";
import type { MenuAction } from "./types.js";
import { runSetup } from "./commands/setup.js";
import { runAdd } from "./commands/add.js";
import { runList } from "./commands/list.js";
import { runReference } from "./commands/reference.js";
import { runPromptCmd } from "./commands/prompt-cmd.js";
import { runDoctor } from "./commands/doctor.js";

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
        name: "Customize docs",
        value: "reference",
        description: "Generate a prompt to fill in reference.md for your project",
      },
      {
        name: "View architecture prompts",
        value: "prompts",
        description: "Copy prompts for auth, API, state, and similar setup",
      },
      {
        name: "Browse catalog",
        value: "list",
        description: "See available skills, workflows, prompts, and templates",
      },
      {
        name: "Check install",
        value: "doctor",
        description: "Verify what is already installed in this project",
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
    case "doctor":
      await runDoctor();
      break;
    case "exit":
      break;
  }
}
