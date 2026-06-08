import sharp from "sharp";
import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";

const execFileP = promisify(execFile);

export type SlotShape = "wide" | "portrait" | "square";

const SHAPE_DIMS: Record<SlotShape, { w: number; h: number }> = {
  wide: { w: 1600, h: 900 },
  portrait: { w: 1200, h: 1600 },
  square: { w: 1200, h: 1200 },
};

export interface ProcessOpts {
  srcPath: string;
  outPath: string;
  shape: SlotShape;
  rotateExtra?: number; // manual ±90 nudge
}

/**
 * Load a source into a sharp instance. This sharp build can't decode HEIC (the libheif
 * compression plugin isn't built in — and crucially, `.metadata()` succeeds while
 * `.toFile()` fails), so HEIC/HEIF are routed through `sips` (macOS) up front. The
 * sips-produced JPEG keeps its EXIF orientation flag, which the caller's `.rotate()`
 * then applies — same path that fixed the time-lapse orientation.
 */
async function loadSource(srcPath: string): Promise<sharp.Sharp> {
  const ext = path.extname(srcPath).toLowerCase();
  if (ext === ".heic" || ext === ".heif") {
    const tmpJpg = path.join(os.tmpdir(), `wts-sips-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`);
    await execFileP("sips", ["-s", "format", "jpeg", srcPath, "--out", tmpJpg]);
    return sharp(tmpJpg, { failOn: "none" });
  }
  return sharp(srcPath, { failOn: "none" });
}

export async function processPhoto({ srcPath, outPath, shape, rotateExtra = 0 }: ProcessOpts): Promise<void> {
  const { w, h } = SHAPE_DIMS[shape];
  let img = (await loadSource(srcPath)).rotate(); // rotate() with no arg = auto-apply EXIF orientation
  if (rotateExtra) img = img.rotate(rotateExtra);
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await img
    .resize(w, h, { fit: "cover", position: "centre" })
    .webp({ quality: 82 })
    .toFile(outPath); // sharp drops metadata unless withMetadata() is called
}
