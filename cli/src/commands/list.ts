import { listAvailableSkills } from "../lib/skills-catalog.js";
import { PROMPTS_CATALOG } from "../constants/prompts-catalog.js";
import { WORKFLOWS_CATALOG } from "../constants/workflows-catalog.js";
import chalk from "chalk";

export interface ListOptions {
  type?: "all" | "skills" | "prompts" | "workflows" | "templates";
}

export function runList(options: ListOptions = {}): void {
  const type = options.type ?? "all";

  if (type === "all" || type === "skills") {
    const skills = listAvailableSkills();
    console.log(chalk.bold.cyan("\n🛠️  Available Agent Skills:"));
    for (const skill of skills) {
      console.log(`  ${chalk.green(skill.folder.padEnd(30))} ${skill.name}`);
      console.log(`  ${chalk.dim(skill.description)}`);
    }
  }

  if (type === "all" || type === "workflows") {
    console.log(chalk.bold.cyan("\n🔄  Available AI Workflows:"));
    for (const wf of WORKFLOWS_CATALOG) {
      console.log(`  ${chalk.green(wf.name)}`);
      console.log(`  ${chalk.dim(wf.description)}`);
    }
  }

  if (type === "all" || type === "prompts") {
    console.log(chalk.bold.cyan("\n🏗️  Architecture Setup Prompts:"));
    for (const p of PROMPTS_CATALOG) {
      console.log(`  ${chalk.green(p.title.padEnd(25))} [${p.category}]`);
      console.log(`  ${chalk.dim(p.frameworks)}`);
    }
  }

  if (type === "all" || type === "templates") {
    console.log(chalk.bold.cyan("\n⚓  Git Hooks & Husky Templates:"));
    console.log(`  ${chalk.green("pre-commit")}                lint-staged + typecheck`);
    console.log(`  ${chalk.green("commit-msg")}                conventional commits validation`);
  }

  console.log();
}
