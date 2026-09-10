import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/lib/translations';

const HERO_IMAGE = '/images/about/team-bg-v6.png';
/** Visual pull-back scale — overscan size compensates so edges stay full-bleed */
const HERO_IMAGE_SCALE = 0.94;
const HERO_IMAGE_OVERSCAN = `${(100 / HERO_IMAGE_SCALE).toFixed(4)}%`;

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
    <section className="relative min-h-[580px] overflow-hidden bg-[#100B0B] md:min-h-[680px]">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/*
          scale(0.94) alone leaves ~3% gaps per side (section bg shows through).
          Overscan the wrapper to 100/0.94% before scaling so the photo stays full-bleed.
        */}
        <div
          className="absolute left-1/2 top-1/2 origin-center"
          style={{
            width: HERO_IMAGE_OVERSCAN,
            height: HERO_IMAGE_OVERSCAN,
            transform: `translate(-50%, -50%) scale(${HERO_IMAGE_SCALE})`,
          }}
        >
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            className={`object-cover ${isArabic ? 'object-[28%_center]' : 'object-[72%_center]'}`}
          />
        </div>

        {/* Directional overlay: heavy on the text side, open on the team-photo side */}
        <div
          className={`absolute inset-0 ${
            isArabic ? 'bg-gradient-to-l' : 'bg-gradient-to-r'
          } from-[#100B0B]/97 via-[#160A0A]/65 to-[#160A0A]/12`}
        />

        {/* Bottom fade for depth — slightly stronger for stats readability on the left */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#100B0B]/92 via-[#100B0B]/28 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1250px] px-4 pb-14 pt-28 md:pb-16 md:pt-32 lg:px-8">
        <div className={`max-w-2xl ${isArabic ? 'ms-auto text-right' : 'text-left'}`}>
          <div className={`mb-5 flex items-center gap-3 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
            <span className="h-px w-8 shrink-0 bg-[#B38D42]" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B38D42]">{eyebrow}</p>
          </div>

          <h1
            className="text-4xl font-bold leading-[1.08] text-white md:text-5xl lg:text-[3.35rem]"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {title}
          </h1>

          <div className={`mt-8 flex flex-wrap gap-3.5 ${isArabic ? 'justify-end' : 'justify-start'}`}>
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
    </section>
  );
}
