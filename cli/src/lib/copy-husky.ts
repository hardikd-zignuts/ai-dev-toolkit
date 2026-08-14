import fs from "node:fs";
import path from "node:path";
import { getTemplatesSourceDir } from "./assets-source.js";

export interface CopyHuskyOptions {
  targetDir?: string;
  force?: boolean;
}

export interface CopyHuskyResult {
  copiedFiles: string[];
  packageSnippet: string;
}

export async function copyHusky(options: CopyHuskyOptions = {}): Promise<CopyHuskyResult> {
  const targetDir = options.targetDir ?? process.cwd();
  const huskySourceDir = path.join(getTemplatesSourceDir(), "husky");

  const copiedFiles: string[] = [];

  const targetHuskyDir = path.join(targetDir, ".husky");
  fs.mkdirSync(targetHuskyDir, { recursive: true });

  const sourceHuskySubdir = path.join(huskySourceDir, "husky");
  if (fs.existsSync(sourceHuskySubdir)) {
    const hooks = fs.readdirSync(sourceHuskySubdir);
    for (const hook of hooks) {
      const srcHook = path.join(sourceHuskySubdir, hook);
      const destHook = path.join(targetHuskyDir, hook);
      if (!fs.existsSync(destHook) || options.force) {
        fs.copyFileSync(srcHook, destHook);
        try {
          fs.chmodSync(destHook, 0o755);
        } catch {
          // ignore on platforms that don't support chmod
        }
        copiedFiles.push(`.husky/${hook}`);
      }
    }
  }

  // Copy example config files
  const configs = [
    { src: "commitlint.config.example.mjs", dest: "commitlint.config.mjs" },
    { src: "lint-staged.config.example.mjs", dest: "lint-staged.config.mjs" },
  ];

  for (const { src, dest } of configs) {
    const srcPath = path.join(huskySourceDir, src);
    const destPath = path.join(targetDir, dest);
    if (fs.existsSync(srcPath) && (!fs.existsSync(destPath) || options.force)) {
      fs.copyFileSync(srcPath, destPath);
      copiedFiles.push(dest);
    }
  }

  const snippetPath = path.join(huskySourceDir, "package.json.snippet");
  const packageSnippet = fs.existsSync(snippetPath)
    ? fs.readFileSync(snippetPath, "utf8")
    : "";

  return { copiedFiles, packageSnippet };
}
