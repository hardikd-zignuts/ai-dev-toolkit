import { select } from "@inquirer/prompts";
import { printBanner } from "./lib/ui.js";
import type { MenuAction } from "./types.js";
import { runInit } from "./commands/init.js";
import { runAdd } from "./commands/add.js";
import { runList } from "./commands/list.js";
import { runReference } from "./commands/reference.js";
import { runDoctor } from "./commands/doctor.js";

export async function runInteractiveMenu(): Promise<void> {
  printBanner();

  const action = await select<MenuAction>({
    message: "What would you like to do?",
    choices: [
      { name: "Setup skills in my project", value: "init" },
      { name: "Add skills to an existing install", value: "add" },
      { name: "List available skills", value: "list" },
      { name: "Generate reference.md prompt", value: "reference" },
      { name: "Check installation (doctor)", value: "doctor" },
      { name: "Exit", value: "exit" },
    ],
  });

  switch (action) {
    case "init":
      await runInit();
      break;
    case "add":
      await runAdd();
      break;
    case "list":
      runList();
      break;
    case "reference":
      await runReference();
      break;
    case "doctor":
      await runDoctor();
      break;
    case "exit":
      break;
  }
}
