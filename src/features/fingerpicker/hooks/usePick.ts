import { useEffect, useEffectEvent, useRef, useState } from "react";

import type { ActivePointer } from "../hooks/usePointer.ts";

const PICK_DELAY_MS = 2_500;

const usePick = (activePointers: Record<number, ActivePointer>) => {
  const activePointerCount = Object.keys(activePointers).length;
  const getCurrentPointers = useEffectEvent(() =>
    Object.values(activePointers),
  );
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  if (activePointerCount === 0 && selectedPointerId !== null) {
    setSelectedPointerId(null);
  }

  useEffect(() => {
    // if no points reset.
    if (activePointerCount === 0) {
      clearPendingTimeout();
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
