import fs from "node:fs";
import path from "node:path";
import { getWorkflowsSourceDir } from "./assets-source.js";
import { warn } from "./ui.js";

export interface CopyWorkflowsOptions {
  targetDir?: string;
  force?: boolean;
  onConflict?: (conflicts: string[]) => Promise<boolean>;
}

export interface CopyWorkflowsResult {
  copiedFiles: string[];
  skippedFiles: string[];
}

interface PlannedCopy {
  src: string;
  dest: string;
  display: string;
}

function walkFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      for (const rel of walkFiles(full)) {
        files.push(path.join(entry.name, rel));
      }
    } else if (entry.isFile()) {
      files.push(entry.name);
    }
  }
  return files;
}

function displayPath(...parts: string[]): string {
  return parts.join("/").replaceAll(path.sep, "/");
}

function planTree(sourceRoot: string, destRoot: string, displayPrefix: string): PlannedCopy[] {
  return walkFiles(sourceRoot).map((rel) => ({
    src: path.join(sourceRoot, rel),
    dest: path.join(destRoot, rel),
    display: displayPath(displayPrefix, rel),
  }));
}

function copyFile(src: string, dest: string): void {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

export async function copyWorkflows(options: CopyWorkflowsOptions = {}): Promise<CopyWorkflowsResult> {
  const targetDir = options.targetDir ?? process.cwd();
  const workflowsSource = getWorkflowsSourceDir();

  const planned: PlannedCopy[] = [
    ...planTree(
      path.join(workflowsSource, ".github"),
      path.join(targetDir, ".github"),
      ".github",
    ),
    ...planTree(
      path.join(workflowsSource, ".claude"),
      path.join(targetDir, ".claude"),
      ".claude",
    ),
  ];

  const howtoSource = path.join(workflowsSource, "HOWTO-AI-WORKFLOW.md");
  if (fs.existsSync(howtoSource)) {
    planned.push({
      src: howtoSource,
      dest: path.join(targetDir, "docs", "HOWTO-AI-WORKFLOW.md"),
      display: "docs/HOWTO-AI-WORKFLOW.md",
    });
  }

  const refSource = path.join(workflowsSource, "reference.md");
  if (fs.existsSync(refSource)) {
    planned.push({
      src: refSource,
      dest: path.join(targetDir, "workflows-reference.md"),
      display: "workflows-reference.md",
    });
  }

  const existing = planned.filter((item) => fs.existsSync(item.dest));
  let overwriteExisting = Boolean(options.force);

  if (existing.length > 0 && !options.force && options.onConflict) {
    overwriteExisting = await options.onConflict(existing.map((item) => item.display));
  }

  const copiedFiles: string[] = [];
  const skippedFiles: string[] = [];

  for (const item of planned) {
    const destExists = fs.existsSync(item.dest);
    if (destExists && !overwriteExisting) {
      skippedFiles.push(item.display);
      continue;
    }

    copyFile(item.src, item.dest);
    copiedFiles.push(item.display);
  }

  if (skippedFiles.length > 0) {
    warn(`Skipped ${skippedFiles.length} existing file(s).`);
  }

  return { copiedFiles, skippedFiles };
}
