interface BlogsHeroProps {
  isRTL: boolean;
  bannerUrl: string;
  bannerAlt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
}

export default function BlogsHero({ isRTL, bannerUrl, bannerAlt, eyebrow, title, subtitle }: BlogsHeroProps) {
  return (
    <section className="relative min-h-[480px] overflow-hidden bg-[#100B0B] pt-28 md:min-h-[540px] md:pt-32">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={bannerUrl}
          alt={bannerAlt}
          className="absolute left-0 h-[118%] w-full max-w-none object-cover brightness-[1.1] opacity-75"
          style={{ objectPosition: 'center 28%', top: '12%' }}
        />
      </div>
      <div
        className={`absolute inset-0 ${isRTL ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-[#100B0B]/88 via-[#160A0A]/72 to-[#160A0A]/25`}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[#100B0B]/18" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-[1250px] px-4 pb-14 md:px-8 md:pb-16">
        <div className={`max-w-2xl ${isRTL ? 'mr-0 ml-auto text-right' : 'text-left'}`}>
          <div className={`mb-5 flex items-center gap-3 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
            <span className="h-px w-8 shrink-0 bg-[#B38D42]" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B38D42]">{eyebrow}</p>
          </div>
          <h1
            className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-[2.75rem]"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 md:text-[15px]">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}
