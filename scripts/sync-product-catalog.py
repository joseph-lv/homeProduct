"""
Regenerate src/data/spreadsheetCatalog.ts from a product catalog Excel file.

- Forward-fills the 「描述」 column (merged / blank rows inherit the previous description).
- Extracts embedded pictures from column E into public/catalog/p-{id}.png.

Usage (from project root):
  py -3 scripts/sync-product-catalog.py <path-to-your-catalog.xlsx>
"""

from __future__ import annotations

import json
import shutil
import sys
import zipfile
from collections import defaultdict
from pathlib import Path
from xml.etree import ElementTree as ET

import openpyxl

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src" / "data" / "spreadsheetCatalog.ts"
CATALOG_DIR = ROOT / "public" / "catalog"

SKIP_COL_A = frozenset({"大类目", "首页大图", "about us详情"})

NS = {
    "xdr": "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing",
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
}
REL_NS = {"r": "http://schemas.openxmlformats.org/package/2006/relationships"}
EMBED_QNAME = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed"


def drawing_row_to_media_basename(xlsx: Path) -> dict[int, str]:
    """0-based anchor row -> first image in that row (by column)."""
    with zipfile.ZipFile(xlsx) as zf:
        try:
            rel_xml = zf.read("xl/drawings/_rels/drawing1.xml.rels").decode("utf-8")
            dr_xml = zf.read("xl/drawings/drawing1.xml").decode("utf-8")
        except KeyError:
            return {}

        rel_root = ET.fromstring(rel_xml)
        rid_to_target: dict[str, str] = {}
        for rel in rel_root.findall("r:Relationship", REL_NS):
            rid = rel.attrib.get("Id")
            tgt = rel.attrib.get("Target", "")
            if rid:
                rid_to_target[rid] = tgt

        root = ET.fromstring(dr_xml)
        by_row: dict[int, list[tuple[int, str]]] = defaultdict(list)
        for anchor in root:
            frm = anchor.find("xdr:from", NS)
            if frm is None:
                continue
            row_el = frm.find("xdr:row", NS)
            col_el = frm.find("xdr:col", NS)
            if row_el is None or col_el is None:
                continue
            row_idx = int(row_el.text)
            col_idx = int(col_el.text)
            pic = anchor.find("xdr:pic", NS)
            if pic is None:
                continue
            blip = pic.find(".//a:blip", NS)
            if blip is None:
                continue
            embed = blip.attrib.get(EMBED_QNAME)
            if not embed:
                continue
            target = rid_to_target.get(embed, "")
            # Target like ../media/image1.png
            base = Path(target).name
            if not base:
                continue
            by_row[row_idx].append((col_idx, base))

    out: dict[int, str] = {}
    for row_idx, cols in by_row.items():
        cols.sort(key=lambda x: x[0])
        out[row_idx] = cols[0][1]
    return out


def media_basename_for_excel_row(excel_row: int, row_to_media: dict[int, str]) -> str | None:
    """Match sheet row (1-based) to drawing anchor row excel_row - 1, with small search."""
    dr = excel_row - 1
    for cand in (dr, dr - 1, dr + 1):
        hit = row_to_media.get(cand)
        if hit:
            return hit
    return None


def extract_cover(xlsx: Path, media_basename: str, dest: Path) -> None:
    inner = f"xl/media/{media_basename}"
    with zipfile.ZipFile(xlsx) as zf:
        data = zf.read(inner)
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(data)


def parse_products(xlsx: Path) -> list[dict]:
    wb = openpyxl.load_workbook(xlsx, read_only=True, data_only=True)
    ws = wb.active
    rows = list(ws.iter_rows(values_only=True))
    wb.close()

    row_to_media = drawing_row_to_media_basename(xlsx)

    curr_main = None
    curr_sub = None
    last_desc: str | None = None
    products: list[dict] = []
    pid = 6200

    for i, row in enumerate(rows):
        if i == 0:
            continue
        excel_row = i + 1
        a = row[0] if len(row) > 0 else None
        b = row[1] if len(row) > 1 else None
        c = row[2] if len(row) > 2 else None
        d = row[3] if len(row) > 3 else None

        if a in SKIP_COL_A:
            continue
        if a:
            curr_main = str(a).strip()
        if b:
            curr_sub = str(b).strip()
        if d:
            last_desc = str(d).strip()

        if not c:
            continue

        if not curr_main or not curr_sub:
            raise SystemExit(f"Sheet row {excel_row}: missing category for title {c!r}")

        pid += 1
        title = str(c).strip()
        detail_notes = last_desc

        media_base = media_basename_for_excel_row(excel_row, row_to_media)
        image_public_path: str | None = None
        if media_base:
            dest = CATALOG_DIR / f"p-{pid}.png"
            try:
                extract_cover(xlsx, media_base, dest)
                image_public_path = f"/catalog/p-{pid}.png"
            except KeyError:
                print(f"Warning: {media_base} missing in xlsx for product {pid}")

        products.append(
            {
                "id": pid,
                "mainCategory": curr_main,
                "subCategoryLabel": curr_sub,
                "title": title,
                "detailNotes": detail_notes,
                "imagePublicPath": image_public_path,
            }
        )

    return products


def emit_ts(products: list[dict]) -> None:
    lines = [
        "/** Auto-generated — run: py -3 scripts/sync-product-catalog.py <path-to-catalog.xlsx> */",
        "",
        "export interface SpreadsheetProductRow {",
        "  id: number",
        "  mainCategory: string",
        "  subCategoryLabel: string",
        "  title: string",
        "  detailNotes: string | null",
        "  imagePublicPath: string | null",
        "}",
        "",
        "export const spreadsheetProducts: SpreadsheetProductRow[] = [",
    ]
    for p in products:
        desc_lit = "null" if p["detailNotes"] is None else json.dumps(p["detailNotes"], ensure_ascii=False)
        img_lit = "null" if p["imagePublicPath"] is None else json.dumps(p["imagePublicPath"], ensure_ascii=False)
        line = (
            "  { "
            f"id: {p['id']}, "
            f"mainCategory: {json.dumps(p['mainCategory'], ensure_ascii=False)}, "
            f"subCategoryLabel: {json.dumps(p['subCategoryLabel'], ensure_ascii=False)}, "
            f"title: {json.dumps(p['title'], ensure_ascii=False)}, "
            f"detailNotes: {desc_lit}, "
            f"imagePublicPath: {img_lit}, "
            "},"
        )
        lines.append(line)
    lines.append("]")
    lines.append("")
    OUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {len(products)} products to {OUT.relative_to(ROOT)}")
    if CATALOG_DIR.exists():
        n = len(list(CATALOG_DIR.glob("p-*.png")))
        print(f"Catalog images: {n} files in {CATALOG_DIR.relative_to(ROOT)}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        raise SystemExit(
            "Usage: py -3 scripts/sync-product-catalog.py <path-to-catalog.xlsx>\n"
            "Example: py -3 scripts/sync-product-catalog.py D:\\Downloads\\catalog.xlsx"
        )
    xlsx_path = Path(sys.argv[1]).expanduser().resolve()
    if not xlsx_path.is_file():
        raise SystemExit(f"File not found: {xlsx_path}")
    if CATALOG_DIR.exists():
        shutil.rmtree(CATALOG_DIR)
    emit_ts(parse_products(xlsx_path))
