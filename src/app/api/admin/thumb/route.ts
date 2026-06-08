import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";
import sharp from "sharp";
import { PROD, safeSource } from "../_dev";

const execFileP = promisify(execFile);
const CACHE = path.join(os.tmpdir(), "wts-admin-thumbs");

export async function GET(req: NextRequest) {
  if (PROD) return new NextResponse("Not found", { status: 404 });
  const rel = req.nextUrl.searchParams.get("file");
  if (!rel) return new NextResponse("missing file", { status: 400 });
  const abs = safeSource(rel);
  if (!abs) return new NextResponse("bad path", { status: 400 });

  await fs.mkdir(CACHE, { recursive: true });
  const key = Buffer.from(rel).toString("base64url") + ".jpg";
  const cached = path.join(CACHE, key);
  try {
    const buf = await fs.readFile(cached);
    return new NextResponse(new Uint8Array(buf), { headers: { "Content-Type": "image/jpeg" } });
  } catch {
    /* generate below */
  }

  try {
    await sharp(abs, { failOn: "none" }).rotate().resize(360, 360, { fit: "cover" }).jpeg({ quality: 70 }).toFile(cached);
  } catch {
    // HEIC sharp can't read → sips
    await execFileP("sips", ["-s", "format", "jpeg", "-Z", "360", abs, "--out", cached]);
  }
  const buf = await fs.readFile(cached);
  return new NextResponse(new Uint8Array(buf), { headers: { "Content-Type": "image/jpeg" } });
}
