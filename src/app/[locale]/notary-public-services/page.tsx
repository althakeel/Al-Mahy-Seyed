import type { Metadata } from "next";
import { buildPageMetadata, PAGE_SEO } from "@/lib/site-metadata";
import { ServicePageSeo } from "@/lib/with-service-seo";
import { Locale } from "@/lib/translations";
import { isValidLocale } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang: Locale = isValidLocale(locale) ? locale : "en";
  return buildPageMetadata(lang, "/notary-public-services", PAGE_SEO.notaryServices);
}

export default async function NotaryPublicServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isValidLoc = locale === "en" || locale === "ar";
  const lang = isValidLoc ? (locale as Locale) : "en";

  const isArabic = lang === "ar";

  const sections = [
    {
      title: "Legal Documentation Services",
      paragraphs: [
        "We prepare, review, authenticate, and process legal documents for individuals, businesses, and government requirements across the UAE. Our team ensures every document meets the legal standards required for official use.",
         "From contracts and declarations to corporate and personal documentation, we provide end-to-end support to help clients complete local and international legal procedures efficiently."

      ],
    },
    {
      title: "Attestations",
      paragraphs: [
        "We provide document attestation services for personal, educational, commercial, and corporate documents required for use in the UAE and abroad. Our team manages the complete attestation process with the relevant government authorities.",
      ],
    },
    {
      title: "Authentication of Power of Attorney",
      paragraphs: [
        "We prepare, notarize, and authenticate general and special powers of attorney for individuals and businesses in accordance with UAE legal requirements. Our team ensures every document is legally valid and accepted by the relevant authorities.",
         "Whether for property transactions, business operations, court representation, or personal matters, we provide end-to-end guidance to complete the authentication process efficiently and securely."
      ],
    },
    {
      title: "Corporate and Business-Related Attestations",
      paragraphs: [
        "We provide attestation services for corporate documents required by government authorities, banks, courts, and international organizations. Our team assists businesses with document authentication to support local and cross-border commercial activities.",
         "From company incorporation documents and board resolutions to commercial agreements and shareholder records, we manage the complete attestation process to ensure legal recognition and compliance."

      ],
    },
    {
      title: "Legal Declarations",
      paragraphs: [
        "We prepare and authenticate legal declarations for individuals and businesses in accordance with UAE legal requirements. Our team assists with declarations required for government authorities, courts, financial institutions, immigration matters, and commercial transactions.",
        "Each declaration is carefully drafted to ensure legal validity, accuracy, and acceptance by the relevant authorities while protecting our clients' legal interests."
      ],
    },
    {
      title: "Legal Notice",
      paragraphs: [
        "We prepare and serve professionally drafted legal notices for individuals and businesses across the UAE. Our team assists with notices related to payment demands, breach of contract, tenancy disputes, employment matters, commercial claims, and other legal issues.",
        "Every legal notice is prepared in accordance with UAE law to clearly communicate your legal position, encourage amicable resolution where possible, and support future legal proceedings if required."

      ],
    },
  ];

  const wills = [
    {
      title: "Sharia-Compliant Will",
      desc: "Our lawyers draft wills in accordance with Islamic inheritance principles while advising on permissible distributions, charitable bequests, and family protection planning.",
    },
    {
      title: "Guardianship & Family Protection",
      desc:"Protect your children's future by appointing legal guardians and documenting family care arrangements, giving you confidence that your wishes will be respected.",
    },
    {
      title: "Probate & Estate Administration",
      desc: "We assist executors and beneficiaries with probate procedures, estate administration, asset distribution, and court requirements to ensure a smooth transfer of the estate.",
    },
  
  ];

  return (
    <>
      <ServicePageSeo locale={lang} path="/notary-public-services" copy={PAGE_SEO.notaryServices} />
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-[#160A0A]" />
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-blue-500/15 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 md:px-8 pt-24 pb-16 text-center flex flex-col items-center">
          <p className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm text-slate-200 mb-5">
            {isArabic ? "الماحي للخدمات القانونية" : "AUTHORIZED LEGAL AND NOTARY SERVICES"}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5 max-w-5xl">
            {isArabic ? "العدالة وخدمات التوثيق القانوني في الإمارات" : "Legal Documentation & Attestation Services"}
          </h1>
          <p className="text-slate-200 text-base md:text-lg max-w-4xl leading-relaxed mb-7">
            {isArabic
              ? "خدمات توثيق وتصديق قانونية احترافية تمنح مستنداتك قوة قانونية أمام المحاكم والجهات الحكومية والجهات الدولية، مع أعلى درجات الدقة والاعتمادية."
              : "We provide professional legal documentation, attestation, notarization, and authentication services to ensure your documents are legally recognized in the UAE and internationally."}
          </p>

          <div className="flex flex-wrap gap-3 justify-center">.
            <a
              href="https://wa.me/971504096028?text=Hello%2C%20I%20need%20notary%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-white/25 px-6 py-3 text-white hover:bg-white/10 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <article
              key={section.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-sm text-slate-200">
                  {index + 1}
                </span>
                <h2 className="text-2xl font-semibold text-amber-200 leading-snug">{section.title}</h2>
              </div>

              <div className="space-y-3">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-slate-200 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-20">
        <div className="rounded-3xl border border-amber-100/20 bg-gradient-to-br from-[#160A0A] via-[#160A0A] to-[#160A0A] p-6 md:p-8">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-200 mb-3"> Will Drafting </h2>
          <p className="text-slate-300 mb-6">
            We prepare legally compliant wills tailored to your family, assets, and succession objectives under UAE law, ensuring your final wishes are clearly documented and enforceable.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {wills.map((item) => (
              <div key={item.title} className="rounded-xl border border-white/10 bg-black/20 p-5">
                <h3 className="text-lg font-semibold text-amber-100 mb-2">{item.title}</h3>
                <p className="text-slate-200 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          
        </div>
      </section>
    </div>
    </>
  );
}
