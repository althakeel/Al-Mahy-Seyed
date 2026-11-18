import BlogsArticleGrid from '@/components/blogs/BlogsArticleGrid';
import BlogsExploreCard from '@/components/blogs/BlogsExploreCard';
import BlogsHero from '@/components/blogs/BlogsHero';
import { newsCategory, newsTitle } from '@/lib/legal-news-data';
import { listLegalNews } from '@/lib/legal-news-server';
import { buildPageMetadata } from '@/lib/site-metadata';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ locale: string }> };
const seo = {
  en: { title: 'Legal News', description: 'Read the latest UAE legal and regulatory updates from Almahy.' },
  ar: { title: 'الأخبار القانونية', description: 'تابع آخر المستجدات القانونية والتنظيمية في الإمارات من الماحي.' },
};

export async function generateMetadata({ params }: Props) {
  return buildPageMetadata((await params).locale === 'ar' ? 'ar' : 'en', '/legal-news', seo);
}

export default async function LegalNewsPage({ params }: Props) {
  const lang = (await params).locale === 'ar' ? 'ar' : 'en';
  const isRTL = lang === 'ar';
  const news = await listLegalNews();
  const title = newsTitle(lang);

  return (
    <main className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <BlogsHero isRTL={isRTL} bannerUrl="/assets/banner/blogs-hero.jpg" bannerAlt={title}
        eyebrow={isRTL ? 'المستجدات القانونية' : 'Legal Updates'} title={title} subtitle={seo[lang].description} />
      <section className="border-t border-[#B38D42]/10 bg-[#F1EFF0]">
        <div className="mx-auto max-w-[1250px] px-4 pb-20 pt-10 md:px-8 md:pb-24 md:pt-12">
          {news.length ? (
            <BlogsExploreCard isRTL={isRTL} eyebrow={title}
              title={isRTL ? 'أحدث الأخبار' : 'Latest News'} description={seo[lang].description}
              articleCount={news.length} articlesCountLabel={isRTL ? 'خبر' : 'Articles'}
              viewAllLabel={isRTL ? 'عرض الكل' : 'View All'} />
          ) : (
            <p className="text-sm text-[#160A0A]/50">{isRTL ? 'لا توجد أخبار منشورة بعد.' : 'No news published yet.'}</p>
          )}
          <BlogsArticleGrid blogs={news.map((item) => ({ ...item, categoryLabel: newsCategory(item, lang) }))}
            locale={lang} lang={lang} isRTL={isRTL} section="legal-news"
            readMoreLabel={isRTL ? 'اقرأ المزيد' : 'Read more'} isLoading={false} />
        </div>
      </section>
    </main>
  );
}
