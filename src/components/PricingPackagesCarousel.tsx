'use client';

import InclusionMark from '@/components/corporate-services/InclusionMark';
import { CSSProperties, useEffect, useRef, useState } from 'react';

type CaseItem = {
  title: string;
  description: string;
};

type PaymentItem = {
  collection: string;
  finalPayment: string;
  advancePayment: string;
};

type PackagePlan = {
  rightTitle: string;
  rightSubtitle: string;
  headerGradient: string;
  paymentItems: PaymentItem[];
  note: string;
};

type ColumnHeader = {
  title: string;
  price?: string;
  contract?: string;
};

type PricingPackagesCarouselProps = {
  caseTypeLabel: string;
  colCollection: string;
  colFinal: string;
  colAdvance: string;
  caseItems: CaseItem[];
  packages: PackagePlan[];
  isArabic: boolean;
  maxWidthClassName?: string;
  noteRowIndex?: number | false;
  inclusionMode?: boolean;
  packageColumns?: [ColumnHeader, ColumnHeader, ColumnHeader];
};

export default function PricingPackagesCarousel({
  caseTypeLabel,
  colCollection,
  colFinal,
  colAdvance,
  caseItems,
  packages,
  isArabic,
  maxWidthClassName,
  noteRowIndex = 1,
  inclusionMode = false,
  packageColumns,
}: PricingPackagesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stageHeight, setStageHeight] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredRowKey, setHoveredRowKey] = useState<string | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dragStartXRef = useRef<number | null>(null);
  const whatsappPhone = (process.env.NEXT_PUBLIC_WHATSAPP_CHAT_NUMBER || '971504096028').replace(/[^\d]/g, '');

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + packages.length) % packages.length);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % packages.length);
  };

  const prevIndex = (currentIndex - 1 + packages.length) % packages.length;
  const nextIndex = (currentIndex + 1) % packages.length;

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (packages.length <= 1) return;
    event.preventDefault();
    dragStartXRef.current = event.clientX;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const finishDrag = (clientX: number) => {
    if (dragStartXRef.current === null) return;

    const deltaX = clientX - dragStartXRef.current;
    const swipeThreshold = 50;

    if (deltaX <= -swipeThreshold) {
      goNext();
    } else if (deltaX >= swipeThreshold) {
      goPrev();
    }

    dragStartXRef.current = null;
    setIsDragging(false);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    finishDrag(event.clientX);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handlePointerCancel = () => {
    dragStartXRef.current = null;
    setIsDragging(false);
  };

  const handleWhatsAppEnquiry = (
    event: React.MouseEvent<HTMLButtonElement>,
    caseTitle: string,
    caseDescription: string,
    packageTitle: string,
  ) => {
    event.stopPropagation();
    const cleanDescription = caseDescription
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join('\n');

    const message = isArabic
      ? `مرحباً، أرغب في الاستفسار عن هذه الخدمة.\n\nالباقة: ${packageTitle}\nالخدمة: ${caseTitle}\nالتفاصيل:\n${cleanDescription}`
      : `Hello, I would like to enquire about this service.\n\nPackage: ${packageTitle}\nService: ${caseTitle}\nDetails:\n${cleanDescription}`;
    const url = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
    const scopedWindow = window as Window & { dataLayer?: Record<string, unknown>[] };
    if (!Array.isArray(scopedWindow.dataLayer)) {
      scopedWindow.dataLayer = [];
    }
    scopedWindow.dataLayer.push({
      event: 'whatsapp_click',
      whatsapp_url: url,
      link_text: isArabic ? 'استفسار واتساب' : 'WhatsApp enquiry',
      page_path: window.location.pathname,
      source: 'pricing_packages_carousel',
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const updateStageHeight = () => {
      const activeCard = cardRefs.current[currentIndex];
      if (activeCard) {
        setStageHeight(activeCard.offsetHeight);
      }
    };

    updateStageHeight();
    const delayedMeasure = window.setTimeout(updateStageHeight, 320);
    window.addEventListener('resize', updateStageHeight);

    return () => {
      window.clearTimeout(delayedMeasure);
      window.removeEventListener('resize', updateStageHeight);
    };
  }, [currentIndex, packages.length, hoveredRowKey]);

  const getRelativePosition = (index: number) => {
    let diff = index - currentIndex;
    const total = packages.length;

    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    return diff;
  };

  const getSlideStyle = (relativePosition: number): CSSProperties => {
    if (relativePosition === 0) {
      return {
        transform: 'translateX(0%) scale(1) rotateY(0deg)',
        opacity: 1,
        zIndex: 30,
        pointerEvents: 'auto',
      };
    }

    if (relativePosition === -1) {
      return {
        transform: 'translateX(-38%) scale(0.88) rotateY(24deg)',
        opacity: 0.28,
        zIndex: 20,
        pointerEvents: 'auto',
      };
    }

    if (relativePosition === 1) {
      return {
        transform: 'translateX(38%) scale(0.88) rotateY(-24deg)',
        opacity: 0.28,
        zIndex: 20,
        pointerEvents: 'auto',
      };
    }

    return {
      transform: relativePosition < 0 ? 'translateX(-72%) scale(0.76) rotateY(32deg)' : 'translateX(72%) scale(0.76) rotateY(-32deg)',
      opacity: 0,
      zIndex: 10,
      pointerEvents: 'none',
    };
  };

  const renderDescription = (description: string) => {
    const lines = description.split('\n').map((line) => line.trim()).filter((line) => line.length > 0);

    return (
      <div className="mt-1 text-[13px] leading-7 text-white/75">
        {lines.map((line, lineIndex) => {
          if (line.startsWith('•')) {
            return (
              <div key={`${line}-${lineIndex}`} className="ms-5 list-item list-disc">
                {line.replace(/^•\s*/, '')}
              </div>
            );
          }

          return <div key={`${line}-${lineIndex}`}>{line}</div>;
        })}
      </div>
    );
  };

  const renderPaymentValue = (value: string) => {
    const normalized = value.trim().toLowerCase();
    const isIncluded = normalized === 'included' || normalized === 'مشمول';

    if (inclusionMode) {
      return <InclusionMark included={isIncluded} />;
    }

    if (isIncluded) {
      return <InclusionMark included />;
    }

    return <span className="text-white/90">{value}</span>;
  };

  const getPaymentForRow = (index: number, paymentItems: PaymentItem[]) => {
    if (noteRowIndex === false) {
      return paymentItems[index] ?? { collection: '', finalPayment: '', advancePayment: '' };
    }

    if (index === noteRowIndex) {
      return null;
    }

    const paymentIndex = index < noteRowIndex ? index : index - 1;
    return paymentItems[paymentIndex] ?? { collection: '', finalPayment: '', advancePayment: '' };
  };

  const renderColumnHeader = (column: ColumnHeader) => (
    <div className="flex h-full min-h-14 flex-col items-center justify-center px-1 py-2">
      <div>{column.title}</div>
      {column.price ? <div className="mt-1 text-[10px] font-bold normal-case tracking-normal text-[#B38D42]">{column.price}</div> : null}
      {column.contract ? <div className="text-[9px] font-medium normal-case tracking-normal text-white/55">{column.contract}</div> : null}
    </div>
  );

  const resolvedColumns: [ColumnHeader, ColumnHeader, ColumnHeader] = packageColumns ?? [
    { title: colCollection },
    { title: colFinal },
    { title: colAdvance },
  ];

  const renderPackageCard = (pkg: PackagePlan, packageIndex: number) => {
    const tableRows = caseItems.map((item, index) => ({
      item,
      index,
      payment: getPaymentForRow(index, pkg.paymentItems),
    }));

    return (
      <section
        key={`${pkg.rightTitle}-${packageIndex}`}
        dir={isArabic ? 'rtl' : 'ltr'}
        className="rounded-[20px] bg-[#B38D42]/55 p-px text-white shadow-[0_16px_48px_rgba(4,8,12,0.55)]"
      >
        <div className="overflow-hidden rounded-[19px] bg-[#160A0A]">
          <div
            className="relative overflow-hidden border-b border-[#B38D42]/45 px-5 py-5 text-center text-white"
            style={{ backgroundImage: pkg.headerGradient }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0)_100%)]"
            />
            <div aria-hidden="true" className="gold-reflection pointer-events-none absolute inset-y-0 -left-1/4 w-1/4" />
            <p className="text-[20px] font-extrabold uppercase tracking-[0.08em]">{pkg.rightTitle}</p>
            <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-white/95">{pkg.rightSubtitle}</p>
          </div>

          <div className="overflow-x-auto lg:overflow-visible">
            <div className="min-w-[640px] lg:min-w-0">
              <div className="grid gap-0 lg:grid-cols-[1.65fr_1.35fr]">
              <div className="border-b border-[#B38D42]/40 bg-[#100B0B] px-5 py-4 text-center text-sm font-extrabold uppercase tracking-[0.12em] text-[#B38D42] lg:border-e lg:border-[#B38D42]/40">
                {caseTypeLabel}
              </div>
              <div className="grid grid-cols-3 border-b border-[#B38D42]/40 bg-[#100B0B]/80 text-center text-[11px] font-bold uppercase tracking-[0.08em] text-white/90">
                <div className="border-e border-[#B38D42]/35">{renderColumnHeader(resolvedColumns[0])}</div>
                <div className="border-e border-[#B38D42]/35">{renderColumnHeader(resolvedColumns[1])}</div>
                <div>{renderColumnHeader(resolvedColumns[2])}</div>
              </div>

              {tableRows.map(({ item, index, payment }) => (
                <div key={item.title} className="contents">
                  <div
                    className="group/case border-t border-[#B38D42]/35 bg-[#160A0A] px-4 py-3.5 text-white/95 odd:bg-[#100B0B]/55 lg:border-e lg:border-[#B38D42]/35"
                    onMouseEnter={() => setHoveredRowKey(`${item.title}-${index}`)}
                    onMouseLeave={() => setHoveredRowKey(null)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-[16px] font-bold leading-6 text-white md:text-[17px]">{item.title}:</h3>
                      {!inclusionMode ? (
                        <button
                          type="button"
                          onClick={(event) => handleWhatsAppEnquiry(event, item.title, item.description, pkg.rightTitle)}
                          onPointerDown={(event) => event.stopPropagation()}
                          aria-label={isArabic ? `استفسار واتساب عن ${item.title}` : `WhatsApp enquiry about ${item.title}`}
                          className="inline-flex shrink-0 items-center gap-1.5 rounded px-0 py-0 text-[11px] font-semibold tracking-[0.02em] text-[#B38D42]/85 transition hover:text-[#B38D42] md:opacity-0 md:group-hover/case:opacity-100"
                        >
                          <span>{isArabic ? 'اطلب استشارة' : 'Request Consultation'}</span>
                          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3.5 10 8l-5 4.5" />
                          </svg>
                        </button>
                      ) : null}
                    </div>
                    {!inclusionMode ? (
                      <div className="md:max-h-0 md:overflow-hidden md:opacity-0 md:transition-all md:duration-300 md:group-hover/case:mt-1 md:group-hover/case:max-h-[40rem] md:group-hover/case:opacity-100">
                        {renderDescription(item.description)}
                      </div>
                    ) : null}
                  </div>
                  {noteRowIndex !== false && index === noteRowIndex ? (
                    <div className="flex min-h-16 items-center justify-center border-t border-[#B38D42]/35 bg-[#100B0B]/40 px-4 py-3 text-center text-[11px] font-semibold leading-5 text-white/85">
                      {pkg.note}
                    </div>
                  ) : payment ? (
                    <div className="grid grid-cols-3 border-t border-[#B38D42]/35 bg-[#160A0A] text-center text-[12px] font-semibold text-white/90 even:bg-[#100B0B]/35">
                      <div className="flex min-h-12 items-center justify-center border-e border-[#B38D42]/35 px-2 py-2">{renderPaymentValue(payment.collection)}</div>
                      <div className="flex min-h-12 items-center justify-center border-e border-[#B38D42]/35 px-2 py-2">{renderPaymentValue(payment.finalPayment)}</div>
                      <div className="flex min-h-12 items-center justify-center px-2 py-2">{renderPaymentValue(payment.advancePayment)}</div>
                    </div>
                  ) : null}
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const resolvedMaxWidthClassName = maxWidthClassName || 'max-w-[1160px]';

  if (packages.length === 1) {
    return (
      <div className={`mx-auto ${resolvedMaxWidthClassName}`}>
        {renderPackageCard(packages[0], 0)}
      </div>
    );
  }

  return (
    <div className={`mx-auto ${resolvedMaxWidthClassName} space-y-5`}>
      {packages.length > 1 && (
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2 text-white/75">
            <button
              type="button"
              onClick={goPrev}
              onPointerDown={(event) => event.stopPropagation()}
              aria-label={isArabic ? 'الشريحة السابقة' : 'Previous slide'}
              className="cursor-pointer rounded-full border border-[#B38D42]/55 bg-[#160A0A]/90 p-2 text-[#B38D42] shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition hover:border-[#B38D42]/75 hover:bg-[#B38D42]/10"
            >
              <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12.5 4.5 7 10l5.5 5.5" />
              </svg>
            </button>
            <span className="hidden text-[11px] font-semibold uppercase tracking-[0.06em] sm:inline">
              {isArabic ? `السابق: ${packages[prevIndex]?.rightTitle}` : `Prev: ${packages[prevIndex]?.rightTitle}`}
            </span>
          </div>

          <div className="flex items-center gap-2 text-white/75">
            <span className="hidden text-[11px] font-semibold uppercase tracking-[0.06em] sm:inline">
              {isArabic ? `التالي: ${packages[nextIndex]?.rightTitle}` : `Next: ${packages[nextIndex]?.rightTitle}`}
            </span>
            <button
              type="button"
              onClick={goNext}
              onPointerDown={(event) => event.stopPropagation()}
              aria-label={isArabic ? 'الشريحة التالية' : 'Next slide'}
              className="cursor-pointer rounded-full border border-[#B38D42]/55 bg-[#160A0A]/90 p-2 text-[#B38D42] shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition hover:border-[#B38D42]/75 hover:bg-[#B38D42]/10"
            >
              <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m7.5 4.5 5.5 5.5-5.5 5.5" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-hidden py-1">
        <div
          className={`relative select-none px-1 pb-10 sm:px-2 md:px-4 md:pb-12 [perspective:2400px] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{
            height: stageHeight || 320,
            transition: 'height 320ms cubic-bezier(0.2,0.8,0.2,1)',
            touchAction: 'pan-y',
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
          {packages.map((pkg, index) => {
            const relativePosition = getRelativePosition(index);

            return (
              <div
                key={`${pkg.rightTitle}-${index}`}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                onClick={() => {
                  const relativePosition = getRelativePosition(index);

                  if (relativePosition === -1) {
                    goPrev();
                  } else if (relativePosition === 1) {
                    goNext();
                  } else if (index !== currentIndex) {
                    setCurrentIndex(index);
                  }
                }}
                className="absolute inset-x-0 top-0 origin-center transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-transform"
                style={getSlideStyle(relativePosition)}
              >
                {renderPackageCard(pkg, index)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
