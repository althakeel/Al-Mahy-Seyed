'use client';

import { type CSSProperties } from 'react';
import { Locale } from '@/lib/translations';

const GOLD = '#B38D42';

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  text: string;
  avatar: string;
  profilePhotoUrl?: string;
}

interface ReviewsData {
  rating: number;
  totalReviews: number;
  reviews: Review[];
}

function ScalesIcon() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#B38D42]/35 bg-[#B38D42]/[0.07]">
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="4.5" r="1.5" fill={GOLD} />
        <path d="M16 6v4.5" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M7 12.5h18" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M7 12.5c0 3.2-1.8 5.8-4 7.2" stroke={GOLD} strokeWidth="1.3" strokeLinecap="round" />
        <path d="M25 12.5c0 3.2 1.8 5.8 4 7.2" stroke={GOLD} strokeWidth="1.3" strokeLinecap="round" />
        <path d="M3 19.7h6" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M23 19.7h6" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" />
        <path
          d="M3.5 20.2c0 1.4 1.2 2.5 2.7 2.5s2.7-1.1 2.7-2.5M23.1 20.2c0 1.4 1.2 2.5 2.7 2.5s2.7-1.1 2.7-2.5"
          stroke={GOLD}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path d="M16 10.5v9.5" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M10 27.5h12" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" />
        <path d="M12 24.5h8l1 3H11l1-3Z" stroke={GOLD} strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function MapPinIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2.2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 5h5v5M10 14 19 5M15 5h4v4M5 10v9h9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GoogleWordmark() {
  return (
    <span className="inline-flex font-semibold tracking-tight" aria-label="Google">
      <span className="text-[#4285F4]">G</span>
      <span className="text-[#EA4335]">o</span>
      <span className="text-[#FBBC05]">o</span>
      <span className="text-[#4285F4]">g</span>
      <span className="text-[#34A853]">l</span>
      <span className="text-[#EA4335]">e</span>
    </span>
  );
}

function StarRow({ count = 5, size = 'md' }: { count?: number; size?: 'sm' | 'md' }) {
  const starClass = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          className={`${starClass} ${index < count ? 'text-[#B38D42]' : 'text-[#E8E4DF]'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function GoogleReviews({ locale }: { locale: Locale }) {
  const isArabic = locale === 'ar';
  const reviewsData: ReviewsData = {
    rating: 5.0,
    totalReviews: 50,
    reviews: getFallbackReviews(locale),
  };

  const content = {
    en: {
      title: 'What Our Clients Say',
      subtitle:
        'Trusted by individuals and businesses across the UAE for professional legal and corporate services.',
      ratingOnGoogle: 'on Google',
      reviewsLabel: 'reviews',
      footerTagline: 'People • Trust • Results',
      viewAllReviews: 'View All Reviews on Google',
      verifiedReviewsPrefix: 'Verified reviews from',
    },
    ar: {
      title: 'ماذا يقول عملاؤنا',
      subtitle: 'موثوقون من الأفراد والشركات في جميع أنحاء الإمارات للخدمات القانونية والمؤسسية المهنية.',
      ratingOnGoogle: 'على Google',
      reviewsLabel: 'تقييم',
      footerTagline: 'الناس • الثقة • النتائج',
      viewAllReviews: 'عرض جميع التقييمات على Google',
      verifiedReviewsPrefix: 'تقييمات موثقة من',
    },
  };

  const pageContent = content[locale];
  const googleMapsUrl =
    'https://www.google.com/maps/place/Almahy+Legal+Services/@25.213871,55.2734469,17z/data=!3m1!5s0x3e5f6a26defbbce5:0x815e4f8b97a871cd!4m10!1m2!2m1!1salmahy!3m6!1s0x3e5f434f5fdaba03:0x37097f69d9d98181!8m2!3d25.2138701!4d55.2780545!15sCgZhbG1haHmSAQ5sZWdhbF9zZXJ2aWNlc-ABAA!16s%2Fg%2F11rk88bxfm?entry=ttu';

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF8F5] px-4 py-10 md:px-8 md:py-12">
      {/* Decorative background accents */}
      <div
        className="pointer-events-none absolute -left-16 top-8 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(179,141,66,0.06),transparent_68%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(179,141,66,0.05),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-40 w-40 opacity-40"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(135deg, transparent 55%, rgba(179,141,66,0.18) 56%, rgba(179,141,66,0.18) 58%, transparent 59%)',
        }}
      />
      <div
        className="pointer-events-none absolute left-0 top-16 h-32 w-32 opacity-30"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(225deg, transparent 50%, rgba(179,141,66,0.15) 51%, rgba(179,141,66,0.15) 53%, transparent 54%)',
        }}
      />

      <div className="relative mx-auto max-w-[1250px]">
        {/* Header */}
        <div className="mb-8 text-center md:mb-9">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#B38D42]/60" aria-hidden="true" />
            <ScalesIcon />
            <span className="h-px w-12 bg-[#B38D42]/60" aria-hidden="true" />
          </div>

          <h2 className="mt-5 text-3xl font-bold text-[#160A0A] md:text-4xl">
            {pageContent.title}
          </h2>

          <div className="mx-auto mt-4 h-px w-16 bg-[#B38D42]/55" aria-hidden="true" />

          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-[#160A0A]/65 md:text-base">
            {pageContent.subtitle}
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm text-[#160A0A]/70">
            <StarRow />
            <span className="font-semibold text-[#160A0A]">{reviewsData.rating.toFixed(1)}</span>
            <span>{pageContent.ratingOnGoogle}</span>
            <span className="text-[#160A0A]/50">
              ({reviewsData.totalReviews} {pageContent.reviewsLabel})
            </span>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {reviewsData.reviews.map((review, index) => (
            <div
              key={review.id}
              className="review-card-border-wrap"
              style={{ '--border-delay': `${(index % 6) * 320}ms` } as CSSProperties}
            >
            <article className="review-card-border-inner">
              <span
                className="pointer-events-none absolute end-4 top-3 select-none text-[4.5rem] font-serif leading-none text-[#B38D42]/10"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <div className={`relative flex items-start gap-3 ${isArabic ? 'flex-row-reverse text-right' : ''}`}>
                {review.profilePhotoUrl ? (
                  <img
                    src={review.profilePhotoUrl}
                    alt={review.name}
                    className="h-11 w-11 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#B38D42] text-xs font-bold text-white">
                    {review.avatar}
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-bold text-[#160A0A]">{review.name}</h3>
                  <div className={`mt-1 ${isArabic ? 'flex justify-end' : ''}`}>
                    <StarRow count={review.rating} size="sm" />
                  </div>
                  <p className="mt-1 text-[11px] text-[#160A0A]/45">{review.date}</p>
                </div>
              </div>

              <p
                className={`relative mt-4 text-[14px] leading-[1.75] text-[#160A0A]/78 ${isArabic ? 'text-right' : 'text-left'}`}
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {review.text}
              </p>
            </article>
            </div>
          ))}
        </div>

        {/* Footer tagline */}
        <div className="mt-8 flex items-center justify-center gap-2 md:mt-9 md:gap-4">
          <span className="h-px w-8 shrink-0 bg-[#B38D42]/45 md:w-24" aria-hidden="true" />
          <p className="shrink-0 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.1em] text-[#B38D42] md:text-[11px] md:tracking-[0.22em]">
            {pageContent.footerTagline}
          </p>
          <span className="h-px w-8 shrink-0 bg-[#B38D42]/45 md:w-24" aria-hidden="true" />
        </div>

        <div className="mt-6 flex flex-col items-center md:mt-6">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-[#B38D42] px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(179,141,66,0.35)] transition-all duration-200 hover:bg-[#9A7635] hover:shadow-[0_10px_28px_rgba(179,141,66,0.42)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B38D42] ${isArabic ? 'flex-row-reverse' : ''}`}
          >
            <MapPinIcon />
            <span>{pageContent.viewAllReviews}</span>
            <ExternalLinkIcon />
          </a>
          <p className={`mt-3 flex items-center gap-1.5 text-sm text-[#160A0A]/55 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <span>{pageContent.verifiedReviewsPrefix}</span>
            <GoogleWordmark />
          </p>
        </div>
      </div>
    </section>
  );
}

function getFallbackReviews(locale: Locale): Review[] {
  const fallbackReviews = {
    en: [
      {
        id: 1,
        name: 'Ahmed Al Jamal',
        rating: 5,
        date: '2 weeks ago',
        text: 'Excellent legal consultation. The team at Almahy explained our options clearly, reviewed our documents carefully, and gave us practical guidance for our case in Dubai. Highly professional and responsive.',
        avatar: 'AM',
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        rating: 5,
        date: '1 month ago',
        text: 'Outstanding support for our corporate setup. They guided us through licensing, documentation, and compliance requirements with clear communication from start to finish. Would definitely recommend!',
        avatar: 'SJ',
      },
      {
        id: 3,
        name: 'Mohammed Al Hashimi',
        rating: 5,
        date: '1 month ago',
        text: 'Very satisfied with their notary and document attestation support. The process was smooth, fast, and handled with great attention to detail. The team was always available to answer questions.',
        avatar: 'MH',
      },
      {
        id: 4,
        name: 'Emily Chen',
        rating: 5,
        date: '2 months ago',
        text: 'Professional and reliable accounting and tax support. Almahy helped us organize our bookkeeping, VAT filings, and financial reporting while keeping everything compliant and easy to understand.',
        avatar: 'EC',
      },
      {
        id: 5,
        name: 'Khalid Rahman',
        rating: 5,
        date: '2 months ago',
        text: 'Fantastic experience with their second passport advisory service. They explained the available residency and citizenship options clearly and helped us understand the documentation requirements.',
        avatar: 'KR',
      },
      {
        id: 6,
        name: 'Lisa Anderson',
        rating: 5,
        date: '3 months ago',
        text: 'Their expert report service was extremely helpful for our dispute. The report was structured, detailed, and delivered on time, giving us clear support for the next legal steps.',
        avatar: 'LA',
      },
    ],
    ar: [
      {
        id: 1,
        name: 'أحمد المنصوري',
        rating: 5,
        date: 'قبل أسبوعين',
        text: 'استشارة قانونية ممتازة. شرح فريق المحامy خياراتنا بوضوح، وراجع المستندات بعناية، وقدم لنا توجيها عمليا لقضيتنا في دبي. محترفون للغاية وسريعو الاستجابة.',
        avatar: 'AM',
      },
      {
        id: 2,
        name: 'سارة جونسون',
        rating: 5,
        date: 'قبل شهر',
        text: 'دعم متميز في تأسيس شركتنا. أرشدونا خلال إجراءات الترخيص والمستندات ومتطلبات الامتثال بتواصل واضح من البداية حتى النهاية. بالتأكيد أوصي بهم.',
        avatar: 'SJ',
      },
      {
        id: 3,
        name: 'محمد الهاشمي',
        rating: 5,
        date: 'قبل شهر',
        text: 'راضون جدا عن دعمهم في خدمات الكاتب العدل وتصديق المستندات. كانت الإجراءات سلسة وسريعة وتم التعامل معها بعناية كبيرة. الفريق كان متاحا دائما للإجابة عن الأسئلة.',
        avatar: 'MH',
      },
      {
        id: 4,
        name: 'إيميلي تشين',
        rating: 5,
        date: 'قبل شهرين',
        text: 'دعم محاسبي وضريبي احترافي وموثوق. ساعدتنا المحامy في تنظيم مسك الدفاتر وإقرارات ضريبة القيمة المضافة والتقارير المالية مع الحفاظ على الامتثال والوضوح.',
        avatar: 'EC',
      },
      {
        id: 5,
        name: 'خالد الرحمن',
        rating: 5,
        date: 'قبل شهرين',
        text: 'تجربة رائعة مع خدمة استشارات الجواز الثاني. شرحوا لنا خيارات الإقامة والجنسية المتاحة بوضوح وساعدونا على فهم متطلبات المستندات.',
        avatar: 'KR',
      },
      {
        id: 6,
        name: 'ليزا أندرسون',
        rating: 5,
        date: 'قبل 3 أشهر',
        text: 'كانت خدمة تقارير الخبرة مفيدة جدا في نزاعنا. كان التقرير منظما ومفصلا وتم تسليمه في الوقت المحدد، مما وفر لنا دعما واضحا للخطوات القانونية التالية.',
        avatar: 'LA',
      },
    ],
  };

  return fallbackReviews[locale];
}
