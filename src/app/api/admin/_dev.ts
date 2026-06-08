import path from "path";

export const PROD = process.env.NODE_ENV === "production";

export const REPO_ROOT = process.cwd();
export const RAW_DIR = path.join(REPO_ROOT, "photos-raw");
export const PUBLIC_DIR = path.join(REPO_ROOT, "public");
export const SLOTS_DIR = path.join(PUBLIC_DIR, "photos", "slots");
export const MANIFEST = path.join(REPO_ROOT, "src", "data", "image-slots.json");

/** Resolve a user-supplied source path and ensure it stays inside photos-raw/ or public/. */
export function safeSource(rel: string): string | null {
  const abs = path.resolve(REPO_ROOT, rel);
  if (abs.startsWith(RAW_DIR + path.sep) || abs.startsWith(PUBLIC_DIR + path.sep)) return abs;
  return null;
}

const IMAGE_RE = /\.(heic|jpe?g|png|webp)$/i;
export const isImage = (f: string) => IMAGE_RE.test(f);
