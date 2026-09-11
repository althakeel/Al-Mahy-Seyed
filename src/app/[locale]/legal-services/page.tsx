import type { Metadata } from 'next';
import { buildPageMetadata, PAGE_SEO } from '@/lib/site-metadata';
import { ServicePageSeo } from '@/lib/with-service-seo';
import { Locale } from '@/lib/translations';
import { isValidLocale } from '@/lib/utils';
import { getLegalAreas, getLegalServicesCopy } from '@/lib/legal-services-content';
import LegalServicesHero from '@/components/legal-services/LegalServicesHero';
import LegalPracticeNav from '@/components/legal-services/LegalPracticeNav';
import LegalFeaturedPractice from '@/components/legal-services/LegalFeaturedPractice';
import LegalPracticeAreasSection from '@/components/legal-services/LegalPracticeAreasSection';
import LegalNewsSection from '@/components/legal-services/LegalNewsSection';
import LegalServicesCta from '@/components/legal-services/LegalServicesCta';

const defaultImage = 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1200&h=700&fit=crop';

type NewsItem = {
  title: string;
  image: string;
  url?: string;
};

function getSafeImageUrl(imageUrl?: string): string {
  if (!imageUrl) return defaultImage;
  if (imageUrl.startsWith('https://images.unsplash.com/')) return imageUrl;
  return defaultImage;
}

async function fetchLatestLegalNews(isArabic: boolean, fallbackItems: NewsItem[]): Promise<NewsItem[]> {
  const newsApiKey = process.env.NEWS_API_KEY;
  if (!newsApiKey) return fallbackItems;

  const query = isArabic
    ? 'القانون الإماراتي OR التحكيم التجاري OR النزاعات التجارية'
    : 'UAE legal news OR commercial arbitration OR corporate disputes';

  const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=${isArabic ? 'ar' : 'en'}&sortBy=publishedAt&pageSize=10`;

  try {
    const response = await fetch(apiUrl, {
      headers: { 'X-Api-Key': newsApiKey },
      next: { revalidate: 21600 },
    });

    if (!response.ok) return fallbackItems;

    const payload = (await response.json()) as {
      articles?: Array<{ title?: string; urlToImage?: string; url?: string }>;
    };

    const parsed = (payload.articles ?? [])
      .filter((article) => article.title && article.urlToImage)
      .slice(0, 6)
      .map((article) => ({
        title: article.title as string,
        image: getSafeImageUrl(article.urlToImage),
        url: article.url,
      }));

    return parsed.length ? parsed : fallbackItems;
  } catch {
    return fallbackItems;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isValidLocale(locale) ? locale : 'en';
  return buildPageMetadata(lang, '/legal-services', PAGE_SEO.legalServices);
}

export default async function LegalServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isValidLoc = locale === 'en' || locale === 'ar';
  const lang = isValidLoc ? (locale as Locale) : 'en';
  const isArabic = lang === 'ar';
  const copy = getLegalServicesCopy(lang);
  const legalAreas = getLegalAreas(lang);

  const fallbackNews: NewsItem[] = isArabic
    ? [
        {
          title: 'تحديثات قانونية في الإمارات حول التحكيم التجاري وتسوية المنازعات',
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=700&fit=crop',
          url: 'https://u.ae/ar-ae/information-and-services/justice-safety-and-the-law',
        },
        {
          title: 'أحدث المستجدات التنظيمية في الحوكمة والامتثال للشركات',
          image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=700&fit=crop',
          url: 'https://u.ae/ar-ae/information-and-services/business',
        },
        {
          title: 'تطورات في قضايا العمل والأسرة والعقود المدنية في دولة الإمارات',
          image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1200&h=700&fit=crop',
          url: 'https://u.ae/ar-ae/information-and-services/justice-safety-and-the-law',
        },
      ]
    : [
        {
          title: 'UAE legal updates on commercial arbitration and dispute resolution',
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=700&fit=crop',
          url: 'https://u.ae/en/information-and-services/justice-safety-and-the-law',
        },
        {
          title: 'Recent regulatory developments in corporate compliance and governance',
          image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=700&fit=crop',
          url: 'https://u.ae/en/information-and-services/business',
        },
        {
          title: 'Latest UAE insights on labor, family, and civil legal matters',
          image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1200&h=700&fit=crop',
          url: 'https://u.ae/en/information-and-services/justice-safety-and-the-law',
        },
      ];

  const legalNews = await fetchLatestLegalNews(isArabic, fallbackNews);
  const featured = legalAreas[0];
  const rest = legalAreas.slice(1);

  const practiceSummary = isArabic
    ? `${legalAreas.length} مجالات ممارسة عبر التقاضي والاستشارات والامتثال في الإمارات.`
    : `${legalAreas.length} practice areas across litigation, advisory, and compliance in the UAE.`;

  return (
    <>
      <ServicePageSeo locale={lang} path="/legal-services" copy={PAGE_SEO.legalServices} />
    <div className="min-h-screen bg-white text-[#160A0A]" dir={isArabic ? 'rtl' : 'ltr'} lang={lang}>
      <LegalServicesHero locale={lang} copy={copy} />

      <LegalPracticeNav areas={legalAreas} isArabic={isArabic} />

      <LegalFeaturedPractice
        featured={featured}
        copy={copy}
        imageUrl={getSafeImageUrl(featured.image)}
        isArabic={isArabic}
      />

      <LegalPracticeAreasSection
        areas={rest}
        badge={copy.badge}
        title={copy.practiceAreasTitle}
        summary={practiceSummary}
        getImageUrl={getSafeImageUrl}
        isArabic={isArabic}
      />

      <LegalNewsSection
        copy={copy}
        items={legalNews}
        getImageUrl={getSafeImageUrl}
        isArabic={isArabic}
      />

      <LegalServicesCta
        locale={lang}
        copy={copy}
        contactLabel={isArabic ? 'تواصل معنا' : 'Contact Us'}
        isArabic={isArabic}
      />
    </div>
    </>
  );
}
