import Link from 'next/link';
import { FormattedText } from '@/components/BoldTextField';
import { BlogPost, getBlogLocalizedField, getBlogLocalizedImage } from '@/lib/blogs';
import { Locale } from '@/lib/translations';

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

interface BlogArticleCardProps {
  blog: BlogPost;
  locale: string;
  lang: Locale;
  readMoreLabel: string;
  isRTL: boolean;
  className?: string;
}

export default function BlogArticleCard({
  blog,
  locale,
  lang,
  readMoreLabel,
  isRTL,
  className = '',
}: BlogArticleCardProps) {
  const cardImage = getBlogLocalizedImage(blog, lang);
  const cardTitle = getBlogLocalizedField(blog, 'title', lang);
  const cardShortDescription = getBlogLocalizedField(blog, 'shortDescription', lang);
  const href = `/${locale}/blogs/${blog.slug}`;

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-[16px] border border-[#B38D42]/20 bg-white shadow-[0_8px_24px_rgba(20,15,7,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#B38D42]/40 hover:shadow-[0_14px_32px_rgba(20,15,7,0.08)] ${className}`}
    >
      <Link href={href} className="block w-full overflow-hidden">
        <img
          src={cardImage}
          alt={cardTitle}
          className="aspect-[16/10] h-auto w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div
        dir={isRTL ? 'rtl' : undefined}
        className={`flex flex-1 flex-col px-5 pb-5 pt-4 ${isRTL ? 'text-right' : 'text-left'}`}
      >
        <Link href={href}>
          <h3
            className="mb-2 line-clamp-2 text-base font-bold leading-snug text-[#160A0A] transition-colors group-hover:text-[#9A7635] md:text-[17px]"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {cardTitle}
          </h3>
        </Link>

        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B38D42]">{blog.date}</p>
        <div className={`mb-3 h-px w-8 bg-[#B38D42] ${isRTL ? 'ml-auto' : ''}`} aria-hidden="true" />

        <div className="mb-4 flex-1 text-sm leading-relaxed text-[#160A0A]/65">
          <FormattedText text={cardShortDescription} compact />
        </div>

        <Link
          href={href}
          dir={isRTL ? 'ltr' : undefined}
          className={`inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#B38D42] transition-all hover:gap-3 hover:text-[#9A7635] ${isRTL ? 'ml-auto' : ''}`}
        >
          {readMoreLabel}
          <ArrowIcon isRTL={isRTL} />
        </Link>
      </div>
    </article>
  );
}
