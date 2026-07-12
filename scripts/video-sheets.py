#!/usr/bin/env python3
"""Contact sheets for the video archive — the token-saving half of the video system.

Finds every clip in videos-raw/ that is NOT yet in docs/video-catalogue.json,
probes it (duration, dims, rotation, shot date), pulls three frames (10% / 50% /
90%), and tiles them into contact-sheet PNGs in videos-raw/_sheets/ — one row
per clip, labelled with filename · duration · date. Claude then Reads the
sheets (a handful of images instead of watching video) and appends catalogue
entries. Same pattern as the photo catalogue: catalogue once, grep forever.

Usage:  python3 scripts/video-sheets.py          # sheet the uncatalogued clips
        python3 scripts/video-sheets.py --all    # re-sheet everything
"""

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "videos-raw"
SHEETS = RAW / "_sheets"
CATALOGUE = ROOT / "docs" / "video-catalogue.json"

VIDEO_EXT = {".mov", ".mp4", ".m4v", ".avi", ".hevc"}
ROWS_PER_SHEET = 8
THUMB_W = 320

try:
    from PIL import Image, ImageDraw
except ImportError:
    sys.exit("needs Pillow: pip3 install Pillow")


def probe(path: Path) -> dict:
    out = subprocess.run(
        ["ffprobe", "-v", "quiet", "-print_format", "json", "-show_format", "-show_streams", str(path)],
        capture_output=True, text=True,
    ).stdout
    d = json.loads(out)
    v = next(s for s in d["streams"] if s["codec_type"] == "video")
    rotation = 0
    for sd in v.get("side_data_list", []):
        if "rotation" in sd:
            rotation = int(sd["rotation"])
    w, h = v["width"], v["height"]
    if rotation in (90, -90, 270):
        w, h = h, w
    return {
        "duration_s": round(float(d["format"]["duration"]), 1),
        "width": w,
        "height": h,
        "date": (d["format"].get("tags", {}).get("creation_time") or "")[:16].replace("T", " "),
    }


def frames(path: Path, duration: float, tmp: Path) -> list[Path]:
    outs = []
    for i, frac in enumerate((0.1, 0.5, 0.9)):
        t = max(0.1, duration * frac)
        out = tmp / f"{path.stem}-{i}.jpg"
        subprocess.run(
            ["ffmpeg", "-v", "quiet", "-ss", str(t), "-i", str(path),
             "-frames:v", "1", "-vf", f"scale={THUMB_W}:-2", str(out), "-y"],
            check=False,
        )
        if out.exists():
            outs.append(out)
    return outs


def main() -> None:
    resheet_all = "--all" in sys.argv
    catalogued = set()
    if CATALOGUE.exists():
        catalogued = set(json.loads(CATALOGUE.read_text()).get("clips", {}).keys())

    clips = sorted(
        p for p in RAW.iterdir()
        if p.suffix.lower() in VIDEO_EXT and (resheet_all or p.name not in catalogued)
    )
    if not clips:
        print("nothing new to sheet — every clip is already in the catalogue")
        return

    SHEETS.mkdir(exist_ok=True)
    tmp = SHEETS / "_tmp"
    tmp.mkdir(exist_ok=True)

    rows = []
    for clip in clips:
        meta = probe(clip)
        imgs = [Image.open(f) for f in frames(clip, meta["duration_s"], tmp)]
        if not imgs:
            print(f"  !! no frames from {clip.name}")
            continue
        h = max(im.height for im in imgs)
        row = Image.new("RGB", (THUMB_W * 3 + 20, h + 26), "white")
        for i, im in enumerate(imgs):
            row.paste(im, (i * (THUMB_W + 10), 26))
        label = f'{clip.name}  ·  {meta["duration_s"]}s  ·  {meta["width"]}x{meta["height"]}  ·  {meta["date"]}'
        ImageDraw.Draw(row).text((4, 6), label, fill="black")
        rows.append(row)
        print(f"  {label}")

    for s in range(0, len(rows), ROWS_PER_SHEET):
        batch = rows[s : s + ROWS_PER_SHEET]
        sheet = Image.new("RGB", (max(r.width for r in batch), sum(r.height + 8 for r in batch)), "white")
        y = 0
        for r in batch:
            sheet.paste(r, (0, y))
            y += r.height + 8
        out = SHEETS / f"sheet-{s // ROWS_PER_SHEET + 1:02d}.png"
        sheet.save(out)
        print(f"wrote {out.relative_to(ROOT)}")

    for f in tmp.iterdir():
        f.unlink()
    tmp.rmdir()


if __name__ == "__main__":
    main()
