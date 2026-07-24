"use client";

import { useState } from "react";
import { sections } from "@/lib/sections";

const inputClass =
  "mt-1 w-full rounded-xl border-2 border-zinc-200 px-3 py-2 font-medium text-zinc-900 focus:border-pink-500 focus:outline-none";
const labelClass = "block text-sm font-bold text-zinc-700";

export default function RachnaForm({ action, rachna }) {
  const [sectionSlug, setSectionSlug] = useState(
    rachna?.section || sections[0].slug,
  );

  const currentSection = sections.find((s) => s.slug === sectionSlug);

  return (
    <form action={action} className="space-y-6">
      {rachna && <input type="hidden" name="id" value={rachna.id} />}

      <div>
        <label className={labelClass}>शीर्षक</label>
        <input
          name="title"
          defaultValue={rachna?.title}
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>URL slug (रोमन में)</label>
        <input
          name="slug"
          defaultValue={rachna?.slug}
          required
          className={inputClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>खंड</label>
          <select
            name="section"
            value={sectionSlug}
            onChange={(e) => setSectionSlug(e.target.value)}
            className={inputClass}
          >
            {sections.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>स्तंभ</label>
          <select
            name="category"
            defaultValue={rachna?.category}
            className={inputClass}
          >
            {currentSection.categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>रचनाकार</label>
          <input
            name="author"
            defaultValue={rachna?.author || ""}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>रचनाकार की फोटो (URL)</label>
          <input
            name="authorPhoto"
            defaultValue={rachna?.authorPhoto || ""}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>फ़ीचर्ड इमेज (URL)</label>
        <input
          name="featuredImage"
          defaultValue={rachna?.featuredImage || ""}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>YouTube वीडियो (URL)</label>
        <input
          name="youtubeUrl"
          defaultValue={rachna?.youtubeUrl || ""}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>
          फोटो गैलरी — हर URL अलग पंक्ति में
        </label>
        <textarea
          name="gallery"
          rows={4}
          defaultValue={rachna?.gallery ? rachna.gallery.join("\n") : ""}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>रचना</label>
        <textarea
          name="content"
          rows={16}
          defaultValue={rachna?.content}
          required
          className={`${inputClass} leading-8`}
        />
      </div>

      <label className="flex items-center gap-2 text-sm font-bold text-zinc-700">
        <input
          type="checkbox"
          name="isPublished"
          defaultChecked={rachna ? rachna.isPublished : true}
          className="h-4 w-4"
        />
        प्रकाशित करें
      </label>

      <button
        type="submit"
        className="rounded-xl bg-pink-600 px-8 py-3 font-bold text-white shadow-lg shadow-pink-600/30 hover:bg-pink-700"
      >
        सहेजें
      </button>
    </form>
  );
}