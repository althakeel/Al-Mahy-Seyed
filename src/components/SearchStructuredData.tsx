import Script from 'next/script';

const DEFAULT_SITE_URL = 'https://almahy.com';

const getBaseUrl = () => {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || DEFAULT_SITE_URL;
  return configuredUrl.replace(/\/$/, '');
};

interface SearchStructuredDataProps {
  locale: 'en' | 'ar';
}

export default function SearchStructuredData({ locale }: SearchStructuredDataProps) {
  const baseUrl = getBaseUrl();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: locale === 'ar' ? 'مكتب الماحي للخدمات القانونية' : 'Almahy Legal Services',
    url: `${baseUrl}/${locale}`,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/${locale}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <Script
      id={`search-schema-${locale}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
