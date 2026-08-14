import type { SetupType } from "../types.js";
import { runInit } from "./init.js";
import { copyWorkflows } from "../lib/copy-workflows.js";
import { copyHusky } from "../lib/copy-husky.js";
import { promptSelectSetupType } from "../prompts/select-setup-type.js";
import { info, printBox, success } from "../lib/ui.js";
import { runPromptCmd } from "./prompt-cmd.js";

export interface SetupOptions {
  type?: SetupType;
  force?: boolean;
  cwd?: string;
}

export async function runSetup(options: SetupOptions = {}): Promise<void> {
  const cwd = options.cwd ?? process.cwd();
  let setupType = options.type;

  if (!setupType) {
    setupType = await promptSelectSetupType();
  }

  switch (setupType) {
    case "skills":
      await runInit({ force: options.force, cwd });
      break;

    case "workflows": {
      info("Installing AI Workflows pipeline templates...");
      const result = await copyWorkflows({ force: options.force, targetDir: cwd });
      success(`Installed ${result.copiedFiles.length} workflow file(s):`);
      for (const f of result.copiedFiles) {
        console.log(`  - ${f}`);
      }
      printBox("Next steps for AI Workflows", [
        "1. Open your project in your AI IDE",
        "2. Run: npx agentkitx reference --workflow",
        "3. Paste the generated prompt to customize reference.md for your codebase",
      ]);
      break;
    }

    case "husky": {
      info("Installing Git Hooks & Husky templates...");
      const result = await copyHusky({ force: options.force, targetDir: cwd });
      success(`Installed ${result.copiedFiles.length} hook & config file(s):`);
      for (const f of result.copiedFiles) {
        console.log(`  - ${f}`);
      }
      if (result.packageSnippet) {
        printBox("package.json snippet", result.packageSnippet.split("\n"));
      }
      break;
    }

    case "prompts":
      await runPromptCmd({});
      break;

    case "all": {
      info("⚡ Running All-in-One Quickstart Setup...");
      console.log("\n--- Step 1: Agent Skills ---");
      await runInit({ force: options.force, cwd });

      console.log("\n--- Step 2: AI Workflows Pipeline ---");
      const wfResult = await copyWorkflows({ force: options.force, targetDir: cwd });
      success(`Installed ${wfResult.copiedFiles.length} workflow file(s).`);

      console.log("\n--- Step 3: Git Hooks & Husky ---");
      const huskyResult = await copyHusky({ force: options.force, targetDir: cwd });
      success(`Installed ${huskyResult.copiedFiles.length} hook/config file(s).`);

      printBox("🎉 All-in-One Setup Complete!", [
        "Your project is now equipped with portable Agent Skills, AI Workflows, and Git Hooks.",
        "To customize reference.md, run: npx agentkitx reference",
      ]);
      break;
    }
  }
}
