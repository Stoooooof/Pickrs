import { Routes, Route } from "react-router";
import Fingerpicker from "./features/fingerpicker/view/Fingerpicker.tsx";
import Header from "./components/Header.tsx";
import { Outlet } from "react-router";
import Home from "./features/home/view/Home.tsx";
import PickerWheelView from "./features/pickerwheel/view/PickerWheelView.tsx";

function Layout() {
  return (
    <div className="relative flex min-h-dvh w-full flex-col overflow-x-hidden">
      <Header />
      <main className="min-h-0 flex flex-1 bg-neutral-950">
        <div className="min-h-0 w-full flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/fingerpicker" element={<Fingerpicker />} />
        <Route path="/pickerwheel" element={<PickerWheelView />} />
      </Route>
    </Routes>
  );
}

export default App;
