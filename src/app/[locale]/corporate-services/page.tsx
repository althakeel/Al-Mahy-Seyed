import { Locale } from '@/lib/translations';
import CorporateServicesHero from '@/components/corporate-services/CorporateServicesHero';
import OfficeSolutionsSection from '@/components/corporate-services/OfficeSolutionsSection';
import CorporateServiceGrid from '@/components/corporate-services/CorporateServiceGrid';
import CorporateNewsSection from '@/components/corporate-services/CorporateNewsSection';

type NewsItem = {
  title: string;
  image: string;
  date: string;
  url?: string;
};

type ServiceItem = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

const officeFallbackImages = [
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=700&fit=crop',
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=700&fit=crop',
  'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=700&fit=crop',
];

const newsFallbackImages = [
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=700&fit=crop',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=700&fit=crop',
  'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=700&fit=crop',
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=700&fit=crop',
  'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=700&fit=crop',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=700&fit=crop',
];

function formatNewsDate(dateValue: string | undefined, isArabic: boolean): string {
  if (!dateValue) {
    return isArabic ? 'تحديث حديث' : 'Recent update';
  }

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return new Intl.DateTimeFormat(isArabic ? 'ar-AE' : 'en-AE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

function getSafeImageUrl(imageUrl: string | undefined, pool: string[], preferredIndex = 0): string {
  const fallback = pool[preferredIndex % pool.length];

  if (!imageUrl) {
    return fallback;
  }

  if (imageUrl.startsWith('https://images.unsplash.com/')) {
    return imageUrl;
  }

  return fallback;
}

async function fetchLatestCorporateNews(isArabic: boolean, fallbackItems: NewsItem[]): Promise<NewsItem[]> {
  const newsApiKey = process.env.NEWS_API_KEY;

  if (!newsApiKey) {
    return fallbackItems;
  }

  const query = isArabic
    ? 'تأسيس الشركات في الإمارات OR قوانين الشركات OR الاستثمار في الإمارات'
    : 'UAE corporate law OR business setup UAE OR company formation UAE';

  const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=${isArabic ? 'ar' : 'en'}&sortBy=publishedAt&pageSize=6`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'X-Api-Key': newsApiKey,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return fallbackItems;
    }

    const payload = (await response.json()) as {
      articles?: Array<{
        title?: string;
        urlToImage?: string;
        url?: string;
        publishedAt?: string;
      }>;
    };

    const parsed = (payload.articles ?? [])
      .filter((article) => article.title)
      .slice(0, 6)
      .map((article, index) => ({
        title: article.title as string,
        image: article.urlToImage || newsFallbackImages[index % newsFallbackImages.length],
        date: formatNewsDate(article.publishedAt, isArabic),
        url: article.url,
      }));

    return parsed.length ? parsed : fallbackItems;
  } catch {
    return fallbackItems;
  }
}

export default async function CorporateServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isValidLoc = locale === 'en' || locale === 'ar';
  const lang = isValidLoc ? (locale as Locale) : 'en';

  const isArabic = lang === 'ar';
  const heroHighlights = isArabic
    ? [
        'شركات البر الرئيسي والمناطق الحرة',
        'مستثمرو الإمارات والشركات الأجنبية',
        'متابعة حكومية متكاملة من البداية للنهاية',
        'دعم قانوني وامتثال للشركات',
      ]
    : [
        'Mainland & Free Zone Companies',
        'UAE Investors & Foreign Businesses',
        'End-to-End Government Liaison',
        'Corporate Legal & Compliance Support',
      ];

  const services: ServiceItem[] = [
    {
      title: 'Business Setup',
      paragraphs: [
        'Establish your business in the UAE with confidence. We assist entrepreneurs, SMEs, and international investors with company formation across Mainland, Free Zones, and Offshore jurisdictions.From selecting the right legal structure to obtaining licenses and government approvals, we manage the entire setup process while ensuring full compliance with UAE regulations.',
      ],
    },
    {
      title: 'Trademark Registration',
      paragraphs: [
        'Protect your brand through official UAE trademark registration. We assist with trademark searches, applications, renewals, and enforcement to secure your intellectual property across the UAE.',
        'Our team helps businesses safeguard their brand identity while ensuring compliance with Ministry of Economy requirements.',
      ],
    },
    {
      title: 'Mergers and Acquisitions (M&A)',
      paragraphs: [
        'We advise businesses, investors, and shareholders on mergers, acquisitions, joint ventures, and corporate restructurings across the UAE. Our team provides strategic legal guidance throughout every stage of the transaction.',
        'From legal due diligence and deal structuring to regulatory approvals and contract negotiations, we help clients complete transactions efficiently while protecting their commercial interests.',
      ],
    },
    {
      title: 'Customs Consultancy',
      paragraphs: [
        'We provide legal and regulatory support for import and export operations across the UAE, helping businesses navigate customs procedures, documentation, and compliance requirements.',
        'Our team advises importers, exporters, and logistics companies on customs registrations, tariff classifications, clearance procedures, and dispute resolution to keep operations compliant and efficient.',
      ],
    },
    {
      title: 'Immigration Services',
      paragraphs: [
        'We provide comprehensive immigration services for investors, business owners, employees, and families seeking UAE visas, residency, and work permits. Our team manages every stage of the immigration process with accuracy and efficiency.',
        'From visa applications and government approvals to renewals and compliance, we deliver practical immigration solutions tailored to your personal and business requirements.',
      ],
    },
    {
      title: 'Legal Consultation Services',
      paragraphs: [
        'Our lawyers provide practical legal advice tailored to businesses, investors, and individuals across the UAE. We help clients understand their legal rights, obligations, and available options before making important decisions.',
        'Whether you are entering a commercial transaction, reviewing contracts, or resolving a dispute, we deliver clear, strategic guidance focused on protecting your interests.',
      ],
    },
    {
      title: 'Real Estate Broker Services',
      paragraphs: [
        'Our licensed real estate brokerage team assists individuals, investors, and businesses with buying, selling, leasing, and managing property throughout the UAE. We combine market expertise with professional legal oversight.',
        'From property selection and negotiations to transaction documentation and regulatory compliance, we help clients complete real estate transactions securely and confidently.',
      ],
    },
    {
      title: 'Tax Filing and Follow-Up',
      paragraphs: [
        'We prepare and submit VAT and Corporate Tax returns while ensuring full compliance with Federal Tax Authority (FTA) requirements. Our team helps businesses meet their tax obligations accurately and on time.',
        'From tax registrations and return submissions to authority correspondence and ongoing compliance support, we help businesses reduce regulatory risk and avoid unnecessary penalties.',
      ],
    },
    {
      title: 'Labor Services',
      paragraphs: [
        'We assist employers with employment contracts, work permits, MOHRE procedures, and workforce compliance across the UAE. Our team helps businesses meet labor law requirements while minimizing operational risks.',
        'From employee onboarding and labor approvals to contract updates and compliance support, we provide practical solutions tailored to your business needs.',
      ],
    },
    {
      title: 'Online Authentic Signature',
      paragraphs: [
        'We facilitate secure online signature solutions for legal and business documents in accordance with UAE digital authentication requirements. Our team helps clients complete document execution quickly and securely without unnecessary delays.',
        'From identity verification to digital authentication and document processing, we ensure a smooth and compliant online signing experience.',
      ],
    },
    {
      title: 'Online Power of Attorney (POA)',
      paragraphs: [
        'We assist individuals and businesses with preparing and issuing legally valid Powers of Attorney through UAE online notarization services. Our team simplifies the entire process, allowing clients to complete documentation remotely.',
        'From drafting the appropriate POA to online notarization and government procedures, we ensure a secure, compliant, and efficient experience.',
      ],
    },
    {
      title: 'License Amendment',
      paragraphs: [
        'We assist businesses with updating trade licenses to reflect operational and regulatory changes across Mainland and Free Zone jurisdictions. Our team manages amendments efficiently while ensuring full compliance with UAE licensing requirements.',
        'Whether updating business activities, changing shareholders or managers, modifying the legal structure, or changing the trade name, we coordinate the entire amendment process from documentation to government approval.',
      ],
    },
    {
      title: 'Memorandum of Understanding (MOU)',
      paragraphs: [
        'We prepare and review Memorandums of Understanding (MoUs) for businesses, investors, and commercial partners across the UAE. Our lawyers draft clear, legally sound agreements that establish expectations before formal contracts are executed.',
        'Whether for partnerships, joint ventures, investments, or commercial negotiations, we ensure every MoU reflects your commercial objectives while complying with UAE legal requirements.',
      ],
    },
    {
      title: 'Bank Account Opening',
      paragraphs: [
        'We assist businesses and individuals with opening corporate and personal bank accounts across the UAE. Our team works closely with local and international banks to simplify the account opening process and reduce delays.',
        'From document preparation and KYC compliance to bank coordination and application follow-up, we provide end-to-end support until your account is successfully activated.',
      ],
    },
    {
      title: 'Office Space for Rent',
      paragraphs: [
        'We provide approved office space solutions for businesses establishing or expanding their presence in the UAE. Our office options support company formation, trade license requirements, visa eligibility, and day-to-day business operations.',
        'Whether you need a serviced office, private workspace, virtual office, or Ejari-compliant premises, we help you select the right solution while ensuring full regulatory compliance.',
      ],
    },
    {
      title: 'PRO Services',
      paragraphs: [
        'We provide comprehensive PRO services to manage government procedures for businesses across the UAE. Our team handles licensing, immigration, labor, and regulatory requirements, allowing you to focus on growing your business.',
        'From visa processing and company documentation to license renewals, document attestation, and government approvals, we deliver efficient support while ensuring full compliance with UAE regulations.',
      ],
    },
    {
      title: 'Agreement Drafting and Preparation',
      paragraphs: [
        'We draft, review, and negotiate legally sound agreements tailored to your business and commercial objectives. Every contract is prepared to provide clarity, reduce risk, and ensure compliance with UAE laws.',
        'Our team assists with employment contracts, partnership agreements, NDAs, shareholder agreements, commercial contracts, and other business documentation that protects your interests and supports long-term business relationships.',
      ],
    },
    {
      title: 'Golden Visa Services',
      paragraphs: [
        'We assist eligible investors, entrepreneurs, professionals, and talented individuals with UAE Golden Visa applications. Our team manages the entire process, from eligibility assessment and document preparation to submission and government approvals.',
        'With comprehensive guidance and end-to-end support, we help clients secure long-term residency efficiently while ensuring compliance with all UAE immigration requirements.',
    ],
    },
    {
      title: 'Ejari Registration',
      paragraphs: [
        'Ejari Registration is a mandatory Dubai Land Department process required for tenancy contracts and is essential for services such as DEWA connections, residence visas, business licensing, and other government transactions.',
        'Our team assists with Ejari registration, renewals, cancellations, and document verification for both residential and commercial properties, ensuring a smooth and compliant process from start to finish.',
      ],
    },
  ];

  const officePackages = [
    {
      name: 'Virtual Office',
      price: 'AED 4,000',
      subtitle: 'Monthly • 1-Y Contract',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=700&fit=crop',
    },
    {
      name: 'Shared Office',
      price: 'AED 6,000',
      subtitle: 'Monthly • 1-Y Contract',
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=700&fit=crop',
    },
    {
      name: 'Private Office',
      price: 'AED 10,000',
      subtitle: 'Monthly • 1-Y Contract',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=700&fit=crop',
    },
  ];

  const officeInclusions = [
    { en: 'Reception services', ar: 'خدمات الاستقبال', virtual: true, shared: true, private: true },
    { en: 'Telephone line', ar: 'خط الهاتف', virtual: true, shared: true, private: true },
    { en: 'High-speed internet', ar: 'إنترنت عالي السرعة', virtual: true, shared: true, private: true },
    { en: 'Pantry/Kitchen use', ar: 'استخدام المطبخ/البوفيه', virtual: true, shared: true, private: true },
    { en: 'Cleaning services', ar: 'خدمات التنظيف', virtual: true, shared: true, private: true },
    { en: 'Meeting room access', ar: 'غرفة الاجتماعات', virtual: true, shared: true, private: true },
    { en: 'Ejari registration', ar: 'تسجيل إيجاري', virtual: true, shared: true, private: true },
    { en: 'Labor services', ar: 'خدمات العمالة', virtual: false, shared: true, private: true },
    { en: 'License registration', ar: 'تسجيل الرخصة', virtual: false, shared: true, private: true },
    { en: 'Immigration services', ar: 'خدمات الهجرة', virtual: false, shared: true, private: true },
    { en: 'Tax filing', ar: 'تقديم الإقرارات الضريبية', virtual: false, shared: true, private: true },
    { en: 'Accounting', ar: 'المحاسبة', virtual: false, shared: false, private: true },
    { en: 'Tax consultancy', ar: 'استشارات ضريبية', virtual: false, shared: false, private: true },
    { en: 'VAT registration', ar: 'تسجيل ضريبة القيمة المضافة', virtual: false, shared: false, private: true },
    { en: 'Collection services', ar: 'خدمات التحصيل', virtual: false, shared: false, private: true },
    { en: 'Trademark registration', ar: 'تسجيل العلامات التجارية', virtual: false, shared: false, private: true },
    { en: 'Notary services', ar: 'خدمات التوثيق', virtual: false, shared: false, private: true },
    { en: 'Bank account opening', ar: 'فتح حسابات بنكية', virtual: false, shared: false, private: true },
    { en: 'Memorandum of understanding', ar: 'مذكرة تفاهم', virtual: false, shared: false, private: true },
  ];

  const fallbackNews: NewsItem[] = isArabic
    ? [
        {
          title: 'مستجدات في قوانين تأسيس الشركات والامتثال المؤسسي في الإمارات',
          image: newsFallbackImages[0],
          date: '3 Jul 2026',
          url: 'https://u.ae/ar-ae/information-and-services/business',
        },
        {
          title: 'تطورات تنظيمية تؤثر على التراخيص والتوسع التجاري للشركات',
          image: newsFallbackImages[1],
          date: '28 Jun 2026',
          url: 'https://u.ae/ar-ae/information-and-services/business',
        },
        {
          title: 'آخر التحديثات حول الهجرة الاستثمارية وتأشيرات رواد الأعمال',
          image: newsFallbackImages[2],
          date: '21 Jun 2026',
          url: 'https://u.ae/ar-ae/information-and-services/visa-and-emirates-id',
        },
      ]
    : [
        {
          title: 'Latest UAE corporate law updates for company formation and compliance',
          image: newsFallbackImages[0],
          date: '3 Jul 2026',
          url: 'https://u.ae/en/information-and-services/business',
        },
        {
          title: 'Regulatory developments impacting business licensing and expansion',
          image: newsFallbackImages[1],
          date: '28 Jun 2026',
          url: 'https://u.ae/en/information-and-services/business',
        },
        {
          title: 'New insights on investor immigration and entrepreneur visa pathways',
          image: newsFallbackImages[2],
          date: '21 Jun 2026',
          url: 'https://u.ae/en/information-and-services/visa-and-emirates-id',
        },
      ];

  const corporateNews = await fetchLatestCorporateNews(isArabic, fallbackNews);

  return (
    <div className="min-h-screen bg-white text-[#160A0A]" dir={isArabic ? 'rtl' : 'ltr'} lang={lang}>
      <CorporateServicesHero
        isArabic={isArabic}
        badge={isArabic ? 'الماحي للخدمات القانونية' : 'ALMAHY FOR LEGAL SERVICES'}
        title={isArabic ? 'خدمات الشركات' : 'Corporate Services'}
        subtitle={
          isArabic
            ? 'خدمات قانونية متكاملة لتأسيس الشركات، التراخيص، الهجرة، الضرائب، العقود، وخدمات الجهات الحكومية في دولة الإمارات.'
            : 'Helping businesses establish, operate, and grow in the UAE with expert corporate, licensing, immigration, tax, and compliance services.'
        }
        highlights={heroHighlights}
      />

      <OfficeSolutionsSection
        isArabic={isArabic}
        sectionTitle={isArabic ? 'حلول المكاتب' : 'Office Solutions'}
        sectionDescription={
          isArabic
            ? 'تصميم مستقل لباقات المكاتب لتوضيح الخيارات المناسبة لنشاطك.'
            : 'A separate design block for office plans to clearly compare options for your setup.'
        }
        packages={officePackages}
        inclusions={officeInclusions}
        getImageUrl={getSafeImageUrl}
        imagePool={officeFallbackImages}
      />

      <CorporateServiceGrid
        isArabic={isArabic}
        eyebrow={isArabic ? 'نطاق الخدمات' : 'Service Coverage'}
        title={isArabic ? 'كل ما تحتاجه شركتك في مكان واحد' : 'Everything Your Company Needs In One Place'}
        description={
          isArabic
            ? 'خدمات منظمة لتأسيس الشركات، التراخيص، الامتثال، المعاملات الحكومية، والعقود.'
            : 'Structured support for company formation, licensing, compliance, government processes, and corporate documentation.'
        }
        services={services}
      />

      <CorporateNewsSection
        isArabic={isArabic}
        title={isArabic ? 'أخبار الشركات' : 'Latest Corporate update'}
        description={
          isArabic
            ? 'أحدث المستجدات ذات الصلة بتأسيس الشركات والامتثال والبيئة التنظيمية في الإمارات.'
            : 'Stay informed with the latest UAE corporate, regulatory, licensing, and compliance updates affecting businesses and investorsS'
        }
        items={corporateNews}
        viewAllLabel={isArabic ? 'عرض جميع تحديثات الشركات' : 'View all corporate updates'}
        viewAllUrl={
          isArabic
            ? 'https://u.ae/ar-ae/information-and-services/business'
            : 'https://u.ae/en/information-and-services/business'
        }
        readMoreLabel={isArabic ? 'اقرأ المزيد' : 'Read more'}
        getImageUrl={getSafeImageUrl}
        imagePool={newsFallbackImages}
      />
    </div>
  );
}
