import { checkbox } from "@inquirer/prompts";
import type { InstallablePiece } from "../types.js";

export async function promptSelectSetupPieces(
  message = "What do you want to install?",
): Promise<InstallablePiece[]> {
  return checkbox<InstallablePiece>({
    message,
    required: true,
    choices: [
      {
        name: "Skills",
        value: "skills",
        description: "Portable skill files for your IDE",
      },
      {
        name: "Workflows",
        value: "workflows",
        description: "AI development pipeline templates",
      },
      {
        name: "Git hooks",
        value: "husky",
        description: "pre-commit and commit-msg (Husky)",
      },
    ],
  });
}
