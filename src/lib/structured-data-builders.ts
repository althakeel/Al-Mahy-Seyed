import { BUSINESS_INFO } from '@/lib/business-info';
import { FaqItem } from '@/lib/faq-data';
import { getSiteUrl } from '@/lib/site-metadata';
import { Locale } from '@/lib/translations';

export const buildLocalBusinessSchema = (locale: Locale) => ({
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: locale === 'ar' ? BUSINESS_INFO.nameAr : BUSINESS_INFO.name,
  url: `${getSiteUrl()}/${locale}`,
  telephone: BUSINESS_INFO.telephone,
  email: BUSINESS_INFO.email,
  priceRange: BUSINESS_INFO.priceRange,
  areaServed: BUSINESS_INFO.areaServed,
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS_INFO.streetAddress,
    addressLocality: BUSINESS_INFO.addressLocality,
    addressRegion: BUSINESS_INFO.addressRegion,
    addressCountry: BUSINESS_INFO.addressCountry,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: BUSINESS_INFO.geo.latitude,
    longitude: BUSINESS_INFO.geo.longitude,
  },
});

export const buildServiceSchema = (
  locale: Locale,
  path: string,
  name: string,
  description: string,
) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  provider: {
    '@type': 'LegalService',
    name: locale === 'ar' ? BUSINESS_INFO.nameAr : BUSINESS_INFO.name,
    url: getSiteUrl(),
  },
  areaServed: {
    '@type': 'Country',
    name: 'United Arab Emirates',
  },
  url: `${getSiteUrl()}/${locale}${path.startsWith('/') ? path : `/${path}`}`,
});

export const buildBreadcrumbSchema = (
  items: Array<{ name: string; path: string }>,
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${getSiteUrl()}${item.path}`,
  })),
});

export const buildFaqSchema = (items: FaqItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
});

export const buildArticleSchema = (params: {
  locale: Locale;
  slug: string;
  headline: string;
  description: string;
  datePublished: string;
  image?: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: params.headline,
  description: params.description,
  datePublished: params.datePublished,
  author: {
    '@type': 'Organization',
    name: params.locale === 'ar' ? BUSINESS_INFO.nameAr : BUSINESS_INFO.name,
  },
  publisher: {
    '@type': 'Organization',
    name: params.locale === 'ar' ? BUSINESS_INFO.nameAr : BUSINESS_INFO.name,
    url: getSiteUrl(),
  },
  image: params.image ? [params.image] : undefined,
  mainEntityOfPage: `${getSiteUrl()}/${params.locale}/blogs/${encodeURIComponent(params.slug)}`,
});
