function ArrowIcon({ className = 'h-3.5 w-3.5', isRTL = false }: { className?: string; isRTL?: boolean }) {
  return (
    <svg
      className={`${className} ${isRTL ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

interface BlogsExploreCardProps {
  isRTL: boolean;
  eyebrow: string;
  title: string;
  description: string;
  articleCount: number;
  articlesCountLabel: string;
  viewAllLabel: string;
}

export default function BlogsExploreCard({
  isRTL,
  eyebrow,
  title,
  description,
  articleCount,
  articlesCountLabel,
  viewAllLabel,
}: BlogsExploreCardProps) {
  return (
    <div className="relative mb-12 overflow-hidden rounded-[20px] border border-[#B38D42]/20 bg-white px-6 py-8 shadow-[0_12px_40px_rgba(20,15,7,0.06)] md:px-10 md:py-10">
      <div
        className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-[#B38D42]/8 blur-3xl"
        aria-hidden="true"
      />

      <div className={`relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between ${isRTL ? 'text-right' : 'text-left'}`}>
        <div className={`flex items-start gap-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#B38D42]/20 bg-[#B38D42]/10 sm:flex">
            <svg className="h-7 w-7 text-[#B38D42]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>

          <div>
            <div className={`mb-3 flex items-center gap-3 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
              <span className="h-px w-8 shrink-0 bg-[#B38D42]" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B38D42]">{eyebrow}</p>
            </div>
            <h2 className="text-2xl font-bold text-[#160A0A] md:text-3xl" style={{ fontFamily: 'Georgia, serif' }}>
              {title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#160A0A]/65 md:text-[15px]">{description}</p>
          </div>
        </div>

        <div
          className={`flex shrink-0 items-center gap-4 rounded-2xl border border-[#B38D42]/15 bg-[#F1EFF0] px-5 py-4 ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <p className="text-3xl font-bold leading-none text-[#160A0A]">{articleCount}</p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B38D42]">
              {articlesCountLabel}
            </p>
          </div>
          <div className="h-10 w-px bg-[#B38D42]/20" aria-hidden="true" />
          <a
            href="#articles"
            className="hero-btn-glow-solid inline-flex h-[44px] cursor-pointer items-center gap-2 rounded-md bg-[#B38D42] px-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-200 hover:bg-[#9A7635] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B38D42]"
          >
            {viewAllLabel}
            <ArrowIcon isRTL={isRTL} />
          </a>
        </div>
      </div>
    </div>
  );
}
