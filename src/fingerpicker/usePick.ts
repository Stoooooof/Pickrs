import { useEffect, useEffectEvent, useRef, useState } from "react";

import type { ActivePointer } from "./usePointer.ts";

const PICK_DELAY_MS = 3_000;

const usePick = (activePointers: Record<number, ActivePointer>) => {
  const activePointerCount = Object.keys(activePointers).length;
  const getCurrentPointers = useEffectEvent(() =>
    Object.values(activePointers),
  );
  const timeoutRef = useRef<number | null>(null);
  const previousPointerCountRef = useRef(0);

  const [selectedPointerId, setSelectedPointerId] = useState<number | null>(
    null,
  );

  const selectedPointer =
    selectedPointerId !== null
      ? (activePointers[selectedPointerId] ?? null)
      : null;

  const clearPendingTimeout = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    const hasAddedPointer =
      activePointerCount > previousPointerCountRef.current;

    previousPointerCountRef.current = activePointerCount;

    // if no points reset.
    if (activePointerCount === 0) {
      clearPendingTimeout();
      return;
    }

    if (!hasAddedPointer) {
      return;
    }

    clearPendingTimeout();

    timeoutRef.current = setTimeout(() => {
      const pointers = getCurrentPointers();

      // if the pointers are removed before timeout reset
      if (pointers.length === 0) {
        clearPendingTimeout();
        return;
      }

      const pickedPointer =
        pointers[Math.floor(Math.random() * pointers.length)];

      setSelectedPointerId(pickedPointer.id);

      timeoutRef.current = null;
    }, PICK_DELAY_MS);

    return clearPendingTimeout;
  }, [activePointerCount]);

  return {
    selectedPointerColor: selectedPointer?.color ?? null,
  };
};

export default usePick;
