import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, MessageSquare, Instagram } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Bellezza" },
      { name: "description", content: "Get in touch with the Bellezza team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [issue, setIssue] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Voguish Moments,\n\nName: ${name.trim()}\nIssue: ${issue.trim()}\n\nMessage: ${message.trim()}`;
    const encoded = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/919061516361?text=${encoded}`;
    window.open(whatsappUrl, "_blank");
    setSent(true);
  };

  return (
    <SiteLayout>
      <section className="max-w-[1100px] mx-auto px-6 pt-6 lg:pt-10 pb-16 text-center">
        <h1 className="font-display text-5xl md:text-6xl">Get in Touch</h1>
        <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
          We'd love to hear from you. Reach out via WhatsApp or check out our social media channels.
        </p>
      </section>

      <section className="max-w-[1300px] mx-auto px-6 lg:px-12 pb-16 grid lg:grid-cols-[1fr_1fr] gap-10">
        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-3xl p-8 md:p-10 space-y-5"
        >
          <label className="block">
            <span className="text-sm font-medium">Name *</span>
            <input 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="mt-1.5 w-full bg-[#FAF9F5] border border-border rounded-xl px-4 py-3 text-xs outline-none focus:ring-1 focus:ring-accent" 
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Issues *</span>
            <input 
              required
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              placeholder="Describe your issue or query..."
              className="mt-1.5 w-full bg-[#FAF9F5] border border-border rounded-xl px-4 py-3 text-xs outline-none focus:ring-1 focus:ring-accent" 
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Message *</span>
            <textarea 
              required 
              rows={6} 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              className="mt-1.5 w-full bg-[#FAF9F5] border border-border rounded-xl px-4 py-3 text-xs outline-none focus:ring-1 focus:ring-accent resize-none" 
            />
          </label>
          <button className="bg-[#1c1917] text-white rounded-full px-8 py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-foreground/90 cursor-pointer shadow-md shadow-stone-900/10">
            Send message
          </button>
          {sent && <p className="text-xs font-semibold text-emerald-600 animate-pulse">Form submitted! Redirecting to WhatsApp...</p>}
        </form>

        <div className="flex flex-col gap-6">
          <div className="bg-[#FAF9F5]/45 border border-border/80 rounded-3xl p-8 space-y-6">
            <h3 className="font-display text-2xl">Contact Details</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 mt-0.5 text-accent" />
                <div>
                  <div className="font-medium text-sm">Phone</div>
                  <a href="tel:9061516361" className="text-sm font-semibold hover:text-accent mt-0.5 block">9061516361</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MessageSquare className="w-5 h-5 mt-0.5 text-accent" />
                <div>
                  <div className="font-medium text-sm">WhatsApp</div>
                  <a href="https://wa.me/919061516361" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover:text-accent mt-0.5 block">9061516361</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Instagram className="w-5 h-5 mt-0.5 text-accent" />
                <div>
                  <div className="font-medium text-sm">Instagram</div>
                  <a href="https://www.instagram.com/voguishmoments?igsh=MWJiMnUyb3UxejFobw==" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover:text-accent mt-0.5 block">@voguishmoments</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-cream/35 border border-border/60 rounded-3xl p-8 flex flex-col justify-center items-center text-center flex-1">
            <h4 className="font-display text-lg mb-2">Connect Instantly</h4>
            <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
              We respond to messages and inquiries quickly. Feel free to start a chat directly on WhatsApp.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
