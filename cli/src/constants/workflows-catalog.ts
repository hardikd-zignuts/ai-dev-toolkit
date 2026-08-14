import type { WorkflowMeta } from "../types.js";

export const WORKFLOWS_CATALOG: WorkflowMeta[] = [
  {
    id: "7-stage-pipeline",
    name: "7-Stage AI Development Pipeline",
    description:
      "Complete AI workflow (intake → research → plan → implement → test → review → ship) with human-in-the-loop gating.",
    files: [
      "workflows/.github/prompts/*.prompt.md",
      "workflows/.claude/skills/*/SKILL.md",
      "workflows/HOWTO-AI-WORKFLOW.md",
      "workflows/reference.md",
    ],
  },
];
