import type { Metadata } from "next";
import { Locale } from "@/lib/translations";
import { getServiceShowcaseItems } from "@/lib/services-showcase";
import ServiceShowcaseBlock from "@/components/ServiceShowcaseBlock";
import ServicesPageHero from "@/components/ServicesPageHero";
import { buildPageMetadata, PAGE_SEO } from "@/lib/site-metadata";
import { ServicePageSeo } from "@/lib/with-service-seo";
import { isValidLocale } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isValidLocale(locale) ? locale : "en";
  return buildPageMetadata(lang, "/services", PAGE_SEO.services);
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isValidLoc = locale === "en" || locale === "ar";
  const lang = isValidLoc ? (locale as Locale) : "en";
  const isArabic = lang === "ar";
  const services = getServiceShowcaseItems(lang);

  return (
    <>
      <ServicePageSeo locale={lang} path="/services" copy={PAGE_SEO.services} />
    <div
      className={`min-h-screen bg-white text-[#160A0A] ${isArabic ? "text-right" : "text-left"}`}
      dir={isArabic ? "rtl" : "ltr"}
      lang={lang}
    >
      <ServicesPageHero locale={lang} services={services} />

      <div id="services">
        {services.map((service, index) => (
          <ServiceShowcaseBlock
            key={service.slug}
            item={service}
            index={index}
            locale={lang}
            reversed={index % 2 === 1}
          />
        ))}
      </div>
    </div>
    </>
  );
}
