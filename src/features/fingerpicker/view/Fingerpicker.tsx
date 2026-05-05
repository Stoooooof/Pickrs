import React from "react";

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
  const { selectedPointerColor, selectedPointerPosition } = usePick(activePointers);

  return (
    <section
      aria-label="Finger picker"
      className="relative flex items-center justify-center h-full w-full touch-none select-none"
      onContextMenu={(event) => event.preventDefault()}
      onPointerCancel={handlePointerCancel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {selectedPointerColor && selectedPointerPosition && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none animate-expand-from-point"
          style={
            {
              backgroundColor: selectedPointerColor,
              "--expand-x": `${selectedPointerPosition.x}px`,
              "--expand-y": `${selectedPointerPosition.y}px`,
            } as React.CSSProperties
          }
        />
      )}
      {hasNoPointers && (
        <h2 className="text-center text-4xl font-semibold text-white md:text-6xl animate-pulse">
          Tap to start
        </h2>
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
