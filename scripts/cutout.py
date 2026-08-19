#!/usr/bin/env python3
"""Turn a product shot on a flat background into a transparent PNG.

The bean and ice-cube art arrived as JPEGs on white (or with a checkerboard
baked in as literal pixels, since JPEG cannot store alpha). This flood-fills
the background inward from the image border, so enclosed light areas *inside*
the subject are kept, then keeps only the largest remaining blob -- which drops
generator watermarks and stray specks -- and crops tight.

    python scripts/cutout.py public/assets/bean5.png public/assets/bean-5.png --width 360

Requires: pillow, numpy, scipy
"""

import argparse

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage


def cutout(src: str, dst: str, width: int | None, feather: float, pad: int) -> None:
    im = Image.open(src).convert("RGB")
    arr = np.array(im).astype(np.int16)

    maxc = arr.max(axis=-1)
    minc = arr.min(axis=-1)
    saturation = maxc - minc
    brightness = (maxc + minc) / 2

    # Near-grey and bright enough to be backdrop rather than subject.
    candidate = (saturation <= 18) & (brightness >= 165)

    # Only regions connected to the border are background: this preserves
    # highlights and pale detail enclosed within the subject.
    labelled, _ = ndimage.label(candidate, structure=np.ones((3, 3)))
    edges = set(labelled[0, :]) | set(labelled[-1, :]) | set(labelled[:, 0]) | set(labelled[:, -1])
    edges.discard(0)
    background = np.isin(labelled, list(edges))

    # Keep only the biggest foreground blob, discarding watermarks and specks.
    foreground = ~background
    blobs, count = ndimage.label(foreground, structure=np.ones((3, 3)))
    if count > 1:
        sizes = ndimage.sum(foreground, blobs, range(1, count + 1))
        foreground = blobs == (int(np.argmax(sizes)) + 1)

    alpha = np.where(foreground, 255, 0).astype(np.uint8)
    out = im.convert("RGBA")
    out.putalpha(Image.fromarray(alpha, mode="L").filter(ImageFilter.GaussianBlur(feather)))

    ys, xs = np.where(foreground)
    left, right, top, bottom = xs.min(), xs.max(), ys.min(), ys.max()
    out = out.crop(
        (
            max(0, left - pad),
            max(0, top - pad),
            min(out.width, right + pad + 1),
            min(out.height, bottom + pad + 1),
        )
    )

    if width and out.width > width:
        out = out.resize((width, round(out.height * width / out.width)), Image.LANCZOS)

    out.save(dst, optimize=True)
    print(f"{src} -> {dst}  {out.size[0]}x{out.size[1]}")


if __name__ == "__main__":
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("src")
    p.add_argument("dst")
    p.add_argument("--width", type=int, default=None, help="downscale to this width")
    p.add_argument("--feather", type=float, default=2.0, help="edge softening, px")
    p.add_argument("--pad", type=int, default=8, help="transparent padding kept around the crop")
    a = p.parse_args()
    cutout(a.src, a.dst, a.width, a.feather, a.pad)
