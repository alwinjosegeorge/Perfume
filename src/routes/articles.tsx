import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ARTICLES } from "@/data/catalog";

export const Route = createFileRoute("/articles")({
  head: () => ({
    meta: [
      { title: "Articles — Bellezza" },
      { name: "description", content: "Beauty secrets, how-to guides, and the latest trends from Bellezza." },
    ],
  }),
  component: ArticlesPage,
});

function ArticlesPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const cats = ["All", ...Array.from(new Set(ARTICLES.map((a) => a.category)))];
  const list = ARTICLES.filter(
    (a) =>
      (cat === "All" || a.category === cat) &&
      (q.trim() === "" || a.title.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <SiteLayout>
      <section className="max-w-[1300px] mx-auto px-6 lg:px-12 py-16">
        <h1 className="font-display text-5xl md:text-6xl text-center">Recent Articles</h1>
        <p className="text-center text-muted-foreground mt-4 max-w-xl mx-auto">
          Discover beauty secrets, how-to guides, and the latest trends — curated just for you.
        </p>

        <div className="mt-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-5 py-2 rounded-full text-sm border ${
                  cat === c ? "bg-foreground text-background border-foreground" : "border-border"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center bg-cream/70 rounded-full p-1.5 w-full md:w-80">
            <SearchIcon className="w-4 h-4 ml-3 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search articles"
              className="flex-1 bg-transparent px-3 py-1.5 text-sm outline-none"
            />
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6 lg:gap-8">
          {list.map((a) => (
            <Link key={a.slug} to="/articles/$slug" params={{ slug: a.slug }} className="group block">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                <img src={a.img} alt={a.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="mt-5 text-sm text-muted-foreground">📅 {a.date} · {a.category}</div>
              <h2 className="mt-2 text-lg font-medium leading-snug">{a.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
            </Link>
          ))}
        </div>

        {list.length === 0 && <p className="text-center text-muted-foreground mt-12">No articles found.</p>}
      </section>
    </SiteLayout>
  );
}
