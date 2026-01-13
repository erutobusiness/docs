import fs from 'node:fs';
import path from 'node:path';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const project = searchParams.get('project');
  const fileName = searchParams.get('file');

  if (!project || !fileName) {
    return new NextResponse('Project or File parameter is missing', { status: 400 });
  }

  // Security: Prevent directory traversal
  if (
    project.includes('..') ||
    project.includes('/') ||
    project.includes('\\') ||
    fileName.includes('..') ||
    fileName.includes('/') ||
    fileName.includes('\\')
  ) {
    return new NextResponse('Invalid parameters', { status: 400 });
  }

  const postsDir = path.join(process.cwd(), 'md');
  // Check if image is in project/img/
  const imagePath = path.join(postsDir, project, 'img', fileName);

  if (!fs.existsSync(imagePath)) {
    return new NextResponse('File not found', { status: 404 });
  }
  // ...
  try {
    const fileBuffer = fs.readFileSync(imagePath);
    const ext = path.extname(imagePath).toLowerCase().replace('.', '');

    // Basic MIME type mapping
    const mimeTypes: { [key: string]: string } = {
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      gif: 'image/gif',
      svg: 'image/svg+xml',
      webp: 'image/webp',
    };

    const contentType = mimeTypes[ext] || 'application/octet-stream';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error reading image file:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
