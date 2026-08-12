import fs from "node:fs";
import path from "node:path";
import { getSkillsSourceDir } from "./skills-source.js";

export interface SkillMeta {
  folder: string;
  name: string;
  description: string;
}

function parseFrontmatter(content: string): { name?: string; description?: string } {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};

  const frontmatter = match[1];
  const result: { name?: string; description?: string } = {};

  for (const line of frontmatter.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    const value = line.slice(colonIndex + 1).trim();
    if (key === "name") result.name = value;
    if (key === "description") result.description = value;
  }

  return result;
}

export function listAvailableSkills(): SkillMeta[] {
  const sourceDir = getSkillsSourceDir();
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });

  const skills: SkillMeta[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const skillFile = path.join(sourceDir, entry.name, "SKILL.md");
    if (!fs.existsSync(skillFile)) continue;

    const content = fs.readFileSync(skillFile, "utf8");
    const meta = parseFrontmatter(content);

    skills.push({
      folder: entry.name,
      name: meta.name ?? entry.name,
      description: meta.description ?? "No description",
    });
  }

  return skills.sort((a, b) => a.folder.localeCompare(b.folder));
}

export function getSkillFolders(): string[] {
  return listAvailableSkills().map((skill) => skill.folder);
}
