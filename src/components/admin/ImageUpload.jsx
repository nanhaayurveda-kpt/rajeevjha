"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageUpload({ name, label, defaultValue = "", multiple = false }) {
  const [urls, setUrls] = useState(
    multiple ? defaultValue || [] : defaultValue ? [defaultValue] : [],
  );
  const [loading, setLoading] = useState(false);

  async function uploadOne(file) {
    const form = new FormData();
    form.append("file", file);
    form.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    );

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: form },
    );

    const data = await res.json();
    return data.secure_url;
  }

  async function handleChange(e) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setLoading(true);
    try {
      const uploaded = [];
      for (const file of files) {
        const url = await uploadOne(file);
        if (url) uploaded.push(url);
      }
      setUrls(multiple ? [...urls, ...uploaded] : uploaded.slice(0, 1));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <label className="block text-sm font-bold text-zinc-700">{label}</label>

      <input
        type="hidden"
        name={name}
        value={multiple ? urls.join("\n") : urls[0] || ""}
      />

      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleChange}
        className="mt-1 block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-pink-600 file:px-4 file:py-2 file:font-bold file:text-white hover:file:bg-pink-700"
      />

      {loading && (
        <p className="mt-2 text-xs font-bold text-pink-600">अपलोड हो रहा है…</p>
      )}

      {urls.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {urls.map((url) => (
            <div key={url} className="relative">
              <Image
                src={url}
                alt=""
                width={80}
                height={80}
                className="h-20 w-20 rounded-lg border-2 border-zinc-200 object-cover"
              />
              <button
                type="button"
                onClick={() => setUrls(urls.filter((u) => u !== url))}
                className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-red-600 text-xs font-bold text-white"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}