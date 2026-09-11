import Image from 'next/image';
import Link from 'next/link';

function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

export type CountryItem = {
  slug: string;
  name: string;
  enSummary: string;
  arSummary: string;
  image: string;
  metaEn: string;
  metaAr: string;
};

interface SecondPassportCountriesSectionProps {
  isArabic: boolean;
  lang: string;
  eyebrow: string;
  title: string;
  description: string;
  disclaimer: string;
  viewDetailsLabel: string;
  countries: CountryItem[];
}

function CountryCard({
  country,
  index,
  isArabic,
  lang,
  viewDetailsLabel,
  featured = false,
}: {
  country: CountryItem;
  index: number;
  isArabic: boolean;
  lang: string;
  viewDetailsLabel: string;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/${lang}/second-passport/${country.slug}`}
      className={`group flex flex-col overflow-hidden rounded-[18px] border border-[#B38D42]/20 bg-white shadow-[0_12px_28px_rgba(20,15,7,0.06)] transition-all duration-250 hover:-translate-y-1 hover:border-[#B38D42]/45 hover:shadow-[0_18px_36px_rgba(20,15,7,0.1)] ${
        featured ? 'md:col-span-2' : ''
      } ${isArabic ? 'text-right' : 'text-left'}`}
    >
      <div className={`relative overflow-hidden ${featured ? 'aspect-[16/10] md:aspect-[21/10]' : 'aspect-[16/10]'}`}>
        <Image
          src={country.image}
          alt={country.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#100B0B]/75 via-[#100B0B]/20 to-transparent" aria-hidden="true" />
        <span
          className={`absolute top-4 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-[#B38D42]/55 bg-[#100B0B]/80 px-3 text-lg font-bold tracking-wide text-[#B38D42] backdrop-blur-sm ${
            isArabic ? 'left-4' : 'right-4'
          }`}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B38D42]">
          {isArabic ? country.metaAr : country.metaEn}
        </p>
        <h3 className="mt-2 text-xl font-bold text-[#160A0A] transition-colors group-hover:text-[#9A7635] md:text-2xl">
          {country.name}
        </h3>
        <div className="mt-2 h-px w-10 bg-[#B38D42]/45" aria-hidden="true" />
        <p className="mt-3 flex-1 text-sm leading-7 text-[#160A0A]/70 md:text-[15px]">
          {isArabic ? country.arSummary : country.enSummary}
        </p>
        <span
          className={`mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#B38D42] transition-colors group-hover:text-[#9A7635] ${
            isArabic ? 'flex-row-reverse justify-end' : ''
          }`}
        >
          {viewDetailsLabel}
          <ArrowIcon className={`h-3.5 w-3.5 ${isArabic ? 'rotate-180' : ''}`} />
        </span>
      </div>
    </Link>
  );
}

export default function SecondPassportCountriesSection({
  isArabic,
  lang,
  eyebrow,
  title,
  description,
  disclaimer,
  viewDetailsLabel,
  countries,
}: SecondPassportCountriesSectionProps) {
  return (
    <section id="countries" className="scroll-mt-24 bg-white py-10 md:py-12">
      <div className="mx-auto max-w-[1250px] px-4 md:px-8">
        <div className={`mb-7 max-w-2xl ${isArabic ? 'ms-auto text-right' : ''}`}>
          <div className={`mb-3 flex items-center gap-3 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
            <span className="h-px w-8 bg-[#B38D42]" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B38D42]">{eyebrow}</p>
          </div>
          <h2 className="text-3xl font-bold text-[#160A0A] md:text-4xl">{title}</h2>
          <p className="mt-3 text-sm leading-7 text-[#160A0A]/70 md:text-[15px]">{description}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {countries.map((country, index) => (
            <CountryCard
              key={country.slug}
              country={country}
              index={index}
              isArabic={isArabic}
              lang={lang}
              viewDetailsLabel={viewDetailsLabel}
              featured={index === 0}
            />
          ))}
        </div>

        <p className={`mt-5 text-xs leading-5 text-[#160A0A]/50 ${isArabic ? 'text-right' : 'text-left'}`}>
          {disclaimer}
        </p>
      </div>
    </section>
  );
}
