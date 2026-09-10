interface PricingHeroProps {
  isArabic: boolean;
  title: string;
  subtitle: string;
}

export default function PricingHero({ isArabic, title, subtitle }: PricingHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[#B38D42]/35 bg-[#100B0B] pt-28 pb-10 text-white md:pt-32 md:pb-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#B38D42]/10 blur-3xl" />
        <div className="absolute top-1/2 -right-16 h-48 w-48 rounded-full bg-[#B38D42]/8 blur-3xl" />
      </div>

      <div className={`relative mx-auto max-w-[1250px] px-4 md:px-8 ${isArabic ? 'text-right' : 'text-center'}`}>
        <div className={`mb-4 flex items-center gap-3 ${isArabic ? 'justify-end' : 'justify-center'}`}>
          <span className="h-px w-8 shrink-0 bg-[#B38D42]" aria-hidden="true" />
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B38D42]">
            {isArabic ? 'الباقات والأسعار' : 'Packages & Pricing'}
          </p>
          <span className="h-px w-8 shrink-0 bg-[#B38D42]" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[2.75rem]" style={{ fontFamily: 'Georgia, serif' }}>
          {title}
        </h1>
        <p className={`mt-4 max-w-2xl text-sm leading-7 text-white/70 md:text-[15px] ${isArabic ? 'mr-0 ml-auto' : 'mx-auto'}`}>
          {subtitle}
        </p>
      </div>
    </section>
  );
}
