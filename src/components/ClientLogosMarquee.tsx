"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { Locale } from "@/lib/translations";

interface ClientLogosMarqueeProps {
  locale: Locale;
}

const MARQUEE_DURATION = "72s";
const LOGO_SIZES = "150px";

const clientLogos = [
  "040031_4e4c054a279d43dbbb2e32def9e72924mv2-768x274.png",
  "1.png",
  "1613050665_logo.png",
  "1685008699800.png",
  "Asset-1-3-1-768x286.png",
  "ax-768x280.png",
  "BHM-capital-Logo-768x232.png",
  "Bonyan-Holding-Logo-sq-01-e1623654456180.png",
  "cropped-respect-services-logo-3.png",
  "da4hrg7jK2jcFpBjt6JYw5XMcWlBW9bMwfWf8mPx.png",
  "download-1.png",
  "download.png",
  "dsi-logo-dark-2020.png",
  "f8160898-1de9-4e45-8a47-6c3d54f86a3e_16x9_1200x676-768x432.png",
  "IMG-20241120-WA0060.png",
  "IMG-20241120-WA0067.png",
  "IMG-20241120-WA0075 (1).png",
  "IMG-20241120-WA0077 (1).png",
  "IMG-20241120-WA0078 (1).png",
  "IMG-20241121-WA0000 (1).png",
  "jointscopetechnologies_logo (1).png",
  "logo-1.png",
  "logo-2-768x146 (1).png",
  "logo-400-px.png",
  "Mansory-logo-1600x400-1-768x192.png",
  "Masha-Text-horizontal-logo-768x179.png",
  "Novo-Nordisk-Logo-768x480.png",
  "PGI-Group-Logo-01-1-768x630.png",
  "R.png",
  "Schneider-Electric-768x388.png",
  "tabarak_logo_03.png",
  "Tadbery-150-x-60-px.png",
  "the-ONE-Clinic-logo-768x463.png",
  "white_logo_transparent_background-2048x1229-1-768x461.png",
];

function LogoCard({
  src,
  alt,
  delayMs,
  duplicate = false,
}: {
  src: string;
  alt: string;
  delayMs: number;
  duplicate?: boolean;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <li
      className="client-logo-border-wrap shrink-0"
      aria-hidden={duplicate || undefined}
      style={
        {
          "--border-delay": `${delayMs}ms`,
        } as CSSProperties
      }
    >
      <div className="client-logo-border-inner flex h-[72px] w-[168px] items-center justify-center px-3 md:h-[76px] md:w-[176px]">
        <Image
          src={imgSrc}
          alt={duplicate ? "" : alt}
          width={150}
          height={56}
          sizes={LOGO_SIZES}
          className="max-h-14 w-auto max-w-[150px] object-contain"
          onError={() => setImgSrc("/assets/logos/fallback.png")}
        />
      </div>
    </li>
  );
}

export default function ClientLogosMarquee({ locale }: ClientLogosMarqueeProps) {
  const isArabic = locale === "ar";

  return (
    <section className="relative overflow-hidden bg-white py-8 md:py-10">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#B38D42]/35 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#B38D42]/20 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#B38D42]" aria-hidden="true" />
            <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#B38D42]">
              {isArabic ? "عملاؤنا" : "Our Clients"}
            </p>
            <span className="h-px w-8 bg-[#B38D42]" aria-hidden="true" />
          </div>

          <h2 className="mt-3 text-[clamp(1.35rem,2.6vw,1.85rem)] font-bold leading-tight text-[#160A0A]">
            {isArabic ? "موثوقون من شركات رائدة" : "Trusted by leading companies"}
          </h2>
        </div>

        <div className="relative mt-6 h-[92px] overflow-hidden md:mt-7 md:h-[96px]" dir="ltr">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-24" />

          <ul
            className={`flex w-max items-center gap-4 md:gap-5 ${isArabic ? "animate-marquee-right" : "animate-marquee-left"}`}
            style={{ animationDuration: MARQUEE_DURATION, willChange: "transform" }}
          >
            {clientLogos.map((logo, index) => (
              <LogoCard
                key={`primary-${logo}`}
                src={`/assets/logos/${logo}`}
                alt={logo.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ")}
                delayMs={(index % 10) * 320}
              />
            ))}
            {clientLogos.map((logo, index) => (
              <LogoCard
                key={`duplicate-${logo}`}
                src={`/assets/logos/${logo}`}
                alt={logo.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ")}
                delayMs={(index % 10) * 320}
                duplicate
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
