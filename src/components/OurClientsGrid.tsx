import Image from "next/image";
import { newClientLogos } from "../assets/logos/new-client-logos";

const existingClientLogos = [
  "040031_4e4c054a279d43dbbb2e32def9e72924mv2-768x274.png",
  "1.png",
  "1613050665_logo.png",
  "1685008699800.png",
  "Asset-1-3-1-768x286.png",
  "ax-768x280.png",
  "BHM-capital-Logo-768x232.png",
  "Bonyan-Holding-Logo-sq-01-e1623654456180.png",
  "cropped-respect-services-logo-3.png",
  "da4hrg7jK2jcFpBjt6JYw5XMcWlBW9bMwfWf8mPx.png",
  "download-1.png",
  "download.png",
  "dsi-logo-dark-2020.png",
  "f8160898-1de9-4e45-8a47-6c3d54f86a3e_16x9_1200x676-768x432.png",
  "IMG-20241120-WA0060.png",
  "IMG-20241120-WA0067.png",
  "IMG-20241120-WA0075 (1).png",
  "IMG-20241120-WA0077 (1).png",
  "IMG-20241120-WA0078 (1).png",
  "IMG-20241121-WA0000 (1).png",
  "jointscopetechnologies_logo (1).png",
  "logo-1.png",
  "logo-2-768x146 (1).png",
  "logo-400-px.png",
  "Mansory-logo-1600x400-1-768x192.png",
  "Masha-Text-horizontal-logo-768x179.png",
  "Novo-Nordisk-Logo-768x480.png",
  "PGI-Group-Logo-01-1-768x630.png",
  "R.png",
  "Schneider-Electric-768x388.png",
  "tabarak_logo_03.png",
  "Tadbery-150-x-60-px.png",
  "the-ONE-Clinic-logo-768x463.png",
  "white_logo_transparent_background-2048x1229-1-768x461.png",
];

const clientLogos = [
  ...existingClientLogos.map((logo) => ({
    src: `/assets/logos/${logo}`,
    alt: logo.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
  })),
  ...newClientLogos,
];

export default function OurClientsGrid() {
  return (
    <section
      id="our-clients"
      aria-labelledby="our-clients-heading"
      className="bg-[#F7F5F1] py-14 md:py-20"
    >
      <div className="mx-auto max-w-[1250px] px-4 md:px-8">
        <header className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#B38D42]">
            OUR CLIENTS
          </p>
          <h2
            id="our-clients-heading"
            className="mt-3 text-2xl font-bold leading-tight text-[#160A0A] sm:text-3xl"
          >
            Trusted by Leading Organizations
          </h2>
        </header>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-5 lg:mt-10 lg:grid-cols-6" dir="ltr">
          {clientLogos.map(({ src, alt }) => (
            <li
              key={typeof src === "string" ? src : src.src}
              className="flex aspect-[5/3] items-center justify-center border border-[#160A0A]/[0.08] bg-white p-4 sm:p-5"
            >
              <Image
                src={src}
                alt={alt}
                width={220}
                height={120}
                sizes="(max-width: 639px) 45vw, (max-width: 767px) 30vw, (max-width: 1023px) 22vw, 16vw"
                className="h-full max-h-[76px] w-full object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}