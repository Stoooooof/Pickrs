import { Routes, Route } from "react-router";
import Fingerpicker from "./features/fingerpicker/view/Fingerpicker.tsx";
import Header from "./components/Header.tsx";
import { Outlet } from "react-router";
import Home from "./features/home/view/Home.tsx";

function Layout() {
  return (
    <div className="relative h-dvh w-dvw overflow-hidden bg-gray-900">
      <Header />
      <main className="h-full w-full bg-neutral-950">
        <Outlet />
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
      </Route>
    </Routes>
  );
}

export default App;
