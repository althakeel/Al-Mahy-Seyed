import { Locale } from '@/lib/translations';
import { externalSearchResultId, SearchResult } from '@/lib/search-index';

const SERPAPI_BASE = 'https://serpapi.com/search.json';
const CACHE_TTL_MS = 10 * 60 * 1000;

interface SerpApiOrganicResult {
  position?: number;
  title?: string;
  link?: string;
  snippet?: string;
  displayed_link?: string;
  source?: string;
}

interface SerpApiRelatedQuestion {
  question?: string;
  title?: string;
  link?: string;
  snippet?: string;
  displayed_link?: string;
}

interface SerpApiResponse {
  organic_results?: SerpApiOrganicResult[];
  related_questions?: SerpApiRelatedQuestion[];
  error?: string;
}

const cache = new Map<string, { results: SearchResult[]; expiresAt: number }>();

const getSourceName = (url: string, fallback?: string): string => {
  if (fallback?.trim()) return fallback.trim();
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return 'Google';
  }
};

const buildSearchQuery = (query: string, locale: Locale): string => {
  const trimmed = query.trim();
  const hasLegalContext =
    /uae|dubai|emirates|legal|law|court|visa|tax|company|قانون|الإمارات|دبي|محكمة|ضريبة/i.test(trimmed);

  if (hasLegalContext) return trimmed;
  return locale === 'ar' ? `${trimmed} الإمارات قانون` : `${trimmed} UAE legal`;
};

const organicToResult = (item: SerpApiOrganicResult, locale: Locale): SearchResult | null => {
  const href = item.link?.trim();
  const title = item.title?.trim();
  if (!href?.startsWith('http') || !title) return null;

  const position = item.position ?? 10;
  const source = getSourceName(href, item.source || item.displayed_link);

  return {
    id: externalSearchResultId(href, `google-${position}`),
    type: 'external',
    title,
    description:
      item.snippet?.trim() ||
      (locale === 'ar' ? `نتيجة من Google — ${source}` : `Google search result — ${source}`),
    href,
    score: Math.max(20, 110 - position * 10),
    isExternal: true,
    source: source === 'Google' ? 'Google' : source,
  };
};

const relatedToResult = (item: SerpApiRelatedQuestion, index: number, locale: Locale): SearchResult | null => {
  const href = item.link?.trim();
  const title = item.question?.trim() || item.title?.trim();
  if (!href?.startsWith('http') || !title) return null;

  return {
    id: externalSearchResultId(href, `google-rq-${index}`),
    type: 'external',
    title,
    description:
      item.snippet?.trim() ||
      (locale === 'ar' ? 'سؤال ذو صلة من Google' : 'Related question from Google'),
    href,
    score: 45 - index * 3,
    isExternal: true,
    source: getSourceName(href, item.displayed_link),
  };
};

export const searchGoogleWeb = async (
  query: string,
  locale: Locale,
  limit = 10
): Promise<SearchResult[]> => {
  // Support the original variable name while standardising on SERPAPI_API_KEY.
  const apiKey = (process.env.SERPAPI_API_KEY || process.env.SERPAPI_KEY)?.trim();
  if (!apiKey || !query.trim()) return [];

  const searchQuery = buildSearchQuery(query, locale);
  const location = process.env.SERPAPI_LOCATION?.trim() || 'Dubai, United Arab Emirates';
  const googleDomain = process.env.SERPAPI_GOOGLE_DOMAIN?.trim() || 'google.ae';
  const hl = locale === 'ar' ? 'ar' : 'en';
  const gl = 'ae';

  const cacheKey = `${locale}:${searchQuery}:${location}`;
  const cached = cache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.results.slice(0, limit);
  }

  try {
    const params = new URLSearchParams({
      engine: 'google',
      q: searchQuery,
      api_key: apiKey,
      location,
      google_domain: googleDomain,
      gl,
      hl,
      num: String(Math.min(limit + 4, 15)),
    });

    const response = await fetch(`${SERPAPI_BASE}?${params.toString()}`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(12000),
    });

    if (!response.ok) {
      console.error('SerpAPI error:', await response.text());
      return [];
    }

    const data = (await response.json()) as SerpApiResponse;
    if (data.error) {
      console.error('SerpAPI response error:', data.error);
      return [];
    }

    const seen = new Set<string>();
    const results: SearchResult[] = [];

    for (const item of data.organic_results ?? []) {
      const result = organicToResult(item, locale);
      if (!result || seen.has(result.href)) continue;
      seen.add(result.href);
      results.push(result);
    }

    for (const [index, item] of (data.related_questions ?? []).entries()) {
      const result = relatedToResult(item, index, locale);
      if (!result || seen.has(result.href)) continue;
      seen.add(result.href);
      results.push(result);
    }

    const sorted = results.sort((a, b) => b.score - a.score);
    cache.set(cacheKey, { results: sorted, expiresAt: Date.now() + CACHE_TTL_MS });
    return sorted.slice(0, limit);
  } catch (error) {
    console.error('SerpAPI search failed:', error);
    return [];
  }
};
