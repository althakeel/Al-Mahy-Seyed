import type { Metadata } from 'next';
import { buildPageMetadata, PAGE_SEO } from '@/lib/site-metadata';
import { Locale } from '@/lib/translations';
import { isValidLocale } from '@/lib/utils';

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isValidLocale(locale) ? locale : 'en';
  return buildPageMetadata(lang, '/blogs', PAGE_SEO.blogs);
}

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
