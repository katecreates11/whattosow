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

/** Load a source into a sharp instance, falling back through `sips` for HEICs sharp can't decode. */
async function loadSource(srcPath: string): Promise<sharp.Sharp> {
  try {
    await sharp(srcPath, { failOn: "none" }).metadata(); // throws on unsupported HEIC
    return sharp(srcPath, { failOn: "none" });
  } catch {
    // Fallback: sips converts HEIC -> jpeg (macOS dev only).
    const tmpJpg = path.join(os.tmpdir(), `wts-sips-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`);
    await execFileP("sips", ["-s", "format", "jpeg", srcPath, "--out", tmpJpg]);
    return sharp(tmpJpg, { failOn: "none" });
  }
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
