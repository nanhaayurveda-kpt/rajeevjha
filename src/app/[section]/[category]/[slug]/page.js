import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { posts } from "@/db/schema";
import { sections } from "@/lib/sections";

async function getRachna(slug) {
  const rows = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, slug))
    .limit(1);
  return rows[0];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const rachna = await getRachna(slug);

  if (!rachna) {
    return { title: "रचना नहीं मिली" };
  }

  return {
    title: rachna.title,
    description: rachna.excerpt || rachna.title,
  };
}

export default async function RachnaPage({ params }) {
  const { section, category, slug } = await params;
  const rachna = await getRachna(slug);

  if (!rachna || !rachna.isPublished) {
    notFound();
  }

  const currentSection = sections.find((s) => s.slug === section);
  const currentCategory = currentSection?.categories.find(
    (c) => c.slug === category,
  );

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <p className="text-sm text-pink-600">
        <Link href={`/${section}/${category}`} className="hover:text-pink-800">
          {currentCategory?.label}
        </Link>
      </p>

      <h1 className="mt-2 text-3xl font-bold leading-snug text-zinc-900">
        {rachna.title}
      </h1>

      {rachna.author && (
        <p className="mt-2 text-sm text-zinc-500">{rachna.author}</p>
      )}

      <div
        className="mt-8 text-lg leading-9 text-zinc-800"
        dangerouslySetInnerHTML={{ __html: rachna.content }}
      />
    </article>
  );
}
