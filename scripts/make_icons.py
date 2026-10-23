#!/usr/bin/env python3
"""Genera le icone PNG di Naturopata Digitale con la sola libreria standard."""

import math
import os
import struct
import zlib

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "assets", "img")
SS = 3  # supersampling


def mix(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def dist_segment(px, py, x1, y1, x2, y2):
    dx, dy = x2 - x1, y2 - y1
    if dx == 0 and dy == 0:
        return math.hypot(px - x1, py - y1)
    t = max(0.0, min(1.0, ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy)))
    return math.hypot(px - (x1 + t * dx), py - (y1 + t * dy))


def sample(u, v):
    """u, v in [-1, 1]. Restituisce (r, g, b, a)."""
    # sfondo: gradiente verde bosco
    t = (u + 1) * 0.35 + (v + 1) * 0.25
    bg = mix((23, 58, 43), (53, 122, 90), max(0.0, min(1.0, t)))
    # aloni
    d = math.hypot(u + 0.1, v + 0.15)
    glow = max(0.0, 1.0 - d / 1.25) ** 2
    bg = mix(bg, (74, 143, 105), glow * 0.20)

    col = bg
    # anelli decorativi
    r = math.hypot(u, v)
    if 0.70 < r < 0.715:
        col = mix(col, (245, 241, 230), 0.10)
    if 0.80 < r < 0.812:
        col = mix(col, (245, 241, 230), 0.06)

    # foglia ellittica ruotata
    ang = math.radians(-38)
    ca, sa = math.cos(ang), math.sin(ang)
    lx, ly = u + 0.10, v + 0.02
    xr = lx * ca - ly * sa
    yr = lx * sa + ly * ca
    leaf = (xr / 0.47) ** 2 + (yr / 0.225) ** 2 <= 1.0
    if leaf:
        # sfumatura chiara sulla foglia
        g = max(0.0, min(1.0, (0.47 - xr) / 0.94))
        col = mix((245, 241, 230), (217, 230, 220), g * 0.75)

    # nervatura
    if leaf and abs(yr) < 0.010 and abs(xr) < 0.44:
        col = mix(col, (31, 77, 58), 0.35)

    # stelo
    if dist_segment(u, v, -0.02, 0.66, -0.06, 0.12) < 0.035:
        col = mix(col, (245, 241, 230), 0.92)

    # piccola bacca in alto
    if math.hypot(u - 0.02, v + 0.62) < 0.065:
        col = mix(col, (245, 241, 230), 0.78)

    return col + (255,)


def render(size):
    rows = []
    for y in range(size):
        row = bytearray()
        for x in range(size):
            acc = [0, 0, 0, 0]
            for sy in range(SS):
                for sx in range(SS):
                    u = ((x + (sx + 0.5) / SS) / size) * 2 - 1
                    v = ((y + (sy + 0.5) / SS) / size) * 2 - 1
                    r, g, b, a = sample(u, v)
                    acc[0] += r; acc[1] += g; acc[2] += b; acc[3] += a
            n = SS * SS
            row += bytes((acc[0] // n, acc[1] // n, acc[2] // n, acc[3] // n))
        rows.append(bytes(row))
    return rows


def write_png(path, size, rows):
    raw = b"".join(b"\x00" + r for r in rows)

    def chunk(tag, data):
        c = struct.pack(">I", len(data)) + tag + data
        return c + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)

    ihdr = struct.pack(">IIBBBBB", size, size, 8, 6, 0, 0, 0)
    png = (b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr) +
           chunk(b"IDAT", zlib.compress(raw, 9)) + chunk(b"IEND", b""))
    with open(path, "wb") as f:
        f.write(png)
    print("scritto", path, size, "px", len(png), "byte")


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for s in (192, 512):
        write_png(os.path.join(OUT, "icon-%d.png" % s), s, render(s))
