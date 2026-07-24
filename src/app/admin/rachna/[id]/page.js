import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { posts } from "@/db/schema";
import { updatePost } from "@/lib/actions";
import RachnaForm from "@/components/admin/RachnaForm";

export default async function EditRachnaPage({ params }) {
  const { id } = await params;

  const rows = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  const rachna = rows[0];

  if (!rachna) {
    notFound();
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-zinc-900">रचना संपादन</h1>
      <div className="mt-6">
        <RachnaForm action={updatePost} rachna={rachna} />
      </div>
    </div>
  );
}