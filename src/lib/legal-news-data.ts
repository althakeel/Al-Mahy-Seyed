import type { BlogPost } from '@/lib/blogs';
import type { Locale } from '@/lib/translations';

export const newsTitle = (locale: Locale) => locale === 'ar' ? 'الأخبار القانونية' : 'Legal News';
export const newsImageFields = ['image', 'bannerImage', 'imageAr', 'bannerImageAr'] as const;
export const newsTextFields = ['title', 'titleAr', 'shortDescription', 'shortDescriptionAr', 'content', 'contentAr', 'category', 'categoryAr'] as const;

export type NewsInput = Record<(typeof newsTextFields)[number] | (typeof newsImageFields)[number], string> & {
  slug: string;
  date: string;
  status: 'draft' | 'published';
};

export type LegalNews = NewsInput & BlogPost & { updatedAt: number };
export const newsCategory = (news: LegalNews, locale: Locale) => locale === 'ar' ? news.categoryAr || news.category : news.category;
