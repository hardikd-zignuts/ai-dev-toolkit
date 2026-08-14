import { spawnSync } from "node:child_process";

export function copyToClipboard(text: string): boolean {
  try {
    const platform = process.platform;
    if (platform === "darwin") {
      const proc = spawnSync("pbcopy", { input: text, encoding: "utf8" });
      return proc.status === 0;
    }

    if (platform === "win32") {
      const proc = spawnSync("powershell", ["-command", "Set-Clipboard", "-Value", `"${text.replace(/"/g, '`"')}"`]);
      return proc.status === 0;
    }

    if (platform === "linux") {
      let proc = spawnSync("xclip", ["-selection", "clipboard"], { input: text, encoding: "utf8" });
      if (proc.status === 0) return true;

      proc = spawnSync("xsel", ["--clipboard", "--input"], { input: text, encoding: "utf8" });
      return proc.status === 0;
    }
  } catch {
    return false;
  }
  return false;
}
