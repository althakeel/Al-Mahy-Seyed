import { translations, Locale } from "@/lib/translations";
import ContactHero from "@/components/contact/ContactHero";
import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactOfficeSection from "@/components/contact/ContactOfficeSection";

const iconClass = "h-5 w-5";

const officeIcons = {
  address: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 21s6-4.35 6-10a6 6 0 1 0-12 0c0 5.65 6 10 6 10Z" />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  ),
  phone: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M6.5 3h3l1 4-2 .8a10 10 0 0 0 4.2 4.2l.8-2 4 1v3a2 2 0 0 1-2.3 2 16 16 0 0 1-7.7-3.6 16 16 0 0 1-3.6-7.7A2 2 0 0 1 6.5 3Z" />
    </svg>
  ),
  email: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 6.8c0-.993.0-1.49.194-1.86a1.6 1.6 0 0 1 .696-.696C5.26 4 5.757 4 6.75 4h10.5c.993 0 1.49 0 1.86.244.3.194.502.479.605.802.076.238.076.508.076 1.346v7.416c0 .993 0 1.49-.244 1.86a1.6 1.6 0 0 1-.696.696c-.31.2-.68.244-1.24.257v0l-11.7.019c-.993 0-1.49 0-1.86-.244a1.6 1.6 0 0 1-.696-.696C4 15.23 4 14.734 4 13.74Z" />
      <path d="m5 6 7 5 7-5" />
    </svg>
  ),
  hours: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isValidLoc = locale === "en" || locale === "ar";
  const lang = isValidLoc ? (locale as Locale) : "en";
  const t = translations[lang];
  const isAr = lang === "ar";
  const dir = isAr ? "rtl" : "ltr";

  const details = [
    {
      label: t.address,
      lines: isAr
        ? ["برج الصقر للأعمال، الطابق الثاني", "شارع الشيخ زايد، مركز دبي المالي العالمي، دبي"]
        : ["Al Saqr Business Tower, 2nd Floor", "Sheikh Zayed Rd, DIFC, Dubai, UAE"],
      icon: officeIcons.address,
    },
    {
      label: t.phone,
      lines: ["+971 4264 8831", "+971 5040 96028"],
      hrefs: ["tel:+97142648831", "tel:+971504096028"],
      icon: officeIcons.phone,
    },
    {
      label: t.email,
      lines: ["info@almahy.com", "legal@almahy.com"],
      hrefs: ["mailto:info@almahy.com", "mailto:legal@almahy.com"],
      icon: officeIcons.email,
    },
    {
      label: t.hours,
      lines: [t.hoursWeekdays, t.hoursWeekend],
      icon: officeIcons.hours,
    },
  ];

  return (
    <div dir={dir} className="bg-[#100B0B] text-white">
      <ContactHero
        isArabic={isAr}
        eyebrow={isAr ? "تواصل معنا" : "Contact"}
        title={isAr ? "اتصل بنا" : "Contact us"}
        subtitle={
          isAr
            ? "للاستشارات والملفات العاجلة. نرد عادة خلال يوم عمل واحد."
            : "For consultations and urgent files. We usually reply within one business day."
        }
      />

      <ContactFormSection
        isArabic={isAr}
        lang={lang}
        title={t.sendMessage}
        subtitle={
          isAr
            ? "اكتب طلبك القانوني باختصار. نرد خلال يوم عمل واحد."
            : "Briefly describe your legal matter. We reply within one business day."
        }
      />

      <ContactOfficeSection
        isArabic={isAr}
        title={isAr ? "بيانات المكتب" : "Office details"}
        details={details}
      />

      <section>
        <iframe
          title={isAr ? "خريطة المكتب" : "Office map"}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.684205591655!2d55.27354838885498!3d25.213870100000015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f434f5fdaba03%3A0x37097f69d9d98181!2sAlmahy%20Legal%20Services!5e0!3m2!1sen!2sae!4v1771139862934!5m2!1sen!2sae"
          width="100%"
          height="360"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[250px] w-full sm:h-[320px] md:h-[380px]"
        />
      </section>
    </div>
  );
}
