import { NextResponse } from 'next/server';
import { BlogPost } from '@/lib/blogs';
import {
  listBlogSummariesFromMongo,
  listBlogsFromMongo,
  normalizeBlogPost,
  saveBlogToMongo,
} from '@/lib/blogs-server';

const PUBLIC_CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
};

const getDevelopmentFallbackUrl = () => {
  if (process.env.NODE_ENV !== 'development') return null;
  return process.env.BLOGS_FALLBACK_API_URL?.trim() || null;
};

const loadDevelopmentFallbackBlogs = async (): Promise<BlogPost[] | null> => {
  const fallbackUrl = getDevelopmentFallbackUrl();
  if (!fallbackUrl) return null;

  try {
    const response = await fetch(fallbackUrl, { cache: 'no-store' });
    const result = (await response.json()) as { success?: boolean; blogs?: BlogPost[] };
    return response.ok && result.success && Array.isArray(result.blogs)
      ? result.blogs.map(normalizeBlogPost)
      : null;
  } catch (error) {
    console.error('Development blogs fallback failed:', error);
    return null;
  }
};

const saveBlogViaDevelopmentFallback = async (
  blog: BlogPost,
  updatedBy?: string
): Promise<BlogPost | null> => {
  const fallbackUrl = getDevelopmentFallbackUrl();
  if (!fallbackUrl) return null;

  try {
    const response = await fetch(fallbackUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blog, updatedBy }),
      cache: 'no-store',
    });
    const result = (await response.json()) as { success?: boolean; blog?: BlogPost };
    return response.ok && result.success && result.blog ? result.blog : null;
  } catch (error) {
    console.error('Development blogs save fallback failed:', error);
    return null;
  }
};

export async function GET(request: Request) {
  try {
    const includeFullContent = new URL(request.url).searchParams.get('full') === '1';
    const blogs = includeFullContent ? await listBlogsFromMongo() : await listBlogSummariesFromMongo();
    return NextResponse.json(
      { success: true, blogs },
      includeFullContent ? undefined : { headers: PUBLIC_CACHE_HEADERS },
    );
  } catch (error) {
    console.error('Blogs GET error:', error);
    const fallbackBlogs = await loadDevelopmentFallbackBlogs();
    if (fallbackBlogs) {
      return NextResponse.json({ success: true, blogs: fallbackBlogs });
    }
    return NextResponse.json({ success: false, message: 'Failed to load blogs.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json() as { blog?: BlogPost; updatedBy?: string };

    if (!payload.blog) {
      return NextResponse.json({ success: false, message: 'Blog payload is required.' }, { status: 400 });
    }

    try {
      const blog = await saveBlogToMongo(payload.blog, payload.updatedBy);
      return NextResponse.json({ success: true, blog });
    } catch (mongoError) {
      console.error('Blogs POST error:', mongoError);
      const fallbackBlog = await saveBlogViaDevelopmentFallback(payload.blog, payload.updatedBy);
      if (fallbackBlog) {
        return NextResponse.json({ success: true, blog: fallbackBlog });
      }
      return NextResponse.json(
        {
          success: false,
          message:
            'Failed to save blog. Local MongoDB DNS lookup is blocked; also could not reach the development fallback API.',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Blogs POST error:', error);
    return NextResponse.json({ success: false, message: 'Failed to save blog.' }, { status: 500 });
  }
}
