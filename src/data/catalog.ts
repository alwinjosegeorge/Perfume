import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";
import p5 from "@/assets/product-5.jpg";
import a1 from "@/assets/article-1.jpg";
import a2 from "@/assets/article-2.jpg";
import a3 from "@/assets/article-3.jpg";
import divorceHero from "@/assets/divorce-hero.jpg";

export type Product = {
  slug: string;
  name: string;
  category: "Oud Base" | "Floral Base" | "Fruity Base" | "Fresh Base";
  price: number;
  priceLabel: string;
  img: string;
  hr: string;
  description: string;
  base?: "OUD_BASE" | "FLORAL_BASE" | "FRUITY_BASE" | "FRESH_BASE";
  isCustom?: boolean;
  pricing?: Record<string, number>;
  badge?: "Bestseller" | "Only 2 Left" | "";
  featuredOnHomepage?: boolean;
  heroTitle?: string;
  heroDescription?: string;
  hoverImg?: string;
  gallery?: string[];
};

export const PRODUCTS: Product[] = [
  // --- OUD BASE ---
  { slug: "divorce-perfume", name: "Divorce", category: "Oud Base", price: 4900, priceLabel: "₹4,900", img: divorceHero, hr: "24 HR", description: "An elegant, long-lasting exclusive perfume. French connection higher concentration, 50ml.", base: "OUD_BASE" },
  { slug: "oud-royale", name: "Oud Royale", category: "Oud Base", price: 5400, priceLabel: "₹5,400", img: p3, hr: "18 HR", description: "A majestic blend of rare agarwood, rich leather, and warm oriental spices.", base: "OUD_BASE" },
  { slug: "desert-nomad", name: "Desert Nomad", category: "Oud Base", price: 4200, priceLabel: "₹4,200", img: p5, hr: "12 HR", description: "Smoky incense and dark cedarwood blended with dry desert winds.", base: "OUD_BASE" },

  // --- FLORAL BASE ---
  { slug: "rose-chiffon", name: "Rose Chiffon", category: "Floral Base", price: 4500, priceLabel: "₹4,500", img: p1, hr: "16 HR", description: "Elegant blooming roses, sweet pink peony, and a touch of warm white musk.", base: "FLORAL_BASE" },
  { slug: "jasmine-dew", name: "Jasmine Dew", category: "Floral Base", price: 3800, priceLabel: "₹3,800", img: p2, hr: "10 HR", description: "Night-blooming jasmine, crushed green leaves, and soft morning dew.", base: "FLORAL_BASE" },
  { slug: "velvet-orchid", name: "Velvet Orchid", category: "Floral Base", price: 4800, priceLabel: "₹4,800", img: p4, hr: "20 HR", description: "Deep orchid blossoms, warm vanilla absolute, and dark velvet plum.", base: "FLORAL_BASE" },

  // --- FRUITY BASE ---
  { slug: "peach-nectar", name: "Peach Nectar", category: "Fruity Base", price: 3900, priceLabel: "₹3,900", img: p2, hr: "12 HR", description: "Sweet sun-ripened peach, juicy apricot nectar, and sparkling mandarin zest.", base: "FRUITY_BASE" },
  { slug: "berry-blush", name: "Berry Blush", category: "Fruity Base", price: 3500, priceLabel: "₹3,500", img: p1, hr: "8 HR", description: "Wild forest raspberries, blackcurrant leaves, and a splash of red apple.", base: "FRUITY_BASE" },
  { slug: "citrus-bloom", name: "Citrus Bloom", category: "Fruity Base", price: 4100, priceLabel: "₹4,100", img: p5, hr: "10 HR", description: "Zesty sun-soaked lemon, sweet orange, and refreshing orange blossom.", base: "FRUITY_BASE" },

  // --- FRESH BASE ---
  { slug: "ocean-breeze", name: "Ocean Breeze", category: "Fresh Base", price: 4200, priceLabel: "₹4,200", img: p3, hr: "24 HR", description: "Crisp sea salt, cool marine accords, and sun-bleached driftwood.", base: "FRESH_BASE" },
  { slug: "minted-rain", name: "Minted Rain", category: "Fresh Base", price: 3600, priceLabel: "₹3,600", img: p4, hr: "8 HR", description: "Crushed wild mint leaves, morning forest dew, and fresh eucalyptus.", base: "FRESH_BASE" },
  { slug: "alpine-air", name: "Alpine Air", category: "Fresh Base", price: 4600, priceLabel: "₹4,600", img: p2, hr: "15 HR", description: "Cool mountain air, green pine needles, and clean white cedarwood.", base: "FRESH_BASE" },
];

export const PRODUCT_IMAGES: Record<string, string> = {
  "product-1": p1,
  "product-2": p2,
  "product-3": p3,
  "product-4": p4,
  "product-5": p5,
  "divorce-hero": divorceHero,
};

export function getMergedProducts(): Product[] {
  if (typeof window === "undefined") return PRODUCTS;
  try {
    const raw = localStorage.getItem("bellezza-custom-products");
    if (!raw) return PRODUCTS;
    const custom = JSON.parse(raw) as any[];
    const mapped = custom.map((c) => ({
      slug: c.slug,
      name: c.name,
      category: c.category,
      price: c.price,
      priceLabel: `₹${c.price.toLocaleString("en-IN")}`,
      img: c.imgBase64 || c.imgUrl || PRODUCT_IMAGES[c.imgKey] || p1,
      hr: c.hr || "12 HR",
      description: c.description,
      base: c.base,
      isCustom: true,
      pricing: c.pricing,
      badge: c.badge,
      featuredOnHomepage: c.featuredOnHomepage,
      heroTitle: c.heroTitle,
      heroDescription: c.heroDescription,
      hoverImg: c.hoverImgBase64 || c.hoverImgUrl || undefined,
      gallery: c.gallery || [],
    }));
    
    const customSlugs = mapped.map((p) => p.slug);
    const baseProducts = PRODUCTS.filter((p) => !customSlugs.includes(p.slug));
    
    return [...baseProducts, ...mapped];
  } catch {
    return PRODUCTS;
  }
}

export const CATEGORIES = ["All", "Oud Base", "Floral Base", "Fruity Base", "Fresh Base"] as const;


export type Article = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  body: string[];
  img: string;
  category: string;
};

export const ARTICLES: Article[] = [
  {
    slug: "no-makeup-makeup-look",
    date: "May 1, 2025",
    title: "How to Achieve the Perfect 'No-Makeup' Makeup Look",
    excerpt: "Learn the layering, lighting, and product choices that create a radiant, effortless face.",
    body: [
      "The no-makeup makeup look is all about enhancing your natural features with the lightest possible touch.",
      "Start with a hydrating base, then sheer out coverage where you need it. Cream products blend into the skin better than powders and keep the finish dewy.",
      "Finish with a touch of flush on the cheeks and a tinted balm on the lips — that's it.",
    ],
    img: a1,
    category: "Makeup",
  },
  {
    slug: "anti-aging-science",
    date: "Apr 25, 2025",
    title: "The Science Behind Anti-Aging: What Actually Works",
    excerpt: "A clear-eyed look at retinoids, peptides, and antioxidants — and what to skip.",
    body: [
      "Anti-aging skincare is one of the most crowded categories, but only a handful of ingredients have meaningful evidence behind them.",
      "Retinoids remain the gold standard. Peptides and vitamin C have growing support. Most else is supporting cast.",
      "Consistency beats intensity. A simple routine you actually follow will outperform a complicated one you can't sustain.",
    ],
    img: a2,
    category: "Skincare",
  },
  {
    slug: "acne-prone-ingredients",
    date: "Apr 23, 2025",
    title: "The Best Ingredients for Acne-Prone Skin (and What to Avoid)",
    excerpt: "Niacinamide, salicylic acid, azelaic acid — your acne-fighting cheat sheet.",
    body: [
      "Acne-prone skin needs ingredients that balance oil, calm inflammation, and clear pores without stripping the barrier.",
      "Salicylic acid, niacinamide, and azelaic acid are reliable workhorses. Avoid heavy occlusives and fragrance-heavy formulas.",
      "Build your routine slowly and patch test new products — the skin barrier is everything.",
    ],
    img: a3,
    category: "Skincare",
  },
];
