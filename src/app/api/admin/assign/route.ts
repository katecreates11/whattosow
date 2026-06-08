import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { processPhoto } from "@/lib/process-photo";
import { getSlotDef } from "@/data/image-slot-registry";
import { PROD, safeSource, SLOTS_DIR, MANIFEST } from "../_dev";

export async function POST(req: NextRequest) {
  if (PROD) return new NextResponse("Not found", { status: 404 });
  const { slotId, sourcePath, alt = "", caption = "", rotateExtra = 0 } = await req.json();

  const def = getSlotDef(slotId);
  if (!def) return NextResponse.json({ error: "unknown slot" }, { status: 400 });
  const abs = safeSource(sourcePath);
  if (!abs) return NextResponse.json({ error: "bad source path" }, { status: 400 });

  const outRel = `/photos/slots/${slotId}.webp`;
  const outAbs = path.join(SLOTS_DIR, `${slotId}.webp`);
  await processPhoto({ srcPath: abs, outPath: outAbs, shape: def.shape, rotateExtra: Number(rotateExtra) });

  const manifest = JSON.parse(await fs.readFile(MANIFEST, "utf8"));
  manifest[slotId] = { src: outRel, alt, caption };
  await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");

  return NextResponse.json({ ok: true, slotId, assignment: manifest[slotId] });
}
