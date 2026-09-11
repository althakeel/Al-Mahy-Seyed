import { team } from "@/data/team";

export type TeamMemberProfile = {
  slug: string;
  nameEn: string;
  nameAr: string;
  positionEn: string;
  positionAr: string;
  photo: string;
  casesHandledDisplayEn: string;
  casesHandledDisplayAr: string;
  casesInProgressEn: string;
  casesInProgressAr: string;
  casesDetailEn: string;
  casesDetailAr: string;
  practiceAreasEn: string[];
  practiceAreasAr: string[];
  highlightsEn: string[];
  highlightsAr: string[];
  overviewEn: string[];
  overviewAr: string[];
  credentialsEn?: {
    institution: string;
    certificate: string;
    date?: string;
  }[];
  credentialsAr?: {
    institution: string;
    certificate: string;
    date?: string;
  }[];
  phone: string;
  email: string;
  linkedin?: string;
};

const defaultPhone = "+971 50 409 6028";
const defaultEmail = "info@almahy.com";

function cardPhoto(slug: string, fallback: string) {
  return team.find((member) => member.slug === slug)?.image ?? fallback;
}

function basicProfile(
  partial: Pick<
    TeamMemberProfile,
    "slug" | "nameEn" | "nameAr" | "positionEn" | "positionAr" | "photo"
  > &
    Partial<TeamMemberProfile>,
): TeamMemberProfile {
  return {
    casesHandledDisplayEn: "-",
    casesHandledDisplayAr: "-",
    casesInProgressEn: "Available for client consultations and ongoing support.",
    casesInProgressAr: "متاح لاستشارات العملاء والدعم المستمر.",
    casesDetailEn: `${partial.nameEn} is part of the Almahy Legal Services team, supporting clients across the UAE.`,
    casesDetailAr: `${partial.nameAr} عضو في فريق الماحي للخدمات القانونية ويدعم العملاء في جميع أنحاء الإمارات.`,
    practiceAreasEn: [partial.positionEn],
    practiceAreasAr: [partial.positionAr],
    highlightsEn: [
      "Works closely with clients to deliver clear, practical support.",
      "Coordinates with the wider Almahy team for end-to-end service.",
    ],
    highlightsAr: [
      "يعمل عن قرب مع العملاء لتقديم دعم واضح وعملي.",
      "ينسق مع فريق الماحي لتقديم خدمة متكاملة.",
    ],
    overviewEn: [
      `${partial.nameEn} contributes to Almahy Legal Services as ${partial.positionEn}.`,
    ],
    overviewAr: [
      `يساهم ${partial.nameAr} في الماحي للخدمات القانونية بصفته ${partial.positionAr}.`,
    ],
    phone: defaultPhone,
    email: defaultEmail,
    ...partial,
  };
}

export const teamMembers: TeamMemberProfile[] = [
  {
    slug: "dr-almahy",
    nameEn: "Almahy Mohamed",
    nameAr: "المحي محمد",
    positionEn: "FOUNDER & MANAGING PARTNER",
    positionAr: "المؤسس والمدير العام",
    photo: cardPhoto("dr-almahy", "/images/team/team-13.webp"),
    casesHandledDisplayEn: "900+",
    casesHandledDisplayAr: "+900",
    casesInProgressEn: "Multiple corporate, civil, and arbitration files remain active.",
    casesInProgressAr: "توجد ملفات مؤسسية ومدنية وتحكيمية متعددة لا تزال قيد المتابعة.",
    casesDetailEn:
      "Almahy Mohamed has led 900+ mandates across civil litigation, commercial disputes, corporate advisory, and arbitration. His caseload includes company formation disputes, board governance matters, banking claims, labor conflicts, and complex enforcement files across UAE courts and authorities.",
    casesDetailAr:
      "قاد المحي محمد أكثر من 900 ملف في التقاضي المدني والنزاعات التجارية والاستشارات المؤسسية والتحكيم، وتشمل قضاياه نزاعات تأسيس الشركات وحوكمة مجالس الإدارة ومطالبات مصرفية ونزاعات عمل وملفات تنفيذ معقدة أمام محاكم وجهات الإمارات.",
    practiceAreasEn: ["Corporate Law", "Civil Litigation", "Arbitration", "Business Setup", "Banking Disputes"],
    practiceAreasAr: ["قانون الشركات", "التقاضي المدني", "التحكيم", "تأسيس الأعمال", "النزاعات المصرفية"],
    highlightsEn: [
      "Represents companies and individuals in high-value civil and commercial disputes.",
      "Advises on corporate structure, licensing, and regulatory compliance in the UAE.",
      "Handles arbitration and court proceedings from filing through judgment execution.",
    ],
    highlightsAr: [
      "يمثل الشركات والأفراد في نزاعات مدنية وتجارية عالية القيمة.",
      "يقدم استشارات حول الهيكلة المؤسسية والتراخيص والامتثال التنظيمي في الإمارات.",
      "يتولى التحكيم والإجراءات القضائية من الإيداع حتى تنفيذ الأحكام.",
    ],
    overviewEn: [
      "Almahy Mohamed's professional profile is supported by formal legal education and specialized training in private law, arbitration, translation studies, and continuing legal education.",
      "His academic and professional development includes programs from Egyptian, American, and international legal institutions, with a focus on arbitration practice, private law, legal skills, and professional standards.",
    ],
    overviewAr: [
      "تستند الخبرة المهنية للأستاذ المحي محمد إلى تعليم قانوني رسمي وتدريب متخصص في القانون الخاص والتحكيم ودراسات الترجمة والتعليم القانوني المستمر.",
      "تشمل مسيرته الأكاديمية والمهنية برامج من مؤسسات قانونية مصرية وأمريكية ودولية، مع تركيز على ممارسات التحكيم والقانون الخاص والمهارات القانونية والمعايير المهنية.",
    ],
    credentialsEn: [
      {
        institution: "The Arabian European Center for Arbitration and Training",
        certificate: "Certification: Egyptian Arbitration Law in Light of International Laws",
        date: "December 14, 2009 - January 18, 2010",
      },
      {
        institution: "The American University in Cairo, School of Continuing Education",
        certificate: "Foundation Certificate: Arabic and Translation Studies Division",
      },
      {
        institution: "Ain Shams University",
        certificate: "Diploma of Higher Studies in Private Law",
      },
      {
        institution: "American Bar Association Rule of Law Initiative and Cairo University",
        certificate: "Continuing Legal Education for Young Lawyers: Skills, Practice and Professional Course",
        date: "January 18 - March 14, 2010, Cairo, Egypt",
      },
    ],
    credentialsAr: [
      {
        institution: "المركز العربي الأوروبي للتحكيم والتدريب",
        certificate: "شهادة: قانون التحكيم المصري في ضوء القوانين الدولية",
        date: "14 ديسمبر 2009 - 18 يناير 2010",
      },
      {
        institution: "الجامعة الأمريكية بالقاهرة، كلية التعليم المستمر",
        certificate: "شهادة تأسيسية: قسم الدراسات العربية والترجمة",
      },
      {
        institution: "جامعة عين شمس",
        certificate: "دبلوم الدراسات العليا في القانون الخاص",
      },
      {
        institution: "مبادرة سيادة القانون التابعة لنقابة المحامين الأمريكية وجامعة القاهرة",
        certificate: "التعليم القانوني المستمر للمحامين الشباب: المهارات والممارسة والدورة المهنية",
        date: "18 يناير - 14 مارس 2010، القاهرة، مصر",
      },
    ],
    phone: " +971 566674666",
    email: defaultEmail,
    linkedin: "https://www.linkedin.com/in/almahy-mohamed-a9a82565",
  },
  basicProfile({
    slug: "amin-kamel",
    nameEn: "Amin Kamel",
    nameAr: "أمين كامل",
    positionEn: "CHIEF FINANCIAL OFFICER",
    positionAr: "المدير المالي",
    photo: cardPhoto("amin-kamel", "/images/team/amin-kamel.png"),
    practiceAreasEn: ["Finance", "Accounting Oversight", "Corporate Planning"],
    practiceAreasAr: ["المالية", "الإشراف المحاسبي", "التخطيط المؤسسي"],
    overviewEn: [
      "Amin Kamel leads financial planning and oversight for Almahy Legal Services, supporting sustainable growth and operational clarity.",
    ],
    overviewAr: [
      "يقود أمين كامل التخطيط المالي والإشراف لشركة الماحي للخدمات القانونية، بما يدعم النمو المستدام والوضوح التشغيلي.",
    ],
  }),
  {
    slug: "mohamed-hassanein",
    nameEn: "Mohamed Hassanein",
    nameAr: "محمد حسنين",
    positionEn: "LEGAL CONSULTANT",
    positionAr: "مستشار قانوني",
    photo: cardPhoto("mohamed-hassanein", "/images/team/mohamed-hassanein-v3.webp"),
    casesHandledDisplayEn: "24+",
    casesHandledDisplayAr: "+24",
    casesInProgressEn: "9 labor, rental, and civil cases remain in active follow-up.",
    casesInProgressAr: "9 قضايا عمل وإيجار ومدنية لا تزال قيد المتابعة النشطة.",
    casesDetailEn:
      "Mohamed Hassanein has handled more than 24 cases across labor disputes, rental conflicts, and civil litigation. He manages documentation, court submissions, and client updates throughout each stage of the legal process.",
    casesDetailAr:
      "تولى محمد حسنين أكثر من 24 قضية في نزاعات العمل وتعارضات الإيجار والتقاضي المدني، ويدير التوثيق والتقديمات القضائية وتحديثات العملاء خلال جميع مراحل الإجراءات القانونية.",
    practiceAreasEn: ["Labor Law", "Rental Disputes", "Civil Litigation", "Case Documentation"],
    practiceAreasAr: ["قانون العمل", "نزاعات الإيجار", "التقاضي المدني", "توثيق القضايا"],
    highlightsEn: [
      "Handles labor cases involving contracts, dues, and termination disputes.",
      "Supports rental cases before courts and dispute committees.",
      "Prepares organized legal files with complete supporting documents.",
    ],
    highlightsAr: [
      "يتولى قضايا العمل المتعلقة بالعقود والمستحقات ونزاعات إنهاء الخدمة.",
      "يدعم قضايا الإيجار أمام المحاكم ولجان النزاع.",
      "يعد ملفات قانونية منظمة مع مستندات داعمة كاملة.",
    ],
    overviewEn: [
      "Legal Consultant focused on labor, rental, and civil cases, with strong attention to documentation and procedural follow-up.",
    ],
    overviewAr: [
      "مستشار قانوني يركز على قضايا العمل والإيجار والمدنية، مع اهتمام قوي بالتوثيق والمتابعة الإجرائية.",
    ],
    phone: defaultPhone,
    email: defaultEmail,
  },
  {
    slug: "maged-nafea",
    nameEn: "Maged Nafea",
    nameAr: "ماجد نافع",
    positionEn: "LEGAL CONSULTANT",
    positionAr: "مستشار قانوني",
    photo: cardPhoto("maged-nafea", "/images/team/team-02.png"),
    casesHandledDisplayEn: "200+",
    casesHandledDisplayAr: "+200",
    casesInProgressEn: "He has completed 4 months with the firm and has achieved a 70% win rate across handled matters.",
    casesInProgressAr: "أكمل 4 أشهر مع المكتب وحقق نسبة فوز 70% في الملفات التي تعامل معها.",
    casesDetailEn:
      "Maged Nafea has handled 200+ cases across labor, civil, commercial, criminal, personal, contract, and agreement-related matters. His work includes preparing case files, reviewing claims and supporting documents, following procedural steps, and coordinating updates until each file reaches the next legal stage.",
    casesDetailAr:
      "تولى ماجد نافع أكثر من 200 قضية في مجالات العمل والمدني والتجاري والجنائي والقضايا الشخصية والعقود والاتفاقيات، ويشمل عمله إعداد ملفات القضايا ومراجعة المطالبات والمستندات الداعمة ومتابعة الإجراءات وتنسيق التحديثات حتى انتقال كل ملف إلى مرحلته القانونية التالية.",
    practiceAreasEn: ["Labor Law", "Civil Cases", "Commercial Cases", "Criminal Cases", "Personal Matters", "Contracts", "Agreements"],
    practiceAreasAr: ["قانون العمل", "القضايا المدنية", "القضايا التجارية", "القضايا الجنائية", "القضايا الشخصية", "العقود", "الاتفاقيات"],
    highlightsEn: [
      "Handles labor, civil, commercial, criminal, and personal case files with structured follow-up.",
      "Reviews contracts, agreements, claims, and supporting documents before filing or response.",
      "Tracks hearings, submissions, deadlines, and client updates across active matters.",
      "Maintains a 70% win rate across handled cases.",
    ],
    highlightsAr: [
      "يتولى ملفات العمل والمدني والتجاري والجنائي والقضايا الشخصية بمتابعة منظمة.",
      "يراجع العقود والاتفاقيات والمطالبات والمستندات الداعمة قبل التقديم أو الرد.",
      "يتابع الجلسات والمذكرات والمواعيد النهائية وتحديثات العملاء عبر الملفات النشطة.",
      "يحافظ على نسبة فوز 70% في القضايا التي تعامل معها.",
    ],
    overviewEn: [
      "Legal Consultant who has completed 4 months with Almahy Legal Services, handling a broad mix of labor, civil, commercial, criminal, personal, contract, and agreement-related matters.",
      "His profile is focused on disciplined case preparation, practical follow-up, and maintaining clear communication from initial review through the next legal step.",
    ],
    overviewAr: [
      "مستشار قانوني أكمل 4 أشهر مع شركة الماحي للخدمات القانونية، ويتعامل مع مجموعة واسعة من قضايا العمل والمدني والتجاري والجنائي والقضايا الشخصية والعقود والاتفاقيات.",
      "يركز ملفه المهني على الإعداد المنظم للقضايا والمتابعة العملية والحفاظ على تواصل واضح من المراجعة الأولية حتى الخطوة القانونية التالية.",
    ],
    credentialsEn: [
      {
        institution: "Alexandria University",
        certificate: "Faculty of Law",
        date: "2016",
      },
    ],
    credentialsAr: [
      {
        institution: "جامعة الإسكندرية",
        certificate: "كلية القانون",
        date: "2016",
      },
    ],
    phone: defaultPhone,
    email: defaultEmail,
  },
  {
    slug: "nasef-abdel-aal",
    nameEn: "Nasef Abdel Aal",
    nameAr: "ناصف عبد العال",
    positionEn: "LEGAL CONSULTANT",
    positionAr: "مستشار قانوني",
    photo: cardPhoto("nasef-abdel-aal", "/images/team/team-08.png"),
    casesHandledDisplayEn: "27+",
    casesHandledDisplayAr: "+27",
    casesInProgressEn: "8 debt recovery and commercial files are still in process.",
    casesInProgressAr: "8 ملفات تحصيل ديون وتجارية لا تزال قيد الإجراء.",
    casesDetailEn:
      "Nasef Abdel Aal has handled more than 27 cases in commercial disputes, civil claims, and debt recovery support. His caseload includes unpaid dues, contract breaches, legal notices, and enforcement-related follow-up for corporate and individual clients.",
    casesDetailAr:
      "تولى ناصف عبد العال أكثر من 27 قضية في النزاعات التجارية والمطالبات المدنية ودعم تحصيل الديون، وتشمل ملفاته المستحقات غير المدفوعة وإخلال العقود والإشعارات القانونية ومتابعة التنفيذ للعملاء من الشركات والأفراد.",
    practiceAreasEn: ["Debt Recovery", "Commercial Disputes", "Civil Claims", "Legal Notices"],
    practiceAreasAr: ["تحصيل الديون", "النزاعات التجارية", "المطالبات المدنية", "الإشعارات القانونية"],
    highlightsEn: [
      "Supports debt collection procedures from initial notice to legal action.",
      "Handles commercial disputes involving unpaid invoices and contract breaches.",
      "Prepares legal notices and case documents for court and authority submission.",
    ],
    highlightsAr: [
      "يدعم إجراءات تحصيل الديون من الإشعار الأولي إلى الإجراء القانوني.",
      "يتولى النزاعات التجارية المتعلقة بالفواتير غير المدفوعة وإخلال العقود.",
      "يعد الإشعارات القانونية ومستندات القضايا للتقديم للمحاكم والجهات.",
    ],
    overviewEn: [
      "Legal Consultant with experience in commercial disputes and debt recovery, helping clients pursue unpaid dues through structured legal steps.",
    ],
    overviewAr: [
      "مستشار قانوني بخبرة في النزاعات التجارية وتحصيل الديون، يساعد العملاء على متابعة المستحقات غير المدفوعة عبر خطوات قانونية منظمة.",
    ],
    phone: defaultPhone,
    email: defaultEmail,
  },
  basicProfile({
    slug: "mudasir-yaseen",
    nameEn: "Mudasir Yaseen",
    nameAr: "مدثر ياسين",
    positionEn: "ACCOUNTANT",
    positionAr: "محاسب",
    photo: cardPhoto("mudasir-yaseen", "/images/team/mudasir-yaseen-v2.webp"),
    practiceAreasEn: ["Accounting", "Bookkeeping", "Financial Reporting"],
    practiceAreasAr: ["المحاسبة", "مسك الدفاتر", "التقارير المالية"],
  }),
  basicProfile({
    slug: "ahmed-osama",
    nameEn: "Ahmed Osama",
    nameAr: "أحمد أسامة",
    positionEn: "ACCOUNTANT",
    positionAr: "محاسب",
    photo: cardPhoto("ahmed-osama", "/images/team/ahmed-osama-v2.webp"),
    practiceAreasEn: ["Accounting", "Bookkeeping", "Financial Reporting"],
    practiceAreasAr: ["المحاسبة", "مسك الدفاتر", "التقارير المالية"],
  }),
  basicProfile({
    slug: "mahmoud-salah-eldein",
    nameEn: "Mahmoud Salah El Din",
    nameAr: "محمود صلاح الدين",
    positionEn: "ACCOUNTANT",
    positionAr: "محاسب",
    photo: cardPhoto("mahmoud-salah-eldein", "/images/team/mahmoud-salah-el-din-v2.webp"),
    practiceAreasEn: ["Accounting", "Bookkeeping", "Financial Reporting"],
    practiceAreasAr: ["المحاسبة", "مسك الدفاتر", "التقارير المالية"],
  }),
  {
    slug: "mahmoud-abdel-fadeel",
    nameEn: "Mahmoud Abdel Fadeel",
    nameAr: "محمود عبد الفضيل",
    positionEn: "LEGAL CONSULTANT",
    positionAr: "مستشار قانوني",
    photo: cardPhoto("mahmoud-abdel-fadeel", "/images/team/team-10.png"),
    casesHandledDisplayEn: "800+",
    casesHandledDisplayAr: "+800",
    casesInProgressEn: "He has completed 7 months with the firm while handling a high-volume caseload across multiple practice areas.",
    casesInProgressAr: "أكمل 7 أشهر مع المكتب أثناء تعامله مع عدد كبير من الملفات عبر مجالات قانونية متعددة.",
    casesDetailEn:
      "Mahmoud Abdel Fadeel has handled 800+ cases across civil, commercial, real estate, labor, cheque, and rental matters. His work includes reviewing claims and supporting documents, preparing case files, tracking hearings and submissions, and coordinating with clients through each procedural stage.",
    casesDetailAr:
      "تولى محمود عبد الفضيل أكثر من 800 قضية في المجالات المدنية والتجارية والعقارية والعمل والشيكات والإيجارات، ويشمل عمله مراجعة المطالبات والمستندات الداعمة وإعداد ملفات القضايا ومتابعة الجلسات والمذكرات والتنسيق مع العملاء خلال كل مرحلة إجرائية.",
    practiceAreasEn: ["Civil Cases", "Commercial Cases", "Real Estate", "Labor Law", "Cheque Cases", "Rental Disputes"],
    practiceAreasAr: ["القضايا المدنية", "القضايا التجارية", "العقارات", "قانون العمل", "قضايا الشيكات", "نزاعات الإيجار"],
    highlightsEn: [
      "Handles civil, commercial, real estate, labor, cheque, and rental case files.",
      "Prepares and follows submissions, hearing updates, and procedural requirements.",
      "Reviews supporting documents and coordinates next steps with clients and the legal team.",
    ],
    highlightsAr: [
      "يتولى ملفات القضايا المدنية والتجارية والعقارية والعمل والشيكات والإيجارات.",
      "يعد ويتابع المذكرات وتحديثات الجلسات والمتطلبات الإجرائية.",
      "يراجع المستندات الداعمة وينسق الخطوات التالية مع العملاء والفريق القانوني.",
    ],
    overviewEn: [
      "Legal Consultant who has completed 7 months with Almahy Legal Services, handling a high-volume caseload across civil, commercial, real estate, labor, cheque, and rental matters.",
      "His work focuses on organized case preparation, procedural follow-up, and clear coordination between clients, courts, and the legal team.",
    ],
    overviewAr: [
      "مستشار قانوني أكمل 7 أشهر مع شركة الماحي للخدمات القانونية، ويتعامل مع عدد كبير من الملفات في المجالات المدنية والتجارية والعقارية والعمل والشيكات والإيجارات.",
      "يركز عمله على الإعداد المنظم للقضايا والمتابعة الإجرائية والتنسيق الواضح بين العملاء والمحاكم والفريق القانوني.",
    ],
    credentialsEn: [
      {
        institution: "Port Said University",
        certificate: "Faculty of Law",
      },
    ],
    credentialsAr: [
      {
        institution: "جامعة بورسعيد",
        certificate: "كلية القانون",
      },
    ],
    phone: defaultPhone,
    email: defaultEmail,
  },
  {
    slug: "dalia-ghonem",
    nameEn: "Dalia Ghonem",
    nameAr: "داليا غنيم",
    positionEn: "LEGAL CONSULTANT",
    positionAr: "مستشارة قانونية",
    photo: cardPhoto("dalia-ghonem", "/images/team/dalia-ghonem-v2.webp"),
    casesHandledDisplayEn: "700+",
    casesHandledDisplayAr: "+700",
    casesInProgressEn: "She has completed 1 year with the firm and has achieved an 80% win rate across handled matters.",
    casesInProgressAr: "أكملت سنة واحدة مع المكتب وحققت نسبة فوز 80% في الملفات التي تعاملت معها.",
    casesDetailEn:
      "Dalia Ghonem has handled 700+ cases across labor, civil, commercial, criminal, personal, contract, and agreement-related matters. Her work includes reviewing claims and supporting documents, preparing case files, tracking procedural requirements, and coordinating client updates through each legal stage.",
    casesDetailAr:
      "تولت داليا غنيم أكثر من 700 قضية في مجالات العمل والمدني والتجاري والجنائي والقضايا الشخصية والعقود والاتفاقيات، ويشمل عملها مراجعة المطالبات والمستندات الداعمة وإعداد ملفات القضايا ومتابعة المتطلبات الإجرائية وتنسيق تحديثات العملاء عبر كل مرحلة قانونية.",
    practiceAreasEn: ["Labor Law", "Civil Cases", "Commercial Cases", "Criminal Cases", "Personal Matters", "Contracts", "Agreements"],
    practiceAreasAr: ["قانون العمل", "القضايا المدنية", "القضايا التجارية", "القضايا الجنائية", "القضايا الشخصية", "العقود", "الاتفاقيات"],
    highlightsEn: [
      "Handles labor, civil, commercial, criminal, and personal case files with structured follow-up.",
      "Reviews contracts, agreements, claims, and supporting documents before filing or response.",
      "Tracks hearings, submissions, deadlines, and client updates across active matters.",
      "Maintains an 80% win rate across handled cases.",
    ],
    highlightsAr: [
      "تتولى ملفات العمل والمدني والتجاري والجنائي والقضايا الشخصية بمتابعة منظمة.",
      "تراجع العقود والاتفاقيات والمطالبات والمستندات الداعمة قبل التقديم أو الرد.",
      "تتابع الجلسات والمذكرات والمواعيد النهائية وتحديثات العملاء عبر الملفات النشطة.",
      "تحافظ على نسبة فوز 80% في القضايا التي تعاملت معها.",
    ],
    overviewEn: [
      "Legal Consultant who has completed 1 year with Almahy Legal Services, handling a broad mix of labor, civil, commercial, criminal, personal, contract, and agreement-related matters.",
      "Her profile is focused on disciplined case preparation, practical follow-up, and clear communication from initial review through the next legal step.",
    ],
    overviewAr: [
      "مستشارة قانونية أكملت سنة واحدة مع شركة الماحي للخدمات القانونية، وتتعامل مع مجموعة واسعة من قضايا العمل والمدني والتجاري والجنائي والقضايا الشخصية والعقود والاتفاقيات.",
      "يركز ملفها المهني على الإعداد المنظم للقضايا والمتابعة العملية والحفاظ على تواصل واضح من المراجعة الأولية حتى الخطوة القانونية التالية.",
    ],
    credentialsEn: [
      {
        institution: "Mansoura University",
        certificate: "Faculty of Law",
        date: "2017",
      },
    ],
    credentialsAr: [
      {
        institution: "جامعة المنصورة",
        certificate: "كلية القانون",
        date: "2017",
      },
    ],
    phone: defaultPhone,
    email: defaultEmail,
  },
  basicProfile({
    slug: "abdel-rahman-matar",
    nameEn: "Abdel Rahman Matar",
    nameAr: "عبد الرحمن مطر",
    positionEn: "LEGAL ADVISOR",
    positionAr: "مستشار قانوني",
    photo: cardPhoto("abdel-rahman-matar", "/images/team/abdel-rahman-matar.jpg"),
    practiceAreasEn: ["Legal Advisory", "Client Consultations", "Case Support"],
    practiceAreasAr: ["الاستشارات القانونية", "استشارات العملاء", "دعم القضايا"],
    overviewEn: [
      "Abdel Rahman Matar supports clients as Legal Advisor at Almahy Legal Services, providing practical legal guidance and coordinated case support across the UAE.",
    ],
    overviewAr: [
      "يدعم عبد الرحمن مطر العملاء بصفته مستشاراً قانونياً في الماحي للخدمات القانونية، ويقدم إرشاداً قانونياً عملياً ودعماً منسقاً للقضايا في جميع أنحاء الإمارات.",
    ],
  }),
  basicProfile({
    slug: "rohith-sagar-m",
    nameEn: "Rohith Sagar M",
    nameAr: "روهيث ساغار م",
    positionEn: "FULL STACK DEVELOPER",
    positionAr: "مطور برمجيات متكامل",
    photo: cardPhoto("rohith-sagar-m", "/images/team/ROHI.png"),
    practiceAreasEn: ["Web Development", "Product Engineering", "Systems Integration"],
    practiceAreasAr: ["تطوير الويب", "هندسة المنتجات", "تكامل الأنظمة"],
    overviewEn: [
      "Rohith Sagar M builds and maintains digital platforms that support Almahy Legal Services operations and client experience.",
    ],
    overviewAr: [
      "يعمل روهيث ساغار م على بناء وصيانة المنصات الرقمية التي تدعم عمليات الماحي للخدمات القانونية وتجربة العملاء.",
    ],
  }),
  basicProfile({
    slug: "amritha",
    nameEn: "Amritha",
    nameAr: "أمريثا",
    positionEn: "FULL STACK DEVELOPER",
    positionAr: "مطورة برمجيات متكاملة",
    photo: cardPhoto("amritha", "/images/team/team-03.png"),
    practiceAreasEn: ["Web Development", "Product Engineering", "UI Implementation"],
    practiceAreasAr: ["تطوير الويب", "هندسة المنتجات", "تنفيذ واجهات المستخدم"],
    overviewEn: [
      "Amritha develops and improves digital products for Almahy Legal Services, with a focus on reliable full-stack delivery.",
    ],
    overviewAr: [
      "تطور أمريثا المنتجات الرقمية لشركة الماحي للخدمات القانونية مع التركيز على التسليم المتكامل والموثوق.",
    ],
  }),
  basicProfile({
    slug: "abdulla",
    nameEn: "Abdulla",
    nameAr: "عبدالله",
    positionEn: "MARKETING MANAGER",
    positionAr: "مدير التسويق",
    photo: cardPhoto("abdulla", "/images/team/abdulla.webp"),
    practiceAreasEn: ["Brand Marketing", "Digital Campaigns", "Client Outreach"],
    practiceAreasAr: ["التسويق للعلامة", "الحملات الرقمية", "التواصل مع العملاء"],
    overviewEn: [
      "Abdulla leads marketing for Almahy Legal Services, building brand presence and supporting client outreach across the UAE.",
    ],
    overviewAr: [
      "يقود عبدالله التسويق في شركة الماحي للخدمات القانونية، ويعزز حضور العلامة ويدعم التواصل مع العملاء في أنحاء الإمارات.",
    ],
  }),
  basicProfile({
    slug: "rocky-cs",
    nameEn: "Rocky CS",
    nameAr: "روكي",
    positionEn: "CUSTOMER SUPPORT",
    positionAr: "دعم العملاء",
    photo: cardPhoto("rocky-cs", "/images/team/team-12.png"),
    practiceAreasEn: ["Client Support", "Case Coordination", "Communications"],
    practiceAreasAr: ["دعم العملاء", "تنسيق الملفات", "التواصل"],
    overviewEn: [
      "Rocky CS supports clients with responsive communication and coordination across Almahy Legal Services.",
    ],
    overviewAr: [
      "يدعم روكي العملاء من خلال تواصل سريع وتنسيق فعال عبر خدمات الماحي القانونية.",
    ],
  }),
];

export function getTeamMemberBySlug(slug: string): TeamMemberProfile | undefined {
  return teamMembers.find((member) => member.slug === slug);
}

export function getAllTeamSlugs(): string[] {
  return teamMembers.map((member) => member.slug);
}
