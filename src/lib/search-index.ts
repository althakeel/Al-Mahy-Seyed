import { Locale } from '@/lib/translations';

export type SearchResultType = 'page' | 'service' | 'blog' | 'external';

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  description: string;
  href: string;
  score: number;
  isExternal?: boolean;
  source?: string;
}

/** Stable unique id for external results — uses full href to avoid truncation collisions. */
export function externalSearchResultId(href: string, prefix = 'ext'): string {
  return `${prefix}:${href}`;
}

interface StaticSearchEntry {
  id: string;
  type: SearchResultType;
  path: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  keywords?: string[];
}

const STATIC_ENTRIES: StaticSearchEntry[] = [
  {
    id: 'home',
    type: 'page',
    path: '',
    titleEn: 'Home',
    titleAr: 'الرئيسية',
    descriptionEn: 'Almahy for Legal Services trusted law firm in Dubai with 38 years of excellence.',
    descriptionAr: 'المحي للخدمات القانونية شركة محاماة موثوقة في دبي بخبرة 38 عامًا.',
    keywords: ['law firm', 'dubai', 'uae', 'legal'],
  },
  {
    id: 'services',
    type: 'page',
    path: '/services',
    titleEn: 'Our Services',
    titleAr: 'خدماتنا',
    descriptionEn: 'Comprehensive legal, corporate, notary, accounting, and advisory services in the UAE.',
    descriptionAr: 'خدمات قانونية ومؤسسية وتوثيق ومحاسبة واستشارية شاملة في الإمارات.',
    keywords: ['services', 'legal solutions'],
  },
  {
    id: 'legal-services',
    type: 'service',
    path: '/legal-services',
    titleEn: 'Legal Services',
    titleAr: 'الخدمات القانونية',
    descriptionEn: 'Legal consultation, contract drafting, dispute resolution, litigation support, and strategic legal advice in Dubai.',
    descriptionAr: 'استشارات قانونية وصياغة عقود وتسوية نزاعات ودعم التقاضي ونصائح قانونية استراتيجية في دبي.',
    keywords: ['lawyer', 'litigation', 'contracts', 'dispute', 'court'],
  },
  {
    id: 'corporate-services',
    type: 'service',
    path: '/corporate-services',
    titleEn: 'Corporate Services',
    titleAr: 'الخدمات المؤسسية',
    descriptionEn: 'Company formation, business setup, governance, compliance, licensing, and corporate legal support in the UAE.',
    descriptionAr: 'تأسيس الشركات وإعداد الأعمال والحوكمة والامتثال والتراخيص والدعم القانوني المؤسسي في الإمارات.',
    keywords: ['company formation', 'business setup', 'llc', 'corporate'],
  },
  {
    id: 'notary-public-services',
    type: 'service',
    path: '/notary-public-services',
    titleEn: 'Notary Public Services',
    titleAr: 'خدمات الكاتب العدل',
    descriptionEn: 'Power of attorney, document notarization, attestations, and legal certifications in Dubai.',
    descriptionAr: 'توكيلات وتوثيق مستندات وتصديقات وشهادات قانونية في دبي.',
    keywords: ['notary', 'power of attorney', 'attestation'],
  },
  {
    id: 'accounting-services',
    type: 'service',
    path: '/accounting-services',
    titleEn: 'Accounting Services',
    titleAr: 'الخدمات المحاسبية',
    descriptionEn: 'Bookkeeping, VAT, corporate tax, payroll, and financial reporting services across the UAE.',
    descriptionAr: 'مسك دفاتر وضريبة القيمة المضافة والضريبة على الشركات والرواتب والتقارير المالية في الإمارات.',
    keywords: ['accounting', 'vat', 'tax', 'bookkeeping', 'payroll'],
  },
  {
    id: 'second-passport',
    type: 'service',
    path: '/second-passport',
    titleEn: 'Second Passport & Citizenship',
    titleAr: 'الجواز الثاني والجنسية',
    descriptionEn: 'Second citizenship and residency-by-investment programs guidance and application support.',
    descriptionAr: 'إرشاد ودعم لبرامج الجنسية الثانية والإقامة عن طريق الاستثمار.',
    keywords: ['citizenship', 'passport', 'residency', 'investment'],
  },
  {
    id: 'expert-reports',
    type: 'service',
    path: '/expert-reports',
    titleEn: 'Expert Reports',
    titleAr: 'تقارير الخبرة',
    descriptionEn: 'Professional expert reports and legal documentation for disputes, arbitration, and court proceedings.',
    descriptionAr: 'تقارير خبرة فنية وقانونية لدعم النزاعات والتحكيم والإجراءات القضائية.',
    keywords: ['expert report', 'arbitration', 'court'],
  },
  {
    id: 'pricing',
    type: 'page',
    path: '/pricing-table',
    titleEn: 'Pricing',
    titleAr: 'الأسعار',
    descriptionEn: 'Transparent pricing for legal and corporate services in Dubai.',
    descriptionAr: 'أسعار شفافة للخدمات القانونية والمؤسسية في دبي.',
    keywords: ['pricing', 'fees', 'cost'],
  },
  {
    id: 'blogs',
    type: 'page',
    path: '/blogs',
    titleEn: 'Legal Blogs & Insights',
    titleAr: 'المدونة القانونية',
    descriptionEn: 'Expert legal articles, UAE regulatory updates, and practical guidance.',
    descriptionAr: 'مقالات قانونية متخصصة وتحديثات تنظيمية في الإمارات وإرشادات عملية.',
    keywords: ['blog', 'articles', 'news', 'insights'],
  },
  {
    id: 'about',
    type: 'page',
    path: '/about',
    titleEn: 'Who We Are',
    titleAr: 'من نحن',
    descriptionEn: 'Learn about Almahy Legal Services our mission, vision, and experienced legal team.',
    descriptionAr: 'تعرف على المحي للخدمات القانونية مهمتنا ورؤيتنا وفريقنا القانوني ذو الخبرة.',
    keywords: ['about', 'team', 'history'],
  },
  {
    id: 'contact',
    type: 'page',
    path: '/contact',
    titleEn: 'Contact Us',
    titleAr: 'اتصل بنا',
    descriptionEn: 'Get in touch with Almahy Legal Services for a consultation in Dubai.',
    descriptionAr: 'تواصل مع المحي للخدمات القانونية لحجز استشارة في دبي.',
    keywords: ['contact', 'consultation', 'phone', 'email'],
  },
  {
    id: 'tax-services',
    type: 'service',
    path: '/tax-services',
    titleEn: 'Tax Services',
    titleAr: 'الخدمات الضريبية',
    descriptionEn: 'VAT registration, corporate tax compliance, and tax advisory services in the UAE.',
    descriptionAr: 'تسجيل ضريبة القيمة المضافة والامتثال الضريبي للشركات والاستشارات الضريبية في الإمارات.',
    keywords: ['tax', 'vat', 'corporate tax'],
  },
];

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

const scoreMatch = (query: string, ...fields: string[]): number => {
  const q = normalize(query);
  if (!q) return 0;

  let score = 0;
  for (const field of fields) {
    const normalized = normalize(field);
    if (!normalized) continue;
    if (normalized === q) score += 100;
    else if (normalized.startsWith(q)) score += 60;
    else if (normalized.includes(q)) score += 30;

    const tokens = q.split(/\s+/).filter(Boolean);
    for (const token of tokens) {
      if (token.length < 2) continue;
      if (normalized.includes(token)) score += 10;
    }
  }
  return score;
};

export const searchStaticContent = (query: string, locale: Locale): SearchResult[] => {
  const results: SearchResult[] = [];

  for (const entry of STATIC_ENTRIES) {
    const title = locale === 'ar' ? entry.titleAr : entry.titleEn;
    const description = locale === 'ar' ? entry.descriptionAr : entry.descriptionEn;
    const keywords = entry.keywords?.join(' ') ?? '';

    const score = scoreMatch(query, title, description, keywords, entry.titleEn, entry.titleAr);
    if (score <= 0) continue;

    results.push({
      id: entry.id,
      type: entry.type,
      title,
      description,
      href: `/${locale}${entry.path}`,
      score,
    });
  }

  return results.sort((a, b) => b.score - a.score);
};

export const POPULAR_SEARCHES: Record<Locale, string[]> = {
  en: [
    'How to register a company in Dubai?',
    'Legal Services',
    'VAT Registration UAE',
    'Power of Attorney Dubai',
    'Employment dispute UAE',
  ],
  ar: [
    'كيف أسجل شركة في دبي؟',
    'الخدمات القانونية',
    'ضريبة القيمة المضافة',
    'توكيل في دبي',
    'نزاع عمل في الإمارات',
  ],
};
