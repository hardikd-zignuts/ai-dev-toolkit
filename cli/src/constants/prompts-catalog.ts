import fs from "node:fs";
import path from "node:path";
import type { SetupPromptMeta } from "../types.js";
import { getPromptsSourceDir } from "../lib/assets-source.js";

export const PROMPTS_CATALOG: SetupPromptMeta[] = [
  {
    id: "auth-guards",
    title: "Auth Guards Setup",
    category: "Security / Routing",
    frameworks: "React, Next.js, Vue, Nuxt, SvelteKit",
    fileName: "auth-guards-setup.md",
    filePath: "",
  },
  {
    id: "layouts",
    title: "Layouts Setup",
    category: "Architecture",
    frameworks: "React, Next.js, Vue, Nuxt, SvelteKit",
    fileName: "layouts-setup.md",
    filePath: "",
  },
  {
    id: "tanstack-query",
    title: "TanStack Query Setup",
    category: "Data Fetching",
    frameworks: "React Query, Vue Query, Svelte Query, Next.js, Nuxt",
    fileName: "tanstack-query-setup.md",
    filePath: "",
  },
  {
    id: "firebase",
    title: "Firebase Setup",
    category: "Backend / BaaS",
    frameworks: "React, Next.js, Vue, Nuxt, SvelteKit",
    fileName: "firebase-setup.md",
    filePath: "",
  },
  {
    id: "api-client",
    title: "API Client Setup",
    category: "Networking",
    frameworks: "Axios / Fetch / Ofetch (React, Next.js, Vue, Nuxt, Svelte)",
    fileName: "api-client-setup.md",
    filePath: "",
  },
  {
    id: "state-store",
    title: "State Store Setup",
    category: "State Management",
    frameworks: "Zustand, Pinia, Redux Toolkit, Svelte Stores",
    fileName: "state-store-setup.md",
    filePath: "",
  },
  {
    id: "theme-provider",
    title: "Theme Provider Setup",
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
