import type { MetadataRoute } from 'next';
import { listBlogSummariesFromMongo } from '@/lib/blogs-server';
import { team } from '@/data/team';

const DEFAULT_SITE_URL = 'https://almahy.com';
const LOCALES = ['en', 'ar'] as const;
const SECOND_PASSPORT_COUNTRIES = [
  'antigua-barbuda',
  'st-kitts-nevis',
  'saint-lucia',
  'dominica',
  'turkiye',
] as const;

const PUBLIC_LOCALIZED_ROUTES = [
  '',
  '/about',
  '/accounting-services',
  '/blogs',
  '/contact',
  '/corporate-services',
  '/expert-reports',
  '/legal-services',
  '/notary-public-services',
  '/pricing-table',
  '/privacy',
  '/professional-services',
  '/second-passport',
  '/services',
  '/search',
  '/tax-services',
  '/terms',
] as const;

const PUBLIC_ROOT_ROUTES = ['/contact', '/our-history', '/about/our-history', '/about/who-we-are'] as const;

const getBaseUrl = () => {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || DEFAULT_SITE_URL;
  return configuredUrl.replace(/\/$/, '');
};

const buildAbsoluteUrl = (baseUrl: string, path: string) => `${baseUrl}${path}`;
type SitemapEntry = MetadataRoute.Sitemap[number];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const now = new Date();

  const staticEntries: SitemapEntry[] = [
    {
      url: buildAbsoluteUrl(baseUrl, '/'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...PUBLIC_ROOT_ROUTES.map(
      (route): SitemapEntry => ({
        url: buildAbsoluteUrl(baseUrl, route),
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.75,
      }),
    ),
    ...LOCALES.flatMap((locale) =>
      PUBLIC_LOCALIZED_ROUTES.map(
        (route): SitemapEntry => ({
          url: buildAbsoluteUrl(baseUrl, `/${locale}${route}`),
          lastModified: now,
          changeFrequency: route === '' ? 'daily' : 'weekly',
          priority: route === '' ? 0.95 : 0.8,
        }),
      ),
    ),
    ...LOCALES.flatMap((locale) =>
      SECOND_PASSPORT_COUNTRIES.map(
        (country): SitemapEntry => ({
          url: buildAbsoluteUrl(baseUrl, `/${locale}/second-passport/${country}`),
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.7,
        }),
      ),
    ),
    ...LOCALES.flatMap((locale) =>
      team.filter((member) => member.slug).map(
        (member): SitemapEntry => ({
          url: buildAbsoluteUrl(baseUrl, `/${locale}/about/team/${member.slug}`),
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.6,
        }),
      ),
    ),
  ];

  try {
    const blogs = await listBlogSummariesFromMongo();
    const blogEntries: SitemapEntry[] = blogs.flatMap((blog) =>
      LOCALES.map(
        (locale): SitemapEntry => ({
          url: buildAbsoluteUrl(baseUrl, `/${locale}/blogs/${encodeURIComponent(blog.slug)}`),
          lastModified: blog.createdAt ? new Date(blog.createdAt) : now,
          changeFrequency: 'weekly',
          priority: 0.7,
        }),
      ),
    );

    return [...staticEntries, ...blogEntries];
  } catch (error) {
    console.error('Sitemap blog loading failed, returning static entries only.', error);
    return staticEntries;
  }
}
