import Image from 'next/image';

const CORE_VALUE_KEYS = ['v1', 'v2', 'v3', 'v4'] as const;

interface AboutIntroSectionProps {
  isArabic: boolean;
  eyebrow: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  coreValuesTitle: string;
  coreValues: string[];
  imageAlt: string;
}

export default function AboutIntroSection({
  isArabic,
  eyebrow,
  title,
  paragraph1,
  paragraph2,
  coreValuesTitle,
  coreValues,
  imageAlt,
}: AboutIntroSectionProps) {
  return (
    <section className="border-b border-[#B38D42]/10 bg-[#F1EFF0] py-12 md:py-14">
      <div className="mx-auto max-w-[1250px] px-4 md:px-8">
        <div className={`max-w-3xl ${isArabic ? 'ms-auto text-right' : 'text-left'}`}>
          <div className={`mb-4 flex items-center gap-3 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}>
            <span className="h-px w-8 shrink-0 bg-[#B38D42]" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B38D42]">{eyebrow}</p>
          </div>
          <h2
            className="text-3xl font-bold leading-tight text-[#160A0A] md:text-4xl lg:text-[2.65rem]"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {title}
          </h2>
        </div>

        <div className="mt-8 grid items-stretch gap-8 lg:mt-10 lg:grid-cols-12 lg:gap-12">
          <div className={`relative lg:col-span-6 ${isArabic ? 'lg:order-2' : ''}`}>
            <div className="group relative h-full min-h-[340px] overflow-hidden rounded-[22px] md:min-h-[420px] lg:min-h-[520px]">
              <Image
                src="/images/about/about-meeting.png"
                alt={imageAlt}
                fill
                className="object-cover object-center transition duration-700 ease-out group-hover:scale-[1.06]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#100B0B]/35 via-transparent to-transparent" />
            </div>
            <span
              className={`pointer-events-none absolute -bottom-3 h-[72%] w-[72%] rounded-[22px] border border-[#B38D42]/35 ${
                isArabic ? '-left-3' : '-right-3'
              }`}
              aria-hidden="true"
            />
          </div>

          <div className={`flex flex-col justify-center lg:col-span-6 ${isArabic ? 'text-right lg:order-1' : 'text-left'}`}>
            <p className="text-base leading-8 text-[#160A0A]/75 md:text-[17px]">{paragraph1}</p>
            <p className="mt-4 text-base leading-8 text-[#160A0A]/75 md:text-[17px]">{paragraph2}</p>

            <div className="mt-8 border-t border-[#B38D42]/20 pt-6">
              <h3 className="text-xl font-bold text-[#160A0A] md:text-2xl">{coreValuesTitle}</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {coreValues.map((value, index) => (
                  <li
                    key={CORE_VALUE_KEYS[index]}
                    className={`flex items-start gap-3 rounded-[16px] border border-[#B38D42]/18 bg-white/80 px-4 py-4 shadow-[0_8px_24px_rgba(20,15,7,0.04)] ${
                      isArabic ? 'flex-row-reverse text-right' : ''
                    }`}
                  >
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#B38D42]/45 bg-[#B38D42]/12 text-[11px] font-bold tracking-[0.12em] text-[#B38D42]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="pt-1 text-sm font-medium leading-6 text-[#160A0A]/85 md:text-[15px]">{value}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
