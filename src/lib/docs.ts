import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'md');

export interface Doc {
  slug: string[];
  title: string;
  date?: string;
  content: string;
  // biome-ignore lint/suspicious/noExplicitAny: Frontmatter data is dynamic
  [key: string]: any;
}

export function getAllDocs(): Doc[] {
  // Check if posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = getFilesRecursively(postsDirectory);
  const allDocsData = fileNames.map((fileName) => {
    // Remove "posts" from path to get slug
    const relativePath = path.relative(postsDirectory, fileName);
    const slug = relativePath.replace(/\.md$/, '').split(path.sep);

    // Read markdown file as string
    const fileContents = fs.readFileSync(fileName, 'utf8');

    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      title: data.title || slug[slug.length - 1],
      ...data,
    };
  });

  return allDocsData;
}

export function getDocBySlug(slug: string[]): Doc | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug.join('/')}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      title: data.title || slug[slug.length - 1],
      ...data,
    };
  } catch (_err) {
    return null;
  }
}

function getFilesRecursively(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);

  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat?.isDirectory()) {
      /* Recurse into a subdirectory */
      results = results.concat(getFilesRecursively(filePath));
    } else {
      /* Is a file */
      if (filePath.endsWith('.md')) {
        results.push(filePath);
      }
    }
  }
  return results;
}
