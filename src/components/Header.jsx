import Link from "next/link";
import { sections } from "@/lib/sections";

export default function Header() {
  return (
    <header className="bg-zinc-900">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <Link href="/" className="block text-center">
          <img
            src="/logo.jpg"
            alt="साहित्य सृजन संवाद"
            className="mx-auto h-20 w-auto"
          />
          <h1 className="mt-2 text-3xl font-bold text-amber-700">
            साहित्य सृजन संवाद
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            कला संस्कृति चिंतन का पोर्टल
          </p>
        </Link>

        <nav className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium">
          <Link href="/" className="text-pink-500 hover:text-pink-300">
            होम
          </Link>
          {sections.map((section) => (
            <Link
              key={section.slug}
              href={`/${section.slug}`}
              className="text-pink-500 hover:text-pink-300"
            >
              {section.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}