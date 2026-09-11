import Image from 'next/image';
import { Locale } from '@/lib/translations';

function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

const LEGAL_SERVICES_HERO_BG = '/assets/banner/legal-services-hero-bg.jpg';

interface LegalServicesHeroProps {
  locale: Locale;
  copy: {
    brand: string;
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    bookConsultation: string;
    practiceAreasTitle: string;
  };
}

export default function LegalServicesHero({ locale, copy }: LegalServicesHeroProps) {
  const isArabic = locale === 'ar';

  return (
    <section className="relative min-h-[420px] overflow-hidden bg-[#100B0B] pt-28 text-white md:min-h-[480px] md:pt-32">
      <Image
        src={LEGAL_SERVICES_HERO_BG}
        alt=""
        fill
        priority
        className={`object-cover ${isArabic ? 'object-[20%_center]' : 'object-[80%_center]'}`}
        sizes="(max-width: 1920px) 100vw, 1920px"
      />
      <div
        className={`absolute inset-0 ${
          isArabic ? 'bg-gradient-to-l' : 'bg-gradient-to-r'
        } from-[#100B0B]/92 via-[#160A0A]/78 to-[#160A0A]/25`}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[#100B0B]/20" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1250px] px-4 pb-14 md:px-8 md:pb-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className={`lg:col-span-8 ${isArabic ? 'text-right' : 'text-left'}`}>
            <div className={`mb-5 flex items-center gap-3 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
              <span className="h-px w-8 shrink-0 bg-[#B38D42]" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B38D42]">
                {copy.brand} · {copy.badge}
              </p>
            </div>

            <h1
              className="max-w-3xl text-3xl font-bold leading-[1.08] text-white md:text-4xl lg:text-[2.85rem]"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {copy.title}
            </h1>
            <p className="mt-4 text-lg font-medium text-white/90">{copy.subtitle}</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 md:text-[15px]">{copy.description}</p>
          </div>

          <div
            className={`flex flex-wrap gap-3.5 max-sm:flex-col max-sm:items-stretch lg:col-span-4 ${
              isArabic ? 'justify-start lg:justify-start' : 'justify-start lg:justify-end'
            }`}
          >
            <a
              href="https://wa.me/971504096028?text=Hello%2C%20I%20need%20legal%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn-glow-solid inline-flex h-[52px] max-sm:w-full max-sm:justify-center cursor-pointer items-center gap-2 rounded-md bg-[#B38D42] px-7 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:border-[#9A7635] hover:bg-[#9A7635] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B38D42]"
            >
              {copy.bookConsultation}
              <ArrowIcon className={`h-3.5 w-3.5 ${isArabic ? 'rotate-180' : ''}`} />
            </a>
            <a
              href="#practice-areas"
              className="hero-btn-glow-outline inline-flex h-[52px] max-sm:w-full max-sm:justify-center cursor-pointer items-center gap-2 rounded-md bg-transparent px-7 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:bg-[rgba(179,141,66,0.10)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B38D42]"
            >
              {copy.practiceAreasTitle}
              <ArrowIcon className={`h-4 w-4 text-[#B38D42] ${isArabic ? 'rotate-180' : ''}`} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
