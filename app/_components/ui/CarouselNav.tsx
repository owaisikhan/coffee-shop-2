import { IconButton } from "./IconButton";

export function CarouselNav({
  onPrev,
  onNext,
  size = 40,
  style,
}: {
  onPrev?: () => void;
  onNext?: () => void;
  size?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ display: "flex", gap: "var(--space-3)", ...style }}>
      <IconButton icon="arrow-left" variant="tan" size={size} label="Previous" onClick={onPrev} />
      <IconButton icon="arrow-right" variant="dark" size={size} label="Next" onClick={onNext} />
    </div>
  );
}
