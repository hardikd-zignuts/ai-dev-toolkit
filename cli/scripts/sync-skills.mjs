import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cliRoot = path.resolve(__dirname, "..");
const sourceDir = path.resolve(cliRoot, "..", "skills");
const targetDir = path.resolve(cliRoot, "assets", "skills");

if (!fs.existsSync(sourceDir)) {
  console.error(`Skills source not found: ${sourceDir}`);
  process.exit(1);
}

fs.rmSync(targetDir, { recursive: true, force: true });
fs.mkdirSync(targetDir, { recursive: true });

const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
for (const entry of entries) {
  if (!entry.isDirectory()) continue;
  fs.cpSync(path.join(sourceDir, entry.name), path.join(targetDir, entry.name), {
    recursive: true,
  });
}

console.log(`Synced ${entries.filter((e) => e.isDirectory()).length} skills to assets/skills/`);
