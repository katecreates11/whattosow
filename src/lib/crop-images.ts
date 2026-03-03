import { existsSync } from "fs";
import { join } from "path";

const CROP_IMAGE_DIR = join(process.cwd(), "public/images/crops");

/**
 * Check if a crop has a PNG illustration available.
 * Only works at build time (server components / SSG).
 */
export function hasCropImage(slug: string): boolean {
  return existsSync(join(CROP_IMAGE_DIR, `${slug}.png`));
}

/**
 * Get the public path for a crop illustration.
 * Returns null if no image exists.
 */
export function getCropImagePath(slug: string): string | null {
  if (!hasCropImage(slug)) return null;
  return `/images/crops/${slug}.png`;
}
