import { FormattedText } from '@/components/BoldTextField';

interface BlogArticleHeaderProps {
  isRTL: boolean;
  categoryLabel: string;
  date: string;
  title: string;
  shortDescription: string;
  shortDescriptionUsesArabic?: boolean;
  bannerImage?: string;
}

export default function BlogArticleHeader({
  isRTL,
  categoryLabel,
  date,
  title,
  shortDescription,
  shortDescriptionUsesArabic = true,
  bannerImage,
}: BlogArticleHeaderProps) {
  const shortDescriptionIsRtl = isRTL && shortDescriptionUsesArabic;

  return (
    <header className={isRTL ? 'text-right' : 'text-left'}>
      <div className={`mb-4 flex flex-wrap items-center gap-2 ${isRTL ? 'justify-end' : ''}`}>
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B38D42]">{categoryLabel}</span>
        <span className="text-[#160A0A]/25" aria-hidden="true">
          /
        </span>
        <time className="text-xs font-semibold uppercase tracking-[0.14em] text-[#160A0A]/50">{date}</time>
      </div>

      <h1
        className="max-w-[720px] text-3xl font-bold leading-tight text-[#160A0A] md:text-4xl lg:text-[2.65rem]"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        {title}
      </h1>

      <div dir={shortDescriptionIsRtl ? 'rtl' : 'ltr'} className={shortDescriptionIsRtl ? 'text-right' : 'text-left'}>
        <FormattedText
          text={shortDescription}
          compact
          className="mt-5 max-w-[680px] text-base leading-8 text-[#160A0A]/70"
        />
      </div>

      {bannerImage ? (
        <div className="mt-8 w-full max-w-[720px] overflow-hidden rounded-[16px] border border-[#B38D42]/20 bg-[#E8E4E0] shadow-[0_12px_32px_rgba(20,15,7,0.06)]">
          <img
            src={bannerImage}
            alt={title}
            className="block aspect-[16/10] w-full max-w-full object-cover object-center"
            loading="eager"
            decoding="async"
            sizes="(max-width: 768px) 100vw, 720px"
          />
        </div>
      ) : null}
    </header>
  );
}
