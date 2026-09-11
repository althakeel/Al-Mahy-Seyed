import Image from "next/image";

const HERO_IMAGE = "/images/about/team-bg-v6.png";

export default function AboutHeroBackground() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Image
        src={HERO_IMAGE}
        alt=""
        fill
        priority
        sizes="(max-width: 1920px) 100vw, 1920px"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[#160A0A]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#160A0A]/35 via-transparent to-[#160A0A]/10" />
    </div>
  );
}
