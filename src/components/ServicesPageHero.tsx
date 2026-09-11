import Image from 'next/image';
import Link from 'next/link';
import { Locale, translations } from '@/lib/translations';
import { ServiceShowcaseItem } from '@/lib/services-showcase';
import ServicesStickyNav from '@/components/ServicesStickyNav';

function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function HeroFeatureIcon({ type, compact = false }: { type: 'shield' | 'team' | 'chart'; compact?: boolean }) {
  const className = `${compact ? 'h-4 w-4' : 'h-5 w-5'} text-[#B38D42]`;

  if (type === 'shield') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3 4 7v6c0 4.4 3.4 8.5 8 9 4.6-.5 8-4.6 8-9V7l-8-4Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }
  if (type === 'team') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 3v18h18" />
      <path d="M7 16V9" />
      <path d="M12 16V5" />
      <path d="M17 16v-6" />
    </svg>
  );
}

function HeroFeatureItem({
  feature,
  isArabic,
}: {
  feature: { label: string; icon: 'shield' | 'team' | 'chart' };
  isArabic: boolean;
}) {
  return (
    <div className={`flex min-w-0 items-center gap-3 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-[#B38D42]/40 bg-[#B38D42]/10">
        <HeroFeatureIcon type={feature.icon} />
      </span>
      <p className="text-sm font-semibold text-white">{feature.label}</p>
    </div>
  );
}

function HeroFeatureItemMobile({
  feature,
}: {
  feature: { label: string; icon: 'shield' | 'team' | 'chart' };
}) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-1.5 px-1 text-center">
      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-[#B38D42]/50 bg-[#B38D42]/12">
        <HeroFeatureIcon type={feature.icon} compact />
      </span>
      <p className="text-[11px] font-semibold leading-snug text-white">{feature.label}</p>
    </div>
  );
}

interface ServicesPageHeroProps {
  locale: Locale;
  services: ServiceShowcaseItem[];
}

export default function ServicesPageHero({ locale, services }: ServicesPageHeroProps) {
  const isArabic = locale === 'ar';
  const t = translations[locale];

  const heroFeatures = isArabic
    ? [
        { label: 'خبرة موثوقة', icon: 'shield' as const },
        { label: 'نهج يركز على العميل', icon: 'team' as const },
        { label: 'نتائج ملموسة', icon: 'chart' as const },
      ]
    : [
        { label: 'Trusted Expertise', icon: 'shield' as const },
        { label: 'Client Focused Approach', icon: 'team' as const },
        { label: 'Results Driven', icon: 'chart' as const },
      ];

  return (
    <>
      <section className="relative flex min-h-[460px] flex-col overflow-hidden text-white max-md:h-auto sm:min-h-[500px] md:block md:h-[min(560px,calc(100svh-88px))]">
        <Image
          src="/assets/banner/services-hero-bg.jpg"
          alt=""
          fill
          priority
          className={`object-cover ${isArabic ? 'object-left' : 'object-right'}`}
          sizes="(max-width: 1920px) 100vw, 1920px"
        />
        <div
          className={`absolute inset-0 ${
            isArabic ? 'bg-gradient-to-l' : 'bg-gradient-to-r'
          } from-[#160A0A]/92 via-[#160A0A]/72 to-[#160A0A]/30`}
          aria-hidden
        />
        <div className="absolute inset-0 bg-[#160A0A]/20" aria-hidden />

        <div className="relative z-10 mx-auto flex w-full max-w-[1250px] flex-1 flex-col px-4 pb-6 pt-24 md:h-full md:px-8 md:pb-24 md:pt-[6.25rem]">
          <div className="flex flex-1 items-start">
            <div className={`max-w-2xl pb-2 pt-1 lg:max-w-3xl ${isArabic ? 'ms-auto text-right' : ''}`}>
              <div className={`mb-5 flex items-center gap-3 ${isArabic ? 'justify-end' : ''}`}>
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#B38D42]">
                  {isArabic ? 'الماحي للخدمات القانونية' : 'Almahy for Legal Services'}
                </span>
                <span className="h-px w-10 bg-[#B38D42]" aria-hidden />
              </div>

              <h1
                className="text-3xl font-bold leading-[1.08] md:text-4xl lg:text-[2.85rem]"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {isArabic ? (
                  <>
                    <span className="text-white">{t.servicesHeroLine1}</span>{' '}
                    <span className="text-[#B38D42]">{t.servicesHeroHighlight}</span>
                    <br />
                    <span className="text-white">{t.servicesHeroLine2}</span>
                  </>
                ) : (
                  <>
                    <span className="text-white">{t.servicesHeroLine1}</span>
                    <br />
                    <span className="text-[#B38D42]">{t.servicesHeroHighlight}</span>
                    <br />
                    <span className="text-white">{t.servicesHeroLine2}</span>
                  </>
                )}
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/82 md:text-[15px]">
                {t.servicesIntro}
              </p>

              <div className={`mt-8 flex flex-wrap gap-3.5 max-sm:flex-col max-sm:items-stretch ${isArabic ? 'justify-end' : ''}`}>
                <Link
                  href={`/${locale}/contact`}
                  className="hero-btn-glow-solid inline-flex h-[52px] max-sm:w-full max-sm:justify-center cursor-pointer items-center gap-2 rounded-md bg-[#B38D42] px-7 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:border-[#9A7635] hover:bg-[#9A7635] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B38D42]"
                >
                  {isArabic ? 'تواصل معنا' : 'Contact Us'}
                  <ArrowIcon className={`h-3.5 w-3.5 ${isArabic ? 'rotate-180' : ''}`} />
                </Link>
                <a
                  href="#legal-services"
                  className="hero-btn-glow-outline inline-flex h-[52px] max-sm:w-full max-sm:justify-center cursor-pointer items-center gap-2 rounded-md bg-transparent px-7 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:bg-[rgba(179,141,66,0.10)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B38D42]"
                >
                  {isArabic ? 'استعرض الخدمات' : 'Browse Services'}
                  <ArrowIcon className={`h-4 w-4 text-[#B38D42] ${isArabic ? 'rotate-180' : ''}`} />
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="relative z-10 border-t border-white/15 bg-[#160A0A]/60 backdrop-blur-sm md:hidden">
          <div className="mx-auto grid max-w-[1250px] grid-cols-2 gap-3 px-4 py-3.5">
            <HeroFeatureItemMobile feature={heroFeatures[0]} />
            <HeroFeatureItemMobile feature={heroFeatures[2]} />
            <div className="col-span-2 flex justify-center border-t border-white/10 pt-3">
              <div className="w-full max-w-[220px]">
                <HeroFeatureItemMobile feature={heroFeatures[1]} />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 hidden border-t border-white/15 bg-[#160A0A]/55 backdrop-blur-sm md:block">
          <div className="mx-auto flex max-w-[1250px] items-center justify-between gap-3 px-8 py-4">
            {heroFeatures.map((feature, index) => (
              <div key={feature.label} className="contents">
                {index > 0 && <div className="h-10 w-px bg-white/20" aria-hidden />}
                <div className="flex flex-1">
                  <HeroFeatureItem feature={feature} isArabic={isArabic} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServicesStickyNav locale={locale} services={services} />
    </>
  );
}
