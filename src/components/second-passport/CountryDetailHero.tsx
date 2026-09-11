import Link from 'next/link';
import FallbackImage from '@/components/FallbackImage';

function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

interface CountryDetailHeroProps {
  isArabic: boolean;
  lang: string;
  backLabel: string;
  eyebrow: string;
  heroTitle: string;
  heroLead: string;
  timeline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  whatsappHelpUrl: string;
  heroImage: string;
}

export default function CountryDetailHero({
  isArabic,
  lang,
  backLabel,
  eyebrow,
  heroTitle,
  heroLead,
  timeline,
  ctaPrimary,
  ctaSecondary,
  whatsappHelpUrl,
  heroImage,
}: CountryDetailHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[#B38D42]/15 bg-[#100B0B] pt-24 text-white md:pt-28">
      <FallbackImage
        src={heroImage}
        fallbackSrc={heroImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-45"
        loading="eager"
      />
      <div
        className={`absolute inset-0 ${isArabic ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-[#100B0B]/92 via-[#160A0A]/78 to-[#160A0A]/45`}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#100B0B]/75 via-transparent to-[#100B0B]/25" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1250px] px-4 pb-10 md:px-8 md:pb-12">
        <div className={`max-w-4xl ${isArabic ? 'ms-auto text-right' : 'text-left'}`}>
          <Link
            href={`/${lang}/second-passport`}
            className={`mb-5 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70 transition hover:text-[#B38D42] ${
              isArabic ? 'flex-row-reverse' : ''
            }`}
          >
            {backLabel}
          </Link>

          <div className={`mb-3 flex items-center gap-3 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
            <span className="h-px w-8 shrink-0 bg-[#B38D42]" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B38D42]">{eyebrow}</p>
          </div>

          <h1
            className="text-3xl font-bold leading-[1.08] text-white md:text-4xl lg:text-[2.85rem]"
            style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 18px rgba(0,0,0,0.45)' }}
          >
            {heroTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/90 md:text-[15px]">{heroLead}</p>
          <p className="mt-3 inline-flex rounded-full border border-[#B38D42]/35 bg-[#B38D42]/10 px-3 py-1 text-xs font-semibold tracking-wide text-[#E8D5A8]">
            {timeline}
          </p>

          <div className={`mt-6 flex flex-wrap gap-3 max-sm:flex-col max-sm:items-stretch ${isArabic ? 'justify-end' : ''}`}>
            <a
              href={whatsappHelpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn-glow-solid inline-flex h-[52px] max-sm:w-full max-sm:justify-center cursor-pointer items-center gap-2 rounded-md bg-[#B38D42] px-7 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:border-[#9A7635] hover:bg-[#9A7635] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B38D42]"
            >
              {ctaPrimary}
              <ArrowIcon className={`h-3.5 w-3.5 ${isArabic ? 'rotate-180' : ''}`} />
            </a>
            <Link
              href={`/${lang}/contact`}
              className="hero-btn-glow-outline inline-flex h-[52px] max-sm:w-full max-sm:justify-center cursor-pointer items-center gap-2 rounded-md bg-transparent px-7 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:bg-[rgba(179,141,66,0.10)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B38D42]"
            >
              {ctaSecondary}
              <ArrowIcon className={`h-4 w-4 text-[#B38D42] ${isArabic ? 'rotate-180' : ''}`} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
