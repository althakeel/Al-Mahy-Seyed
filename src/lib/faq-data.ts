import { Locale } from '@/lib/translations';

export interface FaqItem {
  question: string;
  answer: string;
}

/** Shared with FAQ.tsx — keep in sync with visible accordion text for schema markup. */
export const homepageFaqData: Record<Locale, FaqItem[]> = {
  en: [
    {
      question: 'Why should I choose Almahy for Legal Services?',
      answer:
        'We combine 38 years of legal expertise with practical solutions, personalized advice, and dedicated client support.',
    },
    {
      question: 'How can I schedule a consultation with your legal team?',
      answer: 'You can book a consultation by phone, email, WhatsApp, or through our website.',
    },
    {
      question: 'Do you assist both individuals and businesses?',
      answer: 'We provide legal services for individuals, startups, SMEs, and large corporations.',
    },
    {
      question: 'Can I receive legal advice without visiting your office?',
      answer: 'We offer legal consultations online, by phone, and through video meetings.',
    },
    {
      question: 'How quickly can I speak with a legal expert?',
      answer: 'We aim to arrange consultations as quickly as possible, often on the same business day.',
    },
    {
      question: 'Do you serve clients outside the UAE?',
      answer: 'We assist international clients with legal matters in the UAE through remote consultations.',
    },
    {
      question: 'What should I prepare before my first legal consultation?',
      answer:
        'Bring any relevant documents and a summary of your legal matter for an effective consultation.',
    },
    {
      question: 'Are your legal consultations confidential?',
      answer: 'All consultations are handled with complete confidentiality and professional discretion.',
    },
    {
      question: 'How do you determine the legal strategy for a new case?',
      answer:
        'We carefully review your case, assess the legal position, and develop a strategy tailored to your objectives.',
    },
    {
      question: 'Can your team communicate in multiple languages?',
      answer: 'Our team assists clients in multiple languages to ensure clear and effective communication.',
    },
  ],
  ar: [
    {
      question: 'لماذا يجب أن أختار المحامy للخدمات القانونية؟',
      answer: 'نجمع بين 38 عامًا من الخبرة القانونية والحلول العملية والإرشاد المخصص ودعم العملاء المتفاني.',
    },
    {
      question: 'كيف يمكنني حجز استشارة مع فريقكم القانوني؟',
      answer: 'يمكنك حجز استشارة عبر الهاتف أو البريد الإلكتروني أو WhatsApp أو من خلال موقعنا.',
    },
    {
      question: 'هل تقدمون المساعدة للأفراد والشركات؟',
      answer: 'نقدم خدمات قانونية للأفراد والشركات الناشئة والشركات الصغيرة والمتوسطة والمؤسسات الكبيرة.',
    },
    {
      question: 'هل يمكنني الحصول على استشارة قانونية دون زيارة مكتبكم؟',
      answer: 'نقدم استشارات قانونية عبر الإنترنت والهاتف ومكالمات الفيديو.',
    },
    {
      question: 'ما مدى سرعة التحدث مع خبير قانوني؟',
      answer: 'نسعى لترتيب الاستشارات في أسرع وقت ممكن، وغالبًا في نفس يوم العمل.',
    },
    {
      question: 'هل تخدمون عملاء من خارج الإمارات؟',
      answer: 'نساعد العملاء الدوليين في المسائل القانونية داخل الإمارات من خلال استشارات عن بُعد.',
    },
    {
      question: 'ماذا يجب أن أجهّز قبل أول استشارة قانونية؟',
      answer: 'يرجى إحضار أي مستندات ذات صلة وملخص لمسألتك القانونية لضمان استشارة فعّالة.',
    },
    {
      question: 'هل الاستشارات القانونية سرية؟',
      answer: 'جميع الاستشارات تتم بسرية تامة وباحترافية مهنية كاملة.',
    },
    {
      question: 'كيف تحددون الاستراتيجية القانونية للقضية الجديدة؟',
      answer: 'نراجع قضيتك بعناية، ونقيّم الموقف القانوني، ونضع استراتيجية مخصصة لأهدافك.',
    },
    {
      question: 'هل يمكن لفريقكم التواصل بعدة لغات؟',
      answer: 'يساعد فريقنا العملاء بعدة لغات لضمان تواصل واضح وفعّال.',
    },
  ],
};
