"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { posts } from "@/db/schema";

function readForm(formData) {
  const galleryText = formData.get("gallery") || "";
  const gallery = galleryText
    .split("\n")
    .map((url) => url.trim())
    .filter((url) => url.length > 0);

  return {
    title: formData.get("title"),
    slug: formData.get("slug"),
    section: formData.get("section"),
    category: formData.get("category"),
    author: formData.get("author"),
    authorPhoto: formData.get("authorPhoto"),
    featuredImage: formData.get("featuredImage"),
    youtubeUrl: formData.get("youtubeUrl"),
    gallery,
    content: formData.get("content"),
    isPublished: formData.get("intent") === "publish",
  };
}

export async function createPost(formData) {
  await db.insert(posts).values(readForm(formData));

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updatePost(formData) {
  const id = formData.get("id");

  await db.update(posts).set(readForm(formData)).where(eq(posts.id, id));

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deletePost(formData) {
  const id = formData.get("id");

  await db.delete(posts).where(eq(posts.id, id));

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function togglePublish(formData) {
  const id = formData.get("id");
  const current = formData.get("current") === "true";

  await db.update(posts).set({ isPublished: !current }).where(eq(posts.id, id));

  revalidatePath("/");
  revalidatePath("/admin");
}
