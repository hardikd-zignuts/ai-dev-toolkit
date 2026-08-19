import fs from "node:fs";
import path from "node:path";
import { getTemplatesSourceDir } from "./assets-source.js";
import { warn } from "./ui.js";

export interface CopyHuskyOptions {
  targetDir?: string;
  force?: boolean;
  onConflict?: (conflicts: string[]) => Promise<boolean>;
}

export interface CopyHuskyResult {
  copiedFiles: string[];
  skippedFiles: string[];
  packageSnippet: string;
}

interface PlannedCopy {
  src: string;
  dest: string;
  display: string;
  chmod?: boolean;
}

export async function copyHusky(options: CopyHuskyOptions = {}): Promise<CopyHuskyResult> {
  const targetDir = options.targetDir ?? process.cwd();
  const huskySourceDir = path.join(getTemplatesSourceDir(), "husky");

  const planned: PlannedCopy[] = [];

  const sourceHuskySubdir = path.join(huskySourceDir, "husky");
  const targetHuskyDir = path.join(targetDir, ".husky");

  if (fs.existsSync(sourceHuskySubdir)) {
    const hooks = fs.readdirSync(sourceHuskySubdir);
    for (const hook of hooks) {
      planned.push({
        src: path.join(sourceHuskySubdir, hook),
        dest: path.join(targetHuskyDir, hook),
        display: `.husky/${hook}`,
        chmod: true,
      });
    }
  }

  const configs = [
    { src: "commitlint.config.example.mjs", dest: "commitlint.config.mjs" },
    { src: "lint-staged.config.example.mjs", dest: "lint-staged.config.mjs" },
  ];

  for (const { src, dest } of configs) {
    const srcPath = path.join(huskySourceDir, src);
    if (!fs.existsSync(srcPath)) continue;
    planned.push({
      src: srcPath,
      dest: path.join(targetDir, dest),
      display: dest,
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

    fs.mkdirSync(path.dirname(item.dest), { recursive: true });
    fs.copyFileSync(item.src, item.dest);
    if (item.chmod) {
      try {
        fs.chmodSync(item.dest, 0o755);
      } catch {
        // ignore on platforms that don't support chmod
      }
    }
    copiedFiles.push(item.display);
  }

  if (skippedFiles.length > 0) {
    warn(`Skipped ${skippedFiles.length} existing file(s).`);
  }

  const snippetPath = path.join(huskySourceDir, "package.json.snippet");
  const packageSnippet = fs.existsSync(snippetPath)
    ? fs.readFileSync(snippetPath, "utf8")
    : "";

  return { copiedFiles, skippedFiles, packageSnippet };
}
