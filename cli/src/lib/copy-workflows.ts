import fs from "node:fs";
import path from "node:path";
import { getWorkflowsSourceDir } from "./assets-source.js";
import { info, success } from "./ui.js";

export interface CopyWorkflowsOptions {
  targetDir?: string;
  force?: boolean;
}

export interface CopyWorkflowsResult {
  copiedFiles: string[];
}

export async function copyWorkflows(options: CopyWorkflowsOptions = {}): Promise<CopyWorkflowsResult> {
  const targetDir = options.targetDir ?? process.cwd();
  const workflowsSource = getWorkflowsSourceDir();

  const copiedFiles: string[] = [];

  // Copy .github workflow templates
  const githubSource = path.join(workflowsSource, ".github");
  if (fs.existsSync(githubSource)) {
    const githubTarget = path.join(targetDir, ".github");
    fs.mkdirSync(githubTarget, { recursive: true });
    fs.cpSync(githubSource, githubTarget, { recursive: true });
    copiedFiles.push(".github/");
  }

  // Copy .claude workflow templates
  const claudeSource = path.join(workflowsSource, ".claude");
  if (fs.existsSync(claudeSource)) {
    const claudeTarget = path.join(targetDir, ".claude");
    fs.mkdirSync(claudeTarget, { recursive: true });
    fs.cpSync(claudeSource, claudeTarget, { recursive: true });
    copiedFiles.push(".claude/");
  }

  // Copy HOWTO-AI-WORKFLOW.md to docs/
  const howtoSource = path.join(workflowsSource, "HOWTO-AI-WORKFLOW.md");
  if (fs.existsSync(howtoSource)) {
    const docsTarget = path.join(targetDir, "docs");
    fs.mkdirSync(docsTarget, { recursive: true });
    fs.copyFileSync(howtoSource, path.join(docsTarget, "HOWTO-AI-WORKFLOW.md"));
    copiedFiles.push("docs/HOWTO-AI-WORKFLOW.md");
  }

  // Copy reference.md to root or workflows/
  const refSource = path.join(workflowsSource, "reference.md");
  if (fs.existsSync(refSource)) {
    const refTarget = path.join(targetDir, "workflows-reference.md");
    if (!fs.existsSync(refTarget) || options.force) {
      fs.copyFileSync(refSource, refTarget);
      copiedFiles.push("workflows-reference.md");
    }
  }

  return { copiedFiles };
}
