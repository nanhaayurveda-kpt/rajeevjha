"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { posts } from "@/db/schema";

export async function createPost(formData) {
  const values = {
    title: formData.get("title"),
    slug: formData.get("slug"),
    section: formData.get("section"),
    category: formData.get("category"),
    author: formData.get("author"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    isPublished: formData.get("isPublished") === "on",
  };

  await db.insert(posts).values(values);

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updatePost(formData) {
  const id = formData.get("id");

  await db
    .update(posts)
    .set({
      title: formData.get("title"),
      slug: formData.get("slug"),
      section: formData.get("section"),
      category: formData.get("category"),
      author: formData.get("author"),
      excerpt: formData.get("excerpt"),
      content: formData.get("content"),
      isPublished: formData.get("isPublished") === "on",
    })
    .where(eq(posts.id, id));

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