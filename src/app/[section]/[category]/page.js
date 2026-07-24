import Link from "next/link";
import { notFound } from "next/navigation";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { posts } from "@/db/schema";
import { sections } from "@/lib/sections";

export default async function CategoryPage({ params }) {
  const { section, category } = await params;

  const currentSection = sections.find((s) => s.slug === section);
  const currentCategory = currentSection?.categories.find(
    (c) => c.slug === category,
  );

  if (!currentSection || !currentCategory) {
    notFound();
  }

  const rachnaen = await db
    .select()
    .from(posts)
    .where(
      and(
        eq(posts.section, section),
        eq(posts.category, category),
        eq(posts.isPublished, true),
      ),
    )
    .orderBy(desc(posts.createdAt));

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <p className="text-sm text-zinc-500">
        <Link href={`/${currentSection.slug}`} className="hover:text-pink-600">
          {currentSection.label}
        </Link>
      </p>
      <h1 className="mt-1 text-2xl font-bold text-amber-700">
        {currentCategory.label}
      </h1>

      {rachnaen.length === 0 ? (
        <p className="mt-8 text-zinc-500">इस स्तंभ में अभी कोई रचना नहीं है।</p>
      ) : (
        <ul className="mt-8 divide-y divide-zinc-200">
          {rachnaen.map((rachna) => (
            <li key={rachna.id} className="py-5">
              <Link
                href={`/${section}/${category}/${rachna.slug}`}
                className="text-lg font-semibold text-zinc-900 hover:text-pink-600"
              >
                {rachna.title}
              </Link>
              {rachna.author && (
                <p className="mt-1 text-sm text-zinc-500">{rachna.author}</p>
              )}
              {rachna.excerpt && (
                <p className="mt-2 text-sm leading-7 text-zinc-600">
                  {rachna.excerpt}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}