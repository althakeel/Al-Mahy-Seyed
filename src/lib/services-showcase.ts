import { Locale } from '@/lib/translations';

export type ServiceFeature = {
  label: string;
  icon: 'scales' | 'team' | 'document' | 'building' | 'shield' | 'chart';
};

export type ServiceShowcaseItem = {
  slug: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  features: ServiceFeature[];
};

const serviceImages: Record<string, string> = {
  'legal-services': '/assets/services/legal-services-team.jpg',
  'corporate-services': '/assets/services/corporate-team.webp',
  'notary-public-services': '/assets/services/notory.webp',
  'accounting-services': '/assets/services/accounting.jpg',
  'second-passport': '/assets/services/passport.webp',
  'expert-reports': '/assets/services/reports.webp',
};

export function getServiceShowcaseItems(locale: Locale): ServiceShowcaseItem[] {
  const enItems: ServiceShowcaseItem[] = [
    {
      slug: 'legal-services',
      title: 'LEGAL SERVICES',
      description:
        'Expert legal services in Dubai for individuals and businesses, including legal consultation, contract drafting, dispute resolution, litigation support, and strategic legal advice.',
      image: serviceImages['legal-services'],
      alt: 'Almahy Legal Services team in Dubai',
      features: [
        { label: 'Practical Solutions', icon: 'scales' },
        { label: 'Experienced Legal Team', icon: 'team' },
        { label: 'Client Focused Approach', icon: 'document' },
      ],
    },
    {
      slug: 'corporate-services',
      title: 'CORPORATE SERVICES',
      description:
        'Comprehensive corporate services for startups, SMEs, and established businesses, including company formation, governance, compliance, licensing, and ongoing corporate legal support throughout the UAE.',
      image: serviceImages['corporate-services'],
      alt: 'Corporate legal services and business setup in Dubai',
      features: [
        { label: 'Company Formation', icon: 'building' },
        { label: 'Governance & Compliance', icon: 'shield' },
        { label: 'Strategic Business Support', icon: 'chart' },
      ],
    },
    {
      slug: 'notary-public-services',
      title: 'NOTARY PUBLIC SERVICES',
      description:
        'Professional notary public services, including power of attorney preparation, document notarization, legal declarations, attestations, and certification to meet UAE legal requirements.',
      image: serviceImages['notary-public-services'],
      alt: 'Notary public services in Dubai',
      features: [
        { label: 'Document Notarization', icon: 'document' },
        { label: 'Power of Attorney', icon: 'scales' },
        { label: 'Certified Attestations', icon: 'shield' },
      ],
    },
    {
      slug: 'accounting-services',
      title: 'ACCOUNTING SERVICES',
      description:
        'Reliable accounting services designed to help businesses maintain financial accuracy, regulatory compliance, VAT and corporate tax obligations, bookkeeping, payroll, and financial reporting across the UAE.',
      image: serviceImages['accounting-services'],
      alt: 'Accounting and tax services in the UAE',
      features: [
        { label: 'Bookkeeping & Reporting', icon: 'chart' },
        { label: 'Tax Compliance', icon: 'document' },
        { label: 'Payroll Management', icon: 'team' },
      ],
    },
    {
      slug: 'second-passport',
      title: 'SECOND PASSPORT',
      description:
        'Professional guidance on second citizenship and residency-by-investment programs, including eligibility assessment, document preparation, application management, and end-to-end support for international mobility.',
      image: serviceImages['second-passport'],
      alt: 'Second citizenship and residency advisory services',
      features: [
        { label: 'Eligibility Review', icon: 'document' },
        { label: 'Application Support', icon: 'team' },
        { label: 'Global Mobility Planning', icon: 'shield' },
      ],
    },
    {
      slug: 'expert-reports',
      title: 'EXPERT REPORTS',
      description:
        'Preparation of professional expert reports and legal documentation to support commercial disputes, court proceedings, arbitration, insurance claims, and technical matters with clear, evidence-based analysis.',
      image: serviceImages['expert-reports'],
      alt: 'Professional legal expert reports in Dubai',
      features: [
        { label: 'Evidence-Based Analysis', icon: 'scales' },
        { label: 'Dispute Support', icon: 'document' },
        { label: 'Court-Ready Reports', icon: 'shield' },
      ],
    },
  ];

  const arItems: ServiceShowcaseItem[] = [
    {
      slug: 'legal-services',
      title: 'الخدمات القانونية',
      description:
        'خدمات قانونية متخصصة في دبي للأفراد والشركات، تشمل الاستشارات وصياغة العقود وتسوية النزاعات ودعم التقاضي والنصح القانوني الاستراتيجي.',
      image: serviceImages['legal-services'],
      alt: 'فريق الماحي للخدمات القانونية في دبي',
      features: [
        { label: 'حلول عملية', icon: 'scales' },
        { label: 'فريق قانوني ذو خبرة', icon: 'team' },
        { label: 'نهج يركز على العميل', icon: 'document' },
      ],
    },
    {
      slug: 'corporate-services',
      title: 'خدمات الشركات',
      description:
        'خدمات مؤسسية شاملة للشركات الناشئة والصغيرة والمتوسطة والقائمة، تشمل التأسيس والحوكمة والامتثال والتراخيص وإعادة الهيكلة والدعم القانوني المستمر في الإمارات.',
      image: serviceImages['corporate-services'],
      alt: 'خدمات الشركات وتأسيس الأعمال في دبي',
      features: [
        { label: 'تأسيس الشركات', icon: 'building' },
        { label: 'الحوكمة والامتثال', icon: 'shield' },
        { label: 'دعم الأعمال الاستراتيجي', icon: 'chart' },
      ],
    },
    {
      slug: 'notary-public-services',
      title: 'خدمات الكاتب العدل',
      description:
        'خدمات كاتب عدل احترافية تشمل إعداد التوكيلات وتوثيق المستندات والإقرارات والتصديقات والشهادات وفق المتطلبات الحكومية والقانونية.',
      image: serviceImages['notary-public-services'],
      alt: 'خدمات الكاتب العدل في دبي',
      features: [
        { label: 'توثيق المستندات', icon: 'document' },
        { label: 'التوكيلات القانونية', icon: 'scales' },
        { label: 'تصديقات معتمدة', icon: 'shield' },
      ],
    },
    {
      slug: 'accounting-services',
      title: 'خدمات المحاسبة',
      description:
        'خدمات محاسبية موثوقة لمساعدة الشركات على الحفاظ على الدقة المالية والامتثال التنظيمي وضريبة القيمة المضافة وضريبة الشركات ومسك الدفاتر والرواتب والتقارير المالية في الإمارات.',
      image: serviceImages['accounting-services'],
      alt: 'خدمات المحاسبة والضرائب في الإمارات',
      features: [
        { label: 'مسك الدفاتر والتقارير', icon: 'chart' },
        { label: 'الامتثال الضريبي', icon: 'document' },
        { label: 'إدارة الرواتب', icon: 'team' },
      ],
    },
    {
      slug: 'second-passport',
      title: 'الجواز الثاني',
      description:
        'إرشاد احترافي لبرامج الجنسية الثانية والإقامة عبر الاستثمار، يشمل تقييم الأهلية وتجهيز المستندات وإدارة الطلبات والدعم الكامل للتنقل الدولي.',
      image: serviceImages['second-passport'],
      alt: 'استشارات الجنسية الثانية والإقامة',
      features: [
        { label: 'تقييم الأهلية', icon: 'document' },
        { label: 'دعم التقديم', icon: 'team' },
        { label: 'تخطيط التنقل العالمي', icon: 'shield' },
      ],
    },
    {
      slug: 'expert-reports',
      title: 'تقارير الخبرة',
      description:
        'إعداد تقارير خبرة ووثائق قانونية احترافية لدعم النزاعات التجارية والإجراءات القضائية والتحكيم ومطالبات التأمين والمسائل الفنية بتحليل واضح قائم على الأدلة.',
      image: serviceImages['expert-reports'],
      alt: 'تقارير الخبرة القانونية في دبي',
      features: [
        { label: 'تحليل قائم على الأدلة', icon: 'scales' },
        { label: 'دعم النزاعات', icon: 'document' },
        { label: 'تقارير جاهزة للمحكمة', icon: 'shield' },
      ],
    },
  ];

  return locale === 'ar' ? arItems : enItems;
}

export function splitServiceTitle(title: string): { primary: string; accent: string } {
  const parts = title.trim().split(/\s+/);
  if (parts.length <= 1) {
    return { primary: title, accent: '' };
  }
  const accent = parts.pop() as string;
  return { primary: parts.join(' '), accent };
}
