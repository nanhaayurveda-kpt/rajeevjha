"use client";

import { useState } from "react";
import { sections } from "@/lib/sections";

export default function RachnaForm({ action, rachna }) {
  const [sectionSlug, setSectionSlug] = useState(
    rachna?.section || sections[0].slug,
  );

  const currentSection = sections.find((s) => s.slug === sectionSlug);

  return (
    <form action={action} className="space-y-6">
      {rachna && <input type="hidden" name="id" value={rachna.id} />}

      <div>
        <label className="block text-sm font-medium text-zinc-700">शीर्षक</label>
        <input
          name="title"
          defaultValue={rachna?.title}
          required
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700">
          URL slug (रोमन में)
        </label>
        <input
          name="slug"
          defaultValue={rachna?.slug}
          required
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-zinc-700">खंड</label>
          <select
            name="section"
            value={sectionSlug}
            onChange={(e) => setSectionSlug(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
          >
            {sections.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700">
            स्तंभ
          </label>
          <select
            name="category"
            defaultValue={rachna?.category}
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
          >
            {currentSection.categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700">रचनाकार</label>
        <input
          name="author"
          defaultValue={rachna?.author || ""}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700">सारांश</label>
        <textarea
          name="excerpt"
          rows={2}
          defaultValue={rachna?.excerpt || ""}
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700">रचना</label>
        <textarea
          name="content"
          rows={14}
          defaultValue={rachna?.content}
          required
          className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 leading-8 focus:border-pink-500 focus:outline-none"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-zinc-700">
        <input
          type="checkbox"
          name="isPublished"
          defaultChecked={rachna ? rachna.isPublished : true}
        />
        प्रकाशित करें
      </label>

      <button
        type="submit"
        className="rounded-lg bg-pink-600 px-6 py-2.5 font-semibold text-white hover:bg-pink-700"
      >
        सहेजें
      </button>
    </form>
  );
}