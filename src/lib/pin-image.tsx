import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

/**
 * The Pinterest pin engine. Pinterest is image-first and vertical (2:3), so
 * these are 1000×1500 — quite different from our 1200×630 OG cards. One
 * branded, magazine-styled template, generated per crop / variety / seasonal
 * moment, so we can pin at scale without building each one by hand.
 *
 * Palette: the What To Sow Ghibli set (cream / allotment green / amber / earth)
 * — NOT the Wiley brand. Type: Newsreader serif + IBM Plex Mono, bundled in
 * src/assets/fonts so the build never depends on the network.
 */

export const PIN_SIZE = { width: 1000, height: 1500 };

const CREAM = "#F5EFE0";
const EARTH = "#2A2018";
const EARTH_LIGHT = "#6B5D4F";
const ALLOTMENT = "#2D5F3E";
const AMBER = "#D4943A";

const FONT_DIR = path.join(process.cwd(), "src/assets/fonts");
let cachedFonts: { name: string; data: Buffer; weight: 400 | 500; style: "normal" | "italic" }[] | null = null;

function pinFonts() {
  if (!cachedFonts) {
    cachedFonts = [
      { name: "Newsreader", data: fs.readFileSync(path.join(FONT_DIR, "NewsreaderDisplay.ttf")), weight: 400, style: "normal" },
      { name: "Newsreader", data: fs.readFileSync(path.join(FONT_DIR, "NewsreaderItalic.ttf")), weight: 400, style: "italic" },
      { name: "Plex", data: fs.readFileSync(path.join(FONT_DIR, "IBMPlexMono-Medium.ttf")), weight: 500, style: "normal" },
    ];
  }
  return cachedFonts;
}

/**
 * Resolve a photo src (local /photos/*.webp or a remote Unsplash URL) into a
 * JPEG data URL, since Satori (behind ImageResponse) doesn't render WebP.
 * Returns null on any failure so the caller falls back to the typographic pin.
 */
export async function pinPhoto(src: string | null): Promise<string | null> {
  if (!src) return null;
  try {
    let input: Buffer;
    if (src.startsWith("http")) {
      const url = src.split("?")[0] + "?w=1200&h=1100&fit=crop&q=80";
      const res = await fetch(url);
      if (!res.ok) return null;
      input = Buffer.from(await res.arrayBuffer());
    } else {
      input = fs.readFileSync(path.join(process.cwd(), "public", src));
    }
    const jpeg = await sharp(input).resize(1000, 1000, { fit: "cover" }).jpeg({ quality: 82 }).toBuffer();
    return `data:image/jpeg;base64,${jpeg.toString("base64")}`;
  } catch {
    return null;
  }
}

export interface PinOptions {
  eyebrow: string; // mono, uppercase — e.g. "WHEN TO SOW · UK"
  title: string; // the big serif line
  hook: string; // one editorial line beneath
  photo: string | null; // JPEG data URL from pinPhoto(), or null
  no?: number; // herbarium "No." for the photo-less specimen card
  category?: string; // small italic descriptor for the specimen card
}

function Wordmark() {
  return (
    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", width: "100%" }}>
      <span style={{ fontFamily: "Newsreader", fontSize: 34, color: EARTH }}>What To Sow</span>
      <span style={{ fontFamily: "Plex", fontSize: 20, letterSpacing: 1, color: EARTH_LIGHT }}>whattosow.co.uk</span>
    </div>
  );
}

export function renderPin(opts: PinOptions) {
  const { eyebrow, title, hook, photo, no, category } = opts;

  const textBlock = (
    <div style={{ display: "flex", flexDirection: "column", padding: "56px 64px 60px", flex: 1, justifyContent: "space-between" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontFamily: "Plex", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: ALLOTMENT }}>
          {eyebrow}
        </span>
        <div style={{ display: "flex", width: 84, height: 5, background: AMBER, margin: "26px 0 28px" }} />
        <span style={{ fontFamily: "Newsreader", fontSize: 86, lineHeight: 1.0, color: EARTH, letterSpacing: -1 }}>
          {title}
        </span>
        <span style={{ fontFamily: "Newsreader", fontStyle: "italic", fontSize: 36, lineHeight: 1.3, color: EARTH_LIGHT, marginTop: 24, maxWidth: 760 }}>
          {hook}
        </span>
      </div>
      <Wordmark />
    </div>
  );

  const jsx = photo ? (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: CREAM }}>
      <div style={{ display: "flex", width: "100%", height: 900, position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} width={1000} height={900} style={{ objectFit: "cover" }} alt="" />
      </div>
      {textBlock}
    </div>
  ) : (
    // Photo-less: the herbarium specimen card (matches the site's taped-label motif)
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: CREAM, padding: 64 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          border: `2px solid ${ALLOTMENT}22`,
          position: "relative",
          padding: "72px 60px",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", position: "absolute", top: -16, left: "50%", marginLeft: -54, width: 108, height: 30, background: "rgba(212,148,58,0.42)" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontFamily: "Plex", fontSize: 20, letterSpacing: 3, textTransform: "uppercase", color: ALLOTMENT }}>
            {eyebrow}
            {no ? `  ·  No. ${no}` : ""}
          </span>
          <div style={{ display: "flex", width: "100%", height: 1, background: `${ALLOTMENT}33`, margin: "22px 0" }} />
          {category && (
            <span style={{ fontFamily: "Newsreader", fontStyle: "italic", fontSize: 30, color: EARTH_LIGHT }}>{category}</span>
          )}
        </div>
        <span style={{ fontFamily: "Newsreader", fontSize: 120, lineHeight: 0.95, color: EARTH, letterSpacing: -2 }}>{title}</span>
        <span style={{ fontFamily: "Newsreader", fontStyle: "italic", fontSize: 34, lineHeight: 1.3, color: EARTH_LIGHT, maxWidth: 720 }}>
          {hook}
        </span>
      </div>
      <div style={{ display: "flex", marginTop: 40 }}>
        <Wordmark />
      </div>
    </div>
  );

  return new ImageResponse(jsx, { ...PIN_SIZE, fonts: pinFonts() });
}
