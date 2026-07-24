import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { posts } from "@/db/schema";
import { sections } from "@/lib/sections";
import { deletePost } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const rachnaen = await db.select().from(posts).orderBy(desc(posts.createdAt));

  const prakashit = rachnaen.filter((r) => r.isPublished).length;
  const masauda = rachnaen.length - prakashit;

  function labelFor(sectionSlug, categorySlug) {
    const s = sections.find((x) => x.slug === sectionSlug);
    const c = s?.categories.find((x) => x.slug === categorySlug);
    return c?.label || categorySlug;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900">सभी रचनाएँ</h1>
        <Link
          href="/admin/nayi-rachna"
          className="rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-700"
        >
          नई रचना
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-zinc-500">कुल रचनाएँ</p>
          <p className="mt-1 text-3xl font-bold text-zinc-900">
            {rachnaen.length}
          </p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-zinc-500">प्रकाशित</p>
          <p className="mt-1 text-3xl font-bold text-amber-700">{prakashit}</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-zinc-500">मसौदा</p>
          <p className="mt-1 text-3xl font-bold text-pink-600">{masauda}</p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
        {rachnaen.length === 0 ? (
          <p className="p-8 text-center text-zinc-500">
            अभी कोई रचना नहीं है।
          </p>
        ) : (
          <ul className="divide-y divide-zinc-100">
            {rachnaen.map((rachna) => (
              <li
                key={rachna.id}
                className="flex items-center justify-between gap-4 p-5"
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold text-zinc-900">
                    {rachna.title}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {labelFor(rachna.section, rachna.category)}
                    {rachna.author ? ` · ${rachna.author}` : ""}
                    {rachna.isPublished ? "" : " · मसौदा"}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-3 text-sm">
                  <Link
                    href={`/admin/rachna/${rachna.id}`}
                    className="text-pink-600 hover:text-pink-800"
                  >
                    संपादन
                  </Link>
                  <form action={deletePost}>
                    <input type="hidden" name="id" value={rachna.id} />
                    <button
                      type="submit"
                      className="text-zinc-400 hover:text-red-600"
                    >
                      मिटाएँ
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}