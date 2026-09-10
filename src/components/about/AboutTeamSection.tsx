import { Locale } from '@/lib/translations';
import { TeamMemberCard } from '@/data/team';
import TeamMosaic from '@/components/TeamMosaic';

interface AboutTeamSectionProps {
  locale: Locale;
  eyebrow: string;
  title: string;
  subtitle: string;
  members: TeamMemberCard[];
}

export default function AboutTeamSection({
  locale,
  eyebrow,
  title,
  subtitle,
  members,
}: AboutTeamSectionProps) {
  const isArabic = locale === 'ar';

  return (
    <section className="border-t border-[#B38D42]/10 bg-[#F1EFF0] py-10 md:py-12">
      <div className="mx-auto max-w-[1250px] px-4 md:px-8">
        <div className={`mx-auto mb-8 max-w-2xl text-center md:mb-10 ${isArabic ? 'text-right md:text-center' : ''}`}>
          <div className={`mb-4 flex items-center justify-center gap-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
            <span className="h-px w-8 bg-[#B38D42]" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B38D42]">{eyebrow}</p>
            <span className="h-px w-8 bg-[#B38D42]" aria-hidden="true" />
          </div>
          <h2
            className="text-3xl font-bold text-[#160A0A] md:text-4xl lg:text-[2.75rem]"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {title}
          </h2>
          <p className="mt-4 text-base leading-7 text-[#160A0A]/65 md:text-[17px]">{subtitle}</p>
        </div>

        <TeamMosaic members={members} locale={locale} />
      </div>
    </section>
  );
}
