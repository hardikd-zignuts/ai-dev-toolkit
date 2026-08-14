import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getCliRoot(): string {
  return path.resolve(__dirname, "..", "..");
}

export function getRepoRoot(): string {
  return path.resolve(getCliRoot(), "..");
}

export function getAssetSourceDir(assetName: "skills" | "prompts" | "workflows" | "templates"): string {
  // Check dev workspace first
  const devDir = path.resolve(getRepoRoot(), assetName);
  if (fs.existsSync(devDir)) {
    return devDir;
  }

  // Check bundled assets in package
  const bundledDir = path.resolve(getCliRoot(), "assets", assetName);
  if (fs.existsSync(bundledDir)) {
    return bundledDir;
  }

  throw new Error(
    `Asset source '${assetName}' not found. Run from the agentkitx repo or install the published package.`,
  );
}

export function getSkillsSourceDir(): string {
  return getAssetSourceDir("skills");
}

export function getPromptsSourceDir(): string {
  return getAssetSourceDir("prompts");
}

export function getWorkflowsSourceDir(): string {
  return getAssetSourceDir("workflows");
}

export function getTemplatesSourceDir(): string {
  return getAssetSourceDir("templates");
}
