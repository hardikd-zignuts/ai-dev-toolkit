import { confirm } from "@inquirer/prompts";
import { getPromptContent, PROMPTS_CATALOG } from "../constants/prompts-catalog.js";
import { promptSelectArchitecturePrompt } from "../prompts/select-prompt.js";
import { copyToClipboard } from "../lib/clipboard.js";
import { info, printBox, success, warn } from "../lib/ui.js";

export interface PromptCmdOptions {
  name?: string;
  copy?: boolean;
}

export async function runPromptCmd(options: PromptCmdOptions = {}): Promise<void> {
  let promptId = options.name;
  let title = "";

  if (!promptId) {
    const selected = await promptSelectArchitecturePrompt();
    promptId = selected.id;
    title = selected.title;
  } else {
    const meta = PROMPTS_CATALOG.find((p) => p.id === promptId || p.fileName === promptId);
    title = meta ? meta.title : promptId;
  }

  const content = getPromptContent(promptId);

  if (!content) {
    warn(`Prompt '${promptId}' not found.`);
    return;
  }

  printBox(`Architecture Setup Prompt: ${title}`, content.split("\n"));

  let shouldCopy = options.copy;
  if (shouldCopy === undefined) {
    shouldCopy = await confirm({
      message: "Copy this prompt to system clipboard?",
      default: true,
    });
  }

  if (shouldCopy) {
    const ok = copyToClipboard(content);
    if (ok) {
      success("Prompt copied to clipboard!");
    } else {
      info("Clipboard write not supported on this platform. You can copy the text above.");
    }
  }
}
