import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/catalog";
import { useState } from "react";

export function ProductCard({ p }: { p: Product }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to="/product/$slug"
      params={{ slug: p.slug }}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-cream">
        <span className="absolute top-3 left-3 z-10 bg-foreground text-background text-[11px] font-medium tracking-wide px-3 py-1 rounded-md">
          {p.hr}
        </span>
        {p.badge && (
          <span className={`absolute top-3 right-3 z-10 text-[9px] font-bold tracking-wider uppercase px-2 py-1 rounded-md shadow-sm border ${
            p.badge === "Bestseller"
              ? "bg-[#FAF9F5] text-accent border-accent/65"
              : "bg-[#FAF9F5] text-red-600 border-red-200"
          }`}>
            {p.badge}
          </span>
        )}
        <img
          src={isHovered && p.hoverImg ? p.hoverImg : p.img}
          alt={p.name}
          width={768}
          height={768}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-500"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <div className="font-medium flex items-center gap-1.5 flex-wrap">
            <span>{p.name}</span>
          </div>
          <div className="text-sm text-muted-foreground">{p.category}</div>
        </div>
        <div className="text-sm font-medium pt-1 whitespace-nowrap">{p.priceLabel}</div>
      </div>
    </Link>
  );
}
