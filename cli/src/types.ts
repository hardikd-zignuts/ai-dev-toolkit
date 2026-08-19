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

export type InstallablePiece = "skills" | "workflows" | "husky";

export interface SetupPromptMeta {
  id: string;
  title: string;
  summary: string;
  category: string;
  frameworks: string;
  fileName: string;
  filePath: string;
  section?: string;
  group?: string;
}

export type PromptTreeGroup = {
  type: "group";
  id: string;
  title: string;
  summary: string;
  children: PromptTreeNode[];
};

export type PromptTreeLeaf = {
  type: "prompt";
} & Omit<SetupPromptMeta, "filePath" | "section" | "group">;

export type PromptTreeNode = PromptTreeGroup | PromptTreeLeaf;

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
  | "exit";
