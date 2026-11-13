import fs from "node:fs";
import path from "node:path";

export function isMenuFileAvailable(fileUrl: string | null): fileUrl is string {
  if (!fileUrl) return false;
  if (!fileUrl.startsWith("/")) return true;
  return fs.existsSync(path.join(process.cwd(), "public", fileUrl));
}
