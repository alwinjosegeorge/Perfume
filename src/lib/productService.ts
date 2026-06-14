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

  // Create deferred promise resolver and rejecter
  let resolvePromise: (value: Product[]) => void = () => {};
  let rejectPromise: (reason: any) => void = () => {};

  preloaderPromise = new Promise<Product[]>((resolve, reject) => {
    resolvePromise = resolve;
    rejectPromise = reject;
  });

  const performFetch = () => {
    console.log("[ProductService] Starting background product preload softly when thread is idle...");
    getProductsDb()
      .then((products) => {
        productCache = products;
        console.log(`[ProductService] Background preload success! Cached ${products.length} products.`);
        resolvePromise(products);
      })
      .catch((error) => {
        console.error("[ProductService] Background preload failed:", error);
        preloaderPromise = null;
        rejectPromise(error);
      });
  };

  // Schedule preloading softly in the background when the main thread is idle
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    (window as any).requestIdleCallback(() => performFetch(), { timeout: 2000 });
  } else {
    setTimeout(performFetch, 1000);
  }

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
