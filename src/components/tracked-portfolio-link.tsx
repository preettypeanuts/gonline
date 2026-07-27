"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { isTrackableCmsId, trackPortfolioClick } from "@/lib/track-click";

type Props = Omit<ComponentProps<typeof Link>, "onClick"> & {
  portfolioId?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function TrackedPortfolioLink({
  portfolioId,
  href,
  children,
  onClick,
  ...rest
}: Props) {
  return (
    <Link
      href={href}
      {...rest}
      onClick={(event) => {
        if (portfolioId && isTrackableCmsId(portfolioId)) {
          trackPortfolioClick(portfolioId);
        }
        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
}
