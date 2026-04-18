/**
 * Gemini SVG is a traced raster: "transparent" areas became many paths with
 * neutral gray fills (#CBCBCB, #F6F6F6, …). Replace those with white so the
 * logo matches a white header; skip saturated colors (gold, text, etc.).
 */
const fs = require("fs");

const path = process.argv[2];
if (!path) {
  console.error("Usage: node flatten-logo-gray-fills.cjs <file.svg>");
  process.exit(1);
}

let s = fs.readFileSync(path, "utf8");
const before = s.length;

function replaceFill(hex) {
  const h = hex.slice(1);
  if (h.length !== 6) return hex;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const avg = (r + g + b) / 3;
  const maxd = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
  // Neutral = near-gray; light = checker / paper background
  if (maxd <= 6 && avg >= 188) return "#ffffff";
  // Very light warm/cream tints (traced “white” areas)
  if (avg >= 230 && maxd <= 22) return "#ffffff";
  return hex;
}

s = s.replace(/fill="(#[0-9A-Fa-f]{6})"/g, (_, hex) => {
  const next = replaceFill(hex);
  return `fill="${next}"`;
});

fs.writeFileSync(path, s);
console.log(`Updated ${path}: ${before} -> ${s.length} bytes`);
