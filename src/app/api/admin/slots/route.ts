import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { imageSlotRegistry } from "@/data/image-slot-registry";
import { PROD, RAW_DIR, MANIFEST, isImage } from "../_dev";

export async function GET() {
  if (PROD) return new NextResponse("Not found", { status: 404 });

  const manifest = JSON.parse(await fs.readFile(MANIFEST, "utf8"));

  let raw: string[] = [];
  try {
    raw = (await fs.readdir(RAW_DIR)).filter(isImage).map((f) => `photos-raw/${f}`);
  } catch {
    raw = [];
  }

  // already-processed web photos (for re-use)
  const blogDir = path.join(process.cwd(), "public", "photos", "blog");
  let web: string[] = [];
  try {
    web = (await fs.readdir(blogDir)).filter(isImage).map((f) => `public/photos/blog/${f}`);
  } catch {
    web = [];
  }

  return NextResponse.json({ slots: imageSlotRegistry, manifest, library: { raw, web } });
}
