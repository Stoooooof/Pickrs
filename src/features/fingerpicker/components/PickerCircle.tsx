type PickerCircleProps = {
  color: string;
  x: number;
  y: number;
};

const PickerCircle = ({ color, x, y }: PickerCircleProps) => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 h-[120px] w-[120px] rounded-full animate-pulse"
      style={{
        transform: `translate(${x - 60}px, ${y - 60}px)`,
        backgroundColor: color,
      }}
    />
  );
};

export default PickerCircle;
