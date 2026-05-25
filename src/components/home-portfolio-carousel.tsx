"use client";

import { useEffect, useState } from "react";
import SmartImage from "./smart-image";

type PortfolioItem = {
  link: string;
  imagePreview: string;
  brandName: string;
  category: string;
};

interface HomePortfolioCarouselProps {
  items: PortfolioItem[];
}

const CARD_WIDTH = 520;
const CARD_OFFSET = 285;
const VISIBLE_RANGE = 5;

const getCardScale = (distance: number) => {
  if (distance === 0) return 1.08;
  if (distance === 1) return 0.92;
  if (distance === 2) return 0.76;
  if (distance === 3) return 0.62;

  return 0.5;
};

export const HomePortfolioCarousel = ({
  items,
}: HomePortfolioCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(items.length);
  const [withTransition, setWithTransition] = useState(true);
  const loopedItems = [...items, ...items, ...items];
  const visibleIndex = items.length === 0 ? 0 : activeIndex % items.length;

  useEffect(() => {
    if (items.length === 0) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => current + 1);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [items.length]);

  if (items.length === 0) return null;

  const handleTransitionEnd = () => {
    if (activeIndex < items.length * 2) return;

    setWithTransition(false);
    setActiveIndex(items.length);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setWithTransition(true);
      });
    });
  };

  return (
    <div className="relative h-[48vh] min-h-[360px] w-screen overflow-hidden pb-8">
      <div className="relative h-full" onTransitionEnd={handleTransitionEnd}>
        {loopedItems.map((item, index) => {
          const position = index - activeIndex;
          const distance = Math.abs(position);
          const isActive = position === 0;
          const isVisible = distance <= VISIBLE_RANGE;

          return (
            <a
              key={`${item.link}-${index}`}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${item.brandName} project`}
              className={`absolute bottom-8 left-1/2 block overflow-hidden rounded-main border border-mainColor/10 bg-white shadow-mainShadow dark:border-mainColor/20 dark:bg-secondaryDark ${
                withTransition
                  ? "transition-[filter,opacity,transform] duration-700 ease-out"
                  : ""
              } ${
                isActive
                  ? "grayscale-0 opacity-100"
                  : "grayscale opacity-150"
              } ${
                isVisible
                  ? "pointer-events-auto"
                  : "pointer-events-none opacity-0"
              }`}
              style={{
                width: CARD_WIDTH,
                zIndex: VISIBLE_RANGE + 1 - distance,
                transform: `translateX(calc(-50% + ${
                  position * CARD_OFFSET
                }px)) translateY(${distance * 24}px) scale(${getCardScale(
                  distance,
                )})`,
              }}
            >
              <SmartImage
                src={item.imagePreview}
                alt={item.brandName}
                width={900}
                height={580}
                sizes={`${CARD_WIDTH}px`}
                className="h-auto w-full object-contain"
              />
            </a>
          );
        })}
      </div>
    </div>
  );
};
