interface PricingCtaSectionProps {
  isArabic: boolean;
  title: string;
  description: string;
  buttonLabel: string;
  whatsappHref: string;
  footnote: string;
}

export default function PricingCtaSection({
  isArabic,
  title,
  description,
  buttonLabel,
  whatsappHref,
  footnote,
}: PricingCtaSectionProps) {
  return (
    <section className="border-t border-[#B38D42]/35 bg-[#100B0B] px-4 py-14 md:px-8 md:py-16">
      <div className={`mx-auto max-w-[1250px] ${isArabic ? 'text-right' : 'text-center'}`}>
        <h2 className="text-3xl font-bold text-[#B38D42] md:text-4xl" style={{ fontFamily: 'Georgia, serif' }}>
          {title}
        </h2>
        <p className={`mt-5 max-w-3xl text-base leading-8 text-white/75 md:text-lg ${isArabic ? 'mr-0 ml-auto' : 'mx-auto'}`}>
          {description}
        </p>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`hero-btn-glow-solid mt-10 inline-flex h-[52px] min-w-[220px] items-center justify-center rounded-md bg-[#B38D42] px-8 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:bg-[#9A7635] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B38D42] ${isArabic ? 'ml-0' : ''}`}
        >
          {buttonLabel}
        </a>
        <p className="mt-5 text-sm font-medium text-white/60 md:text-base">{footnote}</p>
      </div>
    </section>
  );
}
