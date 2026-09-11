import type { MetadataRoute } from 'next';

const DEFAULT_SITE_URL = 'https://almahy.com';

const getBaseUrl = () => {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || DEFAULT_SITE_URL;
  return configuredUrl.replace(/\/$/, '');
};

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard',
          '/admin',
          '/login',
          '/portal',
          '/profile',
          '/en/dashboard',
          '/ar/dashboard',
          '/en/admin',
          '/ar/admin',
          '/en/login',
          '/ar/login',
          '/en/profile',
          '/ar/profile',
          '/api/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
