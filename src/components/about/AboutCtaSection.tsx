import Link from 'next/link';
import { Locale } from '@/lib/translations';

function ArrowIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

interface AboutCtaSectionProps {
  locale: Locale;
  title: string;
  description: string;
  bookLabel: string;
  callLabel: string;
}

export default function AboutCtaSection({
  locale,
  title,
  description,
  bookLabel,
  callLabel,
}: AboutCtaSectionProps) {
  const isArabic = locale === 'ar';

  return (
    <section className="mb-6 border-t border-[#B38D42]/15 bg-[#100B0B] py-10 text-white md:mb-8 md:py-12">
      <div className="mx-auto max-w-[1250px] px-4 md:px-8">
        <div className={`mx-auto max-w-3xl ${isArabic ? 'text-right' : 'text-center'}`}>
          <h2 className="text-3xl font-bold md:text-4xl" style={{ fontFamily: 'Georgia, serif' }}>
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/75 md:text-[15px]">{description}</p>
          <div className={`mt-8 flex flex-wrap gap-3.5 ${isArabic ? 'justify-end' : 'justify-center'}`}>
            <Link
              href={`/${locale}/contact`}
              className="hero-btn-glow-solid inline-flex h-[52px] cursor-pointer items-center gap-2 rounded-md bg-[#B38D42] px-7 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:border-[#9A7635] hover:bg-[#9A7635] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B38D42]"
            >
              {bookLabel}
              <ArrowIcon className={`h-3.5 w-3.5 ${isArabic ? 'rotate-180' : ''}`} />
            </Link>
            <a
              href="tel:+971504096028"
              className="hero-btn-glow-outline inline-flex h-[52px] cursor-pointer items-center gap-2 rounded-md bg-transparent px-7 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:bg-[rgba(179,141,66,0.10)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B38D42]"
            >
              {callLabel}
              <ArrowIcon className={`h-4 w-4 text-[#B38D42] ${isArabic ? 'rotate-180' : ''}`} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
