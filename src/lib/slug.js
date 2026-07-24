import { slugify as transliterateSlug } from "transliteration";

export function slugify(text) {
  return transliterateSlug(String(text || ""), {
    lowercase: true,
    separator: "-",
  });
}