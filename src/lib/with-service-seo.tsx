import JsonLd from '@/components/structured-data/JsonLd';
import { PageSeoCopy } from '@/lib/site-metadata';
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/structured-data-builders';
import { Locale } from '@/lib/translations';

interface ServiceSeoProps {
  locale: Locale;
  path: string;
  copy: PageSeoCopy;
  breadcrumbMiddle?: { name: string; path: string };
}

export function ServicePageSeo({ locale, path, copy, breadcrumbMiddle }: ServiceSeoProps) {
  const content = locale === 'ar' ? copy.ar : copy.en;
  const homeLabel = locale === 'ar' ? 'الرئيسية' : 'Home';
  const breadcrumbs = [
    { name: homeLabel, path: `/${locale}` },
    ...(breadcrumbMiddle ? [breadcrumbMiddle] : []),
    { name: content.title.split('|')[0]?.trim() || content.title, path: `/${locale}${path}` },
  ];

  return (
    <>
      <JsonLd
        id={`service-schema${path}`}
        data={buildServiceSchema(locale, path, content.title, content.description)}
      />
      <JsonLd id={`breadcrumb-schema${path}`} data={buildBreadcrumbSchema(breadcrumbs)} />
    </>
  );
}
