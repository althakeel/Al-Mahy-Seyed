import type { Metadata } from 'next';
import JsonLd from '@/components/structured-data/JsonLd';
import { getBlogLocalizedField } from '@/lib/blogs';
import { getBlogBySlugFromMongo } from '@/lib/blogs-server';
import { buildAlternates, getSiteUrl } from '@/lib/site-metadata';
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/structured-data-builders';
import { Locale } from '@/lib/translations';
import { isValidLocale } from '@/lib/utils';

const excerpt = (value: string, max = 155) => {
  const plain = value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (plain.length <= max) return plain;
  return `${plain.slice(0, max - 3).trim()}...`;
};

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string; slug: string }> }>): Promise<Metadata> {
  const { locale, slug } = await params;
  const lang: Locale = isValidLocale(locale) ? locale : 'en';
  const blog = await getBlogBySlugFromMongo(decodeURIComponent(slug));

  if (!blog) {
    return {
      title: lang === 'ar' ? 'المقال غير موجود | المحي' : 'Article Not Found | Almahy',
      robots: { index: false, follow: false },
    };
  }

  const title = getBlogLocalizedField(blog, 'title', lang);
  const description = excerpt(getBlogLocalizedField(blog, 'shortDescription', lang) || title);
  const path = `/blogs/${blog.slug}`;

  return {
    title: lang === 'ar' ? `${title} | المحي للخدمات القانونية` : `${title} | Almahy Legal Blog`,
    description,
    alternates: buildAlternates(lang, path),
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: blog.date,
      url: `${getSiteUrl()}/${lang}${path.startsWith('/') ? path : `/${path}`}`,
    },
  };
}

export default async function BlogArticleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string; slug: string }>;
}>) {
  const { locale, slug } = await params;
  const lang: Locale = isValidLocale(locale) ? locale : 'en';
  const blog = await getBlogBySlugFromMongo(decodeURIComponent(slug));

  if (!blog) {
    return children;
  }

  const title = getBlogLocalizedField(blog, 'title', lang);
  const description = excerpt(getBlogLocalizedField(blog, 'shortDescription', lang) || title);
  const image = blog.bannerImage || blog.image;
  const absoluteImage = image?.startsWith('http') ? image : `${getSiteUrl()}${image}`;

  return (
    <>
      <JsonLd
        id="blog-article-schema"
        data={buildArticleSchema({
          locale: lang,
          slug: blog.slug,
          headline: title,
          description,
          datePublished: blog.date,
          image: absoluteImage,
        })}
      />
      <JsonLd
        id="blog-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: lang === 'ar' ? 'الرئيسية' : 'Home', path: `/${lang}` },
          { name: lang === 'ar' ? 'المدونة' : 'Blog', path: `/${lang}/blogs` },
          { name: title, path: `/${lang}/blogs/${encodeURIComponent(blog.slug)}` },
        ])}
      />
      {children}
    </>
  );
}
