import { getAllDocs } from "@/lib/docs";
import Link from "next/link";

export default function Home() {
  const docs = getAllDocs();

  return (
    <main className="min-h-screen p-8 bg-[var(--background)] text-[var(--foreground)]">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-[var(--primary)] border-b pb-4">
          Documentation Dashboard
        </h1>

        <div className="grid gap-4">
          {docs.length === 0 ? (
            <p className="text-gray-500">No documents found.</p>
          ) : (
            docs.map((doc) => (
              <Link
                key={doc.slug.join("/")}
                href={`/docs/${doc.slug.join("/")}`}
                className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-xl font-semibold mb-2">{doc.title}</h2>
                <div className="flex items-center text-sm text-gray-500 gap-4">
                  <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {doc.slug.join(" / ")}
                  </span>
                  {doc.date && <span>{doc.date}</span>}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
