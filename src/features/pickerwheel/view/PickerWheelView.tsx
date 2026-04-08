import InputList from "../components/WheelInputList";
import { useState } from "react";
import Wheel from "../components/Wheel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const PickerWheelView = () => {
  const [items, setItems] = useState<string[]>([
    "Placeholder 1",
    "Placeholder 2",
    "Placeholder 3",
  ]);
  const [winner, setWinner] = useState<string | null>(null);

  return (
    <>
      <Dialog open={!!winner}>
        <DialogContent
          showCloseButton={false}
          className="min-h-64 min-w-96 flex flex-col items-center ease-in duration-300"
        >
          <div className="flex-1 flex items-center justify-center w-full">
            <h2 className="text-5xl text-center animate-pulse">{winner}</h2>
          </div>

          <Button className="w-full h-10" onClick={() => setWinner(null)}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
      <div className="flex h-full w-full flex-col md:flex-row items-center justify-evenly gap-6 py-6 md:py-0">
        <Wheel items={items} onSelect={(item) => setWinner(item)} />
        <InputList items={items} setItems={setItems} />
      </div>
    </>
  );
};

export default PickerWheelView;
