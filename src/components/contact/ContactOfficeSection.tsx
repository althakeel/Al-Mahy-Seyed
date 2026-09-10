import type { CSSProperties, ReactNode } from 'react';

type OfficeDetail = {
  label: string;
  lines: string[];
  hrefs?: string[];
  icon: ReactNode;
};

interface ContactOfficeSectionProps {
  isArabic: boolean;
  title: string;
  details: OfficeDetail[];
}

export default function ContactOfficeSection({ isArabic, title, details }: ContactOfficeSectionProps) {
  return (
    <section className="border-y border-[#B38D42]/10 bg-[#F1EFF0] py-10 md:py-12">
      <div className="mx-auto max-w-[1250px] px-4 md:px-8">
        <div className={`mb-7 ${isArabic ? 'text-right' : 'text-left'}`}>
          <div className={`mb-3 flex items-center gap-3 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
            <span className="h-px w-8 bg-[#B38D42]" aria-hidden="true" />
            <h2 className="text-3xl font-bold text-[#160A0A] md:text-4xl">{title}</h2>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {details.map((item, index) => (
            <div
              key={item.label}
              className="contact-office-border-wrap h-full"
              style={{ '--border-delay': `${index * 320}ms` } as CSSProperties}
            >
              <article
                className={`contact-office-border-inner h-full ${
                  isArabic ? 'text-right' : 'text-left'
                }`}
              >
                <div className={`mb-4 flex items-center gap-3 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#B38D42]/50 bg-[#B38D42]/12 text-[#B38D42]">
                    {item.icon}
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#B38D42]">{item.label}</p>
                </div>
                <div className="space-y-1 text-sm leading-6 text-[#160A0A]/80">
                  {item.lines.map((line, i) =>
                    item.hrefs?.[i] ? (
                      <a
                        key={line}
                        href={item.hrefs[i]}
                        className="block cursor-pointer font-medium text-[#160A0A] transition hover:text-[#9A7635]"
                      >
                        {line}
                      </a>
                    ) : (
                      <p key={line}>{line}</p>
                    )
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
