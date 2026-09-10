import { Locale } from '@/lib/translations';
import ContactForm from '@/app/[locale]/contact/ContactForm';

interface ContactFormSectionProps {
  isArabic: boolean;
  lang: Locale;
  title: string;
  subtitle: string;
}

export default function ContactFormSection({ isArabic, lang, title, subtitle }: ContactFormSectionProps) {
  return (
    <section className="bg-[#100B0B] py-10 md:py-12">
      <div className="mx-auto max-w-[1250px] px-4 md:px-8">
        <div className="contact-form-border-wrap mx-auto max-w-3xl">
          <div
            className={`contact-form-border-inner p-6 md:p-8 ${
              isArabic ? 'text-right' : 'text-left'
            }`}
          >
            <h2 className="relative z-[1] text-xl font-bold text-white sm:text-2xl">{title}</h2>
            <p className="relative z-[1] mt-1 text-sm text-white/65">{subtitle}</p>
            <div className="relative z-[1] mt-6">
              <ContactForm lang={lang} variant="dark" hideHeader />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
