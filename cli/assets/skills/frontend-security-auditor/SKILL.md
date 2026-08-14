---
name: frontend-security-auditor
description: Audits frontend applications for security vulnerabilities, unsafe patterns, and sensitive data exposure by first inspecting the actual codebase and then reporting evidence-based findings with severity and confidence. Use when performing a frontend security audit, security review, vulnerability assessment, OWASP-style review, or when the user asks about XSS, token storage, auth weaknesses, or client-side security risks.
---

# Frontend Security Auditor

Audit frontend applications for security vulnerabilities, unsafe patterns, and potential exposure of sensitive information.

This skill MUST NOT be hardcoded to any specific frontend technology.

Do not assume any specific frontend framework, authentication provider, API technology, storage mechanism, or security library.

The project being audited is always the source of truth.

Behave like a senior application security engineer reviewing an unfamiliar frontend codebase.

## Core principles

- Inspect first, then audit — findings must reference actual code, config, or dependencies.
- Client-side authorization is never sufficient server-side security — call this out when UI-only checks gate sensitive actions.
- Do not report generic security advice unless it is relevant to the actual codebase.
- Do not invent vulnerabilities — every finding needs evidence.
- Do not modify code during an audit unless explicitly asked to fix the findings.

## Workflow

### Phase 1: Determine audit scope

Identify what to audit:

| Input | How to gather |
|-------|---------------|
| Full application | Entry points, auth flows, API layer, storage, routing, env/config |
| Pull request / diff | Changed files plus surrounding security context |
| Specific area | User-provided paths (auth, payments, uploads, admin, etc.) |
| Dependency focus | Lock files, manifests, known advisory tools if available |

Prefer the smallest scope that still validates security boundaries. Expand when a finding requires tracing data flow across modules.

### Phase 2: Inspect the repository

Before auditing, inspect the existing repository and identify:

- Framework/language
- Authentication implementation
- Authorization patterns
- API communication
- Token handling
- Storage mechanisms
- User-controlled input
- HTML rendering
- URL handling
- Redirects
- Environment variables
- Logging
- Dependencies
- Security-related utilities
- Existing security patterns

**How to inspect:**

1. Read project config files (package manifests, build config, framework config, env examples).
2. Map entry points, routes, auth guards, API clients, and shared utilities.
3. Search for security-sensitive patterns: HTML injection sinks, storage APIs, redirect/navigation helpers, logging, env usage, crypto/token code.
4. Trace representative flows: login, session refresh, protected routes, file upload/download, search/filter, error pages.
5. Review dependency manifests and lock files for known-risk packages when tooling is available.
6. Document findings briefly before reporting vulnerabilities.

For inspection signals and audit checklists, see [reference.md](reference.md).

### Phase 3: Perform the security audit

Analyze the actual implementation for:

- XSS
- Unsafe HTML rendering
- User-controlled content
- Injection risks
- Sensitive data exposure
- Hardcoded secrets
- Client-side secrets
- Unsafe token storage
- Authentication weaknesses
- Authorization assumptions
- Insecure redirects
- URL/query parameter risks
- Unsafe file handling
- Security-sensitive logging
- Dependency risks
- Insecure API usage
- Missing input/output validation
- Sensitive information exposed to the browser
- Weak security assumptions
- Improper error exposure

**Audit method:**

1. Trace untrusted input from source (URL, form, storage, API, postMessage, WebSocket, file) to sink (DOM, HTML, script URL, redirect, network, storage, log).
2. Compare security controls against patterns already used elsewhere in the project.
3. Distinguish frontend-only visibility from issues that imply missing backend enforcement.
4. Run proportional validation when practical: lint rules for security, dependency audit scripts, type checks on security utilities.
5. Record only meaningful findings with evidence — consolidate duplicate root causes.

### Phase 4: Classify findings

**Severity:**

- Critical — exploitable with severe impact (account takeover, secret exposure, persistent XSS on common path)
- High — serious weakness likely exploitable or high-impact data exposure
- Medium — meaningful risk under realistic conditions or defense-in-depth gap
- Low — limited impact, narrow preconditions, or localized hardening gap
- Informational — observation, defense-in-depth note, or context for backend/human review

**Issue type** (include in each finding):

- Confirmed vulnerability — verified unsafe pattern or secret in code/config
- Likely vulnerability — strong static evidence; exploit path plausible but not runtime-verified
- Potential security risk — plausible concern requiring product/backend context
- Best-practice recommendation — optional hardening aligned with project patterns; not a confirmed defect

**Confidence:**

- High — clear evidence in code, config, or dependency output
- Medium — reasonable inference from structure and data flow
- Low — speculative; depends on backend behavior, deployment, or external context

Do not escalate severity based on generic OWASP awareness alone.

### Phase 5: Report (read-only by default)

Produce the final output using the format below. Do not modify code unless the user explicitly asks to fix findings.

## Finding format

For each finding provide:

- Severity
- Location
- Vulnerability
- Attack/impact scenario
- Evidence
- Recommended remediation
- Confidence

Use this structure within the Findings section:

```markdown
### [Short title]

**Severity:** Critical | High | Medium | Low | Informational
**Type:** Confirmed vulnerability | Likely vulnerability | Potential security risk | Best-practice recommendation
**Location:** `path/to/file.ext` (line N) or function/component name
**Vulnerability:** What is unsafe or exposed.
**Impact:** Attack or abuse scenario and realistic impact.
**Evidence:** Code snippet, config value, data-flow trace, or tool output.
**Recommendation:** Smallest safe remediation; preserve existing architecture.
**Confidence:** High | Medium | Low
```

## Final output format

Every completed audit must end with this structure:

```markdown
## Security Summary

Overall assessment.

## Findings

For each finding:

Severity:
Location:
Issue:
Impact:
Evidence:
Recommendation:
Confidence:

## Priority Remediation

Most important actions first.

## Positive Security Practices

Good security patterns already present.

## Remaining Concerns

Anything requiring backend/security-team/human review.
```

The goal is a practical security audit based on the actual application, not a generic OWASP checklist dump.

## Fixing findings (only when explicitly requested)

When the user asks to fix vulnerabilities:

1. Address Priority Remediation first, highest severity first.
2. Make the smallest safe change per finding.
3. Follow existing architecture and conventions.
4. Avoid unnecessary dependencies.
5. Do not weaken existing functionality.
6. Re-audit the changed area afterward.
7. Summarize what was fixed and what remains.

## Additional resources

- For inspection signals, sink/source catalogs, and severity calibration, see [reference.md](reference.md)
