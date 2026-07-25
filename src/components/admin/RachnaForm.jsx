"use client";

import { useState } from "react";
import { sections } from "@/lib/sections";
import { slugify } from "@/lib/slug";
import ImageUpload from "@/components/admin/ImageUpload";
import RichEditor from "@/components/admin/RichEditor";

const inputClass =
  "mt-1 w-full rounded-xl border-2 border-zinc-200 px-3 py-2 font-medium text-zinc-900 focus:border-pink-500 focus:outline-none";
const labelClass = "block text-sm font-bold text-zinc-700";

export default function RachnaForm({ action, rachna }) {
  const [sectionSlug, setSectionSlug] = useState(
    rachna?.section || sections[0].slug,
  );
  const [title, setTitle] = useState(rachna?.title || "");
  const [slug, setSlug] = useState(rachna?.slug || "");
  const [slugEdited, setSlugEdited] = useState(Boolean(rachna));

  const currentSection = sections.find((s) => s.slug === sectionSlug);

  function handleTitle(e) {
    const value = e.target.value;
    setTitle(value);
    if (!slugEdited) {
      setSlug(slugify(value));
    }
  }

  return (
    <form action={action} className="space-y-6">
      {rachna && <input type="hidden" name="id" value={rachna.id} />}

      <div>
        <label className={labelClass}>शीर्षक</label>
        <input
          name="title"
          value={title}
          onChange={handleTitle}
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>URL slug (अपने आप बनता है)</label>
        <input
          name="slug"
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugEdited(true);
          }}
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

      <div>
        <label className={labelClass}>रचनाकार</label>
        <input
          name="author"
          defaultValue={rachna?.author || ""}
          className={inputClass}
        />
      </div>

      <ImageUpload
        name="authorPhoto"
        label="रचनाकार की फोटो"
        defaultValue={rachna?.authorPhoto || ""}
      />

      <ImageUpload
        name="featuredImage"
        label="फ़ीचर्ड इमेज"
        defaultValue={rachna?.featuredImage || ""}
      />

      <ImageUpload
        name="gallery"
        label="फोटो गैलरी"
        defaultValue={rachna?.gallery || []}
        multiple
      />

      <div>
        <label className={labelClass}>YouTube वीडियो (URL)</label>
        <input
          name="youtubeUrl"
          defaultValue={rachna?.youtubeUrl || ""}
          className={inputClass}
        />
      </div>

      <RichEditor name="content" defaultValue={rachna?.content || ""} />

      <div className="flex gap-3">
        <button
          type="submit"
          name="intent"
          value="draft"
          className="rounded-xl bg-zinc-200 px-8 py-3 font-bold text-zinc-800 hover:bg-zinc-300"
        >
          सहेजें (मसौदा)
        </button>
        <button
          type="submit"
          name="intent"
          value="publish"
          className="rounded-xl bg-pink-600 px-8 py-3 font-bold text-white shadow-lg shadow-pink-600/30 hover:bg-pink-700"
        >
          प्रकाशित करें
        </button>
      </div>
    </form>
  );
}
