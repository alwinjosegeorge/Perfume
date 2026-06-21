import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, User } from "lucide-react";
import { useState, useEffect } from "react";

import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/data/catalog";
import { useMode } from "@/context/ModeContext";
import { getProducts } from "@/lib/productService";

import divorceHero from "@/assets/divorce-hero.jpg";
import seductionHeroImg from "@/assets/seduction-1.jpeg";
import dopamineHeroImg from "@/assets/dopamine-1.jpeg";
import oilsPageHeader from "@/assets/oils-page-header.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Voguish Moments — Where Luxury Perfume Begins" },
      {
        name: "description",
        content:
          "Discover Voguish Moments signature perfumes, crafted with high-grade ingredients sourced from France by Raa.",
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
    title: "OUR EXCLUSIVE PARFUM\nDIVORCE",
    description:
      "THE GREATEST DISTANCE IN THE WORLD IS NOT BETWEEN TWO COUNTRIES,\nBUT BETWEEN TWO PEOPLE WHO SPEAK THE SAME LANGUAGE AND STILL FAIL TO UNDERSTAND EACH OTHER.\nTHIS DROP SPEAKS YOUR IDENTITY TO THE PEOPLES",
    featuredSlug: "divorce-perfume",
    img: divorceHero,
  },
  FLORAL_BASE: {
    title: "OUR EXCLUSIVE PARFUM\nSEDUCTION",
    description:
      "A romantic, mood-enhancing fragrance infused with pheromone molecules designed to create a deep emotional connection.",
    featuredSlug: "seduction",
    img: "",
  },
  FRUITY_BASE: {
    title: "OUR EXCLUSIVE PARFUM\nMOOD SWINGS",
    description:
      "An incredibly long-projecting scent featuring a dynamic profile of shifting mixed fruit notes that diverts your mind.",
    featuredSlug: "mood-swings",
    img: "",
  },
  FRESH_BASE: {
    title: "OUR EXCLUSIVE PARFUM\nDOPAMINE",
    description:
      "A cool, high-dose fresh citrus blend of mint and green lemon to keep you focused and refreshed all day.",
    featuredSlug: "dopamine",
    img: "",
  },
};

function Hero({ allProducts }: { allProducts: any[] }) {
  const { mode } = useMode();
  const rawMode = mode || "OUD_BASE";
  const activeMode = (rawMode === "DIVORCE_LOTION" || rawMode === "MESSI_EDITION")
    ? "OUD_BASE"
    : rawMode;

  const defaults = DEFAULT_HERO_DATA[activeMode] || DEFAULT_HERO_DATA.OUD_BASE;

  let resolvedTitle = defaults.title;
  let resolvedDesc = defaults.description;
  let resolvedSlug = defaults.featuredSlug;
  let resolvedImg = defaults.img;

  const match = allProducts.find((p) => p.slug === resolvedSlug);
  if (match) {
    if (resolvedSlug === "divorce-perfume") {
      resolvedImg = divorceHero;
    } else if (resolvedSlug === "seduction") {
      resolvedImg = seductionHeroImg;
    } else if (resolvedSlug === "dopamine") {
      resolvedImg = dopamineHeroImg;
    } else {
      resolvedImg = match.img;
    }
  }

  const data = {
    title: resolvedTitle,
    description: resolvedDesc,
    featuredSlug: resolvedSlug,
    img: resolvedImg,
  };

  const renderTitle = (title: string) => {
    const lines = title.split("\n");
    if (lines.length > 1) {
      return (
        <span className="flex flex-col gap-3 lg:gap-4">
          <span className="font-hubballi text-sm md:text-base lg:text-lg font-normal tracking-[0.25em] uppercase text-muted-foreground block">
            {lines[0]}
          </span>
          <span className="font-futura text-[38px] md:text-7xl lg:text-8xl font-normal uppercase text-foreground block leading-none lg:-ml-[8px]">
            {lines[1]}
          </span>
        </span>
      );
    }
    return <span>{title}</span>;
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
          <h1 className="font-display">
            {renderTitle(data.title)}
          </h1>
          <p className="mt-8 text-muted-foreground text-sm lg:text-base max-w-lg mx-auto lg:mx-0 leading-relaxed whitespace-pre-line">
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
            className="relative mx-auto w-full max-w-[450px] aspect-square block cursor-pointer group/heroimg"
          >
            <div className="absolute inset-0 overflow-hidden bg-cream group-hover/heroimg:scale-[1.01] transition-transform duration-500 rounded-none border border-border/80">
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
  const rawMode = mode || "OUD_BASE";
  const activeMode = (rawMode === "DIVORCE_LOTION" || rawMode === "MESSI_EDITION")
    ? "OUD_BASE"
    : rawMode;
  const [allProducts, setAllProducts] = useState<any[]>(PRODUCTS);

  useEffect(() => {
    let active = true;
    getProducts().then((data) => {
      if (active) setAllProducts(data);
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

  const isRollOnPremium = mode === "ROLL_ON_PREMIUM";

  return (
    <SiteLayout>
      {!isRollOnPremium && <Hero allProducts={allProducts} />}
 
      {/* Mode-Specific Showcase */}
      <section className={isRollOnPremium ? "pt-6 pb-16 md:pt-8 md:pb-24" : "py-16"}>
        <div className="max-w-[1300px] mx-auto px-6 lg:px-12">
          {isRollOnPremium ? (
            <div className="flex flex-col items-center justify-center text-center mt-2 mb-12 animate-fade-up max-w-[450px] md:max-w-[600px] mx-auto w-full">
              <img
                src={oilsPageHeader}
                alt="1001 Collections"
                className="w-full h-auto object-contain select-none pointer-events-none"
              />
            </div>
          ) : (
            <h2 className="text-center font-display text-lg md:text-2xl font-light tracking-[0.2em] uppercase text-[#1c1917] mb-12">
              {getModeHeading(activeMode)}
            </h2>
          )}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {modePerfumes.map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>
 
      {!isRollOnPremium && (
        /* Global Combined Showcase Link above Footer */
        <section className="py-20 bg-cream/30 border-t border-border/40 text-center">
          <div className="max-w-xl mx-auto px-6">
            <h2 className="font-display text-lg md:text-2xl font-light tracking-[0.2em] uppercase text-[#1c1917] mb-4">Our Fragrance Library</h2>
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
      )}
    </SiteLayout>
  );
}

