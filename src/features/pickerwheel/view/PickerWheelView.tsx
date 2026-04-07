import InputList from "../components/WheelInputList";
import { useState } from "react";
import Wheel from "../components/Wheel";

const PickerWheelView = () => {
  const [items, setItems] = useState<string[]>([]);
  const [winner, setWinner] = useState<string | null>(null);

  return (
    <div className="flex h-full w-full flex-col md:flex-row items-center justify-evenly gap-6 py-6 md:py-0">
      <div className="flex flex-col items-center gap-4">
        <Wheel items={items} onSelect={(item) => setWinner(item)} />
        {winner && (
          <p className="text-lg font-bold text-white">Winner: {winner}</p>
        )}
      </div>
      <InputList items={items} setItems={setItems} />
    </div>
  );
};

export default PickerWheelView;
