import type { Metadata } from "next";

type Milestone = {
  year: string;
  label: string;
  title: string;
  body: string;
  side: "left" | "right";
};

const milestones: Milestone[] = [
  {
    year: "1987",
    label: "May 1987",
    title: "1987 – 1999: Establishing Our Roots in Egypt",
    body:
      "Founded in 1987 in Egypt, Almahy for Legal Services began with a commitment to high-quality counsel for individuals and businesses. Our early focus on personal legal matters built a reputation for integrity, strategic advocacy, and favorable outcomes, laying the foundation for future growth and cross-border work.",
    side: "left",
  },
  {
    year: "2000",
    label: "June 2000",
    title: "2000 – 2007: Expansion into the UAE and Regional Growth",
    body:
      "Entering the UAE in the early 2000s, we broadened our practice to real estate, commercial disputes, and corporate law. Almahy became a trusted advisor for international clients expanding into the UAE and Middle East, guiding cross-border transactions and joint ventures while solidifying a regional network.",
    side: "right",
  },
  {
    year: "2008",
    label: "July 2008",
    title: "2008 – 2015: Strengthening Global Reach and Technological Integration",
    body:
      "We partnered with international firms and embraced legal tech to streamline operations and enhance client service. Expansion into IP, international arbitration, and labor matters enabled support for multinational corporations facing complex, multi-jurisdictional needs across global markets.",
    side: "left",
  },
  {
    year: "2016",
    label: "August 2016",
    title: "2016 – 2020: Embracing Innovation and Expanding Services",
    body:
      "Almahy deepened its focus on corporate governance, M&A, and international tax, introducing AI and legal tech for research, document review, and case management. Engagement in environmental law and data protection grew as we served corporations, governments, and high-net-worth clients worldwide.",
    side: "right",
  },
  {
    year: "2020",
    label: "June 2020",
    title: "2020 – Present: Continued Excellence and Global Impact",
    body:
      "Today we deliver tailored strategies across the Gulf, Africa, and Europe. Our cross-border counsel blends local insight with global reach across arbitration, IP, corporate law, and investments earning trust from multinationals and individuals navigating complex legal challenges at scale.",
    side: "left",
  },
];

export const metadata: Metadata = {
  title: "Our History | Almahy Legal Services",
  description:
    "Explore Almahy Legal Services' history from founding roots to regional expansion, innovation, and global impact across disputes and corporate matters.",
};

function TimelineDot({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3 text-center text-xs font-semibold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-[#b17945]">
      <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white shadow-[0_16px_36px_-20px_rgba(0,0,0,0.45)] ring-1 ring-[#e7d7c5]">
        <span className="text-base sm:text-lg">★</span>
      </div>
      <span className="text-[10px] sm:text-[11px]">{label}</span>
    </div>
  );
}

function MilestoneCard({ item }: { item: Milestone }) {
  const isLeft = item.side === "left";

  return (
    <div className="relative grid grid-cols-1 items-start gap-4 lg:gap-8 lg:grid-cols-[1fr_auto_1fr]">
      {isLeft ? <CardContent item={item} align="right" /> : <div className="hidden lg:block" aria-hidden />}

      <div className="relative flex flex-col items-center gap-2 lg:gap-3">
        <span className="pointer-events-none select-none text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f1e7dc] lg:-translate-y-4">{item.year}</span>
        <div className="relative z-10">
          <TimelineDot label={item.label} />
        </div>
        <div className="h-full w-px bg-gradient-to-b from-[#b17945]/60 via-[#b17945]/24 to-transparent" aria-hidden />
      </div>

      {!isLeft ? <CardContent item={item} align="left" /> : <div className="hidden lg:block" aria-hidden />}
    </div>
  );
}

function CardContent({ item, align = "left" }: { item: Milestone; align?: "left" | "right" }) {
  return (
    <div className={`relative rounded-2xl border border-[#e7d7c5] bg-white px-4 py-5 sm:px-6 sm:py-6 shadow-[0_26px_70px_-32px_rgba(0,0,0,0.55)] ${align === "left" ? "lg:ml-8" : "lg:mr-8"}`}>
      <div className="flex items-center gap-2 sm:gap-3 text-sm font-semibold text-[#b17945]">
        <span className="text-xs sm:text-sm lg:text-base uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#2f3341]">{item.label}</span>
        <span className="h-px flex-1 bg-[#b17945]/40" aria-hidden />
      </div>
      <div className="mt-2 sm:mt-3">
        <h3 className="text-lg sm:text-xl font-semibold text-[#1b1c21] leading-tight">{item.title}</h3>
        <p className="mt-2 sm:mt-3 text-sm leading-relaxed text-[#2f3341]">{item.body}</p>
      </div>
    </div>
  );
}

export function OurHistoryPage() {
  return (
    <div className="bg-white text-[#1b1c21]">
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 opacity-80" aria-hidden>
          <div className="absolute left-10 top-6 h-36 w-36 rounded-full bg-[#a46f3c]/18 blur-3xl" />
          <div className="absolute right-14 top-10 h-44 w-44 rounded-full bg-[#f1e7dc]/70 blur-3xl" />
          <div className="absolute left-1/2 bottom-[-120px] h-72 w-72 -translate-x-1/2 rounded-full bg-[#a46f3c]/12 blur-3xl" />
        </div>

        <section className="relative mx-auto max-w-5xl px-4 sm:px-6 pb-10 sm:pb-12 pt-12 sm:pt-16 text-center sm:px-10 lg:px-12">
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] sm:tracking-[0.24em] text-[#b17945]">
            <span className="h-px w-6 sm:w-8 bg-[#b17945]/50" />
            History of Almahy
            <span className="h-px w-6 sm:w-8 bg-[#b17945]/50" />
          </div>
          <h1 className="mt-3 sm:mt-4 text-2xl sm:text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl lg:leading-[1.05]">
            We have a great history to start our company.
          </h1>
          <p className="mx-auto mt-2 sm:mt-3 max-w-3xl text-sm sm:text-base text-[#2f3341]">
            A timeline of growth from founding roots to regional expansion, innovation, and global impact.
          </p>
        </section>
      </div>

      <section className="relative mx-auto flex max-w-6xl flex-col gap-8 sm:gap-10 lg:gap-12 px-4 sm:px-6 pb-16 sm:pb-20 sm:px-10 lg:px-12">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-[#b17945]/50 via-[#b17945]/25 to-transparent lg:block" aria-hidden />
        {milestones.map((item) => (
          <MilestoneCard key={item.title} item={item} />
        ))}
      </section>
    </div>
  );
}

export default OurHistoryPage;
