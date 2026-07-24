import { createPost } from "@/lib/actions";
import RachnaForm from "@/components/admin/RachnaForm";

export default function NayiRachnaPage() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-zinc-900">नई रचना</h1>
      <div className="mt-6">
        <RachnaForm action={createPost} />
      </div>
    </div>
  );
}