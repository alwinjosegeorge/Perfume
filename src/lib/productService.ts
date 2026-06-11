import { Product } from "@/data/catalog";
import { getProductsDb } from "./api/dbFunctions";
import { PRODUCTS } from "@/data/catalog";

let productCache: Product[] | null = null;
let preloaderPromise: Promise<Product[]> | null = null;

export function startPreloading(): Promise<Product[]> {
  if (typeof window === "undefined") {
    return Promise.resolve(PRODUCTS);
  }
  if (preloaderPromise) {
    return preloaderPromise;
  }

  console.log("[ProductService] Starting background product preload from database...");
  preloaderPromise = getProductsDb()
    .then((products) => {
      productCache = products;
      console.log(`[ProductService] Background preload success! Cached ${products.length} products.`);
      return products;
    })
    .catch((error) => {
      console.error("[ProductService] Background preload failed:", error);
      preloaderPromise = null;
      throw error;
    });

  return preloaderPromise;
}

export async function getProducts(): Promise<Product[]> {
  if (productCache) {
    return productCache;
  }
  if (preloaderPromise) {
    return preloaderPromise;
  }
  return startPreloading();
}

export function getProductsSync(): Product[] {
  if (productCache) {
    return productCache;
  }
  return PRODUCTS;
}

export function invalidateCache() {
  console.log("[ProductService] Invalidating product cache.");
  productCache = null;
  preloaderPromise = null;
}
