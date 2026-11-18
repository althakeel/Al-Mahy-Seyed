'use client';

import { useParams } from 'next/navigation';
import BlogsArticleGrid from '@/components/blogs/BlogsArticleGrid';

export default function Loading() {
  const lang = useParams().locale === 'ar' ? 'ar' : 'en';
  return (
    <main aria-busy="true" dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-[#F1EFF0]">
      <div className="mx-auto max-w-[1250px] px-4 py-28 md:px-8">
        <p role="status" className="mb-5 text-sm text-[#160A0A]/65">
          {lang === 'ar' ? 'جارٍ تحميل الأخبار…' : 'Loading legal news…'}
        </p>
        <BlogsArticleGrid blogs={[]} locale={lang} lang={lang} isRTL={lang === 'ar'} readMoreLabel="" isLoading />
      </div>
    </main>
  );
}
