"use client";

import { useState } from "react";

export default function RichEditor({ name, defaultValue = "" }) {
  const [value, setValue] = useState(defaultValue);

  return (
    <div>
      <label className="block text-sm font-bold text-zinc-700">रचना</label>
      <textarea
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        rows={16}
        className="mt-1 w-full rounded-xl border-2 border-zinc-200 px-4 py-3 text-lg leading-8 text-zinc-900 focus:border-pink-500 focus:outline-none"
      />
    </div>
  );
}