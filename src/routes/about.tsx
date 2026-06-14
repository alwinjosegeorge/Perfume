import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import gNew1 from "@/assets/gallery-new-1.webp";
import gNew2 from "@/assets/gallery-new-2.webp";
import gNew3 from "@/assets/gallery-new-3.webp";
import gNew4 from "@/assets/gallery-new-4.webp";
import gNew5 from "@/assets/gallery-new-5.webp";
import gNew6 from "@/assets/gallery-new-6.webp";
import gNew7 from "@/assets/gallery-new-7.webp";
import gNew8 from "@/assets/gallery-new-8.webp";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Voguish Moments" },
      { name: "description", content: "The Voguish Moments brand was founded in 2025 in UAE, with high-grade ingredients sourced from France by Raa." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="max-w-[1100px] mx-auto px-6 pt-6 lg:pt-10 pb-16 text-center">
        <h1 className="font-display text-5xl md:text-6xl">Our Story</h1>
        <p className="mt-5 text-muted-foreground max-w-3xl mx-auto leading-relaxed text-lg">
          The Voguish Moments brand was founded in 2025 in UAE, with high-grade ingredients sourced from Orléans, Centre-Val de Loire, France by the talented avant-garde artist Raa. Every scent is life-related. Inspired by real life, personal memories, and emotions, Raa created a concept where fragrance is not just a solution to occasions, but a true embodiment of stories and feelings. Each note composition is rare, born from deep thought and trauma.
        </p>
        <div className="mt-10 border-t border-b border-border/40 py-8 max-w-2xl mx-auto">
          <p className="font-display text-xl md:text-2xl italic text-foreground leading-relaxed">
            "The greatest distance in the world is not between two countries, but between two people who speak the same language and still fail to understand each other."
          </p>
          <p className="mt-4 text-xs tracking-[0.2em] font-bold uppercase text-stone-500">
            This drop speaks your identity to the peoples.
          </p>
        </div>
      </section>

      <section className="max-w-[1300px] mx-auto px-6 lg:px-12 py-16">
        <h2 className="text-center font-display text-lg md:text-2xl font-light tracking-[0.2em] uppercase text-[#1c1917] mb-4">#VOGUISHMOMENTS</h2>
        <p className="text-center text-muted-foreground mb-6 max-w-xl mx-auto">
          Stay in the loop for must-know updates on new fragrances, exclusive launches, and upcoming events.
        </p>
        <div className="flex justify-center mb-12">
          <a href="https://www.instagram.com/voguishmoments" target="_blank" rel="noopener noreferrer" className="bg-blush/80 text-foreground rounded-full px-6 py-2 text-sm hover:bg-blush">Follow Us</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[gNew1, gNew2, gNew3, gNew4, gNew5, gNew6, gNew7, gNew8].map((src, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-2xl bg-cream">
              <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
