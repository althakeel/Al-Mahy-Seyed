'use client';

import { useParams } from 'next/navigation';

export default function Error({ reset }: { reset: () => void }) {
  const ar = useParams().locale === 'ar';
  return (
    <main dir={ar ? 'rtl' : 'ltr'} className="min-h-screen bg-[#F1EFF0] px-4 py-32 text-center">
      <p role="alert">{ar ? 'تعذر تحميل الأخبار القانونية.' : 'Legal news could not be loaded.'}</p>
      <button type="button" className="mt-4 font-semibold text-[#9A7635] underline" onClick={reset}>
        {ar ? 'إعادة المحاولة' : 'Try again'}
      </button>
    </main>
  );
}
