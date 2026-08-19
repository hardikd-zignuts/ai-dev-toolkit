import { Command } from "commander";
import { runSetup } from "./commands/setup.js";
import { runAdd } from "./commands/add.js";
import { runList } from "./commands/list.js";
import { runReference } from "./commands/reference.js";
import { runPromptCmd } from "./commands/prompt-cmd.js";
import { runDoctor } from "./commands/doctor.js";
import { runInteractiveMenu } from "./menu.js";
import { printBanner } from "./lib/ui.js";
import type { SetupType } from "./types.js";

const program = new Command();

program
  .name("agentkitx")
  .description(
    "Interactive CLI to install portable Agent Skills, Workflows & Prompts for AI coding tools",
  )
  .version("0.1.0");

program
  .command("setup")
  .alias("init")
  .description(
    "Set up skills, workflows, and git hooks with an interactive wizard",
  )
  .option(
    "-t, --type <type>",
    "Setup target type (all, skills, workflows, prompts, husky)",
  )
  .option("-f, --force", "Overwrite existing files without prompting")
  .action(async (options: { type?: string; force?: boolean }) => {
    printBanner();
    await runSetup({ type: options.type as SetupType, force: options.force });
  });

program
  .command("add")
  .description("Add skills to an existing install")
  .option("-f, --force", "Overwrite existing skills without prompting")
  .action(async (options: { force?: boolean }) => {
    printBanner();
    await runAdd({ force: options.force });
  });

program
  .command("list")
  .description(
    "List available skills, workflows, prompts, and templates in the catalog",
  )
  .option(
    "-t, --type <type>",
    "Catalog type to view (all, skills, prompts, workflows, templates)",
  )
  .action(
    (options: {
      type?: "all" | "skills" | "prompts" | "workflows" | "templates";
    }) => {
      printBanner();
      runList({ type: options.type });
    },
  );

program
  .command("prompt")
  .description(
    "Copy a prompt to add app features (login, layouts, API, theme, and more)",
  )
  .option(
    "-n, --name <name>",
    "Prompt ID or file name (e.g. auth-guards, state-store)",
  )
  .option("-c, --copy", "Copy prompt to clipboard automatically")
  .action(async (options: { name?: string; copy?: boolean }) => {
    printBanner();
    await runPromptCmd({ name: options.name, copy: options.copy });
  });

program
  .command("reference")
  .description(
    "Get a prompt that fills in your stack and file paths so skills work here",
  )
  .option("-s, --skill <name>", "Skill folder name (e.g. ui-development)")
  .option("-w, --workflow", "Generate workflow customization prompt")
  .option("-r, --root <path>", "Skills root path (e.g. .cursor/skills)")
  .option("-c, --copy", "Copy prompt to clipboard automatically")
  .action(
    async (options: {
      skill?: string;
      workflow?: boolean;
      root?: string;
      copy?: boolean;
    }) => {
      printBanner();
      await runReference({
        skill: options.skill,
        workflow: options.workflow,
        root: options.root,
        copy: options.copy,
      });
    },
  );

program
  .command("doctor")
  .description("Check what is already installed in this project")
  .option("-r, --root <path>", "Skills root path to check")
  .action(async (options: { root?: string }) => {
    printBanner();
    await runDoctor({ root: options.root });
  });

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    await runInteractiveMenu();
    return;
  }

  await program.parseAsync(process.argv);
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
