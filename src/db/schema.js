import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const posts = sqliteTable("posts", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  section: text("section").notNull(),
  category: text("category").notNull(),
  author: text("author"),
  authorPhoto: text("author_photo"),
  featuredImage: text("featured_image"),
  gallery: text("gallery", { mode: "json" }).default([]),
  youtubeUrl: text("youtube_url"),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  isPublished: integer("is_published", { mode: "boolean" })
    .notNull()
    .default(true),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});