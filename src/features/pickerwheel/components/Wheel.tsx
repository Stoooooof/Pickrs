import { useRef, useState } from "react";

type WheelProps = {
  items: string[];
  onSelect?: (item: string) => void;
};

const SPIN_DURATION = 4000;

const COLORS = [
  "#7c3aed",
  "#3b82f6",
  "#06b6d4",
  "#10b981",
  "#eab308",
  "#f97316",
  "#ef4444",
  "#ec4899",
];

const normalize = (deg: number) => ((deg % 360) + 360) % 360;

const Wheel = ({ items, onSelect }: WheelProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const cumulativeRotation = useRef(0);
  const [spinning, setSpinning] = useState(false);

  const disabled = spinning || !items.length;

  const placeHolderList = [
    "Placeholder 1",
    "Placeholder 2",
    "Placeholder 3",
    "Placeholder 4",
  ];
  const displayItems = items.length ? items : placeHolderList;

  const segment = displayItems.length ? 360 / displayItems.length : 360;

  const gradient = `conic-gradient(${displayItems
    .map((_, i) => {
      const start = i * segment;
      const end = start + segment;
      return `${COLORS[i % COLORS.length]} ${start}deg ${end}deg`;
    })
    .join(", ")})`;

  const spin = () => {
    if (spinning || !items.length) return;
    const el = ref.current;
    if (!el) return;

    setSpinning(true);

    const winner = Math.floor(Math.random() * items.length);

    // Calculate the target angle for the pointer to land on the winner segment
    const winnerStart = winner * segment;
    const targetAngle = winnerStart + Math.random() * segment;
    const pointerAt = normalize(360 - targetAngle);

    const current = normalize(cumulativeRotation.current);
    const delta =
      pointerAt - current <= 0
        ? pointerAt - current + 360
        : pointerAt - current;

    const extraSpins = (5 + Math.floor(Math.random() * 3)) * 360;
    const totalRotation = cumulativeRotation.current + delta + extraSpins;

    cumulativeRotation.current = totalRotation;

    // Spin animation using CSS rotate (composes with transform from idle keyframe)
    el.style.transition = `rotate ${SPIN_DURATION}ms cubic-bezier(0.15, 0.8, 0.2, 1)`;
    el.style.rotate = `${totalRotation}deg`;

    setTimeout(() => {
      el.style.transition = "";
      setSpinning(false);
      onSelect?.(items[winner]);
    }, SPIN_DURATION);
  };

  return (
    <div className="relative flex items-center justify-center md:h-160 md:w-160 w-96 h-96">
      <div className="absolute top-0 left-1/2 z-20 h-0 w-0 -translate-x-1/2 -translate-y-1 border-x-[12px] border-x-transparent border-t-[24px] border-t-white" />

      <div
        ref={ref}
        className={`absolute inset-0 rounded-full ${
          spinning ? "" : "animate-idle-spin"
        }`}
        style={{ background: gradient }}
      >
        {displayItems.map((item, i) => {
          const angle = i * segment + segment / 2;
          return (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 pointer-events-none w-1/2"
              style={{
                transform: `rotate(${angle - 90}deg)`,
                transformOrigin: "0 0",
              }}
            >
              <span className="absolute text-xs font-bold text-white truncate max-w-[90%] left-1/2 -translate-y-1/2">
                {item}
              </span>
            </div>
          );
        })}
      </div>

      <button
        onClick={spin}
        disabled={disabled}
        className="relative z-10 h-20 w-20 cursor-pointer rounded-full bg-white font-bold transition-transform hover:scale-105 disabled:pointer-events-none disabled:opacity-50"
      >
        <span className={`text-black ${!disabled ? "animate-pulse" : ""}`}>
          Spin
        </span>
      </button>
    </div>
  );
};

export default Wheel;
