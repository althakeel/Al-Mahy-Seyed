import { NextResponse } from 'next/server';
import { listRecentBlogSummariesFromMongo } from '@/lib/blogs-server';

const PUBLIC_CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const excludeSlug = searchParams.get('exclude')?.trim() || undefined;
    const limit = Math.min(Math.max(Number(searchParams.get('limit') || 4), 1), 12);
    const blogs = await listRecentBlogSummariesFromMongo(excludeSlug, limit);

    return NextResponse.json({ success: true, blogs }, { headers: PUBLIC_CACHE_HEADERS });
  } catch (error) {
    console.error('Recent blogs GET error:', error);
    return NextResponse.json({ success: false, message: 'Failed to load recent blogs.' }, { status: 500 });
  }
}
