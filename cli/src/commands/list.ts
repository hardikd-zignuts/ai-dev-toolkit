import { listAvailableSkills } from "../lib/skills-catalog.js";
import { PROMPTS_TREE } from "../constants/prompts-catalog.js";
import { WORKFLOWS_CATALOG } from "../constants/workflows-catalog.js";
import chalk from "chalk";
import { heading } from "../lib/ui.js";
import type { PromptTreeNode } from "../types.js";

export interface ListOptions {
  type?: "all" | "skills" | "prompts" | "workflows" | "templates";
}

function printPromptTree(nodes: PromptTreeNode[], indent = 2): void {
  const pad = " ".repeat(indent);

  for (const node of nodes) {
    if (node.type === "group") {
      console.log(`${pad}${chalk.cyan(node.title)}`);
      printPromptTree(node.children, indent + 2);
      continue;
    }

    console.log(`${pad}${chalk.green(node.title.padEnd(28))} ${node.summary}`);
  }
}

export function runList(options: ListOptions = {}): void {
  const type = options.type ?? "all";

  if (type === "all" || type === "skills") {
    const skills = listAvailableSkills();
    heading("Skills");
    for (const skill of skills) {
      console.log(`  ${chalk.green(skill.folder.padEnd(30))} ${skill.name}`);
      console.log(`  ${chalk.dim(skill.description)}`);
    }
  }

  if (type === "all" || type === "workflows") {
    heading("Workflows");
    for (const wf of WORKFLOWS_CATALOG) {
      console.log(`  ${chalk.green(wf.name)}`);
      console.log(`  ${chalk.dim(wf.description)}`);
    }
  }

  if (type === "all" || type === "prompts") {
    heading("App feature prompts");
    printPromptTree(PROMPTS_TREE);
  }

  if (type === "all" || type === "templates") {
    heading("Git hooks");
    console.log(`  ${chalk.green("pre-commit")}                lint-staged + typecheck`);
    console.log(`  ${chalk.green("commit-msg")}                conventional commits validation`);
  }

  console.log();
}
