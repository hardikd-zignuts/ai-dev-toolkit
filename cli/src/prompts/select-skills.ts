import { checkbox, confirm } from "@inquirer/prompts";
import { listAvailableSkills } from "../lib/skills-catalog.js";

const ALL_SKILLS = "__all__";

export async function promptSelectSkills(message = "Which skills?"): Promise<string[]> {
  const skills = listAvailableSkills();

  if (skills.length === 0) {
    throw new Error("No skills found in the package.");
  }

  const selected = await checkbox({
    message,
    required: true,
    choices: [
      {
        name: "All skills",
        value: ALL_SKILLS,
        description: "Install every skill in the catalog",
      },
      ...skills.map((skill) => ({
        name: skill.name,
        value: skill.folder,
        description: skill.description.length > 80
          ? `${skill.description.slice(0, 77)}...`
          : skill.description,
      })),
    ],
  });

  if (selected.includes(ALL_SKILLS)) {
    return skills.map((skill) => skill.folder);
  }

  return selected;
}

export async function promptOverwriteConflicts(
  conflicts: string[],
  itemLabel = "skills",
): Promise<boolean> {
  const listed = conflicts.length <= 6
    ? conflicts.join(", ")
    : `${conflicts.slice(0, 6).join(", ")} (+${conflicts.length - 6} more)`;

  return confirm({
    message: `These ${itemLabel} already exist: ${listed}. Overwrite them?`,
    default: false,
  });
}
