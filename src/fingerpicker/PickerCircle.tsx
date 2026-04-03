import type { CSSProperties } from "react";

type PickerCircleProps = {
  color: string;
  x: number;
  y: number;
};

const CIRCLE_SIZE = 120;

const PickerCircle = ({ color, x, y }: PickerCircleProps) => {
  const style = {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    transform: `translate(${x - CIRCLE_SIZE / 2}px, ${y - CIRCLE_SIZE / 2}px)`,
    backgroundColor: color,
  } as CSSProperties;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 top-0 rounded-full animate-pulse`}
      style={style}
    />
  );
};

export default PickerCircle;
