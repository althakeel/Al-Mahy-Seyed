"use client";

import Image from "next/image";
import Link from "next/link";
import { TeamMemberCard } from "@/data/team";

type TeamMosaicProps = {
  members: TeamMemberCard[];
  locale: "en" | "ar";
};

const GRID_COLS_LG = 4;

function TeamCard({
  member,
  locale,
  isRTL,
  className = "",
}: {
  member: TeamMemberCard;
  locale: "en" | "ar";
  isRTL: boolean;
  className?: string;
}) {
  const name = isRTL ? member.nameAr : member.nameEn;
  const role = isRTL ? member.roleAr : member.roleEn;
  const label = name || (isRTL ? "قريباً" : "Coming soon");

  const cardClassName = `group block overflow-hidden rounded-[18px] border border-[#B38D42]/15 bg-white shadow-[0_10px_28px_rgba(20,15,7,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#B38D42]/40 hover:shadow-[0_18px_40px_rgba(20,15,7,0.10)] ${className}`;

  const body = (
    <>
      <div className="relative aspect-[4/5] overflow-hidden bg-[#eeeae6]">
        <Image
          src={member.image}
          alt={label}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-top transition duration-700 group-hover:scale-[1.04]"
          priority={member.featured}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#B38D42] transition-transform duration-300 group-hover:scale-x-100" />
      </div>
      <div className={`px-4 py-4 ${isRTL ? "text-right" : "text-left"}`}>
        {name ? (
          <>
            <h4
              className={`text-[15px] font-semibold leading-snug text-[#160A0A] transition-colors group-hover:text-[#9A7635] ${
                !isRTL ? "uppercase tracking-[0.04em]" : ""
              }`}
            >
              {name}
            </h4>
            {role ? (
              <p className="mt-1 text-xs font-medium tracking-wide text-[#B38D42]">{role}</p>
            ) : null}
          </>
        ) : (
          <p className="text-sm font-medium text-[#160A0A]/40">{label}</p>
        )}
      </div>
    </>
  );

  if (member.slug && !member.pending) {
    return (
      <Link
        href={`/${locale}/about/team/${member.slug}`}
        className={`${cardClassName} cursor-pointer`}
        aria-label={name ? `${name} — ${role}` : label}
      >
        {body}
      </Link>
    );
  }

  return (
    <div className={cardClassName} aria-label={label}>
      {body}
    </div>
  );
}

export default function TeamMosaic({ members, locale }: TeamMosaicProps) {
  const isRTL = locale === "ar";
  const remainder = members.length % GRID_COLS_LG;
  const splitIndex = remainder === 0 ? members.length : members.length - remainder;
  const primaryMembers = members.slice(0, splitIndex);
  const trailingMembers = members.slice(splitIndex);

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {primaryMembers.map((member) => (
          <TeamCard key={`${member.order}-${member.slug ?? "pending"}`} member={member} locale={locale} isRTL={isRTL} />
        ))}
      </div>

      {trailingMembers.length > 0 ? (
        <div className="mt-4 flex flex-wrap justify-center gap-4 sm:gap-5 lg:mt-5">
          {trailingMembers.map((member) => (
            <TeamCard
              key={`${member.order}-${member.slug ?? "pending"}`}
              member={member}
              locale={locale}
              isRTL={isRTL}
              className="w-full max-w-[280px] sm:w-[calc(50%-10px)] md:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)] lg:max-w-none"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
