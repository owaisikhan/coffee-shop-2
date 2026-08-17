import { SectionHeading } from "../ds/SectionHeading";
import { TestimonialCard } from "../ds/TestimonialCard";
import { CarouselNav } from "../ds/CarouselNav";

export function Testimonial() {
  return (
    <section style={{ background: "var(--espresso-900)", padding: "104px 48px" }}>
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
        <TestimonialCard
          quote="I Have Been Coming In Since The Bike Shop Days. The Batch Brew Is Still The Best Three Pounds I Spend All Week."
          name="Marta Reyes"
          avatar="/assets/img-avatar.png"
          rating={5}
          width={700}
        />
        <CarouselNav />
      </div>
    </section>
  );
}
