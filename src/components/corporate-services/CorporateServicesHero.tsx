import Image from 'next/image';

function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

interface CorporateServicesHeroProps {
  isArabic: boolean;
  badge: string;
  title: string;
  subtitle: string;
  highlights: string[];
}

export default function CorporateServicesHero({
  isArabic,
  badge,
  title,
  subtitle,
  highlights,
}: CorporateServicesHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[#B38D42]/15 bg-[#100B0B] pt-28 text-white md:pt-32">
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/assets/services/corporate-team.webp"
          alt=""
          fill
          priority
          className="object-cover opacity-30"
          sizes="(max-width: 1920px) 100vw, 1920px"
        />
      </div>
      <div className={`absolute inset-y-0 hidden w-[52%] md:block ${isArabic ? 'left-0' : 'right-0'}`}>
        <Image
          src="/assets/services/corporate-team.webp"
          alt="Corporate legal services and business setup in Dubai"
          fill
          priority
          className="object-cover object-center"
          sizes="52vw"
        />
        <div
          className={`absolute inset-0 ${isArabic ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-[#100B0B]/95 via-[#100B0B]/70 to-transparent`}
          aria-hidden="true"
        />
      </div>
      <div
        className={`absolute inset-0 hidden md:block ${isArabic ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-[#100B0B]/92 via-[#160A0A]/80 to-transparent`}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1250px] px-4 pb-14 md:px-8 md:pb-16">
        <div className={`max-w-2xl ${isArabic ? 'ms-auto text-right' : 'text-left'}`}>
          <div className={`mb-5 flex items-center gap-3 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
            <span className="h-px w-8 bg-[#B38D42]" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B38D42]">{badge}</p>
          </div>

          <h1
            className="text-3xl font-bold leading-[1.08] text-white md:text-4xl lg:text-[2.85rem]"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/80 md:text-[15px]">{subtitle}</p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <div
                key={item}
                className={`flex items-start gap-3 rounded-xl border border-[#B38D42]/25 bg-[#160A0A]/55 px-4 py-3 backdrop-blur-sm ${
                  isArabic ? 'flex-row-reverse text-right' : ''
                }`}
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#B38D42]/45 bg-[#B38D42]/15 text-xs font-bold text-[#B38D42]">
                  ✓
                </span>
                <span className="text-sm font-semibold leading-snug text-white/90">{item}</span>
              </div>
            ))}
          </div>

          <div className={`mt-8 ${isArabic ? 'flex justify-end' : ''}`}>
            <a
              href="https://wa.me/971504096028?text=Hello%2C%20I%20need%20corporate%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn-glow-solid inline-flex h-[52px] max-sm:w-full max-sm:justify-center cursor-pointer items-center gap-2 rounded-md bg-[#B38D42] px-7 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:border-[#9A7635] hover:bg-[#9A7635] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B38D42]"
            >
              Book Consultation
              <ArrowIcon className={`h-3.5 w-3.5 ${isArabic ? 'rotate-180' : ''}`} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
