"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function ProductCard({
  name,
  image,
  video,
  action = "Order Now",
  onAction,
  width = 300,
  style,
}: {
  name: string;
  image: string;
  video?: string;
  action?: string;
  onAction?: () => void;
  width?: number;
  style?: React.CSSProperties;
}) {
  const [hover, setHover] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <div style={{ position: "relative", width, ...style }}>
      <div
        style={{
          position: "absolute",
          left: "calc(-1 * var(--offset-frame))",
          top: "calc(-1 * var(--offset-frame))",
          right: "var(--offset-frame)",
          bottom: "var(--offset-frame)",
          background: "var(--espresso-900)",
        }}
      />
      <div style={{ position: "relative", background: "var(--cream-200)" }}>
        <div style={{ padding: "var(--space-3)" }}>
          {video ? (
            // eslint-disable-next-line jsx-a11y/media-has-caption
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="auto"
              poster={image}
              src={video}
              style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover", display: "block" }}
            />
          ) : (
            <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1" }}>
              <Image
                src={image}
                alt={name}
                fill
                sizes="(max-width: 700px) 90vw, 300px"
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
        </div>
        <h3
          style={{
            fontSize: "var(--text-heading-3)",
            textAlign: "center",
            padding: "0 var(--space-4) var(--space-4)",
          }}
        >
          {name}
        </h3>
        <button
          type="button"
          onClick={onAction}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            width: "100%",
            height: "var(--control-h)",
            border: "none",
            borderTop: "1px solid var(--border-hairline)",
            background: hover ? "var(--tan-300)" : "var(--cream-100)",
            color: "var(--espresso-900)",
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-body)",
            cursor: "pointer",
            transition: "background var(--dur) var(--ease-standard)",
          }}
        >
          {action}
        </button>
      </div>
    </div>
  );
}
