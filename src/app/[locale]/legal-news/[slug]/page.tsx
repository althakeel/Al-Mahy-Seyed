import { notFound } from 'next/navigation';
import BlogArticleBackLink from '@/components/blogs/BlogArticleBackLink';
import BlogArticleSidebar from '@/components/blogs/BlogArticleSidebar';
import NewsArticle, { newsBanner } from '@/components/legal-news/NewsArticle';
import JsonLd from '@/components/structured-data/JsonLd';
import { getBlogLocalizedField } from '@/lib/blogs';
import { newsTitle } from '@/lib/legal-news-data';
import { getPublishedLegalNews, listLegalNews } from '@/lib/legal-news-server';
import { buildAlternates, getSiteUrl } from '@/lib/site-metadata';
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/structured-data-builders';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const lang = locale === 'ar' ? 'ar' : 'en';
  const news = await getPublishedLegalNews(slug);
  if (!news) return { robots: { index: false, follow: false } };
  const title = getBlogLocalizedField(news, 'title', lang);
  const description = getBlogLocalizedField(news, 'shortDescription', lang).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 155);
  const path = `/legal-news/${news.slug}`;
  const image = newsBanner(news, lang);
  return {
    title,
    description,
    alternates: buildAlternates(lang, path),
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: news.date,
      url: `${getSiteUrl()}/${lang}${path}`,
      locale: lang === 'ar' ? 'ar_AE' : 'en_AE',
      images: image ? [image] : undefined,
    },
  };
}

export default async function LegalNewsArticle({ params }: Props) {
  const { locale, slug } = await params;
  const lang = locale === 'ar' ? 'ar' : 'en';
  const isRTL = lang === 'ar';
  const news = await getPublishedLegalNews(slug);
  if (!news) notFound();
  const recent = (await listLegalNews({ limit: 5 })).filter((item) => item.slug !== slug).slice(0, 4);
  const title = getBlogLocalizedField(news, 'title', lang);
  const description = getBlogLocalizedField(news, 'shortDescription', lang).replace(/<[^>]*>/g, ' ').trim().slice(0, 155);
  const indexPath = `/${lang}/legal-news`;
  const articlePath = `${indexPath}/${news.slug}`;

  return (
    <main className="min-h-screen bg-[#F1EFF0]" dir={isRTL ? 'rtl' : 'ltr'}>
      <JsonLd id="legal-news-article-schema" data={{
        ...buildArticleSchema({ locale: lang, slug, headline: title, description, datePublished: news.date, image: newsBanner(news, lang) }),
        '@type': 'NewsArticle',
        inLanguage: lang,
        mainEntityOfPage: `${getSiteUrl()}${articlePath}`,
      }} />
      <JsonLd id="legal-news-breadcrumb-schema" data={buildBreadcrumbSchema([
        { name: isRTL ? 'الرئيسية' : 'Home', path: `/${lang}` },
        { name: newsTitle(lang), path: indexPath },
        { name: title, path: articlePath },
      ])} />
      <section className="mx-auto max-w-[1250px] px-4 pb-28 pt-28 md:px-8 md:pt-32 lg:pb-20">
        <article className="grid min-w-0 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-x-12 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">
            <BlogArticleBackLink href={indexPath} label={isRTL ? 'العودة إلى الأخبار القانونية' : 'Back to Legal News'} isRTL={isRTL} />
            <div className="mt-8"><NewsArticle news={news} lang={lang} /></div>
          </div>
          <BlogArticleSidebar isRTL={isRTL} lang={lang} locale={lang} section="legal-news" date={news.date}
            recentBlogs={recent} publishedLabel={isRTL ? 'تاريخ النشر' : 'Published'}
            recentLabel={isRTL ? 'أحدث الأخبار' : 'Recent News'} guidanceTitle={isRTL ? 'إرشادات قانونية' : 'Legal Guidance'}
            guidanceText={isRTL ? 'للحصول على إرشاد مخصص، تواصل مع فريقنا القانوني.' : 'For advice tailored to your circumstances, speak with our legal team.'}
            contactLabel={isRTL ? 'تواصل معنا' : 'Contact us'} />
        </article>
      </section>
    </main>
  );
}
