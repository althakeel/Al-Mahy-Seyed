"use client";

import Image from "next/image";
import { useState } from "react";

const GOLD = "#B38D42";

interface AboutSectionCopy {
  aboutTestimonial: string;
  aboutUsLabel: string;
  aboutHeadlineLine1: string;
  aboutHeadlineLine2: string;
  aboutYearsStat: string;
  aboutYearsLabel: string;
  aboutTrustedLine1: string;
  aboutTrustedLine2: string;
  aboutTrustedLine3: string;
  aboutTrustedLine4: string;
  aboutDescription: string;
}

interface AboutSectionWithVideoProps {
  t: AboutSectionCopy;
  isRTL: boolean;
}

function TrustedPeopleIcon() {
  return (
    <svg width="30" height="28" viewBox="0 0 30 28" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="4" stroke={GOLD} strokeWidth="1.4" />
      <path d="M3 21c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="19" cy="10" r="3.2" stroke={GOLD} strokeWidth="1.4" />
      <path d="M14.5 21c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="24" cy="8.5" r="2.8" stroke={GOLD} strokeWidth="1.4" />
      <path d="M20.5 20c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export default function AboutSectionWithVideo({ t, isRTL }: AboutSectionWithVideoProps) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="flex w-full justify-center overflow-x-hidden bg-[#F3F1EE] px-4 py-16 md:px-6 md:py-20">
      {showVideo ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative aspect-video w-full max-w-2xl overflow-hidden rounded-2xl bg-black shadow-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/RDLS01Qs4Ok?si=udvZIHdWIztKqztG&autoplay=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full"
            />
            <button
              type="button"
              className="absolute right-2 top-2 rounded-full bg-white/80 p-2 hover:bg-white"
              onClick={() => setShowVideo(false)}
              aria-label="Close video"
            >
              <svg width="24" height="24" fill="none" stroke="#160A0A" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
          </div>
        </div>
      ) : null}

      <div
        className="relative w-full max-w-[1240px] overflow-hidden rounded-[28px] border border-[#E8E4DF] bg-[#FAFAF8] shadow-[0_24px_60px_rgba(22,10,10,0.08)]"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="pointer-events-none absolute inset-y-8 left-1/2 hidden w-px -translate-x-1/2 bg-[#E8E4DF] lg:block" aria-hidden="true" />
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left — video, stats, testimonial */}
          <div className="relative flex flex-col items-center justify-center bg-[#F7F5F2] px-6 py-12 md:px-10 md:py-14">
            <div className="flex w-full max-w-[540px] items-center justify-center gap-2 sm:gap-3 md:gap-4">
              {/* Years stat — left of circle */}
              <div
                className={`hidden min-w-0 flex-1 flex-col justify-center sm:flex ${
                  isRTL ? "items-start text-left" : "items-end text-right"
                }`}
              >
                <p
                  className="text-[clamp(36px,3.6vw,48px)] font-bold leading-none text-[#B38D42]"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {t.aboutYearsStat}
                </p>
                <span className="my-2 block h-px w-full max-w-[108px] bg-[#B38D42]" aria-hidden="true" />
                <p className="max-w-[96px] text-[9px] font-semibold uppercase leading-[1.45] tracking-[0.13em] text-[#160A0A]">
                  {t.aboutYearsLabel}
                </p>
              </div>

              {/* Circular video thumbnail */}
              <div className="relative z-[1] shrink-0 rounded-full border border-[#B38D42]/35 p-[4px] shadow-[0_10px_32px_rgba(22,10,10,0.10)]">
                <div className="h-[208px] w-[208px] rounded-full border-[2.5px] border-[#B38D42] bg-white p-[3px] sm:h-[228px] sm:w-[228px] md:h-[248px] md:w-[248px]">
                  <div className="relative h-full w-full overflow-hidden rounded-full">
                    <Image
                      src="/assets/videotump.webp"
                      alt="Scales of justice - Almahy Legal Services"
                      fill
                      className="object-cover grayscale-[18%]"
                      sizes="248px"
                    />
                    <button
                      type="button"
                      className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/5 transition hover:bg-black/15"
                      onClick={() => setShowVideo(true)}
                      aria-label="Play video"
                    >
                      <span className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-white shadow-[0_6px_20px_rgba(0,0,0,0.16)]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M8.5 6.2L17.5 12L8.5 17.8V6.2Z" fill={GOLD} />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Trusted badge — right of circle */}
              <div className={`hidden min-w-0 flex-1 items-start gap-2 sm:flex ${isRTL ? "flex-row-reverse" : ""}`}>
                <div className="min-w-0 pt-1">
                  <TrustedPeopleIcon />
                  <div
                    className={`mt-2 text-[9px] font-semibold uppercase leading-[1.5] tracking-[0.11em] text-[#160A0A] ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    <span className="block">{t.aboutTrustedLine1}</span>
                    <span className="block">{t.aboutTrustedLine2}</span>
                    <span className="block">{t.aboutTrustedLine3}</span>
                    <span className="block">{t.aboutTrustedLine4}</span>
                  </div>
                </div>
                <span className="mt-1 h-[92px] w-px shrink-0 bg-[#B38D42]" aria-hidden="true" />
              </div>
            </div>

            {/* Mobile stats row */}
            <div className="mt-5 flex w-full max-w-[540px] min-w-0 items-start justify-between gap-4 pb-2 sm:hidden">
              <div className={`min-w-0 shrink ${isRTL ? "text-left" : "text-right"}`}>
                <p className="text-4xl font-bold leading-none text-[#B38D42]" style={{ fontFamily: "Georgia, serif" }}>
                  {t.aboutYearsStat}
                </p>
                <span className="my-1.5 block h-px w-16 bg-[#B38D42]" aria-hidden="true" />
                <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#160A0A]">
                  {t.aboutYearsLabel}
                </p>
              </div>
              <div className={`flex min-w-0 items-start gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                <div className="min-w-0">
                  <TrustedPeopleIcon />
                  <div
                    className={`mt-1.5 text-[8px] font-semibold uppercase leading-[1.45] tracking-[0.08em] text-[#160A0A] min-[360px]:text-[9px] min-[360px]:tracking-[0.1em] ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    <span className="block">{t.aboutTrustedLine1}</span>
                    <span className="block">{t.aboutTrustedLine2}</span>
                    <span className="block">{t.aboutTrustedLine3}</span>
                    <span className="block">{t.aboutTrustedLine4}</span>
                  </div>
                </div>
                <span className="h-[88px] w-px shrink-0 bg-[#B38D42]" aria-hidden="true" />
              </div>
            </div>

            {/* Overlapping testimonial card — stack below stats on mobile; overlap from sm+ only */}
            <div className="relative z-[3] mt-5 w-full max-w-[400px] px-2 sm:-mt-12 sm:mt-0">
              <div className="relative rounded-2xl border border-[rgba(179,141,66,0.18)] bg-[rgba(179,141,66,0.10)] px-6 pb-6 pt-10 shadow-[0_14px_36px_rgba(22,10,10,0.08)] backdrop-blur-[2px]">
                <div className="absolute left-1/2 top-0 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#B38D42] text-sm font-bold leading-none text-white shadow-md">
                  &ldquo;
                </div>
                <blockquote
                  className="mt-3 text-center text-[14px] italic leading-[1.75] text-[#160A0A]/82 md:text-[15px]"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {t.aboutTestimonial}
                </blockquote>
              </div>
            </div>
          </div>

          {/* Right — about copy */}
          <div className="flex flex-col justify-center px-8 py-12 md:px-12 md:py-16 lg:px-14">
            <div className={`mb-5 flex items-center gap-3 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B38D42]">
                {t.aboutUsLabel}
              </span>
              <span className="h-px w-8 bg-[#B38D42]" aria-hidden="true" />
            </div>

            <h2
              className="max-w-[480px] text-[clamp(28px,3.2vw,42px)] font-normal leading-[1.12] text-[#160A0A]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              <span className="block">{t.aboutHeadlineLine1}</span>
              <span className="block">{t.aboutHeadlineLine2}</span>
            </h2>

            <div className={`my-6 h-px w-full max-w-[480px] bg-[#B38D42]/55 ${isRTL ? "mr-0 ml-auto" : ""}`} aria-hidden="true" />

            <p className="max-w-[480px] text-[15px] leading-[1.85] text-[#160A0A]/80 md:text-[16px]">
              {t.aboutDescription}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
