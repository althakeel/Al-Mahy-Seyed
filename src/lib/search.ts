import { BlogPost, getBlogLocalizedField } from '@/lib/blogs';
import { listBlogSummariesFromMongo } from '@/lib/blogs-server';
import { searchExternalArticles } from '@/lib/external-search';
import { searchGoogleWeb } from '@/lib/serpapi-search';
import { Locale } from '@/lib/translations';
import { SearchResult, searchStaticContent } from '@/lib/search-index';

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

const scoreBlogMatch = (query: string, blog: BlogPost, locale: Locale): number => {
  const title = getBlogLocalizedField(blog, 'title', locale);
  const description = getBlogLocalizedField(blog, 'shortDescription', locale);
  const content = getBlogLocalizedField(blog, 'content', locale);

  const q = normalize(query);
  if (!q) return 0;

  let score = 0;
  const fields = [title, description, content.slice(0, 500), blog.title, blog.titleAr ?? ''];
  for (const field of fields) {
    const normalized = normalize(field);
    if (!normalized) continue;
    if (normalized.includes(q)) score += 25;
    const tokens = q.split(/\s+/).filter((t) => t.length >= 2);
    for (const token of tokens) {
      if (normalized.includes(token)) score += 8;
    }
  }
  return score;
};

const searchBlogs = (query: string, locale: Locale, blogs: BlogPost[]): SearchResult[] => {
  const results: SearchResult[] = [];

  for (const blog of blogs) {
    const score = scoreBlogMatch(query, blog, locale);
    if (score <= 0) continue;

    const title = getBlogLocalizedField(blog, 'title', locale);
    const description = getBlogLocalizedField(blog, 'shortDescription', locale);

    results.push({
      id: `blog-${blog.id}`,
      type: 'blog',
      title,
      description,
      href: `/${locale}/blogs/${encodeURIComponent(blog.slug)}`,
      score,
    });
  }

  return results;
};

export const searchSite = async (
  query: string,
  locale: Locale,
  limit = 20
): Promise<SearchResult[]> => {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const staticResults = searchStaticContent(trimmed, locale);

  let blogResults: SearchResult[] = [];
  let externalResults: SearchResult[] = [];
  let googleResults: SearchResult[] = [];

  try {
    const [blogs, external, google] = await Promise.all([
      listBlogSummariesFromMongo(),
      searchExternalArticles(trimmed, locale, 6),
      searchGoogleWeb(trimmed, locale, 10),
    ]);
    blogResults = searchBlogs(trimmed, locale, blogs);
    externalResults = external;
    googleResults = google;
  } catch {
    blogResults = [];
    externalResults = [];
    googleResults = [];
  }

  const merged = new Map<string, SearchResult>();
  for (const result of [...staticResults, ...blogResults, ...googleResults, ...externalResults]) {
    const existing = merged.get(result.href);
    if (!existing || result.score > existing.score) {
      merged.set(result.href, result);
    }
  }

  return Array.from(merged.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};
