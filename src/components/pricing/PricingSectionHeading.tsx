interface PricingSectionHeadingProps {
  title: string;
  isArabic?: boolean;
}

export default function PricingSectionHeading({ title, isArabic = false }: PricingSectionHeadingProps) {
  return (
    <div className={`mb-8 md:mb-10 ${isArabic ? 'text-right' : 'text-center'}`}>
      <div className={`mb-3 flex items-center gap-3 ${isArabic ? 'justify-end' : 'justify-center'}`}>
        <span className="h-px w-8 shrink-0 bg-[#B38D42]/60" aria-hidden="true" />
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B38D42]">{title}</p>
        <span className="h-px w-8 shrink-0 bg-[#B38D42]/60" aria-hidden="true" />
      </div>
      <div className={`h-px w-16 bg-[#B38D42]/50 ${isArabic ? 'mr-0 ml-auto' : 'mx-auto'}`} />
    </div>
  );
}
