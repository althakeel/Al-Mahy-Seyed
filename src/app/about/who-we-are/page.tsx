import type { Metadata } from "next";
import TeamGrid from "@/components/TeamGrid";

const pillars = [
  {
    title: "Our Mission",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.6}>
        <path d="M12 3 4 7v6c0 4 3.6 7.6 8 8 4.4-.4 8-4 8-8V7Z" />
        <path d="M12 11v6" />
      </svg>
    ),
    body:
      "Deliver exceptional legal solutions with integrity, professionalism, and a client-centered approach while protecting rights and advancing justice.",
  },
  {
    title: "Our Vision",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.6}>
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
        <circle cx="12" cy="12" r="2.7" />
      </svg>
    ),
    body:
      "Lead regionally in transparent, accessible legal services tailored to clients, grounded in innovation and continuous learning.",
  },
  {
    title: "Our Values",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.6}>
        <path d="M12 3 4 8v4c0 5 4 7.5 8 9 4-1.5 8-4 8-9V8Z" />
        <path d="M9 11.5 11 14l4-5" />
      </svg>
    ),
    body:
      "Integrity, excellence, client-centered advocacy, confidentiality, collaboration, and social responsibility guide every mandate.",
  },
];

const stats = [
  { label: "Case won", value: "97.8%" },
  { label: "Satisfied clients", value: "99.3%" },
  { label: "Lawyers across our platform", value: "52+" },
  { label: "Countries we support", value: "14" },
  { label: "Languages spoken", value: "39+" },
  { label: "Debt collected", value: "164M+" },
];

export const metadata: Metadata = {
  title: "Who We Are | Almahy Legal Services",
  description:
    "Discover Almahy Legal Services: mission, vision, values, global reach, and the team leading arbitration, litigation, and corporate matters.",
};

function WhoWeArePage() {
  return (
    <div className="bg-[#160A0A] text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-60" aria-hidden>
          <div className="absolute left-16 top-10 h-40 w-40 rounded-full bg-[#DE3B34]/25 blur-3xl" />
          <div className="absolute right-10 top-0 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute left-1/2 bottom-[-80px] h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/14 blur-3xl" />
        </div>

        <section className="relative mx-auto max-w-6xl px-6 pb-16 pt-16 sm:px-10 lg:px-12">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#DE3B34]">
            <span className="h-px w-8 bg-[#DE3B34]/60" />
            History of Almahy
            <span className="h-px w-8 bg-[#DE3B34]/60" />
          </div>
          <div className="mt-4 space-y-4 text-center">
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl lg:leading-[1.1]">
              We have a great history to start our company.
            </h1>
            <p className="mx-auto max-w-3xl text-base text-white/75">
              Decades of advocacy, negotiation, and boardroom experience shape how we serve clients across disputes, corporate transactions, and regulatory matters.
            </p>
          </div>
        </section>
      </div>

      <section className="mx-auto max-w-6xl px-6 pb-14 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {pillars.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 px-6 py-7 text-center shadow-[0_18px_45px_-22px_rgba(0,0,0,0.7)] backdrop-blur"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#160A0A] text-[#DE3B34] ring-1 ring-white/12">
                {item.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/75">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-white text-[#1b1c21]">
        <div className="absolute inset-0 opacity-90" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-white/96" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-14 sm:px-10 lg:px-12">
          <div className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#a46f3c]">
            <span className="h-px w-8 bg-[#a46f3c]/60" />
            Our Resources
            <span className="h-px w-8 bg-[#a46f3c]/60" />
          </div>
          <div className="mt-3 text-center">
            <h2 className="text-3xl font-semibold sm:text-4xl">We live & work globally</h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
                <p className="text-3xl font-semibold text-[#a46f3c] sm:text-4xl">{stat.value}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1b1c21]/70">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#0c1323]">
        <div className="absolute inset-0 opacity-70" aria-hidden>
          <div className="absolute left-0 top-0 h-64 w-64 bg-[url('https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=900&q=60')] bg-cover bg-center mix-blend-soft-light" />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14 sm:px-10 lg:px-12 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#DE3B34] ring-1 ring-white/10">
              Thanks for contacting us
            </div>
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
              The lawyers are both experienced and highly skilled.
            </h2>
            <p className="max-w-xl text-sm text-white/75 sm:text-base">
              For 15+ years we have combined courtroom advocacy, negotiation, and cross-border coordination to deliver results our clients trust.
            </p>
            <div className="mt-6 inline-flex flex-col rounded-2xl bg-[#a46f3c] px-6 py-5 text-[#1b1c21] shadow-lg shadow-[#a46f3c]/30 sm:flex-row sm:items-center sm:gap-5">
              <div>
                <p className="text-3xl font-semibold">15+ Years</p>
                <p className="text-sm font-semibold uppercase tracking-[0.14em]">Of Experience</p>
              </div>
              <div className="flex items-center gap-1 text-[#1b1c21]">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span key={idx}>★</span>
                ))}
              </div>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-4 sm:gap-6">
            <div className="col-span-2 overflow-hidden rounded-full border border-white/15 bg-white/5 p-3 shadow-lg shadow-black/30">
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80"
                alt="Senior lawyer"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-full border border-white/15 bg-white/5 p-2 shadow-lg shadow-black/30">
              <img
                src="https://images.unsplash.com/photo-1522252234503-e356532cafd5?auto=format&fit=crop&w=600&q=80"
                alt="Team collaboration"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-full border border-white/15 bg-white/5 p-2 shadow-lg shadow-black/30">
              <img
                src="https://images.unsplash.com/photo-1505664063603-28e48ca204eb?auto=format&fit=crop&w=600&q=80"
                alt="Courtroom"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <TeamGrid />
    </div>
  );
}

export default WhoWeArePage;
