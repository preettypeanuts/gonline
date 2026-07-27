"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackArticleClick } from "@/lib/track-click";

type Props = Omit<ComponentProps<typeof Link>, "onClick"> & {
  slug: string;
};

export function TrackedArticleLink({ slug, href, children, ...rest }: Props) {
  return (
    <Link
      href={href}
      {...rest}
      onClick={() => {
        trackArticleClick(slug);
      }}
    >
      {children}
    </Link>
  );
}
