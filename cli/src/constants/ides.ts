export type IdeId =
  | "cursor"
  | "claude-code"
  | "windsurf"
  | "github-copilot"
  | "antigravity";

export type InstallScope = "project" | "global";

export interface IdeConfig {
  id: IdeId;
  name: string;
  projectPath: string;
  altProjectPath?: string;
  globalPath: string;
}

export const IDES: IdeConfig[] = [
  {
    id: "cursor",
    name: "Cursor",
    projectPath: ".cursor/skills",
    globalPath: "~/.cursor/skills",
  },
  {
    id: "claude-code",
    name: "Claude Code",
    projectPath: ".claude/skills",
    globalPath: "~/.claude/skills",
  },
  {
    id: "windsurf",
    name: "Windsurf",
    projectPath: ".windsurf/skills",
    globalPath: "~/.codeium/windsurf/skills",
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    projectPath: ".github/skills",
    altProjectPath: ".agents/skills",
    globalPath: "~/.copilot/skills",
  },
  {
    id: "antigravity",
    name: "Antigravity",
    projectPath: ".agents/skills",
    globalPath: "~/.gemini/config/skills",
  },
];

export function getIdeById(id: IdeId): IdeConfig {
  const ide = IDES.find((entry) => entry.id === id);
  if (!ide) {
    throw new Error(`Unknown IDE: ${id}`);
  }
  return ide;
}

export function resolveProjectPath(ide: IdeConfig, copilotPath?: string): string {
  if (ide.id === "github-copilot" && copilotPath) {
    return copilotPath;
  }
  return ide.projectPath;
}

export function resolveInstallPath(
  ide: IdeConfig,
  scope: InstallScope,
  copilotPath?: string,
): string {
  if (scope === "global") {
    return ide.globalPath;
  }
  return resolveProjectPath(ide, copilotPath);
}

export const KNOWN_SKILL_PATHS = [
  ".cursor/skills",
  ".claude/skills",
  ".windsurf/skills",
  ".github/skills",
  ".agents/skills",
] as const;
