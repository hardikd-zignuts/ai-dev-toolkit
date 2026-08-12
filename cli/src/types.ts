import type { IdeConfig, InstallScope } from "./constants/ides.js";

export interface InstallContext {
  ide: IdeConfig;
  scope: InstallScope;
  installPath: string;
  targetDir: string;
  copilotPath?: string;
  installedSkills: string[];
}

export type MenuAction = "init" | "add" | "list" | "reference" | "doctor" | "exit";
