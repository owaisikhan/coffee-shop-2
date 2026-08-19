"use client";

import { useEffect, useRef } from "react";

// A muted, looping, decorative video that only fetches and plays once it is
// near the viewport, and pauses again when it leaves. The section videos are
// the heaviest assets on the page, so `preload="none"` plus a poster keeps
// them off the wire entirely for anyone who never scrolls that far, instead
// of every visitor paying for them on load.
//
// Honours prefers-reduced-motion: those visitors keep the poster frame and
// the video is never started.
export function AmbientVideo({
  src,
  poster,
  className,
  style,
}: {
  src: string;
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      // Start a little before it scrolls in so it isn't visibly frozen on arrival.
      { threshold: 0.15, rootMargin: "200px 0px" }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      src={src}
      className={className}
      style={style}
    />
  );
}
