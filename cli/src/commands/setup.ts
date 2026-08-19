import type { InstallablePiece, SetupType } from "../types.js";
import { runInit } from "./init.js";
import { copyWorkflows } from "../lib/copy-workflows.js";
import { copyHusky } from "../lib/copy-husky.js";
import { promptSelectSetupPieces } from "../prompts/select-setup-type.js";
import { promptOverwriteConflicts } from "../prompts/select-skills.js";
import { heading, info, printBox, success } from "../lib/ui.js";
import { runPromptCmd } from "./prompt-cmd.js";

export interface SetupOptions {
  type?: SetupType;
  force?: boolean;
  cwd?: string;
}

type OverwriteFn = (conflicts: string[], label: string) => Promise<boolean>;

function piecesFromType(type: SetupType): InstallablePiece[] | "prompts" {
  if (type === "prompts") return "prompts";
  if (type === "all") return ["skills", "workflows", "husky"];
  return [type];
}

function printCopied(label: string, files: string[]): void {
  if (files.length === 0) {
    info(`No ${label} were installed.`);
    return;
  }
  success(`Installed ${files.length} ${label}:`);
  for (const file of files) {
    console.log(`  - ${file}`);
  }
}

function conflictHandler(
  overwrite: OverwriteFn | undefined,
  label: string,
): ((conflicts: string[]) => Promise<boolean>) | undefined {
  if (!overwrite) return undefined;
  return (conflicts) => overwrite(conflicts, label);
}

async function installWorkflows(
  cwd: string,
  force: boolean | undefined,
  overwrite: OverwriteFn | undefined,
  showNextSteps: boolean,
): Promise<boolean> {
  info("Installing workflow templates...");
  const result = await copyWorkflows({
    force,
    targetDir: cwd,
    onConflict: conflictHandler(overwrite, "workflow files"),
  });
  printCopied("workflow file(s)", result.copiedFiles);
  if (showNextSteps && result.copiedFiles.length > 0) {
    printBox("Next steps for workflows", [
      "1. Open your project in your AI IDE",
      "2. Run: npx agentkitx reference --workflow",
      "3. Paste the generated prompt to customize workflows-reference.md for your codebase",
    ]);
  }
  return result.copiedFiles.length > 0;
}

async function installGitHooks(
  cwd: string,
  force: boolean | undefined,
  overwrite: OverwriteFn | undefined,
): Promise<boolean> {
  info("Installing git hooks...");
  const result = await copyHusky({
    force,
    targetDir: cwd,
    onConflict: conflictHandler(overwrite, "git hook files"),
  });
  printCopied("hook and config file(s)", result.copiedFiles);
  if (result.packageSnippet && result.copiedFiles.length > 0) {
    printBox("package.json snippet", result.packageSnippet.split("\n"));
  }
  return result.copiedFiles.length > 0;
}

export async function runSetup(options: SetupOptions = {}): Promise<void> {
  const cwd = options.cwd ?? process.cwd();

  const pieces = options.type
    ? piecesFromType(options.type)
    : await promptSelectSetupPieces();

  if (pieces === "prompts") {
    await runPromptCmd({});
    return;
  }

  const overwrite = options.force
    ? undefined
    : (conflicts: string[], label: string) => promptOverwriteConflicts(conflicts, label);

  const multi = pieces.length > 1;
  const installed: string[] = [];

  if (pieces.includes("skills")) {
    if (multi) heading("Skills");
    const result = await runInit({ force: options.force, cwd });
    if (result && result.installedSkills.length > 0) {
      installed.push("skills");
    }
  }

  if (pieces.includes("workflows")) {
    if (multi) heading("Workflows");
    const copied = await installWorkflows(cwd, options.force, overwrite, !multi);
    if (copied) installed.push("workflows");
  }

  if (pieces.includes("husky")) {
    if (multi) heading("Git hooks");
    const copied = await installGitHooks(cwd, options.force, overwrite);
    if (copied) installed.push("git hooks");
  }

  if (multi && installed.length > 0) {
    printBox("Setup complete", [
      `Installed: ${installed.join(", ")}.`,
      "To customize skill or workflow docs, run: npx agentkitx reference",
    ]);
  }
}
