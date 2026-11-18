import BlogArticleHeader from '@/components/blogs/BlogArticleHeader';
import { FormattedText } from '@/components/BoldTextField';
import { getBlogLocalizedField, isBlogFieldAvailableInArabic } from '@/lib/blogs';
import { newsCategory, type LegalNews } from '@/lib/legal-news-data';
import type { Locale } from '@/lib/translations';

export const newsBanner = (news: LegalNews, lang: Locale) => lang === 'ar'
  ? news.bannerImageAr || news.bannerImage || news.imageAr || news.image
  : news.bannerImage || news.image;

export default function NewsArticle({ news, lang }: { news: LegalNews; lang: Locale }) {
  const isRTL = lang === 'ar';
  const contentRTL = isRTL && isBlogFieldAvailableInArabic(news, 'content');
  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      <BlogArticleHeader
        isRTL={isRTL}
        categoryLabel={newsCategory(news, lang)}
        date={news.date}
        title={getBlogLocalizedField(news, 'title', lang)}
        shortDescription={getBlogLocalizedField(news, 'shortDescription', lang)}
        shortDescriptionUsesArabic={isBlogFieldAvailableInArabic(news, 'shortDescription')}
        bannerImage={newsBanner(news, lang)}
      />
      <div dir={contentRTL ? 'rtl' : 'ltr'} className={`blog-article-prose mt-10 md:mt-12 ${contentRTL ? 'text-right' : 'text-left'}`}>
        <FormattedText text={getBlogLocalizedField(news, 'content', lang)} className="max-w-[680px] text-[16px] leading-[1.85] text-[#160A0A]/85" />
      </div>
    </div>
  );
}
