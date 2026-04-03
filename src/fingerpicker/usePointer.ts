import { useState } from "react";

export type ActivePointer = {
  id: number;
  x: number;
  y: number;
  color: string;
  pointerType: string;
};

const POINTER_COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#14b8a6",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
];

const getPointerPosition = (event: React.PointerEvent<HTMLDivElement>) => {
  const bounds = event.currentTarget.getBoundingClientRect();

  return {
    x: event.clientX - bounds.left,
    y: event.clientY - bounds.top,
  };
};

const getRandomPointerColor = (
  activePointers: Record<number, ActivePointer>,
) => {
  const usedColors = new Set(
    Object.values(activePointers).map((pointer) => pointer.color),
  );
  const availableColors = POINTER_COLORS.filter(
    (color) => !usedColors.has(color),
  );
  const palette = availableColors.length > 0 ? availableColors : POINTER_COLORS;

  return palette[Math.floor(Math.random() * palette.length)];
};

const usePointer = () => {
  const [activePointers, setActivePointers] = useState<
    Record<number, ActivePointer>
  >({});

  const upsertPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const { x, y } = getPointerPosition(event);

    setActivePointers((currentPointers) => {
      const existingPointer = currentPointers[event.pointerId];

      return {
        ...currentPointers,
        [event.pointerId]: {
          id: event.pointerId,
          x,
          y,
          color:
            existingPointer?.color ?? getRandomPointerColor(currentPointers),
          pointerType: event.pointerType,
        },
      };
    });
  };

  const removePointer = (pointerId: number) => {
    setActivePointers((currentPointers) => {
      if (!(pointerId in currentPointers)) {
        return currentPointers;
      }

      const nextPointers = { ...currentPointers };
      delete nextPointers[pointerId];

      return nextPointers;
    });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    upsertPointer(event);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }

    event.preventDefault();
    upsertPointer(event);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    removePointer(event.pointerId);
  };

  const handlePointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    removePointer(event.pointerId);
  };

  return {
    activePointers,
    handlePointerCancel,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
};

export default usePointer;
