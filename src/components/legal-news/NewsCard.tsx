import BlogArticleCard from '@/components/blogs/BlogArticleCard';
import { newsCategory, type LegalNews } from '@/lib/legal-news-data';
import type { Locale } from '@/lib/translations';

export default function NewsCard({ news, lang }: { news: LegalNews; lang: Locale }) {
  const isRTL = lang === 'ar';
  return <BlogArticleCard blog={news} locale={lang} lang={lang} isRTL={isRTL}
    section="legal-news" categoryLabel={newsCategory(news, lang)} readMoreLabel={isRTL ? 'اقرأ المزيد' : 'Read more'} />;
}
