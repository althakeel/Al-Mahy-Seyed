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
  return buildPageMetadata(lang, "/tax-services", PAGE_SEO.taxServices);
}

export default async function TaxServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isValidLoc = locale === "en" || locale === "ar";
  const lang = isValidLoc ? (locale as Locale) : "en";

  const content = {
    en: {
      badge: "Tax Services",
      heroTitle: "Tax Services",
      heroSubtitle: "Comprehensive Tax Solutions for Your Business Success",
      mainTitle: "Professional Tax Solutions",
      mainDesc: "Almahy Legal Services Accounting is a tax agency accredited by the Federal Tax Authority in the United Arab Emirates. Our tax experts provide integrated assistance in various tax disciplines, offering solutions and comprehensive strategies to solve complex tax-related issues.",
      services: [
        { 
          icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
          title: "Tax Consultants", 
          desc: "Expert tax consultation services to guide you through complex tax regulations and compliance requirements." 
        },
        { 
          icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
          title: "Tax Agent", 
          desc: "Authorized tax agent representation, we communicate with tax offices and handle all submission requirements." 
        },
        { 
          icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
          title: "Tax Audit Support", 
          desc: "Comprehensive audit support for all types of tax audits to ensure compliance and prevent delays." 
        },
        { 
          icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
          title: "Tax Registration", 
          desc: "Complete assistance with tax registration and de-registration processes with all relevant authorities." 
        },
        { 
          icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
          title: "VAT Returns Filing", 
          desc: "Accurate and timely VAT return preparation and filing in accordance with tax laws and regulations." 
        },
        { 
          icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
          title: "VAT Refunds", 
          desc: "Process VAT refund applications for businesses operating in free zones with proper documentation." 
        },
        { 
          icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
          title: "Reconciliation Requests", 
          desc: "Submit reconciliation requests with strong documentation for review and resolution with tax authorities." 
        },
        { 
          icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
          title: "Excise Tax Services", 
          desc: "Registration, compliance reporting, and management of excise tax liabilities with expert support." 
        },
      ],
      whyChoose: [
        { number: "1", title: "Certified Experts", desc: "Team of tax experts certified by the Federal Tax Authority with proven track records." },
        { number: "2", title: "Comprehensive Solutions", desc: "End-to-end tax services tailored to your specific business needs and requirements." },
        { number: "3", title: "Technology Driven", desc: "Modern tax software and cloud-based solutions for efficient tax management." },
        { number: "4", title: "Compliance Assured", desc: "Full regulatory compliance and FTA audit support to keep you protected." }
      ],
      ctaText: "Schedule Consultation"
    },
    ar: {
      badge: "الخدمات الضريبية",
      heroTitle: "الخدمات الضريبية",
      heroSubtitle: "حلول ضريبية شاملة لنجاح أعمالك",
      mainTitle: "حلول ضريبية احترافية",
      mainDesc: "الماحي للخدمات القانونية وكالة ضريبية معتمدة من قبل الهيئة الاتحادية للضرائب في دولة الإمارات العربية المتحدة. يقدم خبراؤنا الضريبيون المساعدة المتكاملة في مختلف التخصصات الضريبية، ونقدم حلولاً واستراتيجيات شاملة لحل القضايا المعقدة المتعلقة بالضرائب.",
      services: [
        { icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z", title: "مستشارو الضرائب", desc: "خدمات استشارات ضريبية متخصصة لإرشادك عبر اللوائح الضريبية المعقدة ومتطلبات الامتثال." },
        { icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", title: "وكيل ضرائب", desc: "تمثيل وكيل ضرائب معتمد، نتواصل مع مكاتب الضرائب ونتعامل مع جميع متطلبات التقديم." },
        { icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", title: "دعم التدقيق الضريبي", desc: "دعم تدقيق شامل لجميع أنواع التدقيقات الضريبية لضمان الامتثال ومنع التأخير." },
        { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", title: "التسجيل الضريبي", desc: "مساعدة كاملة في عمليات التسجيل وإلغاء التسجيل الضريبي مع جميع الجهات ذات الصلة." },
        { icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", title: "تقديم إقرارات ضريبة القيمة المضافة", desc: "إعداد وتقديم إقرار ضريبة القيمة المضافة بدقة وفي الوقت المناسب وفقًا لقوانين الضرائب واللوائح." },
        { icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", title: "استرداد ضريبة القيمة المضافة", desc: "معالجة طلبات استرداد ضريبة القيمة المضافة للشركات العاملة في المناطق الحرة بالوثائق المناسبة." },
        { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01", title: "طلبات التسوية", desc: "تقديم طلبات التسوية بوثائق قوية للمراجعة والحل مع السلطات الضريبية." },
        { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", title: "خدمات الضريبة الانتقائية", desc: "التسجيل وإعداد التقارير الامتثالية وإدارة التزامات الضريبة الانتقائية مع دعم الخبراء." },
      ],
      whyChoose: [
        { number: "1", title: "خبراء معتمدون", desc: "فريق من خبراء الضرائب معتمد من الهيئة الاتحادية للضرائب مع سجلات حافلة مثبتة." },
        { number: "2", title: "حلول شاملة", desc: "خدمات ضريبية شاملة مصممة خصيصًا لاحتياجات ومتطلبات عملك المحددة." },
        { number: "3", title: "مدعوم بالتكنولوجيا", desc: "برامج ضريبية حديثة وحلول قائمة على السحابة لإدارة ضريبية فعالة." },
        { number: "4", title: "ضمان الامتثال", desc: "امتثال تنظيمي كامل ودعم تدقيق الهيئة الاتحادية للضرائب لحمايتك." }
      ],
      ctaText: "حدد موعد استشارة"
    }
  };

  const pageContent = content[lang];

  return (
    <>
      <ServicePageSeo locale={lang} path="/tax-services" copy={PAGE_SEO.taxServices} />
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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
          src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1600&h=450&fit=crop"
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
                ? 'Get in touch today and see how smooth, reliable tax services can power your next stage of growth.' 
                : 'تواصل معنا اليوم وشاهد كيف يمكن لخدمات الضرائب السلسة والموثوقة أن تدفع مرحلة النمو القادمة لديك.'}
            </p>
            
            <a
              href="https://wa.me/971504096028?text=Hello%2C%20I%20would%20like%20to%20get%20a%20quote%20for%20tax%20services"
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
