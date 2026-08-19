#!/usr/bin/env bash
# Re-encode a decorative video for the web and report how close it stayed to the
# original.
#
# The clips from the video generator arrive at wildly inconsistent bitrates --
# the sourcing shot was 26.5 Mbps, roughly ten times what it needs. This
# re-encodes at a visually transparent CRF *without* changing resolution, then
# prints SSIM against the source so the quality claim is measured, not assumed.
#
#   scripts/optimise-video.sh public/uploads/clip.mp4
#   scripts/optimise-video.sh public/uploads/clip.mp4 23      # more aggressive
#
# Check the SSIM before keeping the result: >= 0.98 is effectively
# indistinguishable in motion. If the output is LARGER than the input, the
# source was already well encoded -- keep the original and move on.
#
# Requires: ffmpeg
set -euo pipefail

SRC=${1:?usage: optimise-video.sh <file.mp4> [crf]}
CRF=${2:-20}
TMP="${SRC%.mp4}.opt.mp4"

ffmpeg -y -loglevel error -i "$SRC" \
  -c:v libx264 -crf "$CRF" -preset slow -pix_fmt yuv420p \
  -an \
  -movflags +faststart \
  "$TMP"

before=$(stat -c%s "$SRC")
after=$(stat -c%s "$TMP")
ssim=$(ffmpeg -loglevel error -i "$TMP" -i "$SRC" -lavfi "ssim=stats_file=-" -f null - 2>/dev/null \
  | tail -1 | grep -oP 'All:\K[0-9.]+' | head -1)

printf 'crf %s\n  before %s\n  after  %s (%s%%)\n  ssim   %s\n' \
  "$CRF" \
  "$(numfmt --to=iec "$before")" \
  "$(numfmt --to=iec "$after")" \
  "$(( 100 - after * 100 / before ))" \
  "$ssim"

if [ "$after" -ge "$before" ]; then
  echo "  -> output is not smaller; keeping the original, discarding $TMP"
  rm -f "$TMP"
else
  echo "  -> review it, then: mv $TMP $SRC"
fi
