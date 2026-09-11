import Image from 'next/image';

const EXPERT_REPORTS_HERO_BG = '/assets/expert-reports/hero-bg.jpg';

function HighlightIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 3l7 4v5c0 4.5-3.2 7.8-7 9-3.8-1.2-7-4.5-7-9V7l7-4z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 3v18" />
      <path d="M5 8h14" />
      <path d="M7 21h10" />
      <path d="M9 8V5h6v3" />
    </svg>
  );
}

interface ExpertReportsHeroProps {
  isArabic: boolean;
  title: string;
  subtitle: string;
  highlights: string[];
}

export default function ExpertReportsHero({
  isArabic,
  title,
  subtitle,
  highlights,
}: ExpertReportsHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[#B38D42]/15 bg-[#100B0B] pt-24 text-white md:pt-28">
      <Image
        src={EXPERT_REPORTS_HERO_BG}
        alt="Professional legal expert reports in Dubai"
        fill
        priority
        className={`object-cover ${isArabic ? 'object-[25%_center]' : 'object-[75%_center]'}`}
        sizes="(max-width: 1920px) 100vw, 1920px"
      />
      <div
        className={`absolute inset-0 ${isArabic ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-[#100B0B]/90 via-[#100B0B]/55 to-[#100B0B]/15`}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#100B0B]/80 via-transparent to-[#100B0B]/30" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1250px] px-4 pb-10 md:px-8 md:pb-12">
        <div className={`max-w-3xl ${isArabic ? 'ms-auto text-right' : 'mx-auto text-center md:mx-0 md:text-left'}`}>
          <h1
            className="text-3xl font-bold leading-[1.08] text-white md:text-4xl lg:text-[2.85rem]"
            style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 18px rgba(0,0,0,0.45)' }}
          >
            {title}
          </h1>
          <p
            className="mt-3 max-w-2xl text-sm leading-7 text-white/85 md:text-[15px]"
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />

          <div className="mt-6 grid gap-3 sm:grid-cols-1 md:grid-cols-3">
            {highlights.map((item, index) => (
              <div
                key={item}
                className={`flex items-start gap-3 rounded-xl border border-[#B38D42]/25 bg-[#160A0A]/55 px-4 py-3 backdrop-blur-sm ${
                  isArabic ? 'flex-row-reverse text-right' : ''
                }`}
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#B38D42]/45 bg-[#B38D42]/15 text-[#B38D42]">
                  <HighlightIcon index={index} />
                </span>
                <span className="text-xs font-semibold leading-snug text-white/90 md:text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
