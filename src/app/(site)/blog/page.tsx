import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getBlogCategories, getBlogPosts } from "@/lib/sanity-content";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Blog",
  description:
    "Read Kolhapur travel guides, wedding planning ideas, dining stories, and hotel updates from The Pavillion Hotel.",
  path: "/blog",
});

export default async function BlogPage() {
  const [{ posts }, categories] = await Promise.all([
    getBlogPosts({ limit: 12 }),
    getBlogCategories(),
  ]);

  const featuredPost = posts.find((post) => post.featured) ?? posts[0];
  const regularPosts = featuredPost ? posts.filter((post) => post.slug !== featuredPost.slug) : [];

  return (
    <main className="mx-auto max-w-7xl 4xl:max-w-[90rem] px-4 py-10 sm:px-5 sm:py-14 lg:px-8 lg:py-20">
      <header className="max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Content Hub</p>
        <h1 className="mt-4 text-4xl leading-tight text-fg sm:text-5xl lg:text-6xl">Stories from The Pavillion</h1>
        <p className="mt-5 text-base leading-8 text-fg-muted sm:text-lg">
          Discover destination guides, hospitality stories, and planning ideas from Kolhapur.
        </p>
      </header>

      {categories.length > 0 ? (
        <div className="mt-8 flex flex-wrap gap-2 sm:mt-10 sm:gap-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/blog/category/${category.slug}`}
              className="rounded-full border border-line bg-surface px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-fg/75 transition hover:border-gold hover:text-gold"
            >
              {category.title}
            </Link>
          ))}
        </div>
      ) : null}

      {featuredPost ? (
        <article className="mt-10 overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_20px_60px_rgba(20,38,30,0.08)] sm:mt-12 lg:grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-72 bg-forest-deep">
            {featuredPost.coverImage ? (
              <Image
                src={featuredPost.coverImage}
                alt={featuredPost.coverImageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover"
              />
            ) : null}
          </div>
          <div className="p-6 sm:p-8 lg:p-10">
            <p className="text-[10px] uppercase tracking-[0.35em] text-gold">Featured Article</p>
            <h2 className="mt-4 text-3xl leading-tight text-fg sm:text-4xl">
              <Link href={`/blog/${featuredPost.slug}`} className="transition hover:text-gold">
                {featuredPost.title}
              </Link>
            </h2>
            <p className="mt-4 text-sm leading-7 text-fg-muted sm:text-base">{featuredPost.excerpt}</p>
            <div className="mt-6 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-fg/70">
              <span>{featuredPost.estimatedReadTime} min read</span>
              {featuredPost.publishedAt ? (
                <span>{new Date(featuredPost.publishedAt).toLocaleDateString("en-IN")}</span>
              ) : null}
            </div>
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="mt-7 inline-flex rounded-full bg-forest px-5 py-3 text-[11px] uppercase tracking-[0.28em] text-offwhite transition hover:bg-gold"
            >
              Read Article
            </Link>
          </div>
        </article>
      ) : (
        <section className="mt-10 rounded-3xl border border-dashed border-line bg-surface p-8 text-center sm:mt-12">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">No Articles Yet</p>
          <p className="mt-3 text-sm text-fg-muted">
            Publish your first post from Studio to populate this section.
          </p>
        </section>
      )}

      {regularPosts.length > 0 ? (
        <section className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {regularPosts.map((post) => (
            <article
              key={post.slug}
              className="overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_20px_60px_rgba(20,38,30,0.08)] transition hover:-translate-y-1 hover:border-gold/50"
            >
              <div className="relative h-52 bg-forest-deep">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.coverImageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-xl leading-snug text-fg">
                  <Link href={`/blog/${post.slug}`} className="transition hover:text-gold">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-fg-muted">{post.excerpt}</p>
                <div className="mt-5 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-fg/70">
                  <span>{post.estimatedReadTime} min</span>
                  <Link href={`/blog/${post.slug}`} className="text-gold transition hover:opacity-80">
                    Read
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : null}
    </main>
  );
}
