import { select } from "@inquirer/prompts";
import { listAvailableSkills } from "../lib/skills-catalog.js";
import { printBox } from "../lib/ui.js";

const REFERENCE_PROMPT = `Inspect this repository and update <skills-root>/<skill-name>/reference.md with project-specific guidance.

Requirements:
- Keep the existing section headings and generic safety guidance
- Replace generic "where to look" hints with our actual paths (components, services, styles, tests, API layer, auth)
- Document our stack: framework, styling system, state/data layer, HTTP client, test runner
- Add 3–5 concrete examples: real file paths + the pattern they demonstrate
- Do not invent conventions — only document what exists in this repo

Skill to update: <skill-name>`;

export interface ReferenceOptions {
  skill?: string;
  root?: string;
}

function fillPrompt(skillsRoot: string, skillName: string): string {
  return REFERENCE_PROMPT.replaceAll("<skills-root>", skillsRoot).replaceAll(
    "<skill-name>",
    skillName,
  );
}

export async function runReference(options: ReferenceOptions = {}): Promise<void> {
  const skills = listAvailableSkills();
  const skillsRoot = options.root ?? ".cursor/skills";

  let skillName = options.skill;

  if (!skillName) {
    skillName = await select({
      message: "Which skill reference prompt?",
      choices: skills.map((skill) => ({
        name: skill.name,
        value: skill.folder,
        description: skillsRoot,
      })),
    });
  }

  const prompt = fillPrompt(skillsRoot, skillName);

  printBox(`reference.md prompt (${skillsRoot}/${skillName})`, prompt.split("\n"));
}

export function getReferencePrompt(skillsRoot: string, skillName: string): string {
  return fillPrompt(skillsRoot, skillName);
}
