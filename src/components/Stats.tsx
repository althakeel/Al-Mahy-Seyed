'use client';

import { Locale } from '@/lib/translations';
import { useEffect, useState, useRef } from 'react';

type StatIconType = 'landmark' | 'award' | 'scale' | 'users' | 'file' | 'globe';

interface StatItem {
  number: string;
  label: string;
  icon: StatIconType;
}

interface StatProps {
  number: string;
  label: string;
  icon: StatIconType;
  isArabic?: boolean;
}

function formatLabelLines(label: string, isArabic: boolean): string[] {
  if (isArabic) return [label];

  const upper = label.toUpperCase();
  const lineBreaks: Record<string, string[]> = {
    'YEARS OF EXPERIENCE': ['YEARS OF', 'EXPERIENCE'],
    'PROFESSIONAL TEAM MEMBERS': ['PROFESSIONAL TEAM', 'MEMBERS'],
    'LEGAL DOCUMENTS PROCESSED': ['LEGAL DOCUMENTS', 'PROCESSED'],
  };

  return lineBreaks[upper] ?? [upper];
}

function StatWatermarkIcon({ type }: { type: StatIconType }) {
  const strokeProps = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (type) {
    case 'landmark':
      return (
        <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden="true">
          <path {...strokeProps} d="M3 21h18M5 21V10l7-6 7 6v11" />
          <path {...strokeProps} d="M8 21v-5h8v5" />
          <path {...strokeProps} d="M8 10h1v4M11 10h1v4M14 10h1v4M17 10h1v4" />
          <path {...strokeProps} d="M7 10h10" />
        </svg>
      );
    case 'award':
      return (
        <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden="true">
          <path
            {...strokeProps}
            d="M12 4c-3.5 0-6 2.2-6 5.5 0 2.2 1.2 4.1 3 5.2M12 4c3.5 0 6 2.2 6 5.5 0 2.2-1.2 4.1-3 5.2"
          />
          <path {...strokeProps} d="M6 14.7 8 21h8l2-6.3M9 21v-3M15 21v-3" />
          <path {...strokeProps} d="M8.5 8.5c.8-1.2 2-2 3.5-2s2.7.8 3.5 2" />
        </svg>
      );
    case 'scale':
      return (
        <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden="true">
          <path {...strokeProps} d="M12 3v18M5 7h14" />
          <path {...strokeProps} d="M5 7c0 3-2 5.5-4 6.5M19 7c0 3 2 5.5 4 6.5" />
          <path {...strokeProps} d="M1 13.5h8M15 13.5h8" />
          <path {...strokeProps} d="M5 21h14" />
        </svg>
      );
    case 'users':
      return (
        <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden="true">
          <circle {...strokeProps} cx="9" cy="8" r="3" />
          <circle {...strokeProps} cx="17" cy="9" r="2.5" />
          <path {...strokeProps} d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M14 20c0-2.2 1.8-4 4-4" />
        </svg>
      );
    case 'file':
      return (
        <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden="true">
          <path {...strokeProps} d="M8 3h8l4 4v14H8V3z" />
          <path {...strokeProps} d="M16 3v4h4M10 12h8M10 16h8M10 8h4" />
        </svg>
      );
    case 'globe':
      return (
        <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden="true">
          <circle {...strokeProps} cx="12" cy="12" r="9" />
          <path {...strokeProps} d="M3 12h18M12 3c2.5 2.8 4 6.2 4 9s-1.5 6.2-4 9M12 3c-2.5 2.8-4 6.2-4 9s1.5 6.2 4 9" />
        </svg>
      );
    default:
      return null;
  }
}

function SectionScaleWatermark() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="stat-section-bg-decor pointer-events-none absolute right-[70px] top-[30px] h-[200px] w-[200px] text-[#B38D42] opacity-[0.045]"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2v20M4 8h16" />
      <path d="M4 8c0 3.5-2.5 6.5-5 8M20 8c0 3.5 2.5 6.5 5 8" />
      <path d="M0 16h8M16 16h8" />
      <path d="M6 22h12" />
    </svg>
  );
}

function StatCard({ number, label, icon, isArabic = false }: StatProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  const targetNumber = parseFloat(number.replace(/[^0-9.]/g, ''));
  const hasPlus = number.includes('+');
  const hasPercent = number.includes('%');
  const hasB = number.includes('B');

  // SSR + first paint show the real value — never start at 0.
  const [count, setCount] = useState(targetNumber);

  const formatValue = (value: number) => {
    const numeric = hasB ? value.toFixed(2) : Math.round(value).toLocaleString('en-US');
    let formatted = hasB ? `${numeric}B` : numeric;
    if (hasPlus) formatted += '+';
    if (hasPercent) formatted += '%';
    return formatted;
  };

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const inViewOnMount = el.getBoundingClientRect().top < window.innerHeight * 0.92;
    if (inViewOnMount) return;

    // Below the fold: reset before the user scrolls here so they see the count-up, not a flash of 0 on load.
    setCount(0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimatedRef.current) return;
        hasAnimatedRef.current = true;

        const duration = 2000;
        const steps = 60;
        const increment = targetNumber / steps;
        let current = 0;

        const timer = window.setInterval(() => {
          current += increment;
          if (current >= targetNumber) {
            setCount(targetNumber);
            window.clearInterval(timer);
          } else {
            setCount(current);
          }
        }, duration / steps);

        observer.disconnect();
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [targetNumber]);

  const displayValue = () => formatValue(count);

  const labelLines = formatLabelLines(label, isArabic);
  const formattedNumber = displayValue();
  const isLongNumber = formattedNumber.replace(/[^0-9]/g, '').length >= 5;

  return (
    <div ref={cardRef} className="stat-luxury-card group">
      <div className="stat-watermark" aria-hidden="true">
        <StatWatermarkIcon type={icon} />
      </div>

      <div className="relative z-[2] flex w-full flex-col items-center">
        <div className={`stat-number-gold ${isLongNumber ? 'stat-number-gold--long' : ''}`}>
          {formattedNumber}
        </div>

        <div className={`stat-label ${isArabic ? 'normal-case tracking-normal' : ''}`}>
          {labelLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </div>

        <div className="stat-divider" aria-hidden="true">
          <span className="line" />
          <span className="diamond" />
          <span className="line" />
        </div>
      </div>
    </div>
  );
}

export default function Stats({ locale }: { locale: Locale }) {
  const isArabic = locale === 'ar';

  const content: Record<
    Locale,
    {
      badge: string;
      title: string;
      stats: StatItem[];
    }
  > = {
    en: {
      badge: 'OUR ACHIEVEMENTS',
      title: 'Our Proven Track Record',
      stats: [
        { number: '15+', label: 'Years of Experience', icon: 'landmark' },
        { number: '5000+', label: 'Cases Won', icon: 'award' },
        { number: '98%', label: 'Satisfied Clients', icon: 'scale' },
        { number: '50+', label: 'Professional Team Members', icon: 'users' },
        { number: '50,000+', label: 'Legal Documents Processed', icon: 'file' },
        { number: '25+', label: 'Countries Served', icon: 'globe' },
      ],
    },
    ar: {
      badge: 'إنجازاتنا',
      title: 'نعيش ونعمل عالمياً',
      stats: [
        { number: '15+', label: 'سنوات من الخبرة', icon: 'landmark' },
        { number: '5000+', label: 'قضية فازت بها', icon: 'award' },
        { number: '98%', label: 'عملاء راضون', icon: 'scale' },
        { number: '50+', label: 'أعضاء الفريق المحترف', icon: 'users' },
        { number: '50,000+', label: 'الوثائق القانونية المعالجة', icon: 'file' },
        { number: '25+', label: 'الدول المخدومة', icon: 'globe' },
      ],
    },
  };

  const pageContent = content[locale];

  return (
    <section
      className="stat-luxury-section relative w-full overflow-hidden px-[5%] py-14 md:py-16"
      dir={isArabic ? 'rtl' : 'ltr'}
      lang={locale}
    >
      {/* Subtle section background decorations */}
      <div
        className="stat-section-bg-decor pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full border border-[#B38D42]/[0.06]"
        aria-hidden="true"
      />
      <div
        className="stat-section-bg-decor pointer-events-none absolute -left-32 top-4 h-80 w-80 rounded-full border border-[#B38D42]/[0.04]"
        aria-hidden="true"
      />
      <div
        className="stat-section-bg-decor pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 rounded-full border border-[#B38D42]/[0.05]"
        aria-hidden="true"
      />
      <div
        className="stat-section-bg-decor pointer-events-none absolute bottom-8 left-8 h-24 w-24 opacity-[0.04]"
        aria-hidden="true"
        style={{
          background:
            'repeating-linear-gradient(45deg, #B38D42 0, #B38D42 1px, transparent 1px, transparent 10px)',
        }}
      />
      <SectionScaleWatermark />

      <div className="relative mx-auto max-w-[1540px]">
        {/* Header */}
        <div className="mb-10 text-center md:mb-12">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-10 bg-[#B38D42]" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#B38D42]">
              {pageContent.badge}
            </span>
            <span className="h-px w-10 bg-[#B38D42]" aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-3xl font-bold text-[#160A0A] md:text-4xl">{pageContent.title}</h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 gap-5 min-[768px]:grid-cols-2 min-[768px]:gap-x-4 min-[768px]:gap-y-5 min-[1200px]:grid-cols-3 min-[1200px]:gap-x-7 min-[1200px]:gap-y-6">
          {pageContent.stats.map((stat, index) => (
            <StatCard
              key={index}
              number={stat.number}
              label={stat.label}
              icon={stat.icon}
              isArabic={isArabic}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
