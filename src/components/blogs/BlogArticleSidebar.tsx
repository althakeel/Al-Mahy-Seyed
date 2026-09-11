import Link from 'next/link';
import { BlogPost, getBlogLocalizedField } from '@/lib/blogs';
import { Locale } from '@/lib/translations';

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

interface BlogArticleSidebarProps {
  isRTL: boolean;
  lang: Locale;
  locale: string;
  publishedLabel: string;
  date: string;
  recentLabel: string;
  recentBlogs: BlogPost[];
  guidanceTitle: string;
  guidanceText: string;
  contactLabel: string;
}

export default function BlogArticleSidebar({
  isRTL,
  lang,
  locale,
  publishedLabel,
  date,
  recentLabel,
  recentBlogs,
  guidanceTitle,
  guidanceText,
  contactLabel,
}: BlogArticleSidebarProps) {
  return (
    <aside className={`space-y-5 ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className="overflow-hidden rounded-[16px] border border-[#B38D42]/20 bg-[#100B0B] shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
        <div className="px-5 py-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B38D42]">{publishedLabel}</p>
          <p className="mt-2 text-sm font-semibold text-white">{date}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-[16px] border border-[#B38D42]/20 bg-white shadow-[0_8px_24px_rgba(20,15,7,0.05)]">
        <div className="border-b border-[#B38D42]/12 px-5 py-4">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
            <span className="h-px w-8 shrink-0 bg-[#B38D42]" aria-hidden="true" />
            <h2 className="text-lg font-bold text-[#160A0A]" style={{ fontFamily: 'Georgia, serif' }}>
              {recentLabel}
            </h2>
          </div>
        </div>
        <div className="divide-y divide-[#B38D42]/10 px-5">
          {recentBlogs.map((recentBlog, index) => (
            <Link
              key={recentBlog.id}
              href={`/${locale}/blogs/${recentBlog.slug}`}
              className={`group flex gap-3 py-4 ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
            >
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#B38D42]/30 bg-[#B38D42]/10 text-[10px] font-bold text-[#B38D42]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-sm leading-relaxed text-[#160A0A]/80 transition-colors group-hover:text-[#9A7635]">
                {getBlogLocalizedField(recentBlog, 'title', lang)}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-[16px] border border-[#B38D42]/20 bg-white px-5 py-6 shadow-[0_8px_24px_rgba(20,15,7,0.05)]">
        <h2 className="text-lg font-bold text-[#160A0A]" style={{ fontFamily: 'Georgia, serif' }}>
          {guidanceTitle}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#160A0A]/65">{guidanceText}</p>
        <Link
          href={`/${locale}/contact`}
          className="hero-btn-glow-solid mt-5 inline-flex h-[44px] cursor-pointer items-center gap-2 rounded-md bg-[#B38D42] px-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-200 hover:bg-[#9A7635] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B38D42]"
        >
          {contactLabel}
          <ArrowIcon isRTL={isRTL} />
        </Link>
      </div>
    </aside>
  );
}
