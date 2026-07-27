"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent, ReactNode } from "react";
import { trackActivityClick } from "@/lib/track-click";

type Props = Omit<ComponentProps<typeof Link>, "onClick" | "children"> & {
  activityId: string;
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

/** Outbound CTA for CMS activities — increments click before navigation. */
export function TrackedActivityLink({
  activityId,
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
        trackActivityClick(activityId);
        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
}
