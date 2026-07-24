"use client";

import { useState } from "react";
import Link from "next/link";
import { sections } from "@/lib/sections";

export default function HomePage() {
  const [openSlug, setOpenSlug] = useState(null);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <ul className="divide-y divide-zinc-200">
        {sections.map((section) => {
          const isOpen = openSlug === section.slug;

          return (
            <li key={section.slug} className="py-3">
              <button
                type="button"
                onClick={() => setOpenSlug(isOpen ? null : section.slug)}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="text-lg font-bold text-amber-700">
                  {section.label}
                </span>
                <span className="text-xl text-pink-600">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && (
                <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  {section.categories.map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        href={`/${section.slug}/${cat.slug}`}
                        className="text-pink-600 hover:text-pink-800"
                      >
                        {cat.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}