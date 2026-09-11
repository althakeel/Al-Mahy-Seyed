import type { Metadata } from 'next';
import JsonLd from '@/components/structured-data/JsonLd';
import { buildPageMetadata, PAGE_SEO } from '@/lib/site-metadata';
import { buildFaqSchema } from '@/lib/structured-data-builders';
import { ServicePageSeo } from '@/lib/with-service-seo';
import { Locale } from '@/lib/translations';
import { isValidLocale } from '@/lib/utils';
import SecondPassportHero from '@/components/second-passport/SecondPassportHero';
import SecondPassportCountriesSection from '@/components/second-passport/SecondPassportCountriesSection';
import SecondPassportWhySection from '@/components/second-passport/SecondPassportWhySection';
import SecondPassportProcessSection from '@/components/second-passport/SecondPassportProcessSection';
import SecondPassportFaqSection from '@/components/second-passport/SecondPassportFaqSection';
import SecondPassportNewsSection from '@/components/second-passport/SecondPassportNewsSection';
import SecondPassportCtaSection from '@/components/second-passport/SecondPassportCtaSection';

const countries = [
  {
    slug: 'antigua-barbuda',
    name: 'Antigua & Barbuda',
    enSummary: 'Family-focused route with donation and real-estate options.',
    arSummary: 'مسار مناسب للعائلات مع خيارات التبرع والعقار.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop',
    metaEn: 'Donation · Real estate',
    metaAr: 'تبرع · عقار',
  },
  {
    slug: 'st-kitts-nevis',
    name: 'St. Kitts & Nevis',
    enSummary: 'Long-established premium program with fast-track options.',
    arSummary: 'برنامج راسخ ومميز مع خيارات مسار سريع.',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=500&fit=crop',
    metaEn: 'Premium · Fast-track',
    metaAr: 'مميز · مسار سريع',
  },
  {
    slug: 'saint-lucia',
    name: 'Saint Lucia',
    enSummary: 'Flexible options including contribution, real estate, and bonds.',
    arSummary: 'خيارات مرنة تشمل المساهمة والعقار والسندات.',
    image: 'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=800&h=500&fit=crop',
    metaEn: 'Contribution · Bonds',
    metaAr: 'مساهمة · سندات',
  },
  {
    slug: 'dominica',
    name: 'Dominica',
    enSummary: 'Cost-efficient option with streamlined processing timelines.',
    arSummary: 'خيار اقتصادي مع فترات معالجة سريعة نسبيًا.',
    image: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&h=500&fit=crop',
    metaEn: 'Efficient · Streamlined',
    metaAr: 'اقتصادي · مبسّط',
  },
  {
    slug: 'turkiye',
    name: 'Türkiye',
    enSummary: 'Popular route with real-estate based eligibility and strong regional access.',
    arSummary: 'مسار شائع يعتمد على الاستثمار العقاري مع وصول إقليمي قوي.',
    image: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&h=500&fit=crop',
    metaEn: 'Real estate · Regional access',
    metaAr: 'عقار · وصول إقليمي',
  },
];

type NewsItem = {
  title: string;
  image: string;
  url?: string;
};

async function fetchLatestNews(isArabic: boolean, fallbackItems: NewsItem[]): Promise<NewsItem[]> {
  const newsApiKey = process.env.NEWS_API_KEY;

  if (!newsApiKey) {
    return fallbackItems;
  }

  const query = isArabic
    ? 'الجنسية عبر الاستثمار OR التأشيرة الذهبية OR هجرة الاستثمار'
    : 'citizenship by investment OR golden visa OR investment migration';

  const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=${isArabic ? 'ar' : 'en'}&sortBy=publishedAt&pageSize=6`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'X-Api-Key': newsApiKey,
      },
      next: { revalidate: 21600 },
    });

    if (!response.ok) {
      return fallbackItems;
    }

    const payload = (await response.json()) as {
      articles?: Array<{
        title?: string;
        urlToImage?: string;
        url?: string;
      }>;
    };

    const parsed = (payload.articles ?? [])
      .filter((article) => article.title && article.urlToImage)
      .slice(0, 6)
      .map((article) => ({
        title: article.title as string,
        image: article.urlToImage as string,
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
  return buildPageMetadata(lang, '/second-passport', PAGE_SEO.secondPassport);
}

export default async function SecondPassportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isValidLoc = locale === 'en' || locale === 'ar';
  const lang = isValidLoc ? (locale as Locale) : 'en';
  const isArabic = lang === 'ar';

  const processSteps = isArabic
    ? [
        { title: 'تقييم أولي', desc: 'نراجع هدفك وميزانيتك والجدول الزمني المناسب.' },
        { title: 'اختيار البرنامج', desc: 'نقارن المسارات ونوصي بالدولة الأنسب لملفك.' },
        { title: 'تجهيز الملف', desc: 'نراجع المستندات ونعد الطلب قبل التقديم الرسمي.' },
        { title: 'المتابعة حتى الإصدار', desc: 'نحدثك في كل مرحلة حتى استلام الجنسية والجواز.' },
      ]
    : [
        { title: 'Initial assessment', desc: 'We review your goal, budget, and preferred timeline.' },
        { title: 'Program selection', desc: 'We compare routes and recommend the strongest country fit.' },
        { title: 'File preparation', desc: 'Documents are checked and prepared before official submission.' },
        { title: 'Follow-through to issuance', desc: 'You receive updates through approval and passport issuance.' },
      ];

  const reasons = isArabic
    ? [
        {
          title: 'تنقل عالمي أوسع',
          desc: 'برامج الجنسية عبر الاستثمار تفتح خيارات سفر وإقامة أقوى حسب الدولة المختارة.',
        },
        {
          title: 'خطة احتياطية للأسرة',
          desc: 'الجواز الثاني يمنح مرونة طويلة الأمد للعمل والتعليم والاستقرار.',
        },
        {
          title: 'مسارات استثمار متعددة',
          desc: 'تبرع، عقار، أو صيغ أخرى وفق متطلبات كل برنامج رسمي.',
        },
      ]
    : [
        {
          title: 'Broader global mobility',
          desc: 'Citizenship-by-investment programs can expand travel and residency options by jurisdiction.',
        },
        {
          title: 'A long-term family option',
          desc: 'A second passport adds flexibility for business, education, and future planning.',
        },
        {
          title: 'Multiple investment routes',
          desc: 'Donation, real estate, and other approved pathways depending on the program.',
        },
      ];

  const faqItems = isArabic
    ? [
        {
          q: 'كم تستغرق المعاملة عادة؟',
          a: 'تعتمد المدة على الدولة المختارة والفحص الأمني واكتمال المستندات.',
        },
        {
          q: 'هل أحتاج إلى السفر؟',
          a: 'بعض البرامج لا تتطلب إقامة دائمة، وقد تختلف متطلبات الحضور حسب الدولة.',
        },
        {
          q: 'هل يمكن إضافة الأسرة؟',
          a: 'غالبًا نعم، وتختلف الفئات المؤهلة حسب شروط برنامج كل دولة.',
        },
        {
          q: 'هل يمكنني الاحتفاظ بجنسيتي الحالية؟',
          a: 'في كثير من البرامج نعم، لكن يجب دائمًا مراجعة قانون الجنسية في بلدك الأصلي.',
        },
        {
          q: 'ما أهم المستندات المطلوبة؟',
          a: 'عادةً تشمل جواز السفر، إثبات مصدر الأموال، السجل الجنائي، ومستندات الحالة العائلية.',
        },
        {
          q: 'هل الاستثمار قابل للاسترداد؟',
          a: 'يعتمد على المسار: التبرعات غالبًا غير مستردة، بينما بعض المسارات العقارية قد تكون قابلة لإعادة البيع حسب الشروط.',
        },
      ]
    : [
        {
          q: 'How long does the process usually take?',
          a: 'Timing depends on the selected country, due diligence, and document readiness.',
        },
        {
          q: 'Do I need to travel?',
          a: 'Some programs have no residency requirement, but attendance rules vary by jurisdiction.',
        },
        {
          q: 'Can I include my family?',
          a: 'Usually yes, with eligible dependents defined by each country program.',
        },
        {
          q: 'Can I keep my current citizenship?',
          a: 'In many programs, yes. You should also confirm dual-citizenship rules in your home country.',
        },
        {
          q: 'What documents are commonly required?',
          a: 'Typically passport copies, source-of-funds evidence, police clearance, and civil-status documents.',
        },
        {
          q: 'Is the investment refundable?',
          a: 'It depends on the route: donations are usually non-refundable, while some real-estate routes may allow resale under rules.',
        },
      ];

  const fallbackNewsItems: NewsItem[] = isArabic
    ? [
        {
          title: 'تصنيف جواز سانت كيتس ونيفيس',
          image: 'https://images.unsplash.com/photo-1534996858221-380b92700493?w=900&h=600&fit=crop',
        },
        {
          title: 'دول الدخول بدون تأشيرة لجواز دومينيكا',
          image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=900&h=600&fit=crop',
        },
        {
          title: 'تحديثات برامج الإقامة عبر الاستثمار',
          image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=900&h=600&fit=crop',
        },
      ]
    : [
        {
          title: 'St Kitts and Nevis Passport Rank',
          image: 'https://images.unsplash.com/photo-1534996858221-380b92700493?w=900&h=600&fit=crop',
        },
        {
          title: 'Dominica Passport Visa Free Countries',
          image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=900&h=600&fit=crop',
        },
        {
          title: 'Updates in residency-by-investment programs',
          image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=900&h=600&fit=crop',
        },
      ];

  const newsItems = await fetchLatestNews(isArabic, fallbackNewsItems);

  return (
    <>
      <JsonLd
        id="second-passport-faq-schema"
        data={buildFaqSchema(faqItems.map((item) => ({ question: item.q, answer: item.a })))}
      />
      <ServicePageSeo locale={lang} path="/second-passport" copy={PAGE_SEO.secondPassport} />
    <div
      dir={isArabic ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-[#F1EFF0] text-[#160A0A] ${isArabic ? 'text-right' : 'text-left'}`}
    >
      <SecondPassportHero
        isArabic={isArabic}
        eyebrow={isArabic ? 'الجنسية عبر الاستثمار' : 'Citizenship by Investment'}
        title={isArabic ? 'بوابتك إلى الجنسية الثانية' : 'Your Gateway to Global Opportunities'}
        subtitle={
          isArabic
            ? 'اختر الدولة المناسبة، ونرشدك خطوة بخطوة حتى إصدار الجواز.'
            : 'Choose the country that fits you. We guide the file from first assessment to passport issuance.'
        }
        expertLabel={isArabic ? 'تحدث مع خبير' : 'Speak with an Expert'}
        browseLabel={isArabic ? 'استعرض الدول' : 'Browse Countries'}
      />

      <SecondPassportCountriesSection
        isArabic={isArabic}
        lang={lang}
        eyebrow={isArabic ? 'البرامج' : 'Programs'}
        title={isArabic ? 'الدول المتاحة' : 'Available Countries'}
        description={
          isArabic
            ? 'راجع المسارات الأساسية، ثم افتح التفاصيل لكل دولة.'
            : 'Review the core routes, then open full details for each country.'
        }
        disclaimer={
          isArabic
            ? '*الأرقام والمزايا المعروضة إرشادية وقد تتغير حسب تحديثات البرامج الرسمية.'
            : '*Displayed thresholds and benefits are indicative and may change with official program updates.'
        }
        viewDetailsLabel={isArabic ? 'عرض التفاصيل' : 'View details'}
        countries={countries}
      />

      <SecondPassportWhySection
        isArabic={isArabic}
        eyebrow={isArabic ? 'لماذا الجواز الثاني؟' : 'Why a second passport?'}
        title={isArabic ? 'استثمار في المرونة والاستقرار' : 'An investment in flexibility and stability'}
        items={reasons}
      />

      <SecondPassportProcessSection
        isArabic={isArabic}
        eyebrow={isArabic ? 'كيف نعمل' : 'How we work'}
        title={isArabic ? 'مسار واضح من التقييم إلى الإصدار' : 'A clear path from assessment to issuance'}
        steps={processSteps}
      />

      <SecondPassportFaqSection
        isArabic={isArabic}
        title="FAQ"
        subtitle={
          isArabic
            ? 'إجابات مختصرة على الأسئلة الأكثر شيوعًا حول برامج الجواز الثاني.'
            : 'Short answers to the most common questions about second passport programs.'
        }
        items={faqItems}
      />

      <SecondPassportNewsSection
        isArabic={isArabic}
        eyebrow={isArabic ? 'المستجدات' : 'Updates'}
        title={isArabic ? 'أخبار وبرامج الاستثمار' : 'News & program notes'}
        items={newsItems}
      />

      <SecondPassportCtaSection
        isArabic={isArabic}
        title={isArabic ? 'هل أنت مستعد لمراجعة الخيارات؟' : 'Ready to review your options?'}
        description={
          isArabic
            ? 'تحدث مع فريقنا لمقارنة البرامج الأنسب لهدفك وميزانيتك.'
            : 'Speak with our team to compare the programs that fit your goal and budget.'
        }
        ctaLabel={isArabic ? 'احجز استشارة' : 'Book a Consultation'}
      />
    </div>
    </>
  );
}
