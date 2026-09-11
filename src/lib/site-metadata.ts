import type { Metadata } from 'next';
import { Locale } from '@/lib/translations';

export const DEFAULT_SITE_URL = 'https://almahy.com';

export const getSiteUrl = () => {
  const configured = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || DEFAULT_SITE_URL;
  return configured.replace(/\/$/, '');
};

export type PageSeoCopy = {
  en: { title: string; description: string };
  ar: { title: string; description: string };
};

export const PAGE_SEO = {
  home: {
    en: {
      title: 'Almahy Legal Services | Corporate & Legal Law Dubai',
      description:
        'Legal consultation, corporate & notary services, accounting, second passport programs, and expert reports in Dubai, UAE. Trusted legal advisors since 1987.',
    },
    ar: {
      title: 'المحي للخدمات القانونية | استشارات قانونية دبي',
      description:
        'استشارات قانونية، خدمات شركات وتوثيق، محاسبة، جواز سفر ثانٍ، وتقارير خبراء في دبي والإمارات. خبرة قانونية موثوقة منذ 1987.',
    },
  },
  about: {
    en: {
      title: 'About Us | Almahy Legal Services Dubai',
      description:
        'Meet Almahy Legal Services — 38+ years of legal expertise in Dubai. Our mission, vision, global network, and team serving UAE and international clients.',
    },
    ar: {
      title: 'من نحن | المحي للخدمات القانونية دبي',
      description:
        'تعرف على المحي للخدمات القانونية — أكثر من 38 عامًا من الخبرة في دبي. رسالتنا ورؤيتنا وشبكتنا العالمية وفريقنا في الإمارات.',
    },
  },
  services: {
    en: {
      title: 'Our Services | Almahy Legal Services UAE',
      description:
        'Explore Almahy legal, corporate, notary, accounting, second passport, and expert report services for individuals and businesses in Dubai and the UAE.',
    },
    ar: {
      title: 'خدماتنا | المحي للخدمات القانونية الإمارات',
      description:
        'استكشف خدمات المحي القانونية والشركات والتوثيق والمحاسبة والجواز الثاني والتقارير الخبراء للأفراد والشركات في دبي والإمارات.',
    },
  },
  legalServices: {
    en: {
      title: 'Legal Services Dubai | Litigation & Arbitration',
      description:
        'Expert legal services in Dubai — litigation, arbitration, dispute resolution, and regulatory compliance for individuals and businesses across the UAE.',
    },
    ar: {
      title: 'خدمات قانونية دبي | تقاضي وتحكيم',
      description:
        'خدمات قانونية متخصصة في دبي — تقاضي وتحكيم وتسوية نزاعات وامتثال تنظيمي للأفراد والشركات في جميع أنحاء الإمارات.',
    },
  },
  corporateServices: {
    en: {
      title: 'Corporate Services Dubai | Business Law UAE',
      description:
        'Corporate legal services in Dubai — company formation, contracts, M&A, governance, and commercial advisory for UAE and international businesses.',
    },
    ar: {
      title: 'خدمات الشركات دبي | قانون الأعمال الإمارات',
      description:
        'خدمات قانونية للشركات في دبي — تأسيس شركات وعقود واندماج واستحواذ وحوكمة واستشارات تجارية للشركات في الإمارات.',
    },
  },
  accountingServices: {
    en: {
      title: 'Accounting Services Dubai | VAT & Bookkeeping UAE',
      description:
        'Professional accounting and bookkeeping in Dubai — VAT compliance, financial reporting, payroll, and tax advisory for UAE businesses.',
    },
    ar: {
      title: 'خدمات محاسبة دبي | ضريبة القيمة المضافة الإمارات',
      description:
        'محاسبة واحتفاظ بالدفاتر في دبي — امتثال ضريبة القيمة المضافة وتقارير مالية ورواتب واستشارات ضريبية للشركات في الإمارات.',
    },
  },
  notaryServices: {
    en: {
      title: 'Notary Public Services Dubai | Document Attestation',
      description:
        'Notary public services in Dubai — document notarization, power of attorney, certified attestations, and legal document authentication in the UAE.',
    },
    ar: {
      title: 'خدمات التوثيق دبي | تصديق المستندات الإمارات',
      description:
        'خدمات التوثيق في دبي — توثيق مستندات وتوكيلات وتصديقات معتمدة ومصادقة المستندات القانونية في الإمارات.',
    },
  },
  secondPassport: {
    en: {
      title: 'Second Passport Programs | Citizenship by Investment',
      description:
        'Second passport and citizenship by investment guidance — Caribbean and Turkey CBI programs, eligibility, timelines, and expert advisory from Dubai.',
    },
    ar: {
      title: 'برامج الجواز الثاني | جنسية عبر الاستثمار',
      description:
        'إرشاد الجواز الثاني والجنسية عبر الاستثمار — برامج الكاريبي وتركيا، الأهلية والمدة الزمنية واستشارات خبراء من دبي.',
    },
  },
  expertReports: {
    en: {
      title: 'Expert Reports Dubai | Legal & Financial Analysis',
      description:
        'Expert legal and financial reports in Dubai — due diligence, valuation, forensic analysis, and court-ready expert opinions for UAE disputes.',
    },
    ar: {
      title: 'تقارير خبراء دبي | تحليل قانوني ومالي',
      description:
        'تقارير خبراء قانونية ومالية في دبي — العناية الواجبة والتقييم والتحليل الجنائي وآراء خبراء للنزاعات في الإمارات.',
    },
  },
  contact: {
    en: {
      title: 'Contact Us | Almahy Legal Services Dubai',
      description:
        'Contact Almahy Legal Services in Dubai for consultations, appointments, and office directions. Phone, email, WhatsApp — DIFC, Sheikh Zayed Road.',
    },
    ar: {
      title: 'تواصل معنا | المحي للخدمات القانونية دبي',
      description:
        'تواصل مع المحي للخدمات القانونية في دبي للاستشارات والمواعيد. هاتف وبريد وواتساب — مركز دبي المالي، شارع الشيخ زayed.',
    },
  },
  blogs: {
    en: {
      title: 'Legal Blog & Insights | Almahy UAE Updates',
      description:
        'Legal insights and UAE regulatory updates from Almahy — expert articles on corporate law, tax, immigration, and business compliance in Dubai.',
    },
    ar: {
      title: 'مدونة قانونية | أخبار وتحديثات المحي الإمارات',
      description:
        'رؤى قانونية وتحديثات تنظيمية من المحي — مقالات خبراء في قانون الشركات والضرائب والهجرة والامتثال التجاري في دبي.',
    },
  },
  pricingTable: {
    en: {
      title: 'Legal Services Packages | Almahy Dubai',
      description:
        'Transparent legal services packages and pricing from Almahy in Dubai — litigation, corporate, notary, accounting, and advisory fee structures.',
    },
    ar: {
      title: 'باقات الخدمات القانونية | المحي دبي',
      description:
        'باقات وأسعار خدمات قانونية شفافة من المحي في دبي — هيكل رسوم التقاضي والشركات والتوثيق والمحاسبة والاستشارات.',
    },
  },
  search: {
    en: {
      title: 'Search | Almahy Legal Services Dubai',
      description:
        'Search Almahy Legal Services for legal services, corporate solutions, blogs, and expert guidance in Dubai and the UAE.',
    },
    ar: {
      title: 'بحث | المحي للخدمات القانونية دبي',
      description:
        'ابحث في خدمات المحي القانونية ومقالاتنا وصفحاتنا في دبي والإمارات.',
    },
  },
  privacy: {
    en: {
      title: 'Privacy Policy | Almahy Legal Services',
      description:
        'Almahy Legal Services privacy policy — how we collect, use, and protect your personal data in compliance with UAE regulations.',
    },
    ar: {
      title: 'سياسة الخصوصية | المحي للخدمات القانونية',
      description:
        'سياسة خصوصية المحي للخدمات القانونية — كيف نجمع ونستخدم ونحمي بياناتك الشخصية وفقًا للوائح الإمارات.',
    },
  },
  terms: {
    en: {
      title: 'Terms of Service | Almahy Legal Services',
      description:
        'Terms of service for Almahy Legal Services website — usage conditions, disclaimers, and legal information for clients in the UAE.',
    },
    ar: {
      title: 'شروط الخدمة | المحي للخدمات القانونية',
      description:
        'شروط استخدام موقع المحي للخدمات القانونية — شروط الاستخدام وإخلاء المسؤولية والمعلومات القانونية للعملاء في الإمارات.',
    },
  },
  taxServices: {
    en: {
      title: 'Tax Services Dubai | UAE Tax Advisory',
      description:
        'Tax advisory services in Dubai — corporate tax, VAT, transfer pricing, and compliance support for businesses operating in the UAE.',
    },
    ar: {
      title: 'خدمات ضريبية دبي | استشارات ضريبة الإمارات',
      description:
        'خدمات استشارات ضريبية في دبي — ضريبة الشركات وضريبة القيمة المضافة وتسعير التحويل ودعم الامتثال للشركات في الإمارات.',
    },
  },
  professionalServices: {
    en: {
      title: 'Professional Services | Almahy Legal Dubai',
      description:
        'Professional advisory services from Almahy in Dubai — business consulting, compliance, and specialized legal support for UAE enterprises.',
    },
    ar: {
      title: 'خدمات مهنية | المحي القانونية دبي',
      description:
        'خدمات استشارية مهنية من المحي في دبي — استشارات أعمال وامتثال ودعم قانوني متخصص للمؤسسات في الإمارات.',
    },
  },
} as const satisfies Record<string, PageSeoCopy>;

export const buildLocalePath = (locale: Locale, path: string) => {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized === '/') {
    return `/${locale}`;
  }
  return `/${locale}${normalized}`;
};

export const buildAlternates = (locale: Locale, path: string): NonNullable<Metadata['alternates']> => {
  const base = getSiteUrl();
  return {
    canonical: `${base}${buildLocalePath(locale, path)}`,
    languages: {
      en: `${base}${buildLocalePath('en', path)}`,
      ar: `${base}${buildLocalePath('ar', path)}`,
      'x-default': `${base}${buildLocalePath('en', path)}`,
    },
  };
};

export const buildPageMetadata = (
  locale: Locale,
  path: string,
  copy: PageSeoCopy,
  overrides?: Partial<Metadata>,
): Metadata => {
  const content = locale === 'ar' ? copy.ar : copy.en;

  return {
    title: content.title,
    description: content.description,
    alternates: buildAlternates(locale, path),
    openGraph: {
      title: content.title,
      description: content.description,
      url: `${getSiteUrl()}${buildLocalePath(locale, path)}`,
      siteName: locale === 'ar' ? 'المحي للخدمات القانونية' : 'Almahy Legal Services',
      locale: locale === 'ar' ? 'ar_AE' : 'en_AE',
      alternateLocale: locale === 'ar' ? ['en_AE'] : ['ar_AE'],
      type: 'website',
    },
    ...overrides,
  };
};

export const buildNoIndexMetadata = (locale: Locale, path: string, title: string): Metadata => ({
  title,
  robots: { index: false, follow: false },
  alternates: buildAlternates(locale, path),
});
