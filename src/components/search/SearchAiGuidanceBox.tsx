import Link from 'next/link';
import SearchAiAnswer from '@/components/search/SearchAiAnswer';

interface WebSource {
  title: string;
  url: string;
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function ArrowIcon({ isRTL }: { isRTL: boolean }) {
  return (
    <svg
      className={`h-3.5 w-3.5 ${isRTL ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

interface SearchAiGuidanceBoxProps {
  isRTL: boolean;
  locale: string;
  title: string;
  loading: boolean;
  loadingText: string;
  failed: boolean;
  failedText: string;
  answer: string | null;
  disclaimer: string | null;
  webSources: WebSource[];
  webSourcesLabel: string;
  consultationLabel: string;
}

export default function SearchAiGuidanceBox({
  isRTL,
  locale,
  title,
  loading,
  loadingText,
  failed,
  failedText,
  answer,
  disclaimer,
  webSources,
  webSourcesLabel,
  consultationLabel,
}: SearchAiGuidanceBoxProps) {
  if (!loading && !answer && !failed) return null;

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="mb-2 overflow-hidden rounded-[20px] border border-[#B38D42]/45 bg-[#160A0A] p-6 shadow-[0_16px_48px_rgba(0,0,0,0.35)] md:p-8"
    >
      <div className={`mb-4 flex items-center gap-3 ${isRTL ? 'text-right' : 'text-left'}`}>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#B38D42]/35 bg-[#B38D42]/12 text-[#B38D42]">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </span>
        <h2 className="text-lg font-bold text-white md:text-xl" style={{ fontFamily: 'Georgia, serif' }}>
          {title}
        </h2>
      </div>

      {loading ? (
        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}>
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#B38D42]/25 border-t-[#B38D42]" aria-hidden="true" />
          <p className="text-sm text-white/60">{loadingText}</p>
        </div>
      ) : answer ? (
        <>
          <SearchAiAnswer text={answer} isRTL={isRTL} />

          {webSources.length > 0 ? (
            <div className="mt-6">
              <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#B38D42] ${isRTL ? 'text-right' : 'text-left'}`}>
                {webSourcesLabel}
              </p>
              <ul className="space-y-2">
                {webSources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-start gap-3 rounded-xl border border-[#B38D42]/20 bg-[#100B0B]/60 px-4 py-3 text-sm transition hover:border-[#B38D42]/40 hover:bg-[#100B0B] ${isRTL ? 'text-right' : 'text-left'}`}
                    >
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#B38D42]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-white">{source.title}</span>
                        <span className="mt-0.5 block text-xs text-[#B38D42]/80">{getDomain(source.url)}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {disclaimer ? (
            <p className={`mt-5 rounded-xl border border-[#B38D42]/15 bg-[#100B0B]/50 px-4 py-3 text-xs leading-relaxed text-white/55 ${isRTL ? 'text-right' : 'text-left'}`}>
              {disclaimer}
            </p>
          ) : null}

          <div className={`mt-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            <Link
              href={`/${locale}/contact`}
              className={`hero-btn-glow-solid inline-flex h-[44px] items-center gap-2 rounded-md bg-[#B38D42] px-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-200 hover:bg-[#9A7635] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B38D42] ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {consultationLabel}
              <ArrowIcon isRTL={isRTL} />
            </Link>
          </div>
        </>
      ) : failed ? (
        <p className={`text-sm text-white/60 ${isRTL ? 'text-right' : 'text-left'}`}>{failedText}</p>
      ) : null}
    </div>
  );
}
