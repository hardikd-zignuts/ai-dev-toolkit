import fs from "node:fs";
import path from "node:path";
import type { SetupPromptMeta } from "../types.js";
import { getPromptsSourceDir } from "../lib/assets-source.js";

export const PROMPTS_CATALOG: SetupPromptMeta[] = [
  {
    id: "auth-guards",
    title: "Login and protected pages",
    summary: "Keep private pages behind login so only signed-in users can open them",
    category: "Security / Routing",
    frameworks: "React, Next.js, Vue, Nuxt, SvelteKit",
    fileName: "auth-guards-setup.md",
    filePath: "",
  },
  {
    id: "layouts",
    title: "Page layouts",
    summary: "Add shared shells such as a header, sidebar, and nested page layouts",
    category: "Architecture",
    frameworks: "React, Next.js, Vue, Nuxt, SvelteKit",
    fileName: "layouts-setup.md",
    filePath: "",
  },
  {
    id: "tanstack-query",
    title: "Data fetching",
    summary: "Add shared loading, caching, and refetch for API data",
    category: "Data Fetching",
    frameworks: "React Query, Vue Query, Svelte Query, Next.js, Nuxt",
    fileName: "tanstack-query-setup.md",
    filePath: "",
  },
  {
    id: "firebase",
    title: "Firebase",
    summary: "Connect Firebase authentication and data to this app",
    category: "Backend / BaaS",
    frameworks: "React, Next.js, Vue, Nuxt, SvelteKit",
    fileName: "firebase-setup.md",
    filePath: "",
  },
  {
    id: "api-client",
    title: "API client",
    summary: "Add a shared HTTP client for talking to your backend",
    category: "Networking",
    frameworks: "Axios / Fetch / Ofetch (React, Next.js, Vue, Svelte)",
    fileName: "api-client-setup.md",
    filePath: "",
  },
  {
    id: "state-store",
    title: "App state",
    summary: "Add a shared client-side store (Zustand, Pinia, Redux, or similar)",
    category: "State Management",
    frameworks: "Zustand, Pinia, Redux Toolkit, Svelte Stores",
    fileName: "state-store-setup.md",
    filePath: "",
  },
  {
    id: "theme-provider",
    title: "Light and dark theme",
    summary: "Add a theme switcher that follows your existing UI library",
    category: "UI System",
    frameworks: "Light/Dark mode for React, Next.js, Vue, Nuxt, Svelte",
    fileName: "theme-provider-setup.md",
    filePath: "",
  },
];

export function listAvailablePrompts(): SetupPromptMeta[] {
  const promptsDir = getPromptsSourceDir();

  return PROMPTS_CATALOG.map((item) => ({
    ...item,
    filePath: path.join(promptsDir, item.fileName),
  }));
}

export function getPromptContent(promptIdOrFilename: string): string | null {
  const prompts = listAvailablePrompts();
  const found = prompts.find(
    (p) => p.id === promptIdOrFilename || p.fileName === promptIdOrFilename,
  );

  if (!found || !fs.existsSync(found.filePath)) {
    return null;
  }

  return fs.readFileSync(found.filePath, "utf8");
}
