'use client';

import Image from 'next/image';
import { HeroSlide } from '@/lib/hero-slides';

interface HeroBackgroundSliderProps {
  slides: HeroSlide[];
  activeIndex: number;
  isRTL: boolean;
}

/** Cap hero LCP image width — full-bleed but not 4K oversized requests. */
const HERO_SIZES = '(max-width: 1920px) 100vw, 1920px';

export default function HeroBackgroundSlider({ slides, activeIndex, isRTL }: HeroBackgroundSliderProps) {
  const safeIndex = activeIndex % slides.length;

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {slides.map((slide, index) => {
        const isActive = index === safeIndex;
        const objectPosition = slide.objectPosition ?? 'center';
        const isLcpCandidate = index === 0;
        const sameAsset = slide.mobile === slide.desktop;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {sameAsset ? (
              <Image
                src={slide.desktop}
                alt=""
                fill
                priority={isLcpCandidate}
                loading={isLcpCandidate ? undefined : 'lazy'}
                sizes={HERO_SIZES}
                className="object-cover"
                style={{ objectPosition: isRTL ? 'center' : objectPosition }}
              />
            ) : (
              <>
                <Image
                  src={slide.mobile}
                  alt=""
                  fill
                  priority={isLcpCandidate}
                  loading={isLcpCandidate ? undefined : 'lazy'}
                  sizes={HERO_SIZES}
                  className="object-cover md:hidden"
                  style={{ objectPosition }}
                />
                <Image
                  src={slide.desktop}
                  alt=""
                  fill
                  loading="lazy"
                  sizes={HERO_SIZES}
                  className="hidden object-cover md:block"
                  style={{ objectPosition: isRTL ? 'center' : objectPosition }}
                />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

interface HeroSlideIndicatorsProps {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  isRTL: boolean;
}

export function HeroSlideIndicators({ count, activeIndex, onSelect, isRTL }: HeroSlideIndicatorsProps) {
  const safeIndex = activeIndex % count;

  return (
    <div
      className={`absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
      role="tablist"
      aria-label={isRTL ? 'شرائح البانر' : 'Hero slides'}
    >
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          aria-selected={index === safeIndex}
          aria-label={`${isRTL ? 'شريحة' : 'Slide'} ${index + 1}`}
          onClick={() => onSelect(index)}
          className={`h-2 rounded-full transition-all duration-300 ${
            index === safeIndex ? 'w-8 bg-[#B38D42]' : 'w-2 bg-white/40 hover:bg-white/70'
          }`}
        />
      ))}
    </div>
  );
}
