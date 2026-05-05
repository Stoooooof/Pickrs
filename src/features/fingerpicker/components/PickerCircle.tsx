type PickerCircleProps = {
  color: string;
  x: number;
  y: number;
};

const PickerCircle = ({ color, x, y }: PickerCircleProps) => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 h-[130px] w-[130px] rounded-full animate-pulse"
      style={{
        transform: `translate(${x - 65}px, ${y - 65}px)`,
        backgroundColor: color,
      }}
    />
  );
};

export default PickerCircle;
