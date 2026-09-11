import Image from 'next/image';

function MissionIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4V2M12 22v-2M4 12H2M22 12h-2" />
    </svg>
  );
}

function VisionIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

interface AboutMissionVisionSectionProps {
  isArabic: boolean;
  missionTitle: string;
  missionDesc: string;
  visionTitle: string;
  visionDesc: string;
  imageAlt: string;
}

export default function AboutMissionVisionSection({
  isArabic,
  missionTitle,
  missionDesc,
  visionTitle,
  visionDesc,
  imageAlt,
}: AboutMissionVisionSectionProps) {
  const blocks = [
    { title: missionTitle, desc: missionDesc, icon: <MissionIcon /> },
    { title: visionTitle, desc: visionDesc, icon: <VisionIcon /> },
  ];

  return (
    <section className="group relative overflow-hidden bg-[#100B0B]">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/about/about-mission.png"
          alt=""
          fill
          className="object-cover object-center opacity-[0.58] transition duration-700 ease-out group-hover:scale-[1.06]"
          sizes="(max-width: 1920px) 100vw, 1920px"
        />
        <div className="absolute inset-0 bg-[#100B0B]/32" />
        <div
          className={`absolute inset-0 ${
            isArabic ? 'bg-gradient-to-l' : 'bg-gradient-to-r'
          } from-[#100B0B]/40 via-[#100B0B]/12 to-[#100B0B]/22`}
        />
      </div>

      <span className="sr-only">{imageAlt}</span>

      <div className="relative z-10 mx-auto flex min-h-[420px] max-w-[1250px] items-center px-4 py-16 md:min-h-[500px] md:px-8 md:py-20 lg:min-h-[560px] lg:py-24">
        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {blocks.map((block) => (
            <article
              key={block.title}
              className={`rounded-[22px] border border-white/20 bg-white/[0.10] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl md:p-8 ${
                isArabic ? 'text-right' : 'text-left'
              }`}
            >
              <div
                dir={isArabic ? 'ltr' : undefined}
                className={`mb-4 flex items-center gap-4 ${isArabic ? 'flex-row-reverse justify-start' : ''}`}
              >
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#B38D42]/55 bg-[#B38D42]/18 text-[#B38D42]">
                  {block.icon}
                </span>
                <h3 className="text-2xl font-bold text-white md:text-[1.65rem]">{block.title}</h3>
              </div>
              <p className="text-base leading-8 text-white/80 md:text-[17px]">{block.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
