import Link from "next/link";
import { notFound } from "next/navigation";
import { sections } from "@/lib/sections";

export default async function SectionPage({ params }) {
  const { section } = await params;

  const current = sections.find((s) => s.slug === section);

  if (!current) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-amber-700">{current.label}</h1>

      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
        {current.categories.map((cat) => (
          <li key={cat.slug}>
            <Link
              href={`/${current.slug}/${cat.slug}`}
              className="text-pink-600 hover:text-pink-800"
            >
              {cat.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}