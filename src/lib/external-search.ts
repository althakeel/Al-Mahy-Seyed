import { Locale } from '@/lib/translations';
import { externalSearchResultId, SearchResult } from '@/lib/search-index';

interface ExternalArticle {
  title: string;
  summary: string;
  url: string;
  source: string;
}

const DEFAULT_WEB_SOURCE_URLS = [
  'https://www.khaleejtimes.com/uae/legal',
  'https://www.khaleejtimes.com/',
];

const CACHE_TTL_MS = 15 * 60 * 1000;
let articleCache: { articles: ExternalArticle[]; expiresAt: number } | null = null;

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

const decodeHtml = (value: string) =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

const stripHtml = (input: string) => input.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const getSourceName = (url: string): string => {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    if (host.includes('khaleejtimes')) return 'Khaleej Times';
    if (host.includes('gulfnews')) return 'Gulf News';
    if (host.includes('government.ae')) return 'UAE Government';
    return host;
  } catch {
    return 'Web';
  }
};

const parseAnchorArticles = (html: string, pageUrl: string): ExternalArticle[] => {
  const articles: ExternalArticle[] = [];
  const seen = new Set<string>();
  const base = new URL(pageUrl);
  const anchorPattern = /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match: RegExpExecArray | null;

  while ((match = anchorPattern.exec(html)) !== null) {
    const href = match[1]?.trim();
    const linkText = stripHtml(decodeHtml(match[2] || ''));
    if (!href || !linkText || linkText.length < 12) continue;

    let fullUrl: string;
    try {
      fullUrl = new URL(href, base.origin).toString();
    } catch {
      continue;
    }

    if (!fullUrl.startsWith('http') || seen.has(fullUrl)) continue;
    if (!fullUrl.includes(base.hostname.replace(/^www\./, ''))) continue;

    const isLegal =
      /legal|law|court|regulation|tax|vat|compliance|visa|business/i.test(fullUrl) ||
      /legal|law|court|regulation|tax|vat|compliance|visa|business/i.test(linkText);

    if (!isLegal) continue;

    seen.add(fullUrl);
    articles.push({
      title: linkText.slice(0, 180),
      summary: linkText,
      url: fullUrl,
      source: getSourceName(fullUrl),
    });
  }

  return articles;
};

const parseRssItems = (xml: string, feedUrl: string): ExternalArticle[] => {
  const items: ExternalArticle[] = [];
  const itemPattern = /<item>([\s\S]*?)<\/item>/gi;
  let match: RegExpExecArray | null;

  while ((match = itemPattern.exec(xml)) !== null) {
    const block = match[1];
    const title = stripHtml(decodeHtml(block.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i)?.[1] || ''));
    const link = block.match(/<link>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i)?.[1]?.trim() || '';
    const description = stripHtml(
      decodeHtml(block.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i)?.[1] || '')
    );

    if (!title || !link.startsWith('http')) continue;

    items.push({
      title: title.slice(0, 180),
      summary: description.slice(0, 220) || title,
      url: link,
      source: getSourceName(link) || getSourceName(feedUrl),
    });
  }

  return items;
};

const fetchWebArticles = async (url: string): Promise<ExternalArticle[]> => {
  try {
    const response = await fetch(url, {
      cache: 'no-store',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AlmahyBot/1.0; +https://almahy.com)',
        Accept: 'text/html,application/xhtml+xml',
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) return [];
    const html = await response.text();
    return parseAnchorArticles(html, url);
  } catch {
    return [];
  }
};

const fetchRssArticles = async (url: string): Promise<ExternalArticle[]> => {
  try {
    const response = await fetch(url, {
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return [];
    return parseRssItems(await response.text(), url);
  } catch {
    return [];
  }
};

const loadExternalArticles = async (): Promise<ExternalArticle[]> => {
  if (articleCache && articleCache.expiresAt > Date.now()) {
    return articleCache.articles;
  }

  const rawWebUrls = process.env.THIRD_PARTY_BLOG_WEB_URLS || '';
  const configuredWebUrls = rawWebUrls
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  const webUrls = Array.from(new Set([...DEFAULT_WEB_SOURCE_URLS, ...configuredWebUrls]));

  const rawRssUrls = process.env.THIRD_PARTY_BLOG_RSS_URLS || '';
  const rssUrls = rawRssUrls
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  const [webLists, rssLists] = await Promise.all([
    Promise.all(webUrls.map(fetchWebArticles)),
    Promise.all(rssUrls.map(fetchRssArticles)),
  ]);

  const deduped = new Map<string, ExternalArticle>();
  for (const article of [...webLists.flat(), ...rssLists.flat()]) {
    const key = article.url.toLowerCase();
    if (!deduped.has(key)) deduped.set(key, article);
  }

  const articles = Array.from(deduped.values());
  articleCache = { articles, expiresAt: Date.now() + CACHE_TTL_MS };
  return articles;
};

const scoreArticle = (query: string, article: ExternalArticle): number => {
  const q = normalize(query);
  if (!q) return 0;

  let score = 0;
  const fields = [article.title, article.summary, article.url];
  for (const field of fields) {
    const normalized = normalize(field);
    if (!normalized) continue;
    if (normalized.includes(q)) score += 35;
    const tokens = q.split(/\s+/).filter((t) => t.length >= 2);
    for (const token of tokens) {
      if (normalized.includes(token)) score += 10;
    }
  }
  return score;
};

export const searchExternalArticles = async (query: string, locale: Locale, limit = 8): Promise<SearchResult[]> => {
  const trimmed = query.trim();
  if (!trimmed) return [];

  try {
    const articles = await loadExternalArticles();
    const results: SearchResult[] = [];

    for (const article of articles) {
      const score = scoreArticle(trimmed, article);
      if (score <= 0) continue;

      results.push({
        id: externalSearchResultId(article.url),
        type: 'external',
        title: article.title,
        description:
          locale === 'ar'
            ? `${article.summary} — مصدر: ${article.source}`
            : `${article.summary} — Source: ${article.source}`,
        href: article.url,
        score,
        isExternal: true,
        source: article.source,
      });
    }

    return results.sort((a, b) => b.score - a.score).slice(0, limit);
  } catch (error) {
    console.error('External article search failed:', error);
    return [];
  }
};
