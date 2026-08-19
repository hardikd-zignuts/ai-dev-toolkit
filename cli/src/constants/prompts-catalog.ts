import fs from "node:fs";
import path from "node:path";
import type { PromptTreeNode, SetupPromptMeta } from "../types.js";
import { getPromptsSourceDir } from "../lib/assets-source.js";

const AUTH_FRAMEWORKS = "React, Next.js, Vue, Nuxt, SvelteKit";

export const PROMPTS_TREE: PromptTreeNode[] = [
  {
    type: "group",
    id: "auth-security",
    title: "Authentication & Security",
    summary: "Sign-in vendors, OAuth providers, roles, and protected routes",
    children: [
      {
        type: "group",
        id: "authentication",
        title: "Authentication",
        summary: "Choose an auth vendor and wire it to this project",
        children: [
          {
            type: "prompt",
            id: "authjs",
            title: "Auth.js",
            summary: "Session-based Auth.js (NextAuth) for this stack",
            category: "Authentication & Security / Authentication",
            frameworks: AUTH_FRAMEWORKS,
            fileName: "authentication-security/authentication/authjs-setup.md",
          },
          {
            type: "prompt",
            id: "better-auth",
            title: "Better Auth",
            summary: "Better Auth with this project's database and framework helpers",
            category: "Authentication & Security / Authentication",
            frameworks: AUTH_FRAMEWORKS,
            fileName: "authentication-security/authentication/better-auth-setup.md",
          },
          {
            type: "prompt",
            id: "firebase-auth",
            title: "Firebase Authentication",
            summary: "Firebase Auth only (no Firestore or Storage unless you ask)",
            category: "Authentication & Security / Authentication",
            frameworks: AUTH_FRAMEWORKS,
            fileName: "authentication-security/authentication/firebase-auth-setup.md",
          },
          {
            type: "prompt",
            id: "supabase-auth",
            title: "Supabase Auth",
            summary: "Supabase sign-in with this project's SSR or client pattern",
            category: "Authentication & Security / Authentication",
            frameworks: AUTH_FRAMEWORKS,
            fileName: "authentication-security/authentication/supabase-auth-setup.md",
          },
          {
            type: "prompt",
            id: "clerk",
            title: "Clerk",
            summary: "Clerk provider, components, and optional middleware",
            category: "Authentication & Security / Authentication",
            frameworks: AUTH_FRAMEWORKS,
            fileName: "authentication-security/authentication/clerk-setup.md",
          },
        ],
      },
      {
        type: "group",
        id: "oauth",
        title: "OAuth Providers",
        summary: "Attach a social provider to the auth layer you already have",
        children: [
          {
            type: "prompt",
            id: "oauth-google",
            title: "Google",
            summary: "Google sign-in on the existing auth layer",
            category: "Authentication & Security / OAuth Providers",
            frameworks: AUTH_FRAMEWORKS,
            fileName: "authentication-security/oauth/google-setup.md",
          },
          {
            type: "prompt",
            id: "oauth-github",
            title: "GitHub",
            summary: "GitHub sign-in on the existing auth layer",
            category: "Authentication & Security / OAuth Providers",
            frameworks: AUTH_FRAMEWORKS,
            fileName: "authentication-security/oauth/github-setup.md",
          },
          {
            type: "prompt",
            id: "oauth-microsoft",
            title: "Microsoft",
            summary: "Microsoft / Entra ID sign-in on the existing auth layer",
            category: "Authentication & Security / OAuth Providers",
            frameworks: AUTH_FRAMEWORKS,
            fileName: "authentication-security/oauth/microsoft-setup.md",
          },
          {
            type: "prompt",
            id: "oauth-apple",
            title: "Apple",
            summary: "Sign in with Apple on the existing auth layer",
            category: "Authentication & Security / OAuth Providers",
            frameworks: AUTH_FRAMEWORKS,
            fileName: "authentication-security/oauth/apple-setup.md",
          },
          {
            type: "prompt",
            id: "oauth-discord",
            title: "Discord",
            summary: "Discord sign-in on the existing auth layer",
            category: "Authentication & Security / OAuth Providers",
            frameworks: AUTH_FRAMEWORKS,
            fileName: "authentication-security/oauth/discord-setup.md",
          },
        ],
      },
      {
        type: "group",
        id: "authorization",
        title: "Authorization",
        summary: "Roles, permissions, and login-required routes",
        children: [
          {
            type: "prompt",
            id: "rbac",
            title: "RBAC",
            summary: "Roles and permissions on top of the existing auth layer",
            category: "Authentication & Security / Authorization",
            frameworks: AUTH_FRAMEWORKS,
            fileName: "authentication-security/authorization/rbac-setup.md",
          },
          {
            type: "prompt",
            id: "auth-guards",
            title: "Protected Routes",
            summary: "Keep private pages behind login so only signed-in users can open them",
            category: "Authentication & Security / Authorization",
            frameworks: AUTH_FRAMEWORKS,
            fileName: "auth-guards-setup.md",
          },
        ],
      },
    ],
  },
  {
    type: "group",
    id: "app-features",
    title: "App features",
    summary: "Layouts, data fetching, Firebase BaaS, API, state, and theme",
    children: [
      {
        type: "prompt",
        id: "layouts",
        title: "Page layouts",
        summary: "Add shared shells such as a header, sidebar, and nested page layouts",
        category: "Architecture",
        frameworks: AUTH_FRAMEWORKS,
        fileName: "layouts-setup.md",
      },
      {
        type: "prompt",
        id: "tanstack-query",
        title: "Data fetching",
        summary: "Add shared loading, caching, and refetch for API data",
        category: "Data Fetching",
        frameworks: "React Query, Vue Query, Svelte Query, Next.js, Nuxt",
        fileName: "tanstack-query-setup.md",
      },
      {
        type: "prompt",
        id: "firebase",
        title: "Firebase",
        summary: "Connect Firebase authentication and data to this app",
        category: "Backend / BaaS",
        frameworks: AUTH_FRAMEWORKS,
        fileName: "firebase-setup.md",
      },
      {
        type: "prompt",
        id: "api-client",
        title: "API client",
        summary: "Add a shared HTTP client for talking to your backend",
        category: "Networking",
        frameworks: "Axios / Fetch / Ofetch (React, Next.js, Vue, Svelte)",
        fileName: "api-client-setup.md",
      },
      {
        type: "prompt",
        id: "state-store",
        title: "App state",
        summary: "Add a shared client-side store (Zustand, Pinia, Redux, or similar)",
        category: "State Management",
        frameworks: "Zustand, Pinia, Redux Toolkit, Svelte Stores",
        fileName: "state-store-setup.md",
      },
      {
        type: "prompt",
        id: "theme-provider",
        title: "Light and dark theme",
        summary: "Add a theme switcher that follows your existing UI library",
        category: "UI System",
        frameworks: "Light/Dark mode for React, Next.js, Vue, Nuxt, Svelte",
        fileName: "theme-provider-setup.md",
      },
    ],
  },
];

function flattenPromptTree(
  nodes: PromptTreeNode[],
  section?: string,
  group?: string,
): SetupPromptMeta[] {
  const result: SetupPromptMeta[] = [];

  for (const node of nodes) {
    if (node.type === "prompt") {
      result.push({
        id: node.id,
        title: node.title,
        summary: node.summary,
        category: node.category,
        frameworks: node.frameworks,
        fileName: node.fileName,
        filePath: "",
        section,
        group,
      });
      continue;
    }

    const nextSection = section ?? node.title;
    const nextGroup = section ? node.title : undefined;
    result.push(...flattenPromptTree(node.children, nextSection, nextGroup));
  }

  return result;
}

export const PROMPTS_CATALOG: SetupPromptMeta[] = flattenPromptTree(PROMPTS_TREE);

export function listAvailablePrompts(): SetupPromptMeta[] {
  const promptsDir = getPromptsSourceDir();

  return PROMPTS_CATALOG.map((item) => ({
    ...item,
    filePath: path.join(promptsDir, item.fileName),
  }));
}

export function findPromptMeta(promptIdOrFilename: string): SetupPromptMeta | undefined {
  return PROMPTS_CATALOG.find(
    (p) =>
      p.id === promptIdOrFilename ||
      p.fileName === promptIdOrFilename ||
      path.basename(p.fileName) === promptIdOrFilename,
  );
}

export function getPromptContent(promptIdOrFilename: string): string | null {
  const prompts = listAvailablePrompts();
  const found = prompts.find(
    (p) =>
      p.id === promptIdOrFilename ||
      p.fileName === promptIdOrFilename ||
      path.basename(p.fileName) === promptIdOrFilename,
  );

  if (!found || !fs.existsSync(found.filePath)) {
    return null;
  }

  return fs.readFileSync(found.filePath, "utf8");
}
