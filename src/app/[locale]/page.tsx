import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';
import JsonLd from '@/components/structured-data/JsonLd';
import { homepageFaqData } from '@/lib/faq-data';
import { buildPageMetadata, PAGE_SEO } from '@/lib/site-metadata';
import { buildFaqSchema, buildLocalBusinessSchema } from '@/lib/structured-data-builders';
import { Locale } from '@/lib/translations';
import { isValidLocale } from '@/lib/utils';

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isValidLocale(locale) ? locale : 'en';
  return buildPageMetadata(lang, '', PAGE_SEO.home);
}

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const lang: Locale = isValidLocale(locale) ? locale : 'en';

  return (
    <>
      <JsonLd id="home-local-business-schema" data={buildLocalBusinessSchema(lang)} />
      <JsonLd id="home-faq-schema" data={buildFaqSchema(homepageFaqData[lang])} />
      <HomePage locale={lang} />
    </>
  );
}
