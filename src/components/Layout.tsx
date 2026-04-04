import { useState } from "react";

import Header from "./Header";
import Menu from "./Menu";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative h-dvh w-dvw overflow-hidden bg-gray-900">
      <aside
        aria-hidden={!isMenuOpen}
        className={`absolute inset-x-0 left-0 top-16 bottom-0 z-20 w-full bg-neutral-900 transition-transform duration-300 ease-out sm:w-96 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Menu />
      </aside>
      <Header
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((currentValue) => !currentValue)}
      />

      <main className="h-full w-full">{children}</main>

      <button
        aria-hidden={!isMenuOpen}
        className={`absolute inset-x-0 top-16 bottom-0 z-10 bg-black/45  duration-300 ${isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setIsMenuOpen(false)}
        tabIndex={isMenuOpen ? 0 : -1}
        type="button"
      >
        <span className="sr-only">Close menu</span>
      </button>
    </div>
  );
};

export default PageLayout;
