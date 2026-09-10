'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { translations, Locale } from '@/lib/translations';
import { getLocalizedPathname, resolveLocale } from '@/lib/utils';
import Logo from '@/assets/logo/logo.png';

const contactLinks = [
  {
    label: 'info@almahy.com',
    href: 'mailto:info@almahy.com',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 6.8c0-.993.0-1.49.194-1.86a1.6 1.6 0 0 1 .696-.696C5.26 4 5.757 4 6.75 4h10.5c.993 0 1.49 0 1.86.244.3.194.502.479.605.802.076.238.076.508.076 1.346v7.416c0 .993 0 1.49-.244 1.86a1.6 1.6 0 0 1-.696.696c-.31.2-.68.244-1.24.257v0l-11.7.019c-.993 0-1.49 0-1.86-.244a1.6 1.6 0 0 1-.696-.696C4 15.23 4 14.734 4 13.74Z" />
        <path d="m5 6 7 5 7-5" />
      </svg>
    ),
  },
  {
    label: 'legal@almahy.com',
    href: 'mailto:legal@almahy.com',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 6.8c0-.993.0-1.49.194-1.86a1.6 1.6 0 0 1 .696-.696C5.26 4 5.757 4 6.75 4h10.5c.993 0 1.49 0 1.86.244.3.194.502.479.605.802.076.238.076.508.076 1.346v7.416c0 .993 0 1.49-.244 1.86a1.6 1.6 0 0 1-.696.696c-.31.2-.68.244-1.24.257v0l-11.7.019c-.993 0-1.49 0-1.86-.244a1.6 1.6 0 0 1-.696-.696C4 15.23 4 14.734 4 13.74Z" />
        <path d="m5 6 7 5 7-5" />
      </svg>
    ),
  },
  {
    label: '+971 4264 8831',
    href: 'tel:+97142648831',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6.5 3h3l1 4-2 .8a10 10 0 0 0 4.2 4.2l.8-2 4 1v3a2 2 0 0 1-2.3 2 16 16 0 0 1-7.7-3.6 16 16 0 0 1-3.6-7.7A2 2 0 0 1 6.5 3Z" />
      </svg>
    ),
  },
  {
    label: '+971 5040 96028',
    href: 'tel:+971504096028',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6.5 3h3l1 4-2 .8a10 10 0 0 0 4.2 4.2l.8-2 4 1v3a2 2 0 0 1-2.3 2 16 16 0 0 1-7.7-3.6 16 16 0 0 1-3.6-7.7A2 2 0 0 1 6.5 3Z" />
      </svg>
    ),
  },
];

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/almahy-mohamed-a9a82565',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/almahylegal',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/almahylegal',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@almahylegal',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{title}</h3>
      <span className="h-px w-10 bg-[#B38D42]" aria-hidden />
    </div>
  );
}

function FeatureIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-[#B38D42]/70 text-[#B38D42]">
      {children}
    </span>
  );
}

export default function Footer({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const lang = resolveLocale(pathname, locale);
  const t = translations[lang];
  const isRTL = lang === 'ar';
  const currentPath = pathname ?? `/${lang}`;

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [newsletterFeedback, setNewsletterFeedback] = useState('');

  const newsletterCopy = {
    sending: lang === 'ar' ? 'جارٍ الاشتراك...' : 'Subscribing...',
    success: lang === 'ar' ? 'شكراً لاشتراكك!' : 'Thank you for subscribing!',
    error: lang === 'ar' ? 'تعذّر الاشتراك. حاول مرة أخرى.' : "Couldn't subscribe. Please try again.",
    invalid: lang === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح.' : 'Please enter a valid email.',
  };

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = newsletterEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNewsletterStatus('error');
      setNewsletterFeedback(newsletterCopy.invalid);
      return;
    }

    setNewsletterStatus('sending');
    setNewsletterFeedback('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json?.success) {
        setNewsletterStatus('success');
        setNewsletterFeedback(newsletterCopy.success);
        setNewsletterEmail('');
      } else {
        setNewsletterStatus('error');
        setNewsletterFeedback(json?.message || newsletterCopy.error);
      }
    } catch {
      setNewsletterStatus('error');
      setNewsletterFeedback(newsletterCopy.error);
    }
  };

  const ctaFeatures = [
    {
      title: t.footerFeature1Title,
      desc: t.footerFeature1Desc,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 3 4 7v6c0 4.4 3.4 8.5 8 9 4.6-.5 8-4.6 8-9V7l-8-4Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
    {
      title: t.footerFeature2Title,
      desc: t.footerFeature2Desc,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      title: t.footerFeature3Title,
      desc: t.footerFeature3Desc,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 3v18" />
          <path d="M5 8h14" />
          <path d="M7 21h10" />
          <path d="M9 8V5h6v3" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-black text-white [&_a]:cursor-pointer [&_button]:cursor-pointer" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* CTA Section */}
      <section className="relative min-h-[420px] overflow-hidden">
        <Image
          src="/assets/footer-cta-bg.png"
          alt=""
          fill
          priority={false}
          className="object-cover object-center"
          sizes="(max-width: 1920px) 100vw, 1920px"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/45" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" aria-hidden />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#B38D42]">
                    {t.footerGetInTouch}
                  </span>
                  <span className="h-px w-12 bg-[#B38D42]" aria-hidden />
                </div>
                <h2 className="max-w-2xl text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15]">
                  {t.footerCtaHeadingBefore}{' '}
                  <span className="text-[#B38D42]">{t.footerCtaHeadingHighlight}</span>
                </h2>
                <p className="max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                  {t.servicesCTADesc}
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                {ctaFeatures.map((feature) => (
                  <div key={feature.title} className="space-y-3">
                    <FeatureIcon>{feature.icon}</FeatureIcon>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-white">{feature.title}</p>
                      <p className="text-xs leading-relaxed text-white/65">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 lg:items-end">
              <Link
                href={`/${lang}/contact`}
                className="inline-flex cursor-pointer items-center gap-3 rounded-md bg-[#B38D42] px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-[#B38D42]/25 transition hover:bg-[#9A7635]"
              >
                {t.contactUs}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </Link>
              <p className="text-sm text-white/70 lg:text-right">{t.footerCtaConversation}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-[#B38D42]/70" aria-hidden />

      {/* Main Footer */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-5">
            <SectionHeading title={t.footerOurAddress} />
            <div className="flex items-start gap-3 text-sm leading-relaxed text-white/85">
              <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#B38D42]/15 text-[#B38D42] ring-1 ring-[#B38D42]/30">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 21s6-4.35 6-10a6 6 0 1 0-12 0c0 5.65 6 10 6 10Z" />
                  <circle cx="12" cy="11" r="2.5" />
                </svg>
              </span>
              <div className="space-y-1">
                <p>2nd Floor, Al Saqr Business Tower</p>
                <p>Sheikh Zayed Rd, DIFC</p>
                <p>Dubai, United Arab Emirates</p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <SectionHeading title={t.footerConnectWithUs} />
            <ul className="space-y-3 text-sm text-white/85">
              {contactLinks.map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#B38D42]/15 text-[#B38D42] ring-1 ring-[#B38D42]/30">
                    {item.icon}
                  </span>
                  <a href={item.href} className="cursor-pointer transition hover:text-[#B38D42]">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <SectionHeading title={t.footerNewsletter} />
            <p className="text-sm text-white/80">{t.footerNewsletterDesc}</p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex max-w-md items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 shadow-inner shadow-black/20"
            >
              <input
                type="email"
                name="newsletter"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder={t.footerEmailPlaceholder}
                className="w-full bg-transparent text-sm text-white placeholder:text-white/60 focus:outline-none"
                required
              />
              <button
                type="submit"
                disabled={newsletterStatus === 'sending'}
                className="flex h-9 w-9 flex-none cursor-pointer items-center justify-center rounded-full bg-[#B38D42] text-white shadow-lg shadow-[#B38D42]/30 transition hover:bg-[#9A7635] focus:outline-none focus:ring-2 focus:ring-[#B38D42] focus:ring-offset-2 focus:ring-offset-black disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Subscribe"
              >
                {newsletterStatus === 'sending' ? (
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="m4 10 7 3 9-7-16 4-1 7 4-4" />
                  </svg>
                )}
              </button>
            </form>
            {newsletterFeedback && (
              <p className={`text-sm ${newsletterStatus === 'success' ? 'text-emerald-300' : 'text-[#E8D5A8]'}`}>
                {newsletterFeedback}
              </p>
            )}
            <div className="flex flex-wrap gap-3 pt-1">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/8 text-white/80 ring-1 ring-white/10 transition hover:bg-[#B38D42] hover:text-white"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-12 flex flex-col gap-6 border-t border-white/10 pt-8 pb-2 pe-20 text-sm text-white/60 sm:pe-24 lg:flex-row lg:items-center lg:justify-between">
          <Link href={`/${lang}`} className="flex shrink-0 cursor-pointer items-center">
            <Image src={Logo} alt="Almahy Legal Services" className="h-10 w-auto" />
          </Link>

          <p className="text-center lg:flex-1">{t.footerText}</p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-white/70 lg:justify-end">
            <Link href={`/${lang}/privacy`} className="cursor-pointer transition hover:text-[#B38D42]">
              {t.footerPrivacy}
            </Link>
            <span className="text-white/30" aria-hidden>
              |
            </span>
            <Link href={`/${lang}/terms`} className="cursor-pointer transition hover:text-[#B38D42]">
              {t.footerTerms}
            </Link>
            <div className="relative flex items-center gap-2 border-white/20 ps-0 lg:border-s lg:ps-4">
              <Link
                href={getLocalizedPathname(currentPath, 'en')}
                aria-label="Switch to English"
                aria-current={lang === 'en' ? 'true' : undefined}
                className={`cursor-pointer rounded px-3 py-1.5 text-xs font-semibold transition-colors ${
                  lang === 'en' ? 'bg-[#B38D42] text-white' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                ENG
              </Link>
              <Link
                href={getLocalizedPathname(currentPath, 'ar')}
                aria-label="Switch to Arabic"
                aria-current={lang === 'ar' ? 'true' : undefined}
                className={`cursor-pointer rounded px-3 py-1.5 text-xs font-semibold transition-colors ${
                  lang === 'ar' ? 'bg-[#B38D42] text-white' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                العربي
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
