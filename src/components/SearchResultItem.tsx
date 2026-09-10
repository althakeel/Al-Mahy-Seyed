'use client';

import Link from 'next/link';
import { SearchResult, SearchResultType } from '@/lib/search-index';
import { Locale } from '@/lib/translations';

interface SearchResultItemProps {
  result: SearchResult;
  locale: Locale;
  typeLabel: string;
  onClick?: () => void;
  className?: string;
  surface?: 'dark' | 'light';
}

function getDomain(href: string): string {
  try {
    return new URL(href).hostname.replace(/^www\./, '');
  } catch {
    return href;
  }
}

function TypeIcon({ type }: { type: SearchResultType }) {
  if (type === 'blog') {
    return (
      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    );
  }

  if (type === 'service') {
    return (
      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    );
  }

  if (type === 'external') {
    return (
      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    );
  }

  return (
    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function badgeClasses(type: SearchResultType, surface: 'dark' | 'light'): string {
  if (type === 'external') {
    return surface === 'light'
      ? 'border-[#160A0A]/15 bg-[#160A0A]/5 text-[#160A0A]/55'
      : 'border-white/15 bg-white/5 text-white/55';
  }

  if (type === 'service') {
    return 'border-[#B38D42]/30 bg-[#B38D42]/12 text-[#9A7635]';
  }

  if (type === 'blog') {
    return 'border-[#B38D42]/35 bg-[#B38D42]/15 text-[#B38D42]';
  }

  return 'border-[#B38D42]/25 bg-[#B38D42]/8 text-[#B38D42]';
}

export default function SearchResultItem({
  result,
  locale,
  typeLabel,
  onClick,
  className = '',
  surface = 'dark',
}: SearchResultItemProps) {
  const isRTL = locale === 'ar';
  const isExternal = result.isExternal || result.type === 'external' || result.href.startsWith('http');
  const isLight = surface === 'light';
  const domain = result.source || getDomain(result.href);

  const cardClasses = isExternal
    ? isLight
      ? 'border-[#160A0A]/10 bg-[#160A0A]/[0.03] hover:border-[#160A0A]/20 hover:bg-[#160A0A]/[0.05]'
      : 'border-white/10 bg-[#160A0A]/80 hover:border-[#B38D42]/25 hover:bg-[#160A0A]'
    : isLight
      ? 'border-[#B38D42]/20 bg-white shadow-[0_8px_24px_rgba(20,15,7,0.05)] hover:border-[#B38D42]/40 hover:shadow-[0_12px_28px_rgba(20,15,7,0.08)]'
      : 'border-[#B38D42]/20 bg-[#160A0A] hover:border-[#B38D42]/35 hover:bg-[#160A0A]/90';

  const titleClass = isLight && !isExternal ? 'text-[#160A0A]' : 'text-white';
  const descClass = isLight && !isExternal ? 'text-[#160A0A]/65' : 'text-white/65';
  const cardLayout = `flex h-full min-h-[176px] flex-col p-4 ${className}`;

  const content = (
    <>
      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${badgeClasses(result.type, surface)}`}
        >
          <TypeIcon type={result.type} />
          {typeLabel}
        </span>
        {isExternal ? (
          <span className="truncate text-[11px] font-semibold text-[#B38D42]">{domain}</span>
        ) : null}
      </div>

      <h2
        className={`line-clamp-2 text-base font-bold leading-snug ${titleClass}`}
        style={{ fontFamily: isLight && !isExternal ? 'Georgia, serif' : undefined }}
      >
        {result.title}
      </h2>

      <p className={`mt-1.5 line-clamp-2 text-sm leading-snug ${descClass}`}>
        {result.description}
      </p>

      <p className="mt-auto shrink-0 pt-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#B38D42]">
        {isExternal ? (
          <span className="inline-flex items-center gap-1">
            {locale === 'ar' ? 'زيارة المصدر' : 'Visit source'}
            <span aria-hidden="true">{locale === 'ar' ? '←' : '→'}</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1">
            {locale === 'ar' ? 'اقرأ المزيد' : 'Read more'}
            <span aria-hidden="true">{locale === 'ar' ? '←' : '→'}</span>
          </span>
        )}
      </p>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={result.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        dir={isRTL ? 'rtl' : 'ltr'}
        className={`block rounded-[16px] border text-start transition-all duration-200 ${cardClasses} ${cardLayout}`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={result.href}
      onClick={onClick}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`block rounded-[16px] border text-start transition-all duration-200 ${cardClasses} ${cardLayout}`}
    >
      {content}
    </Link>
  );
}
