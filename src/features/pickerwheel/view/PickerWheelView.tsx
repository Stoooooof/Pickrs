import InputList from "../components/WheelInputList";
import { useState } from "react";
import Wheel from "../components/Wheel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

const WHEEL_COLORS = [
  "#7c3aed",
  "#3b82f6",
  "#06b6d4",
  "#10b981",
  "#eab308",
  "#f97316",
  "#ef4444",
  "#ec4899",
];

const STORAGE_KEY = "pickr-wheel-items";

const PickerWheelView = () => {
  const [saveEnabled, setSaveEnabled] = useState(
    () => localStorage.getItem(STORAGE_KEY) !== null,
  );

  const [items, setItems] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as string[]) : [];
  });

  const [winner, setWinner] = useState<string | null>(null);

  const handleSetItems: typeof setItems = (updater) => {
    setItems((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      if (saveEnabled) localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const handleSaveToggle = (enabled: boolean) => {
    setSaveEnabled(enabled);
    if (enabled) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    else localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <>
      <Dialog open={!!winner}>
        <DialogContent
          showCloseButton={false}
          className="min-h-64 min-w-96 flex flex-col items-center"
        >
          <DialogTitle className="sr-only">Winner</DialogTitle>
          <div className="flex-1 flex items-center justify-center w-full animate-winner-pop">
            <h2 className="text-5xl text-center">{winner}</h2>
          </div>
          <Button className="w-full h-10" onClick={() => setWinner(null)}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
      <div className="flex h-full w-full flex-col md:flex-row items-center justify-evenly gap-6 px-4 py-6 md:px-0 md:py-0">
        <Wheel
          items={items}
          onSelect={(item) => {
            setWinner(item);
            confetti({
              particleCount: 80,
              angle: 60,
              spread: 55,
              origin: { x: 0, y: 0.65 },
              colors: WHEEL_COLORS,
            });
            confetti({
              particleCount: 80,
              angle: 120,
              spread: 55,
              origin: { x: 1, y: 0.65 },
              colors: WHEEL_COLORS,
            });
          }}
        />
        <InputList
          items={items}
          setItems={handleSetItems}
          saveEnabled={saveEnabled}
          setSaveEnabled={handleSaveToggle}
        />
      </div>
    </>
  );
};

export default PickerWheelView;
