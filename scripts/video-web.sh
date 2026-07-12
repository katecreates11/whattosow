#!/bin/bash
# Convert a raw allotment clip into a web loop + poster for the site.
#
#   scripts/video-web.sh videos-raw/IMG_5479.MOV plot-pan-july [start] [duration]
#
# Writes public/videos/blog/<name>.mp4 (720p long edge, h264, silent, faststart)
# and public/videos/blog/<name>-poster.webp (first frame). Optional start/duration
# (seconds) trim the clip — site loops should be 3-8s and ideally land under ~2MB.
set -euo pipefail

RAW="$1"; NAME="$2"; START="${3:-0}"; DUR="${4:-}"
OUT_DIR="$(dirname "$0")/../public/videos/blog"
mkdir -p "$OUT_DIR"
OUT="$OUT_DIR/$NAME.mp4"
POSTER="$OUT_DIR/$NAME-poster.webp"

TRIM=(-ss "$START")
[ -n "$DUR" ] && TRIM+=(-t "$DUR")

# scale: long edge to 720, keep aspect, even dims for h264
ffmpeg -v warning "${TRIM[@]}" -i "$RAW" \
  -vf "scale='if(gt(iw,ih),720,-2)':'if(gt(iw,ih),-2,720)'" \
  -c:v libx264 -crf 27 -preset slow -pix_fmt yuv420p -movflags +faststart -an \
  "$OUT" -y

# poster: first frame → jpg → cwebp (this ffmpeg build has no libwebp encoder)
TMP_JPG="$(mktemp -t poster).jpg"
ffmpeg -v warning -i "$OUT" -frames:v 1 -update 1 "$TMP_JPG" -y
cwebp -quiet -q 80 "$TMP_JPG" -o "$POSTER"
rm -f "$TMP_JPG"

SIZE=$(du -h "$OUT" | cut -f1)
echo "wrote $OUT ($SIZE) + $(basename "$POSTER")"
echo "usage in a post section:"
echo "  { type: \"video\", content: \"\", src: \"/videos/blog/$NAME.mp4\", poster: \"/videos/blog/$NAME-poster.webp\", alt: \"...\", caption: \"...\" }"
