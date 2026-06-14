import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ARTICLES } from "@/data/catalog";

export const Route = createFileRoute("/articles/$slug")({
  loader: ({ params }) => {
    const article = ARTICLES.find((a) => a.slug === params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.article.title ?? "Article"} — Voguish Moments` },
      { name: "description", content: loaderData?.article.excerpt ?? "" },
    ],
  }),
  component: ArticlePage,
  errorComponent: ({ error }) => (
    <SiteLayout><div className="p-12 text-center">{error.message}</div></SiteLayout>
  ),
  notFoundComponent: () => (
    <SiteLayout><div className="p-12 text-center">Article not found.</div></SiteLayout>
  ),
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const more = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <SiteLayout>
      <article className="max-w-3xl mx-auto px-6 lg:px-12 py-16">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/articles" className="hover:text-accent">Articles</Link> / <span>{article.category}</span>
        </nav>
        <div className="text-sm text-muted-foreground">📅 {article.date} · {article.category}</div>
        <h1 className="font-display text-4xl md:text-5xl mt-3 leading-tight">{article.title}</h1>
        <div className="mt-8 aspect-[16/9] rounded-2xl overflow-hidden">
          <img src={article.img} alt={article.title} className="w-full h-full object-cover" />
        </div>
        <div className="mt-10 space-y-5 text-foreground/90 leading-relaxed">
          {article.body.map((p: string, i: number) => <p key={i}>{p}</p>)}
        </div>
      </article>

      <section className="max-w-[1300px] mx-auto px-6 lg:px-12 pb-16">
        <h2 className="font-display text-3xl md:text-4xl mb-8 text-center">More to Read</h2>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {more.map((a) => (
            <Link key={a.slug} to="/articles/$slug" params={{ slug: a.slug }} className="group block">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                <img src={a.img} alt={a.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="mt-4 font-medium">{a.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
