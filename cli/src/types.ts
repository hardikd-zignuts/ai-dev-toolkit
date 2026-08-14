import type { IdeConfig, InstallScope } from "./constants/ides.js";

export interface InstallContext {
  ide: IdeConfig;
  scope: InstallScope;
  installPath: string;
  targetDir: string;
  copilotPath?: string;
  installedSkills: string[];
}

export type AssetKind = "skills" | "prompts" | "workflows" | "templates";

export type SetupType = "all" | "skills" | "workflows" | "prompts" | "husky";

export interface SetupPromptMeta {
  id: string;
  title: string;
  category: string;
  frameworks: string;
  fileName: string;
  filePath: string;
}

export interface WorkflowMeta {
  id: string;
  name: string;
  description: string;
  files: string[];
}

export type MenuAction =
  | "setup"
  | "add"
  | "reference"
  | "prompts"
  | "list"
  | "doctor"
  | "exit";
