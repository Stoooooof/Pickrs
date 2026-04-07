import InputList from "../components/InputList";
import { useState } from "react";

const PickerWheelView = () => {
  const [users, setUsers] = useState<string[]>([]); // Example users, replace with actual data when available

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Picker Wheel</h1>
      <p className="text-lg text-gray-500">
        This feature is coming soon! Stay tuned.
      </p>
      <InputList users={users} setUsers={setUsers} />
    </div>
  );
};

export default PickerWheelView;
