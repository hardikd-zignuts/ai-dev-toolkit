import { select } from "@inquirer/prompts";
import type { SetupType } from "../types.js";

export async function promptSelectSetupType(message = "What would you like to set up?"): Promise<SetupType> {
  return select<SetupType>({
    message,
    choices: [
      {
        name: "📦 All-in-One Full Kit (Skills + Workflows + Husky)",
        value: "all",
        description: "Set up Agent Skills, AI Workflows, and Git Hooks together",
      },
      {
        name: "🛠️ Agent Skills",
        value: "skills",
        description: "Install portable SKILL.md and reference.md into your IDE",
      },
      {
        name: "🔄 AI Workflows",
        value: "workflows",
        description: "Install 7-stage AI development pipeline templates",
      },
      {
        name: "🏗️ Architecture Setup Prompts",
        value: "prompts",
        description: "Browse and copy universal architecture setup prompts",
      },
      {
        name: "⚓ Git Hooks / Husky",
        value: "husky",
        description: "Install pre-commit & commit-msg hooks",
      },
    ],
  });
}
