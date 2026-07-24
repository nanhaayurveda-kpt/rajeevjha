import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h2 className="text-2xl font-bold text-amber-700">पृष्ठ नहीं मिला</h2>
      <p className="mt-2 text-zinc-600">
        जो पन्ना आप खोज रहे हैं, वह यहाँ नहीं है।
      </p>
      <Link
        href="/"
        className="mt-6 inline-block text-pink-600 hover:text-pink-800"
      >
        मुखपृष्ठ पर लौटें
      </Link>
    </div>
  );
}