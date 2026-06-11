import { useState, useEffect } from "react";
import type { Product } from "@/data/catalog";
import { PRODUCTS } from "@/data/catalog";
import { getProductsSync } from "./productService";

export type CartItem = { slug: string; qty: number; size: string };

const KEY = "bellezza-cart";

function read(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "[]") as any[];
    return raw.map((x) => ({
      slug: x.slug,
      qty: x.qty,
      size: x.size || "50 ml",
    }));
  } catch {
    return [];
  }
}

const listeners = new Set<() => void>();
function emit() { listeners.forEach((l) => l()); }

export function getPriceForSize(product: Product, size: string): number {
  if (product.pricing && typeof product.pricing[size] === "number") {
    return product.pricing[size];
  }
  const basePrice = product.price;
  if (size === "10 ml") return Math.round(basePrice * 0.3);
  if (size === "15 ml") return Math.round(basePrice * 0.4);
  if (size === "100 ml") return Math.round(basePrice * 1.6);
  return basePrice;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => {
    setItems(read());
    const l = () => setItems(read());
    listeners.add(l);
    return () => { listeners.delete(l); };
  }, []);

  const save = (next: CartItem[]) => {
    localStorage.setItem(KEY, JSON.stringify(next));
    emit();
  };

  const add = (slug: string, qty = 1, size = "50 ml") => {
    const cur = read();
    const i = cur.findIndex((x) => x.slug === slug && x.size === size);
    if (i >= 0) cur[i].qty += qty;
    else cur.push({ slug, qty, size });
    save(cur);
  };
  const setQty = (slug: string, size: string, qty: number) => {
    save(read().map((x) => (x.slug === slug && x.size === size ? { ...x, qty: Math.max(1, qty) } : x)));
  };
  const remove = (slug: string, size: string) => {
    save(read().filter((x) => !(x.slug === slug && x.size === size)));
  };
  const clear = () => save([]);

  const detailed = items
    .map((it) => {
      const p = getProductsSync().find((p) => p.slug === it.slug);
      if (!p) return null;
      const size = it.size || "50 ml";
      const price = getPriceForSize(p, size);
      return { product: p as Product, qty: it.qty, size, price };
    })
    .filter((x): x is { product: Product; qty: number; size: string; price: number } => x !== null);

  const subtotal = detailed.reduce((s, x) => s + x.price * x.qty, 0);
  const count = items.reduce((s, x) => s + x.qty, 0);

  return { items, detailed, add, setQty, remove, clear, subtotal, count };
}
