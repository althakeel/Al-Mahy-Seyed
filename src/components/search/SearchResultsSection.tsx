interface SearchResultsSectionProps {
  title: string;
  count?: number;
  isRTL: boolean;
  tone?: 'dark' | 'light';
  children: React.ReactNode;
}

export default function SearchResultsSection({
  title,
  count,
  isRTL,
  tone = 'dark',
  children,
}: SearchResultsSectionProps) {
  const isLight = tone === 'light';

  return (
    <section
      className={
        isLight
          ? 'border-t border-[#B38D42]/15 bg-[#F1EFF0] py-10 md:py-12'
          : 'border-t border-[#B38D42]/20 py-10 md:py-12'
      }
    >
      <div className="mx-auto max-w-[1250px] px-4 md:px-8">
        <div className={`mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className={`mb-2 flex items-center gap-3 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
            <span className="h-px w-8 shrink-0 bg-[#B38D42]" aria-hidden="true" />
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B38D42]">
              {title}
              {typeof count === 'number' ? ` (${count})` : ''}
            </h2>
          </div>
          <div className={`h-px w-16 bg-[#B38D42]/40 ${isRTL ? 'mr-0 ml-auto' : ''}`} />
        </div>
        {children}
      </div>
    </section>
  );
}
