import { getAllDocs, getDocBySlug } from '@/lib/docs';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateStaticParams() {
  const docs = getAllDocs();
  return docs.map((doc) => ({
    slug: doc.slug,
  }));
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  return (
    <main className="min-h-screen p-8 bg-[var(--background)] text-[var(--foreground)] pb-24">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6">
          <Link href="/" className="text-blue-500 hover:text-blue-600 transition-colors">
            ← Back to Dashboard
          </Link>
        </div>

        <article className="prose dark:prose-invert max-w-none">
          <h1>{doc.title}</h1>
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              img: (props) => {
                const { src, alt, ...rest } = props;
                // Rewrite "../img/" path to API route
                let newSrc = src;
                if (typeof src === 'string') {
                  // Logic to extract project name.
                  // Current doc slug is available in `doc.slug` (e.g., ['declarative', '02-why_now'])
                  // If src is relative like './img/foo.png' inside 'declarative',
                  // we assume it belongs to the same project.

                  const project = doc.slug[0]; // First part of slug is project name

                  if (src.startsWith('./img/') || src.startsWith('img/')) {
                    const fileName = src.replace(/^\.?\/?img\//, '');
                    newSrc = `/api/images?project=${project}&file=${fileName}`;
                  } else if (src.startsWith('../img/')) {
                    // If still using .. syntax, handle it validly or ignore
                    const fileName = src.replace('../img/', '');
                    newSrc = `/api/images?project=${project}&file=${fileName}`;
                  }
                }

                return (
                  // biome-ignore lint/a11y/useAltText: Markdown images might lack alt text
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={newSrc as string}
                    alt={alt || ''}
                    {...rest}
                    className="max-w-full h-auto my-4 rounded-lg shadow-md"
                  />
                );
              },
            }}
          >
            {doc.content}
          </ReactMarkdown>
        </article>
      </div>
    </main>
  );
}
