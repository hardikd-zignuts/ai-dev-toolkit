# AI Development Workflows Bundle

A portable, 7-stage AI development pipeline (`intake` → `research` → `plan` → `implement` → `test` → `review` → `ship`) supporting human-in-the-loop gating, automatic sizing, and repository-specific configuration via `reference.md`.

Works in **Claude Code**, **GitHub Copilot**, **Cursor**, **Antigravity**, and other AI coding assistants.

## Quick Install

To install this workflow bundle into your project:

```bash
# Copy workflow files into your target repository
cp -R workflows/.claude .claude/          # For Claude Code / Antigravity skills
cp -R workflows/.github .github/          # For Copilot prompts + issue templates
cp workflows/HOWTO-AI-WORKFLOW.md ./docs/ # Workflow guide (or place in project root)
cp workflows/reference.md ./              # Project reference configuration
```

After copying, customize `reference.md` for your project using the Plan-mode customization prompt in the root [`README.md`](../README.md#workflows).

## Directory Structure

```
workflows/
├── .claude/skills/        # 10 stage-specific skills for Claude Code / Antigravity
│   ├── feature/           # Master orchestrator (/feature)
│   ├── intake/            # Task intake & AC extraction
│   ├── research/          # Codebase exploration & convention mapping
│   ├── plan/              # Implementation plan generation
│   ├── implement/         # Code changes execution on branch
│   ├── test/              # QA & build verification
│   ├── review/            # Code review & diff inspection
│   ├── ship/              # Self-review, commit, & PR creation
│   ├── debug/             # Root-cause analysis for bug tickets
│   └── refactor/          # Behavior-preserving refactoring
├── .github/
│   ├── prompts/           # 10 matching prompt templates for GitHub Copilot
│   ├── ISSUE_TEMPLATE/    # Generic GitHub Issue templates (bug report & feature request)
│   └── PULL_REQUEST_TEMPLATE.md  # Standard pull request template
├── reference.md           # Repository configuration reference (customize once per project)
├── HOWTO-AI-WORKFLOW.md   # Complete step-by-step workflow guide
└── README.md              # This file
```

## Documentation & Guide

Read [`HOWTO-AI-WORKFLOW.md`](HOWTO-AI-WORKFLOW.md) for full instructions on running `/feature`, navigating GATE 1 / GATE 2 / GATE 3, sizing rules, and customizing `reference.md`.
