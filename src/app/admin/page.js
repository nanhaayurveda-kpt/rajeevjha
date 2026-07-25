import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { posts } from "@/db/schema";
import { sections } from "@/lib/sections";
import { deletePost, togglePublish } from "@/lib/actions";

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
        <h1 className="text-3xl font-black text-zinc-900">सभी रचनाएँ</h1>
        <Link
          href="/admin/nayi-rachna"
          className="rounded-xl bg-pink-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-pink-600/30 hover:bg-pink-700"
        >
          + नई रचना
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 p-6 text-white shadow-lg">
          <p className="text-sm font-semibold text-indigo-100">कुल रचनाएँ</p>
          <p className="mt-2 text-4xl font-black">{rachnaen.length}</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-6 text-white shadow-lg">
          <p className="text-sm font-semibold text-emerald-100">प्रकाशित</p>
          <p className="mt-2 text-4xl font-black">{prakashit}</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-700 p-6 text-white shadow-lg">
          <p className="text-sm font-semibold text-amber-100">मसौदा</p>
          <p className="mt-2 text-4xl font-black">{masauda}</p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border-2 border-zinc-200 bg-white shadow-lg">
        {rachnaen.length === 0 ? (
          <p className="p-12 text-center text-lg font-semibold text-zinc-400">
            अभी कोई रचना नहीं है।
          </p>
        ) : (
          <ul className="divide-y-2 divide-zinc-100">
            {rachnaen.map((rachna) => (
              <li
                key={rachna.id}
                className="flex items-center justify-between gap-4 p-5 hover:bg-pink-50"
              >
                <div className="min-w-0">
                  <p className="truncate text-lg font-bold text-zinc-900">
                    {rachna.title}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full bg-indigo-100 px-2.5 py-1 font-bold text-indigo-700">
                      {labelFor(rachna.section, rachna.category)}
                    </span>
                    {rachna.author && (
                      <span className="rounded-full bg-zinc-100 px-2.5 py-1 font-bold text-zinc-600">
                        {rachna.author}
                      </span>
                    )}
                    <span
                      className={`rounded-full px-2.5 py-1 font-bold ${
                        rachna.isPublished
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {rachna.isPublished ? "प्रकाशित" : "मसौदा"}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2 text-sm">
                  <form action={togglePublish}>
                    <input type="hidden" name="id" value={rachna.id} />
                    <input
                      type="hidden"
                      name="current"
                      value={String(rachna.isPublished)}
                    />
                    <button
                      type="submit"
                      className="rounded-lg bg-zinc-100 px-3 py-1.5 font-bold text-zinc-700 hover:bg-zinc-200"
                    >
                      {rachna.isPublished ? "मसौदा करें" : "प्रकाशित करें"}
                    </button>
                  </form>

                  <Link
                    href={`/admin/rachna/${rachna.id}`}
                    className="rounded-lg bg-pink-100 px-3 py-1.5 font-bold text-pink-700 hover:bg-pink-200"
                  >
                    संपादन
                  </Link>

                  <form action={deletePost}>
                    <input type="hidden" name="id" value={rachna.id} />
                    <button
                      type="submit"
                      className="rounded-lg bg-red-100 px-3 py-1.5 font-bold text-red-700 hover:bg-red-200"
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