'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/lib/translations';
import { ServiceFeature, ServiceShowcaseItem, splitServiceTitle } from '@/lib/services-showcase';

function FeatureIcon({ type }: { type: ServiceFeature['icon'] }) {
  const className = 'h-5 w-5';

  switch (type) {
    case 'scales':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 3v18" />
          <path d="M5 8h14" />
          <path d="M7 21h10" />
          <path d="M9 8V5h6v3" />
        </svg>
      );
    case 'team':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'document':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
          <path d="M14 2v6h6" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
          <path d="M10 9H8" />
        </svg>
      );
    case 'building':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
          <path d="M6 12h12" />
          <path d="M10 6h4" />
          <path d="M10 10h4" />
          <path d="M10 16h4" />
        </svg>
      );
    case 'shield':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 3 4 7v6c0 4.4 3.4 8.5 8 9 4.6-.5 8-4.6 8-9V7l-8-4Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case 'chart':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 3v18h18" />
          <path d="M7 16V9" />
          <path d="M12 16V5" />
          <path d="M17 16v-6" />
        </svg>
      );
    default:
      return null;
  }
}

interface ServiceShowcaseBlockProps {
  item: ServiceShowcaseItem;
  index: number;
  locale: Locale;
  reversed?: boolean;
}

export default function ServiceShowcaseBlock({
  item,
  index,
  locale,
  reversed = false,
}: ServiceShowcaseBlockProps) {
  const isArabic = locale === 'ar';
  const sectionNumber = String(index + 1).padStart(2, '0');
  const { primary, accent } = splitServiceTitle(item.title);
  const imageOnRight = reversed !== isArabic;
  const imageOrder = imageOnRight ? 'lg:order-2' : 'lg:order-1';
  const contentOrder = imageOnRight ? 'lg:order-1' : 'lg:order-2';
  const frameOnStart = !imageOnRight;

  return (
    <section
      id={item.slug}
      className="relative scroll-mt-32 overflow-hidden bg-[#F1EFF0] py-10 md:py-12"
    >
      <div className="relative mx-auto max-w-[1250px] px-4 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image column */}
          <div className={`relative ${imageOrder}`}>
            <span
              className={`pointer-events-none absolute top-0 z-0 select-none text-[6rem] font-bold leading-none text-[#160A0A]/[0.04] md:-top-2 md:text-[8.5rem] ${
                frameOnStart ? 'start-0' : 'end-0'
              }`}
              aria-hidden
            >
              {sectionNumber}
            </span>
            <div
              className={`relative ${frameOnStart ? 'pt-[6px] ps-[6px]' : 'pt-[6px] pe-[6px]'}`}
            >
              {/* L-shaped accent frame — flush against image edge */}
              <div
                className={`pointer-events-none absolute top-0 z-0 h-[6px] w-full bg-[#B38D42] ${
                  frameOnStart ? 'start-0' : 'end-0'
                }`}
                aria-hidden
              />
              <div
                className={`pointer-events-none absolute top-0 z-0 h-full w-[6px] bg-[#B38D42] ${
                  frameOnStart ? 'start-0' : 'end-0'
                }`}
                aria-hidden
              />

              {/* Dot pattern */}
              <div
                className={`pointer-events-none absolute bottom-0 z-20 h-[72px] w-[72px] opacity-45 ${
                  frameOnStart ? 'start-0' : 'end-0'
                }`}
                style={{
                  backgroundImage: 'radial-gradient(#160A0A 1.15px, transparent 1.15px)',
                  backgroundSize: '8px 8px',
                }}
                aria-hidden
              />

              {/* Image */}
              <div className="group relative z-10 min-h-[280px] overflow-hidden bg-[#ece9ea] shadow-[0_18px_40px_-24px_rgba(22,10,10,0.35)] sm:min-h-[340px] lg:min-h-[430px]">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  quality={85}
                  className="object-cover object-center transition-transform duration-700 ease-out scale-[1.12] group-hover:scale-100"
                  sizes="(max-width: 1024px) calc(100vw - 32px), 625px"
                />
              </div>
            </div>
          </div>

          {/* Content column */}
          <div className={`relative ${contentOrder}`}>
            <div className={`flex items-center gap-3 ${isArabic ? 'justify-end' : ''}`}>
              <span className="text-sm font-semibold tracking-[0.08em] text-[#B38D42]">{sectionNumber}</span>
              <span className="h-px w-12 bg-[#B38D42]" aria-hidden />
            </div>

            <h2
              className={`mt-5 text-3xl font-bold uppercase leading-tight tracking-[0.03em] md:text-[2.35rem] ${
                isArabic ? 'text-right' : ''
              }`}
            >
              {accent ? (
                <>
                  <span className="text-[#160A0A]">{primary}</span>{' '}
                  <span className="text-[#B38D42]">{accent}</span>
                </>
              ) : (
                <span className="text-[#160A0A]">{item.title}</span>
              )}
            </h2>

            <p
              className={`mt-5 max-w-xl text-base leading-8 text-[#160A0A]/75 ${
                isArabic ? 'ms-auto text-right' : ''
              }`}
            >
              {item.description}
            </p>

            <div className={isArabic ? 'text-right' : ''}>
              <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5 sm:flex sm:flex-row sm:items-start sm:gap-6">
                {item.features.map((feature, featureIndex) => (
                  <div
                    key={feature.label}
                    className={`flex min-w-0 flex-1 items-stretch ${
                      featureIndex > 0
                        ? 'sm:border-s sm:border-[#160A0A]/15 sm:ps-5 md:ps-8'
                        : ''
                    }`}
                  >
                    <div className={`space-y-2 sm:space-y-3 ${isArabic ? 'sm:ms-auto sm:text-right' : ''}`}>
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full bg-[#B38D42]/15 text-[#B38D42] sm:h-12 sm:w-12 [&_svg]:h-4 [&_svg]:w-4 sm:[&_svg]:h-5 sm:[&_svg]:w-5 ${
                          isArabic ? 'sm:ms-auto' : ''
                        }`}
                      >
                        <FeatureIcon type={feature.icon} />
                      </span>
                      <p className="text-[11px] font-bold leading-snug text-[#160A0A] sm:text-sm">{feature.label}</p>
                    </div>
                  </div>
                ))}

                <Link
                  href={`/${locale}/${item.slug}`}
                  className={`hero-btn-glow-solid sm:hidden inline-flex h-[48px] w-full cursor-pointer items-center justify-center gap-1.5 self-center rounded-md bg-[#B38D42] px-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-200 hover:border-[#9A7635] hover:bg-[#9A7635] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B38D42] ${
                    isArabic ? 'flex-row-reverse' : ''
                  }`}
                >
                  {isArabic ? 'اعرف المزيد' : 'Learn More'}
                  <svg
                    className={`h-3 w-3 ${isArabic ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              <Link
                href={`/${locale}/${item.slug}`}
                className={`hero-btn-glow-solid mt-8 hidden h-[52px] cursor-pointer items-center gap-2 rounded-md bg-[#B38D42] px-7 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:border-[#9A7635] hover:bg-[#9A7635] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B38D42] sm:inline-flex ${
                  isArabic ? 'flex-row-reverse' : ''
                }`}
              >
                {isArabic ? 'اعرف المزيد' : 'Learn More'}
                <svg
                  className={`h-3.5 w-3.5 ${isArabic ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
