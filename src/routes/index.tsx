import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, User } from "lucide-react";
import { useState, useEffect } from "react";

import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/data/catalog";
import { useMode } from "@/context/ModeContext";
import { getProducts } from "@/lib/productService";
import { getHeroSettingsDb } from "@/lib/api/dbFunctions";

import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import divorceHero from "@/assets/divorce-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bellezza — Where Natural Beauty Begins" },
      {
        name: "description",
        content:
          "Elevate your glow with beauty essentials. Shop the latest must-haves in one chic storefront.",
      },
    ],
  }),
  component: Home,
});

export interface HeroData {
  title: string;
  description: string;
  featuredSlug: string;
  img: string;
}

export const DEFAULT_HERO_DATA: Record<string, HeroData> = {
  OUD_BASE: {
    title: "Our Exclusive\nPerfume Divorce",
    description:
      "Elevate your glow with beauty essentials, shop the latest must-haves in one chic storefront.",
    featuredSlug: "divorce-perfume",
    img: divorceHero,
  },
  FLORAL_BASE: {
    title: "Our Exclusive\nRose Chiffon",
    description:
      "Elegant blooming roses, sweet pink peony, and a touch of warm white musk absolute.",
    featuredSlug: "rose-chiffon",
    img: p1,
  },
  FRUITY_BASE: {
    title: "Our Exclusive\nPeach Nectar",
    description:
      "Sweet sun-ripened peach, juicy apricot nectar, and sparkling mandarin zest.",
    featuredSlug: "peach-nectar",
    img: p2,
  },
  FRESH_BASE: {
    title: "Our Exclusive\nOcean Breeze",
    description:
      "Crisp sea salt, cool marine accords, and sun-bleached driftwood absolute.",
    featuredSlug: "ocean-breeze",
    img: p3,
  },
};

function Hero({ allProducts, heroSettings }: { allProducts: any[]; heroSettings: any[] }) {
  const { mode } = useMode();
  const activeMode = mode || "OUD_BASE";

  const defaults = DEFAULT_HERO_DATA[activeMode] || DEFAULT_HERO_DATA.OUD_BASE;
  const customSetting = heroSettings.find((h) => h.mode === activeMode);

  let resolvedTitle = defaults.title;
  let resolvedDesc = defaults.description;
  let resolvedSlug = defaults.featuredSlug;
  let resolvedImg = defaults.img;

  if (customSetting) {
    resolvedTitle = customSetting.title || defaults.title;
    resolvedDesc = customSetting.description || defaults.description;
    resolvedSlug = customSetting.featured_slug || defaults.featuredSlug;
  }

  const match = allProducts.find((p) => p.slug === resolvedSlug);
  if (match) {
    resolvedImg = match.img;
  }

  const data = {
    title: resolvedTitle,
    description: resolvedDesc,
    featuredSlug: resolvedSlug,
    img: resolvedImg,
  };

  const renderTitle = (title: string) => {
    return title.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        {index < title.split("\n").length - 1 && <br />}
      </span>
    ));
  };

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(0.85 0.01 70) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.85 0.01 70) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-6 lg:pt-10 pb-12 lg:pb-20 grid lg:grid-cols-2 gap-10 items-center relative">
        <div className="order-2 lg:order-1 animate-fade-up text-center lg:text-left">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
            {renderTitle(data.title)}
          </h1>
          <p className="mt-6 lg:mt-8 text-muted-foreground text-base lg:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
            {data.description}
          </p>
          <div className="mt-8 lg:mt-10 flex items-center gap-6 flex-wrap justify-center lg:justify-start">
            <Link
              to="/product/$slug"
              params={{ slug: data.featuredSlug }}
              className="group flex items-center gap-3 bg-foreground text-background rounded-full pl-7 pr-3 py-3 hover:bg-foreground/90 transition-all"
            >
              <span className="font-medium">Shop Now</span>
              <span className="w-9 h-9 rounded-full bg-background/15 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <div className="hidden lg:flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-dashed border-accent flex items-center justify-center">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="text-left">
                <div className="font-display text-xl">20K +</div>
                <div className="text-sm text-muted-foreground">Happy customers</div>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 relative">
          <Link
            to="/product/$slug"
            params={{ slug: data.featuredSlug }}
            className="relative mx-auto w-full max-w-[560px] aspect-[4/5] block cursor-pointer group/heroimg"
          >
            <div className="absolute inset-0 overflow-hidden bg-cream group-hover/heroimg:scale-[1.01] transition-transform duration-500 rounded-3xl border border-border/80">
              <img
                src={data.img}
                alt="Voguish Moments perfume"
                width={1280}
                height={1280}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Home() {
  const { mode } = useMode();
  const activeMode = mode || "OUD_BASE";
  const [allProducts, setAllProducts] = useState<any[]>(PRODUCTS);
  const [heroSettings, setHeroSettings] = useState<any[]>([]);

  useEffect(() => {
    let active = true;
    getProducts().then((data) => {
      if (active) setAllProducts(data);
    });
    getHeroSettingsDb().then((settings) => {
      if (active) setHeroSettings(settings);
    });
    return () => {
      active = false;
    };
  }, []);

  const modePerfumes = allProducts.filter(
    (p) => p.base === activeMode
  );

  const getModeHeading = (m: string) => {
    switch (m) {
      case "FLORAL_BASE":
        return "Another Floral Perfumes";
      case "FRUITY_BASE":
        return "Another Fruity Perfumes";
      case "FRESH_BASE":
        return "Another Fresh Perfumes";
      default:
        return "Another Oud Perfumes";
    }
  };

  return (
    <SiteLayout>
      <Hero allProducts={allProducts} heroSettings={heroSettings} />

      {/* Mode-Specific Showcase */}
      <section className="py-16">
        <div className="max-w-[1300px] mx-auto px-6 lg:px-12">
          <h2 className="text-center text-4xl md:text-5xl mb-12">
            {getModeHeading(activeMode)}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {modePerfumes.map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Global Combined Showcase Link above Footer */}
      <section className="py-20 bg-cream/30 border-t border-border/40 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl mb-4">Our Fragrance Library</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            Discover our entire range of exceptional perfumes from all bases, crafted with premium ingredients and long-lasting concentration.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center rounded-full bg-[#1c1917] hover:bg-[#1c1917]/90 text-white font-semibold text-xs tracking-widest uppercase px-8 py-4 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            See All Our Perfumes
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}

