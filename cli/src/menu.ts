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
        name: "⚡ Quick Setup Wizard (Skills, Workflows, Prompts, Husky)",
        value: "setup",
      },
      {
        name: "➕ Add skills to an existing install",
        value: "add",
      },
      {
        name: "📑 Generate reference.md customization prompt",
        value: "reference",
      },
      {
        name: "🏗️ View Architecture Setup Prompts",
        value: "prompts",
      },
      {
        name: "📋 Browse Catalog (Skills, Prompts, Workflows, Templates)",
        value: "list",
      },
      {
        name: "🩺 Check installation health (doctor)",
        value: "doctor",
      },
      {
        name: "🚪 Exit",
        value: "exit",
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
