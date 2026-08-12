import { checkbox, confirm } from "@inquirer/prompts";
import { listAvailableSkills } from "../lib/skills-catalog.js";

export async function promptSelectSkills(message = "Select skills"): Promise<string[]> {
  const skills = listAvailableSkills();

  if (skills.length === 0) {
    throw new Error("No skills found in the package.");
  }

  const selected = await checkbox({
    message,
    choices: skills.map((skill) => ({
      name: skill.name,
      value: skill.folder,
      description: skill.description.length > 80
        ? `${skill.description.slice(0, 77)}...`
        : skill.description,
      checked: true,
    })),
    required: true,
  });

  return selected;
}

export async function promptOverwriteConflicts(): Promise<boolean> {
  return confirm({
    message: "Some skills already exist. Overwrite them?",
    default: false,
  });
}
