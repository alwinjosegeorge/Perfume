import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import hero from "@/assets/hero-products.jpg";
import promoFace from "@/assets/promo-face.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Bellezza" },
      { name: "description", content: "For over 25 years, Bellezza has been redefining beauty through innovation and passion." },
    ],
  }),
  component: AboutPage,
});

const STATS = [
  { n: "30+", l: "Awards" },
  { n: "32+", l: "Investments" },
  { n: "10k", l: "Awards" },
  { n: "100+", l: "Users" },
];

function AboutPage() {
  return (
    <SiteLayout>
      <section className="max-w-[1100px] mx-auto px-6 pt-6 lg:pt-10 pb-16 text-center">
        <h1 className="font-display text-5xl md:text-6xl">Our Story</h1>
        <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
          For over 25 years, we have been redefining beauty through innovation and passion. Our journey is built on expertise, creativity, and a deep understanding of what makes each individual unique.
        </p>
      </section>

      <section className="max-w-[1300px] mx-auto px-6 lg:px-12">
        <div className="aspect-[16/7] rounded-3xl overflow-hidden bg-cream">
          <img src={hero} alt="Bellezza atelier" className="w-full h-full object-cover" />
        </div>
      </section>

      <section className="max-w-[1300px] mx-auto px-6 lg:px-12 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            Quality,<br />Consciousness, And<br />Versatile Design
          </h2>
          <p className="mt-6 text-muted-foreground max-w-md">
            Bellezza was created with a simple idea: to design an e-commerce template that feels both modern and timeless. Inspired by beauty and lifestyle brands, it offers a clean foundation that can adapt to different industries.
          </p>
        </div>
        <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-cream">
          <img src={g3} alt="Lifestyle" loading="lazy" className="w-full h-full object-cover" />
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.l + s.n}>
              <div className="font-display text-5xl">{s.n}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.l}.</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1300px] mx-auto px-6 lg:px-12 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-cream">
          <img src={promoFace} alt="Skincare ritual" loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            Powered By<br />Shopiframe And<br />Seamless Shopify<br />Integration
          </h2>
          <p className="mt-6 text-muted-foreground max-w-md">
            Bellezza integrates seamlessly with Shopify through Shopiframe, making it simple to connect your products and manage your business. You handle the operations in Shopify, while Framer gives you full creative control over your storefront design.
          </p>
        </div>
      </section>

      <section className="max-w-[1300px] mx-auto px-6 lg:px-12 py-16">
        <h2 className="text-center text-4xl md:text-5xl tracking-wide mb-4">#BELLEZZABEAUTY</h2>
        <p className="text-center text-muted-foreground mb-6 max-w-xl mx-auto">
          Stay in the loop for must-know updates on new products, exclusive launches, and upcoming events.
        </p>
        <div className="flex justify-center mb-12">
          <a href="#" className="bg-blush/80 text-foreground rounded-full px-6 py-2 text-sm hover:bg-blush">Follow Us</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[g1, g2, g3, g4, g5, g6].map((src, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-2xl bg-cream">
              <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
