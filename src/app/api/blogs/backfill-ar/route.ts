import { NextResponse } from 'next/server';
import { backfillBlogArabicIfNeeded, listBlogsFromMongo } from '@/lib/blogs-server';
import { blogNeedsArabicBackfill } from '@/lib/blog-arabic-backfill';

const hasValidAutomationToken = (request: Request): boolean => {
  const configuredSecret = process.env.BLOGS_AUTOMATION_SECRET || process.env.CRON_SECRET;

  if (!configuredSecret) {
    return process.env.NODE_ENV !== 'production';
  }

  const authHeader = request.headers.get('authorization') || '';
  return authHeader === `Bearer ${configuredSecret}`;
};

export async function POST(request: Request) {
  if (!hasValidAutomationToken(request)) {
    return NextResponse.json({ success: false, message: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const blogs = await listBlogsFromMongo();
    const blogsToBackfill = blogs.filter(blogNeedsArabicBackfill);
    const updated: string[] = [];
    const skipped: string[] = [];

    for (const blog of blogsToBackfill) {
      try {
        const saved = await backfillBlogArabicIfNeeded(blog);
        if (!blogNeedsArabicBackfill(saved)) {
          updated.push(blog.slug);
        } else {
          skipped.push(blog.slug);
        }
      } catch (error) {
        console.error(`Failed to backfill blog "${blog.slug}":`, error);
        skipped.push(blog.slug);
      }
    }

    return NextResponse.json({
      success: true,
      total: blogs.length,
      attempted: blogsToBackfill.length,
      updated,
      skipped,
    });
  } catch (error) {
    console.error('Arabic blog backfill error:', error);
    return NextResponse.json({ success: false, message: 'Failed to backfill Arabic blog content.' }, { status: 500 });
  }
}
