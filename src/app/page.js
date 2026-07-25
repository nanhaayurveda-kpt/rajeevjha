import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { db } from "@/lib/db";
import { posts } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const rachnaen = await db
    .select()
    .from(posts)
    .where(eq(posts.isPublished, true))
    .orderBy(desc(posts.createdAt))
    .limit(20);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {rachnaen.length === 0 ? (
        <p className="text-center text-zinc-500">अभी कोई रचना प्रकाशित नहीं है।</p>
      ) : (
        <ul className="divide-y divide-zinc-200">
          {rachnaen.map((rachna) => (
            <li key={rachna.id} className="py-5">
              <Link
                href={`/${rachna.section}/${rachna.category}/${rachna.slug}`}
                className="text-xl font-bold text-zinc-900 hover:text-pink-600"
              >
                {rachna.title}
              </Link>
              {rachna.author && (
                <p className="mt-1 text-sm text-zinc-500">{rachna.author}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}