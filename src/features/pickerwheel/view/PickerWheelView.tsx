import InputList from "../components/WheelInputList";
import { useState, useEffect } from "react";
import Wheel from "../components/Wheel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "pickr-wheel-items";

const PickerWheelView = () => {
  const [saveEnabled, setSaveEnabled] = useState(
    () => localStorage.getItem(STORAGE_KEY) !== null
  );

  const [items, setItems] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as string[]) : [];
  });

  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    if (saveEnabled) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, saveEnabled]);

  const handleSaveToggle = (enabled: boolean) => {
    setSaveEnabled(enabled);
    if (!enabled) localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <>
      <Dialog open={!!winner}>
        <DialogContent
          showCloseButton={false}
          className="min-h-64 min-w-96 flex flex-col items-center ease-in duration-300"
        >
          <DialogTitle className="sr-only">Winner</DialogTitle>
          <div className="flex-1 flex items-center justify-center w-full">
            <h2 className="text-5xl text-center animate-pulse">{winner}</h2>
          </div>

          <Button className="w-full h-10" onClick={() => setWinner(null)}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
      <div className="flex h-full w-full flex-col md:flex-row items-center justify-evenly gap-6 px-4 py-6 md:px-0 md:py-0">
        <Wheel items={items} onSelect={(item) => setWinner(item)} />
        <InputList
          items={items}
          setItems={setItems}
          saveEnabled={saveEnabled}
          setSaveEnabled={handleSaveToggle}
        />
      </div>
    </>
  );
};

export default PickerWheelView;
