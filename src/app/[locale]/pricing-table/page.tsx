import PricingPackagesCarousel from "@/components/PricingPackagesCarousel";
import PricingCtaSection from "@/components/pricing/PricingCtaSection";
import PricingHero from "@/components/pricing/PricingHero";
import PricingSectionHeading from "@/components/pricing/PricingSectionHeading";
import {
  PACKAGE_GRADIENT_DIAMOND,
  PACKAGE_GRADIENT_GOLDEN,
  PACKAGE_GRADIENT_VIP,
} from "@/components/pricing/package-gradients";
import { Locale } from "@/lib/translations";
import { Metadata } from "next";

type CaseItem = {
  title: string;
  description: string;
};

type PaymentItem = {
  collection: string;
  finalPayment: string;
  advancePayment: string;
};

type PackagePlan = {
  rightTitle: string;
  rightSubtitle: string;
  headerGradient: string;
  paymentItems: PaymentItem[];
  note: string;
};

function inclusionPayment(
  virtual: boolean,
  shared: boolean,
  privateOffice: boolean,
  includedLabel: string,
): PaymentItem {
  return {
    collection: virtual ? includedLabel : "",
    finalPayment: shared ? includedLabel : "",
    advancePayment: privateOffice ? includedLabel : "",
  };
}

const officeInclusionFlags = {
  virtual: [true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false],
  shared: [true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false],
  private: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
} as const;

function buildComparisonPaymentItems(includedLabel: string): PaymentItem[] {
  return officeInclusionFlags.virtual.map((_, index) =>
    inclusionPayment(
      officeInclusionFlags.virtual[index],
      officeInclusionFlags.shared[index],
      officeInclusionFlags.private[index],
      includedLabel,
    ),
  );
}

type PricingContent = {
  heading: string;
  leftTitle: string;
  caseTypeLabel: string;
  colCollection: string;
  colFinal: string;
  colAdvance: string;
  caseItems: CaseItem[];
  packages: PackagePlan[];
  accountingHeading: string;
  accountingCaseTypeLabel: string;
  accountingColCollection: string;
  accountingColFinal: string;
  accountingColAdvance: string;
  accountingCaseItems: CaseItem[];
  accountingPackages: PackagePlan[];
  corporateHeading: string;
  corporateCaseTypeLabel: string;
  corporateColCollection: string;
  corporateColFinal: string;
  corporateColAdvance: string;
  corporateCaseItems: CaseItem[];
  corporatePackages: PackagePlan[];
  corporatePackageColumns: [
    { title: string; price: string; contract: string },
    { title: string; price: string; contract: string },
    { title: string; price: string; contract: string },
  ];
};

const content: Record<Locale, PricingContent> = {
  en: {
    heading: "Legal Package",
    leftTitle: "",
    caseTypeLabel: "Case Type",
    colCollection: "Collection",
    colFinal: "Final Payment",
    colAdvance: "Advance Payment",
    caseItems: [
      {
        title: "HR",
        description:
          "Recruitment and Staffing Services, Employee Benefits and Compensation, Performance Management, HR Policy and Compliance, HR Consulting and Strategy.",
      },
      {
        title: "Other Services",
        description:
          "Reviewing agreements, contracts, legal advice and meetings related to company activity and relevant government entities and financial authorities.",
      },
      {
        title: "Debtors Information Collection",
        description:
          "Initial Contact, Information Gathering, Documentation, Data Verification, Analysis and Assessment, Legal and Compliance Checks, Reporting.",
      },
      {
        title: "Legal Notices",
        description:
          "Legal notice through the law firm, drafting, reviewing, and correspondence received.",
      },
      {
        title: "Notarized Legal Notice",
        description:
          "Drafting, reviewing, correspondence, receiving, and attestation with the Notary Public in Dubai and outside Dubai according to dispute type.",
      },
      {
        title: "Cheque Execution",
        description:
          "Fees of opening a file, collection services, registration of execution file in courts, circular, travel ban, and related judicial attachments.",
      },
      {
        title: "Labor Case",
        description:
          "Following up labor cases in all stages including first instance and appeal, and complete judgment execution procedures.",
      },
      {
        title: "Performance Order",
        description:
          "Payment orders or invoices, performance warnings, registration of cases and attendance of committees, and execution work until collection.",
      },
      {
        title: "Rent Cases",
        description:
          "All rent cases for residential and commercial properties related to Rental Disputes Commission or Civil Courts until completion of execution.",
      },
      {
        title: "Expert Dispute in Dispute Committee",
        description:
          "Expert works and attendance before dispute committees and submission of memoranda and regulations across specialized areas.",
      },
      {
        title: "Precautionary Seizures (As Separate Case)",
        description:
          "Advocacy and pleading in urgent orders and issuance of decisions of precautionary seizures, grievances and appeals.",
      },
      {
        title: "Civil and Commercial Cases",
        description:
          "All works of civil and commercial cases in full instances, first instance, appeals, challenge, specific expert and execution.",
      },
      {
        title: "Arbitration Cases",
        description:
          "Representation and registration before arbitration authorities, and follow-up of judgments by ratification before competent courts.",
      },
      {
        title: "Corporate",
        description:
          "Business Setup Start Up, Bank Account Opening, Trademark Registration, Golden Visa.",
      },
    ],
    packages: [
      {
        rightTitle: "GOLDEN PACKAGE",
        rightSubtitle: "10K MONTHLY",
        headerGradient: PACKAGE_GRADIENT_GOLDEN,
        paymentItems: [
          { collection: "", finalPayment: "", advancePayment: "Not Included" },
          { collection: "", finalPayment: "", advancePayment: "Per File" },
          { collection: "", finalPayment: "", advancePayment: "500" },
          { collection: "", finalPayment: "", advancePayment: "1,500.00" },
          { collection: "5%", finalPayment: "", advancePayment: "4,000.00" },
          { collection: "3%", finalPayment: "", advancePayment: "8,000.00" },
          { collection: "5%", finalPayment: "4,000.00", advancePayment: "4,000.00" },
          { collection: "4%", finalPayment: "5,000.00", advancePayment: "5,000.00" },
          { collection: "", finalPayment: "5,000.00", advancePayment: "15,000.00" },
          { collection: "", finalPayment: "", advancePayment: "10,000.00" },
          { collection: "2%", finalPayment: "3%", advancePayment: "3%" },
          { collection: "3%", finalPayment: "2%", advancePayment: "3%" },
          { collection: "", finalPayment: "", advancePayment: "per service" },
        ],
        note: "In - Credit 5 hours. After consuming the above-mentioned credit hours, each hour will cost 700 DHS",
      },
      {
        rightTitle: "VIP PACKAGE",
        rightSubtitle: "15K MONTHLY",
        headerGradient: PACKAGE_GRADIENT_VIP,
        paymentItems: [
          { collection: "", finalPayment: "", advancePayment: "IN" },
          { collection: "", finalPayment: "", advancePayment: "in" },
          { collection: "", finalPayment: "", advancePayment: "in" },
          { collection: "", finalPayment: "", advancePayment: "750.00" },
          { collection: "5%", finalPayment: "", advancePayment: "1,500.00" },
          { collection: "3%", finalPayment: "", advancePayment: "4,000.00" },
          { collection: "5%", finalPayment: "4,000.00", advancePayment: "2,000.00" },
          { collection: "4%", finalPayment: "3,000.00", advancePayment: "3,000.00" },
          { collection: "", finalPayment: "5,000.00", advancePayment: "10,000.00" },
          { collection: "", finalPayment: "", advancePayment: "7,000.00" },
          { collection: "2%", finalPayment: "2%", advancePayment: "2%" },
          { collection: "2%", finalPayment: "2%", advancePayment: "2%" },
          { collection: "", finalPayment: "", advancePayment: "per service" },
        ],
        note: "in - Credit 9 hours After consuming the above-mentioned credit hours, each hour will cost 500 DHS",
      },
      {
        rightTitle: "DIAMOND PACKAGE",
        rightSubtitle: "21K MONTHLY",
        headerGradient: PACKAGE_GRADIENT_DIAMOND,
        paymentItems: [
          { collection: "", finalPayment: "", advancePayment: "IN" },
          { collection: "", finalPayment: "", advancePayment: "in" },
          { collection: "", finalPayment: "", advancePayment: "in" },
          { collection: "", finalPayment: "", advancePayment: "in" },
          { collection: "5%", finalPayment: "", advancePayment: "in" },
          { collection: "2%", finalPayment: "", advancePayment: "2,500.00" },
          { collection: "3%", finalPayment: "4,000.00", advancePayment: "in" },
          { collection: "3%", finalPayment: "2,000.00", advancePayment: "2,000.00" },
          { collection: "", finalPayment: "5,000.00", advancePayment: "5,000.00" },
          { collection: "", finalPayment: "", advancePayment: "5,000.00" },
          { collection: "2%", finalPayment: "2%", advancePayment: "1%" },
          { collection: "1%", finalPayment: "2%", advancePayment: "1%" },
          { collection: "", finalPayment: "", advancePayment: "per service" },
        ],
        note: "in - Credit 18 hours After consuming the above-mentioned credit hours, each hour will cost 350 DHS",
      },
    ],
    accountingHeading: "Accounting Package",
    accountingCaseTypeLabel: "Detailed Services",
    accountingColCollection: "Core",
    accountingColFinal: "Plus",
    accountingColAdvance: "Premium",
    accountingCaseItems: [
      {
        title: "VAT",
        description:
          "VAT Compliance\nMaintain records:\n• VAT invoices (sales and purchases)\n• Bank statements\n• Credit/debit notes\n• Import/export records\n• Financial statements (e.g., income statement, balance sheet)\nVAT Filing",
      },
      {
        title: "Auditing",
        description:
          "Collect and Analyze Information\nObtain documentation:\n• Financial statements\n• Trial balances\n• Policies\n• Contracts\n• Operational data\nDraft the Audit Report\nReview and finalize the report\nReviews of financial statements to ensure accuracy and compliance with accounting standards\nFinancial statements:\n• Balance Sheet (Statement of Financial Position)\n• Income Statement (Profit and Loss Statement)\n• Cash Flow Statement\n• Statement of Changes in Equity",
      },
      {
        title: "Accounting",
        description:
          "Accounting on a monthly basis\nMaintenance of monthly accounts on cloud-based accounting software\nPreparation of a chart of accounts according to company structure and management requirements\nAnalysis and interpretation of ledgers\nAccounts Receivable and Accounts Payable report\nRecord of Sale, Purchase activity, and applicable VAT\nInput Tax Credit report as per the law\nRecording and maintaining all cashbooks and bank statements\nEvaluation and filing of quarterly/monthly VAT returns\nPayroll Management\nGeneration and review of the Balance Sheet\nEvaluation of financial statements and providing a financial health report\nFixed Asset Management",
      },
      {
        title: "Budgeting",
        description:
          "Set Clear Financial Goals\nIdentify and Categorize Income Sources\nTrack and Analyze Past Expenses\nEstimate and Allocate Amounts\nMonitor and Adjust Regularly\nReview and Evaluate Financial Performance\nBuilding a Contingency Plan\nSet Up a Review Schedule",
      },
      {
        title: "AML",
        description:
          "Anti-Money Laundering (AML)\nInternal Controls and Risk Management\nThe goAML System\nPeriodic Reviews and Audits",
      },
      {
        title: "Corporate Tax",
        description:
          "Corporate Tax Filing (Tax Returns)\nAudits and Tax Assessments",
      },
      {
        title: "Additional Services",
        description:
          "Regular Employee 6 days per week\nTemporary Employee up to 3 days per week as per client requirements",
      },
    ],
    accountingPackages: [
      {
        rightTitle: "GOLDEN PACKAGE",
        rightSubtitle: "AED 8K MONTHLY/ 5H",
        headerGradient: PACKAGE_GRADIENT_GOLDEN,
        paymentItems: [
          { collection: "Included", finalPayment: "Included", advancePayment: "Included" },
          { collection: "Included", finalPayment: "Included", advancePayment: "Included" },
          { collection: "Included", finalPayment: "Included", advancePayment: "Included" },
          { collection: "Included", finalPayment: "Included", advancePayment: "Included" },
          { collection: "Included", finalPayment: "Included", advancePayment: "Included" },
          { collection: "Included", finalPayment: "Included", advancePayment: "Included" },
        ],
        note: "Regular employee 6 days per week. Temporary employee up to 3 days per week as per client requirements.",
      },
      {
        rightTitle: "VIP PACKAGE",
        rightSubtitle: "AED 15K MONTHLY/9H",
        headerGradient: PACKAGE_GRADIENT_GOLDEN,
        paymentItems: [
          { collection: "Included", finalPayment: "Included", advancePayment: "Included" },
          { collection: "Included", finalPayment: "Included", advancePayment: "Included" },
          { collection: "Included", finalPayment: "Included", advancePayment: "Included" },
          { collection: "Included", finalPayment: "Included", advancePayment: "Included" },
          { collection: "Included", finalPayment: "Included", advancePayment: "Included" },
          { collection: "", finalPayment: "AED 6,000/ per month", advancePayment: "AED 4,000/ per month" },
        ],
        note: "Regular employee 6 days per week. Temporary employee up to 3 days per week as per client requirements.",
      },
      {
        rightTitle: "DIAMOND PACKAGE",
        rightSubtitle: "AED 25K MONTHLY/ 18H",
        headerGradient: PACKAGE_GRADIENT_DIAMOND,
        paymentItems: [
          { collection: "Included", finalPayment: "Included", advancePayment: "Included" },
          { collection: "Included", finalPayment: "Included", advancePayment: "Included" },
          { collection: "Included", finalPayment: "Included", advancePayment: "Included" },
          { collection: "Included", finalPayment: "Included", advancePayment: "Included" },
          { collection: "Included", finalPayment: "Included", advancePayment: "Included" },
          { collection: "Included", finalPayment: "Included", advancePayment: "Included" },
        ],
        note: "Regular employee 6 days per week. Temporary employee up to 3 days per week as per client requirements.",
      },
    ],
    corporateHeading: "Corporate Package",
    corporateCaseTypeLabel: "Inclusions",
    corporateColCollection: "Virtual Office",
    corporateColFinal: "Shared Office",
    corporateColAdvance: "Private Office",
    corporateCaseItems: [
      { title: "Reception services", description: "Professional front-desk and visitor handling for your business address." },
      { title: "Telephone line", description: "Dedicated business line with call handling support." },
      { title: "High-speed internet", description: "Reliable connectivity for daily business operations." },
      { title: "Pantry/Kitchen use", description: "Access to shared pantry and kitchen facilities." },
      { title: "Cleaning services", description: "Regular cleaning and maintenance of office spaces." },
      { title: "Meeting room access", description: "Bookable meeting rooms for client and team sessions." },
      { title: "Ejari registration", description: "Tenancy registration support for licensing and visa processes." },
      { title: "Labor services", description: "Labor-related documentation and compliance support." },
      { title: "License registration", description: "Trade license registration and renewal assistance." },
      { title: "Immigration services", description: "Visa, residency, and immigration processing support." },
      { title: "Tax filing", description: "Corporate tax filing and compliance submissions." },
      { title: "Accounting", description: "Monthly bookkeeping and financial reporting." },
      { title: "Tax consultancy", description: "Strategic tax planning and advisory services." },
      { title: "VAT registration", description: "VAT registration and ongoing compliance support." },
      { title: "Collection services", description: "Debt collection and receivables management." },
      { title: "Trademark registration", description: "Brand and trademark protection registration." },
      { title: "Notary services", description: "Document notarization and attestation support." },
      { title: "Bank account opening", description: "Corporate bank account opening assistance." },
      { title: "Memorandum of understanding", description: "Drafting and review of MOU agreements." },
    ],
    corporatePackages: [
      {
        rightTitle: "PACKAGES",
        rightSubtitle: "VIRTUAL • SHARED • PRIVATE OFFICE • 1-YR CONTRACT",
        headerGradient: PACKAGE_GRADIENT_GOLDEN,
        paymentItems: buildComparisonPaymentItems("Included"),
        note: "",
      },
    ],
    corporatePackageColumns: [
      { title: "Virtual Office", price: "AED 4,000 Monthly", contract: "1-Yr Contract" },
      { title: "Shared Office", price: "AED 6,000 Monthly", contract: "1-Yr Contract" },
      { title: "Private Office", price: "AED 10,000 Monthly", contract: "1-Yr Contract" },
    ],
  },
  ar: {
    heading: "الباقات القانونية",
    leftTitle: "",
    caseTypeLabel: "نوع القضية",
    colCollection: "التحصيل",
    colFinal: "الدفعة النهائية",
    colAdvance: "الدفعة المقدمة",
    caseItems: [
      {
        title: "HR",
        description:
          "خدمات التوظيف والموارد البشرية، مزايا وتعويضات الموظفين، إدارة الأداء، سياسات الموارد البشرية والامتثال، والاستشارات والاستراتيجيات.",
      },
      {
        title: "خدمات أخرى",
        description:
          "مراجعة الاتفاقيات والعقود، وتقديم الاستشارات القانونية والاجتماعات المتعلقة بأنشطة الشركة وتعاملاتها مع الجهات الحكومية والهيئات المالية.",
      },
      {
        title: "تحصيل معلومات المدينين",
        description:
          "التواصل الأولي، جمع المعلومات، التوثيق، التحقق من البيانات، التحليل والتقييم، الفحص القانوني والامتثال، وإعداد التقارير.",
      },
      {
        title: "الإشعارات القانونية",
        description: "إشعار قانوني عبر مكتب المحاماة، وصياغته ومراجعته، واستلام المراسلات.",
      },
      {
        title: "الإشعار القانوني الموثق",
        description:
          "صياغة ومراجعة واستلام وتوثيق الإشعارات القانونية لدى كاتب العدل في دبي وخارجها حسب نوع النزاع.",
      },
      {
        title: "تنفيذ الشيكات",
        description:
          "رسوم فتح ملف، وخدمات التحصيل، وتسجيل ملف التنفيذ في المحاكم، والتعميم، ومنع السفر، والحجوزات المرتبطة بالتحصيل القضائي.",
      },
      {
        title: "قضايا العمل",
        description:
          "متابعة قضايا العمل في جميع الإجراءات والمراحل بما في ذلك الدرجة الأولى والاستئناف، ومتابعة تنفيذ الأحكام.",
      },
      {
        title: "أوامر الأداء",
        description:
          "أوامر السداد أو الفواتير، والتنبيهات بالأداء، وتسجيل القضايا وحضور اللجان، وجميع أعمال التنفيذ حتى التحصيل.",
      },
      {
        title: "قضايا الإيجارات",
        description:
          "جميع قضايا الإيجارات للعقارات السكنية والتجارية لدى لجنة فض المنازعات الإيجارية أو المحاكم المدنية حتى اكتمال التنفيذ.",
      },
      {
        title: "النزاعات أمام لجان الخبرة",
        description:
          "أعمال الخبرة والحضور أمام لجان النزاع وتقديم المذكرات واللوائح والدعوى المقابلة عند وجودها.",
      },
      {
        title: "الحجوزات التحفظية",
        description:
          "المرافعة في الأوامر المستعجلة وإصدار قرارات الحجوزات التحفظية والتظلمات والاستئنافات، بما في ذلك جميع درجات التقاضي.",
      },
      {
        title: "القضايا المدنية والتجارية",
        description:
          "جميع أعمال القضايا المدنية والتجارية في جميع درجاتها والدرجة الأولى والاستئناف والطعن والخبرة المتخصصة والتنفيذ.",
      },
      {
        title: "قضايا التحكيم",
        description:
          "التمثيل والتسجيل أمام جهات التحكيم، ومتابعة الأحكام بالتصديق أمام المحاكم المختصة حتى اكتمال التنفيذ.",
      },
      {
        title: "الشركات",
        description: "تأسيس الأعمال، فتح الحسابات البنكية، تسجيل العلامة التجارية، والإقامة الذهبية.",
      },
    ],
    packages: [
      {
        rightTitle: "الباقة الذهبية",
        rightSubtitle: "10K شهرياً",
        headerGradient: PACKAGE_GRADIENT_GOLDEN,
        paymentItems: [
          { collection: "", finalPayment: "", advancePayment: "غير شامل" },
          { collection: "", finalPayment: "", advancePayment: "لكل ملف" },
          { collection: "", finalPayment: "", advancePayment: "500" },
          { collection: "", finalPayment: "", advancePayment: "1,500.00" },
          { collection: "5%", finalPayment: "", advancePayment: "4,000.00" },
          { collection: "3%", finalPayment: "", advancePayment: "8,000.00" },
          { collection: "5%", finalPayment: "4,000.00", advancePayment: "4,000.00" },
          { collection: "4%", finalPayment: "5,000.00", advancePayment: "5,000.00" },
          { collection: "", finalPayment: "5,000.00", advancePayment: "15,000.00" },
          { collection: "", finalPayment: "", advancePayment: "10,000.00" },
          { collection: "2%", finalPayment: "3%", advancePayment: "3%" },
          { collection: "3%", finalPayment: "2%", advancePayment: "3%" },
          { collection: "", finalPayment: "", advancePayment: "لكل خدمة" },
        ],
        note: "رصيد 5 ساعات. بعد استهلاك الساعات المذكورة أعلاه، ستكون تكلفة كل ساعة 700 درهم.",
      },
      {
        rightTitle: "باقة VIP",
        rightSubtitle: "15K شهرياً",
        headerGradient: PACKAGE_GRADIENT_VIP,
        paymentItems: [
          { collection: "", finalPayment: "", advancePayment: "IN" },
          { collection: "", finalPayment: "", advancePayment: "in" },
          { collection: "", finalPayment: "", advancePayment: "in" },
          { collection: "", finalPayment: "", advancePayment: "750.00" },
          { collection: "5%", finalPayment: "", advancePayment: "1,500.00" },
          { collection: "3%", finalPayment: "", advancePayment: "4,000.00" },
          { collection: "5%", finalPayment: "4,000.00", advancePayment: "2,000.00" },
          { collection: "4%", finalPayment: "3,000.00", advancePayment: "3,000.00" },
          { collection: "", finalPayment: "5,000.00", advancePayment: "10,000.00" },
          { collection: "", finalPayment: "", advancePayment: "7,000.00" },
          { collection: "2%", finalPayment: "2%", advancePayment: "2%" },
          { collection: "2%", finalPayment: "2%", advancePayment: "2%" },
          { collection: "", finalPayment: "", advancePayment: "لكل خدمة" },
        ],
        note: "رصيد 9 ساعات. بعد استهلاك الساعات المذكورة أعلاه، ستكون تكلفة كل ساعة 500 درهم.",
      },
      {
        rightTitle: "باقة الألماس",
        rightSubtitle: "21K شهرياً",
        headerGradient: PACKAGE_GRADIENT_DIAMOND,
        paymentItems: [
          { collection: "", finalPayment: "", advancePayment: "IN" },
          { collection: "", finalPayment: "", advancePayment: "in" },
          { collection: "", finalPayment: "", advancePayment: "in" },
          { collection: "", finalPayment: "", advancePayment: "in" },
          { collection: "5%", finalPayment: "", advancePayment: "in" },
          { collection: "2%", finalPayment: "", advancePayment: "2,500.00" },
          { collection: "3%", finalPayment: "4,000.00", advancePayment: "in" },
          { collection: "3%", finalPayment: "2,000.00", advancePayment: "2,000.00" },
          { collection: "", finalPayment: "5,000.00", advancePayment: "5,000.00" },
          { collection: "", finalPayment: "", advancePayment: "5,000.00" },
          { collection: "2%", finalPayment: "2%", advancePayment: "1%" },
          { collection: "1%", finalPayment: "2%", advancePayment: "1%" },
          { collection: "", finalPayment: "", advancePayment: "لكل خدمة" },
        ],
        note: "رصيد 18 ساعة. بعد استهلاك الساعات المذكورة أعلاه، ستكون تكلفة كل ساعة 350 درهم.",
      },
    ],
    accountingHeading: "باقة المحاسبة",
    accountingCaseTypeLabel: "الخدمات التفصيلية",
    accountingColCollection: "الأساسي",
    accountingColFinal: "بلس",
    accountingColAdvance: "المتقدم",
    accountingCaseItems: [
      {
        title: "ضريبة القيمة المضافة",
        description:
          "الامتثال لضريبة القيمة المضافة\nالحفاظ على السجلات:\n• فواتير ضريبة القيمة المضافة (المبيعات والمشتريات)\n• كشوفات البنك\n• إشعارات دائن/مدين\n• سجلات الاستيراد/التصدير\n• البيانات المالية (مثل قائمة الدخل والميزانية العمومية)\nتقديم إقرارات ضريبة القيمة المضافة",
      },
      {
        title: "التدقيق",
        description:
          "جمع وتحليل المعلومات\nالحصول على المستندات:\n• البيانات المالية\n• ميزان المراجعة\n• السياسات\n• العقود\n• البيانات التشغيلية\nإعداد تقرير التدقيق\nمراجعة التقرير واعتماده\nمراجعة البيانات المالية لضمان الدقة والامتثال للمعايير المحاسبية\nالبيانات المالية:\n• الميزانية العمومية\n• قائمة الدخل\n• قائمة التدفقات النقدية\n• قائمة التغيرات في حقوق الملكية",
      },
      {
        title: "المحاسبة",
        description:
          "المحاسبة بشكل شهري\nصيانة الحسابات الشهرية على برنامج محاسبي سحابي\nإعداد دليل الحسابات وفق هيكل الشركة ومتطلبات الإدارة\nتحليل وتفسير القيود\nتقرير الذمم المدينة والدائنة\nتسجيل حركة البيع والشراء وضريبة القيمة المضافة\nتقرير ضريبة المدخلات وفق النظام\nتسجيل وصيانة الدفاتر النقدية وكشوفات البنوك\nإعداد وتقديم إقرارات ضريبة القيمة المضافة الشهرية/الربع سنوية\nإدارة الرواتب\nإعداد ومراجعة الميزانية العمومية\nتقييم البيانات المالية وتقديم تقرير عن الوضع المالي\nإدارة الأصول الثابتة",
      },
      {
        title: "إعداد الميزانية",
        description:
          "تحديد الأهداف المالية\nتحديد وتصنيف مصادر الدخل\nتتبع وتحليل المصروفات السابقة\nتقدير وتوزيع المبالغ\nالمتابعة والتعديل بشكل دوري\nمراجعة وتقييم الأداء المالي\nبناء خطة للطوارئ\nوضع جدول مراجعة",
      },
      {
        title: "مكافحة غسل الأموال",
        description:
          "مكافحة غسل الأموال (AML)\nالضوابط الداخلية وإدارة المخاطر\nنظام goAML\nالمراجعات والتدقيقات الدورية",
      },
      {
        title: "ضريبة الشركات",
        description:
          "إقرارات ضريبة الشركات\nالتدقيقات والتقييمات الضريبية",
      },
      {
        title: "خدمات إضافية",
        description:
          "موظف منتظم 6 أيام أسبوعياً\nموظف مؤقت حتى 3 أيام أسبوعياً حسب متطلبات العميل",
      },
    ],
    accountingPackages: [
      {
        rightTitle: "GOLDEN PACKAGE",
        rightSubtitle: "AED 8K MONTHLY/ 5H",
        headerGradient: PACKAGE_GRADIENT_GOLDEN,
        paymentItems: [
          { collection: "مشمول", finalPayment: "مشمول", advancePayment: "مشمول" },
          { collection: "مشمول", finalPayment: "مشمول", advancePayment: "مشمول" },
          { collection: "مشمول", finalPayment: "مشمول", advancePayment: "مشمول" },
          { collection: "مشمول", finalPayment: "مشمول", advancePayment: "مشمول" },
          { collection: "مشمول", finalPayment: "مشمول", advancePayment: "مشمول" },
          { collection: "مشمول", finalPayment: "مشمول", advancePayment: "مشمول" },
        ],
        note: "موظف منتظم 6 أيام أسبوعياً. موظف مؤقت حتى 3 أيام أسبوعياً حسب متطلبات العميل.",
      },
      {
        rightTitle: "VIP PACKAGE",
        rightSubtitle: "AED 15K MONTHLY/9H",
        headerGradient: PACKAGE_GRADIENT_GOLDEN,
        paymentItems: [
          { collection: "مشمول", finalPayment: "مشمول", advancePayment: "مشمول" },
          { collection: "مشمول", finalPayment: "مشمول", advancePayment: "مشمول" },
          { collection: "مشمول", finalPayment: "مشمول", advancePayment: "مشمول" },
          { collection: "مشمول", finalPayment: "مشمول", advancePayment: "مشمول" },
          { collection: "مشمول", finalPayment: "مشمول", advancePayment: "مشمول" },
          { collection: "", finalPayment: "AED 6,000/ per month", advancePayment: "AED 4,000/ per month" },
        ],
        note: "موظف منتظم 6 أيام أسبوعياً. موظف مؤقت حتى 3 أيام أسبوعياً حسب متطلبات العميل.",
      },
      {
        rightTitle: "DIAMOND PACKAGE",
        rightSubtitle: "AED 25K MONTHLY/ 18H",
        headerGradient: PACKAGE_GRADIENT_DIAMOND,
        paymentItems: [
          { collection: "مشمول", finalPayment: "مشمول", advancePayment: "مشمول" },
          { collection: "مشمول", finalPayment: "مشمول", advancePayment: "مشمول" },
          { collection: "مشمول", finalPayment: "مشمول", advancePayment: "مشمول" },
          { collection: "مشمول", finalPayment: "مشمول", advancePayment: "مشمول" },
          { collection: "مشمول", finalPayment: "مشمول", advancePayment: "مشمول" },
          { collection: "مشمول", finalPayment: "مشمول", advancePayment: "مشمول" },
        ],
        note: "موظف منتظم 6 أيام أسبوعياً. موظف مؤقت حتى 3 أيام أسبوعياً حسب متطلبات العميل.",
      },
    ],
    corporateHeading: "باقة الشركات",
    corporateCaseTypeLabel: "المحتويات",
    corporateColCollection: "المكتب الافتراضي",
    corporateColFinal: "المكتب المشترك",
    corporateColAdvance: "المكتب الخاص",
    corporateCaseItems: [
      { title: "خدمات الاستقبال", description: "استقبال احترافي للزوار وإدارة المكالمات في عنوان عملك." },
      { title: "خط الهاتف", description: "خط أعمال مخصص مع دعم استقبال المكالمات." },
      { title: "إنترنت عالي السرعة", description: "اتصال موثوق للعمليات اليومية." },
      { title: "استخدام المطبخ/البوفيه", description: "الوصول إلى مطبخ وبوفيه مشترك." },
      { title: "خدمات التنظيف", description: "تنظيف وصيانة دورية للمكاتب." },
      { title: "غرفة الاجتماعات", description: "غرف اجتماعات قابلة للحجز للعملاء والفرق." },
      { title: "تسجيل إيجاري", description: "دعم تسجيل عقد الإيجار للتراخيص والتأشيرات." },
      { title: "خدمات العمالة", description: "دعم مستندات العمالة والامتثال." },
      { title: "تسجيل الرخصة", description: "تسجيل وتجديد الرخصة التجارية." },
      { title: "خدمات الهجرة", description: "دعم التأشيرات والإقامة والهجرة." },
      { title: "تقديم الإقرارات الضريبية", description: "تقديم إقرارات ضريبة الشركات والامتثال." },
      { title: "المحاسبة", description: "مسك الدفاتر والتقارير المالية الشهرية." },
      { title: "استشارات ضريبية", description: "تخطيط ضريبي استراتيجي وخدمات استشارية." },
      { title: "تسجيل ضريبة القيمة المضافة", description: "تسجيل VAT والامتثال المستمر." },
      { title: "خدمات التحصيل", description: "تحصيل الديون وإدارة المستحقات." },
      { title: "تسجيل العلامات التجارية", description: "تسجيل وحماية العلامة التجارية." },
      { title: "خدمات التوثيق", description: "توثيق المستندات واعتمادها." },
      { title: "فتح حسابات بنكية", description: "مساعدة في فتح الحسابات البنكية للشركات." },
      { title: "مذكرة تفاهم", description: "صياغة ومراجعة مذكرات التفاهم." },
    ],
    corporatePackages: [
      {
        rightTitle: "الباقات",
        rightSubtitle: "مكتب افتراضي • مشترك • خاص • عقد لمدة سنة",
        headerGradient: PACKAGE_GRADIENT_GOLDEN,
        paymentItems: buildComparisonPaymentItems("مشمول"),
        note: "",
      },
    ],
    corporatePackageColumns: [
      { title: "المكتب الافتراضي", price: "4,000 درهم شهرياً", contract: "عقد لمدة سنة" },
      { title: "المكتب المشترك", price: "6,000 درهم شهرياً", contract: "عقد لمدة سنة" },
      { title: "المكتب الخاص", price: "10,000 درهم شهرياً", contract: "عقد لمدة سنة" },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = locale === "ar" ? "ar" : "en";

  return {
    title: lang === "ar" ? "باقات الخدمات القانونية | Almahy" : "Legal Services Packages | Almahy",
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang: Locale = locale === "ar" ? "ar" : "en";
  const page = content[lang];
  const whatsappPhone = (process.env.NEXT_PUBLIC_WHATSAPP_CHAT_NUMBER || "971504096028").replace(/[^\d]/g, "");
  const salesMessage =
    lang === "ar"
      ? "مرحباً، أرغب في باقة مخصصة تناسب احتياجات عملي."
      : "Hello, I need a custom package for my business.";
  const whatsappHref = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(salesMessage)}`;

  const isArabic = lang === "ar";

  return (
    <main className="min-h-screen bg-[#100B0B]">
      <PricingHero
        isArabic={isArabic}
        title={isArabic ? "باقات خدماتنا" : "Legal Service Packages"}
        subtitle={
          isArabic
            ? "اختر الباقة المناسبة لاحتياجات عملك"
            : "Professional legal solutions designed for individuals, startups, and businesses across the UAE."
        }
      />

      <div className="mx-auto max-w-[1250px] px-4 pb-4 md:px-8">
        <section className="py-12 md:py-16">
          <PricingSectionHeading title={page.heading} isArabic={isArabic} />
          <PricingPackagesCarousel
            caseTypeLabel={page.caseTypeLabel}
            colCollection={page.colCollection}
            colFinal={page.colFinal}
            colAdvance={page.colAdvance}
            caseItems={page.caseItems}
            packages={page.packages}
            isArabic={isArabic}
          />
        </section>

        <section className="border-t border-[#B38D42]/35 py-12 md:py-16">
          <PricingSectionHeading title={page.accountingHeading} isArabic={isArabic} />
          <PricingPackagesCarousel
            caseTypeLabel={page.accountingCaseTypeLabel}
            colCollection={page.accountingColCollection}
            colFinal={page.accountingColFinal}
            colAdvance={page.accountingColAdvance}
            caseItems={page.accountingCaseItems}
            packages={page.accountingPackages}
            isArabic={isArabic}
            maxWidthClassName="max-w-[920px]"
          />
        </section>

        <section className="border-t border-[#B38D42]/35 py-12 md:py-16">
          <PricingSectionHeading title={page.corporateHeading} isArabic={isArabic} />
          <PricingPackagesCarousel
            caseTypeLabel={page.corporateCaseTypeLabel}
            colCollection={page.corporateColCollection}
            colFinal={page.corporateColFinal}
            colAdvance={page.corporateColAdvance}
            caseItems={page.corporateCaseItems}
            packages={page.corporatePackages}
            isArabic={isArabic}
            noteRowIndex={false}
            inclusionMode
            packageColumns={page.corporatePackageColumns}
          />
        </section>
      </div>

      <PricingCtaSection
        isArabic={isArabic}
        title={isArabic ? "تحتاج إلى باقة مخصصة؟" : "Need a Tailored Legal Solution?"}
        description={
          isArabic
            ? "تواصل معنا للحصول على حل مصمم خصيصاً لاحتياجات عملك."
            : "Our team will work with you to create a legal service package tailored to your business objectives, industry requirements, and budget."
        }
        buttonLabel={isArabic ? "تواصل مع فريق المبيعات" : "Book a Consultation"}
        whatsappHref={whatsappHref}
        footnote={
          isArabic ? "نخدم الشركات والأفراد في جميع أنحاء الإمارات." : "Serving businesses and individuals across the UAE."
        }
      />
    </main>
  );
}
