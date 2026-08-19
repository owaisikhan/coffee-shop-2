"use client";

import { useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { TestimonialCard } from "../ui/TestimonialCard";
import { CarouselNav } from "../ui/CarouselNav";
import { TESTIMONIALS } from "../../_lib/testimonials";

export function Testimonial() {
  const [i, setI] = useState(0);
  const count = TESTIMONIALS.length;
  const t = TESTIMONIALS[i];
  const step = (delta: number) => setI((prev) => (prev + delta + count) % count);

  return (
    <section style={{ background: "var(--espresso-900)", padding: "clamp(56px, 9vw, 104px) clamp(20px, 5vw, 48px)" }}>
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 56,
          alignItems: "center",
        }}
      >
        <SectionHeading title="What Our Customer Says" tone="light" />
        {/* aria-live so the quote change is announced rather than silently swapped */}
        <div aria-live="polite" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <TestimonialCard
            key={t.name}
            quote={t.quote}
            name={t.name}
            avatar={t.avatar}
            rating={t.rating}
            width={700}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
          <CarouselNav onPrev={() => step(-1)} onNext={() => step(1)} />
          <span style={{ fontSize: 12, color: "var(--text-on-dark-muted)" }}>
            {i + 1} / {count}
          </span>
        </div>
      </div>
    </section>
  );
}
