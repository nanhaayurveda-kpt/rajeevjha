"use client";

import { useRef, useState } from "react";

const colors = ["#000000", "#b91c1c", "#7e22ce", "#1d4ed8", "#15803d"];

export default function RichEditor({ name, defaultValue = "" }) {
  const ref = useRef(null);
  const [html, setHtml] = useState(defaultValue);

  function run(command, value) {
    document.execCommand(command, false, value);
    if (ref.current) {
      setHtml(ref.current.innerHTML);
    }
  }

  const btn =
    "rounded-lg border-2 border-zinc-200 px-3 py-1 text-sm font-bold hover:bg-zinc-100";

  return (
    <div>
      <label className="block text-sm font-bold text-zinc-700">रचना</label>

      <input type="hidden" name={name} value={html} />

      <div className="mt-1 flex flex-wrap items-center gap-2 rounded-t-xl border-2 border-b-0 border-zinc-200 bg-zinc-50 p-2">
        <button type="button" onClick={() => run("bold")} className={`${btn} font-black`}>
          B
        </button>
        <button type="button" onClick={() => run("italic")} className={`${btn} italic`}>
          I
        </button>
        <button type="button" onClick={() => run("underline")} className={`${btn} underline`}>
          U
        </button>
        <button type="button" onClick={() => run("formatBlock", "<h2>")} className={btn}>
          शीर्षक
        </button>
        <button type="button" onClick={() => run("insertUnorderedList")} className={btn}>
          सूची
        </button>

        {colors.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => run("foreColor", c)}
            style={{ backgroundColor: c }}
            className="h-7 w-7 rounded-full border-2 border-white shadow"
          />
        ))}
      </div>

      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={() => setHtml(ref.current.innerHTML)}
        dangerouslySetInnerHTML={{ __html: defaultValue }}
        className="min-h-64 rounded-b-xl border-2 border-zinc-200 p-4 text-lg leading-8 focus:border-pink-500 focus:outline-none"
      />
    </div>
  );
}