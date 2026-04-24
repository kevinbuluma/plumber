import plumbing from "@/assets/cat-plumbing.jpg";
import building from "@/assets/cat-building.jpg";
import tools from "@/assets/cat-tools.jpg";

export const categoryImage = (category: string): string => {
  switch (category) {
    case "plumbing": return plumbing;
    case "building": return building;
    case "tools": return tools;
    case "sanitary": return "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800";
    case "tiles": return "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800";
    case "electrical": return "https://images.unsplash.com/photo-1504148455328-497c5efdf13a?auto=format&fit=crop&q=80&w=800";
    default: return tools;
  }
};

export const resolveImage = (image_url: string | null, category: string): string => {
  if (!image_url) return categoryImage(category);
  if (image_url.startsWith("/src/")) return categoryImage(category);
  return image_url;
};

export const formatKES = (value: number): string =>
  new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", maximumFractionDigits: 0 }).format(value);

export const CATEGORIES = [
  { slug: "plumbing", label: "Plumbing", blurb: "Pipes, valves, fittings" },
  { slug: "building", label: "Building", blurb: "Cement, steel, timber" },
  { slug: "tools", label: "Tools", blurb: "Power & hand tools" },
  { slug: "sanitary", label: "Sanitary Ware", blurb: "Mixers, sinks, toilets" },
  { slug: "tiles", label: "Tiles & Marble", blurb: "Floor & wall finishes" },
  { slug: "electrical", label: "Electrical Fix", blurb: "Wiring, bulbs, switches" },
] as const;
