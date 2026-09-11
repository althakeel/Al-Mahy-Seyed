import type { Metadata } from 'next';
import { buildPageMetadata, PAGE_SEO } from '@/lib/site-metadata';
import { ServicePageSeo } from '@/lib/with-service-seo';
import { Locale } from '@/lib/translations';
import { isValidLocale } from '@/lib/utils';
import ExpertReportsHero from '@/components/expert-reports/ExpertReportsHero';
import ExpertReportsServicesSection from '@/components/expert-reports/ExpertReportsServicesSection';
import ExpertReportsDeliverablesGrid from '@/components/expert-reports/ExpertReportsDeliverablesGrid';
import ExpertReportsTrustedSection from '@/components/expert-reports/ExpertReportsTrustedSection';
import ExpertReportsWhySection from '@/components/expert-reports/ExpertReportsWhySection';
import ExpertReportsInlineCta from '@/components/expert-reports/ExpertReportsInlineCta';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1556740772-1a741367b93e?auto=format&fit=crop&w=600&q=80',
    alt: 'Financial Analysis',
  },
  {
    src: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80',
    alt: 'Legal Expert',
  },
  {
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
    alt: 'Forensic Accounting',
  },
  {
    src: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
    alt: 'Arbitration',
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isValidLocale(locale) ? locale : 'en';
  return buildPageMetadata(lang, '/expert-reports', PAGE_SEO.expertReports);
}

export default async function ExpertReportsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isValidLoc = locale === 'en' || locale === 'ar';
  const lang = isValidLoc ? (locale as Locale) : 'en';
  const isArabic = lang === 'ar';

  const content = {
    en: {
      heroTitle: 'Expert Financial & Legal Reports',
      heroDesc: 'Professional, evidence-based reports for legal cases, arbitration, and corporate disputes.',
      servicesTitle: 'Our Expert Services',
      servicesDesc:
        'We specialize in the preparation of <b>Expert Financial Reports</b> and <b>Expert Legal Reports</b> designed to support legal cases, arbitration proceedings, corporate disputes, and regulatory matters. Our reports are prepared with professional accuracy, detailed financial analysis, and clear documentation to ensure they meet the standards required by courts, law firms, and regulatory authorities.',
      deliverTitle: 'What We Deliver',
      deliverList: [
        'Expert Financial Reports for Court and Arbitration',
        'Expert Legal Reports for Dispute Resolution',
        'Forensic Accounting and Financial Investigation',
        'Litigation Support and Financial Expert Analysis',
        'Business Valuation Reports',
        'Financial Damage and Loss Assessment',
        'Independent Financial Review for Legal Cases',
        'Corporate Financial Dispute Analysis',
      ],
      trustedTitle: 'Trusted by Legal & Corporate Clients',
      trustedDesc1:
        'We assist law firms, corporations, government entities, and private clients by providing credible financial analysis and expert reporting. Our objective approach ensures that every report delivers clear financial insight, transparency, and professional integrity.',
      trustedDesc2:
        'Whether you require an Expert Financial Report for litigation, a forensic accounting analysis, or an independent expert legal opinion, our team provides reliable reporting to support your case and decision-making process.',
      whyTitle: 'Why Choose Us?',
      whyList: [
        'Professionally structured, evidence-based, and clear reports',
        'Prepared by experienced financial and legal experts',
        'Objective, independent, and reliable findings',
        'Compliant with court and regulatory standards',
        'Trusted by law firms, corporations, and government entities',
      ],
      cta: 'For expert reports, forensic analysis, or legal opinions, contact our team today.',
    },
    ar: {
      heroTitle: 'تقارير مالية وقانونية خبرة',
      heroDesc: 'تقارير مهنية قائمة على الأدلة لدعم القضايا القانونية والتحكيم والنزاعات التجارية.',
      servicesTitle: 'خدماتنا المتخصصة',
      servicesDesc:
        'نحن متخصصون في إعداد <b>تقارير مالية خبرة</b> و<b>تقارير قانونية خبرة</b> لدعم القضايا القانونية، والتحكيم، والنزاعات التجارية، والمسائل التنظيمية. يتم إعداد تقاريرنا بدقة مهنية وتحليل مالي مفصل وتوثيق واضح لضمان مطابقتها للمعايير المطلوبة من المحاكم ومكاتب المحاماة والجهات التنظيمية.',
      deliverTitle: 'ماذا نقدم',
      deliverList: [
        'تقارير مالية خبرة للمحاكم والتحكيم',
        'تقارير قانونية خبرة لحل النزاعات',
        'محاسبة جنائية وتحقيق مالي',
        'دعم القضايا وتحليل خبير مالي',
        'تقارير تقييم الأعمال',
        'تقييم الأضرار والخسائر المالية',
        'مراجعة مالية مستقلة للقضايا القانونية',
        'تحليل النزاعات المالية للشركات',
      ],
      trustedTitle: 'موثوق به من قبل العملاء القانونيين والتجاريين',
      trustedDesc1:
        'نساعد مكاتب المحاماة والشركات والجهات الحكومية والعملاء الأفراد من خلال تقديم تحليل مالي موثوق وتقارير خبرة. يضمن نهجنا الموضوعي أن يقدم كل تقرير رؤية مالية واضحة وشفافية ونزاهة مهنية.',
      trustedDesc2:
        'سواء كنت بحاجة إلى تقرير مالي خبير للتقاضي، أو تحليل محاسبي جنائي، أو رأي قانوني خبير مستقل، فإن فريقنا يقدم تقارير موثوقة لدعم قضيتك وقراراتك.',
      whyTitle: 'لماذا تختارنا؟',
      whyList: [
        'تقارير منظمة ومبنية على الأدلة وواضحة',
        'إعداد من قبل خبراء ماليين وقانونيين ذوي خبرة',
        'نتائج موضوعية ومستقلة وموثوقة',
        'مطابقة لمعايير المحاكم والجهات التنظيمية',
        'موثوق به من قبل مكاتب المحاماة والشركات والجهات الحكومية',
      ],
      cta: 'للحصول على تقارير خبرة أو تحليل جنائي أو رأي قانوني، تواصل مع فريقنا اليوم.',
    },
  };

  const c = content[lang];

  // Hero highlight labels reuse the first three deliverables — no new copy invented.
  const heroHighlights = c.deliverList.slice(0, 3);

  return (
    <>
      <ServicePageSeo locale={lang} path="/expert-reports" copy={PAGE_SEO.expertReports} />
    <div
      className={`min-h-screen bg-white text-[#160A0A] ${isArabic ? 'text-right' : 'text-left'}`}
      dir={isArabic ? 'rtl' : 'ltr'}
      lang={lang}
    >
      <ExpertReportsHero
        isArabic={isArabic}
        title={c.heroTitle}
        subtitle={c.heroDesc}
        highlights={heroHighlights}
      />

      <ExpertReportsServicesSection
        isArabic={isArabic}
        title={c.servicesTitle}
        descriptionHtml={c.servicesDesc}
        images={galleryImages}
      />

      <ExpertReportsDeliverablesGrid
        isArabic={isArabic}
        title={c.deliverTitle}
        items={c.deliverList}
      />

      <ExpertReportsTrustedSection
        isArabic={isArabic}
        title={c.trustedTitle}
        paragraph1={c.trustedDesc1}
        paragraph2={c.trustedDesc2}
      />

      <ExpertReportsWhySection
        isArabic={isArabic}
        title={c.whyTitle}
        items={c.whyList}
      />

      <ExpertReportsInlineCta text={c.cta} />
    </div>
    </>
  );
}
