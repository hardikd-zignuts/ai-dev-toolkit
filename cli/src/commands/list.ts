import chalk from "chalk";
import { listAvailableSkills } from "../lib/skills-catalog.js";
import { heading, muted } from "../lib/ui.js";

export function runList(): void {
  const skills = listAvailableSkills();

  heading("Available skills");
  muted(`${skills.length} skill${skills.length === 1 ? "" : "s"} in the catalog\n`);

  for (const skill of skills) {
    console.log(`  ${chalk.bold.cyan(skill.folder)}`);
    console.log(`  ${chalk.dim(skill.description)}`);
    console.log();
  }
}
