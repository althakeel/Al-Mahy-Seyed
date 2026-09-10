'use client';

import SearchAiGuidanceBox from '@/components/search/SearchAiGuidanceBox';
import SearchResultsSection from '@/components/search/SearchResultsSection';
import SearchResultItem from '@/components/SearchResultItem';
import SiteSearch from '@/components/SiteSearch';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { POPULAR_SEARCHES, SearchResult } from '@/lib/search-index';
import { Locale } from '@/lib/translations';

interface WebSource {
  title: string;
  url: string;
}

interface SearchResultsClientProps {
  locale: Locale;
  initialQuery: string;
  initialResults: SearchResult[];
}

const copy = {
  en: {
    title: 'Search',
    eyebrow: 'AI Legal Search',
    resultsFor: 'Results for',
    noQuery: 'Search legal services, ask a legal question, or find articles from our site and trusted external sources',
    noResults: 'No matching results found. See the AI legal guidance above, or try different keywords.',
    popular: 'Popular searches',
    type: { page: 'Page', service: 'Service', blog: 'Article', external: 'External' },
    aiTitle: 'AI Legal Guidance',
    aiLoading: 'Getting legal guidance for your question...',
    aiUnavailable: 'AI guidance is temporarily unavailable. Browse the results below or contact us for help.',
    relatedPages: 'From Almahy Website',
    externalSources: 'From Google & the Web',
    webSources: 'Web sources used by AI',
    getConsultation: 'Get a Free Consultation',
  },
  ar: {
    title: 'بحث',
    eyebrow: 'البحث القانوني بالذكاء الاصطناعي',
    resultsFor: 'نتائج البحث عن',
    noQuery: 'ابحث في خدماتنا، اطرح سؤالاً قانونياً، أو اعثر على مقالات من موقعنا ومصادر خارجية موثوقة',
    noResults: 'لم نعثر على نتائج مطابقة. راجع الإرشاد القانوني أعلاه، أو جرّب كلمات بحث أخرى.',
    popular: 'عمليات بحث شائعة',
    type: { page: 'صفحة', service: 'خدمة', blog: 'مقال', external: 'خارجي' },
    aiTitle: 'إرشاد قانوني بالذكاء الاصطناعي',
    aiLoading: 'جاري إعداد الإرشاد القانوني لسؤالك...',
    aiUnavailable: 'الإرشاد بالذكاء الاصطناعي غير متاح مؤقتًا. تصفح النتائج أدناه أو تواصل معنا.',
    relatedPages: 'من موقع المحي',
    externalSources: 'من Google والويب',
    webSources: 'مصادر الويب المستخدمة بالذكاء الاصطناعي',
    getConsultation: 'احصل على استشارة مجانية',
  },
};

export default function SearchResultsClient({
  locale,
  initialQuery,
  initialResults,
}: SearchResultsClientProps) {
  const router = useRouter();
  const t = copy[locale];
  const isRTL = locale === 'ar';
  const [results, setResults] = useState(initialResults);
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [aiDisclaimer, setAiDisclaimer] = useState<string | null>(null);
  const [webSources, setWebSources] = useState<WebSource[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiFailed, setAiFailed] = useState(false);

  const internalResults = useMemo(
    () => results.filter((r) => !r.isExternal && r.type !== 'external'),
    [results],
  );
  const externalResults = useMemo(
    () => results.filter((r) => r.isExternal || r.type === 'external'),
    [results],
  );

  useEffect(() => {
    setResults(initialResults);
  }, [initialResults]);

  useEffect(() => {
    if (!initialQuery.trim()) {
      setAiAnswer(null);
      setAiDisclaimer(null);
      setWebSources([]);
      setAiFailed(false);
      return;
    }

    const controller = new AbortController();

    const fetchAi = async () => {
      setAiLoading(true);
      setAiFailed(false);
      setAiAnswer(null);
      setAiDisclaimer(null);
      setWebSources([]);

      try {
        const response = await fetch('/api/search/ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: initialQuery, locale }),
          signal: controller.signal,
        });
        const data = (await response.json()) as {
          success?: boolean;
          answer?: string;
          disclaimer?: string;
          webSources?: WebSource[];
        };

        if (data.success && data.answer) {
          setAiAnswer(data.answer);
          setAiDisclaimer(data.disclaimer ?? null);
          setWebSources(data.webSources ?? []);
        } else {
          setAiFailed(true);
        }
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setAiFailed(true);
        }
      } finally {
        setAiLoading(false);
      }
    };

    void fetchAi();
    return () => controller.abort();
  }, [initialQuery, locale]);

  const handlePopularClick = (term: string) => {
    router.push(`/${locale}/search?q=${encodeURIComponent(term)}`);
  };

  const getTypeLabel = (type: SearchResult['type']) =>
    t.type[type as keyof typeof t.type] ?? type;

  return (
    <main className="min-h-screen bg-[#100B0B]" dir={isRTL ? 'rtl' : 'ltr'}>
      <section className="border-b border-[#B38D42]/15 pt-28 pb-8 md:pt-32 md:pb-10">
        <div className="mx-auto max-w-[1250px] px-4 md:px-8">
          <div className={`mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className={`mb-3 flex items-center gap-3 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
              <span className="h-px w-8 shrink-0 bg-[#B38D42]" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B38D42]">{t.eyebrow}</p>
            </div>
            <h1 className="text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: 'Georgia, serif' }}>
              {t.title}
            </h1>
          </div>

          <SiteSearch locale={locale} variant="page" accentColor="#B38D42" initialQuery={initialQuery} />

          {!initialQuery ? (
            <div className="mt-8">
              <p className={`mb-4 text-white/70 ${isRTL ? 'text-right' : 'text-left'}`}>{t.noQuery}</p>
              <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#B38D42] ${isRTL ? 'text-right' : 'text-left'}`}>
                {t.popular}
              </p>
              <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : ''}`}>
                {POPULAR_SEARCHES[locale].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => handlePopularClick(term)}
                    className="cursor-pointer rounded-full border border-[#B38D42]/25 bg-[#160A0A] px-4 py-2 text-sm text-white/85 transition hover:border-[#B38D42]/45 hover:bg-[#B38D42]/10"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className={`mt-6 text-white/70 ${isRTL ? 'text-right' : 'text-left'}`}>
              {t.resultsFor}{' '}
              <span className="font-semibold text-white">&ldquo;{initialQuery}&rdquo;</span>
            </p>
          )}
        </div>
      </section>

      {initialQuery ? (
        <>
          <section className="py-8 md:py-10">
            <div className="mx-auto max-w-[1250px] px-4 md:px-8">
              <SearchAiGuidanceBox
                isRTL={isRTL}
                locale={locale}
                title={t.aiTitle}
                loading={aiLoading}
                loadingText={t.aiLoading}
                failed={aiFailed}
                failedText={t.aiUnavailable}
                answer={aiAnswer}
                disclaimer={aiDisclaimer}
                webSources={webSources}
                webSourcesLabel={t.webSources}
                consultationLabel={t.getConsultation}
              />

              {internalResults.length === 0 && externalResults.length === 0 && !aiLoading && !aiAnswer ? (
                <p className={`text-white/60 ${isRTL ? 'text-right' : 'text-left'}`}>{t.noResults}</p>
              ) : null}
            </div>
          </section>

          {internalResults.length > 0 ? (
            <SearchResultsSection title={t.relatedPages} count={internalResults.length} isRTL={isRTL} tone="light">
              <ul className="grid auto-rows-fr gap-3 md:grid-cols-2">
                {internalResults.map((result) => (
                  <li key={result.id} className="h-full">
                    <SearchResultItem
                      result={result}
                      locale={locale}
                      typeLabel={getTypeLabel(result.type)}
                      surface="light"
                      className="h-full"
                    />
                  </li>
                ))}
              </ul>
            </SearchResultsSection>
          ) : null}

          {externalResults.length > 0 ? (
            <SearchResultsSection title={t.externalSources} count={externalResults.length} isRTL={isRTL} tone="dark">
              <ul className="grid auto-rows-fr gap-3 md:grid-cols-2">
                {externalResults.map((result) => (
                  <li key={result.href || result.id} className="h-full">
                    <SearchResultItem
                      result={result}
                      locale={locale}
                      typeLabel={getTypeLabel(result.type)}
                      surface="dark"
                      className="h-full"
                    />
                  </li>
                ))}
              </ul>
            </SearchResultsSection>
          ) : null}
        </>
      ) : null}
    </main>
  );
}
