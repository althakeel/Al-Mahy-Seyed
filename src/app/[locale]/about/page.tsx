import type { Metadata } from "next";
import JsonLd from "@/components/structured-data/JsonLd";
import { buildPageMetadata, PAGE_SEO } from "@/lib/site-metadata";
import { buildBreadcrumbSchema, buildLocalBusinessSchema } from "@/lib/structured-data-builders";
import { translations, Locale } from "@/lib/translations";
import { isValidLocale } from "@/lib/utils";
import { getTeamCards } from "@/data/team";
import AboutHero from "@/components/about/AboutHero";
import AboutIntroSection from "@/components/about/AboutIntroSection";
import AboutMissionVisionSection from "@/components/about/AboutMissionVisionSection";
import AboutBenefitsSection from "@/components/about/AboutBenefitsSection";
import AboutTeamSection from "@/components/about/AboutTeamSection";
import AboutCtaSection from "@/components/about/AboutCtaSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isValidLocale(locale) ? locale : "en";
  return buildPageMetadata(lang, "/about", PAGE_SEO.about);
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isValidLoc = locale === "en" || locale === "ar";
  const lang = isValidLoc ? (locale as Locale) : "en";
  const t = translations[lang];
  const isAr = lang === "ar";

  const aboutStats = [
    { value: "15+", label: lang === "en" ? "Years Experience" : "سنوات خبرة" },
    { value: "5000+", label: lang === "en" ? "Clients" : "عملاء" },
    { value: "50+", label: lang === "en" ? "Professionals" : "محترفون" },
    { value: "All", label: lang === "en" ? "Emirates Covered" : "جميع الإمارات" },
  ];

  const whyChooseCards = [
    {
      number: "01",
      title: lang === "en" ? "38 years in UAE practice" : "38 عاماً من الممارسة في الإمارات",
      desc:
        lang === "en"
          ? "We know how Dubai courts, free zones, and licensing authorities actually work not just the theory."
          : "نعرف كيف تعمل محاكم دبي والمناطق الحرة وجهات الترخيص فعلياً، وليس فقط من الناحية النظرية.",
    },
    {
      number: "02",
      title: lang === "en" ? "One office for legal + corporate work" : "مكتب واحد للعمل القانوني والمؤسسي",
      desc:
        lang === "en"
          ? "Company setup, contracts, notary, disputes, and accounting stay with the same team so nothing gets lost between vendors."
          : "تأسيس الشركات والعقود والتوثيق والنزاعات والمحاسبة تبقى مع نفس الفريق حتى لا يضيع شيء بين مقدمي الخدمة.",
    },
    {
      number: "03",
      title: lang === "en" ? "Clear next steps, every file" : "خطوات واضحة في كل ملف",
      desc:
        lang === "en"
          ? "You get plain updates on what was filed, what is pending, and what you need to decide without legal fog."
          : "تحصل على تحديثات واضحة عما تم تقديمه وما هو قيد الانتظار وما تحتاج إلى تقريره، بلا غموض قانوني.",
    },
    {
      number: "04",
      title: lang === "en" ? "Built for busy clients" : "مصممون للعملاء المشغولين",
      desc:
        lang === "en"
          ? "WhatsApp, calls, and office meetings we move at the pace of your business, not the other way around."
          : "واتساب والمكالمات واجتماعات المكتب نتحرك بإيقاع عملك، وليس العكس.",
    },
  ];

  const coreValues =
    lang === "en"
      ? [
          "Committed to delivering the finest",
          "Honest and transparent services",
          "High marks of trust, business trust & integrity",
          "Service",
        ]
      : ["ملتزمون بتقديم الأفضل", "خدمات صادقة وشفافة", "ثقة عالية ونزاهة", "خدمة"];

  return (
    <>
      <JsonLd id="about-local-business-schema" data={buildLocalBusinessSchema(lang)} />
      <JsonLd
        id="about-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: isAr ? "الرئيسية" : "Home", path: `/${lang}` },
          { name: isAr ? "من نحن" : "About Us", path: `/${lang}/about` },
        ])}
      />
    <div className="min-h-screen" dir={isAr ? "rtl" : "ltr"} lang={lang}>
      <AboutHero
        locale={lang}
        eyebrow={isAr ? "مدفوعون بالدقة، مبنيون على الثقة" : "Driven by Precision, Built on Trust"}
        title={isAr ? "من نحن" : "About us"}
        bookLabel={isAr ? "احجز استشارة مجانية" : "Book Free Consultation"}
        callLabel={isAr ? "اتصل بنا" : "Call Us"}
        stats={aboutStats}
      />

      <AboutIntroSection
        isArabic={isAr}
        eyebrow={isAr ? "مرحبا بكم في شركة المحاماة" : "ABOUT ALMAHY LEGAL SERVICES"}
        title={
          isAr
            ? "اجعل امتثالك الضريبي نقطة البداية لنمو عمل"
            : "Trusted Legal Advisors for Businesses and Individuals Across the UAE"
        }
        paragraph1={t.aboutDesc1}
        paragraph2={t.aboutDesc2}
        coreValuesTitle={isAr ? "قيمنا الأساسية" : "Our Core Values"}
        coreValues={coreValues}
        imageAlt={
          isAr ? "اجتماع فريق الماحي للخدمات القانونية" : "Almahy Legal Services team meeting"
        }
      />

      <AboutMissionVisionSection
        isArabic={isAr}
        missionTitle={t.missionTitle}
        missionDesc={t.missionDesc}
        visionTitle={t.visionTitle}
        visionDesc={t.visionDesc}
        imageAlt={
          isAr ? "نقاش فريق الماحي للخدمات القانونية" : "Almahy Legal Services team discussion"
        }
      />

      <AboutBenefitsSection
        isArabic={isAr}
        eyebrow={isAr ? "لماذا الماحي" : "Why Almahy"}
        title={
          isAr ? "ما يلاحظه العملاء بعد العمل معنا" : "What clients notice after working with us"
        }
        subtitle={
          isAr
            ? "وعود أقل عمومية. ومزيد من الطريقة التي ندير بها الملفات فعلياً في الإمارات."
            : "Less generic promises. More of how we actually run files in the UAE."
        }
        items={whyChooseCards}
      />

      <AboutTeamSection
        locale={lang}
        eyebrow={isAr ? "خبراء محترفون" : "Professional Experts"}
        title={isAr ? "فريقنا" : "Our Team"}
        subtitle={
          isAr ? "تعرف على فريق العمل المتميز لدينا." : "Meet our dedicated staff who drive our success."
        }
        members={getTeamCards()}
      />

      <AboutCtaSection
        locale={lang}
        title={isAr ? "هل أنت مستعد للبدء؟" : "Speak with Our Legal Experts Today"}
        description={
          isAr
            ? "اتصل بنا اليوم للحصول على استشارة مجانية واكتشف كيف يمكننا مساعدة عملك على النجاح."
            : "Whether you're starting a business, resolving a dispute, or seeking trusted legal advice, our experienced team is here to help. Contact us today to schedule your consultation."
        }
        bookLabel={isAr ? "تواصل معنا" : "Book a Consultation"}
        callLabel={isAr ? "اتصل بنا" : "Call Us"}
      />
    </div>
    </>
  );
}
