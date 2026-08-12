import { Command } from "commander";
import { runInit } from "./commands/init.js";
import { runAdd } from "./commands/add.js";
import { runList } from "./commands/list.js";
import { runReference } from "./commands/reference.js";
import { runDoctor } from "./commands/doctor.js";
import { runInteractiveMenu } from "./menu.js";
import { printBanner } from "./lib/ui.js";

const program = new Command();

program
  .name("ai-dev-toolkit")
  .description("Interactive CLI to install portable Agent Skills for AI coding tools")
  .version("0.1.0");

program
  .command("init")
  .description("Set up skills with an interactive wizard")
  .option("-f, --force", "Overwrite existing skills without prompting")
  .action(async (options: { force?: boolean }) => {
    printBanner();
    await runInit({ force: options.force });
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
  .description("List available skills in the catalog")
  .action(() => {
    printBanner();
    runList();
  });

program
  .command("reference")
  .description("Print the reference.md customization prompt")
  .option("-s, --skill <name>", "Skill folder name (e.g. ui-development)")
  .option("-r, --root <path>", "Skills root path (e.g. .cursor/skills)")
  .action(async (options: { skill?: string; root?: string }) => {
    printBanner();
    await runReference({ skill: options.skill, root: options.root });
  });

program
  .command("doctor")
  .description("Verify an existing skills installation")
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
