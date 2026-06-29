import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy — Voguish Moments" },
      { name: "description", content: "Refund Policy for Voguish Moments Perfumes." },
    ],
  }),
  component: RefundPolicyPage,
});

function RefundPolicyPage() {
  return (
    <SiteLayout>
      <section className="max-w-[800px] mx-auto px-6 pt-10 pb-20 animate-fade-up">
        <h1 className="font-display text-4xl md:text-5xl mb-8 text-foreground">Refund Policy</h1>
        
        <div className="prose prose-stone max-w-none text-muted-foreground space-y-6 leading-relaxed">
          <p>
            We do not offer returns or exchanges, as each fragrance is presented in its intended, complete form.
          </p>

          <p>
            If your experience with the fragrance feels unexpected, you may write to us at <a href="mailto:voguishmoments@gmail.com" className="text-foreground underline">voguishmoments@gmail.com</a>. We will review each note with care.
          </p>

          <p>
            In the unlikely event that your order arrives damaged, we request that the unsealing of the package be recorded. This allows us to assess and resolve the matter promptly.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
