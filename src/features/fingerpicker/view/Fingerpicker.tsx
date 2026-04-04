import PickerCircle from "../components/PickerCircle.tsx";
import usePick from "../hooks/usePick.ts";
import usePointer from "../hooks/usePointer.ts";

const Fingerpicker = () => {
  const {
    activePointers,
    hasNoPointers,
    handlePointerCancel,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } = usePointer();
  const { selectedPointerColor } = usePick(activePointers);

  return (
    <section
      aria-label="Finger picker"
      className="fingerpicker-surface relative h-full w-full touch-none select-none overflow-hidden bg-neutral-950 transition-colors duration-300"
      onContextMenu={(event) => event.preventDefault()}
      onPointerCancel={handlePointerCancel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={
        selectedPointerColor
          ? { backgroundColor: selectedPointerColor }
          : undefined
      }
    >
      {hasNoPointers && (
        <h1 className="pointer-events-none absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 px-8 text-center text-4xl font-semibold text-white md:text-6xl animate-pulse">
          Tap to start
        </h1>
      )}
      {!selectedPointerColor &&
        Object.values(activePointers).map((pointer) => (
          <PickerCircle
            key={pointer.id}
            color={pointer.color}
            x={pointer.x}
            y={pointer.y}
          />
        ))}
    </section>
  );
};

export default Fingerpicker;
