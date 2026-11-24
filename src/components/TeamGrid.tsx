type TeamMember = {
  name: string;
  role: string;
  location?: string;
  photo: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Mariam Al Suwaidi",
    role: "Founding Partner, Disputes",
    location: "Dubai",
    photo:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Omar Al Rashid",
    role: "Partner, Corporate",
    location: "Abu Dhabi",
    photo:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Laila Mansour",
    role: "Senior Counsel, Arbitration",
    location: "Dubai",
    photo:
      "https://images.unsplash.com/photo-1544723795-3fb0f9ae6a0d?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Hassan El Sayed",
    role: "Head of Tax & Banking",
    location: "Riyadh",
    photo:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Nour Al Khalifa",
    role: "Senior Associate, IP",
    location: "Doha",
    photo:
      "https://images.unsplash.com/photo-1524504388940-1e1c9b6b1d5d?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "James Carter",
    role: "Client Relations Director",
    location: "London",
    photo:
      "https://images.unsplash.com/photo-1524504388940-1d4c3c40b5a0?auto=format&fit=crop&w=800&q=80",
  },
];

export default function TeamGrid() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-12">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#DE3B34]">Our Team</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">People who guide your matters</h2>
          <p className="max-w-2xl text-sm text-white/70 sm:text-base">
            Meet the multidisciplinary team delivering strategy, advocacy, and client care across arbitration, litigation, corporate, and private client matters.
          </p>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 shadow-sm shadow-black/20">
          24/7 client response desk
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_18px_45px_-22px_rgba(0,0,0,0.8)] backdrop-blur"
          >
            <div className="relative h-52 w-full overflow-hidden bg-[#0f1628]">
              <img
                src={member.photo}
                alt={member.name}
                className="h-full w-full object-cover transition duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              {/* <div className="absolute bottom-3 left-3 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/90 ring-1 ring-white/15">
                {member.location ?? "Global"}
              </div> */}
            </div>
            <div className="space-y-1 px-5 py-4">
              <p className="text-lg font-semibold text-white leading-snug">{member.name}</p>
              {/* <p className="text-sm text-white/70 leading-relaxed">{member.role}</p> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
