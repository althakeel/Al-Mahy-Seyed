import type { Metadata } from "next";
import Image from "next/image";
import { buildPageMetadata, PAGE_SEO } from "@/lib/site-metadata";
import { ServicePageSeo } from "@/lib/with-service-seo";
import { translations, Locale } from "@/lib/translations";
import { isValidLocale } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isValidLocale(locale) ? locale : "en";
  return buildPageMetadata(lang, "/professional-services", PAGE_SEO.professionalServices);
}

export default async function ProfessionalServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isValidLoc = locale === "en" || locale === "ar";
  const lang = isValidLoc ? (locale as Locale) : "en";

  const content = {
    en: {
      badge: "Professional Services",
      heroTitle: "Professional Services",
      heroSubtitle: "Strategic Management & Business Consulting for Growth",
      mainTitle: "Professional Consulting Solutions",
      mainDesc: "At Almahy Legal Services Accounting, we offer management consulting to various entities to help organizations improve their performance, primarily by analyzing problems, developing plans and solutions to improve existing organizations, and preparing organizational structures, tasks, responsibilities, and corporate strategies.",
      services: [
        { 
          icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
          title: "Management Consulting", 
          desc: "Comprehensive management advisory services to enhance organizational performance and operational efficiency." 
        },
        { 
          icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
          title: "Business Strategy", 
          desc: "Strategic planning and development services to achieve your business goals and long-term objectives." 
        },
        { 
          icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
          title: "Organizational Design", 
          desc: "Design and implement effective organizational structures, roles, responsibilities, and reporting lines." 
        },
        { 
          icon: "M13 10V3L4 14h7v7l9-11h-7z",
          title: "Process Improvement", 
          desc: "Analyze and optimize business processes to increase efficiency, reduce costs, and improve quality." 
        },
        { 
          icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
          title: "Performance Analysis", 
          desc: "Detailed performance evaluation and KPI tracking to measure and enhance business success." 
        },
        { 
          icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
          title: "Risk Management", 
          desc: "Identify, assess, and mitigate business risks to protect your organization and ensure continuity." 
        },
        { 
          icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
          title: "Advisory Reports", 
          desc: "Prepare comprehensive advisory reports and recommendations for companies and legal entities." 
        },
        { 
          icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
          title: "Corporate Governance", 
          desc: "Implement best practices in corporate governance, compliance frameworks, and ethical standards." 
        },
      ],
      whyChoose: [
        { number: "1", title: "Expert Consultants", desc: "Experienced professionals with deep industry knowledge and proven track records across sectors." },
        { number: "2", title: "Tailored Solutions", desc: "Customized strategies and solutions designed specifically for your unique business needs." },
        { number: "3", title: "Results-Driven", desc: "Focus on measurable outcomes and tangible improvements to drive business growth." },
        { number: "4", title: "Best Practices", desc: "Implementation of international standards and industry-leading methodologies for excellence." }
      ],
      ctaText: "Schedule Consultation"
    },
    ar: {
      badge: "الخدمات المهنية",
      heroTitle: "الخدمات المهنية",
      heroSubtitle: "الإدارة الاستراتيجية واستشارات الأعمال للنمو",
      mainTitle: "حلول استشارية احترافية",
      mainDesc: "في الماحي للخدمات القانونية، نقدم استشارات إدارية لمختلف الجهات لمساعدة المنظمات على تحسين أدائها، في المقام الأول من خلال تحليل المشاكل، وتطوير الخطط والحلول لتحسين المنظمات القائمة، وإعداد الهياكل التنظيمية والمهام والمسؤوليات والاستراتيجيات المؤسسية.",
      services: [
        { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01", title: "استشارات إدارية", desc: "خدمات استشارية إدارية شاملة لتعزيز الأداء التنظيمي والكفاءة التشغيلية." },
        { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "استراتيجية الأعمال", desc: "خدمات التخطيط والتطوير الاستراتيجي لتحقيق أهداف عملك طويلة الأجل." },
        { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", title: "التصميم التنظيمي", desc: "تصميم وتنفيذ الهياكل التنظيمية الفعالة والأدوار والمسؤوليات وخطوط التقرير." },
        { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "تحسين العمليات", desc: "تحليل وتحسين العمليات التجارية لزيادة الكفاءة وخفض التكاليف وتحسين الجودة." },
        { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "تحليل الأداء", desc: "تقييم أداء مفصل وتتبع مؤشرات الأداء الرئيسية لقياس وتعزيز نجاح الأعمال." },
        { icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", title: "إدارة المخاطر", desc: "تحديد وتقييم وتخفيف مخاطر الأعمال لحماية مؤسستك وضمان الاستمرارية." },
        { icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", title: "التقارير الاستشارية", desc: "إعداد تقارير استشارية شاملة وتوصيات للشركات والكيانات القانونية." },
        { icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3", title: "حوكمة الشركات", desc: "تنفيذ أفضل الممارسات في حوكمة الشركات وأطر الامتثال والمعايير الأخلاقية." },
      ],
      whyChoose: [
        { number: "1", title: "مستشارون خبراء", desc: "محترفون ذوو خبرة مع معرفة صناعية عميقة وسجلات حافلة مثبتة عبر القطاعات." },
        { number: "2", title: "حلول مخصصة", desc: "استراتيجيات وحلول مخصصة مصممة خصيصًا لاحتياجات عملك الفريدة." },
        { number: "3", title: "موجه نحو النتائج", desc: "التركيز على النتائج القابلة للقياس والتحسينات الملموسة لدفع نمو الأعمال." },
        { number: "4", title: "أفضل الممارسات", desc: "تنفيذ المعايير الدولية والمنهجيات الرائدة في الصناعة للتميز." }
      ],
      ctaText: "حدد موعد استشارة"
    }
  };

  const pageContent = content[lang];

  return (
    <>
      <ServicePageSeo locale={lang} path="/professional-services" copy={PAGE_SEO.professionalServices} />
    <div className="w-full bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative max-w-[1250px] mx-auto px-4 md:px-8 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full px-4 py-2 mb-6">
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-amber-300 text-sm font-medium">{pageContent.badge}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {pageContent.heroTitle}
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {pageContent.heroSubtitle}
            </p>
            <a
              href="https://wa.me/971504096028?text=Hello%2C%20I%20would%20like%20to%20schedule%20a%20consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-2xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {pageContent.ctaText}
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="w-full py-20 px-4 md:px-8">
        <div className="max-w-[1250px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {pageContent.mainTitle}
            </h2>
            <div className="flex justify-center mb-6">
              <div className="h-1 w-20 bg-amber-500 rounded"></div>
            </div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              {pageContent.mainDesc}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {pageContent.services.map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-amber-500 hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg group-hover:text-amber-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Why Choose Us */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
              {lang === 'en' ? 'Why Choose Almahy Legal Services Accounting?' : 'لماذا تختار الماحي للخدمات القانونية؟'}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pageContent.whyChoose.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors"
                >
                  <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-lg">{item.number}</span>
                  </div>
                  <h4 className="font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-gray-300 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Get In Touch CTA Section */}
      <section className="relative w-full h-[450px] overflow-hidden">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&h=450&fit=crop"
          alt="Get in touch"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/85"></div>

        {/* Content */}
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center max-w-4xl">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {lang === 'en' ? 'Get In Touch Today' : 'تواصل معنا اليوم'}
            </h2>
            <p className="text-gray-200 text-xl mb-10 leading-relaxed">
              {lang === 'en' 
                ? 'Get in touch today and see how our professional consulting services can power your next stage of growth.' 
                : 'تواصل معنا اليوم وشاهد كيف يمكن لخدماتنا الاستشارية المهنية أن تدفع مرحلة النمو القادمة لديك.'}
            </p>
            
            <a
              href="https://wa.me/971504096028?text=Hello%2C%20I%20would%20like%20to%20get%20a%20quote%20for%20professional%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-12 py-4 rounded-md transition-colors shadow-xl uppercase tracking-widest text-sm"
            >
              {lang === 'en' ? 'GET A QUOTE' : 'احصل على عرض أسعار'}
            </a>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
