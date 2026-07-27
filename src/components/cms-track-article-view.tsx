"use client";

import { useEffect, useRef } from "react";
import { trackArticleClick } from "@/lib/track-click";

type Props = {
  slug: string;
  /** When false, skip (draft preview). */
  enabled?: boolean;
};

/** Call CMS `/click` once when a published article detail is opened. */
export function CmsTrackArticleView({ slug, enabled = true }: Props) {
  const tracked = useRef(false);

  useEffect(() => {
    if (!enabled || tracked.current || !slug.trim()) return;
    tracked.current = true;
    trackArticleClick(slug);
  }, [slug, enabled]);

  return null;
}
