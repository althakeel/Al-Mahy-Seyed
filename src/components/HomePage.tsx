"use client";

import Link from "next/link";
import { translations, Locale } from "@/lib/translations";

import FAQ from "@/components/FAQ";
import ServicesSection from "@/components/ServicesSection";
import GoogleReviews from "@/components/GoogleReviews";
import Stats from "@/components/Stats";
import ClientLogosMarquee from "@/components/ClientLogosMarquee";
import AboutSectionWithVideo from "@/components/AboutSectionWithVideo";
import HeroLegalSearchPanel from "@/components/HeroLegalSearchPanel";
import HeroBackgroundSlider from "@/components/HeroBackgroundSlider";
import { getHeroSlides } from "@/lib/hero-slides";

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

interface HomePageProps {
  locale: Locale;
}

export default function HomePage({ locale }: HomePageProps) {
  const lang = locale;
  const isRTL = lang === "ar";
  const t = translations[lang];

  const heroSlides = getHeroSlides(lang);
  const currentSlide = heroSlides[0];
  const headlineLines = currentSlide.headline;

  const yearsCount = 38;

  const heroOverlayGradient = isRTL
    ? "linear-gradient(270deg, rgba(10,6,6,0.94) 0%, rgba(10,6,6,0.82) 43%, rgba(10,6,6,0.58) 70%, rgba(10,6,6,0.42) 100%)"
    : "linear-gradient(90deg, rgba(10,6,6,0.94) 0%, rgba(10,6,6,0.82) 43%, rgba(10,6,6,0.58) 70%, rgba(10,6,6,0.42) 100%)";

  return (
    <div dir={isRTL ? "rtl" : "ltr"} lang={lang} className="w-full overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative flex min-h-[680px] w-full items-center overflow-hidden bg-[#100B0B] max-md:min-h-[580px] md:min-h-[720px]">
        <HeroBackgroundSlider slides={heroSlides} activeIndex={0} isRTL={isRTL} />

        <div className="absolute inset-0" style={{ background: heroOverlayGradient }} aria-hidden="true" />
        <div className="absolute inset-0 bg-[rgba(10,6,6,0.22)] min-[901px]:hidden" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#100B0B] to-transparent" aria-hidden="true" />

        <div className="relative z-10 w-full px-4 py-24 max-md:py-24 md:px-8 md:py-32">
          <div className="mx-auto grid w-full max-w-[1250px] grid-cols-1 items-center gap-8 min-[901px]:grid-cols-[minmax(0,1fr)_380px] min-[901px]:gap-10">
            {/* Left copy */}
            <div
              className={`hero-fade-up ${isRTL ? "text-right min-[901px]:order-2 min-[901px]:pl-6 lg:pl-10" : "text-left min-[901px]:order-1 min-[901px]:pl-6 lg:pl-10"}`}
            >
              <div className={`mb-5 flex items-center gap-3 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
                <span className="h-px w-8 shrink-0 bg-[#B38D42]" aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B38D42]">
                  {isRTL ? "دَع المحكمة لنا" : "Leave Court To Us"}
                </p>
              </div>

              <h1
                className="max-w-[620px] font-semibold leading-[1.08] text-white"
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(30px, 3.6vw, 54px)",
                }}
              >
                {headlineLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                {currentSlide.headlineLine3Prefix || currentSlide.headlineLine3Gold ? (
                  <span className="block">
                    {currentSlide.headlineLine3Prefix ? <span>{currentSlide.headlineLine3Prefix}</span> : null}
                    {currentSlide.headlineLine3Gold ? (
                      <span className="text-[#B38D42]">{currentSlide.headlineLine3Gold}</span>
                    ) : null}
                  </span>
                ) : null}
              </h1>

              <div className={`mt-5 h-px max-w-[620px] bg-[rgba(179,141,66,0.35)] ${isRTL ? "mr-0 ml-auto" : ""}`} aria-hidden="true" />

              <p className="mt-5 max-w-[580px] text-[15px] leading-[1.65] text-[rgba(255,255,255,0.78)] md:text-[16px]">
                {isRTL
                  ? "استشارات قانونية وخدمات شركات وتوثيق وحلول متكاملة للأفراد والشركات في جميع أنحاء الإمارات."
                  : "Trusted legal consultation, corporate services, notary support, and practical solutions for individuals and businesses across the UAE."}
              </p>

              <div className={`mt-8 flex flex-wrap gap-3.5 max-sm:flex-col max-sm:items-stretch ${isRTL ? "justify-end max-sm:items-stretch" : "justify-start"}`}>
                <Link
                  href={`/${lang}/services`}
                  translate="no"
                  className="notranslate hero-btn-glow-solid inline-flex h-[52px] max-sm:w-full max-sm:justify-center items-center gap-2 rounded-md bg-[#B38D42] px-7 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:border-[#9A7635] hover:bg-[#9A7635] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B38D42]"
                >
                  <span translate="no" className="notranslate">
                    {isRTL ? "اعرف المزيد" : "Learn More"}
                  </span>
                  <ArrowIcon className={`h-3.5 w-3.5 ${isRTL ? "rotate-180" : ""}`} />
                </Link>
                <Link
                  href={`/${lang}/contact`}
                  translate="no"
                  className="notranslate hero-btn-glow-outline inline-flex h-[52px] max-sm:w-full max-sm:justify-center items-center gap-2 rounded-md bg-transparent px-7 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:bg-[rgba(179,141,66,0.10)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B38D42]"
                >
                  <span translate="no" className="notranslate">
                    {isRTL ? "تواصل معنا" : "Contact Us"}
                  </span>
                  <ArrowIcon className={`h-4 w-4 text-[#B38D42] ${isRTL ? "rotate-180" : ""}`} />
                </Link>
              </div>
            </div>

            {/* Right glass panel */}
            <div className={`hero-fade-up-delay relative min-[901px]:mt-10 min-[901px]:translate-y-3 ${isRTL ? "min-[901px]:order-1" : "min-[901px]:order-2"}`}>
              <div
                className="pointer-events-none absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(179,141,66,0.12),transparent_68%)]"
                aria-hidden="true"
              />

              <div className="hero-glass-card-wrap mx-auto w-full max-w-[380px] min-[901px]:ml-auto min-[901px]:mr-0">
                <div className="hero-glass-card w-full rounded-[15px] p-5 min-[901px]:p-6">
                  <div className={`relative z-[1] ${isRTL ? "text-right" : "text-left"}`}>
                    <p
                      className="text-[clamp(52px,5.5vw,64px)] font-bold leading-none text-[#B38D42]"
                      style={{ fontFamily: '"Mizra", Georgia, serif' }}
                    >
                      {yearsCount}
                    </p>
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white">
                      {isRTL ? "عامًا من التميز القانوني" : "Years of Legal Excellence"}
                    </p>
                    <p className="mt-1.5 text-[13px] text-[#D0CACA]">
                      {isRTL ? "موثوقون في دبي وجميع الإمارات" : "Trusted across Dubai & the UAE"}
                    </p>
                  </div>

                  <div className="relative z-[1] my-5 h-px w-full bg-[rgba(179,141,66,0.35)]" aria-hidden="true" />

                  <HeroLegalSearchPanel locale={lang} align={isRTL ? "end" : "start"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClientLogosMarquee locale={lang} />

      <AboutSectionWithVideo
        t={{
          aboutTestimonial: t.aboutTestimonial,
          aboutUsLabel: t.aboutUsLabel,
          aboutHeadlineLine1: t.aboutHeadlineLine1,
          aboutHeadlineLine2: t.aboutHeadlineLine2,
          aboutYearsStat: t.aboutYearsStat,
          aboutYearsLabel: t.aboutYearsLabel,
          aboutTrustedLine1: t.aboutTrustedLine1,
          aboutTrustedLine2: t.aboutTrustedLine2,
          aboutTrustedLine3: t.aboutTrustedLine3,
          aboutTrustedLine4: t.aboutTrustedLine4,
          aboutDescription: t.aboutDescription,
        }}
        isRTL={isRTL}
      />

      <ServicesSection locale={lang} />

      <Stats locale={lang} />

      <GoogleReviews locale={lang} />

      <FAQ locale={lang} />
    </div>
  );
}
