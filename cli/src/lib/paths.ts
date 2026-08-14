import os from "node:os";
import path from "node:path";

export function expandHome(inputPath: string): string {
  if (inputPath.startsWith("~/")) {
    return path.join(os.homedir(), inputPath.slice(2));
  }
  if (inputPath === "~") {
    return os.homedir();
  }
  return inputPath;
}

export function resolveTargetPath(installPath: string, cwd = process.cwd()): string {
  const expanded = expandHome(installPath);
  if (path.isAbsolute(expanded)) {
    return expanded;
  }
  return path.resolve(cwd, expanded);
}

export function formatDisplayPath(installPath: string, cwd = process.cwd()): string {
  const resolved = resolveTargetPath(installPath, cwd);
  const relative = path.relative(cwd, resolved);
  if (relative && !relative.startsWith("..") && !path.isAbsolute(relative)) {
    return `./${relative}`;
  }
  return resolved;
}
