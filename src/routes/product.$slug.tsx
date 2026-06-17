import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Minus, Plus, ShoppingBag, Check } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/data/catalog";
import { getProductsSync, getProducts } from "@/lib/productService";
import { useCart, getPriceForSize } from "@/lib/cart";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const all = getProductsSync();
    const product = all.find((p) => p.slug === loaderData?.slug);
    return {
      meta: [
        { title: `${product?.name ?? "Product"} — Voguish Moments` },
        { name: "description", content: product?.description ?? "" },
      ],
    };
  },
  component: ProductPage,
  errorComponent: ({ error }) => (
    <SiteLayout><div className="p-12 text-center">{error.message}</div></SiteLayout>
  ),
  notFoundComponent: () => {
    const { slug } = Route.useParams();
    return <SiteLayout><div className="p-12 text-center">Product "{slug}" not found.</div></SiteLayout>;
  },
});

function ProductPage() {
  const { slug } = Route.useLoaderData();
  const [allProducts, setAllProducts] = useState<any[]>(PRODUCTS);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("50 ml");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeMainImage, setActiveMainImage] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState(false);
  const { add } = useCart();
  const router = useRouter();

  useEffect(() => {
    let active = true;
    getProducts().then((data) => {
      if (active) setAllProducts(data);
    });
    return () => {
      active = false;
    };
  }, [slug]);

  const product = allProducts.find((p) => p.slug === slug);

  useEffect(() => {
    if (product) {
      if ((selectedSize === "10 ml" || selectedSize === "15 ml") && product.gallery && product.gallery.length > 0) {
        setActiveMainImage(product.gallery[0]);
      } else {
        setActiveMainImage(product.img);
      }
      setIsExpanded(false);
    }
  }, [product, selectedSize]);

  if (!product) {
    return (
      <SiteLayout>
        <div className="max-w-[1300px] mx-auto px-6 lg:px-12 py-32 text-center text-muted-foreground animate-pulse">
          Loading product details...
        </div>
      </SiteLayout>
    );
  }

  // Show ONLY other perfumes from the same fragrance base
  const related = allProducts.filter((p) => p.base === product.base && p.slug !== product.slug);

  const sizeOptions = product.pricing && Object.keys(product.pricing).length > 0
    ? Object.keys(product.pricing)
    : ["10 ml", "15 ml", "50 ml", "100 ml"];

  useEffect(() => {
    if (product) {
      const options = product.pricing && Object.keys(product.pricing).length > 0
        ? Object.keys(product.pricing)
        : ["10 ml", "15 ml", "50 ml", "100 ml"];
      if (!options.includes(selectedSize)) {
        if (options.includes("50 ml")) {
          setSelectedSize("50 ml");
        } else {
          setSelectedSize(options[0]);
        }
      }
    }
  }, [product, allProducts]);

  const currentPrice = getPriceForSize(product, selectedSize);

  return (
    <SiteLayout>
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12 pt-6 lg:pt-10 pb-12">
        <nav className="text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-accent">Home</Link> / <Link to="/shop" className="hover:text-accent">Shop</Link> / <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          <div className="grid grid-cols-1 gap-4">
            <div className={`aspect-square rounded-none overflow-hidden bg-white ${
              selectedSize === "10 ml" || selectedSize === "15 ml" ? "p-6" : ""
            }`}>
              <img 
                src={activeMainImage || product.img} 
                alt={product.name} 
                width={1024} 
                height={1024} 
                className={`w-full h-full ${
                  selectedSize === "10 ml" || selectedSize === "15 ml" ? "object-contain" : "object-cover"
                }`} 
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {([product.img, ...(product.gallery || [])] as string[]).slice(0, 4).map((imgUrl, i) => {
                const isGalleryImg = i > 0;
                return (
                  <div 
                    key={i} 
                    onClick={() => setActiveMainImage(imgUrl)}
                    className={`aspect-square rounded-none overflow-hidden bg-white border transition-all cursor-pointer ${
                      isGalleryImg ? "p-2" : ""
                    } ${
                      activeMainImage === imgUrl ? "border-accent ring-1 ring-accent" : "border-border hover:border-foreground/30"
                    }`}
                  >
                    <img 
                      src={imgUrl} 
                      alt="" 
                      loading="lazy" 
                      className={`w-full h-full ${
                        isGalleryImg ? "object-contain" : "object-cover"
                      }`} 
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col justify-start">
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <span>{product.category}</span>
            </div>
            <h1 className="mt-2 font-display text-4xl md:text-5xl font-light">{product.name}</h1>
            <div className="mt-4 font-display text-2xl md:text-3xl font-light text-foreground">
              <span className="font-sans mr-1 font-light">₹</span>{currentPrice.toLocaleString("en-IN")}
            </div>

            {/* Size Selector */}
            <div className="mt-8">
              <div className="text-[10px] font-light tracking-[0.2em] text-muted-foreground uppercase mb-3">Size</div>
              <div className="flex gap-3 flex-wrap">
                {sizeOptions.map((sizeOption) => (
                   <button
                     key={sizeOption}
                     onClick={() => setSelectedSize(sizeOption)}
                     className={`px-6 py-3 rounded-xl border text-xs font-light tracking-widest uppercase transition-all cursor-pointer ${
                       selectedSize === sizeOption
                         ? "bg-[#1c1917] text-white border-[#1c1917] shadow-md shadow-stone-900/10 scale-[1.02]"
                         : "bg-[#FAF9F5] border-border/70 hover:border-foreground/30 text-muted-foreground"
                     }`}
                   >
                     {sizeOption}
                   </button>
                ))}
              </div>
            </div>

            {/* Added to Cart Feedback Toast */}
            {toastMessage && (
              <div className="mt-6 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium px-4 py-3.5 rounded-xl flex items-center gap-2.5 animate-fade-up">
                <div className="w-4.5 h-4.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span>{toastMessage}</span>
              </div>
            )}

            {/* Add to Cart / Buy Now Controls */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="flex items-center border border-border rounded-full self-start sm:self-auto shrink-0 bg-[#FAF9F5]/40">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-12 h-12 flex items-center justify-center hover:text-accent cursor-pointer"><Minus className="w-4 h-4" /></button>
                <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-12 h-12 flex items-center justify-center hover:text-accent cursor-pointer"><Plus className="w-4 h-4" /></button>
              </div>
              <div className="flex-1 flex gap-3">
                <button
                  onClick={() => {
                    add(product.slug, qty, selectedSize);
                    setToastMessage(`Added ${product.name} (${selectedSize}) x${qty} to cart!`);
                    setTimeout(() => setToastMessage(null), 3500);
                  }}
                  className="flex-1 bg-white hover:bg-[#FAF9F5] border border-border text-foreground rounded-full px-6 py-3.5 flex items-center justify-center gap-2 text-xs font-light tracking-[0.18em] uppercase transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </button>
                <button
                  onClick={() => {
                    add(product.slug, qty, selectedSize);
                    router.navigate({ to: "/cart" });
                  }}
                  className="flex-1 bg-[#1c1917] hover:bg-foreground/90 text-white rounded-full px-6 py-3.5 flex items-center justify-center gap-2 text-xs font-light tracking-[0.18em] uppercase transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-md shadow-stone-900/10"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {(() => {
              const threshold = 150;
              const shouldShowToggle = product.description.length > threshold;
              const displayDescription = shouldShowToggle && !isExpanded
                ? product.description.slice(0, threshold) + "..."
                : product.description;

              return (
                <p className="mt-8 text-muted-foreground leading-relaxed text-sm">
                  {displayDescription}
                  {shouldShowToggle && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="ml-2 text-[#1c1917] hover:opacity-75 font-medium underline cursor-pointer inline-block"
                    >
                      {isExpanded ? "See Less" : "See More"}
                    </button>
                  )}
                </p>
              );
            })()}
          </div>
        </div>

        <section className="mt-20">
          <h2 className="font-display text-lg md:text-2xl font-light tracking-[0.2em] uppercase text-[#1c1917] mb-8 text-center">You May Also Like</h2>
          <div className="grid grid-cols-2 md:flex md:justify-center gap-6 lg:gap-8">
            {related.map((p) => (
              <div key={p.slug} className="md:w-[280px] w-full">
                <ProductCard p={p} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
