import { Locale } from '@/lib/translations';

const stripHtml = (value: string): string =>
  value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const PLACEHOLDER_ARABIC_PATTERNS = [
  /^-?\s*list\s*item\.?$/i,
  /^placeholder$/i,
  /^n\/a$/i,
  /^-$/,
];

const isPlaceholderOnlyText = (plain: string): boolean => {
  if (!plain) return true;
  if (PLACEHOLDER_ARABIC_PATTERNS.some((pattern) => pattern.test(plain))) return true;

  const withoutListItems = plain.replace(/-?\s*list\s*item\.?/gi, ' ').replace(/\s+/g, ' ').trim();
  return !withoutListItems;
};

export const hasMeaningfulLocalizedText = (value?: string | null): value is string => {
  if (!value?.trim()) return false;
  const plain = stripHtml(value);
  if (!plain) return false;
  return !isPlaceholderOnlyText(plain);
};

const excerptPlainText = (value: string, maxLen = 220): string => {
  const plain = stripHtml(value).replace(/\s+/g, ' ').trim();
  if (!plain) return '';
  if (plain.length <= maxLen) return plain;
  return `${plain.slice(0, maxLen).trim()}...`;
};

export const getBlogLocalizedField = (
  blog: BlogPost,
  field: 'title' | 'shortDescription' | 'content',
  lang: Locale,
): string => {
  const englishValue = blog[field]?.trim() || '';
  if (lang !== 'ar') return englishValue;

  const arabicKey = `${field}Ar` as const;
  const arabicValue = blog[arabicKey]?.trim();
  if (hasMeaningfulLocalizedText(arabicValue)) return arabicValue;

  if (field === 'shortDescription' && hasMeaningfulLocalizedText(blog.contentAr)) {
    return excerptPlainText(blog.contentAr);
  }

  if (field === 'content' && hasMeaningfulLocalizedText(blog.contentAr)) {
    return blog.contentAr.trim();
  }

  return englishValue;
};

export const getBlogLocalizedImage = (blog: BlogPost, lang: Locale): string => {
  if (lang === 'ar' && blog.imageAr?.trim()) return blog.imageAr.trim();
  return blog.image.trim();
};

export const isBlogFieldAvailableInArabic = (
  blog: BlogPost,
  field: 'title' | 'shortDescription' | 'content',
): boolean => {
  const arabicKey = `${field}Ar` as const;
  return hasMeaningfulLocalizedText(blog[arabicKey]);
};

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleAr?: string;
  shortDescription: string;
  shortDescriptionAr?: string;
  content: string;
  contentAr?: string;
  date: string;
  image: string;
  imageAr?: string;
  bannerImage?: string;
  bannerImageAr?: string;
  createdAt: number;
}

export interface BlogsBannerCard {
  titleEn: string;
  titleAr: string;
  subEn: string;
  subAr: string;
}

export interface BlogsPageBannerConfig {
  bannerUrl: string;
  card: BlogsBannerCard;
}

export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const loadBlogsFromServer = async (): Promise<BlogPost[]> => {
  try {
    const response = await fetch('/api/blogs');
    const result = await response.json() as { success?: boolean; blogs?: BlogPost[] };

    if (!response.ok || !result.success || !Array.isArray(result.blogs)) {
      throw new Error('Failed to load blogs');
    }

    return result.blogs;
  } catch {
    return [];
  }
};

export const loadRecentBlogsFromServer = async (
  excludeSlug?: string,
  limit = 4,
): Promise<BlogPost[]> => {
  try {
    const params = new URLSearchParams({ limit: String(limit) });
    if (excludeSlug) {
      params.set('exclude', excludeSlug);
    }

    const response = await fetch(`/api/blogs/recent?${params.toString()}`);
    const result = await response.json() as { success?: boolean; blogs?: BlogPost[] };

    if (!response.ok || !result.success || !Array.isArray(result.blogs)) {
      throw new Error('Failed to load recent blogs');
    }

    return result.blogs;
  } catch {
    return [];
  }
};

export const loadBlogBySlugFromServer = async (slug: string): Promise<BlogPost | null> => {
  try {
    const response = await fetch(`/api/blogs/slug/${encodeURIComponent(slug)}`);
    const result = await response.json() as { success?: boolean; blog?: BlogPost };

    if (!response.ok || !result.success || !result.blog) {
      throw new Error('Failed to load blog');
    }

    return result.blog;
  } catch {
    return null;
  }
};

export const saveBlogToServer = async (blog: BlogPost, updatedBy?: string): Promise<BlogPost> => {
  const response = await fetch('/api/blogs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ blog, updatedBy }),
  });

  const result = await response.json() as { success?: boolean; blog?: BlogPost; message?: string };

  if (!response.ok || !result.success || !result.blog) {
    throw new Error(result.message || 'Failed to save blog');
  }

  return result.blog;
};

export const deleteBlogFromServer = async (blogId: string) => {
  const response = await fetch(`/api/blogs/${encodeURIComponent(blogId)}`, {
    method: 'DELETE',
  });

  const result = await response.json() as { success?: boolean; message?: string };

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Failed to delete blog');
  }
};

export const loadBlogsPageBannerConfigFromServer = async (): Promise<BlogsPageBannerConfig> => {
  try {
    const response = await fetch('/api/blogs/banner-config');
    const result = await response.json() as { success?: boolean; config?: BlogsPageBannerConfig };

    if (!response.ok || !result.success || !result.config) {
      throw new Error('Failed to load banner config');
    }

    return {
      bannerUrl: result.config.bannerUrl || '',
      card: result.config.card,
    };
  } catch {
    return {
      bannerUrl: '',
      card: { titleEn: '', titleAr: '', subEn: '', subAr: '' },
    };
  }
};

export const saveBlogsPageBannerConfigToServer = async (payload: {
  bannerUrl?: string;
  card?: BlogsBannerCard;
  updatedBy?: string;
}) => {
  const response = await fetch('/api/blogs/banner-config', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bannerUrl: payload.bannerUrl ?? '',
      card: payload.card ?? { titleEn: '', titleAr: '', subEn: '', subAr: '' },
      updatedBy: payload.updatedBy,
    }),
  });

  const result = await response.json() as { success?: boolean; config?: BlogsPageBannerConfig; message?: string };

  if (!response.ok || !result.success || !result.config) {
    throw new Error(result.message || 'Failed to save banner config');
  }

  return result.config;
};
