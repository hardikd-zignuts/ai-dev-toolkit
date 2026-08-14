import { confirm, select } from "@inquirer/prompts";
import { listAvailableSkills } from "../lib/skills-catalog.js";
import { detectExistingInstall } from "../lib/copy-skills.js";
import { promptSelectIde } from "../prompts/select-ide.js";
import { resolveInstallPath } from "../constants/ides.js";
import { copyToClipboard } from "../lib/clipboard.js";
import { info, printBox, success } from "../lib/ui.js";

const SKILL_REFERENCE_PROMPT = `Inspect this repository and update <skills-root>/<skill-name>/reference.md with project-specific guidance.

Requirements:
- Keep the existing section headings and generic safety guidance
- Replace generic "where to look" hints with our actual paths (components, services, styles, tests, API layer, auth)
- Document our stack: framework, styling system, state/data layer, HTTP client, test runner
- Add 3–5 concrete examples: real file paths + the pattern they demonstrate
- Do not invent conventions — only document what exists in this repo

Skill to update: <skill-name>`;

const WORKFLOW_REFERENCE_PROMPT = `Customize the AI development workflow for this repository.

1. Read workflows/reference.md (or ./reference.md if copied to root) and inspect this codebase.
2. Ask me clarifying questions for anything you cannot infer confidently:
   - Issue tracker (Jira, GitHub Issues, Linear, none) and ticket key pattern
   - Branch naming and commit message conventions
   - Lint, build, and test commands
   - Security-sensitive paths that should trigger GATE 3 (or confirm none)
   - Manual QA areas I should verify before each PR
   - Related repos/services for cross-team impact
   - Which AI IDE I use (Cursor, Claude Code, Copilot, Antigravity)
3. After I answer, update reference.md with real values only — do not invent conventions.
4. Update GitHub issue templates (ticket placeholder, affected-area options) to match this project.
5. Update HOWTO-AI-WORKFLOW.md quick-start examples with our project name and ticket format.
6. If I use Cursor and domain-specific rules would help, propose .cursor/rules/workflow-*.mdc files that reference reference.md — do not embed project specifics in SKILL.md or prompt files.

Keep .claude/skills/*/SKILL.md and .github/prompts/*.prompt.md generic; they must read reference.md at runtime.
Present a plan first; apply edits only after I approve.`;

export interface ReferenceOptions {
  skill?: string;
  workflow?: boolean;
  root?: string;
  copy?: boolean;
}

export async function runReference(options: ReferenceOptions = {}): Promise<void> {
  const cwd = process.cwd();

  let mode: "skill" | "workflow" = options.workflow ? "workflow" : "skill";

  if (!options.skill && !options.workflow) {
    mode = await select<"skill" | "workflow">({
      message: "Which reference prompt would you like to generate?",
      choices: [
        {
          name: "📖 Skill reference.md Prompt (for a specific agent skill)",
          value: "skill",
        },
        {
          name: "🔄 Workflow Customization Prompt (for AI pipeline reference.md)",
          value: "workflow",
        },
      ],
    });
  }

  let finalPrompt = "";
  let boxTitle = "";

  if (mode === "workflow") {
    finalPrompt = WORKFLOW_REFERENCE_PROMPT;
    boxTitle = "Workflow Customization Prompt";
  } else {
    let skillsRoot = options.root;

    if (!skillsRoot) {
      const detected = detectExistingInstall(cwd);
      if (detected) {
        skillsRoot = detected;
      } else {
        const ide = await promptSelectIde("Select IDE to resolve skills root path:");
        skillsRoot = resolveInstallPath(ide, "project");
      }
    }

    let skillName = options.skill;
    if (!skillName) {
      const skills = listAvailableSkills();
      skillName = await select({
        message: "Which skill reference prompt?",
        choices: skills.map((skill) => ({
          name: skill.name,
          value: skill.folder,
          description: skill.description,
        })),
      });
    }

    finalPrompt = SKILL_REFERENCE_PROMPT
      .replaceAll("<skills-root>", skillsRoot)
      .replaceAll("<skill-name>", skillName);

    boxTitle = `Skill reference.md Prompt (${skillsRoot}/${skillName})`;
  }

  printBox(boxTitle, finalPrompt.split("\n"));

  let shouldCopy = options.copy;
  if (shouldCopy === undefined) {
    shouldCopy = await confirm({
      message: "Copy this prompt to system clipboard?",
      default: true,
    });
  }

  if (shouldCopy) {
    const ok = copyToClipboard(finalPrompt);
    if (ok) {
      success("Reference prompt copied to clipboard!");
    } else {
      info("Clipboard write not supported on this platform. You can copy the text above.");
    }
  }
}
