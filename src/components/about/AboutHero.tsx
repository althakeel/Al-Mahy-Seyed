import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/lib/translations';

const HERO_IMAGE = '/assets/bannerSlider/hero-team-group-v6.png';

function ArrowIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

type AboutStat = {
  value: string;
  label: string;
};

interface AboutHeroProps {
  locale: Locale;
  eyebrow: string;
  title: string;
  bookLabel: string;
  callLabel: string;
  stats: AboutStat[];
}

export default function AboutHero({
  locale,
  eyebrow,
  title,
  bookLabel,
  callLabel,
  stats,
}: AboutHeroProps) {
  const isArabic = locale === 'ar';

  return (
    <section className="relative flex min-h-[680px] w-full items-center overflow-hidden bg-[#100B0B] md:min-h-[720px]">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: isArabic ? 'center' : 'center 32%' }}
        />
        <div className="absolute inset-0 bg-[#100B0B]/80" />
      </div>

      <div className="relative z-10 w-full px-4 pb-14 pt-28 md:px-8 md:pb-16 md:pt-32 lg:px-8">
        <div className="mx-auto w-full max-w-[1250px]">
          <div className={`max-w-2xl text-left ${isArabic ? 'ml-0 mr-auto' : ''}`}>
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 shrink-0 bg-[#B38D42]" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B38D42]">{eyebrow}</p>
          </div>

          <h1
            className="text-4xl font-bold leading-[1.08] text-white md:text-5xl lg:text-[3.35rem]"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {title}
          </h1>

          <div className="mt-8 flex flex-wrap justify-start gap-3.5">
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

          <div className="mt-10 grid max-w-md grid-cols-2 gap-x-7 gap-y-7 sm:gap-x-10 sm:gap-y-8 md:mt-12">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
                  {stat.value}
                </p>
                <p
                  className={`mt-2 text-[11px] font-semibold tracking-[0.16em] text-[#B38D42]/90 sm:text-xs ${
                    isArabic ? 'normal-case' : 'uppercase'
                  }`}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
