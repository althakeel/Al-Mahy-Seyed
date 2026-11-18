'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import NewsCard from '@/components/legal-news/NewsCard';
import type { LegalNews } from '@/lib/legal-news-data';
import type { Locale } from '@/lib/translations';

export default function LatestLegalNews({ locale }: { locale: Locale }) {
  const [news, setNews] = useState<LegalNews[]>([]);
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      const response = await fetch('/api/legal-news?latest=1', { signal: controller.signal });
      if (!response.ok) return;
      const result = await response.json();
      if (!controller.signal.aborted && Array.isArray(result.data)) setNews(result.data);
    }
    void load().catch(() => {});
    return () => controller.abort();
  }, []);
  if (!news.length) return null;
  const ar = locale === 'ar';
  return (
    <section dir={ar ? 'rtl' : 'ltr'} className="border-t border-[#B38D42]/10 bg-[#F1EFF0]">
      <div className="mx-auto max-w-[1250px] px-4 py-12 md:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-[#160A0A] md:text-3xl">{ar ? 'آخر الأخبار القانونية' : 'Latest Legal News'}</h2>
          <Link href={`/${locale}/legal-news`} className="font-semibold text-[#9A7635] hover:underline">
            {ar ? 'عرض جميع الأخبار' : 'View All News'}
          </Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => <NewsCard key={item.id} news={item} lang={locale} />)}
        </div>
      </div>
    </section>
  );
}

