import Image from 'next/image';
import Link from 'next/link';

function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

interface AccountingCtaSectionProps {
  isArabic: boolean;
  lang: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaText: string;
  contactLabel: string;
}

export default function AccountingCtaSection({
  isArabic,
  lang,
  eyebrow,
  title,
  description,
  ctaText,
  contactLabel,
}: AccountingCtaSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#100B0B] py-12 text-white md:py-14">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1600&h=700&fit=crop"
          alt=""
          fill
          className="object-cover opacity-30"
          sizes="(max-width: 1920px) 100vw, 1920px"
        />
        <div className="absolute inset-0 bg-[#100B0B]/75" aria-hidden="true" />
        <div
          className={`absolute inset-0 ${isArabic ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-[#100B0B] via-[#100B0B]/85 to-[#100B0B]/45`}
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1250px] px-4 text-center md:px-8">
        <div className={`mb-3 flex items-center justify-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
          <span className="h-px w-8 bg-[#B38D42]" aria-hidden="true" />
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B38D42]">{eyebrow}</p>
          <span className="h-px w-8 bg-[#B38D42]" aria-hidden="true" />
        </div>
        <h2 className="mx-auto max-w-3xl text-3xl font-bold md:text-4xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/75 md:text-[15px]">{description}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://wa.me/971504096028?text=Hello%2C%20I%20would%20like%20to%20get%20a%20quote%20for%20accounting%20services"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn-glow-solid inline-flex h-[52px] cursor-pointer items-center gap-2 rounded-md bg-[#B38D42] px-7 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:border-[#9A7635] hover:bg-[#9A7635] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B38D42]"
          >
            {ctaText}
            <ArrowIcon className={`h-3.5 w-3.5 ${isArabic ? 'rotate-180' : ''}`} />
          </a>
          <Link
            href={`/${lang}/contact`}
            className="hero-btn-glow-outline inline-flex h-[52px] cursor-pointer items-center gap-2 rounded-md bg-transparent px-7 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:bg-[rgba(179,141,66,0.10)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B38D42]"
          >
            {contactLabel}
            <ArrowIcon className={`h-4 w-4 text-[#B38D42] ${isArabic ? 'rotate-180' : ''}`} />
          </Link>
        </div>
      </div>
    </section>
  );
}
