import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getCliRoot(): string {
  return path.resolve(__dirname, "..", "..");
}

export function getDevSkillsDir(): string {
  return path.resolve(getCliRoot(), "..", "skills");
}

export function getBundledSkillsDir(): string {
  return path.resolve(getCliRoot(), "assets", "skills");
}

export function getSkillsSourceDir(): string {
  const devDir = getDevSkillsDir();
  if (fs.existsSync(devDir)) {
    return devDir;
  }

  const bundledDir = getBundledSkillsDir();
  if (fs.existsSync(bundledDir)) {
    return bundledDir;
  }

  throw new Error(
    "Skills source not found. Run from the ai-dev-toolkit repo or install the published package.",
  );
}
