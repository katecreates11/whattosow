import { describe, it, expect, afterAll } from "vitest";
import sharp from "sharp";
import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { processPhoto } from "./process-photo";

const tmp = path.join(os.tmpdir(), "wts-proc-test");

afterAll(async () => { await fs.rm(tmp, { recursive: true, force: true }); });

/** Mean of the red channel over a region — ~0 is black, ~255 is white. */
async function regionMean(file: string, region: sharp.Region): Promise<number> {
  const { data, info } = await sharp(file).extract(region).raw().toBuffer({ resolveWithObject: true });
  let sum = 0;
  const px = data.length / info.channels;
  for (let i = 0; i < data.length; i += info.channels) sum += data[i];
  return sum / px;
}

/**
 * A LANDSCAPE image, left half black / right half white, tagged EXIF orientation 6
 * ("rotate 90° CW to display"). Correctly oriented, it displays as
 * top-half black / bottom-half white. If orientation is ignored (the bug),
 * it stays left-black / right-white.
 */
async function makeOrientationProbe(): Promise<string> {
  await fs.mkdir(tmp, { recursive: true });
  const left = await sharp({ create: { width: 200, height: 300, channels: 3, background: "#000000" } }).png().toBuffer();
  const right = await sharp({ create: { width: 200, height: 300, channels: 3, background: "#ffffff" } }).png().toBuffer();
  const src = path.join(tmp, "probe.jpg");
  await sharp({ create: { width: 400, height: 300, channels: 3, background: "#000" } })
    .composite([{ input: left, left: 0, top: 0 }, { input: right, left: 200, top: 0 }])
    .withMetadata({ orientation: 6 })
    .jpeg()
    .toFile(src);
  return src;
}

describe("processPhoto", () => {
  it("auto-applies EXIF orientation (black ends up on top, not on the left)", async () => {
    const src = await makeOrientationProbe();
    const out = path.join(tmp, "out-oriented.webp");
    await processPhoto({ srcPath: src, outPath: out, shape: "square" });
    const m = await sharp(out).metadata();
    const W = m.width!, H = m.height!;
    const topMean = await regionMean(out, { left: 0, top: 0, width: W, height: Math.floor(H / 4) });
    const bottomMean = await regionMean(out, { left: 0, top: Math.floor((H * 3) / 4), width: W, height: Math.floor(H / 4) });
    expect(topMean).toBeLessThan(80);     // top is the black half (oriented)
    expect(bottomMean).toBeGreaterThan(175); // bottom is the white half
  });

  it("outputs webp at the requested shape and strips metadata", async () => {
    const src = await makeOrientationProbe();
    const out = path.join(tmp, "out-clean.webp");
    await processPhoto({ srcPath: src, outPath: out, shape: "wide" });
    const m = await sharp(out).metadata();
    expect(m.format).toBe("webp");
    expect(m.width! > m.height!).toBe(true); // wide
    expect(m.orientation).toBeUndefined();
    expect(m.exif).toBeUndefined();
  });

  it("applies a manual rotateExtra nudge without error", async () => {
    await fs.mkdir(tmp, { recursive: true });
    const src = path.join(tmp, "tall.jpg");
    await sharp({ create: { width: 200, height: 400, channels: 3, background: "#555" } }).jpeg().toFile(src);
    const out = path.join(tmp, "out-rot.webp");
    await processPhoto({ srcPath: src, outPath: out, shape: "portrait", rotateExtra: 90 });
    const m = await sharp(out).metadata();
    expect(m.format).toBe("webp");
  });
});
