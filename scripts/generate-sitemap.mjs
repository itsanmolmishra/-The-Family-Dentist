import { writeFileSync, mkdirSync, copyFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const siteUrl = (process.env.VITE_SITE_URL || "https://www.thefamilydentist.in").replace(/\/$/, "");

const staticPaths = [
  "/",
  "/about",
  "/services",
  "/gallery",
  "/appointment",
  "/testimonials",
  "/contact",
];

const doctorIds = ["balram-garg", "radhika-garg", "karishma-gautam"];
const doctorPaths = doctorIds.map((id) => `/doctor/${id}`);

const allPaths = [...staticPaths, ...doctorPaths];
const lastmod = new Date().toISOString().split("T")[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPaths
  .map(
    (path) => `  <url>
    <loc>${siteUrl}${path === "/" ? "" : path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${path === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${path === "/" ? "1.0" : path.startsWith("/doctor") ? "0.7" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const publicDir = join(root, "public");
const buildDir = join(root, "build");

mkdirSync(publicDir, { recursive: true });
writeFileSync(join(publicDir, "sitemap.xml"), sitemap, "utf8");

if (existsSync(buildDir)) {
  writeFileSync(join(buildDir, "sitemap.xml"), sitemap, "utf8");
}

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
writeFileSync(join(publicDir, "robots.txt"), robots, "utf8");
if (existsSync(buildDir)) {
  writeFileSync(join(buildDir, "robots.txt"), robots, "utf8");
}

const logoSrc = join(root, "src", "assets", "WhatsApp Image 2026-05-14 at 7.09.28 PM.jpeg");
if (existsSync(logoSrc)) {
  for (const dir of [publicDir, buildDir]) {
    if (existsSync(dir) || dir === publicDir) {
      mkdirSync(dir, { recursive: true });
      copyFileSync(logoSrc, join(dir, "og-image.jpg"));
      copyFileSync(logoSrc, join(dir, "favicon.jpg"));
    }
  }
}

console.log(`SEO files generated for ${siteUrl} (${allPaths.length} URLs)`);
