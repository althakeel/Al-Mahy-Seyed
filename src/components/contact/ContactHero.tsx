interface ContactHeroProps {
  isArabic: boolean;
  eyebrow: string;
  title: string;
  subtitle: string;
}

export default function ContactHero({ isArabic, eyebrow, title, subtitle }: ContactHeroProps) {
  return (
    <section className="border-b border-[#B38D42]/15 bg-[#100B0B] pt-24 pb-8 md:pt-28 md:pb-10">
      <div className={`mx-auto max-w-[1250px] px-4 md:px-8 ${isArabic ? 'text-right' : 'text-left'}`}>
        <div className={`mb-3 flex items-center gap-3 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
          <span className="h-px w-8 shrink-0 bg-[#B38D42]" aria-hidden="true" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B38D42]">{eyebrow}</p>
        </div>
        <h1
          className="text-3xl font-bold text-white md:text-4xl lg:text-[2.85rem]"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          {title}
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-7 text-white/75 md:text-[15px]">{subtitle}</p>
      </div>
    </section>
  );
}
