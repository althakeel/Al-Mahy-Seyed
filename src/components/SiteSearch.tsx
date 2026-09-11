'use client';

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Locale } from '@/lib/translations';
import { POPULAR_SEARCHES, SearchResult } from '@/lib/search-index';
import { addRecentSearch, clearRecentSearches, getRecentSearches } from '@/lib/recent-searches';

interface SiteSearchProps {
  locale: Locale;
  variant?: 'navbar' | 'hero' | 'page';
  className?: string;
  showPopular?: boolean;
  showRecent?: boolean;
  heroTone?: 'light' | 'dark';
  maxPopular?: number;
  maxRecent?: number;
  accentColor?: string;
  initialQuery?: string;
}

const labels = {
  en: {
    placeholder: 'Ask a legal question or search services...',
    search: 'Search',
    popular: 'Popular searches',
    recent: 'Recent searches',
    clearRecent: 'Clear',
    noResults: 'No results found',
    viewAll: 'View all results, Google links & AI guidance',
    aiHint: 'Get AI legal guidance on the results page',
    type: { page: 'Page', service: 'Service', blog: 'Article', external: 'External' },
  },
  ar: {
    placeholder: 'اطرح سؤالاً قانونياً أو ابحث عن خدمة...',
    search: 'بحث',
    popular: 'عمليات بحث شائعة',
    recent: 'عمليات البحث الأخيرة',
    clearRecent: 'مسح',
    noResults: 'لا توجد نتائج',
    viewAll: 'عرض النتائج وروابط Google والإرشاد القانوني',
    aiHint: 'احصل على إرشاد قانوني بالذكاء الاصطناعي في صفحة النتائج',
    type: { page: 'صفحة', service: 'خدمة', blog: 'مقال', external: 'خارجي' },
  },
};

export default function SiteSearch({
  locale,
  variant = 'navbar',
  className = '',
  showPopular = variant === 'hero',
  showRecent = variant === 'hero',
  heroTone = 'light',
  maxPopular,
  maxRecent = 4,
  accentColor = '#DE3B34',
  initialQuery = '',
}: SiteSearchProps) {
  const router = useRouter();
  const t = labels[locale];
  const isRTL = locale === 'ar';
  const accentHover = accentColor === '#B38D42' ? '#9A7635' : '#c73731';
  const isGoldAccent = accentColor === '#B38D42';
  const isGoldNavbar = variant === 'navbar' && isGoldAccent;
  const isGoldHero = variant === 'hero' && isGoldAccent && heroTone === 'dark';
  const isGoldPage = variant === 'page' && isGoldAccent;

  const [query, setQuery] = useState(initialQuery);
  const [expanded, setExpanded] = useState(variant !== 'navbar');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const runSearch = useCallback(
    async (value: string) => {
      const trimmed = value.trim();
      if (!trimmed) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(trimmed)}&locale=${locale}`,
          { cache: 'no-store' }
        );
        const data = (await response.json()) as { results?: SearchResult[] };
        setResults(data.results ?? []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    },
    [locale]
  );

  useEffect(() => {
    if (variant === 'page') {
      setQuery(initialQuery);
    }
  }, [initialQuery, variant]);

  useEffect(() => {
    if (showRecent) {
      setRecentSearches(getRecentSearches(locale));
    }
  }, [locale, showRecent]);

  useEffect(() => {
    if (!dropdownOpen && variant === 'navbar') return;

    const timer = setTimeout(() => {
      void runSearch(query);
    }, 280);

    return () => clearTimeout(timer);
  }, [query, runSearch, dropdownOpen, variant]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
        if (variant === 'navbar') setExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [variant]);

  const goToSearchPage = (value?: string) => {
    const q = (value ?? query).trim();
    if (!q) return;
    if (showRecent) {
      setRecentSearches(addRecentSearch(locale, q));
    }
    setDropdownOpen(false);
    if (variant === 'navbar') setExpanded(false);
    const nextUrl = `/${locale}/search?q=${encodeURIComponent(q)}`;
    router.push(nextUrl);
    router.refresh();
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    goToSearchPage();
  };

  const showDropdown =
    dropdownOpen &&
    (loading || results.length > 0 || query.trim().length > 0) &&
    variant !== 'page';

  const heroInputPadding = isGoldHero || isGoldPage
    ? (isRTL ? 'pl-[46px]' : 'pr-[46px]')
    : isRTL
      ? 'pl-12'
      : 'pr-12';
  const isDarkHero = variant === 'hero' && heroTone === 'dark';
  const isLightDropdown = variant === 'hero' && !isDarkHero;

  const inputClasses =
    isGoldHero
      ? `h-[52px] w-full rounded-full border border-[rgba(179,141,66,0.65)] bg-[rgba(0,0,0,0.28)] pl-5 ${heroInputPadding} text-sm text-white placeholder:text-[rgba(255,255,255,0.48)] transition-colors duration-200 focus:border-[#B38D42] focus:bg-[rgba(0,0,0,0.35)] focus:outline-none focus:ring-2 focus:ring-[#B38D42]/35`
      : variant === 'hero' && isDarkHero
      ? `w-full rounded-full border border-white/20 bg-black/25 px-5 py-4 ${heroInputPadding} text-base text-white backdrop-blur-sm placeholder:text-white/50 focus:border-[#DE3B34]/60 focus:bg-black/35 focus:outline-none focus:ring-2 focus:ring-[#DE3B34]/30`
      : variant === 'hero'
      ? `w-full rounded-full border border-white/20 bg-white/95 px-5 py-3.5 ${heroInputPadding} text-base text-[#160A0A] shadow-sm placeholder:text-slate-400 focus:border-[#DE3B34] focus:outline-none focus:ring-2 focus:ring-[#DE3B34]/20`
      : variant === 'page'
        ? `w-full rounded-xl border border-[#B38D42]/35 bg-[#160A0A] px-5 py-3.5 text-base text-white placeholder:text-white/45 shadow-[0_8px_24px_rgba(0,0,0,0.25)] focus:border-[#B38D42] focus:outline-none focus:ring-2 focus:ring-[#B38D42]/30 ${heroInputPadding}`
        : isGoldNavbar
          ? 'w-full rounded-full border border-[#B38D42] bg-[#170C0C]/95 px-4 py-2 text-sm text-white placeholder:text-[#CECDCB] transition-colors hover:border-[#E8D5A8] focus:border-[#E8D5A8] focus:outline-none focus:ring-1 focus:ring-[#B38D42]/50'
          : 'w-full rounded-full border border-[#6C2B27] bg-[#170C0C]/95 px-4 py-2 text-sm text-white placeholder:text-[#CECDCB] focus:border-[#DE3B34] focus:outline-none focus:ring-1 focus:ring-[#DE3B34]/40';

  const tagClass = (dark: boolean) =>
    isGoldHero
      ? 'cursor-pointer rounded-full border border-[rgba(255,255,255,0.20)] bg-[rgba(255,255,255,0.035)] px-3.5 py-1.5 text-[11px] font-medium text-[rgba(255,255,255,0.82)] transition-all duration-200 hover:border-[#B38D42] hover:bg-[rgba(179,141,66,0.10)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B38D42]'
      : dark
      ? 'rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/75 transition hover:border-[#DE3B34]/40 hover:bg-white/10 hover:text-white'
      : 'rounded-full border border-[#E6DFD8] bg-white px-3 py-1 text-[11px] font-medium text-[#160A0A] transition hover:border-[#DE3B34] hover:bg-[#DE3B34]/5 hover:text-[#c73731]';

  const labelClass = isGoldHero ? 'text-[#D0CACA]' : isDarkHero ? 'text-white/50' : 'text-slate-500';

  const visibleRecent = (maxRecent ? recentSearches.slice(0, maxRecent) : recentSearches);
  const visiblePopular = (maxPopular ? POPULAR_SEARCHES[locale].slice(0, maxPopular) : POPULAR_SEARCHES[locale]);

  if (variant === 'navbar' && !expanded) {
    return (
      <button
        type="button"
        onClick={() => {
          setExpanded(true);
          setDropdownOpen(true);
          setTimeout(() => inputRef.current?.focus(), 50);
        }}
        className={`hidden md:flex h-9 w-9 items-center justify-center rounded-full border bg-[#170C0C]/95 transition-colors hover:bg-[#241212] ${
          isGoldNavbar
            ? 'border-[#B38D42] text-[#E8D5A8] hover:border-[#E8D5A8]'
            : 'border-[#6C2B27] text-[#F0D4D2] hover:border-[#DE3B34]'
        } ${className}`}
        aria-label={t.search}
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${className}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className={`relative flex-1 ${variant === 'navbar' ? 'w-36 md:w-40 lg:w-52' : 'w-full'}`}>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setDropdownOpen(true);
            }}
            onFocus={() => setDropdownOpen(true)}
            placeholder={t.placeholder}
            className={inputClasses}
            aria-label={t.placeholder}
            autoComplete="off"
          />
          {variant !== 'navbar' ? (
            <button
              type="submit"
              className={`absolute top-1/2 z-10 -translate-y-1/2 flex items-center justify-center rounded-full text-white transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B38D42] ${
                isGoldHero || isGoldPage
                  ? 'h-[38px] w-[38px] cursor-pointer bg-[#B38D42] hover:bg-[#9A7635] shadow-[0_0_12px_rgba(179,141,66,0.35)]'
                  : 'h-9 w-9 cursor-pointer bg-[#DE3B34] hover:bg-[#c73731]'
              } ${isRTL ? 'left-1.5' : 'right-1.5'}`}
              aria-label={t.search}
            >
              <svg className={`${isGoldHero ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          ) : null}
        </div>

        {variant === 'navbar' ? (
          <button
            type="submit"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition"
            style={{ backgroundColor: accentColor }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = accentHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = accentColor;
            }}
            aria-label={t.search}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        ) : null}
      </form>

      {variant === 'hero' && (showRecent || showPopular) ? (
        <div className={`mt-3 space-y-2.5 ${isRTL ? 'text-right' : 'text-left'}`}>
          {showRecent && visibleRecent.length > 0 ? (
            <div>
              <div className={`mb-1.5 flex items-center gap-2 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                <span className={`text-[10px] font-semibold uppercase tracking-wide ${labelClass}`}>
                  {t.recent}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    clearRecentSearches(locale);
                    setRecentSearches([]);
                  }}
                  className={`text-[10px] font-medium transition hover:text-white ${isGoldHero ? 'text-[#B38D42]' : 'text-[#F0716B]'}`}
                >
                  {t.clearRecent}
                </button>
              </div>
              <div className={`flex flex-wrap gap-1.5 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                {visibleRecent.map((term) => (
                  <button key={term} type="button" onClick={() => goToSearchPage(term)} className={tagClass(isDarkHero)}>
                    <span className="inline-flex items-center gap-1">
                      <svg className="h-3 w-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {term}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {showPopular ? (
            <div>
              <p className={`mb-1.5 text-[10px] font-semibold uppercase tracking-wide ${labelClass}`}>
                {t.popular}
              </p>
              <div className={`flex flex-wrap gap-1.5 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                {visiblePopular.map((term) => (
                  <button key={term} type="button" onClick={() => goToSearchPage(term)} className={tagClass(isDarkHero)}>
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {showDropdown ? (
        <div
          className={`absolute z-[60] mt-2 overflow-hidden rounded-2xl border backdrop-blur-xl ${
            isGoldHero
              ? 'left-0 right-0 border-[rgba(179,141,66,0.40)] bg-[rgba(15,10,10,0.96)] shadow-[0_18px_40px_rgba(0,0,0,0.5)]'
              : isDarkHero
              ? 'left-0 right-0 border-white/10 bg-[#160A0A]/95 shadow-[0_18px_40px_rgba(0,0,0,0.5)]'
              : variant === 'hero'
              ? 'left-0 right-0 border-[#E6DFD8] bg-white/98 shadow-[0_18px_40px_rgba(22,10,10,0.15)]'
              : variant === 'navbar'
                ? `right-0 w-80 bg-[#1A0D0D]/98 shadow-[0_18px_40px_rgba(0,0,0,0.45)] ${
                    isGoldNavbar ? 'border border-[#B38D42]/40' : 'border border-[#6C2B27]'
                  }`
                : 'left-0 right-0 border border-[#6C2B27] bg-[#1A0D0D]/98 shadow-[0_18px_40px_rgba(0,0,0,0.45)]'
          }`}
        >
          {loading ? (
            <p className={`px-4 py-3 text-sm ${isLightDropdown ? 'text-slate-500' : 'text-[#CECDCB]'}`}>
              {locale === 'ar' ? 'جاري البحث...' : 'Searching...'}
            </p>
          ) : results.length > 0 ? (
            <ul className="max-h-72 overflow-y-auto py-1">
              {results.slice(0, 6).map((result) => {
                const isExternal = result.isExternal || result.type === 'external' || result.href.startsWith('http');
                const isLight = isLightDropdown;
                const itemContent = (
                  <>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                          isLight
                            ? 'bg-[#DE3B34]/10 text-[#c73731]'
                            : isGoldNavbar || isGoldHero
                              ? 'bg-[#B38D42]/20 text-[#B38D42]'
                              : 'bg-[#DE3B34]/20 text-[#F0D4D2]'
                        }`}
                      >
                        {t.type[result.type as keyof typeof t.type] ?? result.type}
                      </span>
                      {isExternal ? (
                        <svg className={`h-3 w-3 ${isLight ? 'text-slate-400' : 'text-white/40'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      ) : null}
                      <span className={`text-sm font-semibold line-clamp-1 ${isLight ? 'text-[#160A0A]' : 'text-[#F0D4D2]'}`}>
                        {result.title}
                      </span>
                    </div>
                    <p className={`mt-1 text-xs line-clamp-2 ${isLight ? 'text-slate-500' : 'text-[#CECDCB]'}`}>
                      {result.description}
                    </p>
                  </>
                );

                const hoverClass = isLight ? 'hover:bg-[#F1EFF0]' : 'hover:bg-[#2A1414]';

                return (
                  <li key={result.id}>
                    {isExternal ? (
                      <a
                        href={result.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          setDropdownOpen(false);
                          if (variant === 'navbar') setExpanded(false);
                        }}
                        className={`block px-4 py-3 transition ${hoverClass}`}
                      >
                        {itemContent}
                      </a>
                    ) : (
                      <Link
                        href={result.href}
                        onClick={() => {
                          setDropdownOpen(false);
                          if (variant === 'navbar') setExpanded(false);
                        }}
                        className={`block px-4 py-3 transition ${hoverClass}`}
                      >
                        {itemContent}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : query.trim() ? (
            <p className={`px-4 py-3 text-sm ${isLightDropdown ? 'text-slate-500' : 'text-[#CECDCB]'}`}>{t.noResults}</p>
          ) : null}

          {query.trim() ? (
            <>
              <p className={`border-t px-4 py-2 text-[11px] ${isLightDropdown ? 'border-[#E6DFD8] text-slate-400' : 'border-white/10 text-[#CECDCB]'}`}>
                {t.aiHint}
              </p>
              <button
                type="button"
                onClick={() => goToSearchPage()}
                className={`w-full border-t px-4 py-3 text-left text-sm font-semibold transition ${
                  isLightDropdown ? 'border-[#E6DFD8] hover:bg-[#F1EFF0]' : 'border-white/10 hover:bg-white/5'
                }`}
                style={{ color: isGoldAccent ? accentColor : variant === 'navbar' ? accentColor : '#DE3B34' }}
              >
                {t.viewAll} →
              </button>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
