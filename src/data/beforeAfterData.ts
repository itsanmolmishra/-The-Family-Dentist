// Before & After cases - images from src/assets
// Using Vite's import.meta.glob to load all jpeg images from asset folders

export type BeforeAfterCategory = {
  id: string;
  title: string;
  images: string[];
  description?: string;
  duration?: string;
};

// Eager load all jpeg images from assets recursively; get URL for each
const imageModules = import.meta.glob<string>(
  "../assets/**/*.{jpeg,jpg,png,webp}",
  { query: "?url", import: "default", eager: true }
);

const treatmentFolders = new Set([
  "aesthethic",
  "bleaching",
  "scaling",
  "minor surgery",
  "single implant",
  "two implant",
  "two iplant",
  "surgical endodontics",
  "full mouth case",
  "full mouth crown",
  "kids trauma",
]);

function normalizeCategoryId(folder: string): string {
  if (folder === "two iplant") return "two implant";
  return folder;
}

function getPrimaryFolder(path: string): string {
  const match = path.match(/\.\.\/assets\/([^/]+)/);
  return match?.[1] ?? "other";
}

function getImagesByFolder(): BeforeAfterCategory[] {
  const byFolder: Record<string, string[]> = {};

  for (const path in imageModules) {
    const url = imageModules[path] as string;
    if (!url) continue;
    // path can be nested like ../assets/minor surgery/lip growth/....jpeg
    const rawFolder = getPrimaryFolder(path);
    if (!treatmentFolders.has(rawFolder)) continue;
    const folder = normalizeCategoryId(rawFolder);
    if (!byFolder[folder]) byFolder[folder] = [];
    byFolder[folder].push(url);
  }

  const categoryMeta: Record<string, { title: string; description?: string; duration?: string }> = {
    aesthethic: { title: "Aesthetic", description: "Smile design and aesthetic improvements", duration: "2–4 weeks" },
    bleaching: { title: "Bleaching", description: "Professional teeth whitening results", duration: "1 session" },
    scaling: { title: "Scaling", description: "Deep cleaning and gum care", duration: "1–2 sessions" },
    "minor surgery": { title: "Minor Surgery", description: "Minor oral surgery outcomes", duration: "1–2 weeks" },
    "single implant": { title: "Single Implant", description: "Single tooth implant restoration", duration: "3–6 months" },
    "two implant": { title: "Two Implant", description: "Dual implant transformation", duration: "4–6 months" },
    "surgical endodontics": { title: "Surgical Endodontics", description: "Advanced root canal surgery", duration: "1–2 sessions" },
    "full mouth case": { title: "Full Mouth Case", description: "Full mouth rehabilitation", duration: "6–12 months" },
    "full mouth crown": { title: "Full Mouth Crown", description: "Full mouth crown restoration", duration: "4–8 weeks" },
    "kids trauma": { title: "Kids Trauma", description: "Pediatric dental trauma care", duration: "1–4 weeks" },
  };

  return Object.entries(byFolder)
    .filter(([, imgs]) => imgs.length > 0)
    .map(([folder, images]) => {
      const orderedImages = [...images].sort((a, b) => a.localeCompare(b));
      const meta = categoryMeta[folder] ?? {
        title: folder.replace(/\b\w/g, (c) => c.toUpperCase()),
        description: "Treatment results from our clinic",
        duration: "Varies",
      };
      return {
        id: folder,
        title: meta.title,
        description: meta.description,
        duration: meta.duration,
        images: orderedImages,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export const beforeAfterCategories = getImagesByFolder();

export const allBeforeAfterImages = beforeAfterCategories
  .flatMap((category) => category.images)
  .filter(Boolean);
