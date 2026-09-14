'use client';

import { Locale } from '@/lib/translations';
import { getServiceShowcaseItems } from '@/lib/services-showcase';
import ServiceShowcaseBlock from '@/components/ServiceShowcaseBlock';

interface ServicesSectionProps {
  locale: Locale;
}

export default function ServicesSection({ locale }: ServicesSectionProps) {
  const services = getServiceShowcaseItems(locale);
  const isArabic = locale === 'ar';

  return (
    <section className="w-full bg-[#F1EFF0]">
      <div className="bg-[#F1EFF0] py-5 md:py-5">
        <div className="mx-auto max-w-[1250px] px-4 text-center md:px-8">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-10 bg-[#B38D42]" aria-hidden />
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-[#B38D42]">
              {isArabic ? 'ما نقدمه' : 'What We Offer'}
            </span>
            <span className="h-px w-10 bg-[#B38D42]" aria-hidden />
          </div>
          <h2 className="mt-5 text-3xl font-bold text-[#160A0A] md:text-4xl">
            {isArabic ? 'خدماتنا' : 'Almahy Legal Services'}
          </h2>
        </div>
      </div>

      {services.map((service, index) => (
        <ServiceShowcaseBlock
          key={service.slug}
          item={service}
          index={index}
          locale={locale}
          reversed={index % 2 === 1}
        />
      ))}
    </section>
  );
}
