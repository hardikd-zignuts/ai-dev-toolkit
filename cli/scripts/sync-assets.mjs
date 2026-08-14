import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cliRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(cliRoot, "..");

const assetDirectories = ["skills", "prompts", "workflows", "templates"];

for (const dirName of assetDirectories) {
  const sourceDir = path.resolve(repoRoot, dirName);
  const targetDir = path.resolve(cliRoot, "assets", dirName);

  if (!fs.existsSync(sourceDir)) {
    console.warn(`Source directory not found: ${sourceDir}`);
    continue;
  }

  fs.rmSync(targetDir, { recursive: true, force: true });
  fs.mkdirSync(targetDir, { recursive: true });

  fs.cpSync(sourceDir, targetDir, { recursive: true });
  console.log(`Synced ${dirName}/ to assets/${dirName}/`);
}
