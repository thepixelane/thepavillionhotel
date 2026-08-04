import Link from "next/link";
import type { Metadata } from "next";
import { getBlogCategories, getBlogPosts } from "@/lib/sanity-content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getBlogCategories();
  const category = categories.find((item) => item.slug === slug);

  return {
    title: category ? `${category.title} Articles` : "Category",
    description:
      category?.description ||
      "Browse curated stories and updates from The Pavillion Content Hub.",
  };
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const [categories, { posts }] = await Promise.all([
    getBlogCategories(),
    getBlogPosts({ categorySlug: slug, limit: 18 }),
  ]);
  const category = categories.find((item) => item.slug === slug);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-5 sm:py-14 lg:px-8 lg:py-20">
      <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Category</p>
      <h1 className="mt-4 text-4xl leading-tight text-fg sm:text-5xl">
        {category?.title ?? "Category"}
      </h1>
      {category?.description ? (
        <p className="mt-5 max-w-2xl text-base leading-8 text-fg-muted sm:text-lg">
          {category.description}
        </p>
      ) : null}

      <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="rounded-3xl border border-line bg-surface p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gold">{post.estimatedReadTime} min read</p>
            <h2 className="mt-3 text-xl text-fg">
              <Link href={`/blog/${post.slug}`} className="transition hover:text-gold">
                {post.title}
              </Link>
            </h2>
            <p className="mt-3 line-clamp-3 text-sm leading-7 text-fg-muted">{post.excerpt}</p>
          </article>
        ))}
      </div>

      {posts.length === 0 ? (
        <section className="mt-10 rounded-3xl border border-dashed border-line bg-surface p-8 text-center sm:mt-12">
          <p className="text-sm text-fg-muted">No posts found in this category yet.</p>
        </section>
      ) : null}

      <div className="mt-8">
        <Link
          href="/blog"
          className="inline-flex rounded-full border border-line px-5 py-3 text-[11px] uppercase tracking-[0.28em] text-fg transition hover:border-gold hover:text-gold"
        >
          Back to Blog
        </Link>
      </div>
    </main>
  );
}
