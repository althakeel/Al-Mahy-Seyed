type BenefitItem = {
  number: string;
  title: string;
  desc: string;
};

interface AboutBenefitsSectionProps {
  isArabic: boolean;
  eyebrow: string;
  title: string;
  subtitle: string;
  items: BenefitItem[];
}

export default function AboutBenefitsSection({
  isArabic,
  eyebrow,
  title,
  subtitle,
  items,
}: AboutBenefitsSectionProps) {
  return (
    <section className="bg-white py-10 md:py-12">
      <div className="mx-auto max-w-[1250px] px-4 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div className={`lg:sticky lg:top-28 lg:self-start ${isArabic ? 'text-right' : 'text-left'}`}>
            <div className={`mb-4 flex items-center gap-3 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
              <span className="h-px w-8 bg-[#B38D42]" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B38D42]">{eyebrow}</p>
            </div>
            <h2
              className="text-3xl font-bold leading-tight text-[#160A0A] md:text-4xl lg:text-[2.65rem]"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {title}
            </h2>
            <p className="mt-5 max-w-md text-base leading-8 text-[#160A0A]/68 md:text-[17px]">{subtitle}</p>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <article
                key={item.number}
                className={`group flex gap-5 rounded-[18px] border border-[#B38D42]/18 bg-white p-5 shadow-[0_10px_28px_rgba(20,15,7,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#B38D42]/35 hover:shadow-[0_16px_36px_rgba(20,15,7,0.08)] md:gap-6 md:p-6 ${
                  isArabic ? 'flex-row-reverse text-right' : ''
                }`}
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#B38D42]/50 bg-[#B38D42]/12 text-sm font-bold tracking-[0.12em] text-[#B38D42] transition-colors group-hover:bg-[#B38D42] group-hover:text-white">
                  {item.number}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-[#160A0A] md:text-xl">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-[#160A0A]/68">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
