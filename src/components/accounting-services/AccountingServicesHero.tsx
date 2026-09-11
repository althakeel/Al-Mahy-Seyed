import Image from 'next/image';
import Link from 'next/link';

const ACCOUNTING_HERO_BG = '/assets/services/accounting-hero-bg.jpg';

function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

interface AccountingServicesHeroProps {
  isArabic: boolean;
  lang: string;
  badge: string;
  title: string;
  subtitle: string;
  chips: string[];
  ctaText: string;
  contactLabel: string;
}

export default function AccountingServicesHero({
  isArabic,
  lang,
  badge,
  title,
  subtitle,
  chips,
  ctaText,
  contactLabel,
}: AccountingServicesHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[#B38D42]/15 bg-[#100B0B] pt-24 text-white md:pt-28">
      <div className="absolute inset-0">
        <Image
          src={ACCOUNTING_HERO_BG}
          alt=""
          fill
          priority
          className={`object-cover ${isArabic ? 'object-[15%_center]' : 'object-[85%_center]'}`}
          sizes="(max-width: 1920px) 100vw, 1920px"
        />
        <div
          className={`absolute inset-0 ${isArabic ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-[#100B0B]/92 via-[#100B0B]/72 to-[#100B0B]/20`}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#100B0B]/70 via-transparent to-[#100B0B]/25" aria-hidden="true" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1250px] px-4 pb-10 md:px-8 md:pb-12">
        <div className={`max-w-2xl ${isArabic ? 'ms-auto text-right' : 'text-left'}`}>
          <div className={`mb-3 flex items-center gap-3 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
            <span className="h-px w-8 shrink-0 bg-[#B38D42]" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B38D42]">{badge}</p>
          </div>

          <h1
            className="text-3xl font-bold leading-[1.08] text-white md:text-4xl lg:text-[2.85rem]"
            style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 18px rgba(0,0,0,0.45)' }}
          >
            {title}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-white/85 md:text-[15px]">{subtitle}</p>

          <div className={`mt-4 flex flex-wrap gap-2 ${isArabic ? 'justify-end' : ''}`}>
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-[#B38D42]/45 bg-[#B38D42]/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#E8D5A8]"
              >
                {chip}
              </span>
            ))}
          </div>

          <div className={`mt-6 flex flex-wrap gap-3 max-sm:flex-col max-sm:items-stretch ${isArabic ? 'justify-end' : ''}`}>
            <a
              href="https://wa.me/971504096028?text=Hello%2C%20I%20would%20like%20to%20schedule%20a%20consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn-glow-solid inline-flex h-[52px] max-sm:w-full max-sm:justify-center cursor-pointer items-center gap-2 rounded-md bg-[#B38D42] px-7 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:border-[#9A7635] hover:bg-[#9A7635] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B38D42]"
            >
              {ctaText}
              <ArrowIcon className={`h-3.5 w-3.5 ${isArabic ? 'rotate-180' : ''}`} />
            </a>
            <Link
              href={`/${lang}/contact`}
              className="hero-btn-glow-outline inline-flex h-[52px] max-sm:w-full max-sm:justify-center cursor-pointer items-center gap-2 rounded-md bg-transparent px-7 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:bg-[rgba(179,141,66,0.10)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B38D42]"
            >
              {contactLabel}
              <ArrowIcon className={`h-4 w-4 text-[#B38D42] ${isArabic ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
