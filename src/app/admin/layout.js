import Link from "next/link";
import { getSession } from "@/lib/auth";
import { logout } from "@/lib/auth-actions";

export const metadata = {
  title: "डैशबोर्ड — साहित्य सृजन व संवाद",
};

export default async function AdminLayout({ children }) {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-zinc-100">
      <div className="mx-auto flex max-w-6xl gap-6 px-4 py-8">
        <aside className="hidden w-56 shrink-0 md:block">
          <div className="rounded-2xl bg-zinc-900 p-5">
            <p className="text-lg font-black text-amber-600">डैशबोर्ड</p>
            <p className="mt-1 text-xs text-zinc-400">साहित्य सृजन व संवाद</p>

            <nav className="mt-6 flex flex-col gap-1 text-sm font-bold">
              <Link
                href="/admin"
                className="rounded-lg px-3 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-pink-400"
              >
                सभी रचनाएँ
              </Link>
              <Link
                href="/admin/nayi-rachna"
                className="rounded-lg px-3 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-pink-400"
              >
                नई रचना
              </Link>
              <Link
                href="/"
                className="rounded-lg px-3 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-pink-400"
              >
                पोर्टल देखें
              </Link>
            </nav>

            {session && (
              <div className="mt-8 border-t border-zinc-700 pt-4">
                <p className="truncate text-xs text-zinc-400">
                  {session.email}
                </p>
                <form action={logout}>
                  <button
                    type="submit"
                    className="mt-2 text-xs font-bold text-pink-400 hover:text-pink-300"
                  >
                    लॉगआउट
                  </button>
                </form>
              </div>
            )}
          </div>
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}