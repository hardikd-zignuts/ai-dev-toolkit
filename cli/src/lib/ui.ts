import chalk from "chalk";

export function printBanner(): void {
  console.log();
  console.log(chalk.bold.cyan("  AI Dev Toolkit"));
  console.log(
    chalk.dim("  Portable Agent Skills for Cursor, Claude Code, Copilot, and more."),
  );
  console.log();
}

export function success(message: string): void {
  console.log(chalk.green("✔") + " " + message);
}

export function warn(message: string): void {
  console.log(chalk.yellow("⚠") + " " + message);
}

export function error(message: string): void {
  console.error(chalk.red("✖") + " " + message);
}

export function info(message: string): void {
  console.log(chalk.blue("ℹ") + " " + message);
}

export function heading(message: string): void {
  console.log();
  console.log(chalk.bold(message));
}

export function muted(message: string): void {
  console.log(chalk.dim(message));
}

export function printNextSteps(skillsRoot: string, skillNames: string[]): void {
  heading("Next steps");
  muted("Customize reference.md for each skill before implementation or review.");
  console.log();
  console.log(chalk.dim("  Example:"));
  console.log(`  npx ai-dev-toolkit reference --skill ${skillNames[0] ?? "ui-development"} --root ${skillsRoot}`);
  console.log();
}

export function printBox(title: string, lines: string[]): void {
  const width = Math.max(title.length, ...lines.map((line) => line.length)) + 4;
  const border = chalk.dim("─".repeat(width));
  console.log();
  console.log(chalk.bold(title));
  console.log(border);
  for (const line of lines) {
    console.log("  " + line);
  }
  console.log(border);
  console.log();
}
