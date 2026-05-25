"use client";

import { Children, type ReactNode, useEffect, useRef } from "react";

export const revealClassName =
  "opacity-0 translate-y-6 transition-[opacity,transform] duration-700 ease-out data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100";

export const useViewportStaging = <T extends HTMLElement>(
  selector = "[data-stage]",
) => {
  const rootRef = useRef<T>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const revealItems = Array.from(
      root.querySelectorAll<HTMLElement>(selector),
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealItems.forEach((item) => {
        item.dataset.visible = "true";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const target = entry.target as HTMLElement;
          target.dataset.visible = "true";
          observer.unobserve(target);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.16,
      },
    );

    revealItems.forEach((item) => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [selector]);

  return rootRef;
};

interface ViewportRevealGroupProps {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  baseDelay?: number;
  delayStep?: number;
}

export const ViewportRevealGroup = ({
  children,
  className = "",
  itemClassName = "",
  baseDelay = 0,
  delayStep = 90,
}: ViewportRevealGroupProps) => {
  const groupRef = useViewportStaging<HTMLDivElement>();

  return (
    <div ref={groupRef} className={className}>
      {Children.map(children, (child, index) => (
        <div
          data-stage
          className={`${revealClassName} ${itemClassName}`}
          style={{
            transitionDelay: `${Math.min(baseDelay + index * delayStep, 420)}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

interface ViewportRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const ViewportReveal = ({
  children,
  className = "",
  delay = 0,
}: ViewportRevealProps) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      item.dataset.visible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        item.dataset.visible = "true";
        observer.disconnect();
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.16,
      },
    );

    observer.observe(item);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={itemRef}
      className={`${revealClassName} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
