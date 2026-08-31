import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getBlogPostBySlug,
  getRelatedBlogPosts,
  type BlogPost,
} from "@/lib/sanity-content";
import { siteUrl } from "@/lib/public-env";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(value?: string): string | null {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function renderPortableText(body: BlogPost["body"]) {
  const safeBody = Array.isArray(body) ? body.filter(Boolean) : [];

  return safeBody.map((block) => {
    if (!block || block._type !== "block") return null;
    const text = Array.isArray(block.children)
      ? block.children.map((child) => child?.text ?? "").join("").trim()
      : "";
    if (!text) return null;

    if (block.style === "h2") {
      return (
        <h2 key={block._key} className="mt-10 text-2xl text-fg sm:text-3xl">
          {text}
        </h2>
      );
    }

    if (block.style === "h3") {
      return (
        <h3 key={block._key} className="mt-8 text-xl text-fg sm:text-2xl">
          {text}
        </h3>
      );
    }

    if (block.style === "blockquote") {
      return (
        <blockquote key={block._key} className="mt-8 border-l-2 border-gold pl-4 text-fg-muted italic">
          {text}
        </blockquote>
      );
    }

    return (
      <p key={block._key} className="mt-5 text-base leading-8 text-fg-muted">
        {text}
      </p>
    );
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  const canonical = post.canonicalUrl || `${siteUrl}/blog/${post.slug}`;
  const ogImage = post.ogImage || post.coverImage;

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      url: canonical,
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: ogImage ? [{ url: ogImage, alt: post.coverImageAlt }] : undefined,
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedBlogPosts(post, 3);
  const canonical = post.canonicalUrl || `${siteUrl}/blog/${post.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.ogImage || post.coverImage || undefined,
    datePublished: post.publishedAt,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.name,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "The Pavillion Hotel",
      url: siteUrl,
    },
    mainEntityOfPage: canonical,
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-5 sm:py-14 lg:px-8 lg:py-20">
      <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Content Hub</p>
      <h1 className="mt-4 text-4xl leading-tight text-fg sm:text-5xl lg:text-6xl">{post.title}</h1>

      <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-fg/70">
        {post.author ? <span>By {post.author.name}</span> : null}
        {formatDate(post.publishedAt) ? <span>{formatDate(post.publishedAt)}</span> : null}
        <span>{post.estimatedReadTime} min read</span>
      </div>

      {post.coverImage ? (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl bg-forest-deep">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <article className="mt-8">{renderPortableText(post.body)}</article>

      {related.length > 0 ? (
        <section className="mt-14 border-t border-line pt-8 sm:mt-16 sm:pt-10">
          <h2 className="text-2xl text-fg sm:text-3xl">Related Articles</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="rounded-2xl border border-line bg-surface p-4 text-sm text-fg transition hover:border-gold hover:text-gold"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <Script
        id="blog-posting-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </main>
  );
}
