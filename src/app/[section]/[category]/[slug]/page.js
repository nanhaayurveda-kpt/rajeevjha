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
    description: rachna.title,
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

  const gallery = Array.isArray(rachna.gallery) ? rachna.gallery : [];

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

      {(rachna.author || rachna.authorPhoto) && (
        <div className="mt-4 flex items-center gap-3">
          {rachna.authorPhoto && (
            <img
              src={rachna.authorPhoto}
              alt={rachna.author || ""}
              className="h-24 w-24 rounded-full object-cover"
            />
          )}
          {rachna.author && (
            <p className="text-sm font-semibold text-zinc-700">
              {rachna.author}
            </p>
          )}
        </div>
      )}

      {rachna.featuredImage && (
        <img
          src={rachna.featuredImage}
          alt={rachna.title}
          className="mt-6 w-full rounded-xl object-cover"
        />
      )}

      <div
        className="mt-8 text-lg leading-9 text-zinc-800"
        dangerouslySetInnerHTML={{ __html: rachna.content }}
      />

      {rachna.youtubeUrl && (
        <div className="mt-8 aspect-video">
          <iframe
            src={rachna.youtubeUrl.replace("watch?v=", "embed/")}
            title="वीडियो"
            allowFullScreen
            className="h-full w-full rounded-xl"
          />
        </div>
      )}

      {gallery.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {gallery.map((url) => (
            <img
              key={url}
              src={url}
              alt=""
              className="h-40 w-full rounded-lg object-cover"
            />
          ))}
        </div>
      )}
    </article>
  );
}