import type { Metadata } from 'next';
import { buildPageMetadata, PAGE_SEO } from '@/lib/site-metadata';
import { ServicePageSeo } from '@/lib/with-service-seo';
import { Locale } from '@/lib/translations';
import { isValidLocale } from '@/lib/utils';
import AccountingServicesHero from '@/components/accounting-services/AccountingServicesHero';
import AccountingIntroSection from '@/components/accounting-services/AccountingIntroSection';
import AccountingDeliverablesGrid from '@/components/accounting-services/AccountingDeliverablesGrid';
import AccountingWhyChooseSection from '@/components/accounting-services/AccountingWhyChooseSection';
import AccountingCtaSection from '@/components/accounting-services/AccountingCtaSection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isValidLocale(locale) ? locale : 'en';
  return buildPageMetadata(lang, '/accounting-services', PAGE_SEO.accountingServices);
}

export default async function AccountingServicesPage({
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
      heroTitle: 'Accounting Services',
      heroSubtitle:
        'Professional accounting, bookkeeping, VAT, corporate tax, payroll, and financial compliance services for businesses across the UAE',
      mainTitle: 'Professional Accounting Solutions',
      mainDesc:
        'Our accounting professionals help businesses maintain accurate financial records, meet UAE tax and regulatory requirements, and make informed financial decisions. We provide reliable accounting, bookkeeping, payroll, VAT, corporate tax, and financial reporting services tailored to businesses of all sizes.',
      services: [
        {
          title: 'Bookkeeping Services',
          desc: 'Record daily transactions, reconcile accounts, and maintain organized financial records that support compliance and reporting.',
        },
        {
          title: 'Financial Accounting & Reporting',
          desc: 'Maintain accurate financial records, prepare financial statements, and deliver timely reports to support informed business decisions.',
        },
        {
          title: 'Financial Statement Preparation',
          desc: 'Prepare professionally structured balance sheets, income statements, cash flow statements, and other statutory financial reports.',
        },
        {
          title: 'VAT & Corporate Tax',
          desc: 'Prepare VAT and corporate tax returns, ensure regulatory compliance, and provide practical tax planning for UAE businesses.',
        },
        {
          title: 'Payroll Management',
          desc: 'Process employee salaries accurately while managing payroll records, statutory deductions, and compliance requirements.',
        },
        {
          title: 'Cost Control & Analysis',
          desc: 'Track business costs, analyze financial performance, and identify opportunities to improve profitability and operational efficiency.',
        },
        {
          title: 'Financial Advisory & Management Reporting',
          desc: 'Provide management reports, budgeting support, and financial insights that help business owners make confident strategic decisions.',
        },
        {
          title: 'Accounting System Setup',
          desc: 'Implement and configure accounting systems tailored to your business operations for efficient financial management.',
        },
      ],
      whyUs: [
        {
          title: 'UAE Compliance Experts',
          desc: 'Our accountants ensure your business complies with UAE VAT, Corporate Tax, and financial reporting requirements while minimizing compliance risks.',
        },
        {
          title: 'End-to-End Business Support',
          desc: 'From bookkeeping and payroll to tax filing and financial reporting, we provide complete accounting solutions under one roof.',
        },
        {
          title: 'Accurate & Timely Reporting',
          desc: 'Receive reliable financial records and timely reports that help you make confident business decisions and maintain operational transparency.',
        },
        {
          title: 'Trusted Compliance Partner',
          desc: 'Helping businesses meet UAE financial regulations while reducing operational and tax risks.',
        },
      ],
      ctaText: 'Book a Consultation',
      chips: ['VAT', 'Corporate Tax', 'Bookkeeping', 'Payroll', 'Financial Reporting'],
    },
    ar: {
      heroTitle: 'خدمات المحاسبة',
      heroSubtitle:
        'خدمات محاسبة ومسك دفاتر وضريبة القيمة المضافة وضريبة الشركات والرواتب والامتثال المالي للشركات في جميع أنحاء الإمارات',
      mainTitle: 'حلول محاسبية احترافية',
      mainDesc:
        'نقدّم في الماحي للخدمات القانونية خدمات محاسبية احترافية من خلال محاسبين مؤهلين بخبرة واسعة في مختلف أنشطة الشركات. يعتمد نجاح أي مؤسسة على فعالية نظامها المحاسبي والمالي، والمحاسب المحترف هو حجر الزاوية في هذا النظام.',
      services: [
        { title: 'خدمات مسك الدفاتر', desc: 'تسجيل المعاملات اليومية الدقيق والمطابقة والوثائق المالية المنظمة.' },
        { title: 'المحاسبة المالية والتقارير', desc: 'مسك دفاتر مالية كاملة وإعداد القوائم وإعداد تقارير شاملة لاتخاذ قرارات مستنيرة.' },
        { title: 'إعداد القوائم المالية', desc: 'إعداد احترافي للميزانية العمومية وبيانات الدخل وبيانات التدفق النقدي.' },
        { title: 'ضريبة القيمة المضافة وضريبة الشركات', desc: 'خدمات تخطيط وإعداد وامتثال ضريبية متخصصة لتقليل الالتزامات وضمان الالتزام التنظيمي.' },
        { title: 'إدارة الرواتب', desc: 'معالجة كشوف المرتبات بكفاءة وإدارة سجلات الموظفين وإدارة الرواتب الشاملة.' },
        { title: 'محاسبة التكاليف والتحليل', desc: 'تتبع وتحليل وتحسين التكاليف التفصيلية لتحسين الربحية والكفاءة التشغيلية.' },
        { title: 'الاستشارات المالية والتقارير الإدارية', desc: 'رؤى مالية استراتيجية ومقاييس أداء للإدارة الفعالة للأعمال والنمو.' },
        { title: 'إعداد النظام المحاسبي', desc: 'تنفيذ وتكوين نظام محاسبي مخصص مصمم خصيصًا لاحتياجات عملك.' },
      ],
      whyUs: [
        { title: 'خبراء امتثال إماراتيون', desc: 'نضمن امتثال أعمالك لضريبة القيمة المضافة وضريبة الشركات ومتطلبات التقارير المالية.' },
        { title: 'دعم متكامل للأعمال', desc: 'من مسك الدفاتر والرواتب إلى الإقرارات الضريبية والتقارير المالية تحت سقف واحد.' },
        { title: 'تقارير دقيقة وفي الوقت', desc: 'سجلات مالية موثوقة وتقارير في مواعيدها لدعم قرارات أوضح.' },
        { title: 'شريك امتثال موثوق', desc: 'نساعد الشركات على تلبية الأنظمة المالية الإماراتية وتقليل المخاطر.' },
      ],
      ctaText: 'احجز استشارة',
      chips: ['ضريبة القيمة المضافة', 'ضريبة الشركات', 'مسك الدفاتر', 'الرواتب', 'التقارير المالية'],
    },
  };

  const pageContent = content[lang];

  const ctaDescription = isArabic
    ? 'سواء كنت تطلق شركة ناشئة أو تدير عملاً قائمًا، فريقنا جاهز للمساعدة في مسك الدفاتر والامتثال الضريبي والرواتب والتقارير المالية.'
    : 'Whether you are launching a startup or managing an established business, our accounting professionals are ready to help with bookkeeping, tax compliance, payroll, and financial reporting across the UAE.';

  return (
    <>
      <ServicePageSeo locale={lang} path="/accounting-services" copy={PAGE_SEO.accountingServices} />
    <div
      className={`min-h-screen bg-white text-[#160A0A] ${isArabic ? 'text-right' : 'text-left'}`}
      dir={isArabic ? 'rtl' : 'ltr'}
      lang={lang}
    >
      <AccountingServicesHero
        isArabic={isArabic}
        lang={lang}
        badge={isArabic ? 'الماحي · المحاسبة' : 'Almahy · Accounting'}
        title={pageContent.heroTitle}
        subtitle={pageContent.heroSubtitle}
        chips={pageContent.chips}
        ctaText={pageContent.ctaText}
        contactLabel={isArabic ? 'تواصل معنا' : 'Contact Us'}
      />

      <AccountingIntroSection
        isArabic={isArabic}
        eyebrow={isArabic ? 'حلولنا' : 'Our solutions'}
        title={pageContent.mainTitle}
        description={pageContent.mainDesc}
      />

      <AccountingDeliverablesGrid
        isArabic={isArabic}
        eyebrow={isArabic ? 'الخدمات' : 'Services'}
        title={isArabic ? 'ماذا نقدّم' : 'What we deliver'}
        services={pageContent.services}
      />

      <AccountingWhyChooseSection
        isArabic={isArabic}
        title={
          isArabic
            ? 'لماذا تختار الماحي للخدمات القانونية للمحاسبة؟'
            : 'Why Choose Almahy Legal Services Accounting?'
        }
        items={pageContent.whyUs}
      />

      <AccountingCtaSection
        isArabic={isArabic}
        lang={lang}
        eyebrow={isArabic ? 'ابدأ الآن' : 'Get started'}
        title={isArabic ? 'تواصل معنا اليوم' : 'Get In Touch Today'}
        description={ctaDescription}
        ctaText={pageContent.ctaText}
        contactLabel={isArabic ? 'تواصل معنا' : 'Contact Us'}
      />
    </div>
    </>
  );
}
