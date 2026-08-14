# Frontend Security Auditor — Reference

Use during Phase 2 (inspect) and Phase 3 (audit). Read only sections relevant to the codebase and scope.

## Repository inspection

### Project identity

| Signal | Where to look |
|--------|---------------|
| Language | File extensions, compiler config, language version settings |
| Framework | Package manifests, framework config, entry points |
| Build/runtime | Build config, SSR/SSG flags, service worker, webview/Electron wrappers |
| Package manager | Lock files and workspace layout |
| Env/config | `.env.example`, runtime config injection, public vs server env naming |

### Security-relevant architecture

| Area | Where to look |
|------|---------------|
| Authentication | Login/signup flows, OAuth callbacks, session refresh, MFA hooks |
| Authorization | Route guards, role/permission checks, feature flags gating sensitive UI |
| API communication | HTTP clients, GraphQL, WebSocket, SSE, generated SDKs, interceptors |
| Token handling | Access/refresh tokens, JWT decode/display, header/cookie attachment |
| Storage | localStorage, sessionStorage, IndexedDB, cookies, in-memory stores |
| HTML rendering | Template engines, rich text, markdown, SVG, iframe embeds |
| URL/routing | Query/hash parsing, deep links, open-redirect helpers, `window.location` |
| File handling | Upload widgets, preview, download links, blob URLs, drag-drop |
| Logging/analytics | Console usage, client log shipping, error reporters, session replay |
| Crypto/security utils | Hashing, encoding, sanitizers, CSP helpers, DOMPurify equivalents |
| Dependencies | Direct and transitive packages; audit scripts in manifest |

Document concrete examples (file paths + pattern names) before listing findings.

## Data-flow audit model

Trace **sources → transforms → sinks**.

### Common untrusted sources

- URL query, hash, path segments
- Form fields, clipboard, drag-drop
- API/WebSocket/postMessage responses
- localStorage/sessionStorage/IndexedDB reads
- File names and file contents from uploads
- Third-party embeds and script tags

### High-risk sinks

- `innerHTML`, `outerHTML`, `document.write`, template literal HTML
- Framework-specific raw HTML bindings (any equivalent of unsanitized HTML)
- `eval`, `Function`, dynamic `import()`, string-based timers with user input
- `javascript:` URLs, unsanitized `href`/`src`/`action`
- `location.assign/replace`, `window.open`, meta refresh, redirect wrappers
- `postMessage` without origin validation
- Logging/error reporting with tokens, PII, or full request bodies
- Client storage of secrets, refresh tokens, or long-lived credentials

## Audit categories

### XSS and unsafe HTML rendering

- User/API content rendered as HTML without sanitization
- Markdown/rich-text pipelines missing allowlists
- SVG or custom element injection
- DOM clobbering via `id`/`name` collisions when paired with unsafe selectors
- Reflected/stored XSS via URL params echoed into DOM or errors

### Injection (non-SQL)

- Command-like strings passed to shell/exec bridges in hybrid apps
- LDAP/graph query string building on client (usually indicates backend risk; note exposure)
- Template injection in client-side template engines with user-controlled templates

### Sensitive data exposure

- Secrets, API keys, private keys, or signing material in client bundles or repos
- Env vars prefixed for public exposure containing sensitive values
- Tokens/PII in URLs, analytics events, crash reports, or console logs
- Over-fetching: API responses cached or displayed beyond UI need
- Source maps or debug endpoints exposing internals in production builds

### Authentication weaknesses

- Tokens in localStorage/sessionStorage without compensating controls
- Missing logout/session invalidation on client
- Client-trust of JWT claims for authorization without server enforcement
- Weak or custom crypto for passwords/tokens on client
- OAuth/state/nonce/PKCE mishandling in redirect flows

### Authorization assumptions

- UI-only hiding of buttons/routes without server-side enforcement (document as defense-in-depth gap)
- Role checks based on tamperable client state
- Direct object references in client API calls without ownership validation (flag for backend review)
- Admin/privileged flows reachable by URL manipulation

### Redirects and URL risks

- Open redirects via unvalidated `next`, `returnUrl`, `redirect` parameters
- `javascript:` or data URLs in navigation helpers
- Passing secrets in query strings (tokens, emails, reset codes)

### File handling

- Client-side-only file type/size checks without server validation note
- Rendering uploaded HTML/SVG/PDF inline
- Object URLs not revoked; cross-tab leakage
- Path traversal patterns in download filenames from API

### API usage

- Credentials included cross-origin without clear CORS/cookie strategy
- Sensitive operations over GET
- Missing CSRF tokens where cookie-based auth is used (note if pattern exists elsewhere)
- Hardcoded internal URLs or admin endpoints in client code

### Input/output validation

- Missing encoding when inserting into HTML, URLs, CSS, or JS contexts
- Trusting client-side validation as sole control
- Error messages exposing stack traces, SQL, or internal IDs in production UI

### Logging and error exposure

- Logging tokens, passwords, recovery codes, full credit card fields
- Verbose error boundaries showing raw API errors to end users
- Client-side log levels left verbose in production builds

### Dependencies

- Known vulnerable versions when verifiable from lockfile or audit output
- Unmaintained crypto/auth libraries
- Supply-chain risk: postinstall scripts, unpinned CDN scripts, typosquatting indicators

Only report dependency issues with verifiable evidence — do not guess CVEs without checking.

## Severity calibration

| Severity | Frontend examples |
|----------|-------------------|
| Critical | Hardcoded production secret in repo; persistent XSS on authenticated page; refresh token in localStorage on high-value app with evidence of theft path |
| High | Likely DOM XSS on common input; open redirect in auth flow; sensitive PII in analytics payload |
| Medium | Missing sanitization on bounded admin-only UI; defense-in-depth gap on client-only authZ; verbose errors on failure path |
| Low | Narrow edge-case encoding gap; informational leakage in dev-only code path |
| Informational | Note for backend team; CSP not present but no direct sink found |

## Confidence calibration

| Confidence | When to use |
|------------|-------------|
| High | Unsafe sink + untrusted source visible; secret in committed file; audit tool confirms CVE |
| Medium | Strong static path; exploit depends on deployment or backend confirmation |
| Low | Requires runtime test, WAF, or server behavior unknown from frontend-only review |

Prefer fewer high-confidence findings over many speculative ones.

## Validation checks

Run when available and proportional to scope:

```bash
# Examples — use the project's actual scripts from package manifest
npm audit
pnpm audit
yarn npm audit
npm run lint
npm run build
```

Search the codebase for high-signal patterns (adapt terms to stack):

- Raw HTML bindings and `innerHTML`
- `eval`, `Function(`, `document.write`
- `localStorage`, `sessionStorage`, `document.cookie`
- `location.href`, `window.open`, redirect query params
- `dangerously`, `v-html`, `[innerHTML]`, `bypassSecurityTrust`
- `apiKey`, `secret`, `password`, `token`, `private_key`
- `.env`, `process.env`, import.meta.env

Record what was run in Remaining Concerns or Security Summary when relevant.

## Anti-patterns in auditing

- Do not dump generic OWASP text unrelated to found code paths.
- Do not treat "use HttpOnly cookies" as a finding when the app uses a deliberate bearer-token SPA pattern unless a concrete weakness is shown.
- Do not duplicate the same root cause across multiple findings — consolidate.
- Do not claim backend vulnerabilities as confirmed without frontend evidence; flag for backend review instead.
- Do not recommend new dependencies unless necessary for a confirmed issue and consistent with project norms.

## Backend / human review triggers

Flag in **Remaining Concerns** when frontend evidence implies server-side validation is required:

- Authorization enforced only in UI
- Sensitive operations callable if API lacks checks
- CORS/cookie/session configuration not visible from frontend repo
- Rate limiting, MFA enforcement, or token revocation not observable client-side
- Penetration testing or threat modeling for payment, healthcare, or regulated data
