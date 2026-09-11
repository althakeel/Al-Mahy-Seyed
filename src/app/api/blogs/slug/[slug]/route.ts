import { NextResponse } from 'next/server';
import { BlogPost } from '@/lib/blogs';
import { getBlogBySlugFromMongo, normalizeBlogPost } from '@/lib/blogs-server';

const loadDevelopmentFallbackBlog = async (slug: string): Promise<BlogPost | null> => {
  if (process.env.NODE_ENV !== 'development') return null;

  const fallbackUrl = process.env.BLOGS_FALLBACK_API_URL?.trim();
  if (!fallbackUrl) return null;

  try {
    const response = await fetch(fallbackUrl, { cache: 'no-store' });
    const result = (await response.json()) as { success?: boolean; blogs?: BlogPost[] };
    if (!response.ok || !result.success || !Array.isArray(result.blogs)) return null;

    const blog = result.blogs.find((item) => item.slug === slug);
    return blog ? normalizeBlogPost(blog) : null;
  } catch (error) {
    console.error('Development blog fallback failed:', error);
    return null;
  }
};

export async function GET(_: Request, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await context.params;
    const decodedSlug = decodeURIComponent(slug);
    const blog = await getBlogBySlugFromMongo(decodedSlug);

    if (!blog) {
      return NextResponse.json({ success: false, message: 'Blog not found.' }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, blog },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      },
    );
  } catch (error) {
    console.error('Blog by slug GET error:', error);
    const { slug } = await context.params;
    const fallbackBlog = await loadDevelopmentFallbackBlog(decodeURIComponent(slug));
    if (fallbackBlog) {
      return NextResponse.json({ success: true, blog: fallbackBlog });
    }
    return NextResponse.json({ success: false, message: 'Failed to load blog.' }, { status: 500 });
  }
}
